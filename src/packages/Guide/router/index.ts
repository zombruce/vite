import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { AppRouteModule } from './type'
import { createStorage } from '@/utils/cache/index'
import { HotelStorageEnum } from '@/enums/storageKeyEnum'

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
        component: () => import('@/packages/Guide/layout/Index.vue'),
        redirect: '/about',
        children: [...modules]
    }
]

const router = createRouter({
    history: createWebHistory('/guide'),
    routes: routes as unknown as RouteRecordRaw[]
})

router.beforeEach((to, _, next) => {
    next()
})

export default router
