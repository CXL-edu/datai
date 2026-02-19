
backend
 - search   # 提供联网搜索与信息整合的能力
  - search.py   # 实现联网搜索
  - webfetch.py # 抓取检索得到的链接中的内容
  - merge.py    # 调用大模型，根据检索的关键词、需求、搜索结果、相关提示词，生成汇总的结果  
 - llm      # 基于 LiteLLM 实现统一的大模型输入输出接口适配
  - llm.py      # 统一适配器入口
  - 
 - prompts  # 存放各种提示词，使用python文档，以f-string等格式灵活简单的存储提示词
  - agents
  - search
   - decompose.py
   - info_merge.py
