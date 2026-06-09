/* Pack 9 — Tracing & Debugging
   Grounded verbatim in the official trailheadapps/agent-script-recipes .agent files.
   Every card is type-from-memory: read, type your answer, reveal, rate A/B/C. */
window.PACKS = window.PACKS || {};
window.PACKS["debugging"] = [
  {
    "id": "fix_bool",
    "tier": "Fix",
    "type": "fix",
    "skill": "Boolean case",
    "lesson": "Booleans must be capitalised.",
    "task": "Fix: is_active: mutable boolean = true",
    "answer": "is_active: mutable boolean = True",
    "why": "Lowercase true/false won't compile."
  },
  {
    "id": "fix_mutable",
    "tier": "Fix",
    "type": "fix",
    "skill": "Set needs mutable",
    "lesson": "Only mutable variables can be changed with set.",
    "task": "This variable gets set later but won't compile — fix: status: string = \"new\"",
    "answer": "status: mutable string = \"new\"",
    "why": "Without mutable, any later set is invalid."
  },
  {
    "id": "fix_elseif",
    "tier": "Fix",
    "type": "recall",
    "skill": "No else if",
    "lesson": "There is no else if.",
    "task": "You wrote 'else if @variables.x:'. What do you do instead?",
    "answer": "Use a nested if inside the else block.",
    "why": "Only if and else exist."
  },
  {
    "id": "fix_none",
    "tier": "Fix",
    "type": "fix",
    "skill": "Empty check",
    "lesson": "Test emptiness with is None, not == None.",
    "task": "Fix: if @variables.x == None:",
    "answer": "if @variables.x is None:",
    "why": "is checks identity for empties."
  },
  {
    "id": "fix_indent",
    "tier": "Fix",
    "type": "recall",
    "skill": "Indentation",
    "lesson": "Indentation must be consistent.",
    "task": "Your script mixes tabs and spaces and won't parse. What's the rule?",
    "answer": "Pick one (spaces or tabs) and use it consistently — never mix.",
    "why": "Mixing breaks the whitespace-sensitive parser."
  },
  {
    "id": "fix_after_transition",
    "tier": "Fix",
    "type": "fix",
    "skill": "Transition in after_reasoning",
    "lesson": "after_reasoning uses the plain transition form.",
    "task": "Fix this line inside after_reasoning: @utils.transition to @subagent.wrap_up",
    "answer": "transition to @subagent.wrap_up",
    "why": "@utils.transition to defines a tool; logic blocks use transition to."
  },
  {
    "id": "fix_set_eq",
    "tier": "Fix",
    "type": "fix",
    "skill": "Compare vs assign",
    "lesson": "== compares; = assigns.",
    "task": "Fix this condition: if @variables.count = 10:",
    "answer": "if @variables.count == 10:",
    "why": "A single = is assignment, not a comparison."
  },
  {
    "id": "fix_name",
    "tier": "Fix",
    "type": "fix",
    "skill": "Consecutive underscores",
    "lesson": "Names can't contain consecutive underscores.",
    "task": "Fix this name: order__id",
    "answer": "order_id",
    "why": "Also: start with a letter, no trailing underscore."
  },
  {
    "id": "fix_target",
    "tier": "Fix",
    "type": "fix",
    "skill": "Target type case",
    "lesson": "Target type prefixes are lowercase.",
    "task": "Fix: target: \"Flow://GetOrder\"",
    "answer": "target: \"flow://GetOrder\"",
    "why": "apex, flow, prompt — all lowercase."
  },
  {
    "id": "fix_pipe_after",
    "tier": "Fix",
    "type": "recall",
    "skill": "No prompt in after_reasoning",
    "lesson": "after_reasoning can't contain a prompt.",
    "task": "Your after_reasoning block has a | prompt line. Is that valid?",
    "answer": "No — after_reasoning can't contain a | prompt.",
    "why": "It runs after the LLM, so there's no prompt to add."
  },
  {
    "id": "pred_increment",
    "tier": "Trace",
    "type": "predict",
    "skill": "Counter value",
    "lesson": "Logic runs each turn during parsing.",
    "task": "turn_count starts at 0 and each turn runs set turn_count = turn_count + 1. Its value on the third turn?",
    "answer": "3",
    "why": "It increments once per turn, deterministically."
  },
  {
    "id": "pred_resolve",
    "tier": "Trace",
    "type": "predict",
    "skill": "Resolve, then send",
    "lesson": "The prompt is built before the LLM sees it.",
    "task": "Does the LLM reason while logic is still resolving, or after?",
    "answer": "After — the full prompt is resolved first, then sent.",
    "why": "Logic and actions settle before reasoning starts."
  },
  {
    "id": "pred_discard",
    "tier": "Trace",
    "type": "predict",
    "skill": "Transition discards",
    "lesson": "A mid-turn transition throws away the current prompt.",
    "task": "A subagent transitions away partway through. What happens to its built prompt?",
    "answer": "It's discarded; only the new subagent's prompt is sent.",
    "why": "Transitions are a clean hand-off, not a merge."
  },
  {
    "id": "pred_after_skip",
    "tier": "Trace",
    "type": "predict",
    "skill": "after_reasoning skipped",
    "lesson": "A transition mid-turn skips the original's after_reasoning.",
    "task": "If a subagent transitions away mid-turn, does its after_reasoning run?",
    "answer": "No.",
    "why": "Control already left before the lifecycle event."
  },
  {
    "id": "pred_branch",
    "tier": "Trace",
    "type": "predict",
    "skill": "Which branch",
    "lesson": "Status-based ifs each test independently.",
    "task": "order_status == \"shipped\". Which branch's prompt is included?",
    "answer": "The shipped branch.",
    "why": "Each if is evaluated; the matching one contributes its prompt."
  },
  {
    "id": "fix_missing_msgs",
    "tier": "Fix",
    "type": "recall",
    "skill": "Required messages",
    "lesson": "The system block needs both required messages.",
    "task": "The agent won't save and the system block has only a welcome. What's missing?",
    "answer": "The error message.",
    "why": "welcome and error are both required."
  },
  {
    "id": "last_line",
    "tier": "Fix",
    "type": "recall",
    "skill": "Last-line error",
    "lesson": "A known parser quirk affects the final line.",
    "task": "Builder throws an unexpected error on your script's last line. Quick fix?",
    "answer": "Add a blank line or a comment at the end.",
    "why": "Gives the parser a clean terminator."
  },
  {
    "id": "any_tool",
    "tier": "Trace",
    "type": "recall",
    "skill": "Unexpected tool call",
    "lesson": "Available tools are all fair game.",
    "task": "The LLM called a tool you never mentioned in the prompt. Why?",
    "answer": "It can call any available reasoning action — gate it with available when.",
    "why": "Availability, not mention, controls access."
  },
  {
    "id": "fix_run_io",
    "tier": "Fix",
    "type": "recall",
    "skill": "Manual I/O",
    "lesson": "Actions run in logic execute before reasoning.",
    "task": "An action run in your logic produced no usable result. Why, and the fix?",
    "answer": "It runs before reasoning, so set its inputs and outputs yourself with with/set.",
    "why": "The LLM isn't there to fill them in."
  },
  {
    "id": "pred_truthy",
    "tier": "Trace",
    "type": "predict",
    "skill": "Truthiness",
    "lesson": "not flips truthiness of a value.",
    "task": "When is 'if not @variables.order_id:' true?",
    "answer": "When order_id is empty or unset.",
    "why": "A non-empty string is truthy."
  },
  {
    "id": "pred_len",
    "tier": "Trace",
    "type": "predict",
    "skill": "List length",
    "lesson": "len() counts items.",
    "task": "questions holds 3 items. What does len(@variables.questions) return?",
    "answer": "3",
    "why": "Straight count of the list."
  },
  {
    "id": "pred_index",
    "tier": "Trace",
    "type": "predict",
    "skill": "Zero-based index",
    "lesson": "Lists are zero-based.",
    "task": "question_index is 0. What is questions[0]?",
    "answer": "The first item.",
    "why": "Index 0 is the first element."
  },
  {
    "id": "trace_router",
    "tier": "Trace",
    "type": "predict",
    "skill": "Next turn entry",
    "lesson": "Each turn re-enters the router.",
    "task": "A subagent just answered and the user sends a new message. Where does execution begin?",
    "answer": "At start_agent (the router).",
    "why": "Routing happens fresh every turn."
  },
  {
    "id": "fix_available_and",
    "tier": "Fix",
    "type": "fix",
    "skill": "and, not or",
    "lesson": "Requiring two things uses and.",
    "task": "You want a tool available only when both order_id and return_reason are set. Fix: available when @variables.order_id or @variables.return_reason",
    "answer": "available when @variables.order_id and @variables.return_reason",
    "why": "or would expose it with only one set."
  },
  {
    "id": "pred_gate",
    "tier": "Trace",
    "type": "predict",
    "skill": "Trace the open gate",
    "lesson": "An open-gate router checks the gate variable before classifying.",
    "task": "In the router, open_gate equals \"product_return\". What does the router do?",
    "answer": "It transitions straight to product_return, bypassing LLM classification.",
    "why": "The gate guarantees a deterministic return path."
  }
];
