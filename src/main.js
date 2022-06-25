import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Routes from '@/routes'


createApp(App)
  .use(store)
  .use(Routes)
  .mount('#app')