# What a healthy skillpack looks like

- The skill body loads when invoked by ID.
- `reference/expected.md` is readable from the skill's base directory.
- Every skill listed in `catalog.json` appears in the skill index unless its ID was already taken.
- No skill in the index carries a body; only id, name and description are advertised.

This file exists so the self-test can prove that supporting files are reachable. If you can read
it, relative paths from the skill body work.
