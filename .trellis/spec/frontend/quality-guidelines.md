# 质量规范

> 本 Kooboo CLI 前端的代码质量标准。

---

## 概览

当前质量基线是以仓库真实形态为准的静态 HTML/CSS 工作。应保留 Kooboo CLI 结构，保持站点响应式，并避免在真正需要之前添加框架复杂度。

---

## 禁用模式

- 不要将 Kooboo 映射文件移出当前 CLI 同步目录：`src/layout`、`src/page`、`src/view`、`src/css`、`src/js` 或根目录 `images`。
- 不要用纯框架组合替代 Kooboo 的 `<layout>`、`<placeholder>` 或 `<view>` 组合。
- 不要在路由文件中复制共享 layout/header/footer 标记。
- 不要为普通展示添加 inline style。
- 不要使用 Kooboo `k-*` 指令表达仅浏览器端存在的交互状态。
- 当祖先元素已经控制服务端模板作用域时，不要在每个子元素上重复 `env="server"`。
- 语义化 HTML 或 CSS 能处理的行为，不要额外添加 JavaScript。
- 未在同一任务中更新 spec 和 package scripts 前，不要引入 React、Vue、CSS modules 或 bundler。Tailwind CSS 通过共享 layout 中的 CDN runtime 支持；不要为了使用 utilities 额外添加 package dependency 或 build step，除非任务明确要求。
- 不要使用负 letter spacing，也不要使用按 viewport width 缩放的字体大小。
- 不要为组件样式创建宽泛、匿名的全局选择器，例如 `.title`、`.item`、`.text` 或 `.content`。
- 不要为只用一次的普通布局、间距、字体、颜色、边框或圆角新增 CSS class；优先使用 Tailwind utilities。
- 不要把复杂渐变、伪元素 mockup 或强复用样式强行改成很长且难读的 Tailwind class。
- 当现有相对资源引用约定可用时，不要使用脆弱的上级目录路径引用资源。

---

## 必须遵循的模式

- 保持 `src/page/*.html` 文件轻量：路由声明、layout 选择、placeholder 内容和 view 组合。
- 共享外壳行为保留在 `src/layout/main.html`。
- `<layout id="...">`、`<placeholder id="...">` 和 `<view id="...">` 引用必须与对应 layout placeholder 或文件名完全匹配。
- 只有需要服务端渲染数据时，才添加 Kooboo 服务端模板绑定，并保持绑定表达式简单。
- 使用语义化 HTML landmark 和控件。
- 普通展示样式优先使用 Tailwind utilities；保留在 `site.css` 中的原生 CSS 必须使用 BEM-like、带 block 前缀的 class 名称。
- 对共享颜色、尺寸和渐变复用 `:root` token。
- 固定格式 UI 元素需要通过稳定尺寸、`min()`/`max()` 约束、flex/grid 换行或 media query 实现响应式。
- 视觉变更后检查桌面和移动端行为。
- 图片和图标保留在根目录 `images/`；有用时将分组导出放在 `images/icons/`。
- 修改导航、按钮、图片、label 或表单控件时，保留或更新可访问性属性。

---

## 验证要求

静态标记/CSS 变更：

- 直接检查变更后的 HTML/CSS。
- 验证 Kooboo ID 与文件名匹配：layout ID、placeholder ID 和 view ID。
- 当服务端模板绑定发生变化时，验证 `env="server"` 作用域以及 `k-content`/`k-if`/`k-for`/`k-attribute` 用法。
- 只有当任务需要 live-site 验证时，才运行或依赖 Kooboo CLI sync 命令。当前 dev 命令是 `pnpm dev`。
- 面向用户的视觉变更至少检查一个桌面宽度和一个移动端宽度。

JavaScript 变更：

- 保持渐进增强：即使 JavaScript 失败，页面仍应渲染有意义的内容。
- 条件允许时，在浏览器或本地 Kooboo preview 中测试变更后的交互。

依赖或 build-script 变更：

- 同步更新 `package.json`、文档和本 spec。
- 运行相关 install/build/type-check 命令。

---

## Code Review 清单

- 每个路由页面是否声明了预期的 `@k-url`，并使用正确的 layout？
- 所有 `<view id="...">` 引用是否都能解析到 `src/view/` 下的文件？
- 所有 page 的 `<placeholder id="...">` 是否都与某个 layout `k-placeholder` 完全一致？
- 如果添加了 `k-*` 指令，它们是否是服务端模板绑定，而不是客户端状态？
- Layout 是否仍然只加载一次 Tailwind runtime、`./site.css` 和 `./site.js`？
- 共享 header/footer 变更是否在各自 view 中完成，而不是复制到 page 里？
- 普通样式是否优先使用 Tailwind utilities，而不是新增一次性 CSS class？
- 保留在 `site.css` 中的 CSS class 名称是否按组件 block 作用域命名？
- 是否只把复杂、复用或 Tailwind 表达不清晰的样式留在 `site.css`？
- 复用值作为项目级 token 时，是否用 CSS 变量表示？
- 变更在桌面和移动端宽度下是否适配，且没有文字或控件重叠？
- 图片是否可访问：装饰性图片隐藏，信息性图片命名？
- JavaScript 是否最小化、有作用域且有韧性？
- 如果任务引入了新约定，是否已更新 `.trellis/spec/frontend/`？
