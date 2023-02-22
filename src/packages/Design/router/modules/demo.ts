export default [
    {
        path: '/about',
        name: 'about',
        component: () => import('../../views/about/Index.vue')
    },
    {
        path: '/timeSchedule',
        name: 'timeSchedule',
        component: () => import('@/packages/Design/views/timeSchedule/Index.vue')
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('../../views/Index.vue')
    }
]
