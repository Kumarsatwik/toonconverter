import { NextRequest, NextResponse } from 'next/server';
import { encode } from '@toon-format/toon';

// In-memory rate limiting store (suitable for Vercel serverless)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per hour per IP

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  used: number;
}

function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const userLimit = rateLimit.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    // First request or window expired
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetTime: now + RATE_LIMIT_WINDOW,
      used: 1
    };
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: userLimit.resetTime,
      used: userLimit.count
    };
  }

  // Increment counter
  userLimit.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - userLimit.count,
    resetTime: userLimit.resetTime,
    used: userLimit.count
  };
}

function getClientIP(request: NextRequest): string {
  // Vercel headers for real client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const vercelIP = request.headers.get('x-vercel-proxied-for');

  // Get the first IP from forwarded header (handles proxies)
  const ip = forwarded?.split(',')[0]?.trim() || realIP || vercelIP || 'unknown';

  return ip;
}

function validateJSON(input: any): { valid: boolean; error?: string } {
  if (!input) {
    return { valid: false, error: 'Request body is required' };
  }

  if (typeof input !== 'object' || Array.isArray(input)) {
    return { valid: false, error: 'Input must be a JSON object (not an array or primitive)' };
  }

  // Additional validation can be added here
  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetTime);
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `Too many requests. Try again in ${Math.ceil(retryAfter / 60)} minutes.`,
          retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetDate.toISOString(),
            'X-RateLimit-Used': rateLimitResult.used.toString(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    // Parse request body
    let jsonData: any;
    try {
      jsonData = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON'
        },
        {
          status: 400,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
            'X-RateLimit-Used': rateLimitResult.used.toString(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    // Validate input
    const validation = validateJSON(jsonData);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: validation.error
        },
        {
          status: 400,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
            'X-RateLimit-Used': rateLimitResult.used.toString(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    // Convert to TOON
    const toonOutput = encode(jsonData, { keyFolding: 'safe' });

    // Return successful response
    return new NextResponse(toonOutput, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        'X-RateLimit-Used': rateLimitResult.used.toString(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache',
      }
    });

  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing your request'
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400', // 24 hours
    }
  });
}
