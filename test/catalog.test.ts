import { describe, expect, it } from "bun:test"
import { resolve } from "node:path"

import { parseCatalog, parseSkill, readCatalog } from "../src/catalog"

const root = resolve(import.meta.dir, "..")

describe("parseSkill", () => {
  it("splits frontmatter from the body", () => {
    const skill = parseSkill("---\nname: Review\ndescription: Review a diff.\n---\n\n# Review\n\nBody.\n", "x.md")
    expect(skill).toEqual({ name: "Review", description: "Review a diff.", body: "# Review\n\nBody." })
  })

  it("unquotes values", () => {
    const skill = parseSkill('---\nname: "Review"\ndescription: \'Review a diff.\'\n---\nBody', "x.md")
    expect(skill.name).toBe("Review")
    expect(skill.description).toBe("Review a diff.")
  })

  it("rejects a file without frontmatter", () => {
    expect(() => parseSkill("# Review\n", "x.md")).toThrow("missing YAML frontmatter")
  })

  it("rejects a description but no name", () => {
    expect(() => parseSkill("---\ndescription: Review a diff.\n---\nBody", "x.md")).toThrow('needs "name"')
  })

  it("rejects block scalars instead of guessing", () => {
    expect(() => parseSkill("---\nname: Review\ndescription: >\n  Review a diff.\n---\nBody", "x.md")).toThrow(
      "block scalars are not supported",
    )
  })

  it("rejects nested frontmatter", () => {
    expect(() => parseSkill("---\nname: Review\nmetadata:\n  opencode: x\n---\nBody", "x.md")).toThrow(
      "unsupported frontmatter line",
    )
  })
})

describe("readCatalog", () => {
  it("reads the shipped catalog and every entry points at a real skill directory", async () => {
    const catalog = await readCatalog(root)
    expect(catalog.skills.length).toBeGreaterThan(0)
    for (const entry of catalog.skills) {
      const file = Bun.file(resolve(root, entry.dir, "SKILL.md"))
      expect(await file.exists()).toBe(true)
    }
  })

  it("every skill in the shipped catalog parses cleanly with parseSkill", async () => {
    const catalog = await readCatalog(root)
    for (const entry of catalog.skills) {
      const filePath = resolve(root, entry.dir, "SKILL.md")
      const text = await Bun.file(filePath).text()
      const parsed = parseSkill(text, filePath)
      expect(parsed.name.length).toBeGreaterThan(0)
      expect(parsed.description.length).toBeGreaterThan(0)
      expect(parsed.body.length).toBeGreaterThan(0)
    }
  })

  it("rejects duplicate ids", async () => {
    const raw = JSON.stringify({
      version: 1,
      skills: [
        { id: "a", kind: "skill", dir: "a", origin: "first-party", review: "full" },
        { id: "a", kind: "skill", dir: "b", origin: "first-party", review: "full" },
      ],
    })
    expect(() => parseCatalog(raw)).toThrow('duplicate id "a"')
  })
})
