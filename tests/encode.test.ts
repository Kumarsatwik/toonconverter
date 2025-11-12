import { describe, it, expect } from "vitest"
import { encode } from "@toon-format/toon"

describe("encode", () => {
  it("encodes simple object", () => {
    const toon = encode({ name: "Alice", age: 30 })
    expect(toon).toContain("name: Alice")
    expect(toon).toContain("age: 30")
  })

  it("encodes array of objects as tabular", () => {
    const toon = encode({ users: [{ id: 1, name: "John" }] })
    expect(toon).toContain("users[1]{id,name}:")
    expect(toon).toContain("1,John")
  })
})