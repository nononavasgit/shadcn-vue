import { createRouter, createWebHistory } from 'vue-router'
import AvatarPage from './pages/AvatarPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/avatar' },
    { path: '/avatar', component: AvatarPage },
  ],
})
