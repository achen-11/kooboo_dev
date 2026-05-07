# 类型安全

> 本 Kooboo CLI 前端的类型安全期望。

---

## 概览

当前 package 将 TypeScript 作为开发依赖，但站点代码目前由 HTML、CSS、SVG 资源和普通浏览器 JavaScript 组成。尚不存在活跃的 TypeScript 应用层。

---

## 类型组织

当前没有项目专用前端类型。

如果为前端行为引入 TypeScript：

- 将源码文件放在 `src/` 下一个已明确记录的目录中。
- 共享 DTO/request/response 类型应靠近使用它们的 API wrapper。
- 避免创建宽泛的 `types.ts` 堆放所有类型。
- 在同一任务中更新 `tsconfig.json`、package scripts 和本 spec。

---

## 验证

当前没有安装运行时验证库。

如果 JavaScript 处理用户输入或 API 数据：

- 在数据进入功能边界的位置验证必填字段。
- 对简单静态站点交互，优先使用小而明确的检查。
- 只有重复 schema validation 足以证明依赖必要时，才引入验证库。

---

## 常见模式

当前普通 JavaScript：

- 访问元素前，使用清晰的 DOM query 和 null check。
- Selector 应绑定到稳定 class 或 data attribute。
- 行为应足够小，在没有 build step 的情况下也能 review。

Kooboo 服务端模板脚本：

- 导出值或共享值应在消费它们的模板附近显式命名。
- 动态对象和列表应足够简单，使字段在绑定位置一眼可见。
- 在 `k-*` 绑定中使用 service-backed module 返回字段前，先记录 module import。

未来 TypeScript：

- 用明确的 interface 或 type alias 建模外部数据。
- 在 API 边界使用 type guard 或 schema validation。
- DOM element narrowing 应保持局部且明显。

生成式声明文件：

- 仓库根部的 `kooboo.d.ts` 会参与 TypeScript 解析；如果修正声明语法，只做最小语法兼容调整，不要重写生成内容的结构。
- 当 interface 需要继承数组类型时，使用 `extends Array<T>`，不要使用 `extends T[]` 或 `extends string[]`。后者在 interface extends 子句中不是合法语法，会在业务源码检查前阻断 `tsc`。

---

## 禁用模式

- 在没有记录 build 或 sync 路径前，不要添加 TypeScript-only 源文件。
- 不要对 API response 或用户输入 payload 使用 `any`。
- 不要对可能不存在的 DOM 元素依赖未检查的 type assertion。
- 未记录为什么简单检查不足前，不要添加验证依赖。
- 不要为了通过当前检查而批量重排或格式化 `kooboo.d.ts`；它是生成式声明面，非任务相关的大面积改动会淹没真正的前端变更。
