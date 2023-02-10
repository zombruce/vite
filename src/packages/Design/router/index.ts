import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { AppRouteModule } from './type'
import { createStorage } from '@/utils/cache/index'
import { HotelStorageEnum } from '@/enums/storageKeyEnum'
import { LAYOUT } from './constant'
import type { App } from 'vue'

const storage = createStorage()
// 模块化路由
const routesModules: Record<string, any> = import.meta.globEager('./modules/*.ts')
const modules: AppRouteModule[] = []
Object.keys(routesModules).forEach((key) => {
    modules.push(...routesModules[key].default)
})
// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = []
const routes: AppRouteModule[] = [
    {
        path: '/',
        name: 'Layout',
        component: LAYOUT,
        redirect: '/about',
        children: [...modules]
    }
]

// const router = createRouter({
//     history: createWebHistory('/antd'),
//     routes: routes as unknown as RouteRecordRaw[]
// })
// app router
// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
    // 创建一个 hash 历史记录。
    history: createWebHistory('/xi-ze'),
    // 应该添加到路由的初始路由列表。
    routes: routes as unknown as RouteRecordRaw[],
    // 是否应该禁止尾部斜杠。默认为假
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

// reset router
export function resetRouter() {
    router.getRoutes().forEach((route) => {
        const { name } = route
        if (name && !WHITE_NAME_LIST.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name)
        }
    })
}

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
    app.use(router)
}