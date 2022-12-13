import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { AppRouteModule } from './type'
import { createStorage } from '@/utils/cache/index'
import { HotelStorageEnum } from '@/enums/storageKeyEnum'
import { LAYOUT } from './constant'

const storage = createStorage()
// 模块化路由
const routesModules: Record<string, any> = import.meta.globEager('./modules/*.ts')
const modules: AppRouteModule[] = []
Object.keys(routesModules).forEach((key) => {
    modules.push(...routesModules[key].default)
})

const routes: AppRouteModule[] = [
    {
        path: '/',
        name: 'Layout',
        component: LAYOUT,
        redirect: '/about',
        children: [...modules]
    }
]

const router = createRouter({
    history: createWebHistory('/antd'),
    routes: routes as unknown as RouteRecordRaw[]
})

router.beforeEach((to, _, next) => {
    next()
})

export default router
