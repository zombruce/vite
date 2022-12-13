import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './routes'
// import { setupStore } from '@/stores'
import 'ant-design-vue/dist/antd.variable.min.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
