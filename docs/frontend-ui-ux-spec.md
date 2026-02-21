# 数源智能 前端 UI/UX 原型规范（阶段 1 MVP）

更新时间：2026-02-20  
状态：阶段 1 生效（用于 AI 直接生成“多页面 + 可交互”产品原型）

## 1. 项目是什么（必须写给生成模型）
数源智能（Datai）是一个面向电子表格数据分析的 AI Agent Web 应用。用户上传 CSV/XLSX 后，以聊天方式提出分析问题，系统流式返回分析结果和图表，并以内联折叠执行卡片展示任务过程。

本规范目标不是生成聊天单页，而是生成具有多个页面、完整导航、跨页状态和关键交互闭环的产品原型。

## 2. 生成目标与边界

### 2.1 原型目标
1. 生成可运行的 React 多页面原型。
2. 支持完整主流程：上传数据 -> 发起分析 -> 查看执行过程 -> 查看结果图表 -> 查看 Run 详情。
3. 页面间可跳转，状态可延续，交互可演示。

### 2.2 强边界
1. 不做 Notebook Cell 交互。
2. 不做桌面端壳层（Electron/Tauri）。
3. 阶段 1 仅 Plotly 路线，不并行多图表引擎。
4. UI 模型文案只用于展示，不回灌主模型推理上下文。
5. Reports 现阶段不做产品页面，只保留 mock 能力用于占位。

## 3. 设计系统（DESIGN SYSTEM REQUIRED）

### 3.1 视觉方向
风格关键词：Professional, Analytical, Crisp, High-clarity, Product-grade。  
避免“通用聊天壳”观感，重点体现“分析工作台”的信息密度和可观测性。

### 3.2 色彩 Token
1. `--bg`: `#f4f6fb`
2. `--surface`: `#ffffff`
3. `--surface-alt`: `#eef2f7`
4. `--text-primary`: `#0b1220`
5. `--text-secondary`: `#4a5b73`
6. `--border`: `#dbe3ee`
7. `--brand`: `#0f766e`
8. `--brand-strong`: `#0b5e57`
9. `--info`: `#1d4ed8`
10. `--success`: `#15803d`
11. `--warning`: `#b45309`
12. `--error`: `#b91c1c`

### 3.3 字体与排版
1. 中文主字体：`Noto Sans SC`
2. 英文 UI 字体：`Space Grotesk`
3. 代码/日志字体：`JetBrains Mono`
4. 标题字重：600-700，正文字重：400-500

### 3.4 圆角、阴影、动效
1. 圆角：卡片 `12px`，输入框 `10px`，按钮 `10px`
2. 阴影：低层级 `0 1px 2px rgba(16,24,40,.06)`，高层级 `0 8px 24px rgba(16,24,40,.10)`
3. 动效：150-240ms，优先 opacity/translate，避免大幅 scale 造成抖动

### 3.5 补充 Token（新增）
1. `spacing`：`4/8/12/16/20/24/32/40/48`
2. `font-size`：`12/14/16/18/20/24/30`
3. `line-height`：`1.4`（正文）/ `1.2`（标题）
4. `focus-ring`：`0 0 0 3px rgba(15,118,110,.24)`
5. `z-index`：`dropdown=100`、`sticky=200`、`modal=1000`、`toast=1100`
6. `elevation`：`e1/e2/e3` 三档（对应低中高阴影）

## 4. 全局信息架构（必须多页面）

### 4.1 路由地图（阶段 1 必选）
1. `/`：Home（产品入口）
2. `/workspace/:sessionId`：Analysis Workspace（核心工作台）
3. `/datasets`：Datasets（文件夹与文件管理）
4. `/datasets/:datasetId`：Dataset Detail（数据明细 + 简版 EDA）
5. `/runs/:runId`：Run Detail（单次分析运行详情）
6. `/settings`：Settings（模型与偏好设置）
7. `/404`：Not Found

### 4.2 路由地图（阶段 1 占位）
1. `/reports`：mock 页面（非主导航，不纳入阶段 1 必做验收）
2. `/reports/:reportId`：mock 页面（非主导航，不纳入阶段 1 必做验收）

### 4.3 顶层导航
1. 左上：产品 Logo + 名称（数源智能）
2. 左侧主导航：Workspace / Datasets / Settings
3. 顶栏右侧：全局搜索、用户菜单、主题切换（可选）

## 5. 页面级规格（Page-by-Page Spec）

### 5.1 Home `/`
目标：让用户在 5 秒内理解产品并进入分析。

核心区块：
1. Hero：一句话价值主张 + “开始分析”按钮
2. 三步流程：上传 -> 对话分析 -> 图表与运行详情
3. 示例入口：预置 2-3 个分析场景

关键 CTA：
1. `创建新会话`
2. `查看示例数据`

### 5.2 Workspace `/workspace/:sessionId`（核心页）
目标：完成端到端分析闭环。

布局：
1. 主区：Chat Pane（消息流 + 图表卡）
2. 内联区：Task Timeline Card（折叠/展开，插入在对话流中）
3. 底部：Composer（输入 + 上传 + 发送）

必须组件：
1. `ChatMessageList`
2. `MessageBubbleUser`
3. `MessageBubbleAssistant`（支持流式）
4. `InlineTaskTimelineCard`（内联执行卡片）
5. `ChartCard`（Plotly 容器）
6. `PromptComposer`

关键交互：
1. 上传文件后立即显示文件卡与可分析提示。
2. 发送问题后，AI 回复与内联 TaskTimeline 同步刷新。
3. 点击图表卡“查看详情”跳转到 `Run Detail`。

### 5.3 Datasets `/datasets`
目标：以 Drive 风格管理文件夹与电子表格文件。

信息结构：
1. 支持文件夹与文件混排（内容区）
2. 支持面包屑导航（进入文件夹/返回上级）
3. 支持搜索、排序、筛选

视图模式：
1. 网格视图（默认）：大图标卡片，强调视觉浏览（类似图片墙）
2. 列表视图：列为 `文件名`、`拥有者`、`修改日期`、`大小`

交互：
1. 点击文件夹进入下一层目录
2. 点击电子表格文件进入 `Dataset Detail`
3. 顶部提供视图切换（Grid/List）

### 5.4 Dataset Detail `/datasets/:datasetId`
目标：查看单个电子表格的简版 EDA（Simple EDA）。

区块：
1. 概览卡：行数、列数、sheet 数、缺失率
2. 字段分布：类型统计、缺失率 Top 字段
3. 样本预览：前 N 行表格
4. 统计摘要：基础分布与异常概览

CTA：
1. `在当前会话分析`
2. `新建分析会话`

### 5.5 Run Detail `/runs/:runId`
目标：查看单次分析执行轨迹和中间产物。

区块：
1. 阶段时间线（读取/理解/清洗/分析/可视化/报告）
2. 事件日志面板
3. 中间产物（统计摘要、清洗策略、图表）
4. 错误与重试记录

### 5.6 Settings `/settings`
目标：配置偏好，不进入深度平台管理。

区块：
1. 模型偏好（主模型/UI 文案模型）
2. 展示偏好（主题、密度）
3. 系统信息（版本、状态）

## 6. 核心交互对象：Inline Task Timeline（内联折叠）

### 6.1 呈现位置
1. 以内联消息块形式插入到对话流（不使用右侧独立固定栏）
2. 可附着在 Assistant 回复上方或下方

### 6.2 折叠态
1. 状态动画点
2. 一行状态短文案
3. 耗时
4. 展开箭头

### 6.3 展开态
1. 阶段分组
2. 事件列表
3. 事件详情（日志摘要/输出片段/错误信息）

### 6.4 状态枚举
1. `pending`
2. `running`
3. `success`
4. `failed`
5. `skipped`

### 6.5 双模型职责约束
1. 内联执行文案由独立 UI 模型生成
2. UI 模型输出不可回灌主模型上下文

## 7. 跨页用户旅程（必须可演示）

### Journey A：首次用户
1. 进入 Home
2. 点击“创建新会话”
3. 进入 Workspace
4. 上传文件并提问
5. 展开内联 TaskTimeline 查看步骤
6. 点击图表进入 Run Detail

### Journey B：从数据集触发分析
1. 进入 Datasets
2. 在文件夹中定位电子表格文件
3. 打开 Dataset Detail 查看简版 EDA
4. 点击“新建分析会话”
5. 跳转 Workspace 并自动挂载数据集

### Journey C：复盘历史运行
1. 从 Workspace 或列表入口进入 Run Detail
2. 查看阶段时间线和日志
3. 根据错误信息执行重试或返回会话继续提问

## 8. 前端状态模型（Prototype Data Model）

### 8.1 关键实体
1. `Session`
2. `DatasetItem`（folder/file）
3. `Dataset`
4. `Run`
5. `TaskEvent`
6. `Report`（mock-only）

### 8.2 示例结构
```json
{
  "session": { "id": "s_001", "dataset_id": "d_001", "status": "active" },
  "dataset_item": {
    "id": "it_001",
    "type": "file",
    "name": "orders_q1.xlsx",
    "owner": "alice",
    "modified_at": "2026-02-20T09:00:00Z",
    "size": 1048576,
    "parent_id": "folder_sales"
  },
  "dataset": { "id": "d_001", "name": "orders_q1.xlsx", "sheets": 3 },
  "run": { "id": "r_001", "session_id": "s_001", "status": "running" },
  "report": { "id": "rep_001", "run_id": "r_001", "status": "draft", "source": "mock" }
}
```

## 9. 前后端契约（用于原型 Mock）

### 9.1 真实后端端点（阶段 1 必须）
1. `POST /api/session`
2. `POST /api/upload`
3. `POST /api/chat`（流式）
4. `GET /api/events/{session_id}`
5. `GET /api/report/{session_id}`（可返回简版摘要）
6. `GET /api/datasets?parent_id={id}&view=grid|list`
7. `GET /api/datasets/{dataset_id}`
8. `GET /api/runs/{run_id}`

### 9.2 mock-only 端点（阶段 1 占位）
1. `GET /api/reports`
2. `GET /api/reports/{report_id}`

### 9.3 TaskEvent（必须遵守）
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

## 10. 响应式与适配（组件级）
1. `>=1280px`：两段式（导航 + 主内容），TaskTimeline 内联显示于消息流
2. `768-1279px`：主内容优先，Dataset 列表视图保留关键列，次要列收纳到二级信息
3. `<768px`：单栏，Composer 固定底部，TaskTimeline 默认折叠
4. Datasets 网格列数：`<640px` 2 列，`640-1023px` 3 列，`>=1024px` 4-6 列
5. 列表视图移动端降级：仅保留 `文件名` 与 `修改日期`，`拥有者/大小` 收纳到次行
6. 表格与图表允许横向滚动，禁止页面级横向滚动

## 11. 无障碍与可用性
1. 对比度满足 WCAG AA
2. 全键盘可操作
3. `aria-live` 用于流式回复和状态变化
4. 错误信息需有人类可读解释 + 下一步动作

## 12. AI 生成执行规范（关键）

### 12.1 生成范围要求
1. 必须生成上述阶段 1 必选路由（7 个）。
2. 必须实现页面之间可跳转和状态传递。
3. 必须实现内联 TaskTimeline 折叠/展开和事件详情交互。
4. 必须实现 Datasets 的 Grid/List 双视图与文件夹层级浏览。

### 12.2 禁止事项
1. 禁止退化为单聊天页面。
2. 禁止只做静态展示无状态联动。
3. 禁止引入与阶段 1 冲突的重型依赖或多可视化引擎并行。

### 12.3 建议实现栈
1. `React + Vite + TypeScript + Tailwind`
2. 路由：`react-router`
3. 图表：Plotly 容器组件（可先 mock 数据）
4. 状态：可用 Context 或轻量状态库（任选一种，保持简单）

## 13. 验收清单（Prototype Definition of Done）
1. 阶段 1 必选路由可访问（`/`、`/workspace/:sessionId`、`/datasets`、`/datasets/:datasetId`、`/runs/:runId`、`/settings`、`/404`）。
2. Home -> Workspace -> Run 的主路径可跑通。
3. Datasets（文件夹/文件） -> Dataset Detail（简版 EDA） -> Workspace 的路径可跑通。
4. 内联 TaskTimeline 状态展示与详情展开可用。
5. 流式消息占位、加载、失败、重试状态完整。
6. 移动端和桌面端均可用，无页面级横向滚动。

## 14. 可直接复制给 AI 的 Master Prompt
将以下内容直接作为前端生成任务输入：

```markdown
Build a production-style multi-page web prototype for "数源智能" (Datai), an AI spreadsheet analysis product. Use "数源智能" as the product display name in the UI (e.g. logo area, hero, footer).

DESIGN SYSTEM (REQUIRED):
- Theme: professional analytics workspace, light mode first
- Colors: bg #f4f6fb, surface #ffffff, border #dbe3ee, text #0b1220, secondary #4a5b73, brand #0f766e, success #15803d, error #b91c1c
- Typography: Noto Sans SC + Space Grotesk + JetBrains Mono
- Radius: 10-12px, subtle shadows, motion 150-240ms
- Add spacing/font-size/line-height/focus-ring/z-index tokens

ROUTES (REQUIRED):
1. /
2. /workspace/:sessionId
3. /datasets
4. /datasets/:datasetId
5. /runs/:runId
6. /settings
7. /404

ROUTES (MOCK ONLY, NOT IN MAIN NAV):
1. /reports
2. /reports/:reportId

CORE PRODUCT INTERACTIONS:
- Upload spreadsheet and ask analysis questions in workspace
- Stream assistant response
- Show an inline collapsible task timeline card inside chat flow (not a fixed right sidebar)
- Event timeline with phases: read, understand, clean, analyze, visualize, report
- Navigate from charts to run details

DATASETS PAGE (REQUIRED):
- Google-Drive-like content area with folders + files
- Grid view with large file/folder cards
- List view columns: file name, owner, modified date, size
- Breadcrumb folder navigation

DATA CONTRACT:
- Use real API contracts for datasets and runs
- Reports APIs are mock-only in this phase
- Use local state for Session, DatasetItem, Dataset, Run, TaskEvent
- TaskEvent shape:
  { id, phase, action, status, started_at, ended_at, detail_ref, payload }

QUALITY BAR:
- Do not generate a single-page chat only
- Implement cross-page navigation and state continuity
- Include loading/error/retry states
- Responsive layout for desktop/tablet/mobile
- Accessibility: keyboard-friendly and aria-live for streaming/status updates
```

## 15. 关联文档
1. 产品边界：`docs/prd.md`
2. 需求细则：`docs/requirements.md`
3. 后端事件与架构：`docs/architecture.md`
4. 技术选型：`docs/tech_stack.md`
