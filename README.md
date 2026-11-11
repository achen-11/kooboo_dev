# Kooboo-CLI

## 使用

### 初始化

```bash
cd 项目目录

# pnpm
pnpm install

pnpm dev:init # 将本地代码初始化推送到远端

# npm
npm install
npm run dev:init # 将本地代码初始化推送到远端
```

### 开发

该命令会运行监听脚本, 即本地代码发生变化时, 会自动同步到远端

```bash
# pnpm
pnpm dev

# npm
npm run dev
```

### 拉取与类型声明脱敏

拉取远程站点后，自动将 `kooboo.d.ts` 注释示例中的 AWS Access Key ID 和 Secret Access Key 替换为占位符：

```bash
npm run pull

# 仅拉取类型声明并脱敏
npm run pull:types
```

如果已经手动执行了 `kb pull`，在暂存文件前运行：

```bash
npm run sanitize:types
```

清理命令可重复执行，只修改本地类型声明中的示例值。远程生成源仍包含这些值，直接执行 `kb pull` 后需要再次清理。

## 项目结构

```bash
.
├── package.json
├── pnpm-lock.yaml
├── scripts
│   └── dev.js (同步脚本)
├── src
│   ├── Api (对应Kooboo的Api目录)
│   │   └── __logout.ts
│   ├── CodeBlock (对应Kooboo的CodeBlock目录)
│   ├── Layout (对应Kooboo的Layout目录)
│   ├── Page (对应Kooboo的Page目录)
│   ├── Script (对应Kooboo的Script目录)
│   ├── Style (对应Kooboo的Style目录)
│   └── View (对应Kooboo的View目录)
└── tsconfig.json
```
