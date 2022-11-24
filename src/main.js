import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/less/main.less'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(store).mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
import store from './store'