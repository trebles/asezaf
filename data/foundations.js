/* Pack 1 — Foundations
   Every card is type-from-memory: read, type your answer, reveal, rate A/B/C. */
window.PACKS = window.PACKS || {};
window.PACKS["foundations"] = [
  {
    "id": "comment",
    "tier": "Foundations",
    "type": "write",
    "skill": "Leave a comment",
    "lesson": "A <code>#</code> starts a comment. Everything after it on that line is ignored — use it to document your script.",
    "task": "Write a comment that reads: shipping rules",
    "answer": "# shipping rules",
    "why": "Comments never affect behaviour; they're notes for whoever reads the script."
  },
  {
    "id": "property",
    "tier": "Foundations",
    "type": "write",
    "skill": "Write a property",
    "lesson": "Every line in Agent Script is <code>key: value</code> — the key is before the colon, the value after.",
    "task": "Write a property named role with the value: Support agent",
    "answer": "role: Support agent",
    "why": "Blocks (config, variables, subagents…) are just collections of these key/value properties."
  },
  {
    "id": "indent",
    "tier": "Foundations",
    "type": "write",
    "skill": "Indent consistently",
    "lesson": "Agent Script is whitespace-sensitive like Python or YAML. Indent a child line with <b>at least 2 spaces or 1 tab</b>, and never mix the two.",
    "task": "Indent one variable line so it belongs under a variables: block (use 2 spaces).",
    "answer": "variables:\n  is_member: mutable boolean = False",
    "why": "Mixing spaces and tabs, or under-indenting, causes parsing errors."
  },
  {
    "id": "str_lock",
    "tier": "Variables",
    "type": "write",
    "skill": "An unchangeable string",
    "lesson": "Declare a variable as <code>name: type = value</code>. Leave out <code>mutable</code> and the agent can never change it.",
    "task": "Declare an immutable string company set to: Acme",
    "answer": "company: string = \"Acme\"",
    "why": "Omitting mutable locks the value for the whole session."
  },
  {
    "id": "mutable",
    "tier": "Variables",
    "type": "write",
    "skill": "Make it changeable",
    "lesson": "Add the <code>mutable</code> keyword to let the agent change a variable's value later.",
    "task": "Make the company string changeable, still defaulting to Acme.",
    "answer": "company: mutable string = \"Acme\"",
    "why": "mutable is the single switch between read-only and agent-editable."
  },
  {
    "id": "bool",
    "tier": "Variables",
    "type": "write",
    "skill": "A changeable boolean",
    "lesson": "Booleans accept only <code>True</code> or <code>False</code>. The value is case-sensitive — capitalise the first letter.",
    "task": "Declare a changeable boolean is_member defaulting to false.",
    "answer": "is_member: mutable boolean = False",
    "why": "This is the everyday slot for yes/no state the agent flips during a chat."
  },
  {
    "id": "bool_case",
    "tier": "Variables",
    "type": "fix",
    "skill": "Fix the boolean",
    "lesson": "Lowercase <code>true</code>/<code>false</code> is invalid — only <code>True</code>/<code>False</code> work.",
    "task": "Fix this line:  is_active: mutable boolean = true",
    "answer": "is_active: mutable boolean = True",
    "why": "A lowercase boolean won't compile. Case matters here."
  },
  {
    "id": "number",
    "tier": "Variables",
    "type": "write",
    "skill": "A number",
    "lesson": "There's one <code>number</code> type for both whole numbers and decimals.",
    "task": "Declare a changeable number price set to 99.99",
    "answer": "price: mutable number = 99.99",
    "why": "42 and 3.14 use the same number type."
  },
  {
    "id": "list",
    "tier": "Variables",
    "type": "write",
    "skill": "A list",
    "lesson": "Use <code>list[type]</code> for a list of one primitive type.",
    "task": "Declare a changeable list of booleans flags = True, False",
    "answer": "flags: mutable list[boolean] = [True, False]",
    "why": "Every item shares the declared element type."
  },
  {
    "id": "object",
    "tier": "Variables",
    "type": "write",
    "skill": "An object",
    "lesson": "<code>object</code> holds a JSON object: <code>{\"key\": \"value\"}</code>.",
    "task": "Declare a changeable object order_line with SKU \"abc\" and count 2.",
    "answer": "order_line: mutable object = {\"SKU\": \"abc\", \"count\": 2}",
    "why": "Objects bundle related fields into one variable."
  },
  {
    "id": "naming",
    "tier": "Variables",
    "type": "fix",
    "skill": "Valid variable name",
    "lesson": "Names must start with a letter, use only letters/numbers/underscores, can't end in <code>_</code>, and can't contain <code>__</code>.",
    "task": "Fix this invalid variable name so it follows the rules: my__var",
    "answer": "my_var",
    "why": "No consecutive underscores — collapse them into one."
  },
  {
    "id": "ref_script",
    "tier": "References",
    "type": "write",
    "skill": "Reference a variable",
    "lesson": "From script logic, reference a variable with <code>@variables.&lt;name&gt;</code>.",
    "task": "Reference the is_member variable in logic.",
    "answer": "@variables.is_member",
    "why": "The @ prefix tells the engine you mean a resource, not plain text."
  },
  {
    "id": "ref_prompt",
    "tier": "References",
    "type": "write",
    "skill": "Variable inside a prompt",
    "lesson": "Inside natural-language prompt text, wrap the reference in brackets: <code>{!@variables.&lt;name&gt;}</code>.",
    "task": "Write a prompt that greets the customer by their user_name variable.",
    "answer": "| Hi {!@variables.user_name}! How can I help?",
    "why": "The {! … } form interpolates the value into the text the LLM sees."
  },
  {
    "id": "linked",
    "tier": "References",
    "type": "recall",
    "skill": "Linked variable limits",
    "lesson": "A linked variable's value is tied to a source (like an action output). It can't have a default, can't be set by the agent, and can't be an object or list.",
    "task": "True or false: a linked variable can be a list[number].",
    "answer": "False",
    "why": "Linked variables only allow string, number, boolean, date, or id."
  },
  {
    "id": "sysvar",
    "tier": "References",
    "type": "write",
    "skill": "The user_input system variable",
    "lesson": "<code>@system_variables.user_input</code> holds the customer's most recent utterance only. It's read-only and is currently the only system variable.",
    "task": "Reference the customer's latest message.",
    "answer": "@system_variables.user_input",
    "why": "Handy for passing the last thing said into an action; the LLM already keeps full history."
  },
  {
    "id": "logic_pipe",
    "tier": "Logic & prompts",
    "type": "write",
    "skill": "Logic vs prompt symbols",
    "lesson": "<code>-&gt;</code> begins a deterministic logic instruction. <code>|</code> begins a natural-language prompt the LLM interprets.",
    "task": "Type the symbol that begins a prompt instruction to the LLM.",
    "answer": "|",
    "why": "| is the prompt pipe; -> is deterministic logic."
  },
  {
    "id": "prompt",
    "tier": "Logic & prompts",
    "type": "write",
    "skill": "Write a prompt instruction",
    "lesson": "A line starting with <code>|</code> is plain language the LLM reads and acts on.",
    "task": "Write a prompt instruction telling the agent to greet the customer warmly.",
    "answer": "| Greet the customer warmly and ask how you can help.",
    "why": "Prompt instructions preserve the LLM's conversational flexibility."
  },
  {
    "id": "ifelse",
    "tier": "Conditionals",
    "type": "recall",
    "skill": "if / else only",
    "lesson": "Agent Script supports <code>if</code> and <code>else</code>, but <b>not</b> <code>else if</code>.",
    "task": "True or false: you can chain else if after an if.",
    "answer": "False",
    "why": "There is no else-if; nest another if inside else instead."
  },
  {
    "id": "compare",
    "tier": "Conditionals",
    "type": "write",
    "skill": "Comparison operators",
    "lesson": "Compare with <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>.",
    "task": "Write a condition that checks the price variable is greater than 100.",
    "answer": "@variables.price > 100",
    "why": "These operators feed if-conditions and other branching."
  },
  {
    "id": "none",
    "tier": "Conditionals",
    "type": "write",
    "skill": "Check for empty",
    "lesson": "Test for empty values with <code>is None</code> and <code>is not None</code>.",
    "task": "Write a condition that the user_name variable is not empty.",
    "answer": "@variables.user_name is not None",
    "why": "Use this to guard against unset variables before acting on them."
  },
  {
    "id": "ref_kinds",
    "tier": "Actions & blocks",
    "type": "write",
    "skill": "Reference an action",
    "lesson": "The @ symbol reaches any resource: <code>@actions.</code>, <code>@subagent.</code>, <code>@variables.</code>, <code>@outputs.</code>",
    "task": "Reference an action named lookup_order.",
    "answer": "@actions.lookup_order",
    "why": "Same @ pattern, different resource type after the dot."
  },
  {
    "id": "run",
    "tier": "Actions & blocks",
    "type": "recall",
    "skill": "Run, with, set",
    "lesson": "Use <code>run</code> to run an action, <code>with</code> to pass inputs, and <code>set</code> to store its output.",
    "task": "Type the keyword that stores an action's output.",
    "answer": "set",
    "why": "run executes, with passes inputs, set captures the result."
  },
  {
    "id": "system_msgs",
    "tier": "Actions & blocks",
    "type": "recall",
    "skill": "Required system messages",
    "lesson": "The system block lists message prompts. <code>welcome</code> and <code>error</code> are both required.",
    "task": "Name the two required system messages.",
    "answer": "welcome and error",
    "why": "Every agent must define how it opens and how it handles errors."
  },
  {
    "id": "subagent_name",
    "tier": "Actions & blocks",
    "type": "write",
    "skill": "Name a subagent",
    "lesson": "A <b>subagent</b> (formerly called a topic) is one job the agent can do. Names use <code>snake_case</code> — no spaces.",
    "task": "Write a subagent name for handling order tracking.",
    "answer": "order_tracking",
    "why": "snake_case keeps names valid and readable for routing."
  },
  {
    "id": "start_agent",
    "tier": "Actions & blocks",
    "type": "recall",
    "skill": "Where the agent begins",
    "lesson": "The <code>start_agent</code> block (the agent router) runs first on every customer utterance and routes to the right subagent.",
    "task": "Which block does the agent begin at on each turn?",
    "answer": "start_agent",
    "why": "It handles classification, filtering, and routing before any subagent runs."
  }
];
