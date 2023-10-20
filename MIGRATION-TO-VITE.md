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

### Step 7 (Fixing tsconfig.json)

Update your tsconfig.json to its final version.

```js
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
    "jsx": "react-jsx",
    "types": ["vite/client", "vite-plugin-svgr/client"]
  },
  "include": ["src"]
}
```

### Step 8 (Migrating from Jest to Vitest)

As we are moving to Vite, another good idea is to consider migrating from Jest to Vitest as well. Here are the steps:

```sh
npm i -D jsdom vitest @vitest/coverage-v8
```

8.2 - Update vite.config.ts to include Vitest configurations:

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        css: true,
        reporters: ['verbose'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*'],
            exclude: [],
        },
    },
})
```

8.3 - Update package.json with Vitest scripts:

```js
  "scripts": {
    "start": "vite",
    "build": "tsc && vite build",
    "serve": "vite preview",
    "test": "vitest",
    "test:coverage": "vitest run --coverage --watch=false"
  },
```

### Step 9 (Extras)

If you use GitHub Actions to push your code to GitHub Pages, you'll need to update the workflow file as Vite generates a dist folder when we run npm run build.

```yaml
name: GitHub Pages

on:
    push:
        branches:
            - master
    pull_request:

jobs:
    deploy:
        runs-on: ubuntu-22.04
        permissions:
            contents: write
        concurrency:
            group: ${{ github.workflow }}-${{ github.ref }}
        steps:
            - uses: actions/checkout@v3

            - name: Setup Node
              uses: actions/setup-node@v3
              with:
                  node-version: '16'

            - name: Cache dependencies
              uses: actions/cache@v3
              with:
                  path: ~/.npm
                  key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
                  restore-keys: |
                      ${{ runner.os }}-node-

            - run: npm ci
            - run: npm run build

            - name: Deploy
              uses: peaceiris/actions-gh-pages@v3
              if: github.ref == 'refs/heads/master'
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  publish_dir: ./dist
```
