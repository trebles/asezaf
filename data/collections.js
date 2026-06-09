/* Pack 7 — Collections & Data
   Grounded verbatim in the official trailheadapps/agent-script-recipes .agent files.
   Every card is type-from-memory: read, type your answer, reveal, rate A/B/C. */
window.PACKS = window.PACKS || {};
window.PACKS["collections"] = [
  {
    "id": "list_string",
    "tier": "Lists",
    "type": "write",
    "skill": "A list of strings",
    "lesson": "<code>list[string]</code> holds several strings.",
    "task": "Declare a mutable list[string] questions with two items: \"A?\" and \"B?\".",
    "answer": "questions: mutable list[string] = [\"A?\", \"B?\"]",
    "why": "Every element shares the declared type."
  },
  {
    "id": "empty_list",
    "tier": "Lists",
    "type": "write",
    "skill": "An empty list",
    "lesson": "A list can start empty with <code>[]</code>.",
    "task": "Declare a mutable list[string] cart_items that starts empty.",
    "answer": "cart_items: mutable list[string] = []",
    "why": "Useful when items get added during the conversation."
  },
  {
    "id": "list_number",
    "tier": "Lists",
    "type": "write",
    "skill": "A list of numbers",
    "lesson": "<code>list[number]</code> holds numbers.",
    "task": "Declare a mutable list[number] scores with 95 and 87.",
    "answer": "scores: mutable list[number] = [95, 87]",
    "why": "number covers integers and decimals alike."
  },
  {
    "id": "list_len",
    "tier": "Lists",
    "type": "write",
    "skill": "Length of a list",
    "lesson": "<code>len(...)</code> returns how many items a list holds.",
    "task": "Write an expression for the number of items in questions.",
    "answer": "len(@variables.questions)",
    "why": "Compare the index to len() to know when iteration is done."
  },
  {
    "id": "list_index",
    "tier": "Lists",
    "type": "write",
    "skill": "Index into a list",
    "lesson": "Use <code>[index]</code> to read one element. Lists are zero-based.",
    "task": "Write the element of questions at position question_index.",
    "answer": "@variables.questions[@variables.question_index]",
    "why": "A variable can be the index."
  },
  {
    "id": "index_template",
    "tier": "Lists",
    "type": "write",
    "skill": "An element in a prompt",
    "lesson": "Interpolate an indexed element with <code>{!...}</code>.",
    "task": "Interpolate the current question into a prompt.",
    "answer": "{!@variables.questions[@variables.question_index]}",
    "why": "The prompt the LLM sees gets the actual question text."
  },
  {
    "id": "index_arith",
    "tier": "Lists",
    "type": "write",
    "skill": "Math inside a template",
    "lesson": "Templates can do arithmetic and call len().",
    "task": "Write a template line showing \"Question N of M\" using the index+1 and the list length.",
    "answer": "Question {!@variables.question_index + 1} of {!len(@variables.questions)}:",
    "why": "+1 turns the zero-based index into a human count."
  },
  {
    "id": "loop_pattern",
    "tier": "Lists",
    "type": "recall",
    "skill": "How to iterate a list",
    "lesson": "Agent Script iterates with an index variable, not a for-loop.",
    "task": "In a sentence, how do you iterate through a list?",
    "answer": "Track an index, compare it to len(list), and advance the index each turn.",
    "why": "Each turn handles one element; the index moves forward."
  },
  {
    "id": "advance_index",
    "tier": "Lists",
    "type": "assemble",
    "skill": "Advance the index",
    "lesson": "A setVariables tool can increment the index.",
    "task": "Write a tool advance_question that adds 1 to question_index.",
    "answer": "advance_question: @utils.setVariables\n   with question_index = @variables.question_index + 1",
    "why": "Moves iteration to the next element."
  },
  {
    "id": "object_decl",
    "tier": "Objects",
    "type": "write",
    "skill": "An empty object",
    "lesson": "<code>object</code> holds a JSON object; it can start empty.",
    "task": "Declare a mutable object order_details defaulting to empty.",
    "answer": "order_details: mutable object = {}",
    "why": "Often filled later from an action's output."
  },
  {
    "id": "object_value",
    "tier": "Objects",
    "type": "write",
    "skill": "An object with fields",
    "lesson": "Objects use JSON key/value pairs.",
    "task": "Declare a mutable object order_line with SKU \"abc\" and count 2.",
    "answer": "order_line: mutable object = {\"SKU\": \"abc\", \"count\": 2}",
    "why": "Bundles related fields into one variable."
  },
  {
    "id": "list_output",
    "tier": "Data",
    "type": "assemble",
    "skill": "A list output",
    "lesson": "An action output can be a list.",
    "task": "Declare a list[string] output recommendations with a description.",
    "answer": "recommendations: list[string]\n   description: \"List of recommendations\"",
    "why": "Stored like any output and usable in prompts."
  },
  {
    "id": "truthy_string",
    "tier": "Conditions",
    "type": "write",
    "skill": "Branch on a set value",
    "lesson": "A non-empty string is truthy — you can test it directly.",
    "task": "Write a condition that runs when customer_name is set.",
    "answer": "if @variables.customer_name:",
    "why": "No need to compare to an empty string."
  },
  {
    "id": "not_truthy",
    "tier": "Conditions",
    "type": "write",
    "skill": "Branch on a missing value",
    "lesson": "<code>not</code> flips truthiness.",
    "task": "Write a condition that runs when order_id is empty.",
    "answer": "if not @variables.order_id:",
    "why": "A clean way to ask for missing info first."
  },
  {
    "id": "truthy_list",
    "tier": "Conditions",
    "type": "write",
    "skill": "Branch on a non-empty list",
    "lesson": "A list with items is truthy.",
    "task": "Write a condition that runs when cart_items has anything in it.",
    "answer": "if @variables.cart_items:",
    "why": "Empty lists are falsy."
  },
  {
    "id": "slot_one",
    "tier": "Slot-filling",
    "type": "assemble",
    "skill": "Fill one value",
    "lesson": "The <code>...</code> token tells the LLM to extract a value from the conversation.",
    "task": "Write a setVariables tool that fills order_id from the conversation.",
    "answer": "collect: @utils.setVariables\n   with order_id=...",
    "why": "Slot-filling lets the LLM capture what the user says."
  },
  {
    "id": "slot_multi",
    "tier": "Slot-filling",
    "type": "assemble",
    "skill": "Fill several values",
    "lesson": "One setVariables tool can fill multiple variables.",
    "task": "Write a tool that fills user_name and age from the conversation.",
    "answer": "collect_info: @utils.setVariables\n   with user_name=...\n   with age=...",
    "why": "Each with line targets one variable."
  },
  {
    "id": "slot_plus_set",
    "tier": "Slot-filling",
    "type": "assemble",
    "skill": "Fill and set together",
    "lesson": "A setVariables tool can also set a fixed value.",
    "task": "Write a tool that fills interests and sets survey_completed to True.",
    "answer": "finish: @utils.setVariables\n   with interests=...\n   with survey_completed = True",
    "why": "Mix extracted (...) and fixed (= value) bindings."
  },
  {
    "id": "set_from_output",
    "tier": "Data",
    "type": "write",
    "skill": "Store a list output",
    "lesson": "Capture an action's returned list into a variable with set.",
    "task": "Store the recommendations output into the recommendations variable.",
    "answer": "set @variables.recommendations = @outputs.recommendations",
    "why": "@outputs holds what the action just returned."
  },
  {
    "id": "template_var",
    "tier": "Templates",
    "type": "write",
    "skill": "Interpolate a variable",
    "lesson": "<code>{!@variables.x}</code> inserts a value into prompt text.",
    "task": "Interpolate customer_name into a prompt.",
    "answer": "{!@variables.customer_name}",
    "why": "The LLM sees the value, not the reference."
  },
  {
    "id": "template_expr",
    "tier": "Templates",
    "type": "write",
    "skill": "Interpolate an expression",
    "lesson": "Templates can hold arithmetic between variables.",
    "task": "Write a template showing how much cart_total exceeds budget.",
    "answer": "{!@variables.cart_total - @variables.budget}",
    "why": "Computed at resolve time, before the prompt is sent."
  },
  {
    "id": "number_default",
    "tier": "Data",
    "type": "write",
    "skill": "A number default",
    "lesson": "Numbers often start at 0.",
    "task": "Declare a mutable number budget defaulting to 0.",
    "answer": "budget: mutable number = 0",
    "why": "Lets you test 'if budget > 0' for 'not set yet'."
  },
  {
    "id": "combined_cond",
    "tier": "Conditions",
    "type": "write",
    "skill": "Combine data conditions",
    "lesson": "Use <code>and</code> to require two things.",
    "task": "Write a condition: cart_total is over budget AND budget is greater than 0.",
    "answer": "if @variables.cart_total > @variables.budget and @variables.budget > 0:",
    "why": "Guards against firing when budget is unset."
  },
  {
    "id": "user_input_data",
    "tier": "Data",
    "type": "write",
    "skill": "The latest message",
    "lesson": "<code>@system_variables.user_input</code> is the customer's most recent utterance.",
    "task": "Reference the customer's latest message.",
    "answer": "@system_variables.user_input",
    "why": "Handy to pass into an action; read-only."
  },
  {
    "id": "object_output",
    "tier": "Data",
    "type": "assemble",
    "skill": "An object output",
    "lesson": "An action can return a complex object.",
    "task": "Declare an object output details with a description.",
    "answer": "details: object\n   description: \"Detailed order information\"",
    "why": "Complex types may also need complex_data_type_name."
  }
];
