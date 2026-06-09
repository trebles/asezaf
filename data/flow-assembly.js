/* Pack 5 — Flow, System & Assembly
   Every card is type-from-memory: read, type your answer, reveal, rate A/B/C. */
window.PACKS = window.PACKS || {};
window.PACKS["flow-assembly"] = [
  {
    "id": "three_paths",
    "tier": "Flow",
    "type": "recall",
    "skill": "The three execution paths",
    "lesson": "Agentforce has three main execution paths: the first request, processing a subagent, and transitioning between subagents.",
    "task": "Name the three main execution paths.",
    "answer": "First request, processing a subagent, transitioning.",
    "why": "Every behaviour is one of these three at any moment."
  },
  {
    "id": "begin_router",
    "tier": "Flow",
    "type": "recall",
    "skill": "Every request starts here",
    "lesson": "All requests — including the first — begin at the <code>start_agent</code> router.",
    "task": "Where does every customer request begin?",
    "answer": "At the start_agent block.",
    "why": "It routes each turn before any subagent runs."
  },
  {
    "id": "prompt_then_send",
    "tier": "Flow",
    "type": "recall",
    "skill": "Resolve, then reason",
    "lesson": "Agentforce fully resolves the prompt first; the LLM only starts reasoning once it has the complete prompt.",
    "task": "Does the LLM reason while Agentforce parses, or after?",
    "answer": "After — once the full prompt is resolved.",
    "why": "Logic and actions in instructions settle before the LLM sees anything."
  },
  {
    "id": "transition_discards",
    "tier": "Flow",
    "type": "recall",
    "skill": "Transitions discard the prompt",
    "lesson": "On a transition, Agentforce discards the current subagent's resolved prompt and reads the new subagent top to bottom. The final prompt contains only the second subagent's instructions.",
    "task": "What happens to the first subagent's prompt when it transitions away?",
    "answer": "It's discarded; only the second subagent's prompt is sent.",
    "why": "This is why transitions are a clean hand-off, not a merge."
  },
  {
    "id": "after_utterance",
    "tier": "Flow",
    "type": "recall",
    "skill": "Back to the router",
    "lesson": "After a subagent finishes, Agentforce waits for the next utterance, then returns to <code>start_agent</code>.",
    "task": "After a subagent completes, where does the next utterance go?",
    "answer": "Back to start_agent.",
    "why": "Routing happens fresh on each turn."
  },
  {
    "id": "trace_increment",
    "tier": "Flow",
    "type": "predict",
    "skill": "Trace a counter",
    "lesson": "Logic runs as the subagent is parsed. Suppose num_turns is 2 and the subagent runs <code>set @variables.num_turns = @variables.num_turns + 1</code>.",
    "task": "What is num_turns after that line runs?",
    "answer": "3",
    "why": "The set executes deterministically during parsing."
  },
  {
    "id": "fetch_before",
    "tier": "Flow",
    "type": "recall",
    "skill": "Fetch data first",
    "lesson": "The Fetch Data pattern runs an action in instructions to retrieve data before the LLM begins reasoning.",
    "task": "When does a fetch-data action run, relative to the LLM?",
    "answer": "Before the LLM reasons (during parsing).",
    "why": "So the data is already in the prompt the LLM receives."
  },
  {
    "id": "before_reasoning_eq",
    "tier": "Flow",
    "type": "recall",
    "skill": "before_reasoning timing",
    "lesson": "A <code>before_reasoning</code> block is functionally the same as adding logic to the start of the subagent's instructions.",
    "task": "before_reasoning is equivalent to logic placed where?",
    "answer": "At the beginning of the subagent's instructions.",
    "why": "Use it for setup that must run before everything else."
  },
  {
    "id": "config_block",
    "tier": "Config",
    "type": "write",
    "skill": "Open the config block",
    "lesson": "The <code>config</code> block holds the agent's configuration parameters.",
    "task": "Open the config block.",
    "answer": "config:",
    "why": "A top-level block, like system, variables, and language."
  },
  {
    "id": "developer_name",
    "tier": "Config",
    "type": "recall",
    "skill": "Unique developer_name",
    "lesson": "<code>developer_name</code> is the agent's API name and must be unique in your org.",
    "task": "Which config field must be unique per agent?",
    "answer": "developer_name",
    "why": "Two agents can't share one; change it when reusing a script."
  },
  {
    "id": "agent_type",
    "tier": "Config",
    "type": "recall",
    "skill": "agent_type values",
    "lesson": "<code>agent_type</code> is either AgentforceServiceAgent (default) or AgentforceEmployeeAgent.",
    "task": "Type the two valid agent_type values.",
    "answer": "AgentforceServiceAgent and AgentforceEmployeeAgent",
    "why": "Service is the default; Employee is the other."
  },
  {
    "id": "default_user",
    "tier": "Config",
    "type": "recall",
    "skill": "default_agent_user",
    "lesson": "<code>default_agent_user</code> is required for AgentforceServiceAgent and ignored for AgentforceEmployeeAgent.",
    "task": "default_agent_user is required for which agent type?",
    "answer": "AgentforceServiceAgent",
    "why": "It's the Salesforce user the agent runs as."
  },
  {
    "id": "event_logs",
    "tier": "Config",
    "type": "write",
    "skill": "Enable conversation logs",
    "lesson": "<code>enable_enhanced_event_logs</code> turns on conversation logging for debugging and monitoring (default False).",
    "task": "Write the config line that enables enhanced event logs.",
    "answer": "enable_enhanced_event_logs: True",
    "why": "Invaluable when diagnosing why an agent did something."
  },
  {
    "id": "system_required",
    "tier": "System",
    "type": "recall",
    "skill": "Required messages",
    "lesson": "The system block's <code>messages</code> must include <code>welcome</code> and <code>error</code>.",
    "task": "Which two system messages are required?",
    "answer": "welcome and error",
    "why": "How the agent opens, and how it handles failures."
  },
  {
    "id": "welcome_personalize",
    "tier": "System",
    "type": "write",
    "skill": "Personalize the welcome",
    "lesson": "System messages can inject linked variables with <code>{!@variables.&lt;name&gt;}</code>.",
    "task": "Write a welcome line greeting the user by their userPreferredName.",
    "answer": "Hi {!@variables.userPreferredName}!",
    "why": "Resolves to e.g. “Hi Sam!” at runtime."
  },
  {
    "id": "language_block",
    "tier": "System",
    "type": "recall",
    "skill": "The language block",
    "lesson": "The top-level <code>language</code> block defines which languages the agent supports.",
    "task": "What does the language block define?",
    "answer": "Which languages the agent supports.",
    "why": "A top-level block alongside config and system."
  },
  {
    "id": "connection_block",
    "tier": "Connections",
    "type": "write",
    "skill": "A messaging connection",
    "lesson": "Describe an external connection (like Enhanced Chat / Omni-Channel) with a <code>connection messaging</code> block.",
    "task": "Open a messaging connection block.",
    "answer": "connection messaging:",
    "why": "Needed for escalation hand-off, among other things."
  },
  {
    "id": "connection_fields",
    "tier": "Connections",
    "type": "write",
    "skill": "Escalation routing fields",
    "lesson": "For escalation, the connection messaging block needs <code>outbound_route_type</code> and <code>outbound_route_name</code>.",
    "task": "Type the two connection-messaging fields needed for escalation routing.",
    "answer": "outbound_route_type and outbound_route_name",
    "why": "They tell Omni-Channel where to route the hand-off."
  },
  {
    "id": "linked_var",
    "tier": "Variables",
    "type": "write",
    "skill": "Declare a linked variable",
    "lesson": "A <code>linked</code> variable takes its value from an external source and has no default.",
    "task": "Declare a linked string named session_id.",
    "answer": "session_id: linked string",
    "why": "Linked vars can't be set by the agent or have a default."
  },
  {
    "id": "complex_type",
    "tier": "Variables",
    "type": "write",
    "skill": "Complex output types",
    "lesson": "When an action returns a complex object, the output needs <code>complex_data_type_name</code> naming the returned type (e.g. lightning__recordInfoType).",
    "task": "Type the output property that names a complex/Lightning return type.",
    "answer": "complex_data_type_name",
    "why": "Pairs with an object-typed output from a flow target."
  },
  {
    "id": "compiled",
    "tier": "Managing",
    "type": "recall",
    "skill": "Compiled on save",
    "lesson": "Agent Script is a compiled language — saving a version compiles it into lower-level metadata used by the reasoning engine.",
    "task": "What happens to the script when you save a version?",
    "answer": "It compiles into lower-level metadata.",
    "why": "You write readable script; the engine runs the compiled form."
  },
  {
    "id": "dx",
    "tier": "Managing",
    "type": "recall",
    "skill": "Editing in VS Code",
    "lesson": "Agentforce DX lets you pull a script into a local DX project and edit it in VS Code with syntax highlighting, autocompletion, and validation.",
    "task": "Which tooling lets you edit Agent Script in VS Code?",
    "answer": "Agentforce DX (VS Code extension).",
    "why": "For developers who'd rather not work in Builder's Script view."
  },
  {
    "id": "last_line_tip",
    "tier": "Managing",
    "type": "recall",
    "skill": "The last-line gotcha",
    "lesson": "If Builder throws an unexpected error on your script's last line, add a blank line or comment at the end.",
    "task": "Unexpected error on the final line — quick fix?",
    "answer": "Add a blank line or a comment at the end.",
    "why": "A known parser quirk with a one-second workaround."
  },
  {
    "id": "capstone_fetch",
    "tier": "Capstone",
    "type": "predict",
    "skill": "Put it together",
    "lesson": "You want an order's details in front of the LLM before it answers. You run <code>get_order</code> in the reasoning instructions and store the result in a variable.",
    "task": "Does the LLM see that order data when it reasons, and why?",
    "answer": "Yes — the action runs during parsing, so the data is already in the prompt.",
    "why": "Deterministic fetch + variable = reliable context, no LLM guessing."
  },
  {
    "id": "capstone_route",
    "tier": "Capstone",
    "type": "predict",
    "skill": "Trace a routed turn",
    "lesson": "A verified customer asks about an order. start_agent routes to Order_Management via a one-way transition.",
    "task": "After Order_Management answers, where does the next utterance start?",
    "answer": "Back at start_agent.",
    "why": "Transitions don't return; each turn re-enters the router."
  }
];
