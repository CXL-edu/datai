# 数源智能 决策基线（Single Source of Truth）

更新时间：2026-02-19
状态：已确认

## 1. 产品定位
数源智能（Datai）是一个面向表格数据分析的 AI Agent Web 应用。  
优先验证“分析推理准确性 + 可视化输出质量 + 可解释过程展示”。

## 2. 已确认决策
1. 前端采用 `Vite + React`。
2. 交互采用流式 Chat，不做 Notebook Cell。
3. 使用可展开任务状态面板展示 AI 执行过程。
4. 保留阶段骨架（读取/理解/清洗/分析/可视化/报告）。
5. 阶段内动作不做固定枚举，由事件流动态驱动 UI。
6. 小模型用于 UI 展示内容生成，且绝不回灌主模型上下文。
7. 小模型失败自动重试，重试后仍失败则显示占位信息。
8. 阶段 1 数据层使用 `DuckDB + SQLite`。
9. RAG 当前不启用，但预留模块目录和设计文档。
10. 后端固定地址 `127.0.0.1:8000`。
11. 当前只做 Web，不做桌面化。
12. Python 环境主方案为 `uv`，`micromamba` 作为疑难依赖兜底。
13. 需求分两阶段推进：先单文件多 sheet，再多文件关联。

## 3. 冲突裁决结果
1. `Next.js vs Vite`：阶段 1 采用 Vite。
2. `Web vs Desktop`：阶段 1 采用 Web。
3. `Chat vs Notebook`：阶段 1 采用 Chat + Task Status Panel。
4. `PostgreSQL/Milvus vs DuckDB/SQLite`：阶段 1 采用 DuckDB + SQLite。
5. `立即做 RAG vs 延后`：阶段 1 延后，只留接口。
6. `uv vs micromamba`：阶段 1 采用 uv，micromamba 仅兜底。

## 4. 阶段划分

### 阶段 1（MVP）
- 单文件上传，支持多 sheet。
- 流式 Chat + 可展开任务状态面板。
- 基础数据清洗、统计分析、图表生成、简版报告。

### 阶段 2
- 多文件关联分析。
- RAG-lite 接入。
- 完整图文报告模板化。

## 5. 文档优先级
若多份文档冲突，以本文件为最高优先级。  
`docs/prd.md` 为完整产品主文档。  
`others.md` 保留为思路草稿，不作为当前实现规范。
