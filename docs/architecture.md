# 数源智能 Architecture

更新时间：2026-02-19
说明：本文件是 `docs/prd.md` 的架构落地文档。

## 1. 总体架构
- 前端：Vite + React + TypeScript。
- 后端：FastAPI（固定 `127.0.0.1:8000`）。
- 数据分析执行：Python 进程，`uv` 管理环境。
- 数据层：DuckDB（分析查询）+ SQLite（会话与系统状态）。

## 2. 交互架构
- 主界面：流式 Chat。
- 辅助界面：可展开任务状态面板（Task Status Panel）。
- 面板折叠态显示：简短状态、加载动画、耗时。
- 面板展开态显示：执行日志、步骤产物、错误详情、结果摘要。

## 3. 执行流与事件流

### 3.1 阶段骨架（用于导航与观测）
- 数据读取
- 数据理解
- 数据清洗
- 分析计算
- 可视化
- 报告生成

### 3.2 动作生成
- 不限制固定动作类型。
- 由执行事件动态驱动 UI 展示。
- UI 模型可自由组织动作文案和层级。

### 3.3 默认推荐执行顺序（非强制）
- 统计摘要优先于分析诉求抽取。
- 缺失值处理在统计摘要之后进行，并记录处理理由。
- 后续步骤可根据执行结果动态调整，不强制线性流程。

### 3.4 标准事件对象
事件总线使用统一结构（后续可扩展）：

```json
{
  "id": "evt_001",
  "phase": "analysis",
  "action": "run_descriptive_stats",
  "status": "running",
  "started_at": "2026-02-19T12:00:00Z",
  "ended_at": null,
  "detail_ref": "log://session/abc/evt_001",
  "payload": {}
}
```

## 4. 双模型职责边界

### 4.1 主模型（Core Model）
- 职责：任务理解、分析推理、工具调用、结果产出。
- 输出：结构化执行事件 + 最终分析结论。
- 不负责：UI 装饰文案与交互动效描述。

### 4.2 UI 模型（Low-cost UI Model）
- 职责：将结构化事件转换为任务面板展示内容。
- 可做：状态短文案、展开日志摘要、用户可读标签。
- 约束：输出绝不回灌主模型上下文。

### 4.3 UI 模型失败策略
- 自动重试 2-3 次。
- 仍失败时显示占位信息（友好短文案），不暴露系统细节且不中断主流程。

## 5. 模块划分（后端）
- `backend/agent/`：主模型调度、工具调用、流程编排。
- `backend/executor/`：Python 分析任务执行与资源隔离。
- `backend/events/`：事件总线、日志落盘、状态聚合。
- `backend/storage/`：DuckDB 与 SQLite 访问层。
- `backend/rag/`：预留模块（MVP 不启用检索）。

## 6. RAG 预留策略（MVP）
- 仅保留接口与目录，不参与主流程依赖。
- 后续在阶段 2 接入 RAG-lite。
- 相关设计见 `docs/rag-design.md`。

## 7. API 草案（MVP）
- `POST /api/session`：创建会话。
- `POST /api/upload`：上传文件并触发解析。
- `POST /api/chat`：发送用户问题，返回流式结果。
- `GET /api/events/{session_id}`：拉取任务状态事件流。
- `GET /api/report/{session_id}`：获取简版报告。

## 8. 演进方向（阶段 2 以后）
- 多文件关联分析编排。
- 报告模板化与版本化。
- 可选桌面化（Electron/Tauri）。
