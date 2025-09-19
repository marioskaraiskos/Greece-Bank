import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../forms/RegisterForm.vue'
import RecoverPasswordForm from '../forms/RecoverPasswordForm.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/recover-password', component: RecoverPasswordForm },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
