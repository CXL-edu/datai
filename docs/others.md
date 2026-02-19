# Other Notes（已整理）

更新时间：2026-02-19

本文件用于保留探索过程中的备忘，不作为当前实现规范。  
当前实现规范以 `docs/decision.md` 为准。

## 已落地为正式决策
- 前端：`Vite + React + TypeScript + Tailwind CSS`
- 后端：`Python + FastAPI`
- 交互：流式 Chat + 可展开任务状态面板
- 形态：先 Web，暂不桌面化
- 端口：固定 `127.0.0.1:8000`
- 运行环境：`uv` 主方案，`micromamba` 仅兜底
- 数据层：`DuckDB + SQLite`
- RAG：阶段 1 不启用，仅预留目录和接口

## 暂缓项（未来方向）
- Electron/Tauri 桌面化封装
- 动态端口与握手校验
- 细粒度鉴权体系
- Python 二进制打包与防逆向（如 Nuitka）
- A2UI 生成式界面
- 完整向量检索与大规模 RAG

## 说明
- 早期关于 Notebook Cell、动态端口、桌面优先等内容，已在评审后后置。
- 详细裁决过程见 `docs/decision.md`。
