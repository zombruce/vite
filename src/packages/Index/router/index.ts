import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: 'home'
        },
        {
            name: 'home',
            component: () => import('../views/Index.vue'),
            path: '/home'
        },
        {
            name: 'about',
            component: () => import('../views/about/Index.vue'),
            path: '/home'
        }
    ]
})

export default router
