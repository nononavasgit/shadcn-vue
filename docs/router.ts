import { createRouter, createWebHistory } from 'vue-router'
import AvatarPage from './components/pages/AvatarPage.vue'
import AnnouncerPage from './components/pages/AnnouncerPage.vue'
import AccordionPage from './components/pages/AccordionPage.vue'
import AlertPage from './components/pages/AlertPage.vue'
import AlertDialogPage from './components/pages/AlertDialogPage.vue'
import AspectRatioPage from './components/pages/AspectRatioPage.vue'
import AttachmentPage from './components/pages/AttachmentPage.vue'
import BadgePage from './components/pages/BadgePage.vue'
import ButtonPage from './components/pages/ButtonPage.vue'
import ButtonGroupPage from './components/pages/ButtonGroupPage.vue'
import CardPage from './components/pages/CardPage.vue'
import CheckboxPage from './components/pages/CheckboxPage.vue'
import FieldSetPage from './components/pages/FieldSetPage.vue'
import IconPage from './components/pages/IconPage.vue'
import InputPage from './components/pages/InputPage.vue'
import IndexPage from './components/pages/IndexPage.vue'
import KbdPage from './components/pages/KbdPage.vue'
import KbdGroupPage from './components/pages/KbdGroupPage.vue'
import LabelPage from './components/pages/LabelPage.vue'
import LoadingPage from './components/pages/LoadingPage.vue'
import SwitchPage from './components/pages/SwitchPage.vue'
import TimePage from './components/pages/TimePage.vue'
import TogglePage from './components/pages/TogglePage.vue'
import TextareaPage from './components/pages/TextareaPage.vue'
import TooltipPage from './components/pages/TooltipPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: IndexPage },
    { path: '/accordion', component: AccordionPage },
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
    { path: '/checkbox', component: CheckboxPage },
    { path: '/field-set', component: FieldSetPage },
    { path: '/icon', component: IconPage },
    { path: '/input', component: InputPage },
    { path: '/label', component: LabelPage },
    { path: '/loading', component: LoadingPage },
    { path: '/kbd', component: KbdPage },
    { path: '/kbd-group', component: KbdGroupPage },
    { path: '/switch', component: SwitchPage },
    { path: '/time', component: TimePage },
    { path: '/toggle', component: TogglePage },
    { path: '/textarea', component: TextareaPage },
    { path: '/tooltip', component: TooltipPage },
  ],
})
