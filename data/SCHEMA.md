# Deck authoring guide

Everything the trainer teaches lives in `data/`. The engine and UI never need to
change to add content — you only ever write a deck file and register it.

## Add a new deck in 3 steps

1. **Create `data/<deck-id>.js`** — copy the shape of `foundations.js`:

   ```js
   window.PACKS = window.PACKS || {};
   window.PACKS["my-deck-id"] = [
     { /* card */ },
     { /* card */ },
   ];
   ```

2. **Register it in `data/manifest.js`** — add one line to the array:

   ```js
   { id: "my-deck-id", n: 6, title: "My Deck", subtitle: "What it covers", cards: 25 }
   ```

3. That's it. The home page reads `manifest.js` and lists the deck; visiting
   `pack.html?p=my-deck-id` runs it. No engine or markup edits.

A deck is just an array, so it can hold 25 cards or any other number — `cards`
in the manifest is only the count shown on the home tile.

## Card shape

```js
{
  id:     "bool",                 // unique within the deck (used as the storage key)
  tier:   "Variables",            // grouping label shown on the card header
  type:   "write",                // see card types below
  skill:  "A changeable boolean", // the card title
  lesson: "Booleans accept only <code>True</code> or <code>False</code>…",
  task:   "Declare a changeable boolean is_member defaulting to false.",
  answer: "is_member: mutable boolean = False",
  why:    "This is the everyday slot for yes/no state the agent flips mid-chat."
}
```

`lesson` may contain light HTML: `<code>`, `<b>`. Everything else is plain text.

## Card types

Every card uses the **same interaction**: read it, type your answer, reveal the
model answer, then rate yourself A / B / C. There are no multiple-choice cards —
the learner always produces the answer from memory, which is what builds real
fluency in the language. `type` only changes what the card asks for and how the
answer is framed:

| type       | What the learner types                           | `answer` holds            |
| ---------- | ------------------------------------------------ | ------------------------- |
| `write`    | A line/snippet of Agent Script                   | the model answer          |
| `fix`      | The corrected version of a broken line           | the corrected line        |
| `recall`   | A short factual / true-false answer              | the expected answer       |
| `predict`  | The result of a snippet                          | the expected result       |
| `assemble` | Given pieces, in the right order                 | the assembled snippet     |

The A/B/C self-rating is the real grading — there's no auto-marking, because a
line of Agent Script has many valid spellings. The reveal is the answer key; the
honesty is the learner's.

## Storage

Progress is keyed per deck in `localStorage` under `asc_<deck-id>_v1`, with an
in-memory fallback when storage is unavailable. Decks are fully independent:
resetting or completing one never touches another.
