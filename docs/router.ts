import { createRouter, createWebHistory } from 'vue-router'
import AvatarPage from './components/pages/AvatarPage.vue'
import AnnouncerPage from './components/pages/AnnouncerPage.vue'
import AccordionPage from './components/pages/AccordionPage.vue'
import AlertPage from './components/pages/AlertPage.vue'
import AlertDialogPage from './components/pages/AlertDialogPage.vue'
import AspectRatioPage from './components/pages/AspectRatioPage.vue'
import AttachmentPage from './components/pages/AttachmentPage.vue'
import BadgePage from './components/pages/BadgePage.vue'
import BreadcrumbPage from './components/pages/BreadcrumbPage.vue'
import ButtonPage from './components/pages/ButtonPage.vue'
import ButtonGroupPage from './components/pages/ButtonGroupPage.vue'
import CardPage from './components/pages/CardPage.vue'
import CheckboxPage from './components/pages/CheckboxPage.vue'
import ChipPage from './components/pages/ChipPage.vue'
import ComponentsPage from './components/pages/ComponentsPage.vue'
import CssVariablesPage from './components/pages/CssVariablesPage.vue'
import DesignSystemPage from './components/pages/DesignSystemPage.vue'
import DialogPage from './components/pages/DialogPage.vue'
import EmptyPage from './components/pages/EmptyPage.vue'
import FieldSetPage from './components/pages/FieldSetPage.vue'
import IconPage from './components/pages/IconPage.vue'
import InputPage from './components/pages/InputPage.vue'
import InputTimePage from './components/pages/InputTimePage.vue'
import IconsPage from './components/pages/IconsPage.vue'
import IndexPage from './components/pages/IndexPage.vue'
import KbdPage from './components/pages/KbdPage.vue'
import KbdGroupPage from './components/pages/KbdGroupPage.vue'
import LabelPage from './components/pages/LabelPage.vue'
import LinkPage from './components/pages/LinkPage.vue'
import LoadingPage from './components/pages/LoadingPage.vue'
import LinearChartPage from './components/pages/LinearChartPage.vue'
import MeterGroupPage from './components/pages/MeterGroupPage.vue'
import PopoverPage from './components/pages/PopoverPage.vue'
import PaginationPage from './components/pages/PaginationPage.vue'
import ProgressPage from './components/pages/ProgressPage.vue'
import ProgressCircularPage from './components/pages/ProgressCircularPage.vue'
import RibbonPage from './components/pages/RibbonPage.vue'
import ScrollAreaPage from './components/pages/ScrollAreaPage.vue'
import SearchPage from './components/pages/SearchPage.vue'
import SelectPage from './components/pages/SelectPage.vue'
import SeparatorPage from './components/pages/SeparatorPage.vue'
import SliderPage from './components/pages/SliderPage.vue'
import SplitterPage from './components/pages/SplitterPage.vue'
import StepperPage from './components/pages/StepperPage.vue'
import SwitchPage from './components/pages/SwitchPage.vue'
import TabsPage from './components/pages/TabsPage.vue'
import TagInputPage from './components/pages/TagInputPage.vue'
import TimePage from './components/pages/TimePage.vue'
import TimelinePage from './components/pages/TimelinePage.vue'
import TogglePage from './components/pages/TogglePage.vue'
import TreePage from './components/pages/TreePage.vue'
import TextareaPage from './components/pages/TextareaPage.vue'
import TooltipPage from './components/pages/TooltipPage.vue'
import { componentMetaBySlug } from './config/components'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: IndexPage },
    { path: '/components', component: ComponentsPage },
    {
      path: '/getting-started/theme/design-system',
      component: DesignSystemPage,
    },
    {
      path: '/getting-started/theme/css-variables',
      component: CssVariablesPage,
    },
    {
      path: '/getting-started/integrations/icons',
      component: IconsPage,
    },
    {
      path: '/accordion',
      component: AccordionPage,
      meta: { component: componentMetaBySlug.accordion },
    },
    { path: '/avatar', component: AvatarPage, meta: { component: componentMetaBySlug.avatar } },
    {
      path: '/announcer',
      component: AnnouncerPage,
      meta: { component: componentMetaBySlug.announcer },
    },
    { path: '/alert', component: AlertPage, meta: { component: componentMetaBySlug.alert } },
    {
      path: '/alert-dialog',
      component: AlertDialogPage,
      meta: { component: componentMetaBySlug['alert-dialog'] },
    },
    {
      path: '/aspect-ratio',
      component: AspectRatioPage,
      meta: { component: componentMetaBySlug['aspect-ratio'] },
    },
    {
      path: '/attachment',
      component: AttachmentPage,
      meta: { component: componentMetaBySlug.attachment },
    },
    { path: '/badge', component: BadgePage, meta: { component: componentMetaBySlug.badge } },
    {
      path: '/breadcrumb',
      component: BreadcrumbPage,
      meta: { component: componentMetaBySlug.breadcrumb },
    },
    { path: '/button', component: ButtonPage, meta: { component: componentMetaBySlug.button } },
    {
      path: '/button-group',
      component: ButtonGroupPage,
      meta: { component: componentMetaBySlug['button-group'] },
    },
    { path: '/card', component: CardPage, meta: { component: componentMetaBySlug.card } },
    {
      path: '/checkbox',
      component: CheckboxPage,
      meta: { component: componentMetaBySlug.checkbox },
    },
    { path: '/chip', component: ChipPage, meta: { component: componentMetaBySlug.chip } },
    { path: '/dialog', component: DialogPage, meta: { component: componentMetaBySlug.dialog } },
    { path: '/empty', component: EmptyPage, meta: { component: componentMetaBySlug.empty } },
    {
      path: '/field-set',
      component: FieldSetPage,
      meta: { component: componentMetaBySlug['field-set'] },
    },
    { path: '/icon', component: IconPage, meta: { component: componentMetaBySlug.icon } },
    { path: '/input', component: InputPage, meta: { component: componentMetaBySlug.input } },
    {
      path: '/input-time',
      component: InputTimePage,
      meta: { component: componentMetaBySlug['input-time'] },
    },
    { path: '/label', component: LabelPage, meta: { component: componentMetaBySlug.label } },
    { path: '/link', component: LinkPage, meta: { component: componentMetaBySlug.link } },
    { path: '/loading', component: LoadingPage, meta: { component: componentMetaBySlug.loading } },
    {
      path: '/linear-chart',
      component: LinearChartPage,
      meta: { component: componentMetaBySlug['linear-chart'] },
    },
    {
      path: '/meter-group',
      component: MeterGroupPage,
      meta: { component: componentMetaBySlug['meter-group'] },
    },
    { path: '/popover', component: PopoverPage, meta: { component: componentMetaBySlug.popover } },
    {
      path: '/pagination',
      component: PaginationPage,
      meta: { component: componentMetaBySlug.pagination },
    },
    {
      path: '/progress',
      component: ProgressPage,
      meta: { component: componentMetaBySlug.progress },
    },
    {
      path: '/progress-circular',
      component: ProgressCircularPage,
      meta: { component: componentMetaBySlug['progress-circular'] },
    },
    { path: '/ribbon', component: RibbonPage, meta: { component: componentMetaBySlug.ribbon } },
    {
      path: '/scroll-area',
      component: ScrollAreaPage,
      meta: { component: componentMetaBySlug['scroll-area'] },
    },
    { path: '/search', component: SearchPage, meta: { component: componentMetaBySlug.search } },
    { path: '/select', component: SelectPage, meta: { component: componentMetaBySlug.select } },
    {
      path: '/separator',
      component: SeparatorPage,
      meta: { component: componentMetaBySlug.separator },
    },
    { path: '/slider', component: SliderPage, meta: { component: componentMetaBySlug.slider } },
    {
      path: '/splitter',
      component: SplitterPage,
      meta: { component: componentMetaBySlug.splitter },
    },
    {
      path: '/stepper',
      component: StepperPage,
      meta: { component: componentMetaBySlug.stepper },
    },
    { path: '/kbd', component: KbdPage, meta: { component: componentMetaBySlug.kbd } },
    {
      path: '/kbd-group',
      component: KbdGroupPage,
      meta: { component: componentMetaBySlug['kbd-group'] },
    },
    { path: '/switch', component: SwitchPage, meta: { component: componentMetaBySlug.switch } },
    { path: '/tabs', component: TabsPage, meta: { component: componentMetaBySlug.tabs } },
    {
      path: '/tag-input',
      component: TagInputPage,
      meta: { component: componentMetaBySlug['tag-input'] },
    },
    { path: '/time', component: TimePage, meta: { component: componentMetaBySlug.time } },
    {
      path: '/timeline',
      component: TimelinePage,
      meta: { component: componentMetaBySlug.timeline },
    },
    { path: '/tree', component: TreePage, meta: { component: componentMetaBySlug.tree } },
    { path: '/toggle', component: TogglePage, meta: { component: componentMetaBySlug.toggle } },
    {
      path: '/textarea',
      component: TextareaPage,
      meta: { component: componentMetaBySlug.textarea },
    },
    { path: '/tooltip', component: TooltipPage, meta: { component: componentMetaBySlug.tooltip } },
  ],
})
