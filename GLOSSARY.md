# Skillpack

A curated library of agent skills, delivered to OpenCode as a plugin, so that an agent has
a broad set of high-quality skills available without the user installing anything per skill.

## Language

### Skills

**Skill**:
A directory containing a `SKILL.md` whose instructions are loaded into the conversation only when the agent invokes it.
_Avoid_: prompt, tool, capability

**Skill ID**:
The identifier the `skill` tool accepts; also the key under which a skill appears in the skill index.
_Avoid_: name, slug

**Skill index**:
The list of available skills injected into the system prompt, carrying each skill's ID, name and description but never its body.
_Avoid_: skill list, manifest

**Autoinvoke**:
Whether a skill is advertised in the skill index at all; a skill with autoinvoke off is loadable only by exact ID.
_Avoid_: enable, visibility, hidden

### Distribution

**First-party skill**:
A skill authored for this project and licensed as part of it.
_Avoid_: our own skill, custom skill

**Vendored skill**:
A skill authored upstream, copied into the catalog with its licence and attributed to a pinned commit.
_Avoid_: third-party skill, external skill

**Catalog**:
The curated inventory of every skill this project knows about, including each one's source, pinned revision, licence and review status.
_Avoid_: registry, library, marketplace

**Bundle**:
The subset of the catalog shipped inside the npm package, available offline with no network call.
_Avoid_: pack contents, included skills

**Registry**:
A remote, versioned publication of the catalog that a client can consult for skills beyond its bundle.
_Avoid_: catalog server, marketplace
