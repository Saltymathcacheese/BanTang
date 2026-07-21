# 🚀 项目规范与 GitHub Pages 部署守则 (Project Guidelines)

本项目（半糖主义）部署在 GitHub Pages（二级子路径环境），任何代码修改和配置必须严格遵守以下 5 大规则：

---

### 1. 静态资源与路径绝对规范 (Base Path)
- **拒绝硬编码根路径**：绝对禁止在 HTML、CSS 或 JS/TS 中使用 `/assets/xxx` 或 `/image.png` 这类以 `/` 开头的绝对路径。
- **Vite 相对路径**：`vite.config.ts` 中的 `base` 属性必须设置为 `./` 或 `process.env.NODE_ENV === 'production' ? '/<你的仓库名>/' : '/'`。
- **代码中引用资源**：引入 `public` 文件夹下的图片或静态文件时，必须使用 `import.meta.env.BASE_URL` 进行拼接。

---

### 2. 路由策略 (Routing Strategy)
- **必须使用 Hash 路由**：为防止用户在 GitHub Pages 上刷新子页面出现 404 错误，`React Router` / `Vue Router` 必须使用 `createHashRouter` 或 `HashRouter`（形式为 `/#/stats`），禁止使用 `BrowserRouter`。

---

### 3. AI 抠图 WASM 资源配置 (WASM & Worker Paths)
- **资源路径动态获取**：`@imgly/background-removal` 等 WASM / ONNX 模型的 `publicPath` 必须动态指向 `import.meta.env.BASE_URL + 'assets/'`，确保打包后能正确加载 `.wasm` 文件。
- **WASM 优雅降级**：因 GitHub Pages 不支持 COOP/COEP Header，若 WASM 加载失败或跨域受阻，必须捕获异常（`try-catch`）并降级为 Canvas 拍立得相框（Square Crop + White Border），绝不能阻塞 UI 或抛出未捕获错误。

---

### 4. 构建与部署闭环 (Build Check)
- 在执行构建（`npm run build`）前，确保没有未使用的变量或 TypeScript 类型错误。
- 部署脚本输出目录统一为 `dist` 文件夹，且自动在 `dist` 根目录下生成一个空文件 `.nojekyll`（防止 GitHub Pages 的 Jekyll 引擎误删 `_` 开头的文件夹）。

---

### 5. 跨端环境兼容 (PWA / Web / Mobile)
- 涉及相机/文件上传逻辑时，必须先判断环境：
  - 原生环境（`Capacitor.isNativePlatform()`）：调用原生 Camera API。
  - Web 环境：触发隐藏的 `<input type="file">` 选择器。