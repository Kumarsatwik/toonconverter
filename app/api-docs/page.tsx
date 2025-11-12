import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Zap, Shield, Clock, Code2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "API Documentation - TOON Converter",
  description: "Complete API documentation for the TOON Converter. Learn how to convert JSON to TOON format programmatically with rate limiting and error handling.",
  keywords: "TOON API, JSON to TOON API, rate limiting, API documentation, developer docs",
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">TOON API</h1>
                <p className="text-sm text-muted-foreground">Convert JSON to TOON programmatically</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Back to App
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Overview */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4">API Overview</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Integrate TOON conversion into your applications with our simple REST API.
              Convert JSON objects to TOON format with built-in rate limiting and error handling.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Fast Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast JSON to TOON conversion with minimal latency.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Rate Limited</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  100 requests per hour per IP address to ensure fair usage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Always Available</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  99.9% uptime with global CDN distribution via Vercel.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Endpoint */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Convert Endpoint
              </CardTitle>
              <CardDescription>
                Convert JSON objects to TOON format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono">POST</Badge>
                <code className="text-sm bg-secondary px-2 py-1 rounded font-mono">
                  https://toontools.site/api/convert
                </code>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Headers</h4>
                <pre className="bg-secondary p-3 rounded text-sm overflow-x-auto">
{`Content-Type: application/json`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Request/Response */}
        <section className="mb-12">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Request */}
            <Card>
              <CardHeader>
                <CardTitle>Request Body</CardTitle>
                <CardDescription>JSON object to convert</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-secondary p-4 rounded text-sm overflow-x-auto">
{`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  ],
  "total": 2
}`}
                </pre>
              </CardContent>
            </Card>

            {/* Response */}
            <Card>
              <CardHeader>
                <CardTitle>Response</CardTitle>
                <CardDescription>TOON formatted output</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-secondary p-4 rounded text-sm overflow-x-auto font-mono">
{`users:
  [2]{id,name,email}:
    1,John Doe,john@example.com
    2,Jane Smith,jane@example.com
total: 2`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rate Limiting */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Rate Limiting
              </CardTitle>
              <CardDescription>
                API requests are limited to prevent abuse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Limits</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 100 requests per hour per IP</li>
                    <li>• Automatic reset every hour</li>
                    <li>• Based on client IP address</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response Headers</h4>
                  <pre className="bg-secondary p-2 rounded text-xs">
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 2024-01-01T12:00:00.000Z
X-RateLimit-Used: 5`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Error Handling */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Error Handling</CardTitle>
              <CardDescription>API error responses and status codes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">200 OK</h4>
                    <p className="text-sm">Successful conversion</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-600 mb-2">400 Bad Request</h4>
                    <p className="text-sm">Invalid JSON or validation error</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">429 Too Many Requests</h4>
                    <p className="text-sm">Rate limit exceeded</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">500 Internal Error</h4>
                    <p className="text-sm">Server error</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Error Response Format</h4>
                  <pre className="bg-secondary p-3 rounded text-sm">
{`{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Try again in 60 minutes.",
  "retryAfter": 3600
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Code Examples */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>Integrate the API in your applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* JavaScript */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline">JavaScript</Badge>
                </h4>
                <pre className="bg-secondary p-4 rounded text-sm overflow-x-auto">
{`const response = await fetch('https://toontools.site/api/convert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    users: [{ id: 1, name: 'John' }]
  })
});

const toonData = await response.text();
console.log(toonData);`}
                </pre>
              </div>

              {/* Python */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline">Python</Badge>
                </h4>
                <pre className="bg-secondary p-4 rounded text-sm overflow-x-auto">
{`import requests

response = requests.post(
    'https://toontools.site/api/convert',
    json={"users": [{"id": 1, "name": "John"}]}
)

toon_data = response.text
print(toon_data)`}
                </pre>
              </div>

              {/* cURL */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline">cURL</Badge>
                </h4>
                <pre className="bg-secondary p-4 rounded text-sm overflow-x-auto">
{`curl -X POST https://toontools.site/api/convert \\
  -H "Content-Type: application/json" \\
  -d '{"users": [{"id": 1, "name": "John"}]}'`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

       
      </main>
    </div>
  )
}
