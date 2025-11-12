"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Copy,
  Download,
  Zap,
  ArrowRight,
  FileText,
  BarChart3,
  Users,
  Sparkles,
  Upload,
  Code,
  Cpu,
  Shield,
} from "lucide-react";
import { encode } from "@toon-format/toon";
import { ThemeToggle } from "./theme-toggle";

export default function ConverterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isConverting, setIsConverting] = useState(false);
  const [detectedFormat, setDetectedFormat] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const copyLiveRef = useRef<HTMLParagraphElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setIsValid(true);
      return;
    }
    try {
      JSON.parse(input);
      setIsValid(true);
    } catch {
      setIsValid(false);
    }
  }, [input]);

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      const parsed = JSON.parse(input);
      const toon = encode(parsed, { keyFolding: "safe" });
      setOutput(toon);
      setDetectedFormat("JSON");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid JSON";
      setOutput(`Error: ${message}`);
      setDetectedFormat("");
    } finally {
      setIsConverting(false);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    copyLiveRef.current?.focus();
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadToon = () => {
    if (!output) return;
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(output)}`
    );
    element.setAttribute("download", "output.toon");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const tokenSavings = useMemo(() => {
    if (!input || !output) return 0;
    const inputTokens = input.length / 4; // rough estimate
    const outputTokens = output.length / 4;
    return Math.max(
      0,
      Math.round(((inputTokens - outputTokens) / inputTokens) * 100)
    );
  }, [input, output]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg transition-transform duration-300 hover:scale-110">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Convert JSON to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TOON
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Reduce LLM token usage by 30-60% with TOON format. Convert JSON
              instantly, save costs, and improve AI performance. Free, fast, and
              secure.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="transition-transform duration-200 hover:scale-105"
                asChild
              >
                <a href="#converter">
                  Start Converting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="transition-transform duration-200 hover:scale-105"
              >
                <a href="/api-docs" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  View API Documentation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">30-60%</div>
              <div className="text-sm text-muted-foreground">
                Token Reduction
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">
                Data Reversible
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Free Usage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Instant</div>
              <div className="text-sm text-muted-foreground">
                Conversion Time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Converter Section */}
      <section id="converter" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Convert Your JSON
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Paste your JSON below and see the magic happen
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Card */}
            <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Input JSON
                </CardTitle>
                <CardDescription>
                  Paste your JSON data or drag & drop a file
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder={`{\n  "users": [\n    {\n      "id": 1,\n      "name": "John Doe",\n      "email": "john@example.com"\n    }\n  ]\n}`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="font-mono text-sm min-h-80 max-h-96 overflow-auto custom-scrollbar resize-none"
                  aria-invalid={!isValid}
                />
                {!isValid && (
                  <p className="text-sm text-destructive flex items-center gap-2">
                    <span className="text-xs">⚠️</span>
                    Invalid JSON format
                  </p>
                )}
                <Button
                  onClick={handleConvert}
                  className="w-full"
                  size="lg"
                  disabled={!isValid || !input.trim() || isConverting}
                  aria-busy={isConverting}
                >
                  {isConverting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Converting...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Convert to TOON
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Card */}
            <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  TOON Output
                  {tokenSavings > 0 && (
                    <span className="ml-auto text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      -{tokenSavings}% tokens
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  Optimized TOON format ready for your LLM
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col h-full">
                <Textarea
                  value={output}
                  readOnly
                  className="font-mono text-sm bg-secondary/50 min-h-80 max-h-96 overflow-auto custom-scrollbar resize-none"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!output}
                    className="flex-1"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadToon}
                    disabled={!output}
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
                <p ref={copyLiveRef} aria-live="polite" className="sr-only">
                  {copied ? "Output copied to clipboard" : ""}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-20 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Programmatic Access
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Integrate TOON conversion into your applications with our REST API
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="h-8 w-8 text-primary mb-2" />
                <CardTitle>REST API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simple POST endpoint for JSON to TOON conversion with
                  comprehensive error handling.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Rate Limited</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  100 requests per hour per IP address to ensure fair usage and
                  prevent abuse.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Full Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete API documentation with code examples in multiple
                  programming languages.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="transition-transform duration-200 hover:scale-105"
            >
              <a href="/api-docs" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                View API Documentation
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Choose TOON?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover the advantages of TOON format for your AI applications
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Token Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Reduce token usage by 30-60%, lowering API costs and improving
                  response times for large datasets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Human Readable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Clear structure with proper indentation and formatting, making
                  it easy to read and debug.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardHeader>
                <Cpu className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Fast Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lightning-fast conversion with minimal overhead. Process large
                  datasets in milliseconds.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardHeader>
                <Upload className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Easy Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simple API and command-line tools. Integrate TOON into your
                  existing workflows effortlessly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Designed specifically for LLM interactions, providing better
                  context and reducing hallucinations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Optimize Your AI?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start converting your JSON data to TOON format today and see the
            difference in your AI applications.
          </p>
          <Button
            size="lg"
            className="mt-8 transition-transform duration-200 hover:scale-105"
            asChild
          >
            <a href="#converter">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
