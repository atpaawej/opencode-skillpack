/**
 * Reading and validating the catalog.
 *
 * A skill file is portable: `SKILL.md` carries its own name and description, so the same file
 * works whether it is dropped into a skills directory or served by this plugin. The catalog carries
 * only what a skill cannot know about itself: where it came from, how it was reviewed, and what it
 * needs to run.
 */

import { readFile } from "node:fs/promises"

export type Origin = "first-party" | "vendored"
export type Review = "full" | "none"

export interface CatalogEntry {
  /** The skill ID the agent calls. Unique across the catalog. */
  id: string
  /** Only skills exist in v0; the discriminator reserves room for other capability kinds. */
  kind: "skill"
  /** Skill directory, relative to the package root. */
  dir: string
  origin: Origin
  review: Review
  /** External executables or services the skill needs. Presence of this keeps the skill out of the default load. */
  requires?: string[]
  /** Upstream repository URL, for vendored skills. */
  source?: string
  /** Commit SHA the vendored copy was taken from. */
  pin?: string
  /** SPDX identifier of the skill's licence. */
  license?: string
  tags?: string[]
}

export interface Catalog {
  version: number
  skills: CatalogEntry[]
}

export interface ParsedSkill {
  name: string
  description: string
  /** The body, with frontmatter removed. */
  body: string
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

export async function readCatalog(root: string): Promise<Catalog> {
  const file = `${root}/catalog.json`
  return parseCatalog(await readFile(file, "utf8"), file)
}

export function parseCatalog(raw: string, file = "catalog.json"): Catalog {
  const catalog = JSON.parse(raw) as Catalog
  if (catalog.version !== 1) throw new Error(`${file}: unsupported catalog version ${String(catalog.version)}`)
  const seen = new Set<string>()
  for (const entry of catalog.skills) {
    if (entry.kind !== "skill") throw new Error(`${file}: unsupported kind "${String(entry.kind)}" for ${entry.id}`)
    if (seen.has(entry.id)) throw new Error(`${file}: duplicate id "${entry.id}"`)
    seen.add(entry.id)
  }
  return catalog
}

/**
 * Parses `SKILL.md`. Deliberately strict: only flat `key: value` frontmatter is accepted, because a
 * silent misparse of a description means the agent sees a wrong trigger and never loads the skill.
 */
export function parseSkill(text: string, file: string): ParsedSkill {
  const match = FRONTMATTER.exec(text)
  if (!match) throw new Error(`${file}: missing YAML frontmatter`)

  const fields: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue
    const pair = /^([A-Za-z0-9_-]+):[ \t]*(.*)$/.exec(line)
    if (!pair) throw new Error(`${file}: unsupported frontmatter line "${line}" (flat "key: value" only)`)
    const raw = pair[2].trim()
    if (raw.startsWith(">") || raw.startsWith("|"))
      throw new Error(`${file}: block scalars are not supported in frontmatter`)
    fields[pair[1]] = /^(["']).*\1$/.test(raw) ? raw.slice(1, -1) : raw
  }

  const name = fields.name
  const description = fields.description
  if (!name) throw new Error(`${file}: frontmatter needs "name"`)
  if (!description) throw new Error(`${file}: frontmatter needs "description"`)

  return { name, description, body: text.slice(match[0].length).trim() }
}
