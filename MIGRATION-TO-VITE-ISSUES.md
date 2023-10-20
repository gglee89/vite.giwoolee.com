### [vite] Internal server error: URI malformed

**First investigation link:**
https://github.com/vitejs/vite/issues/6482

```
When migrating from CRA to vite, I hadn't updated the %PUBLIC_URL%/favicon.ico to be /favicon.ico in the index.html file. Removing %PUBLIC_URL% fixed it for me. Seems related but not the same as #6300.
```

**Solution:**
Removing %PUBLIC_URL% fixed the issue

### [vite] Internal server error: Failed to resolve import "pages/Home" from "src/App.tsx". Does the file exist?

```
Plugin: vite:import-analysis
  File: /Users/giwoolee/Documents/code/vite.giwoolee.com/src/App.tsx:9:17
  14 |  // Router
  15 |  import { Routes, Route } from 'react-router-dom';
  16 |  import Home from 'pages/Home';
     |                    ^
  17 |  const App = ()=>{
  18 |      return /*#__PURE__*/ _jsxDEV(Routes, {
      at formatError (file:///Users/giwoolee/Documents/code/vite.giwoolee.com/node_modules/vite/dist/node/chunks/dep-bb8a8339.js:44062:46)
      at TransformContext.error (file:///Users/giwoolee/Documents/code/vite.giwoolee.com/node_modules/vite/dist/node/chunks/dep-bb8a8339.js:44058:19)
      at normalizeUrl (file:///Users/giwoolee/Documents/code/vite.giwoolee.com/node_modules/vite/dist/node/chunks/dep-bb8a8339.js:41844:33)
      at async file:///Users/giwoolee/Documents/code/vite.giwoolee.com/node_modules/vite/dist/node/chunks/dep-bb8a8339.js:41998:47
      at async Promise.all (index 7)
      at async TransformContext.transform (file:///Users/giwoolee/Documents/code/vite.giwoolee.com/node_modules/vite/dist/node/chunks/dep-bb8a8339.js:41914:13)
      at async Object.transform (file:///Users/giwoolee/Documents/code/vite.giwoolee.com/node_modules/vite/dist/node/chunks/dep-bb8a8339.js:44352:30)
      at async loadAndTransform (file:///Users/giwoolee/Documents/code/vite.giwoolee.com/node_modules/vite/dist/node/chunks/dep-bb8a8339.js:55026:29)
      at async viteTransformMiddleware (file:///Users/giwoolee/Documents/code/vite.giwoolee.com/node_modules/vite/dist/node/chunks/dep-bb8a8339.js:64430:32)
Failed to resolve import "section/Header" from "src/pages/NotFound/index.tsx". Does the file exist?
```

**First investigation link:**
https://www.wolff.fun/path-mapping-typescript-vite/

**Solution:**
https://www.wolff.fun/path-mapping-typescript-vite/

> If you try to create paths using Vite you’ll notice that it’s not possible, since Vite doesn’t know how to build the imports by default. There are two solutions to this issue: adding the paths manually to the Vite build config or using a third-party package.

Using vite-tsconfig-paths

-   yarn add -D vite-tsconfig-paths

```hs
// vite.config.ts

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
});
```
