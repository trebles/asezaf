/* Pack 3 — Reasoning & Actions
   Every card is type-from-memory: read, type your answer, reveal, rate A/B/C. */
window.PACKS = window.PACKS || {};
window.PACKS["reasoning-actions"] = [
  {
    "id": "reasoning_block",
    "tier": "Reasoning",
    "type": "recall",
    "skill": "Where instructions live",
    "lesson": "A subagent's <code>reasoning</code> block holds the instructions Agentforce resolves into a prompt for the LLM.",
    "task": "Which block in a subagent contains its instructions for the LLM?",
    "answer": "The reasoning block (reasoning.instructions).",
    "why": "reasoning.instructions = the prompt; reasoning.actions = the tools."
  },
  {
    "id": "top_to_bottom",
    "tier": "Reasoning",
    "type": "recall",
    "skill": "Processing order",
    "lesson": "Agentforce parses reasoning instructions <b>top to bottom</b>, building one prompt, then sends it to the LLM — the LLM only reasons after the full prompt is resolved.",
    "task": "In what order are reasoning instructions processed?",
    "answer": "Top to bottom, before the prompt is sent.",
    "why": "Logic resolves first; the LLM never sees a half-built prompt."
  },
  {
    "id": "run_in_logic",
    "tier": "Reasoning",
    "type": "write",
    "skill": "Run an action in logic",
    "lesson": "A logic line (<code>-&gt;</code>) can run an action deterministically every time the subagent runs.",
    "task": "Write a logic line that runs the get_order action.",
    "answer": "-> run @actions.get_order",
    "why": "Logic actions run as the subagent is parsed, before the LLM reasons."
  },
  {
    "id": "prompt_line",
    "tier": "Reasoning",
    "type": "write",
    "skill": "Add a prompt instruction",
    "lesson": "Switch to natural language for the LLM with <code>|</code>.",
    "task": "Write a prompt instruction telling the LLM to help the customer with their order.",
    "answer": "| Help the customer with their order.",
    "why": "Prompt lines are what the LLM actually reads and acts on."
  },
  {
    "id": "interp_var",
    "tier": "Reasoning",
    "type": "write",
    "skill": "Interpolate a variable",
    "lesson": "Inside a prompt, resolve a variable's value with <code>{!@variables.&lt;name&gt;}</code>.",
    "task": "Interpolate the promotion_product variable into a prompt.",
    "answer": "{!@variables.promotion_product}",
    "why": "The prompt the LLM sees contains the value, not the reference."
  },
  {
    "id": "interp_action",
    "tier": "Reasoning",
    "type": "write",
    "skill": "Reference a tool in a prompt",
    "lesson": "You can point the LLM at a specific tool from prompt text with <code>{!@actions.&lt;name&gt;}</code> to give it more context.",
    "task": "Reference the send_code action inside a prompt.",
    "answer": "{!@actions.send_code}",
    "why": "Explicit references make the LLM more likely to use a tool as intended."
  },
  {
    "id": "multiline_prompt",
    "tier": "Reasoning",
    "type": "write",
    "skill": "A multiline prompt",
    "lesson": "<code>|</code> also starts a multiline string — indent the following lines under it.",
    "task": "Write a two-line multiline prompt under a pipe.",
    "answer": "|\n  Confirm the customer's email.\n  Resend the code if they didn't get it.",
    "why": "Handy for longer guidance without cramming it onto one line."
  },
  {
    "id": "shorter_better",
    "tier": "Reasoning",
    "type": "recall",
    "skill": "Keep it short",
    "lesson": "Shorter reasoning instructions generally produce more accurate, reliable results.",
    "task": "True or false: longer, more detailed instructions are always more reliable.",
    "answer": "False",
    "why": "Start with the fewest instructions that work; add only as needed."
  },
  {
    "id": "action_target",
    "tier": "Actions",
    "type": "write",
    "skill": "An action target",
    "lesson": "An action's <code>target</code> points to an executable as <code>{TYPE}://{DEVELOPER_NAME}</code>.",
    "task": "Write the target for a flow whose developer name is Get_Order.",
    "answer": "target: \"flow://Get_Order\"",
    "why": "The target is what actually runs when the action is called."
  },
  {
    "id": "target_types",
    "tier": "Actions",
    "type": "write",
    "skill": "An action target type",
    "lesson": "An action targets Apex, a Flow, or a Prompt Template, written as <code>TYPE://DEV_NAME</code>.",
    "task": "Write the target for an Apex class named CheckHours.",
    "answer": "target: \"apex://CheckHours\"",
    "why": "apex, flow, and prompt are the three valid target types."
  },
  {
    "id": "action_desc",
    "tier": "Actions",
    "type": "recall",
    "skill": "Why describe an action",
    "lesson": "An action's <code>description</code> is optional, but the LLM uses it to decide when to call the action.",
    "task": "What does the LLM use an action's description for?",
    "answer": "To decide when to call the action.",
    "why": "Clear, distinct descriptions lead to better tool choices."
  },
  {
    "id": "param_types",
    "tier": "Actions",
    "type": "recall",
    "skill": "No float type",
    "lesson": "Types include string, number, integer, long, boolean, object, date, datetime, time, currency, id, and list[type] — but no float.",
    "task": "There is no float type. Which type do decimals use? Type it.",
    "answer": "number",
    "why": "number covers both integers and decimals."
  },
  {
    "id": "with_input",
    "tier": "Actions",
    "type": "write",
    "skill": "Bind an input",
    "lesson": "Pass a value into an action with <code>with &lt;input&gt; = &lt;value&gt;</code>.",
    "task": "Bind an action input order_id to the order_id variable.",
    "answer": "with order_id = @variables.order_id",
    "why": "with maps your data onto the action's declared inputs."
  },
  {
    "id": "set_action_output",
    "tier": "Actions",
    "type": "write",
    "skill": "Capture an output",
    "lesson": "Store what an action returns with <code>set @variables.x = @outputs.y</code>.",
    "task": "Store the action output order_status into a variable called status.",
    "answer": "set @variables.status = @outputs.order_status",
    "why": "@outputs holds the last action's returned values."
  },
  {
    "id": "run_with_set",
    "tier": "Actions",
    "type": "assemble",
    "skill": "Run, bind, capture",
    "lesson": "A full deterministic action call combines run + with + set.",
    "task": "Put these in the right order: set @variables.s = @outputs.status / run @actions.get_order / with id = @variables.id",
    "answer": "run @actions.get_order\nwith id = @variables.id\nset @variables.s = @outputs.status",
    "why": "Run the action, bind its inputs, then capture its outputs."
  },
  {
    "id": "manual_io",
    "tier": "Actions",
    "type": "recall",
    "skill": "Why manual I/O in logic",
    "lesson": "When you run an action in instructions, it runs before any reasoning — so you set its inputs and outputs yourself.",
    "task": "Why must you manually set inputs/outputs for an action run in logic?",
    "answer": "It runs before reasoning, so the LLM isn't there to fill them.",
    "why": "Deterministic runs happen during parsing, not during LLM reasoning."
  },
  {
    "id": "expose_tool",
    "tier": "Actions",
    "type": "recall",
    "skill": "Expose an action to the LLM",
    "lesson": "To let the LLM choose whether to run an action, expose it in the subagent's <code>reasoning.actions</code> block.",
    "task": "Which block exposes an action as a tool the LLM can choose to call?",
    "answer": "reasoning.actions",
    "why": "actions = your deterministic use; reasoning.actions = the LLM's choice."
  },
  {
    "id": "confirm",
    "tier": "Actions",
    "type": "write",
    "skill": "Require confirmation",
    "lesson": "<code>require_user_confirmation</code> makes the customer confirm before the action runs.",
    "task": "Add the property that forces customer confirmation before running.",
    "answer": "require_user_confirmation: True",
    "why": "Good for irreversible or sensitive actions."
  },
  {
    "id": "filter_output",
    "tier": "Actions",
    "type": "write",
    "skill": "Hide an output",
    "lesson": "Set an output's <code>filter_from_agent</code> to keep it out of the agent's context.",
    "task": "Write the property that hides an output value from the agent.",
    "answer": "filter_from_agent: True",
    "why": "Default is False (included); set True to exclude sensitive data."
  },
  {
    "id": "progress_indicator",
    "tier": "Actions",
    "type": "write",
    "skill": "Progress indicator",
    "lesson": "<code>include_in_progress_indicator</code> controls whether the agent shows a progress indicator while the action runs.",
    "task": "Write the property (set to True) that shows a progress indicator while an action runs.",
    "answer": "include_in_progress_indicator: True",
    "why": "A boolean on the action definition."
  },
  {
    "id": "chain_sequential",
    "tier": "Chaining",
    "type": "recall",
    "skill": "Sequential chaining",
    "lesson": "Running actions one after another in instructions guarantees order — both run deterministically before the prompt is sent.",
    "task": "How do you guarantee action A runs before action B every time?",
    "answer": "Run them in order in the reasoning instructions.",
    "why": "Sequencing doesn't rely on the LLM remembering steps."
  },
  {
    "id": "chain_followup",
    "tier": "Chaining",
    "type": "recall",
    "skill": "Auto follow-up action",
    "lesson": "You can define a follow-up so that whenever the LLM calls one action, another runs immediately after.",
    "task": "The LLM calls my_action and you want other_action to always run next. What do you set up?",
    "answer": "A follow-up action that runs immediately after my_action.",
    "why": "Chains a guaranteed step onto an LLM-chosen tool call."
  },
  {
    "id": "after_no_pipe",
    "tier": "Chaining",
    "type": "recall",
    "skill": "after_reasoning limits",
    "lesson": "An <code>after_reasoning</code> block runs after the reasoning loop exits and can hold logic, actions, and transitions — but not a <code>|</code> prompt.",
    "task": "What can an after_reasoning block NOT contain?",
    "answer": "A prompt (the | pipe command).",
    "why": "It runs after the LLM is done, so there's no prompt to add."
  },
  {
    "id": "after_transition",
    "tier": "Chaining",
    "type": "write",
    "skill": "Transition in after_reasoning",
    "lesson": "Inside <code>after_reasoning</code>, use <code>transition to</code> (not <code>@utils.transition to</code>).",
    "task": "In an after_reasoning block, transition to the wrap_up subagent.",
    "answer": "transition to @subagent.wrap_up",
    "why": "after_reasoning uses the plain transition form."
  },
  {
    "id": "before_reasoning",
    "tier": "Chaining",
    "type": "recall",
    "skill": "before_reasoning",
    "lesson": "A <code>before_reasoning</code> block has the same capability and syntax as after_reasoning, but runs first.",
    "task": "before_reasoning is equivalent to putting logic where?",
    "answer": "At the start of the subagent's instructions.",
    "why": "A clean place for setup logic that should run before anything else."
  }
];
