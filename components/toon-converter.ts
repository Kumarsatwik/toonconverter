interface ConversionResult {
  toon: string
  format: string
}

class ToonConverter {
  static convertAuto(input: string): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
      try {
        if (!input.trim()) {
          reject(new Error("Input cannot be empty"))
          return
        }

        const format = this.detectFormat(input)
        let toon = ""

        if (format === "JSON") {
          toon = this.jsonToToon(JSON.parse(input))
        } else if (format === "Markdown") {
          toon = this.markdownToToon(input)
        } else {
          toon = this.textToToon(input)
        }

        resolve({ toon, format })
      } catch (error) {
        reject(new Error(`Conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`))
      }
    })
  }

  static convert(input: string, format: "json" | "text" | "markdown"): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        if (!input.trim()) {
          reject(new Error("Input cannot be empty"))
          return
        }

        let toon = ""

        if (format === "json") {
          toon = this.jsonToToon(JSON.parse(input))
        } else if (format === "markdown") {
          toon = this.markdownToToon(input)
        } else {
          toon = this.textToToon(input)
        }

        resolve(toon)
      } catch (error) {
        reject(new Error(`Conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`))
      }
    })
  }

  private static detectFormat(input: string): "JSON" | "Markdown" | "Text" {
    const trimmed = input.trim()

    // Check for JSON (starts with { or [)
    if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && (trimmed.endsWith("}") || trimmed.endsWith("]"))) {
      try {
        JSON.parse(trimmed)
        return "JSON"
      } catch {
        // Not valid JSON, continue checking
      }
    }

    // Check for Markdown (contains # headers)
    if (/^#{1,6}\s+/m.test(trimmed)) {
      return "Markdown"
    }

    // Default to plain text
    return "Text"
  }

  private static jsonToToon(obj: any, indent = 0): string {
    const spaces = " ".repeat(indent * 2)

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]"

      // Check if array of objects
      if (typeof obj[0] === "object" && obj[0] !== null) {
        const keys = Object.keys(obj[0])
        const header = `[${obj.length}]{${keys.join(",")}}`

        const rows = obj.map((item) => keys.map((key) => this.formatValue(item[key])).join(","))

        return `${spaces}${header}:\n${rows.map((row) => `${spaces}  ${row}`).join("\n")}`
      }

      // Simple array
      return `${spaces}[${obj.join(", ")}]`
    }

    if (typeof obj === "object" && obj !== null) {
      const entries = Object.entries(obj)
      if (entries.length === 0) return "{}"

      let result = ""
      for (const [key, value] of entries) {
        if (Array.isArray(value)) {
          result += `${spaces}${key}:\n${this.jsonToToon(value, indent + 1)}\n`
        } else if (typeof value === "object" && value !== null) {
          result += `${spaces}${key}:\n${this.jsonToToon(value, indent + 1)}\n`
        } else {
          result += `${spaces}${key}: ${this.formatValue(value)}\n`
        }
      }
      return result.trimEnd()
    }

    return this.formatValue(obj)
  }

  private static markdownToToon(markdown: string): string {
    const lines = markdown.split("\n")
    const toon: string[] = []

    let currentSection = ""
    let sectionContent: string[] = []

    for (const line of lines) {
      if (line.startsWith("#")) {
        if (currentSection && sectionContent.length > 0) {
          toon.push(`${currentSection}:\n  ${sectionContent.join("\n  ")}`)
          sectionContent = []
        }

        const level = line.match(/^#+/)?.[0].length || 1
        currentSection = line.replace(/^#+\s*/, "")
      } else if (line.trim()) {
        sectionContent.push(line.trim())
      }
    }

    if (currentSection && sectionContent.length > 0) {
      toon.push(`${currentSection}:\n  ${sectionContent.join("\n  ")}`)
    }

    return toon.join("\n\n")
  }

  private static textToToon(text: string): string {
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim())
    const toon: string[] = []

    paragraphs.forEach((para, idx) => {
      const lines = para.split("\n").filter((l) => l.trim())
      if (lines.length > 1) {
        toon.push(`paragraph${idx + 1}:\n  ${lines.join("\n  ")}`)
      } else {
        toon.push(`text: ${lines[0]}`)
      }
    })

    return toon.join("\n\n")
  }

  private static formatValue(value: any): string {
    if (value === null) return "null"
    if (typeof value === "string") return `"${value}"`
    if (typeof value === "boolean") return value ? "true" : "false"
    return String(value)
  }
}

export default ToonConverter
