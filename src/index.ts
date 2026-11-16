/**
 * The skillpack plugin.
 *
 * It does exactly one thing: take the skills listed in `catalog.json`, read them off disk, and
 * register them. Everything after that is native OpenCode behaviour — the agent sees id, name and
 * description in the skill index and loads a body only when it invokes the skill.
 *
 * Skills are registered with their real filesystem path inside the installed package, so they are
 * indistinguishable from skills the user installed by hand: relative references resolve, `read`
 * works, and nothing is ever written outside the package.
 */

import { Plugin, Skill } from "@opencode/plugin"
import { readFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { parseSkill, readCatalog } from "./catalog"

interface Skip {
  id: string
  reason: string
}

interface Report {
  loaded: string[]
  skipped: Skip[]
  broken: Skip[]
}

const here = dirname(fileURLToPath(import.meta.url))

/** The package root, wherever the plugin happened to be transpiled to. */
async function findRoot(): Promise<string> {
  for (const candidate of [here, resolve(here, ".."), resolve(here, "../..")]) {
    try {
      await readFile(join(candidate, "catalog.json"), "utf8")
      return candidate
    } catch {}
  }
  throw new Error("[skillpack] cannot find catalog.json in or above the plugin package")
}

export default Plugin.define({
  id: "skillpack",
  async setup(ctx) {
    const options = (ctx.options ?? {}) as {
      override?: boolean
      allowRequires?: boolean
      only?: string[]
    }

    const root = await findRoot()
    const catalog = await readCatalog(root)
    const report: Report = { loaded: [], skipped: [], broken: [] }
    const only = Array.isArray(options.only) ? new Set(options.only) : undefined

    const prepared: Array<{ id: string; name: string; description: string; path: string; body: string }> = []

    for (const entry of catalog.skills) {
      if (only && !only.has(entry.id)) continue
      if (entry.requires?.length && options.allowRequires !== true) {
        report.skipped.push({ id: entry.id, reason: `requires ${entry.requires.join(", ")}` })
        continue
      }
      const file = join(root, entry.dir, "SKILL.md")
      try {
        const parsed = parseSkill(await readFile(file, "utf8"), file)
        prepared.push({ id: entry.id, name: parsed.name, description: parsed.description, path: file, body: parsed.body })
      } catch (error) {
        report.broken.push({ id: entry.id, reason: error instanceof Error ? error.message : String(error) })
      }
    }

    if (prepared.length > 0) {
      await ctx.skill.transform((editor) => {
        const taken = new Set(editor.list().map((skill) => String(skill.id)))
        for (const skill of prepared) {
          if (taken.has(skill.id) && options.override !== true) {
            report.skipped.push({ id: skill.id, reason: "already installed" })
            continue
          }
          editor.add({
            id: Skill.ID.make(skill.id),
            name: Skill.Name.make(skill.name),
            description: skill.description,
            path: Skill.Info.fields.path.make(skill.path),
            content: skill.body,
          })
          report.loaded.push(skill.id)
        }
      })
      await ctx.skill.reload()
    }

    const summary = `[skillpack] ${report.loaded.length} loaded, ${report.skipped.length} skipped, ${report.broken.length} broken`
    if (report.broken.length > 0) console.error(summary, report.broken)
    else console.log(summary)
    for (const skip of report.skipped) console.log(`[skillpack] skipped ${skip.id}: ${skip.reason}`)
  },
})
