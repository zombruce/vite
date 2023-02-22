import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { generateModifyVars } from './build/generate/generateModifyVars'
// import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dayjs from 'dayjs'
// import mkcert from 'vite-plugin-mkcert'
import legacy from '@vitejs/plugin-legacy'
import checker from 'vite-plugin-checker'
import { viteVConsole } from 'vite-plugin-vconsole'
import windiCSS from 'vite-plugin-windicss'
import path from 'path'
// import unocssVitePlugin from 'unocss/vite'
// import { presetUno, presetAttributify, presetIcons } from 'unocss'
// 实现组件库或内部组件的自动按需引入组件
import components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver as antDesignVueResolver } from 'unplugin-vue-components/resolvers'
// 解决 unplugin-vue-components 插件 加载UI库中无法处理的非组件模块
import usePluginImport from 'vite-plugin-importer'

import pkg from './package.json'

import multiPageConfig from './vite.config.multipage'

const CWD = process.cwd()
const __APP_INFO__ = {
    pkg,
    lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

multiPageConfig.getInput()

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, CWD)
    console.log(env, 'env')
    return {
        root: 'src/packages',
        base: '/',
        // 静态资源服务文件夹
        publicDir: path.resolve(__dirname, './public'),
        // 默认'public'  作为静态资源服务的文件夹  (打包public文件夹会没有，里面得东西会直接编译在dist文件下)
        assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), // 静态资源处理
        envDir: fileURLToPath(new URL('./', import.meta.url)),
        envPrefix: 'VITE_',
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
            // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
            // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
        },
        plugins: [
            // 使用mkcert为vite https开发服务提供证书支持
            // mkcert(),
            vue(),
            vueJsx(),
            // 浏览器兼容
            legacy({
                targets: ['defaults', 'not IE 11', 'chrome 49', 'maintained node versions'],
                additionalLegacyPolyfills: ['regenerator-runtime/runtime']
            }),
            viteVConsole({
                entry: fileURLToPath(new URL('./src/main.ts', import.meta.url)), // 入口文件，或者可以使用这个配置: [path.resolve('src/main.ts')]
                localEnabled: false, // 本地是否启用
                enabled: false, // 是否启用 sit环境使用
                config: {
                    maxLogNumber: 1000,
                    theme: 'dark' // 主题颜色
                }
            }),
            // unocssVitePlugin({
            //     presets: [presetUno(), presetAttributify(), presetIcons()]
            // }),
            // https://github.com/antfu/unplugin-vue-components
            components({
                resolvers: [antDesignVueResolver({ importStyle: false })]
                // directoryAsNamespace: true,
            }),
            // https://github.com/fi3ework/vite-plugin-checker
            // 一个Vite插件，可以在工作线程中运行TypeScript, VLS, vue-tsc, ESLint。
            checker({
                typescript: true
                // vueTsc: true,
                // eslint: {
                //     lintCommand: 'eslint "./src/**/*.{.vue,ts,tsx}"' // for example, lint .ts & .tsx
                // }
            }),
            // vite-plugin-windicss
            // windiCSS(),
            multiPageConfig.pathRewritePlugin(),
            usePluginImport({
                libraryName: 'ant-design-vue',
                libraryDirectory: 'es',
                style: (name) => `${name}/style/css`
            })
        ],
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: generateModifyVars(),
                    javascriptEnabled: true

                    // additionalData: '@import "ant-design-vue/lib/style/themes/default.less";'
                }
                // scss: {
                //   additionalData: `
                //   @use 'sass:math';
                //   @import "src/styles/global.scss";
                //   `,
                // },
            }
        },
        server: {
            host: '0.0.0.0',
            port: 8081, // 配置启用的端口号
            // https: true,
            open: true, // 启动时自动在浏览器中打开
            cors: false, // 为开发服务器配置 CORS
            proxy: {
                '/api': {
                    target: 'http://kong.dev.whalepms.com:8000',
                    changeOrigin: true, // 是否跨域
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
                '/ws-api': {
                    target: 'wss://ws.whalepms.com',
                    changeOrigin: true, // 是否允许跨域
                    ws: true
                }
            },
            strictPort: false, // 设为true时端口被占用则直接退出，不会尝试其他可用的端口
            hmr: true // 禁用或配置HMR连接（热更新是否开启）
        },
        // 依赖优化选项
        optimizeDeps: {
            include: ['@vue/runtime-core', '@vue/shared', 'lodash-es', 'ant-design-vue/es/locale/zh_CN']
        },
        build: {
            minify: 'terser',
            // 设置最终构建的浏览器兼容目标
            target: ['chrome49'],
            // 传递给 Terser 的更多 minify 选项
            terserOptions: {
                compress: {
                    drop_console: false,
                    drop_debugger: true
                }
            },
            modulePreload: true,
            manifest: true, // 当设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 过的资源文件名和 hash 后版本的映射
            ssrManifest: false, // 当设置为 true 时，构建也将生成 SSR 的 manifest 文件，以确定生产中的样式链接与资产预加载指令
            outDir: env.VITE_OUTPUT_DIR,
            assetsDir: 'assets',
            assetsInlineLimit: 2048, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
            cssCodeSplit: false, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
            sourcemap: false, // 构建后是否生成 source map 文件
            reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
            chunkSizeWarningLimit: 1000, // chunk 大小警告的限制（以 kbs 为单位）默认：500
            cssTarget: ['chrome49'], // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式
            // (要兼容的场景是安卓微信中的 webview 时, 它不支持 CSS 中的 #RGBA 十六进制颜色符号)
            emptyOutDir: true, // 默认情况下，若outDir在root目录下，则Vite会在构建时清空该目录
            rollupOptions: {
                input: multiPageConfig.pageEntry,
                output: {
                    entryFileNames: 'assets/js/entry-[name]-[hash].js',
                    chunkFileNames: 'assets/js/chunk-[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
                }
            }
        }
    }
})
