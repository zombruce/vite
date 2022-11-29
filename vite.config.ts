import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dayjs from 'dayjs'
import mkcert from 'vite-plugin-mkcert'
import legacy from '@vitejs/plugin-legacy'
import checker from 'vite-plugin-checker'
import { viteVConsole } from 'vite-plugin-vconsole'
import unocssVitePlugin from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
// 实现组件库或内部组件的自动按需引入组件
import components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver as antDesignVueResolver } from 'unplugin-vue-components/resolvers'
import pkg from './package.json'
import { setEntry } from './setEntry'

setEntry()

const CWD = process.cwd()
const __APP_INFO__ = {
    pkg,
    lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
    const env = loadEnv(mode, CWD)
    console.log(env, 'env')
    return {
        root: CWD,
        base: env.VITE_BASE_URL,
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__)
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
            // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
        },
        plugins: [
            // 使用mkcert为vite https开发服务提供证书支持
            mkcert(),
            vue(),
            vueJsx(),
            // 浏览器兼容
            legacy({
                targets: ['defaults', 'not IE 11', 'chrome 79', 'maintained node versions'],
                additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
                // 根据你自己需要导入相应的polyfill:  https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#polyfill-specifiers
                modernPolyfills: ['es.promise.finally', 'es/array', 'es/map', 'es/set']
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
            unocssVitePlugin({
                presets: [presetUno(), presetAttributify(), presetIcons()]
            }),
            // https://github.com/antfu/unplugin-vue-components
            components({
                resolvers: [antDesignVueResolver()]
                // directoryAsNamespace: true,
            }),
            // https://github.com/fi3ework/vite-plugin-checker
            // 一个Vite插件，可以在工作线程中运行TypeScript, VLS, vue-tsc, ESLint。
            checker({
                typescript: true,
                // vueTsc: true,
                eslint: {
                    lintCommand: 'eslint "./src/**/*.{.vue,ts,tsx}"' // for example, lint .ts & .tsx
                }
            })
        ],
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                    // modifyVars: {},
                    // additionalData:
                    //     '@import "ant-design-vue/lib/style/themes/default.less";@import "@/styles/variables.less";'
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
        optimizeDeps: {
            include: ['@vue/runtime-core', '@vue/shared', 'lodash-es', 'ant-design-vue/es/locale/zh_CN']
        }
    }
})

