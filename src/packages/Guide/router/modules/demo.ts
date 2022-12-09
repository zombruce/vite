export default [
    {
        path: '/about',
        name: 'about',
        component: () => import('../../views/about/Index.vue')
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('../../views/Index.vue')
    }
]
