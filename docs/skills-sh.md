# Skills.sh Marketplace Research & Curation Guide

> Comprehensive research on the **skills.sh** ecosystem, install statistics, category leaders, and candidate curation for `opencode-skillpack`.

## 1. What skills.sh Actually Is

**skills.sh** (web portal: [skills.sh](https://www.skills.sh)) is a centralized open registry, directory, and package management ecosystem for **AI Agent Skills**, hosted on Vercel. Rather than maintaining its own proprietary package hosting infrastructure, skills.sh acts as an indexing and discovery engine over GitHub-hosted repositories that adhere to the Agent Skills specification (`SKILL.md` frontmatter + markdown instructions).

### Key Mechanism & Architecture

- **Repository-Backed Format**: Skills are hosted in normal git repositories (e.g. `mattpocock/skills`, `emilkowalski/skills`, `coreyhaines31/marketingskills`). Each skill is a directory containing a `SKILL.md` with YAML frontmatter (`name`, `description`) and markdown instructions, optionally accompanied by reference files or scripts.
- **CLI Packaging (`npx skills`)**: Developers and agents install skills using the `skills` CLI (`npx skills add <github-repo>` or `npx skills find <keyword>`), which clones/fetches the repository into local agent directories such as `~/.agents/skills/`, `.claude/skills/`, or `.opencode/skills/`.
- **Search & Index API**: skills.sh indexes the ecosystem using Algolia. It exposes an unauthenticated live search API endpoint at `GET https://www.skills.sh/api/search?q=<query>`, returning ranked matching skills with their repository source, skill ID, name, and cumulative install telemetry.
- **Scale**: As of late 2026, skills.sh indexes over **9,903 skills** across the open-source ecosystem, accounting for over **1.43M+ all-time skill installations**.

## 2. How Popularity Is Measured & Its Limitations

Popularity on skills.sh is tracked along two explicit vectors:

1. **`installs` (All-time Downloads)**: A cumulative counter incremented whenever an agent or human uses `npx skills add` to fetch the skill.
2. **`weeklyInstalls`**: An array of the trailing 8 weeks of install counts, revealing velocity and active usage.
3. **GitHub Stargazers**: The upstream GitHub repository's star count provides an external measure of community trust and reputation.

### Limitations of the Signal

- **Suite-Level Distortion**: When a user runs `npx skills add mattpocock/skills` or `heygen-com/hyperframes`, all 50+ skills in that repository receive an install tick simultaneously. High-profile mono-repos have uniformly massive install numbers across both niche and essential skills.
- **No Quality or Review Metric**: Install numbers reflect discovery and batch downloads, not user satisfaction, model completion success, or safety review.
- **Supply Chain Trust**: Anyone can publish a skill by creating a public GitHub repository. Without human curation, skills can contain outdated advice, tool dependencies that fail silently, or unvetted instructions.

## 3. Comprehensive Skills Table

Below is the curated inventory of 72 top-performing skills across the requested categories (Coding, SEO, Marketing, Research, Database, Frontend, UI Design, Animations/Motion, and Design Best Practices), backed by live skills.sh install data and GitHub repository inspection.

| Skill ID | Category | What It Does | Popularity (Installs) | Needs Tooling | Licence | Upstream Source |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `improve-codebase-architecture` | **Coding** | Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick. | 1,271,467 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `tdd` | **Coding** | Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests. | 1,244,450 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `diagnosing-bugs` | **Coding** | Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports something broken/throwing/failing/slow. | 936,324 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `codebase-design` | **Coding** | Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find deepening opportunities, decide where a seam... | 958,497 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `code-review` | **Coding** | Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes: Standards (does the code follow this repo's documented coding standards?)... | 896,922 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `git-guardrails-claude-code` | **Coding** | Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, branch -D, etc.) before they execute. Use when user wants to... | 562,702 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `setup-pre-commit` | **Coding** | Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in the current repo. Use when user wants to add pre-commit hooks, set... | 551,905 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `webapp-testing` | **Coding** | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing… | 206,354 | Yes (CLI/API) | Custom / No license declared | [anthropics/skills](https://github.com/anthropics/skills) |
| `browser-testing-with-devtools` | **Coding** | Tests in real browsers via Chrome DevTools MCP. Use when building or debugging anything that runs in a browser. Use when you need to inspect... | 71,569 | Yes (CLI/API) | MIT | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) |
| `seo-audit` | **SEO** | When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user mentions "SEO audit," "technical SEO," "why... | 256,082 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `ai-seo` | **SEO** | When the user wants to optimize content for AI search engines, get cited by LLMs, or appear in AI-generated answers. Also use when the user... | 166,011 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `programmatic-seo` | **SEO** | When the user wants to create SEO-driven pages at scale using templates and data. Also use when the user mentions "programmatic SEO," "template pages," "pages... | 162,545 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `site-architecture` | **SEO** | When the user wants to plan, map, or restructure their website's page hierarchy, navigation, URL structure, or internal linking. Also use when the user mentions... | 134,986 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `schema-markup` | **SEO** | When the user wants to add, fix, or optimize schema markup and structured data on their site. Also use when the user mentions &quot;schema markup,&quot;... | 55,479 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `link-building` | **SEO** | When the user wants to earn backlinks or third-party mentions that lift rankings and AI citations. Also use when the user mentions 'link building,' 'linkbuilding,'... | 13,190 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `aso` | **SEO** | When the user wants to audit or optimize an App Store or Google Play listing. Also use when the user mentions 'ASO audit,' 'app store... | 86,444 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `copywriting` | **Marketing** | When the user wants to write, rewrite, or improve marketing copy for any page, including homepage, landing pages, pricing pages, feature pages, about pages, or... | 256,635 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `marketing-psychology` | **Marketing** | When the user wants to apply psychological principles, mental models, or behavioral science to marketing. Also use when the user mentions 'psychology,' 'mental models,' 'cognitive... | 178,845 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `content-strategy` | **Marketing** | When the user wants to plan a content strategy, decide what content to create, or figure out what topics to cover. Also use when the... | 178,754 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `copy-editing` | **Marketing** | When the user wants to edit, review, or improve existing marketing copy, or refresh outdated content. Also use when the user mentions 'edit this copy,'... | 163,133 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `marketing-ideas` | **Marketing** | When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product. Also use when the user asks for 'marketing ideas,' 'growth... | 158,784 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `cold-email` | **Marketing** | Write and run B2B cold outbound that gets replies, from cold emails and follow-ups to sending setup, LinkedIn, multichannel cadences, and reply handling. Use when... | 139,805 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `ad-creative` | **Marketing** | When the user wants to generate, iterate, or scale ad creative — headlines, descriptions, primary text, or full ad variations — for any paid advertising... | 148,021 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `churn-prevention` | **Marketing** | When the user wants to reduce churn, build cancellation flows, set up save offers, recover failed payments, or implement retention strategies. Also use when the... | 131,762 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `sales-enablement` | **Marketing** | When the user wants to create sales collateral, pitch decks, one-pagers, objection handling docs, or demo scripts. Also use when the user mentions 'sales deck,'... | 130,146 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `customer-research` | **Marketing** | When the user wants to conduct, analyze, or synthesize customer research. Use when the user mentions "customer research," "ICP research," "talk to customers," "analyze transcripts,"... | 127,703 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `lead-magnets` | **Marketing** | When the user wants to create, plan, or optimize a lead magnet for email capture or lead generation. Also use when the user mentions "lead... | 124,340 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `cro` | **Marketing** | When the user wants to optimize, improve, or increase conversions on any marketing page or form — including homepage, landing pages, pricing pages, feature pages,... | 104,966 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `pricing` | **Marketing** | When the user wants help with pricing decisions, packaging, or monetization strategy. Also use when the user mentions 'pricing,' 'pricing tiers,' 'freemium,' 'free trial,' 'packaging,'... | 91,809 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `onboarding` | **Marketing** | When the user wants to optimize post-signup onboarding, user activation, first-run experience, or time-to-value. Also use when the user mentions "onboarding flow," "activation rate," "user... | 84,571 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `paywalls` | **Marketing** | When the user wants to create or optimize in-app paywalls, upgrade screens, upsell modals, or feature gates. Also use when the user mentions "paywall," "upgrade... | 81,339 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `research` | **Research** | Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Use when the user wants a topic... | 809,034 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `competitor-profiling` | **Research** | When the user wants to research, profile, or analyze competitors from their URLs. Also use when the user mentions 'competitor profile,' 'competitor research,' 'competitor analysis,'... | 106,560 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `ai-research-explore` | **Research** | Rigor Explore compatible skill slug for meaningful and potentially novel deep learning research candidates. Use when the researcher has chosen the task family,… | 359,895 | No (Markdown only) | MIT | [lllllllama/rigorpilot-skills](https://github.com/lllllllama/rigorpilot-skills) |
| `tinyfish-websearch` | **Research** | Free web search and page reading with TinyFish search and fetch_content. Use for any question needing current web information, reading known URLs, or multi-source research... | Curated / Emerging | Yes (CLI/API) | MIT | [tinyfish/skills](https://github.com/tinyfish/skills) |
| `supabase-postgres-best-practices` | **Database** | Postgres best practices maintained by Supabase, for Postgres running anywhere. Load this skill BEFORE writing or changing anything that lives in a Postgres… | 487,266 | No (Markdown only) | MIT | [supabase/agent-skills](https://github.com/supabase/agent-skills) |
| `prisma-database-setup` | **Database** | Deprecated compatibility name for prisma-orm-setup. Use only when a user or existing integration explicitly invokes prisma-database-setup; otherwise select… | 428,310 | Yes (CLI/API) | MIT | [prisma/skills](https://github.com/prisma/skills) |
| `prisma-client-api` | **Database** | Prisma Client API reference covering model queries, filters, operators, and client methods. Use when writing database queries, using CRUD operations, filtering… | 430,221 | No (Markdown only) | MIT | [prisma/skills](https://github.com/prisma/skills) |
| `prisma-postgres` | **Database** | Deprecated compatibility name for prisma-postgres-setup. Use only when a user or existing integration explicitly invokes prisma-postgres; otherwise select… | 420,126 | No (Markdown only) | MIT | [prisma/skills](https://github.com/prisma/skills) |
| `supabase` | **Database** | Use when doing ANY task involving Supabase. Triggers: Supabase products (Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues); client… | 366,896 | Yes (CLI/API) | MIT | [supabase/agent-skills](https://github.com/supabase/agent-skills) |
| `vercel-react-best-practices` | **Frontend** | React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js… | 902,979 | No (Markdown only) | Custom / No license declared | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |
| `next-best-practices` | **Frontend** | Next.js best practices - file conventions, RSC boundaries, data patterns, async APIs, metadata, error handling, route handlers, image/font optimization, bundling | 6,837 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `vercel-react-view-transitions` | **Frontend** | Guide for implementing smooth, native-feeling animations using React&#x27;s View Transition API (`&lt;ViewTransition&gt;` component, `addTransitionType`, and CSS view… | 192,426 | No (Markdown only) | Custom / No license declared | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |
| `ask-sonner` | **Frontend** | Guide to Sonner, the React toast library — install and wire up the Toaster, pick the right toast() call, promise and loading toasts, updating, dismissing... | 186,856 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `better-icons` | **Frontend** | Use when working with icons in any project. Provides CLI for searching 200+ icon libraries (Iconify) and retrieving SVGs. Commands: `better-icons search <query>` to find... | Curated / Emerging | Yes (CLI/API) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `shadcn` | **Frontend** | Manages shadcn components and projects — adding, searching, fixing, debugging, styling, and composing UI, including chat interfaces. Provides project context, component docs, and usage examples.... | 271,099 | Yes (CLI/API) | MIT | [shadcn/skills](https://github.com/shadcn/skills) |
| `frontend-design` | **UI Design** | Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't... | 1,124,303 | No (Markdown only) | Custom / No license declared | [anthropics/skills](https://github.com/anthropics/skills) |
| `apple-design` | **UI Design** | Apple's approach to interface design and fluid, physical motion, translated for the web. Use when building or reviewing gesture-driven UI, spring animations, drag/swipe/sheet interactions, momentum... | 303,950 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `emil-design-eng` | **UI Design** | This skill encodes Emil Kowalski's philosophy on UI polish, component design, animation decisions, and the invisible details that make software feel great. | 452,289 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `better-typography` | **UI Design** | Sets and reviews how text renders, from the type scale and spacing to font features, wrapping, truncation and punctuation. | Curated / Emerging | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `break-ui` | **UI Design** | Try to break a piece of UI by feeding it worst-case data — long names, unbreakable emails, one-letter names, missing fields, huge counts, zero items,... | 115,802 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `mobile-native` | **UI Design** | Make a web app feel native on a phone — the small CSS and meta-tag fixes that separate "a website in a browser" from something... | 136,717 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `accessibility` | **UI Design** | Audit and improve web accessibility following WCAG 2.2 guidelines. Use when asked to &quot;improve accessibility&quot;, &quot;a11y audit&quot;, &quot;WCAG compliance&quot;, &quot;screen reader… | 70,844 | No (Markdown only) | MIT | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) |
| `ui-taste` | **UI Design** | Agent guidance and workflow instructions. | 1,096,299 | No (Markdown only) | UNVERIFIED | [uizze.sh](https://www.npmjs.com/package/modern-web-guidance) |
| `pick-ui-library` | **UI Design** | Pick the right library for a given frontend task from a curated, opinionated list — numbers, OTP inputs, charts, command menus, virtualization, drag and drop,... | 234,348 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `review-animations` | **Animations** | Reviews animation and motion code against a high craft bar derived from Emil Kowalski's design engineering philosophy. Default to flagging; approval is earned. | 312,130 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `animation-vocabulary` | **Animations** | Reverse-lookup glossary that turns a vague description of a web animation or motion effect into its exact term ("the bouncy thing when a popover opens"... | 289,922 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `improve-animations` | **Animations** | Survey a codebase's animation and motion code as a senior motion advisor, then produce a prioritized audit and self-contained implementation plans for other agents (or... | 277,310 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `find-animation-opportunities` | **Animations** | Search a codebase or UI for places that don't animate but should, and reject everything that shouldn't. Read-only; it proposes motion with exact values, it... | 260,086 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `animate` | **Animations** | Build an animation from scratch, making the decisions in the order that determines whether it feels right — should it animate at all, what purpose,... | 227,382 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `animate-expo` | **Animations** | Build animations in React Native and Expo, making the decisions in the order that determines whether they feel right — should it animate, which thread... | 184,623 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `animation-performance` | **Animations** | Keep web animations inside the frame budget — animate composite-only properties, keep motion off the main thread when the page is busy, and find the... | 88,092 | No (Markdown only) | MIT | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| `hyperframes-animation` | **Animations** | All animation knowledge for HyperFrames — atomic motion rules, multi-phase scene blueprints, scene transitions, broader motion-design techniques, AND the seven… | 1,005,552 | Yes (CLI/API) | Apache-2.0 | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) |
| `remotion-best-practices` | **Animations** | Router for all Remotion skills | 832,903 | No (Markdown only) | Remotion License / MIT | [remotion-dev/skills](https://github.com/remotion-dev/skills) |
| `grill-me` | **Best Practices** | A relentless interview to sharpen a plan or design. | 1,557,417 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `grilling` | **Best Practices** | Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases. | 1,112,599 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `grill-with-docs` | **Best Practices** | A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go. | 1,331,735 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `domain-modeling` | **Best Practices** | Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing a GLOSSARY.md, or recording or editing an ADR. | 984,360 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `prototype` | **Best Practices** | Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check whether a state model or logic feels right, or... | 1,083,207 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `handoff` | **Best Practices** | Compact the current conversation into a handoff document for another agent to pick up. | 1,141,054 | No (Markdown only) | MIT | [mattpocock/skills](https://github.com/mattpocock/skills) |
| `writing-for-agents` | **Best Practices** | Writing documents for agents. Use when creating or editing skills, or modifying AGENTS.md or CLAUDE.md. | 561,546 | No (Markdown only) | MIT | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) |
| `modern-web-guidance` | **Frontend / Web** | Search tool for modern web development best practices. MANDATORY: Execute FIRST for all HTML/CSS and clientside JS tasks. Do NOT skip — web APIs evolve... | Curated / Emerging | Yes (CLI/API) | Apache-2.0 | [chrome-devtools/modern-web-guidance](https://www.npmjs.com/package/modern-web-guidance) |

## 4. Deep Dive: `modern-web-guidance`

The user specifically requested analysis of **`modern-web-guidance`**. Here is the factual breakdown:

- **Publisher & Authors**: Official package published by the **Google Chrome Developer Relations team** (`paulirish`, `rviscomi`, `hoten`, `micahjo7`).
- **Distribution**: Published to npm as `modern-web-guidance@1.0.0` (unpacked size: 16.5 MB).
- **Official Documentation**: [developer.chrome.com/docs/modern-web-guidance](https://developer.chrome.com/docs/modern-web-guidance)
- **Licence**: **Apache-2.0** (clean, permissive open-source).
- **What It Covers**: High-authority, cutting-edge web platform capabilities that frequently hallucinate or generate obsolete polyfills in LLMs: native `<dialog>` modals, Popover API, CSS Anchor Positioning, Container Queries, View Transitions API, scroll-driven animations, Core Web Vitals (INP, LCP, CLS), modern form autofill, and HTML sanitization.

### Compatibility with `opencode-skillpack` Architecture

Under our established architectural decisions (**ADR 0001: Real Paths** and **ADR 0002: Instructions-Only & Pinned**):

1. **Tooling Dependency Issue**: The native `modern-web-guidance` skill requires the agent to invoke `npx -y modern-web-guidance@latest search "<query>"` and `retrieve "<id>"`. It is **not** an instructions-only markdown skill; it shells out to an external CLI tool backed by a 16.5 MB database.
2. **Zero-Install Conflict**: Bundling it in the default `opencode-skillpack` bundle would break the zero-install promise if the user is offline or restricts shell execution.
3. **Recommendation**: 
   - In `catalog.json`, record `modern-web-guidance` with `requires: ["npx", "modern-web-guidance"]`. By our loader rules, skills with `requires` are excluded from the default bundle and activated only when `allowRequires: true` is configured.
   - **Alternative**: Extract the most critical static guidance checklists into first-party reference markdown files (e.g., `skills/modern-web-primitives/SKILL.md`), keeping it pure markdown without CLI execution.

## 5. Recommended Bundle for `opencode-skillpack` (Top 25 Core Skills)

To deliver on the product hypothesis—*high quality, zero-install, instructions-only, MIT/Apache-2.0 licensed*—we recommend the following 25 skills as the core bundle for v0:

| # | Skill ID | Category | Licence | Source | Selection Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `improve-codebase-architecture` | **Coding** | MIT | `mattpocock/skills` | High-leverage architectural review that prevents code rot. |
| 2 | `tdd` | **Coding** | MIT | `mattpocock/skills` | Strict test-driven development loop for reliable agent code generation. |
| 3 | `diagnosing-bugs` | **Coding** | MIT | `mattpocock/skills` | Systematic root-cause diagnosis for tough failures before modifying code. |
| 4 | `codebase-design` | **Coding** | MIT | `mattpocock/skills` | Interface design and deep-module boundaries from John Ousterhout's principles. |
| 5 | `code-review` | **Coding** | MIT | `coreyhaines31/marketingskills` | Two-axis review (spec compliance & coding standards) on git diffs. |
| 6 | `git-guardrails-claude-code` | **Coding** | MIT | `mattpocock/skills` | Blocks destructive git operations (force push, hard reset) during AFK runs. |
| 7 | `frontend-design` | **UI Design** | Custom / Review Needed | `anthropics/skills` | Production-grade UI styling guidance that avoids generic AI aesthetics. |
| 8 | `apple-design` | **UI Design** | MIT | `emilkowalski/skills` | Fluid gesture-driven UI, spring mechanics, and spatial interface standards. |
| 9 | `better-typography` | **UI Design** | MIT | `emilkowalski/skills` | Systematic typographic scale, font features, wrapping, and hierarchy polish. |
| 10 | `break-ui` | **UI Design** | MIT | `emilkowalski/skills` | Stress-tests components against extreme boundary and worst-case data. |
| 11 | `mobile-native` | **UI Design** | MIT | `emilkowalski/skills` | Fixes 100vh bugs, touch targets, and sticky hover states for mobile web. |
| 12 | `animate` | **Animations** | MIT | `emilkowalski/skills` | First-principles web animation decisions: curves, durations, and exits. |
| 13 | `animation-performance` | **Animations** | MIT | `emilkowalski/skills` | Keeps animations on composite layers to prevent dropped frames. |
| 14 | `review-animations` | **Animations** | MIT | `emilkowalski/skills` | Critique and audit existing CSS/Framer motion for jank and over-animation. |
| 15 | `supabase-postgres-best-practices` | **Database** | MIT | `supabase/agent-skills` | PostgreSQL schema, indexing, and query performance rules. |
| 16 | `prisma-client-api` | **Database** | MIT | `prisma/skills` | Correct queries and relation patterns for modern ORM development. |
| 17 | `copywriting` | **Marketing** | MIT | `coreyhaines31/marketingskills` | Sharp, conversion-oriented copy free of generic AI phrasing and clichés. |
| 18 | `seo-audit` | **SEO** | MIT | `coreyhaines31/marketingskills` | Technical SEO diagnostic loop for on-page tags, indexing, and Core Web Vitals. |
| 19 | `programmatic-seo` | **SEO** | MIT | `coreyhaines31/marketingskills` | Templates and schema patterns for generating landing pages at scale. |
| 20 | `cro` | **Marketing** | MIT | `coreyhaines31/marketingskills` | Conversion rate optimization heuristics for landing pages and signups. |
| 21 | `marketing-psychology` | **Marketing** | MIT | `coreyhaines31/marketingskills` | Cognitive biases, framing, and mental models for messaging. |
| 22 | `grill-me` | **Best Practices** | MIT | `mattpocock/skills` | Relentlessly interviews the user to eliminate ambiguity before implementation. |
| 23 | `domain-modeling` | **Best Practices** | MIT | `mattpocock/skills` | Maintains GLOSSARY.md and ADRs to prevent conceptual model drift. |
| 24 | `prototype` | **Best Practices** | MIT | `mattpocock/skills` | Rapid throwaway prototypes to sanity-check complex UX or state logic. |
| 25 | `research` | **Research** | MIT | `coreyhaines31/marketingskills` | Investigates primary sources and synthesizes structured markdown reports. |

## 6. Already Installed Locally on This Machine

A substantial portion of the top-performing marketplace skills are already present locally in `/home/aawej/.agents/skills/` (134 total skills installed):

- **Matt Pocock Collection (All Present)**: `grill-me`, `grilling`, `grill-with-docs`, `tdd`, `diagnosing-bugs`, `codebase-design`, `improve-codebase-architecture`, `domain-modeling`, `prototype`, `handoff`.
- **Corey Haines Marketing Collection (All Present)**: `copywriting`, `seo-audit`, `ai-seo`, `programmatic-seo`, `cro`, `emails`, `cold-email`, `lead-magnets`, `content-strategy`, `marketing-ideas`.
- **Emil Kowalski Design/Motion Collection (All Present)**: `animate`, `animate-expo`, `animation-performance`, `animation-vocabulary`, `apple-design`, `better-typography`, `break-ui`, `emil-design-eng`, `mobile-native`, `review-animations`.
- **Anthropic Official Skills**: `frontend-design`.

> **Significance for Vendoring**: Because these repositories are already on the machine, vendoring them into `opencode-skillpack` can be done by copying verified local files, pinning their upstream commit SHAs, and preserving their MIT licenses.

## 7. Gaps & Opportunities for First-Party Skills

Where the skills.sh public directory is currently weak or unbalanced:

1. **General Database Performance (Non-ORM)**: Most database skills are branded specifically for Prisma or Supabase. There is a lack of general raw PostgreSQL, SQLite, and DuckDB performance/migration skills.
2. **API & Contract Design**: Beyond OpenAPI generator wrappers, there are few deep skills covering idempotent webhook design, event-driven architecture, or schema versioning.
3. **Agent Self-Diagnostics**: Tools to audit context usage, detect prompt injection in web fetch content, and prevent infinite agent tool loops are scarce.

## 8. Primary Sources & Citations

- **Registry Web Portal**: [https://www.skills.sh](https://www.skills.sh)
- **Search API Endpoint**: `https://www.skills.sh/api/search?q=<query>`
- **Matt Pocock Skills Repository**: [github.com/mattpocock/skills](https://github.com/mattpocock/skills) (MIT)
- **Corey Haines Marketing Skills**: [github.com/coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT)
- **Emil Kowalski Design Skills**: [github.com/emilkowalski/skills](https://github.com/emilkowalski/skills) (MIT)
- **HeyGen Hyperframes**: [github.com/heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) (Apache-2.0)
- **Prisma Skills**: [github.com/prisma/skills](https://github.com/prisma/skills) (MIT)
- **Supabase Agent Skills**: [github.com/supabase/agent-skills](https://github.com/supabase/agent-skills) (MIT)
- **Chrome Modern Web Guidance**: [developer.chrome.com/docs/modern-web-guidance](https://developer.chrome.com/docs/modern-web-guidance) / [npmjs.com/package/modern-web-guidance](https://www.npmjs.com/package/modern-web-guidance) (Apache-2.0)
