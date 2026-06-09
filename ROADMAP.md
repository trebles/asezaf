# Agent Script, easy as Force — Curriculum Roadmap

The single source of truth for what gets built. Every deck is 25 cards, every
card is **type-from-memory** (read → type your answer → reveal → rate A/B/C),
and adding a deck never touches the engine — only `data/<id>.js` plus one line
in `data/manifest.js`. See `data/SCHEMA.md` for the card contract.

Scope is **Agent Script only**. Where a pattern touches platform pieces (Flows,
Apex, prompt templates, Omni-Channel), we treat them as "the thing an action
points at" and never turn the trainer into a Salesforce course. A platform track
could be a separate optional level later.

---

## Level 1 — Fluent reader & line-writer  ✅ DONE (125 cards)

After Level 1 a learner can read any snippet and write any single line of Agent
Script from memory. 71 of the 125 cards (57%) type real code; the rest are typed
short answers for the conceptual material. Zero multiple choice.

| # | id | Deck | Covers |
|---|----|------|--------|
| 1 | `foundations` | Foundations | Syntax, all variable types, `mutable`, naming, references, linked & system variables |
| 2 | `logic-state` | Logic & State | Full operator set, `if`/`else` + nesting, `is None`, `set`, counters, slot-fill token |
| 3 | `reasoning-actions` | Reasoning & Actions | The reasoning block, `->`/`\|`, interpolation, action definitions, `run/with/set`, chaining, `before`/`after_reasoning` |
| 4 | `tools-orchestration` | Tools & Orchestration | `reasoning.actions`, `available when`, subagents, router, transition vs consult vs reference, overrides, escalation |
| 5 | `flow-assembly` | Flow, System & Assembly | Execution paths, resolve-then-reason, `config`/`system`/`language`/`connection` blocks, linked & complex types, deploying |

---

## Level 2 — Agent designer  🔜 PLANNED (125 cards)

Level 2 is almost entirely **depth**, not new vocabulary: composing whole
structures, working with data, designing multi-subagent flows, and tracing /
debugging real agents. Card counts are ~25 and may flex ±2 as content firms up.

Each deck below lists its intent, representative card themes (the *shape*, not
all 25), the expected card-type mix, and the docs to pull **before** writing it
— some samples didn't extract cleanly the first time and must be fetched
verbatim so we copy correct indentation instead of reconstructing it.

### Deck 6 — `composing` · Composing Structures
**Intent:** build complete multi-line blocks from memory, not just single lines.
This is where typing-from-memory gets genuinely demanding.

Representative cards: a full `config` block; a `system` block with welcome +
error; a complete action definition (name, multiline description, typed inputs,
outputs with properties, target); a reasoning block with interleaved logic +
prompt; an `if`/`else` that chooses prompts; a tool in `reasoning.actions` with
`with`/`set`; the same tool gated by `available when`; a subagent skeleton; a
`start_agent` skeleton; `before`/`after_reasoning` blocks; correct **top-level
block order**; an action exposed both as logic action and as a tool.

Type mix: heavy `assemble` + multi-line `write`.
**Pull first:** the two worked example agents (full listings) for verified
nesting/indentation.

### Deck 7 — `collections` · Collections & Data
**Intent:** the data-handling syntax Level 1 only introduced.

Representative cards: list declaration recap; lists of numbers/strings;
**indexing into a list**; **iterating a list**; using a list element like a
normal variable; object declaration + field access; nested objects; slot-filling
with `...` across contexts; `@utils.setVariables` with a `description` for
extraction; a `linked` variable fed by an action output; passing
`@system_variables.user_input` into an action; setting list/object variables.

Type mix: mostly `write`, some `predict`.
**Pull first:** `ascript-patterns-var-list` (list/collection indexing &
iteration) and `ascript-patterns-variables`.

### Deck 8 — `routing` · Routing & Design
**Intent:** design judgment across multiple subagents — the "which tool for this
goal" decisions.

Representative cards: router classification design; **required-step workflow**
(force users through verification first); `available when` on subagents to gate
routing; layered filters (verified **and** business hours); transition vs
`consult` vs direct reference — pick the right one for a goal; building a return
transition; conditional transitions on variable state; fetch-data in the router;
per-subagent `system.instructions` for voice/tone; protecting business-sensitive
features from prompt manipulation.

Type mix: `write`, `recall` (design judgment), some `assemble`.
**Pull first:** `ascript-patterns-required-flow`, `ascript-patterns-topic-selector`,
`ascript-patterns-transitions`, `ascript-patterns-conditionals`.

### Deck 9 — `debugging` · Tracing & Debugging
**Intent:** read execution like the engine does, and find what's broken.

Representative cards: **predict the resolved prompt** from a subagent (the
flow-doc trace style); execution-order traces; what a transition discards;
`after_reasoning` skipped when a transition fires partway; counter/`num_turns`
predictions; and a run of **fix-the-bug** cards on realistic snippets — lowercase
boolean, missing `mutable` before `set`, illegal `else if`, mixed
indentation, `== None` instead of `is None`, wrong transition form inside
`after_reasoning`, naming-rule violations, missing `welcome`/`error`, action run
in logic without manual I/O, the last-line parser gotcha, the "any available
tool is callable" trap.

Type mix: `predict` + `fix` heavy.
**Pull first:** mostly buildable from docs already read; the worked example
agents sharpen the realistic multi-line bug snippets.

### Deck 10 — `capstones` · Build an Agent
**Intent:** work end-to-end with the two real reference agents.

Representative cards: read-and-explain, fill-the-blank, extend, and debug the
**Customer Support** agent (verify identity → order info) and the **Multi-Turn
Interview** agent (step-based, enforces question order); given a goal, choose the
block structure to implement it.

Type mix: `assemble`, `fix`, `write`, `predict`.
**Pull first (required):** `ascript-examples-customer-support`,
`ascript-examples-multi-turn`, and the **Agent Script Recipes** sample-app repo —
full agent listings, fetched verbatim.

---

## Build order & mechanics

1. **Level 1 UI first** — `engine.js`, `index.html`, `pack.html`, the shared
   stylesheet, and `README.md`. This makes decks 1–5 usable and shippable to
   Cloudflare Pages. (Content for 1–5 is already final and validated.)
2. **Level 2 content** — author decks 6–10 into the same `data/` structure. No
   engine work needed; each deck is a data file + a manifest line.

A Level 2 deck is only added to `manifest.js` once its `data/<id>.js` exists, so
the home page never links to a deck that isn't there yet.

## Where this lands learners

- **125 cards (Level 1):** fluent reader; can write any single line cold.
- **250 cards (Level 2):** can compose, route, trace, and debug a whole agent.
