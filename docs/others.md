桌面客户端数据分析 AI Agent
先用 Vite + React + Tailwind 写前端，后端用 python 和 FastAPI。算法策略参考claude code和manus的设计。最后再用 Electron-Vite 这个脚手架把它们套进去
Python 集成： 同样使用 Sidecar（侧边进程） 模式挂载 Python 编译后的二进制文件。
使用 Nuitka 将 python 代码编译打包，提升反编译难度
“动态端口 + 握手校验”防止后端端口被占用导致无法连接
* 绑定 127.0.0.1：绝对不要绑定到 0.0.0.0，确保后端只接受来自本机的请求。
* 动态端口：Python 找空闲端口 -> 打印输出 -> Electron 捕获输出。
* Token 验证：启动时生成随机密钥，所有 API 请求必须带上 Header。
* 生命周期绑定：在 Electron 退出时，强制杀死 Python 进程，防止残留“僵尸进程”占用资源。
* Artifacts (Claude)：学习其代码与预览并排的交互。
* Deepnote / Hex：学习其协作式数据科学的 UI 设计。
编辑器与交互
* Monaco Editor：实现代码高亮、补全。
* Notebook 架构：不要做纯文本编辑器，要做 Cell-based（基于单元格） 的交互，类似 Jupyter。用户更习惯这种“实验”感。
我要做数据分析 AI Agent，准备使用python作为后端，应该如何配置AI生成的代码运行环境？使用sandbox沙箱进行隔离，还是使用docker镜像，还是使用miniforge等直接管理python环境？因为数据分析的python包通常比较多而且大，不可能每次都重新安装包。我想的是有个基础环境，用户下载这个Agent的时候就会自动下载这个基础环境。如果有额外的需求，基于这个环境再追加。但是如果需要的依赖的基础环境冲突好像不知道怎么处理。

这个文档最终是给AI coding agent使用的。所以在最开始最重要的是让AI agent自动去网络上收集各种相关的skills工具和提示词用于提升开发后续各个模块的效果。

这个任务中最重要的是下面两点：
1. 后端的数据分析AI Agent的算法可以参考类似claude code及其他Agent。
2. 前端图片渲染展示的效果。



对上面内容分析。考虑下面因素。
1. 后续可能会做成桌面客户端。可能使用electron作为前端开发
2. 使用python作为后端是否合理？

给出做数据分析AI Agent的技术栈和建议。
包括：
1. 展现形式是网页版、桌面版还是终端工具
2. 前后端应该使用什么语言
3. AI生成的代码在哪里运行？
4. 如何管理数据分析环境冷启动慢、包体积大、下载包时间长、依赖冲突等问题

# 未来方向
加入 A2UI 的生成式界面

# 待选技术栈
产品技术栈
LiteLLM大模型适配器
LanceDB 嵌入式向量数据库
DuckDB 嵌入式列式存储数据库
先做产品，之后再考虑鉴权的事
服务技术栈
sqlite，postgresql或者supabase作为后端数据库，存储用户信息
