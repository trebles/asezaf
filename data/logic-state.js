/* Pack 2 — Logic & State
   Every card is type-from-memory: read, type your answer, reveal, rate A/B/C. */
window.PACKS = window.PACKS || {};
window.PACKS["logic-state"] = [
  {
    "id": "eq",
    "tier": "Comparison",
    "type": "write",
    "skill": "Equal to",
    "lesson": "<code>==</code> tests whether two values are equal.",
    "task": "Write a condition that the count variable equals 10.",
    "answer": "@variables.count == 10",
    "why": "A single = sets a value; == compares. Don't confuse them."
  },
  {
    "id": "neq",
    "tier": "Comparison",
    "type": "write",
    "skill": "Not equal to",
    "lesson": "<code>!=</code> is true when the values differ.",
    "task": "Write a condition that the status variable is not \"done\".",
    "answer": "@variables.status != \"done\"",
    "why": "Useful for ‘keep going until’ style checks."
  },
  {
    "id": "lt_gt",
    "tier": "Comparison",
    "type": "write",
    "skill": "Less than / greater than",
    "lesson": "Use <code>&lt;</code> and <code>&gt;</code> for strict ordering.",
    "task": "Write a condition that the age variable is under 18.",
    "answer": "@variables.age < 18",
    "why": "Strict: 18 itself does not satisfy < 18."
  },
  {
    "id": "lte",
    "tier": "Comparison",
    "type": "write",
    "skill": "Less than or equal",
    "lesson": "<code>&lt;=</code> includes the boundary value.",
    "task": "Write a condition that the score variable is at most 100.",
    "answer": "@variables.score <= 100",
    "why": "<= 100 is true when score is exactly 100; < 100 is not."
  },
  {
    "id": "gte",
    "tier": "Comparison",
    "type": "write",
    "skill": "Greater than or equal",
    "lesson": "<code>&gt;=</code> is true at the boundary and above.",
    "task": "Write a condition that the total variable is at least 50.",
    "answer": "@variables.total >= 50",
    "why": "Pair >= with a threshold for ‘qualifies for’ rules like free shipping."
  },
  {
    "id": "is_none",
    "tier": "Identity",
    "type": "write",
    "skill": "Identity: is None",
    "lesson": "<code>is</code> checks identity. <code>is None</code> tests for an empty/unset value.",
    "task": "Write a condition that the value variable is empty.",
    "answer": "@variables.value is None",
    "why": "Use ‘is None’, not ‘== None’, for empties."
  },
  {
    "id": "is_not_none",
    "tier": "Identity",
    "type": "write",
    "skill": "Identity: is not None",
    "lesson": "<code>is not None</code> is true when a value is present.",
    "task": "Write a condition that the data variable is present.",
    "answer": "@variables.data is not None",
    "why": "The standard guard before acting on a value."
  },
  {
    "id": "and",
    "tier": "Logical",
    "type": "write",
    "skill": "Logical AND",
    "lesson": "<code>and</code> is true only when both sides are true.",
    "task": "Write a condition true when both verified and is_member are true.",
    "answer": "@variables.verified and @variables.is_member",
    "why": "Both must hold — the strictest combiner."
  },
  {
    "id": "or",
    "tier": "Logical",
    "type": "write",
    "skill": "Logical OR",
    "lesson": "<code>or</code> is true when at least one side is true.",
    "task": "Write a condition true when either is_vip or has_coupon is true.",
    "answer": "@variables.is_vip or @variables.has_coupon",
    "why": "Either path qualifies."
  },
  {
    "id": "not",
    "tier": "Logical",
    "type": "write",
    "skill": "Logical NOT",
    "lesson": "<code>not</code> flips a boolean.",
    "task": "Write a condition true when the flag variable is false.",
    "answer": "not @variables.flag",
    "why": "Cleaner than comparing == False."
  },
  {
    "id": "grouping",
    "tier": "Logical",
    "type": "write",
    "skill": "Group with parentheses",
    "lesson": "Use <code>( )</code> to control precedence when mixing and/or.",
    "task": "Write: (x or y) must be true, and z must also be true.",
    "answer": "(@variables.x or @variables.y) and @variables.z",
    "why": "Without parentheses, and binds tighter than or and changes the meaning."
  },
  {
    "id": "precedence",
    "tier": "Logical",
    "type": "predict",
    "skill": "Why grouping matters",
    "lesson": "<code>and</code> binds tighter than <code>or</code>, so <code>a or b and c</code> reads as <code>a or (b and c)</code>.",
    "task": "To require (a or b) first, then and c — what must you add?",
    "answer": "Parentheses: (a or b) and c",
    "why": "Grouping makes the intended order explicit and safe."
  },
  {
    "id": "add",
    "tier": "Arithmetic",
    "type": "write",
    "skill": "Addition",
    "lesson": "<code>+</code> adds numbers.",
    "task": "Write an expression that is the count variable plus 1.",
    "answer": "@variables.count + 1",
    "why": "The building block of counters."
  },
  {
    "id": "sub",
    "tier": "Arithmetic",
    "type": "write",
    "skill": "Subtraction",
    "lesson": "<code>-</code> subtracts numbers.",
    "task": "Write an expression that is the total variable minus 5.",
    "answer": "@variables.total - 5",
    "why": "Comparison and arithmetic are the only operators — there's no * or /."
  },
  {
    "id": "if_syntax",
    "tier": "Branching",
    "type": "write",
    "skill": "An if condition",
    "lesson": "Logic branches start with <code>if &lt;condition&gt;:</code> on a logic (<code>-&gt;</code>) line.",
    "task": "Write an if line that checks is_member is True.",
    "answer": "if @variables.is_member == True:",
    "why": "The colon opens the indented block that runs when the condition holds."
  },
  {
    "id": "else_syntax",
    "tier": "Branching",
    "type": "write",
    "skill": "An else branch",
    "lesson": "<code>else:</code> runs when the if condition is false.",
    "task": "Write the else line that pairs with an if.",
    "answer": "else:",
    "why": "else takes no condition — just the colon."
  },
  {
    "id": "no_elseif",
    "tier": "Branching",
    "type": "recall",
    "skill": "No else if",
    "lesson": "Agent Script has <code>if</code> and <code>else</code> only — there is no <code>else if</code>.",
    "task": "You need a third branch. What do you do instead of else if?",
    "answer": "Nest another if inside the else block.",
    "why": "Nesting is the supported way to chain more than two outcomes."
  },
  {
    "id": "guard",
    "tier": "Branching",
    "type": "write",
    "skill": "Guard before using a value",
    "lesson": "Combine a presence check with <code>and</code> so you only act on real values.",
    "task": "Write a condition: email is present AND verified is True.",
    "answer": "@variables.email is not None and @variables.verified == True",
    "why": "Guarding avoids acting on empty or half-filled state."
  },
  {
    "id": "branch_choice",
    "tier": "Branching",
    "type": "recall",
    "skill": "Branch a prompt vs set a variable",
    "lesson": "Inside an if you can either include a different prompt (<code>|</code>) or set a variable (<code>set</code>).",
    "task": "Name the two things an if branch can do.",
    "answer": "Include a prompt, and/or set a variable.",
    "why": "Branches can change what the LLM is told and change state."
  },
  {
    "id": "set_value",
    "tier": "State",
    "type": "write",
    "skill": "Set a variable",
    "lesson": "Use <code>set @variables.&lt;name&gt; = &lt;value&gt;</code> in logic to change a (mutable) variable.",
    "task": "Set the status variable to \"open\".",
    "answer": "set @variables.status = \"open\"",
    "why": "set is how the agent records decisions and progress."
  },
  {
    "id": "set_output",
    "tier": "State",
    "type": "write",
    "skill": "Store an action's output",
    "lesson": "After running an action, capture a returned value with <code>set @variables.x = @outputs.y</code>.",
    "task": "Store the action output delivery_date into the variable updated_date.",
    "answer": "set @variables.updated_date = @outputs.delivery_date",
    "why": "@outputs holds what the last action returned."
  },
  {
    "id": "increment",
    "tier": "State",
    "type": "write",
    "skill": "Increment a counter",
    "lesson": "Combine <code>set</code> with <code>+</code> to count.",
    "task": "Increase the num_turns variable by 1.",
    "answer": "set @variables.num_turns = @variables.num_turns + 1",
    "why": "A common pattern for ‘how many times have we been here’ logic."
  },
  {
    "id": "mutable_to_set",
    "tier": "State",
    "type": "fix",
    "skill": "Only mutable can be set",
    "lesson": "You can only <code>set</code> a variable declared <code>mutable</code>. A plain declaration is read-only.",
    "task": "This won't compile when set later — fix it:  status: string = \"new\"",
    "answer": "status: mutable string = \"new\"",
    "why": "Without mutable, any later set on the variable is invalid."
  },
  {
    "id": "slot_token",
    "tier": "State",
    "type": "write",
    "skill": "The slot-fill token",
    "lesson": "<code>...</code> tells the LLM to fill a value from the conversation — e.g. when binding an action input.",
    "task": "Bind an action input order_id to be filled by the LLM.",
    "answer": "with order_id = ...",
    "why": "The ... token hands that one value to the LLM to extract."
  },
  {
    "id": "set_variables_util",
    "tier": "State",
    "type": "write",
    "skill": "setVariables tool",
    "lesson": "<code>@utils.setVariables</code> defines a tool that lets the LLM set a variable from what the customer says, guided by a description.",
    "task": "Define a tool named capture_name using the setVariables util.",
    "answer": "capture_name: @utils.setVariables",
    "why": "Pair it with a description so the LLM knows what to extract (slot filling)."
  }
];
