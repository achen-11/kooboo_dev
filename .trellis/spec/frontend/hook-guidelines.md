# Hook 规范

> 本项目的 hook 使用策略。

---

## 概览

当前站点不使用 React、Vue Composition API 或任何前端 hook 系统。当前有效的前端模型是 Kooboo 静态 HTML views、全局 CSS，以及少量浏览器 JavaScript。

---

## 自定义 Hook 模式

当前架构中不允许自定义 hooks，因为项目没有 hook runtime。

如果后续任务引入带 hooks 的框架：

- 在同一任务中更新 `package.json`、build/dev scripts 和这些 specs。
- 在添加功能代码前，先定义框架组件和 hooks 的存放位置。
- 继续记录 Kooboo route/layout/view 契约，确保服务端组合关系清晰。

---

## 数据获取

当前没有前端 data-fetching 层。

如果添加数据获取：

- 除非已经引入框架，否则优先在 `src/js/` 中使用小而明确的浏览器 API wrapper。
- 实现前，在相关 spec 中记录 request/response 契约。
- UI 中应保留可见的 loading、empty 和 error 状态。

---

## 命名约定

当前不适用 `use*` hook 命名约定。

如果后续引入 hooks，`useSomething` 只用于真正的框架 hook。不要给普通 helper function 使用 `use` 前缀。

---

## 常见错误

- 在项目拥有 framework runtime 前添加框架风格 hook 文件。
- 不记录 request 和 response 字段，而把 data-fetching 契约藏在组件逻辑中。
- 给普通 DOM utility 使用 `use*` 名称。
