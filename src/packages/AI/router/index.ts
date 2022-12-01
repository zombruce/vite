import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
    history: createWebHistory('/AI'),
    routes: [
        {
            path: '/',
            redirect: 'home'
        },
        {
            name: 'home',
            component: () => import('../views/Index.vue'),
            path: '/home'
        }
    ]
})

export default router
