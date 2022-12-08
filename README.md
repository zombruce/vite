# vite-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 项目目录
```
   

```

## 项目记录

1. 分包
   ````
   1、 将下面添加至vite.config.ts 文件中
   
   const multiPage: any = {}
   const pageEntry: any = {}
   
   function getInput() {
    const allEntry = glob.sync('./src/packages/**/index.html')
    allEntry.forEach((entry: string) => {
        const pathArr = entry.split('/')
        const name = pathArr[pathArr.length - 2]
        multiPage[name] = {
            name,
            rootPage: `/src/packages/${name}/index.html`
        }
        pageEntry[name] = resolve(__dirname, `/src/packages/${name}/index.html`)
    })
   }
   
   function pathRewritePlugin() {
    const rules: any[] = []
   
    Reflect.ownKeys(multiPage).forEach((key) => {
        rules.push({
            from: `/${multiPage[key].name}`,
            to: `${multiPage[key].rootPage}`
        })
    })

    return {
        name: 'path-rewrite-plugin',
        configureServer(server: any) {
            server.middlewares.use(
                history({
                    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
                    disableDotRule: undefined,
                    rewrites: rules
                })
            )
        }
    }
   }
   getInput()
   
   2、 添加路由重写插件
   
   plugins: [pathRewritePlugin()]`
   ````
2. chrome 低版本兼容

   ````` 
   1、import legacy from '@vitejs/plugin-legacy'
   
   2、plugins 添加插件
   // 浏览器兼容
   legacy({
       targets: ['defaults', 'not IE 11', 'chrome 49', 'maintained node versions'],
       additionalLegacyPolyfills: ['regenerator-runtime/runtime']
   })
   3、build 构建中设置最终构建的浏览器兼容目标
   target: ['chrome 49'],
   `````
3. 

