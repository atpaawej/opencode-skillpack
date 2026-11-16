# Vendored skills are reviewed and pinned to a commit

Skills are executable instruction: a body can tell the agent to run anything. Bundling them from
upstream repositories therefore puts third-party authors inside the user's agent loop, and an
upstream force-push or a quiet edit becomes remote code execution with extra steps. Every vendored
entry is read by a human before it enters the catalog, pins the commit SHA it was taken from, and
carries its licence and attribution next to the copy. Upstream changes never reach users without a
release.

The rejected alternative was tracking upstream HEAD, which is more current and requires no
maintenance, at the cost of shipping instructions nobody read. The middle path — bundled entries
reviewed, registry-only entries marked `review: none` — is kept in the catalog schema so the
registry can carry unreviewed skills later without misrepresenting them.

**Status:** accepted

**Consequences:** adding a vendored skill is a review task, not a config change. The catalog's
`source`, `pin` and `license` fields are load-bearing, and a skill that cannot state them does not
belong in the bundle. Bundled skills are additionally the only ones eligible for the documented
`allow` permission snippet; unreviewed entries must never be covered by it.
