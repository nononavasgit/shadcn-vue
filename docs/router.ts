import { createRouter, createWebHistory } from 'vue-router'
import AvatarPage from './components/pages/AvatarPage.vue'
import IconPage from './components/pages/IconPage.vue'
import IndexPage from './components/pages/IndexPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: IndexPage },
    { path: '/avatar', component: AvatarPage },
    { path: '/icon', component: IconPage },
  ],
})
