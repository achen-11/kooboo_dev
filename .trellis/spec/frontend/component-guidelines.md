# 组件规范

> 本项目中 Kooboo view 与静态 HTML 组件的构建方式。

---

## 概览

当前站点不使用 React、Vue 或组件运行时。这里的“组件”指一个 Kooboo `view` HTML 片段，加上 Tailwind utilities、必要的全局 CSS class，以及必要时放在 `site.js` 中的可选行为。

页面应通过 Kooboo 的 `<view id="...">` 语法组合小而有名的 view。

---

## 组件结构

新增区块 view 使用以下结构：

```html
<section class="feature-section" data-figma-node="optional-node-id">
    <div class="site-container">
        <!-- content -->
    </div>
</section>
```

较小的嵌入式 view 使用以下结构：

```html
<div class="prompt-generator" data-figma-node="275:7085">
    <!-- content -->
</div>
```

规范：

- 优先使用语义化 HTML：在合适位置使用 `header`、`nav`、`main`、`section`、`footer`、`button`、`a`、`label` 和表单控件。
- 页面级组合保留在 `src/page/*.html`。
- 区块标记保留在 `src/view/*.html`。
- 共享外壳标记保留在 `src/layout/*.html`。
- 当标记可以追溯到某个设计节点时，保留 `data-figma-node`；这有助于后续设计 review。

---

## 组合约定

- Kooboo view ID 必须与去掉 `.html` 后缀的 view 文件名一致。
- 使用 `<view id="prompt-generator"></view>` 进行嵌套 view 组合。
- 在 page 文件中使用 `<placeholder id="Main">...</placeholder>` 填充 layout placeholder。
- Placeholder ID 必须与 layout 的 `k-placeholder` 值完全一致。当前共享 layout 暴露的是 `Main`。
- 不要在 page 中复制共享 header 或 footer 标记；应由 layout 组合 `site-header` 和 `site-footer`。

---

## 服务端模板绑定

Kooboo 模板绑定只用于服务端渲染的动态内容。

允许的 Kooboo 绑定模式：

- 当子元素使用 `k-*` 指令时，在最近且有意义的祖先元素上添加 `env="server"`。
- 使用 `k-content="expression"` 绑定文本内容。
- 使用 `k-if="expression"` 进行服务端条件渲染。
- 使用 `k-for="item in list"` 渲染服务端重复标记。
- 使用 `k-attribute="attribute expression"` 或分号分隔的绑定处理动态属性。
- 只有当附近模板绑定需要服务端 module import/export 时，才使用 `<script type="module" env="server">`。

边界：

- `env="server"` 会被后代继承。当祖先元素已经声明时，不要在每个子元素上重复声明。
- 模板表达式必须保持可读。复杂计算先移动到附近的服务端脚本中，再绑定命名变量。
- 不要用 `k-content`、`k-if`、`k-for` 或 `k-attribute` 表达客户端交互状态。需要浏览器交互时，在 `src/js/site.js` 中使用渐进增强 JavaScript。
- 不要把服务端渲染的动态属性和普通展示用的 inline visual styling 混在一起。优先使用 CSS class 和 token。

---

## 样式模式

当前站点通过共享 layout 中的 Tailwind CDN runtime 支持 Tailwind CSS，同时保留 `src/css/site.css` 作为全局 token 和复杂样式入口。样式选择需要平衡可读性和复用性，而不是强制所有样式都写成 Tailwind。

必须遵循的模式：

- 在 `:root` 中定义可复用 token，例如 `--color-title`、`--color-body`、`--container-width` 和 `--gradient-brand`。
- 普通布局、间距、排版、颜色、边框、圆角、尺寸、hover/focus 和简单响应式状态优先使用 Tailwind utilities。
- 当样式非常多、很常复用、包含复杂渐变/背景/伪元素，或 Tailwind class 会变得很长且不清晰时，使用 `site.css` 中的原生 CSS。
- 原生 CSS 使用带稳定 block 名称的 BEM-like class：

```css
.home-hero__stage {}
.prompt-generator {}
.publish-website-card {}
```

- 标准限宽内容使用 `.site-container`。
- 尽量按 block 分组组件样式：header 样式放一起，footer 样式放一起，hero 样式放一起。
- 复杂或与原生 CSS 强绑定的响应式行为通过 media query 添加，并尽量放在 `site.css` 靠近底部的位置。
- 若响应式只是简单的断点切换，优先使用 Tailwind responsive utilities；只有复杂布局或与原生 CSS mockup 强相关时才使用 media query。

禁止的模式：

- 不要为了普通布局或视觉样式添加 inline `style` 属性。
- 不要创建 `.title`、`.content`、`.button2` 这类页面专用但过于泛化的全局 class。
- 不要为了只用一次的普通样式新增 CSS class；这类样式应优先写成 Tailwind utilities。
- 不要为了“全 Tailwind”而把复杂渐变背景、长伪元素图形或强复用样式硬塞进不可读的 class 字符串。

---

## 可访问性

- 导航区域必须有有意义的标签，例如 `aria-label="Primary navigation"` 和 `aria-label="Footer navigation"`。
- 纯图标或装饰性图片必须使用 `alt=""` 和 `aria-hidden="true"`。
- 信息性图片必须有有意义的 `alt` 文本。
- 输入控件必须有 label。如果视觉设计隐藏 label，使用现有 `.sr-only` 工具类。
- 操作使用真实的 `<button type="button">` 元素，导航使用 `<a href="...">`。
- 可聚焦控件尺寸应足够触摸操作；除非提供替代方案，否则不要移除浏览器默认 focus 行为。

---

## 常见错误

- 在 `src/page/*.html` 中直接放完整区块标记，而不是创建 view。
- 在现有 `main` layout 和 `Main` placeholder 足够时仍创建新 layout。
- 在 page 中复制 header/footer，而不是使用共享 layout。
- 引用的 view ID 与 `src/view/` 中的文件不匹配。
- Layout 暴露的是 `k-placeholder="Main"`，却填充 `<placeholder id="main">`。
- 在每个绑定后代元素上重复 `env="server"`，而不是在父元素上声明一次。
- 将 `k-*` 指令当成浏览器运行时状态，而不是服务端渲染语法。
- 添加纯视觉图片时没有使用 `alt=""` 和 `aria-hidden="true"`。
