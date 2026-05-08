# 前端开发规范

> 本 Kooboo CLI 静态站点的项目专用前端约定。

---

## 概览

本项目是一个 Kooboo CLI 站点。前端源码位于 `src/`，并直接映射到 Kooboo 的概念：

- `src/layout/` 存放共享页面外壳。
- `src/page/` 存放通过 Kooboo URL 注释声明的路由入口。
- `src/view/` 存放由 `<view id="...">` 渲染的可复用 HTML 片段。
- `src/css/` 存放全局站点样式。
- `src/js/` 存放全局 JavaScript。
- `images/` 存放 HTML 或 CSS 引用的图片与图标资源；Kooboo CLI 当前将图片同步目录映射到仓库根目录的 `images/`，不是 `src/images/`。

当前站点包含共享的 `main` 布局、共享 header/footer 视图、`/` 首页，以及 hero/prompt-generator 区块。在功能明确需要更多 JavaScript 之前，继续遵循现有的静态 HTML/CSS 优先方式。Kooboo 运行环境提供 Tailwind 支持，`src/layout/main.html` 不加载 Tailwind CDN；普通布局、间距、字体、颜色、尺寸和标准响应式状态优先写为 Tailwind utilities，复杂渐变背景、较长 CSS、伪元素 mockup、强复用样式、非标准断点或 Tailwind 表达会明显变长/不清晰的样式保留在 `src/css/site.css`。

Kooboo 模板绑定是服务端渲染能力，使用 `env="server"` 和 `k-*` 指令。应将这些指令视为 Kooboo 模板语法，而不是浏览器 JavaScript、客户端框架，也不是语义化 HTML 的替代品。

## 开发前检查清单

修改前端代码前，先阅读：

- [目录结构](./directory-structure.md)
- [组件规范](./component-guidelines.md)
- [质量规范](./quality-guidelines.md)

涉及以下内容时，还需要阅读：

- 添加 `env="server"` 或任何 `k-*` 绑定指令前，阅读 [模板绑定](./template-binding.md)。
- 添加交互状态前，阅读 [状态管理](./state-management.md)。
- 添加或修改 TypeScript 前，阅读 [类型安全](./type-safety.md)。
- 只有在后续引入带 hooks 的框架时，才阅读 [Hook 规范](./hook-guidelines.md)。

---

## 规范索引

| 规范 | 说明 | 状态 |
|-------|-------------|--------|
| [目录结构](./directory-structure.md) | Kooboo CLI 目录映射和文件布局 | 已填充 |
| [组件规范](./component-guidelines.md) | Kooboo view 组合、样式、可访问性 | 已填充 |
| [模板绑定](./template-binding.md) | 服务端 `env="server"` 与 `k-*` 指令边界 | 已填充 |
| [Hook 规范](./hook-guidelines.md) | 当前无 hook 基线与未来框架规则 | 已填充 |
| [状态管理](./state-management.md) | 静态站点状态边界与升级规则 | 已填充 |
| [质量规范](./quality-guidelines.md) | 代码标准、禁用模式、review 清单 | 已填充 |
| [类型安全](./type-safety.md) | 当前 JavaScript 基线与未来 TypeScript 规则 | 已填充 |

---

## 工作原则

记录并遵循当前站点的真实形态，而不是假想的框架迁移。如果后续任务引入新的前端框架、bundler、API client 或状态层，必须在同一个任务中同步更新这些规范。

---

**语言**：为保证用户 review 准确性，项目规范文档应使用**简体中文**编写；代码、路径、命令、框架术语和 Kooboo/Figma 语法保持原文。
