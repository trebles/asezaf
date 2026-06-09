/* Pack 6 — Composing Structures
   Grounded verbatim in the official trailheadapps/agent-script-recipes .agent files.
   Every card is type-from-memory: read, type your answer, reveal, rate A/B/C. */
window.PACKS = window.PACKS || {};
window.PACKS["composing"] = [
  {
    "id": "indent3",
    "tier": "Structure",
    "type": "recall",
    "skill": "How far to indent",
    "lesson": "Agent Script is whitespace-sensitive. The official recipes use <b>3 spaces</b> per level, consistently (you may use tabs instead, but never mix).",
    "task": "How many spaces per indent level do the recipes use?",
    "answer": "3 spaces",
    "why": "The docs allow ≥2 spaces or 1 tab; the recipes standardise on 3."
  },
  {
    "id": "config_block",
    "tier": "Blocks",
    "type": "assemble",
    "skill": "A config block",
    "lesson": "The <code>config</code> block holds agent metadata.",
    "task": "Write a config block: developer_name and agent_label both \"HelloWorld\", agent_type the employee value, a short description.",
    "answer": "config:\n   developer_name: \"HelloWorld\"\n   agent_label: \"HelloWorld\"\n   agent_type: \"AgentforceEmployeeAgent\"\n   description: \"A minimal agent that greets users\"",
    "why": "Every agent opens with config identifying it."
  },
  {
    "id": "agent_type_emp",
    "tier": "Blocks",
    "type": "write",
    "skill": "Employee agent type",
    "lesson": "<code>agent_type</code> is AgentforceServiceAgent (default) or AgentforceEmployeeAgent.",
    "task": "Write the config line setting agent_type to the employee value.",
    "answer": "agent_type: \"AgentforceEmployeeAgent\"",
    "why": "Employee agents serve internal users; Service agents serve customers."
  },
  {
    "id": "system_block",
    "tier": "Blocks",
    "type": "assemble",
    "skill": "A system block",
    "lesson": "The <code>system</code> block holds messages and global instructions. <code>welcome</code> and <code>error</code> are required.",
    "task": "Write a system block with a messages section containing welcome and error.",
    "answer": "system:\n   messages:\n      welcome: \"Hello! How can I help?\"\n      error: \"Sorry, I encountered an error.\"",
    "why": "messages nests under system; welcome and error nest under messages."
  },
  {
    "id": "system_instr",
    "tier": "Blocks",
    "type": "write",
    "skill": "System instructions",
    "lesson": "A system-level <code>instructions</code> string guides the agent's overall personality. Keep it concise.",
    "task": "Write a system instructions line for a friendly assistant.",
    "answer": "instructions: \"You are a friendly assistant who greets users warmly.\"",
    "why": "This applies across every subagent."
  },
  {
    "id": "variables_block",
    "tier": "Blocks",
    "type": "assemble",
    "skill": "A variables block",
    "lesson": "The <code>variables</code> block declares global state.",
    "task": "Write a variables block with one mutable string user_name defaulting to empty.",
    "answer": "variables:\n   user_name: mutable string = \"\"",
    "why": "All subagents can read and (if mutable) change these."
  },
  {
    "id": "var_description",
    "tier": "Blocks",
    "type": "assemble",
    "skill": "Describe a variable",
    "lesson": "A variable can carry a <code>description</code> on the next indented line — it helps the LLM when slot-filling.",
    "task": "Declare a mutable string user_name with a description.",
    "answer": "user_name: mutable string = \"\"\n   description: \"The user's full name\"",
    "why": "The description guides reasoning when the LLM sets the value."
  },
  {
    "id": "start_agent_block",
    "tier": "Blocks",
    "type": "assemble",
    "skill": "A router block",
    "lesson": "The <code>start_agent</code> block is the router every turn enters first.",
    "task": "Write a start_agent block named agent_router with a description and a reasoning.instructions prompt.",
    "answer": "start_agent agent_router:\n   description: \"Route the user to the right subagent\"\n   reasoning:\n      instructions:|\n         Select the tool that best matches the user's message.",
    "why": "reasoning.instructions tells the router how to classify."
  },
  {
    "id": "router_tool",
    "tier": "Blocks",
    "type": "assemble",
    "skill": "A transition tool",
    "lesson": "Router tools live under <code>reasoning.actions</code> and usually transition to a subagent.",
    "task": "Write a router tool begin_greeting that transitions to the greeting subagent, with a description.",
    "answer": "begin_greeting: @utils.transition to @subagent.greeting\n   description: \"Start the greeting conversation\"",
    "why": "The LLM picks this tool to route the conversation."
  },
  {
    "id": "subagent_block",
    "tier": "Blocks",
    "type": "assemble",
    "skill": "A subagent",
    "lesson": "A <code>subagent</code> is one job the agent can do.",
    "task": "Open a subagent named greeting with a description.",
    "answer": "subagent greeting:\n   description: \"Greets the user and chats\"",
    "why": "Every agent needs at least one subagent."
  },
  {
    "id": "reasoning_prompt",
    "tier": "Reasoning",
    "type": "assemble",
    "skill": "A prompt-only reasoning block",
    "lesson": "<code>instructions:|</code> sends pure natural language to the LLM.",
    "task": "Write a reasoning block whose instructions just greet the user.",
    "answer": "reasoning:\n   instructions:|\n      Greet the user warmly and ask how you can help.",
    "why": "Use the pipe when there's no logic to run."
  },
  {
    "id": "reasoning_logic",
    "tier": "Reasoning",
    "type": "write",
    "skill": "A logic procedure header",
    "lesson": "<code>instructions:-></code> begins a procedure where logic runs before the prompt is built.",
    "task": "Write the line that starts a logic-driven reasoning procedure.",
    "answer": "instructions:->",
    "why": "Everything indented under it runs deterministically."
  },
  {
    "id": "action_def",
    "tier": "Actions",
    "type": "assemble",
    "skill": "An action definition",
    "lesson": "An action defines a task with inputs, outputs, and a target.",
    "task": "Define get_order_status: one required string input order_id, a string output status, target flow GetOrderStatus.",
    "answer": "get_order_status:\n   description: \"Retrieves current status for an order\"\n   inputs:\n      order_id: string\n         description: \"The order to check\"\n         is_required: True\n   outputs:\n      status: string\n         description: \"Current order status\"\n   target: \"flow://GetOrderStatus\"",
    "why": "Actions are defined under a subagent's actions block."
  },
  {
    "id": "input_required",
    "tier": "Actions",
    "type": "write",
    "skill": "A required input",
    "lesson": "Mark whether an input must be provided with <code>is_required</code>.",
    "task": "Write the property marking an input as required.",
    "answer": "is_required: True",
    "why": "Use is_required: False for optional inputs."
  },
  {
    "id": "input_optional",
    "tier": "Actions",
    "type": "write",
    "skill": "An optional input",
    "lesson": "Optional inputs use is_required: False.",
    "task": "Write the property marking an input as optional.",
    "answer": "is_required: False",
    "why": "The action can run without it."
  },
  {
    "id": "output_decl",
    "tier": "Actions",
    "type": "assemble",
    "skill": "An output",
    "lesson": "Outputs declare a name, type, and description.",
    "task": "Declare a string output status with a description, under an outputs section.",
    "answer": "outputs:\n   status: string\n      description: \"Current order status\"",
    "why": "The agent remembers outputs for the rest of the session."
  },
  {
    "id": "target_flow",
    "tier": "Actions",
    "type": "write",
    "skill": "A flow target",
    "lesson": "The <code>target</code> is <code>{TYPE}://{DEV_NAME}</code> — type is apex, flow, or prompt, lowercase.",
    "task": "Write the target for a flow named ProcessReturn.",
    "answer": "target: \"flow://ProcessReturn\"",
    "why": "The type prefix must be lowercase."
  },
  {
    "id": "tool_from_action",
    "tier": "Tools",
    "type": "assemble",
    "skill": "Expose an action as a tool",
    "lesson": "In reasoning.actions, wrap a defined action, bind inputs with <code>with</code>, capture outputs with <code>set</code>.",
    "task": "Expose process_return: bind order_id from a variable, store the confirmation_number output.",
    "answer": "submit: @actions.process_return\n   with order_id=@variables.order_id\n   set @variables.confirmation = @outputs.confirmation_number",
    "why": "This lets the LLM choose to run the action with your bindings."
  },
  {
    "id": "setvariables_tool",
    "tier": "Tools",
    "type": "assemble",
    "skill": "A slot-fill tool",
    "lesson": "<code>@utils.setVariables</code> lets the LLM fill a variable from the conversation using the <code>...</code> token.",
    "task": "Write a tool collect_info that fills order_id from the conversation.",
    "answer": "collect_info: @utils.setVariables\n   with order_id=...",
    "why": "The ... hands that value to the LLM to extract."
  },
  {
    "id": "after_block",
    "tier": "Lifecycle",
    "type": "assemble",
    "skill": "An after_reasoning block",
    "lesson": "<code>after_reasoning</code> runs after the turn; it can run logic, actions, and transitions — never a <code>|</code> prompt.",
    "task": "Write an after_reasoning block that runs a log_event action with event_type \"done\".",
    "answer": "after_reasoning:\n   run @actions.log_event\n      with event_type=\"done\"",
    "why": "Good for cleanup, logging, or a final transition."
  },
  {
    "id": "block_order",
    "tier": "Structure",
    "type": "recall",
    "skill": "Top-level block order",
    "lesson": "A script reads top to bottom; blocks appear in a conventional order.",
    "task": "Name the usual order of the main blocks.",
    "answer": "config, system, variables, start_agent, then the subagents.",
    "why": "config and system set up; start_agent routes into the subagents."
  },
  {
    "id": "minimal_agent",
    "tier": "Structure",
    "type": "recall",
    "skill": "The minimal agent",
    "lesson": "The smallest working agent still needs a few blocks.",
    "task": "Which blocks does the minimal HelloWorld agent use?",
    "answer": "config, system, start_agent, and one subagent.",
    "why": "variables is optional; the rest are the skeleton."
  },
  {
    "id": "multiline_prompt",
    "tier": "Reasoning",
    "type": "assemble",
    "skill": "A multiline prompt",
    "lesson": "Under <code>instructions:-></code>, a <code>|</code> introduces prompt text that can span indented lines.",
    "task": "Write a logic procedure whose prompt greets the user across two lines.",
    "answer": "instructions:->\n   | Greet the user warmly and ask how you can help.\n     Always answer in the style of a poem.",
    "why": "Continuation lines stay indented under the pipe."
  },
  {
    "id": "router_classify",
    "tier": "Reasoning",
    "type": "write",
    "skill": "The router prompt",
    "lesson": "Routers commonly use one classification prompt.",
    "task": "Write the router's standard classification instruction (the pipe line is enough).",
    "answer": "| Select the tool that best matches the user's message and conversation history.",
    "why": "It tells the LLM to pick the matching transition tool."
  },
  {
    "id": "label_prop",
    "tier": "Blocks",
    "type": "write",
    "skill": "A subagent label",
    "lesson": "A subagent can carry a display <code>label</code>.",
    "task": "Give a subagent the label run_standup.",
    "answer": "label: \"run_standup\"",
    "why": "Optional; auto-generated from the name if omitted."
  }
];
