import { createWebHistory, createRouter } from 'vue-router'

console.log(import.meta.env.BASE_URL, '123')
const router = createRouter({
    history: createWebHistory('/Guide'),
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
