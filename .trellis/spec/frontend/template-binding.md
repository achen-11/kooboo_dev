# 模板绑定

> 本前端使用的 Kooboo 服务端模板语法。

---

## 概览

Kooboo 模板绑定使用 `env="server"` 和 `k-*` 指令。这些绑定在 Kooboo 渲染页面时于服务端运行，因此它们与 `src/js/site.js` 中的浏览器 JavaScript 是分离的。

当前站点主要是静态内容。优先使用静态 HTML；只有当某个 page 或 view 需要服务端渲染变量、条件、循环或动态属性时，才添加模板绑定。

---

## 服务端渲染模式

在最近且有意义的父元素上，或在服务端脚本上使用 `env="server"`：

```html
<div env="server">
    <script>
        var title = "Welcome";
    </script>
    <h1 k-content="title"></h1>
</div>
```

规则：

- `env="server"` 会被后代元素继承。
- 当父元素已经声明时，不要在每个子元素上重复 `env="server"`。
- 当页面级变量必须被后续服务端绑定元素共享时，使用独立的 `<script env="server">`。

---

## 绑定指令

服务端渲染数据使用以下指令：

- `k-content="expression"` 绑定文本内容。
- `k-if="expression"` 按条件渲染元素。
- `k-for="item in list"` 为列表中的每一项重复渲染元素。
- `k-attribute="name expression"` 绑定属性。
- `k-attribute="src {imageUrl}; alt 'logo'"` 可以绑定多个属性。

示例：

```html
<div env="server">
    <script>
        var list = [{ label: "Build" }, { label: "Ship" }];
        var isActive = true;
        var linkHref = "/about";
    </script>
    <a k-attribute="href linkHref; class {active: isActive}">
        <span k-content="list[0].label"></span>
    </a>
    <div k-for="item in list" k-content="item.label"></div>
</div>
```

表达式应保持简单。如果某个绑定变得难以阅读，先在附近的服务端脚本中计算该值，再绑定命名变量。

---

## 服务端 Module

只有当渲染模板需要服务端 import 或导出值时，才使用 `<script type="module" env="server">`：

```html
<script type="module" env="server">
    import { getBlogDetail } from "./Services.Blog";
    const blogDetail = getBlogDetail();
    export { blogDetail };
</script>
<div env="server">
    <h1 k-content="blogDetail.title"></h1>
</div>
```

对于 module 支撑的渲染，module 脚本会向附近的服务端模板绑定提供导出的值。消费这些值的标记仍应处于 `env="server"` 作用域中；绑定标记应靠近 module 脚本，并在任务或相关规范中记录 service import 路径、返回字段、加载假设和 fallback 行为。

---

## 边界

- 不要使用 Kooboo `k-*` 指令表达浏览器交互状态。
- 不要为服务端拥有的页面路由添加客户端 routing。
- 不要使用动态 `style` 属性处理普通视觉样式；优先使用 `src/css/site.css` 中的 CSS class。
- 除非使用某个共享 layout 的所有页面都需要该数据，否则不要在共享 layout 中放宽泛的服务端脚本。
- 不要为了服务端模板绑定而引入前端框架。

---

## Review 检查

- `env="server"` 是否只在正确的祖先元素或脚本上声明一次，没有冗余的子元素声明？
- `k-*` 表达式是否足够简单，便于 review？
- 动态属性是否保留了 `alt`、`aria-*`、`href` 等可访问性相关属性？
- 每个服务端渲染列表是否都有稳定、语义化的标记？
- 浏览器专属行为是否仍然通过渐进增强 JavaScript 实现，而不是通过 `k-*` 绑定实现？
