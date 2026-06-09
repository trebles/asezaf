/* Pack 4 — Tools & Orchestration
   Every card is type-from-memory: read, type your answer, reveal, rate A/B/C. */
window.PACKS = window.PACKS || {};
window.PACKS["tools-orchestration"] = [
  {
    "id": "tool_def",
    "tier": "Tools",
    "type": "recall",
    "skill": "What a tool is",
    "lesson": "A tool (reasoning action) is an executable function the LLM can <i>choose</i> to call based on the current context.",
    "task": "In one line: what is a tool in Agent Script?",
    "answer": "A reasoning action the LLM can choose to call.",
    "why": "Unlike logic actions, tools are the LLM's decision, not yours."
  },
  {
    "id": "reasoning_actions_block",
    "tier": "Tools",
    "type": "recall",
    "skill": "Where tools are defined",
    "lesson": "Tools live in a subagent's <code>reasoning.actions</code> block.",
    "task": "Which block defines the tools available to the LLM?",
    "answer": "reasoning.actions",
    "why": "Same place, whether the tool wraps an action or a util."
  },
  {
    "id": "tool_wraps",
    "tier": "Tools",
    "type": "recall",
    "skill": "What a tool wraps",
    "lesson": "Every tool wraps either an action or a <code>@utils</code> function. Bind inputs with <code>with</code>, capture outputs with <code>set</code>.",
    "task": "A tool must wrap one of two things — which?",
    "answer": "An action or a @utils function.",
    "why": "Tools are a thin LLM-facing layer over those two."
  },
  {
    "id": "tool_chooses",
    "tier": "Tools",
    "type": "recall",
    "skill": "How the LLM picks a tool",
    "lesson": "The LLM weighs each tool's name and description against the conversation to decide whether to call it.",
    "task": "What does the LLM look at to decide whether to call a tool?",
    "answer": "The tool's name and description (plus context).",
    "why": "This is why clear, distinct names and descriptions matter so much."
  },
  {
    "id": "two_blocks",
    "tier": "Tools",
    "type": "recall",
    "skill": "actions vs reasoning.actions",
    "lesson": "<code>actions</code> are for your deterministic logic; <code>reasoning.actions</code> are the tools the LLM may call.",
    "task": "In a few words: what does the LLM do with a tool in reasoning.actions?",
    "answer": "Chooses whether to call it.",
    "why": "actions = your logic runs them; reasoning.actions = the LLM’s choice."
  },
  {
    "id": "available_when",
    "tier": "Filtering",
    "type": "write",
    "skill": "available when",
    "lesson": "<code>available when</code> hides a tool or subagent entirely unless its condition holds.",
    "task": "Make a tool available only when the verified variable is True.",
    "answer": "available when @variables.verified == True",
    "why": "If the condition fails, the LLM can't even see the tool."
  },
  {
    "id": "available_combo",
    "tier": "Filtering",
    "type": "write",
    "skill": "Combine filter conditions",
    "lesson": "Filter conditions can use <code>and</code> to require multiple rules.",
    "task": "Available only when verified is True AND business_hours is True.",
    "answer": "available when @variables.verified == True and @variables.business_hours == True",
    "why": "Example: escalation that needs verification and valid hours."
  },
  {
    "id": "filter_why",
    "tier": "Filtering",
    "type": "recall",
    "skill": "Why filter, not just prompt",
    "lesson": "Filtering enforces business rules deterministically — prompt wording alone can be talked around by customers.",
    "task": "Why hide a tool with available when instead of relying on the prompt?",
    "answer": "Customers can manipulate prompts; filters can't be talked around.",
    "why": "Don't rely only on prompt engineering for business-sensitive features."
  },
  {
    "id": "any_available",
    "tier": "Filtering",
    "type": "recall",
    "skill": "Available means callable",
    "lesson": "The LLM can call <i>any</i> available reasoning action, even one you didn't explicitly tell it to use.",
    "task": "True or false: the LLM only calls tools you explicitly mention.",
    "answer": "False",
    "why": "If it's available, it's fair game — so filter what shouldn't be."
  },
  {
    "id": "ref_tool_prompt",
    "tier": "Tools",
    "type": "write",
    "skill": "Nudge a tool from a prompt",
    "lesson": "Reference a tool in prompt text to give the LLM extra context about when to use it.",
    "task": "Reference the send_code tool inside a prompt.",
    "answer": "{!@actions.send_code}",
    "why": "Explicit @-references raise the odds the tool is used as intended."
  },
  {
    "id": "subagent_block",
    "tier": "Subagents",
    "type": "write",
    "skill": "Open a subagent",
    "lesson": "Declare a subagent with <code>subagent &lt;Name&gt;:</code> (formerly written as <code>topic</code>).",
    "task": "Open a subagent block named Order_Management.",
    "answer": "subagent Order_Management:",
    "why": "Each subagent is one job the agent can do."
  },
  {
    "id": "subagent_desc",
    "tier": "Subagents",
    "type": "recall",
    "skill": "A subagent's description",
    "lesson": "A subagent's <code>description</code> helps the agent decide when to route to it based on user intent.",
    "task": "What is a subagent's description mainly used for?",
    "answer": "Deciding when to route to that subagent.",
    "why": "Routing quality depends on distinct, intent-matching descriptions."
  },
  {
    "id": "start_agent_open",
    "tier": "Routing",
    "type": "write",
    "skill": "Open the router",
    "lesson": "The router uses <code>start_agent &lt;name&gt;:</code> instead of <code>subagent</code>.",
    "task": "Open the router block named agent_router.",
    "answer": "start_agent agent_router:",
    "why": "Every utterance enters here first."
  },
  {
    "id": "router_job",
    "tier": "Routing",
    "type": "recall",
    "skill": "What the router does",
    "lesson": "<code>start_agent</code> handles classification, filtering, and routing — and often sets initial variable values.",
    "task": "Name the router's main job.",
    "answer": "Classify and route to the right subagent.",
    "why": "It's the entry point and traffic controller."
  },
  {
    "id": "transition_oneway",
    "tier": "Transitions",
    "type": "write",
    "skill": "One-way transition",
    "lesson": "<code>@utils.transition to @subagent.&lt;Name&gt;</code> moves execution to another subagent. It's one-way.",
    "task": "Transition to the Order_Management subagent.",
    "answer": "@utils.transition to @subagent.Order_Management",
    "why": "Control does not return to the calling subagent."
  },
  {
    "id": "transition_logic",
    "tier": "Transitions",
    "type": "write",
    "skill": "Transition from logic",
    "lesson": "From plain logic instructions you can also write <code>transition to @subagent.&lt;Name&gt;</code>.",
    "task": "From logic, transition to the wrap_up subagent.",
    "answer": "transition to @subagent.wrap_up",
    "why": "Executes immediately, halting the current directive block."
  },
  {
    "id": "transition_vs_ref",
    "tier": "Transitions",
    "type": "recall",
    "skill": "Transition vs reference",
    "lesson": "A direct <code>@subagent.&lt;name&gt;</code> reference returns control to the caller (like a function call). <code>@utils.transition to</code> is one-way.",
    "task": "Which returns control to the caller — a one-way transition, or a direct @subagent reference?",
    "answer": "A direct @subagent reference.",
    "why": "Transition leaves for good; a reference calls and comes back."
  },
  {
    "id": "transition_immediate",
    "tier": "Transitions",
    "type": "recall",
    "skill": "Transitions are immediate",
    "lesson": "<code>transition to</code> executes the moment it's reached — the current block stops and control passes on.",
    "task": "What happens to the current block when a transition runs?",
    "answer": "It halts immediately and control moves to the new subagent.",
    "why": "Any unbuilt prompt from the current subagent is discarded."
  },
  {
    "id": "transition_back",
    "tier": "Transitions",
    "type": "recall",
    "skill": "No automatic return",
    "lesson": "After a transition, control doesn't come back. To return, you must explicitly transition again — and the subagent restarts from the top.",
    "task": "True or false: control automatically returns after a transition completes.",
    "answer": "False",
    "why": "Transitions are one-way; build a return transition if you need one."
  },
  {
    "id": "consult",
    "tier": "Transitions",
    "type": "write",
    "skill": "Consult a subagent",
    "lesson": "Reference another subagent as a tool with <code>consult: @subagent.&lt;name&gt;</code> — it runs, then returns to you.",
    "task": "Consult a subagent named specialist.",
    "answer": "consult: @subagent.specialist",
    "why": "Use this when you want delegation that comes back."
  },
  {
    "id": "system_override",
    "tier": "Subagents",
    "type": "recall",
    "skill": "Per-subagent overrides",
    "lesson": "<code>system.instructions</code> inside a subagent overrides the global system instructions for that subagent only.",
    "task": "What does a subagent's system.instructions do?",
    "answer": "Overrides the global system instructions for that subagent.",
    "why": "Avoids conflicting guidance and lets you shift voice/tone per job."
  },
  {
    "id": "escalate_tool",
    "tier": "Escalation",
    "type": "write",
    "skill": "Escalate to a human",
    "lesson": "Define an escalation tool with <code>&lt;name&gt;: @utils.escalate</code>.",
    "task": "Define a tool named escalate that hands off to a human rep.",
    "answer": "escalate: @utils.escalate",
    "why": "Replaces needing a separate escalation subagent."
  },
  {
    "id": "escalate_reserved",
    "tier": "Escalation",
    "type": "recall",
    "skill": "escalate is reserved",
    "lesson": "<code>escalate</code> is a reserved keyword — you can't use it as a subagent or action name.",
    "task": "True or false: you can name a subagent “escalate”.",
    "answer": "False",
    "why": "It's reserved for the escalate utility."
  },
  {
    "id": "escalate_needs",
    "tier": "Escalation",
    "type": "recall",
    "skill": "Escalation prerequisite",
    "lesson": "<code>@utils.escalate</code> needs an active Omni-Channel connection, defined in a <code>connection messaging</code> block.",
    "task": "What must exist before @utils.escalate works?",
    "answer": "An active Omni-Channel connection (connection messaging block).",
    "why": "Without the connection there's nowhere to hand off to."
  },
  {
    "id": "naming_principle",
    "tier": "Best practice",
    "type": "recall",
    "skill": "Naming resources",
    "lesson": "Good names and descriptions are specific, distinct, and in plain language end users would actually use.",
    "task": "In a few words, what makes a good subagent or tool name?",
    "answer": "Specific, distinct, plain language.",
    "why": "Consistent plain language helps the LLM match intent to a resource."
  }
];
