import { createRouter, createWebHistory } from 'vue-router'
import AvatarPage from './components/pages/AvatarPage.vue'
import AnnouncerPage from './components/pages/AnnouncerPage.vue'
import AspectRatioPage from './components/pages/AspectRatioPage.vue'
import CardPage from './components/pages/CardPage.vue'
import FieldSetPage from './components/pages/FieldSetPage.vue'
import IconPage from './components/pages/IconPage.vue'
import IndexPage from './components/pages/IndexPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: IndexPage },
    { path: '/avatar', component: AvatarPage },
    { path: '/announcer', component: AnnouncerPage },
    { path: '/aspect-ratio', component: AspectRatioPage },
    { path: '/card', component: CardPage },
    { path: '/field-set', component: FieldSetPage },
    { path: '/icon', component: IconPage },
  ],
})
