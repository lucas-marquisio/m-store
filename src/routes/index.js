import { createRouter, createWebHistory } from 'vue-router' 
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import PageCart from '@/views/MyCart.vue'
import PageAdmin from '@/views/PageAdmin.vue'
import PageAccount from '@/views/AccountPage.vue'

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/cart', name: 'MyCart', component: PageCart },
  {path: '/admin', name: 'Admin', component: PageAdmin},
  {path: '/account', name: 'Account', component: PageAccount}
]

const Router = createRouter({
  history: createWebHistory(),
  routes
})

export default Router