import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SeparatorPage from './pages/SeparatorPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/separator', name: 'separator', component: SeparatorPage },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
