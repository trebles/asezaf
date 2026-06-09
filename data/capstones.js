/* Pack 10 — Build an Agent
   Grounded verbatim in the official trailheadapps/agent-script-recipes .agent files.
   Every card is type-from-memory: read, type your answer, reveal, rate A/B/C. */
window.PACKS = window.PACKS || {};
window.PACKS["capstones"] = [
  {
    "id": "minimal_blocks",
    "tier": "HelloWorld",
    "type": "recall",
    "skill": "Minimal agent blocks",
    "lesson": "The HelloWorld recipe is the smallest real agent.",
    "task": "Which blocks make up the minimal HelloWorld agent?",
    "answer": "config, system, start_agent, and one subagent.",
    "why": "The skeleton every agent shares."
  },
  {
    "id": "hello_router",
    "tier": "HelloWorld",
    "type": "assemble",
    "skill": "HelloWorld's router tool",
    "lesson": "HelloWorld routes to a greeting subagent.",
    "task": "Write the router tool begin_greeting that transitions to greeting, with a description.",
    "answer": "begin_greeting: @utils.transition to @subagent.greeting\n   description: \"Start the greeting conversation\"",
    "why": "The router's one job here is to hand off to greeting."
  },
  {
    "id": "hello_greeting",
    "tier": "HelloWorld",
    "type": "assemble",
    "skill": "The greeting prompt",
    "lesson": "HelloWorld answers in the style of a poem.",
    "task": "Write the greeting subagent's logic-procedure prompt greeting the user, in poem style.",
    "answer": "instructions:->\n   | Greet the user warmly and ask how you can help them.\n     Always answer in the style of a poem.",
    "why": "A pure-prompt procedure under ->."
  },
  {
    "id": "standup_advance",
    "tier": "Standup",
    "type": "assemble",
    "skill": "Advance the standup",
    "lesson": "The ListVariables recipe iterates questions by index.",
    "task": "Write the advance_question tool that moves to the next question.",
    "answer": "advance_question: @utils.setVariables\n   with question_index = @variables.question_index + 1",
    "why": "Incrementing the index walks the list."
  },
  {
    "id": "standup_loop",
    "tier": "Standup",
    "type": "assemble",
    "skill": "Ask or summarize",
    "lesson": "Compare the index to len() to decide ask vs finish.",
    "task": "Write the if/else: while more questions remain, ask the current one; otherwise summarize.",
    "answer": "if @variables.question_index < len(@variables.questions):\n   | Ask this question: {!@variables.questions[@variables.question_index]}\nelse:\n   | All questions complete. Summarize what the user shared.",
    "why": "Index-vs-length is the loop condition."
  },
  {
    "id": "survey_collect",
    "tier": "Survey",
    "type": "assemble",
    "skill": "Collect a name",
    "lesson": "VariableManagement slot-fills survey answers.",
    "task": "Write the set_user_name tool that fills user_name from the conversation.",
    "answer": "set_user_name: @utils.setVariables\n   with user_name=...",
    "why": "Each survey field gets its own slot-fill tool."
  },
  {
    "id": "orderstatus_fetch",
    "tier": "OrderStatus",
    "type": "assemble",
    "skill": "Fetch before reasoning",
    "lesson": "ReasoningInstructions fetches status when it has an id but no status yet.",
    "task": "Write the logic: if order_id is set but order_status isn't, run get_order_status and store the status.",
    "answer": "if @variables.order_id and not @variables.order_status:\n   run @actions.get_order_status\n      with order_id=@variables.order_id\n      set @variables.order_status = @outputs.status",
    "why": "Data lands in the prompt before the LLM reasons."
  },
  {
    "id": "orderstatus_branch",
    "tier": "OrderStatus",
    "type": "assemble",
    "skill": "A status branch",
    "lesson": "Each status gets its own prompt.",
    "task": "Write the branch for when order_status is \"shipped\".",
    "answer": "if @variables.order_status == \"shipped\":\n   | The order has shipped. Provide the tracking number and estimated delivery.",
    "why": "Independent ifs, one per status (no else if)."
  },
  {
    "id": "payment_chain",
    "tier": "Payments",
    "type": "assemble",
    "skill": "Chain after a payment",
    "lesson": "ActionChaining runs follow-up actions after the payment.",
    "task": "Write make_payment: run process_payment, store transaction_id, then run send_receipt.",
    "answer": "make_payment: @actions.process_payment\n   with amount=...\n   set @variables.transaction_id = @outputs.transaction_id\n   run @actions.send_receipt\n      with transaction_id=@variables.transaction_id",
    "why": "Nested run chains the next step deterministically."
  },
  {
    "id": "gate_auth",
    "tier": "OpenGate",
    "type": "assemble",
    "skill": "Force authentication",
    "lesson": "OpenGateRouter guards returns behind auth.",
    "task": "In product_return, if not authenticated, set the breadcrumb and go authenticate.",
    "answer": "if @variables.authenticated == False:\n   set @variables.next_subagent = \"product_return\"\n   transition to @subagent.customer_authentication",
    "why": "The breadcrumb lets the user return afterward."
  },
  {
    "id": "gate_after",
    "tier": "OpenGate",
    "type": "assemble",
    "skill": "Resume after auth",
    "lesson": "after_reasoning sends the user back once verified.",
    "task": "Write the after_reasoning that returns to product_return when authenticated and the breadcrumb matches.",
    "answer": "after_reasoning:\n   if @variables.authenticated == True and @variables.next_subagent == \"product_return\":\n      transition to @subagent.product_return",
    "why": "Completes the gate's return path."
  },
  {
    "id": "gate_available",
    "tier": "OpenGate",
    "type": "write",
    "skill": "Guard the submit tool",
    "lesson": "The return submit is gated until inputs exist.",
    "task": "Write the available-when for submit_return needing order_id and return_reason.",
    "answer": "available when @variables.order_id and @variables.return_reason",
    "why": "Hides submission until both are collected."
  },
  {
    "id": "bidir_return",
    "tier": "Bidirectional",
    "type": "write",
    "skill": "Specialist returns",
    "lesson": "BidirectionalNavigation specialists hand control back.",
    "task": "Write the line a specialist uses to return control to general_support.",
    "answer": "transition to @subagent.general_support",
    "why": "Explicit return after the specialist's work."
  },
  {
    "id": "afterreason_log",
    "tier": "AfterReasoning",
    "type": "assemble",
    "skill": "Log on completion",
    "lesson": "AfterReasoning logs at the end of each turn.",
    "task": "Write the after_reasoning that runs log_event with event_type \"reasoning_completed\".",
    "answer": "after_reasoning:\n   run @actions.log_event\n      with event_type=\"reasoning_completed\"",
    "why": "Lifecycle logging belongs here, not in the prompt."
  },
  {
    "id": "timestamp_first",
    "tier": "AfterReasoning",
    "type": "assemble",
    "skill": "First-turn setup",
    "lesson": "Initialise once on the first turn.",
    "task": "On the first turn (turn_count == 1), run get_timestamp and store session_start_time.",
    "answer": "if @variables.turn_count == 1:\n   run @actions.get_timestamp\n      set @variables.session_start_time = @outputs.current_timestamp",
    "why": "Guarded so it only runs once."
  },
  {
    "id": "fix_cap_transition",
    "tier": "Debug",
    "type": "fix",
    "skill": "Fix a return",
    "lesson": "Logic-block transitions use the plain form.",
    "task": "Fix this line inside after_reasoning: @utils.transition to @subagent.product_return",
    "answer": "transition to @subagent.product_return",
    "why": "@utils.transition to is only for tools."
  },
  {
    "id": "fix_cap_bool",
    "tier": "Debug",
    "type": "fix",
    "skill": "Fix a survey flag",
    "lesson": "Booleans are capitalised.",
    "task": "Fix: survey_completed: mutable boolean = false",
    "answer": "survey_completed: mutable boolean = False",
    "why": "false is invalid; only False works."
  },
  {
    "id": "extend_input",
    "tier": "Extend",
    "type": "assemble",
    "skill": "Add a required input",
    "lesson": "Extend an action with another input.",
    "task": "Write a required string input customer_id with a description.",
    "answer": "customer_id: string\n   description: \"The authenticated customer's ID\"\n   is_required: True",
    "why": "Type, description, then is_required."
  },
  {
    "id": "extend_desc",
    "tier": "Extend",
    "type": "write",
    "skill": "Describe a tool",
    "lesson": "A transition tool reads better with a description.",
    "task": "Add a description to a router tool, telling it to handle product returns.",
    "answer": "description: \"Help with a product return, exchange, or refund\"",
    "why": "The description is how the LLM decides to pick it."
  },
  {
    "id": "pred_cap_route",
    "tier": "Trace",
    "type": "predict",
    "skill": "Trace the gate",
    "lesson": "OpenGateRouter sends unauthenticated returns through auth.",
    "task": "An unauthenticated user asks to return an item. What happens?",
    "answer": "The router routes to product_return, which sees not-authenticated, sets the breadcrumb, and transitions to customer_authentication.",
    "why": "After auth, after_reasoning returns them to product_return."
  },
  {
    "id": "pred_cap_loop",
    "tier": "Trace",
    "type": "predict",
    "skill": "Trace the standup",
    "lesson": "The standup walks the list by index.",
    "task": "question_index is 2 of a 3-question list. What happens this turn and next?",
    "answer": "It asks question 3 (index 2); advance moves the index to 3, so next turn it summarizes.",
    "why": "index < len keeps asking; index == len ends it."
  },
  {
    "id": "complex_output",
    "tier": "Extend",
    "type": "assemble",
    "skill": "A Lightning-typed output",
    "lesson": "A complex object output names its type.",
    "task": "Declare an object output details with the lightning__recordInfoType complex type.",
    "answer": "details: object\n   complex_data_type_name: \"lightning__recordInfoType\"",
    "why": "Required when a flow returns a complex Lightning type."
  },
  {
    "id": "clear_gate",
    "tier": "OpenGate",
    "type": "write",
    "skill": "Clear the gate at the end",
    "lesson": "The confirmation subagent clears the gate.",
    "task": "Write the line that clears open_gate in the confirmation step.",
    "answer": "set @variables.open_gate = \"\"",
    "why": "Frees the router from forcing that route again."
  },
  {
    "id": "full_action",
    "tier": "Build",
    "type": "assemble",
    "skill": "A complete action",
    "lesson": "Pull the pieces together into one action.",
    "task": "Write process_return: a description, one required string input order_id, a string output confirmation_number, target flow ProcessProductReturn.",
    "answer": "process_return:\n   description: \"Process a product return request\"\n   inputs:\n      order_id: string\n         description: \"The order to return\"\n         is_required: True\n   outputs:\n      confirmation_number: string\n         description: \"Return confirmation number\"\n   target: \"flow://ProcessProductReturn\"",
    "why": "description, inputs, outputs, target — the full shape."
  },
  {
    "id": "design_return",
    "tier": "Design",
    "type": "recall",
    "skill": "Design a return path",
    "lesson": "Specialists that come back need an explicit return.",
    "task": "You want a specialist that returns to its caller. How do you wire it?",
    "answer": "Transition out to the specialist, and have the specialist transition back to the caller when done.",
    "why": "Transitions are one-way, so both directions are explicit."
  }
];
