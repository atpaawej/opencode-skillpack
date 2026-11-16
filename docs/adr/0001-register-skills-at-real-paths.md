# Register skills as real filesystem paths, not copies or virtual entries

The plugin adds each bundled skill with `ctx.skill.transform(...)` using the absolute path of
`SKILL.md` inside the installed package, and never writes to `~/.config/opencode`, `~/.claude` or
`.opencode`. The two rejected alternatives were copying skill directories into a scanned location
(what `opencode-skills-collection` does) and registering a virtual `skill://id/SKILL.md` with
inlined content (what OpenCode's own built-in skills do).

The deciding factor is supporting files. A real path makes the skill indistinguishable from one the
user installed by hand: `<skill_files>` is populated, `read` resolves relative references, and the
base directory in the loaded body points somewhere that exists. A virtual path produces a skill
whose body references files the agent cannot open, and the plugin-facing `SkillEditor.add` takes no
file map, so it cannot fix that. Copying preserves all of it, but it writes outside the package,
duplicates state, and leaves orphaned directories on uninstall — a bad trade for a plugin whose
pitch is "no setup".

**Status:** accepted

**Consequences:** the plugin must locate its own package root at runtime. It resolves `catalog.json`
relative to `import.meta.url` and walks up two levels, which tolerates both `src/` and a built
`dist/`. A future bundling step that relocates the entry point must keep `catalog.json` and `skills/`
discoverable from it.
