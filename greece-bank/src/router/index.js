import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../forms/RegisterForm.vue'
import PasswordForm from '../forms/PasswordForm.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/recover-password', component: PasswordForm },
  { path: "/reset-password", component: PasswordForm },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
