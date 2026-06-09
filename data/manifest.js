/* Deck registry. The home page renders one tile per entry, in order.
   To add a deck: write data/<id>.js, then add a line here. Nothing else. */
window.DECKS = [
  { id: "foundations",  n: 1, title: "Foundations",
    subtitle: "Syntax, variables, references" },
  { id: "logic-state",  n: 2, title: "Logic & State",
    subtitle: "Operators, conditions, setting variables" },
  { id: "reasoning-actions", n: 3, title: "Reasoning & Actions",
    subtitle: "The reasoning block, actions, chaining" },
  { id: "tools-orchestration", n: 4, title: "Tools & Orchestration",
    subtitle: "Tools, subagents, transitions, routing" },
  { id: "flow-assembly", n: 5, title: "Flow, System & Assembly",
    subtitle: "Execution order, config blocks, capstones" },
  { id: "composing",  n: 6, title: "Composing Structures",
    subtitle: "Build whole blocks from memory" },
  { id: "collections", n: 7, title: "Collections & Data",
    subtitle: "Lists, indexing, objects, slot-filling" },
  { id: "routing",  n: 8, title: "Routing & Design",
    subtitle: "Multi-subagent flows and filtering" },
  { id: "debugging", n: 9, title: "Tracing & Debugging",
    subtitle: "Predict prompts, fix bugs" },
  { id: "capstones", n: 10, title: "Build an Agent",
    subtitle: "Extend and debug real agents" },
];
