import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import 'virtual:windi-base.css'
// import 'virtual:windi-components.css'
// import 'virtual:windi-utilities.css'

import App from './App.vue'
import { router, setupRouter } from '@/packages/Design/router'

import '@/styles/Design/index.less'
// import { setupStore } from '@/stores'


const app = createApp(App)
app.use(createPinia())
app.use(router)
// 配置路由
setupRouter(app)

// router-guard
// 路由守卫

app.mount('#app')
