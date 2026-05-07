# 目录结构

> 本 Kooboo CLI 站点前端文件的组织方式。

---

## 概览

本项目直接使用 Kooboo CLI 的目录映射。源码应保留在 `src/` 下 Kooboo 专用目录中；除非任务明确要求迁移，否则不要引入独立的应用框架目录结构。

---

## 目录布局

```text
src/
├── css/
│   └── site.css
├── js/
│   └── site.js
├── layout/
│   └── main.html
├── page/
│   └── home.html
└── view/
    ├── home-hero.html
    ├── prompt-generator.html
    ├── site-footer.html
    └── site-header.html
images/
├── *.svg
└── icons/
```

---

## 模块组织

### Layout

- 将可复用页面外壳放在 `src/layout/`。
- `src/layout/main.html` 是默认外壳。它加载 Tailwind CDN runtime 和 `./site.css`，渲染共享 header/footer 视图，暴露 `<div k-placeholder="Main"></div>`，并加载 `./site.js`。
- 只有当某个页面确实需要明显不同的外壳、脚本集合或 placeholder 结构时，才新增 layout。
- Layout placeholder 名称属于页面契约。页面中的 `<placeholder id="...">` 必须与 layout 的 `k-placeholder` 值完全一致，包括大小写。

### Page

- 将路由入口放在 `src/page/`。
- 页面路由必须以 Kooboo URL 注释开头，例如：

```html
<!-- @k-url / -->
<layout id="main">
    <placeholder id="Main">
        <view id="home-hero"></view>
    </placeholder>
</layout>
```

- 保持 page 文件轻量。Page 负责选择 layout 并组合 views；内容区块应放在 `src/view/`。
- 使用 `<layout id="main">` 选择 `src/layout/main.html`。新增 layout ID 必须与去掉 `.html` 后缀的 layout 文件名一致。
- 在 page 中使用 `<placeholder id="Main">...</placeholder>` 填充 layout 的 `<div k-placeholder="Main"></div>`。

### View

- 将可复用 HTML 片段放在 `src/view/`。
- 使用 `<view id="view-file-name-without-extension"></view>` 组合 view。
- 优先按有意义的区块或共享组件拆分 view。当前示例包括 `site-header`、`site-footer`、`home-hero` 和 `prompt-generator`。
- 当功能需要服务端数据时，view 可以包含普通静态标记、嵌套 `<view>` 组合，以及 Kooboo 服务端模板绑定。

### 模板绑定

- Kooboo 模板绑定在服务端运行。添加 `env="server"` 或 `k-*` 指令前，先阅读 [模板绑定](./template-binding.md)。
- 当前静态营销内容优先使用静态 HTML。只有当内容必须来自服务端变量、循环或条件渲染时，才添加模板绑定。
- 服务端脚本应尽量放在拥有该渲染数据的 page 或 view 内；只有当某个 layout 级数据确实被使用该 layout 的所有页面共享时，才放到 layout 层。

### CSS

- Tailwind runtime 只在共享 `main` layout 中加载一次，并位于 `./site.css` 之前。
- 将共享样式放在 `src/css/site.css`。
- 将项目级 token 保留在 `:root`。
- 普通布局、间距、字体、颜色、尺寸、边框、圆角和简单响应式状态优先使用 Tailwind utilities 写在 HTML class 中。
- `src/css/site.css` 主要保留全局 reset、项目 token、共享 container、可访问性工具类、复杂渐变/背景、伪元素、复杂图形 mockup，以及多处复用且 Tailwind 表达会很长或不清晰的样式。
- 保留原生 CSS 时，使用带区块/组件前缀的 class，让全局样式表仍然可读。

### JavaScript

- 将全局浏览器 JavaScript 放在 `src/js/site.js`。
- JavaScript 应保持渐进增强且尽量少。当前基线只向 `document.documentElement` 添加 `site-ready` class。

### 图片

- Kooboo CLI 当前将图片同步目录映射到仓库根目录的 `images/`，不要放到 `src/images/`。
- 将区块直接引用的资源放在 `images/`。
- 将原始图标导出或分组图标资源放在 `images/icons/`。
- `images/icons/` 中的图标文件使用语义化小写 kebab-case 英文名，例如 `icon-landing-page.svg`；不要保留设计工具导出的临时编号、中文名或未说明用途的文件名。
- Logo、图标和矢量背景优先使用 SVG。
- 在 HTML/CSS 中引用资源时，沿用站点已有的相对路径风格，例如 `./kooboo-logo.svg` 和 `url("./home-hero-background.svg")`。
- View 内引用 `images/icons/` 图标时使用 `./icons/<file>.svg`，不要引用 `src/images/`。

---

## 命名约定

- layout、page、view、CSS 和 JavaScript 文件名使用小写 kebab-case。
- Kooboo view ID 必须与去掉扩展名后的文件名一致：`src/view/site-header.html` 渲染为 `<view id="site-header"></view>`。
- Page 文件名应能表达路由含义，例如 `home.html`、`pricing.html`、`docs.html`。
- 原生 CSS class 使用带稳定 block 前缀的 BEM-like 命名：`.home-hero__stage`、`.prompt-generator`、`.publish-website-card__domain`。
- Tailwind utilities 可以直接写在 HTML class 中；不要为了普通布局/间距/字体/颜色再创建只用一次的 BEM class。
- 共享颜色、尺寸和渐变优先使用 CSS custom properties，不要反复写字面量。

---

## 示例

- `src/page/home.html` 展示 route/layout/placeholder 模式。
- `src/layout/main.html` 展示共享外壳契约。
- `src/view/home-hero.html` 展示区块 view 如何组合更小的 view。
- `src/css/site.css` 展示当前 token、共享工具类、复杂背景、BEM-like class 和必要的响应式 media query 风格。
