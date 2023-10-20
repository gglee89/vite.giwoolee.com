### Step 1 (Removing CRA)

```sh
npm uninstall @typescript-eslint/eslint-plugin eslint-config-standard-with-typescript
npm uninstall react-scripts
```

### Step 2 (Installing Vite dependencies)

```sh
npm install vite @vitejs/plugin-react-swc vite-tsconfig-paths vite-plugin-svgr
```

### Step 3 (Moving index.html)

create-react-app uses public/index.html as the default entry point, while Vite looks for index.html at the root level. To make the transition, move your index.html to the root directory and update the script tag accordingly.

```html
<!-- index.html -->
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>

    <script type="module" src="/src/index.tsx"></script>
</body>
```

> Question 1: Why do I need to "update the script tag accordingly"?

### Step 4 (Adding vite.config.ts)

Create a vite.config.ts file at the root of your project with the following content:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react()],
})
```

### Step 5 (Adding vite-env.d.ts)

Create a vite-env.d.ts file inside the src folder with the following content:

### Step 6 (Adding vite scripts)

Replace the existing CRA scripts in package.json with Vite scripts.

```js
"scripts": {
    "start": "vite",
    "build": "tsc && vite build",
    "serve": "vite preview"
}
```
