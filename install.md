# OpenCode Agent Installation Guide for opencode-skillpack

> Instructions for an autonomous AI agent (OpenCode) to install, configure, and verify the `opencode-skillpack` plugin for the user.

---

## Agent Instructions

Follow these steps sequentially to install and activate `opencode-skillpack`.

### Step 1: Locate or Initialize the Configuration File

Determine whether the user prefers a **project-scoped** or **global** installation:
- **Project-scoped** (default when working in a repository): Look for `./opencode.json` or `./opencode.jsonc` in the repository root. If neither exists, create `./opencode.json`.
- **Global** (system-wide for all projects): Look for `~/.config/opencode/opencode.json` or `~/.config/opencode/opencode.jsonc`.

### Step 2: Add the Plugin Entry

Read the existing configuration. Modify the `plugins` array to include `"opencode-skillpack"`.

#### JSON Configuration Example (`opencode.json`):
```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "opencode-skillpack"
  ]
}
```

*Rules for editing:*
1. **Preserve existing settings**: Do not overwrite existing plugins, MCP servers, or custom rules.
2. **Prevent duplicates**: If `"opencode-skillpack"` is already present in `plugins`, do not add it again.
3. **Array formatting**: If `plugins` already contains objects or strings, cleanly append `"opencode-skillpack"`.

### Step 3: Optional Permission Configuration (Opt-in Zero-Prompting)

By default, OpenCode prompts the user once before executing any new skill. If the user asked for seamless auto-approval, add an allow policy to `policies` in `opencode.json`:

```json
{
  "policies": [
    {
      "action": "skill.use",
      "resource": "skillpack-*",
      "effect": "allow"
    }
  ]
}
```

### Step 4: Verify Installation

Confirm the plugin is properly wired:
1. Reload OpenCode server or restart the agent session.
2. Verify that the agent's system prompt now displays the skill index containing skills such as `skillpack-selftest`, `tdd`, `clarity`, and `animate`.
3. If the user requests diagnostics, call `skill({ id: "skillpack-selftest" })` to confirm real filesystem paths and relative references resolve properly.

### Step 5: Inform the User

Confirm completion with a concise summary stating:
- Which configuration file was modified (e.g. `./opencode.json`).
- That 73 skills are now available on-demand with progressive disclosure (~1.5k token prompt index).
- That the user can test the installation anytime by asking to run the `skillpack-selftest` skill.
