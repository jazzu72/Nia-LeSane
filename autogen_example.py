from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager

# Config with your LLM (from your earlier config)
llm_config = {"config_list": config_list, "cache_seed": 42}

# User proxy (represents you)
user_proxy = UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=10,
    code_execution_config={"work_dir": "coding"}
)

# Assistant agent
assistant = AssistantAgent(
    name="Assistant",
    llm_config=llm_config,
    system_message="You are a helpful AI assistant."
)

# Group chat
groupchat = GroupChat(agents=[user_proxy, assistant], messages=[], max_round=10)
manager = GroupChatManager(groupchat=groupchat, llm_config=llm_config)

# Initiate chat
user_proxy.initiate_chat(
    manager,
    message="Write a Python script to calculate Fibonacci numbers."
)