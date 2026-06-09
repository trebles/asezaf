/* Pack 8 — Routing & Design
   Grounded verbatim in the official trailheadapps/agent-script-recipes .agent files.
   Every card is type-from-memory: read, type your answer, reveal, rate A/B/C. */
window.PACKS = window.PACKS || {};
window.PACKS["routing"] = [
  {
    "id": "router_open",
    "tier": "Router",
    "type": "write",
    "skill": "Open the router",
    "lesson": "Routing starts in the <code>start_agent</code> block.",
    "task": "Open the router block named agent_router.",
    "answer": "start_agent agent_router:",
    "why": "Every turn enters here first."
  },
  {
    "id": "router_classify",
    "tier": "Router",
    "type": "write",
    "skill": "The classification prompt",
    "lesson": "The router's prompt tells the LLM to pick a transition tool.",
    "task": "Write the router's classification instruction line (the pipe is enough).",
    "answer": "| Select the tool that best matches the user's message and conversation history.",
    "why": "Each tool maps to a subagent."
  },
  {
    "id": "transition_tool",
    "tier": "Transitions",
    "type": "assemble",
    "skill": "A transition tool",
    "lesson": "A router tool transitions to a subagent and carries a description.",
    "task": "Write a tool start_return that transitions to product_return, with a description.",
    "answer": "start_return: @utils.transition to @subagent.product_return\n   description: \"Help with a product return\"",
    "why": "The LLM picks it based on the description."
  },
  {
    "id": "transition_logic",
    "tier": "Transitions",
    "type": "write",
    "skill": "A deterministic transition",
    "lesson": "In a logic procedure you can transition unconditionally with <code>transition to</code>.",
    "task": "Write a deterministic transition to the product_return subagent.",
    "answer": "transition to @subagent.product_return",
    "why": "Runs immediately, no LLM choice involved."
  },
  {
    "id": "utils_vs_plain",
    "tier": "Transitions",
    "type": "recall",
    "skill": "@utils.transition vs transition",
    "lesson": "Two forms exist for transitions.",
    "task": "When do you use @utils.transition to versus plain transition to?",
    "answer": "@utils.transition to defines a tool the LLM may pick; transition to runs deterministically in logic or after_reasoning.",
    "why": "One is a choice, the other is a command."
  },
  {
    "id": "gate_set",
    "tier": "Open gate",
    "type": "write",
    "skill": "Set the gate",
    "lesson": "The open-gate pattern stores the active subagent in a variable.",
    "task": "Set the open_gate variable to \"product_return\".",
    "answer": "set @variables.open_gate = \"product_return\"",
    "why": "The router uses it to bypass LLM classification."
  },
  {
    "id": "gate_route",
    "tier": "Open gate",
    "type": "assemble",
    "skill": "Route on the gate",
    "lesson": "When a gate is open, the router transitions there deterministically.",
    "task": "In the router, transition to product_return when open_gate equals that.",
    "answer": "if @variables.open_gate == \"product_return\":\n   transition to @subagent.product_return",
    "why": "Guarantees the user returns to the right place."
  },
  {
    "id": "breadcrumb",
    "tier": "Open gate",
    "type": "recall",
    "skill": "The breadcrumb",
    "lesson": "To resume after an interruption like auth, you remember where to go back.",
    "task": "How do you resume the original subagent after an auth gate?",
    "answer": "Store the target in a breadcrumb variable, then transition back to it once the gate completes.",
    "why": "Transitions are one-way, so you re-route explicitly."
  },
  {
    "id": "required_gate",
    "tier": "Open gate",
    "type": "assemble",
    "skill": "Force a step first",
    "lesson": "Guard a subagent by transitioning to a prerequisite when a condition fails.",
    "task": "If not authenticated, set the breadcrumb to product_return and transition to customer_authentication.",
    "answer": "if @variables.authenticated == False:\n   set @variables.next_subagent = \"product_return\"\n   transition to @subagent.customer_authentication",
    "why": "Enforces the required step before protected work."
  },
  {
    "id": "after_return",
    "tier": "Open gate",
    "type": "assemble",
    "skill": "Return after the gate",
    "lesson": "In after_reasoning, send the user back once the gate clears.",
    "task": "In after_reasoning, transition to product_return when authenticated and the breadcrumb is product_return.",
    "answer": "after_reasoning:\n   if @variables.authenticated == True and @variables.next_subagent == \"product_return\":\n      transition to @subagent.product_return",
    "why": "Completes the resume path after authentication."
  },
  {
    "id": "available_two",
    "tier": "Filtering",
    "type": "write",
    "skill": "Gate a tool on data",
    "lesson": "<code>available when</code> hides a tool until its condition holds.",
    "task": "Make a tool available only when order_id and return_reason are both set.",
    "answer": "available when @variables.order_id and @variables.return_reason",
    "why": "Non-empty strings are truthy, so 'and' requires both."
  },
  {
    "id": "available_bool",
    "tier": "Filtering",
    "type": "write",
    "skill": "Gate a tool on a flag",
    "lesson": "Filters can test a boolean.",
    "task": "Make a tool available only when authenticated is True.",
    "answer": "available when @variables.authenticated == True",
    "why": "If false, the LLM can't see or call the tool."
  },
  {
    "id": "filter_why",
    "tier": "Filtering",
    "type": "recall",
    "skill": "Why filter",
    "lesson": "Filtering enforces rules deterministically.",
    "task": "Why hide a tool with available when rather than just telling the LLM not to use it?",
    "answer": "It hides the tool entirely, so the rule can't be talked around.",
    "why": "Don't rely on prompt wording for business-sensitive features."
  },
  {
    "id": "specialist_return",
    "tier": "Delegation",
    "type": "recall",
    "skill": "Returning to the caller",
    "lesson": "A specialist subagent hands control back by transitioning to its caller.",
    "task": "How does a specialist return control to the general subagent?",
    "answer": "It ends by transitioning back, e.g. transition to @subagent.general_support.",
    "why": "There's no automatic return; you route back explicitly."
  },
  {
    "id": "action_then_transition",
    "tier": "Transitions",
    "type": "assemble",
    "skill": "Act, then move on",
    "lesson": "A reasoning tool can run an action, capture output, and transition next.",
    "task": "Write submit_return: run process_return, store the confirmation, then transition to return_confirmation.",
    "answer": "submit_return: @actions.process_return\n   with order_id=@variables.order_id\n   set @variables.confirmation = @outputs.confirmation_number\n   transition to @subagent.return_confirmation",
    "why": "Chains the result straight into the next subagent."
  },
  {
    "id": "desc_routing",
    "tier": "Design",
    "type": "recall",
    "skill": "Names drive routing",
    "lesson": "Routing accuracy depends on good descriptions.",
    "task": "What makes routing accurate?",
    "answer": "Distinct, intent-matching descriptions in plain user language.",
    "why": "The LLM matches the user's words to a tool's description."
  },
  {
    "id": "gate_clear",
    "tier": "Open gate",
    "type": "write",
    "skill": "Clear the gate",
    "lesson": "Reset the gate once the flow is done.",
    "task": "Clear the open_gate variable.",
    "answer": "set @variables.open_gate = \"\"",
    "why": "Stops the router from forcing that route again."
  },
  {
    "id": "router_no_block",
    "tier": "Design",
    "type": "recall",
    "skill": "Don't gate in the router",
    "lesson": "In the open-gate pattern, the router stays simple.",
    "task": "Should the router itself ask the user to authenticate?",
    "answer": "No — route immediately and let the downstream subagent handle auth.",
    "why": "Keeps classification clean and avoids prompt noise."
  },
  {
    "id": "multi_tool",
    "tier": "Router",
    "type": "assemble",
    "skill": "Two routes",
    "lesson": "A router can expose several transition tools.",
    "task": "Write two router tools: start_return to product_return and general_help to general_help.",
    "answer": "start_return: @utils.transition to @subagent.product_return\n   description: \"Help with a product return\"\ngeneral_help: @utils.transition to @subagent.general_help\n   description: \"Answer general questions\"",
    "why": "The LLM chooses among them by description."
  },
  {
    "id": "transition_oneway",
    "tier": "Transitions",
    "type": "recall",
    "skill": "One-way",
    "lesson": "Transitions don't come back on their own.",
    "task": "Does control return automatically after a transition?",
    "answer": "No — transitions are one-way; build an explicit return if you need one.",
    "why": "Design return paths deliberately."
  },
  {
    "id": "transition_restart",
    "tier": "Transitions",
    "type": "recall",
    "skill": "Restarts from the top",
    "lesson": "Re-entering a subagent runs it fresh.",
    "task": "When you transition back into a subagent, where does it resume?",
    "answer": "From the top — it restarts, not where it left off.",
    "why": "State lives in variables, so it survives the restart."
  },
  {
    "id": "exit_tool",
    "tier": "Router",
    "type": "assemble",
    "skill": "An escape hatch",
    "lesson": "Offer a way out if the user changes topic mid-flow.",
    "task": "Write a tool exit_to_general that switches to general_help if the user asks about something else.",
    "answer": "exit_to_general: @utils.transition to @subagent.general_help\n   description: \"Switch to general help if the user asks about something else\"",
    "why": "Keeps the agent from trapping the user in one flow."
  },
  {
    "id": "gate_pattern",
    "tier": "Open gate",
    "type": "recall",
    "skill": "Name the pattern",
    "lesson": "Variable-driven routing that bypasses the LLM has a name.",
    "task": "What's the pattern called where a variable forces deterministic routing past classification?",
    "answer": "The open-gate (gate-based routing) pattern.",
    "why": "It guarantees return paths through gates like auth."
  },
  {
    "id": "router_first",
    "tier": "Router",
    "type": "recall",
    "skill": "First on every turn",
    "lesson": "The router is the entry point.",
    "task": "Which block runs first on every turn, before any classification?",
    "answer": "start_agent (the router).",
    "why": "All paths begin there."
  },
  {
    "id": "breadcrumb_var",
    "tier": "Open gate",
    "type": "assemble",
    "skill": "The breadcrumb variable",
    "lesson": "The resume-after-gate pattern needs a variable to remember where to go back.",
    "task": "Declare a mutable string next_subagent with a description, for the breadcrumb.",
    "answer": "next_subagent: mutable string = \"\"\n   description: \"Which subagent to resume after a gate completes\"",
    "why": "after_reasoning reads it to route the user back."
  }
];
