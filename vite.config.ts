import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 实现组件库或内部组件的自动按需引入组件
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver, ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                // modifyVars: {},
                javascriptEnabled: true
            }
        }
    },
    plugins: [
        vue(),
        vueJsx(),
        Components({
            resolvers: [AntDesignVueResolver(), VantResolver(), ElementPlusResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
})
