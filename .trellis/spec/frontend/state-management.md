# 状态管理

> 本 Kooboo CLI 前端的状态管理方式。

---

## 概览

当前站点主要是静态内容。没有全局状态库、server-state cache、router state library，也没有框架组件状态。

默认使用语义化 HTML 和 CSS。只有当用户交互无法用标记和 CSS 清晰表达时，才添加 JavaScript 状态。

---

## 状态分类

### 静态内容

静态内容属于 Kooboo page/view HTML 文件。

### 服务端渲染模板状态

在 `env="server"` 脚本中声明，并通过 `k-content`、`k-if`、`k-for` 或 `k-attribute` 消费的值，是服务端渲染模板数据。它们不是浏览器状态，不应用来建模客户端交互。

### UI 状态

小型 UI 状态，例如选中的 prompt mode 或展开的菜单，可以作为 DOM 状态或 class 放在 `src/js/site.js`。

### URL 状态

路由所有权属于 `src/page/` 下通过 `@k-url` 注释声明的 Kooboo page 文件。不要为普通页面实现客户端 routing。

### 服务端状态

当前还没有 server-state 模式。如果某个功能调用 API，先记录 API 契约和 loading/error 行为，再实现。

---

## 何时使用全局状态

不要为当前静态站点添加全局状态。

只有同时满足以下条件时，才考虑共享状态抽象：

- 多个独立 view 需要同一份可变数据。
- 该数据无法通过 URL、标记或本地 DOM 状态表示。
- 该任务同时为选定方案更新 specs、scripts 和验证步骤。

---

## 服务端状态

如果引入服务端数据：

- 先在 spec 中定义请求字段、响应字段、错误状态和重试行为。
- 请求失败时，渲染仍应保持有韧性。
- 避免静默失败；UI 应暴露有用的 empty 或 error 状态。
- 除非重复 API 使用足以证明需要，否则不要添加 cache library。

---

## 常见错误

- 为单个组件的局部状态引入全局 store。
- 用客户端 route state 替代 Kooboo page routing。
- 将 Kooboo 服务端渲染的 `k-*` 绑定当成客户端状态。
- 添加 API 状态时没有可见的 loading、empty 和 error 行为。
- CSS 能表达的纯设计状态却存到 JavaScript 中。
