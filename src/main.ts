import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { i18n } from './i18n'
import './assets/css/styles.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }],
})

createApp(App).use(i18n).use(router).mount('#app')
