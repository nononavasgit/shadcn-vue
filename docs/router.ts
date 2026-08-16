import { createRouter, createWebHistory } from 'vue-router'
import AvatarPage from './components/pages/AvatarPage.vue'
import AnnouncerPage from './components/pages/AnnouncerPage.vue'
import AlertPage from './components/pages/AlertPage.vue'
import AlertDialogPage from './components/pages/AlertDialogPage.vue'
import AspectRatioPage from './components/pages/AspectRatioPage.vue'
import AttachmentPage from './components/pages/AttachmentPage.vue'
import BadgePage from './components/pages/BadgePage.vue'
import ButtonPage from './components/pages/ButtonPage.vue'
import ButtonGroupPage from './components/pages/ButtonGroupPage.vue'
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
    { path: '/alert', component: AlertPage },
    { path: '/alert-dialog', component: AlertDialogPage },
    { path: '/aspect-ratio', component: AspectRatioPage },
    { path: '/attachment', component: AttachmentPage },
    { path: '/badge', component: BadgePage },
    { path: '/button', component: ButtonPage },
    { path: '/button-group', component: ButtonGroupPage },
    { path: '/card', component: CardPage },
    { path: '/field-set', component: FieldSetPage },
    { path: '/icon', component: IconPage },
  ],
})
