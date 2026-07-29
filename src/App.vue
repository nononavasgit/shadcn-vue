<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Accordion } from '@/components/app/Accordion'
import { Alert } from '@/components/app/Alert'
import { AlertDialog } from '@/components/app/AlertDialog'
import { AspectRatio } from '@/components/app/AspectRatio'
import { Breadcrumb, type BreadcrumbItem } from '@/components/app/Breadcrumb'
import { Collapsible } from '@/components/app/Collapsible'
import { Dialog } from '@/components/app/Dialog'
import { HoverCard } from '@/components/app/HoverCard'
import { Icon } from '@/components/app/Icon'
import { Kbd, KbdGroup } from '@/components/app/Kbd'
import { Link } from '@/components/app/Link'
import { Pagination, type PaginationUI } from '@/components/app/Pagination'
import { Panel } from '@/components/app/Panel'
import { Popover } from '@/components/app/Popover'
import { Progress } from '@/components/app/Progress'
import { ProgressCircular } from '@/components/app/ProgressCircular'
import { Separator } from '@/components/app/Separator'
import { Stepper } from '@/components/app/Stepper'
import { Time } from '@/components/app/Time'
import { Tooltip } from '@/components/app/Tooltip'
import type { BreadcrumbUI } from '@/components/app/Breadcrumb'

const accordionItems = [
  {
    value: 'installation',
    title: 'Instalación',
    content: 'Instala el paquete y configura el plugin de Tailwind en tu proyecto Vue.',
  },
  {
    value: 'usage',
    title: 'Uso básico',
    content: 'Importa los componentes que necesites y utilízalos directamente en tus templates.',
  },
  {
    value: 'accessibility',
    title: 'Accesibilidad',
    content: 'Los componentes se apoyan en Reka UI para ofrecer navegación mediante teclado.',
  },
  {
    value: 'disabled',
    title: 'Elemento deshabilitado',
    content: 'Este contenido no puede abrirse.',
    disabled: true,
  },
]

const stepperSteps = [
  {
    key: 'account',
    step: 1,
    label: 'Cuenta',
    description: 'Introduce tus datos',
    content: 'Configura el nombre y el correo electrónico asociados a tu nueva cuenta.',
  },
  {
    key: 'preferences',
    step: 2,
    label: 'Preferencias',
    description: 'Personaliza la experiencia',
    content: 'Selecciona las opciones de privacidad, idioma y notificaciones que prefieras.',
  },
  {
    key: 'confirmation',
    step: 3,
    label: 'Confirmación',
    description: 'Revisa la información',
    content: 'Comprueba que toda la información sea correcta antes de finalizar el proceso.',
  },
]

const alertVariantExamples = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const
const alertSeverityExamples = [
  { value: 'primary', label: 'Primary', icon: 'info' },
  { value: 'secondary', label: 'Secondary', icon: 'info' },
  { value: 'warning', label: 'Warning', icon: 'warning' },
  { value: 'success', label: 'Success', icon: 'success' },
  { value: 'error', label: 'Error', icon: 'error' },
] as const

const breadcrumbBasicItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Inicio', to: '/' },
  { id: 'components', label: 'Componentes', to: '/components' },
  { id: 'breadcrumb', label: 'Breadcrumb' },
]

const breadcrumbIconItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Inicio', to: '/', icon: 'chevronLeft' },
  {
    id: 'router',
    to: 'https://router.vuejs.org',
    icon: 'info',
  },
  { id: 'links', label: 'Enlaces', icon: 'chevronRight' },
]

const breadcrumbSlotItems: BreadcrumbItem[] = [
  { id: 'store', label: 'Tienda', to: '/store' },
  { id: 'hidden', ellipsis: true },
  { id: 'catalog', label: 'Catálogo', to: '/store/catalog' },
  { id: 'confirmation', label: 'Confirmación' },
]
const fixedDate = new Date('2026-07-28T18:30:00.000Z')
const timestamp = Date.UTC(2026, 6, 28, 18, 30)
const now = ref(new Date())
const accordionValue = ref('installation')
const multipleAccordionValue = ref<string[]>(['usage', 'accessibility'])
const tooltipOpen = ref(false)
const popoverOpen = ref(false)
const hoverCardOpen = ref(false)
const collapsibleOpen = ref(false)
const dialogOpen = ref(false)
const alertDialogOpen = ref(false)
const alertDialogResult = ref('Sin respuesta')
const panelOpen = ref(true)
const progressValue = ref(68)
const paginationBasicPage = ref(1)
const paginationBasicItemsPerPage = ref(10)
const paginationEdgesPage = ref(8)
const paginationCustomPage = ref(3)
const stepperValue = ref(1)
const verticalStepperValue = ref(2)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer !== undefined) window.clearInterval(timer)
})

const breadcrumbUI: BreadcrumbUI = {
  item: (context) => {
    console.log(context)

    return {
      'aria-label': 'ee',
    }
  },
}

const paginationUI: PaginationUI = {
  content: {
    class: 'rounded-xl bg-violet-50 p-2 dark:bg-violet-950/30',
  },
  previous: {
    'aria-label': 'Primero',
  },
  item: ({ active }) => ({
    class: active
      ? 'border-violet-500 bg-violet-600 text-white hover:bg-violet-700 hover:text-white'
      : 'hover:bg-violet-100 dark:hover:bg-violet-900/40',
  }),
  ellipsis: {
    class: 'text-violet-600',
  },
}
</script>

<template>
  <main class="mx-auto max-w-4xl space-y-12 p-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Time & Kbd</h1>
      <p class="text-muted-foreground">Ejemplos de los componentes con su nueva API en inglés.</p>
    </header>

    <section class="space-y-5" aria-labelledby="alert-examples-title">
      <div>
        <h2 id="alert-examples-title" class="text-xl font-semibold">Alert</h2>
        <p class="text-sm text-muted-foreground">
          Las cinco severidades en todas sus variantes. Todas las alertas son cerrables.
        </p>
      </div>

      <div
        v-for="severity in alertSeverityExamples"
        :key="severity.value"
        class="space-y-3 rounded-lg border p-5"
      >
        <div>
          <h3 class="font-medium">Severity: {{ severity.label }}</h3>
          <p class="text-sm text-muted-foreground">
            Solid, outline, plain, subtle y soft con severidad {{ severity.value }}.
          </p>
        </div>

        <Alert
          v-for="variant in alertVariantExamples"
          :key="variant"
          closable
          :label="severity.label + ' · ' + variant"
          :description="'Variante ' + variant + ' con severidad ' + severity.value + '.'"
          :icon="severity.icon"
          :severity="severity.value"
          :variant="variant"
        />
      </div>

      <div class="space-y-4 rounded-lg border p-5">
        <div>
          <h3 class="font-medium">Color y botón normalizado</h3>
          <p class="text-sm text-muted-foreground">
            Color personalizado y closeButton abreviado mediante un texto.
          </p>
        </div>

        <Alert
          closable
          close-button="Cerrar"
          color="#7c3aed"
          variant="solid"
          label="Color personalizado"
          description="El contraste se calcula igual que en Button y el texto se normaliza como label del botón de cierre."
          icon="info"
        />

        <Alert
          closable
          color="#db2777"
          variant="subtle"
          label="CloseButton con objeto"
          description="También admite todas las props y atributos HTML de Button."
          icon="info"
          :close-button="{
            icon: 'x',
            rounded: true,
            size: 'sm',
            'aria-label': 'Descartar alerta personalizada',
          }"
        />
      </div>

      <div class="space-y-4 rounded-lg border p-5">
        <h3 class="font-medium">Slots personalizados</h3>

        <Alert closable severity="warning" variant="outline" class="pr-24">
          <template #icon>
            <Icon name="warning" aria-hidden="true" />
          </template>

          <template #label>Contenido personalizado mediante slots</template>

          <template #description>
            <p>
              Los slots permiten sustituir el icono, el título, la descripción y el control de
              cierre.
            </p>
            <ul class="mt-2 list-inside list-disc">
              <li>El contenido puede incluir cualquier estructura HTML.</li>
              <li>El slot close recibe la función que descarta la alerta.</li>
            </ul>
          </template>

          <template #close="{ close }">
            <button
              type="button"
              class="absolute top-3 right-3 text-xs font-medium underline hover:no-underline"
              @click="close"
            >
              Descartar
            </button>
          </template>
        </Alert>
      </div>
    </section>
    <section class="space-y-4" aria-labelledby="link-examples-title">
      <div>
        <h2 id="link-examples-title" class="text-xl font-semibold">Link</h2>
        <p class="text-sm text-muted-foreground">
          Enlaces basados en Button, con elemento anchor y variante link por defecto.
        </p>
      </div>

      <div class="space-y-5 rounded-lg border p-5">
        <div class="space-y-2">
          <h3 class="font-medium">Uso básico</h3>
          <div class="flex flex-wrap items-center gap-2">
            <Link to="#link-destination">Enlace predeterminado</Link>
            <Link to="#link-destination" label="Texto mediante label" />
            <Link
              to="https://google.com"
              variant="solid"
              target="_blank"
              aria-label="Abrir el destino interno"
            >
              Con atributos HTML
            </Link>
          </div>
        </div>

        <Separator />

        <div class="space-y-2">
          <h3 class="font-medium">Tamaños y colores</h3>
          <div class="flex flex-wrap items-center gap-2">
            <Link to="#link-destination" size="xs">Extra pequeño</Link>
            <Link to="#link-destination" size="sm">Pequeño</Link>
            <Link to="#link-destination" size="md">Mediano</Link>
            <Link to="#link-destination" size="lg">Grande</Link>
            <Link to="#link-destination" severity="success">Correcto</Link>
            <Link to="#link-destination" severity="warning">Advertencia</Link>
            <Link to="#link-destination" severity="error">Error</Link>
            <Link to="#link-destination" color="#7c3aed">Color personalizado</Link>
          </div>
        </div>

        <Separator />

        <div class="space-y-2">
          <h3 class="font-medium">Iconos y estados</h3>
          <div class="flex flex-wrap items-center gap-2">
            <Link to="#link-destination" icon="search">Buscar documentación</Link>
            <Link to="#link-destination" trailing-icon="chevronRight">Continuar leyendo</Link>
            <Link to="#link-destination" loading>Cargando destino</Link>
          </div>
        </div>

        <p id="link-destination" class="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          Destino interno utilizado por los enlaces de estos ejemplos.
        </p>
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="breadcrumb-examples-title">
      <div>
        <h2 id="breadcrumb-examples-title" class="text-xl font-semibold">Breadcrumb</h2>
        <p class="text-sm text-muted-foreground">
          Rutas internas y externas, iconos y personalización mediante slots.
        </p>
      </div>

      <div class="space-y-5 rounded-lg border p-5">
        <div class="space-y-2">
          <h3 class="font-medium">Uso básico</h3>
          <Breadcrumb :items="breadcrumbBasicItems" />
        </div>

        <Separator />

        <div class="space-y-2">
          <h3 class="font-medium">Iconos y enlace externo</h3>
          <Breadcrumb :items="breadcrumbIconItems" :ui="breadcrumbUI" />
        </div>

        <Separator />

        <div class="space-y-2">
          <h3 class="font-medium">Slots globales e individuales</h3>
          <Breadcrumb :items="breadcrumbSlotItems">
            <template #icon="{ first }">
              <Icon :name="first ? 'info' : 'chevronRight'" aria-hidden="true" />
            </template>

            <template #separator>
              <span class="text-muted-foreground" aria-hidden="true">→</span>
            </template>

            <template #ellipsis-hidden>
              <span class="px-1 font-bold tracking-widest text-muted-foreground" aria-hidden="true">
                ···
              </span>
              <span class="sr-only">Rutas intermedias ocultas</span>
            </template>

            <template #separator-catalog>
              <span class="font-semibold text-primary" aria-hidden="true">/</span>
            </template>

            <template #item-confirmation="{ item }">
              <span class="rounded-md bg-primary/10 px-2 py-1 font-semibold text-primary">
                {{ item.label }}
              </span>
            </template>
          </Breadcrumb>
        </div>
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="pagination-examples-title">
      <div>
        <h2 id="pagination-examples-title" class="text-xl font-semibold">Pagination</h2>
        <p class="text-sm text-muted-foreground">
          Páginas calculadas automáticamente, controles de extremos y personalización mediante
          <code>ui</code> y slots.
        </p>
      </div>

      <div class="space-y-6 rounded-lg border p-5">
        <div class="space-y-3">
          <div>
            <h3 class="font-medium">Uso básico</h3>
            <p class="text-sm text-muted-foreground">
              95 resultados, diez elementos por página. Página actual:
              {{ paginationBasicPage }}.
            </p>
          </div>

          <Pagination
            v-model:page="paginationBasicPage"
            :total="95"
            :items-per-page="paginationBasicItemsPerPage"
          >
            <template #preContent>
              <label class="flex items-center gap-2 text-sm">
                <select
                  v-model.number="paginationBasicItemsPerPage"
                  class="h-9 rounded-md border bg-background px-2"
                  @change="paginationBasicPage = 1"
                >
                  <option :value="5">5</option>
                  <option :value="10">10</option>
                  <option :value="25">25</option>
                </select>
              </label>
            </template>

            <template #postContent="{ from, to, total }">
              <span class="text-sm text-muted-foreground">
                Mostrando {{ from }}–{{ to }} de {{ total }}
              </span>
            </template>
          </Pagination>
        </div>

        <Separator />

        <div class="space-y-3">
          <div>
            <h3 class="font-medium">Extremos y puntos suspensivos</h3>
            <p class="text-sm text-muted-foreground">
              Incluye los controles de primera y última página y mantiene visibles los extremos.
            </p>
          </div>

          <Pagination
            v-model:page="paginationEdgesPage"
            :total="240"
            :items-per-page="10"
            :sibling-count="1"
            show-first
            show-last
          />
        </div>

        <Separator />

        <div class="space-y-3">
          <div>
            <h3 class="font-medium">UI y slots globales e individuales</h3>
            <p class="text-sm text-muted-foreground">
              El slot <code>item-3</code> sustituye únicamente la tercera página.
            </p>
          </div>

          <Pagination
            v-model:page="paginationCustomPage"
            :total="120"
            :items-per-page="10"
            :sibling-count="3"
            :ui="paginationUI"
            :show-first="true"
            :show-last="true"
            :show-next="true"
            :show-previous="true"
            :show-edges="false"
          >
            <template #first>
              <Icon name="chevronLeft" aria-hidden="true" />
              <span class="sr-only">Primera página</span>
            </template>

            <template #previous>
              <Icon name="chevronLeft" aria-hidden="true" />
              <span class="hidden sm:inline">Anterior</span>
            </template>

            <template #item="{ item, active }">
              <span :class="active ? 'font-bold' : undefined">
                {{ item.type === 'page' ? item.value : '' }}
              </span>
            </template>

            <template #item-3="{ active }">
              <span aria-hidden="true">{{ active ? '★' : '☆' }}</span>
              <span class="sr-only">Página 3</span>
            </template>

            <template #ellipsis>
              <span class="font-bold tracking-widest" aria-hidden="true">···</span>
              <span class="sr-only">Más páginas</span>
            </template>

            <template #next>
              <span class="hidden sm:inline">Siguiente</span>
              <Icon name="chevronRight" aria-hidden="true" />
            </template>

            <template #last>
              <span class="sr-only">Última página</span>
              <Icon name="chevronRight" aria-hidden="true" />
            </template>
          </Pagination>
        </div>

        <Separator />

        <div class="space-y-3">
          <h3 class="font-medium">Estado deshabilitado</h3>
          <Pagination :page="4" :total="100" :items-per-page="10" disabled />
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Time básico</h2>
        <p class="text-sm text-muted-foreground">
          Acepta cadenas, objetos Date y marcas de tiempo numéricas.
        </p>
      </div>

      <div class="grid gap-3 rounded-lg border p-5 sm:grid-cols-3">
        <div class="space-y-1">
          <p class="text-xs font-medium text-muted-foreground">ISO string</p>
          <Time datetime="2026-07-28T18:30:00.000Z" locale="es-ES" />
        </div>

        <div class="space-y-1">
          <p class="text-xs font-medium text-muted-foreground">Date</p>
          <Time :datetime="fixedDate" locale="es-ES" />
        </div>

        <div class="space-y-1">
          <p class="text-xs font-medium text-muted-foreground">Timestamp</p>
          <Time :datetime="timestamp" locale="es-ES" />
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Formatos de fecha</h2>

      <div class="grid gap-4 sm:grid-cols-2">
        <article class="rounded-lg border p-4">
          <p class="mb-2 text-sm text-muted-foreground">Fecha completa</p>
          <Time
            :datetime="fixedDate"
            locale="es-ES"
            :format="{
              dateStyle: 'full',
            }"
            class="font-medium"
          />
        </article>

        <article class="rounded-lg border p-4">
          <p class="mb-2 text-sm text-muted-foreground">Fecha y hora</p>
          <Time
            :datetime="fixedDate"
            locale="es-ES"
            :format="{
              dateStyle: 'medium',
              timeStyle: 'short',
            }"
            class="font-medium"
          />
        </article>

        <article class="rounded-lg border p-4">
          <p class="mb-2 text-sm text-muted-foreground">Mes y año</p>
          <Time
            :datetime="fixedDate"
            locale="es-ES"
            :format="{
              month: 'long',
              year: 'numeric',
            }"
            class="font-medium capitalize"
          />
        </article>

        <article class="rounded-lg border p-4">
          <p class="mb-2 text-sm text-muted-foreground">Solo hora</p>
          <Time
            :datetime="fixedDate"
            locale="es-ES"
            :format="{
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            }"
            class="font-mono font-medium"
          />
        </article>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Diferentes locales</h2>

      <div class="overflow-hidden rounded-lg border">
        <div class="grid grid-cols-[8rem_1fr] border-b p-3">
          <span class="text-sm font-medium">Español</span>
          <Time :datetime="fixedDate" locale="es-ES" :format="{ dateStyle: 'long' }" />
        </div>
        <div class="grid grid-cols-[8rem_1fr] border-b p-3">
          <span class="text-sm font-medium">English</span>
          <Time :datetime="fixedDate" locale="en-US" :format="{ dateStyle: 'long' }" />
        </div>
        <div class="grid grid-cols-[8rem_1fr] border-b p-3">
          <span class="text-sm font-medium">Français</span>
          <Time :datetime="fixedDate" locale="fr-FR" :format="{ dateStyle: 'long' }" />
        </div>
        <div class="grid grid-cols-[8rem_1fr] p-3">
          <span class="text-sm font-medium">日本語</span>
          <Time :datetime="fixedDate" locale="ja-JP" :format="{ dateStyle: 'long' }" />
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Fecha en vivo y slot personalizado</h2>

      <div class="flex flex-wrap items-center gap-4 rounded-lg border p-5">
        <div>
          <p class="text-xs text-muted-foreground">Hora actual</p>
          <Time
            :datetime="now"
            locale="es-ES"
            :format="{
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }"
            class="font-mono text-2xl font-semibold tabular-nums"
          />
        </div>

        <Time :datetime="fixedDate" locale="es-ES" :format="{ dateStyle: 'medium' }">
          <template #default="{ date }">
            <span class="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700">
              📅 {{ date }}
            </span>
          </template>
        </Time>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Kbd básico</h2>
        <p class="text-sm text-muted-foreground">Contenido mediante title o mediante el slot.</p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Kbd label="Esc" />
        <Kbd label="Enter" />
        <Kbd label="Tab" />
        <Kbd label="⌘" />
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Alt</Kbd>
        <Kbd>Space</Kbd>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Combinaciones con KbdGroup</h2>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="flex items-center justify-between rounded-lg border p-4">
          <span class="text-sm">Guardar</span>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>S</Kbd>
          </KbdGroup>
        </div>

        <div class="flex items-center justify-between rounded-lg border p-4">
          <span class="text-sm">Buscar</span>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>

        <div class="flex items-center justify-between rounded-lg border p-4">
          <span class="text-sm">Cerrar ventana</span>
          <KbdGroup>
            <Kbd>Alt</Kbd>
            <span>+</span>
            <Kbd>F4</Kbd>
          </KbdGroup>
        </div>

        <div class="flex items-center justify-between rounded-lg border p-4">
          <span class="text-sm">Paleta de comandos</span>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <span>+</span>
            <Kbd>Shift</Kbd>
            <span>+</span>
            <Kbd>P</Kbd>
          </KbdGroup>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Kbd dentro de texto</h2>

      <div class="space-y-3 rounded-lg border p-5 text-sm leading-7">
        <p>
          Pulsa
          <KbdGroup class="mx-1 inline-flex">
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>K</Kbd>
          </KbdGroup>
          para abrir el buscador.
        </p>
        <p>
          Usa <Kbd class="mx-1">Esc</Kbd> para cerrar el diálogo o
          <Kbd class="mx-1">Enter</Kbd> para confirmar.
        </p>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Tooltip</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos con contenido directo, slot personalizado y estado controlado.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 rounded-lg border p-5">
        <Tooltip content="Guarda los cambios">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">Tooltip básico</button>
        </Tooltip>

        <Tooltip side="right" :side-offset="8">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">
            Contenido con slot
          </button>

          <template #content>
            <span class="font-medium">Tooltip personalizado</span>
          </template>
        </Tooltip>

        <Tooltip v-model:open="tooltipOpen" content="Estado controlado" side="bottom">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">
            {{ tooltipOpen ? 'Abierto' : 'Cerrado' }}
          </button>
        </Tooltip>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Popover</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos con slot de contenido, cierre desde el slot y v-model.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 rounded-lg border p-5">
        <Popover>
          <button class="rounded-md border px-4 py-2 text-sm font-medium">Abrir popover</button>

          <template #content="{ close }">
            <div class="w-64 space-y-3 p-1">
              <div>
                <p class="font-medium">Preferencias</p>
                <p class="text-sm text-muted-foreground">Configura las opciones del elemento.</p>
              </div>
              <button
                class="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-white"
                @click="close"
              >
                Guardar y cerrar
              </button>
            </div>
          </template>
        </Popover>

        <Popover v-model:open="popoverOpen" side="right" align="start">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">
            Popover {{ popoverOpen ? 'abierto' : 'cerrado' }}
          </button>

          <template #content="{ open, close }">
            <div class="w-56 space-y-3 p-1">
              <p class="text-sm">Estado del slot: {{ open ? 'abierto' : 'cerrado' }}</p>
              <button class="rounded-md border px-3 py-1.5 text-sm" @click="close">Cerrar</button>
            </div>
          </template>
        </Popover>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Separator</h2>
        <p class="text-sm text-muted-foreground">
          Separadores horizontales y verticales con la API en inglés.
        </p>
      </div>

      <div class="space-y-5 rounded-lg border p-5">
        <div class="space-y-1">
          <p class="font-medium">Cuenta</p>
          <p class="text-sm text-muted-foreground">Gestiona los datos de tu perfil.</p>
        </div>

        <Separator />

        <div class="flex h-5 items-center gap-4 text-sm">
          <span>Perfil</span>
          <Separator orientation="vertical" />
          <span>Seguridad</span>
          <Separator orientation="vertical" />
          <span>Notificaciones</span>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">HoverCard</h2>
        <p class="text-sm text-muted-foreground">
          Contenido directo, slot personalizado y estado controlado.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-6 rounded-lg border p-5">
        <HoverCard content="Documentación y ejemplos del componente." side="top">
          <a href="#" class="font-medium underline underline-offset-4">@shadcn-vue</a>
        </HoverCard>

        <HoverCard :open-delay="200" :close-delay="150" side="right" align="start">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">Ver perfil</button>

          <template #content="{ open }">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="grid size-10 place-items-center rounded-full bg-zinc-900 text-white">
                  NN
                </div>
                <div>
                  <p class="font-semibold">Nono Navas</p>
                  <p class="text-sm text-muted-foreground">@nononavas</p>
                </div>
              </div>
              <p class="text-sm">Estado recibido por el slot: {{ open ? 'abierto' : 'cerrado' }}</p>
            </div>
          </template>
        </HoverCard>

        <HoverCard v-model:open="hoverCardOpen" content="HoverCard controlado">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">
            {{ hoverCardOpen ? 'HoverCard abierto' : 'HoverCard cerrado' }}
          </button>
        </HoverCard>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Collapsible</h2>
        <p class="text-sm text-muted-foreground">Ejemplos básico, controlado y deshabilitado.</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <Collapsible class="rounded-lg border">
          <template #default="{ open }">
            <button class="flex w-full items-center justify-between p-4 text-left font-medium">
              Detalles del proyecto
              <span class="text-sm text-muted-foreground">{{ open ? '−' : '+' }}</span>
            </button>
          </template>
          <template #content>
            <div class="border-t p-4 text-sm text-muted-foreground">
              Este contenido se muestra y oculta al pulsar el encabezado.
            </div>
          </template>
        </Collapsible>

        <div class="space-y-3">
          <Collapsible v-model:open="collapsibleOpen" class="rounded-lg border">
            <template #default="{ open }">
              <button class="flex w-full items-center justify-between p-4 text-left font-medium">
                Estado controlado
                <span class="text-sm text-muted-foreground">{{
                  open ? 'Abierto' : 'Cerrado'
                }}</span>
              </button>
            </template>
            <template #content="{ open }">
              <div class="border-t p-4 text-sm text-muted-foreground">
                El valor de <code>open</code> es {{ open }}.
              </div>
            </template>
          </Collapsible>
          <button
            class="rounded-md border px-3 py-2 text-sm font-medium"
            @click="collapsibleOpen = !collapsibleOpen"
          >
            Cambiar desde fuera
          </button>
        </div>

        <Collapsible disabled class="rounded-lg border opacity-60">
          <template #default>
            <button class="w-full p-4 text-left font-medium">Collapsible deshabilitado</button>
          </template>
          <template #content>
            <div class="border-t p-4 text-sm">Este contenido no se puede abrir.</div>
          </template>
        </Collapsible>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Panel</h2>
        <p class="text-sm text-muted-foreground">
          Paneles plegables, personalizados y con encabezado fijo.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <Panel label="Panel básico" :ui="{ arrows: { style: { color: 'red' } } }">
          <p class="text-sm">Un panel plegable con los valores predeterminados del componente.</p>
        </Panel>

        <Panel v-model:open="panelOpen" label="Panel controlado" severity="success" variant="soft">
          <div class="space-y-3">
            <p class="text-sm">Su estado también se puede cambiar desde un control externo.</p>
            <button
              class="rounded-md border px-3 py-1.5 text-sm font-medium"
              @click="panelOpen = false"
            >
              Cerrar panel
            </button>
          </div>
        </Panel>

        <Panel label="Información permanente" severity="secondary" :collapsible="false">
          <p class="text-sm">
            Con <code>collapsible="false"</code>, el contenido permanece siempre visible.
          </p>
        </Panel>

        <Panel color="#7c3aed" variant="outline">
          <template #label="{ open }">
            Panel personalizado · {{ open ? 'abierto' : 'cerrado' }}
          </template>
          <template #arrows="{ open }">
            <span class="text-xs font-semibold">{{ open ? 'Ocultar' : 'Mostrar' }}</span>
          </template>
          <p class="text-sm">
            Los slots permiten personalizar la etiqueta y el indicador del encabezado.
          </p>
        </Panel>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Progress</h2>
        <p class="text-sm text-muted-foreground">
          Valores básicos, colores personalizados, límites y etiquetas mediante slots.
        </p>
      </div>

      <div class="grid gap-5 rounded-lg border p-5 sm:grid-cols-2">
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span>Progreso básico</span>
            <span>{{ progressValue }}%</span>
          </div>
          <Progress :value="progressValue" aria-label="Progreso básico" />
        </div>

        <div class="space-y-2">
          <p class="text-sm">Valor máximo personalizado</p>
          <Progress :value="7" :max="10" label="7 de 10" color="#16a34a" />
        </div>

        <div class="space-y-2">
          <p class="text-sm">Colores personalizados</p>
          <Progress
            :value="45"
            color="#7c3aed"
            track-color="#ede9fe"
            aria-label="Progreso personalizado"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm">Etiqueta con slot</p>
          <Progress :value="progressValue" color="#ea580c">
            <template #label="{ percentage }">{{ Math.round(percentage) }}% completado</template>
          </Progress>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          class="rounded-md border px-3 py-2 text-sm font-medium"
          @click="progressValue = Math.max(0, progressValue - 10)"
        >
          Reducir
        </button>
        <button
          class="rounded-md border px-3 py-2 text-sm font-medium"
          @click="progressValue = Math.min(100, progressValue + 10)"
        >
          Aumentar
        </button>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">ProgressCircular</h2>
        <p class="text-sm text-muted-foreground">
          Diferentes tamaños, grosores, colores y contenido central personalizado.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-8 rounded-lg border p-5">
        <div class="space-y-2 text-center">
          <ProgressCircular
            :value="progressValue"
            :label="`${progressValue}%`"
            aria-label="Progreso circular"
          />
          <p class="text-xs text-muted-foreground">Básico</p>
        </div>

        <div class="space-y-2 text-center">
          <ProgressCircular
            :value="3"
            :max="5"
            :size="104"
            :thickness="12"
            color="#16a34a"
            track-color="#dcfce7"
            label="3/5"
          />
          <p class="text-xs text-muted-foreground">Tamaño y grosor</p>
        </div>

        <div class="space-y-2 text-center">
          <ProgressCircular :value="progressValue" size="7rem" color="#7c3aed">
            <template #label="{ percentage }">
              <span class="text-lg font-bold">{{ Math.round(percentage) }}%</span>
            </template>
          </ProgressCircular>
          <p class="text-xs text-muted-foreground">Slot personalizado</p>
        </div>

        <div class="space-y-2 text-center">
          <ProgressCircular
            :value="82"
            :size="64"
            :thickness="5"
            color="#0284c7"
            aria-label="Progreso fino"
          />
          <p class="text-xs text-muted-foreground">Fino</p>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Dialog</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos básico, controlado y personalizado con la API en inglés.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 rounded-lg border p-5">
        <Dialog
          label="Información detallada y extraordinariamente extensa sobre la planificación, ejecución, seguimiento y mantenimiento futuro del proyecto"
          description="Consulta detenidamente todos los datos principales, las condiciones aplicables, las dependencias técnicas, los posibles riesgos y las decisiones pendientes antes de continuar con la siguiente fase del proceso."
          icon="info"
        >
          <button class="rounded-md border px-4 py-2 text-sm font-medium">
            Abrir diálogo básico
          </button>

          <template #content>
            <div class="space-y-4 py-2 text-sm leading-6">
              <p>
                Este contenido se proporciona mediante el slot <code>content</code> y contiene
                varios párrafos deliberadamente largos para comprobar que el diálogo distribuye
                correctamente el espacio disponible sin desplazar fuera de la pantalla el encabezado
                ni las acciones situadas en el pie.
              </p>
              <p class="text-muted-foreground">
                El proyecto reúne diferentes módulos que deben coordinarse durante varias fases.
                Cada módulo tiene responsables, dependencias, fechas objetivo y criterios de
                aceptación propios, por lo que cualquier cambio debe documentarse y comunicarse a
                todas las personas implicadas antes de incorporarse a la planificación definitiva.
              </p>
              <p class="text-muted-foreground">
                Durante la fase de implementación se revisarán periódicamente el rendimiento, la
                accesibilidad, la compatibilidad entre navegadores y la experiencia de uso. Los
                resultados de esas revisiones se conservarán junto con las decisiones técnicas para
                facilitar el mantenimiento y evitar que se repitan problemas ya resueltos.
              </p>
              <p class="text-muted-foreground">
                También se preparará una estrategia de publicación gradual que permita detectar
                incidencias con rapidez, limitar su impacto y recuperar una versión estable si fuera
                necesario. La estrategia incluirá métricas, alertas, responsables de guardia y un
                procedimiento claro para comunicar cualquier interrupción relevante del servicio.
              </p>
              <p class="text-muted-foreground">
                Finalmente, toda la documentación se actualizará para reflejar el comportamiento
                real del producto, incluyendo ejemplos completos, casos límite y recomendaciones
                para futuras ampliaciones. Este último párrafo añade altura suficiente para probar
                el desplazamiento vertical del cuerpo manteniendo visibles las demás secciones.
              </p>
              <p class="text-muted-foreground">
                Durante la fase de implementación se revisarán periódicamente el rendimiento, la
                accesibilidad, la compatibilidad entre navegadores y la experiencia de uso. Los
                resultados de esas revisiones se conservarán junto con las decisiones técnicas para
                facilitar el mantenimiento y evitar que se repitan problemas ya resueltos.
              </p>
              <p class="text-muted-foreground">
                También se preparará una estrategia de publicación gradual que permita detectar
                incidencias con rapidez, limitar su impacto y recuperar una versión estable si fuera
                necesario. La estrategia incluirá métricas, alertas, responsables de guardia y un
                procedimiento claro para comunicar cualquier interrupción relevante del servicio.
              </p>
              <p class="text-muted-foreground">
                Finalmente, toda la documentación se actualizará para reflejar el comportamiento
                real del producto, incluyendo ejemplos completos, casos límite y recomendaciones
                para futuras ampliaciones. Este último párrafo añade altura suficiente para probar
                el desplazamiento vertical del cuerpo manteniendo visibles las demás secciones.
              </p>
              <p class="text-muted-foreground">
                Durante la fase de implementación se revisarán periódicamente el rendimiento, la
                accesibilidad, la compatibilidad entre navegadores y la experiencia de uso. Los
                resultados de esas revisiones se conservarán junto con las decisiones técnicas para
                facilitar el mantenimiento y evitar que se repitan problemas ya resueltos.
              </p>
              <p class="text-muted-foreground">
                También se preparará una estrategia de publicación gradual que permita detectar
                incidencias con rapidez, limitar su impacto y recuperar una versión estable si fuera
                necesario. La estrategia incluirá métricas, alertas, responsables de guardia y un
                procedimiento claro para comunicar cualquier interrupción relevante del servicio.
              </p>
              <p class="text-muted-foreground">
                Finalmente, toda la documentación se actualizará para reflejar el comportamiento
                real del producto, incluyendo ejemplos completos, casos límite y recomendaciones
                para futuras ampliaciones. Este último párrafo añade altura suficiente para probar
                el desplazamiento vertical del cuerpo manteniendo visibles las demás secciones.
              </p>
              <p class="text-muted-foreground">
                Durante la fase de implementación se revisarán periódicamente el rendimiento, la
                accesibilidad, la compatibilidad entre navegadores y la experiencia de uso. Los
                resultados de esas revisiones se conservarán junto con las decisiones técnicas para
                facilitar el mantenimiento y evitar que se repitan problemas ya resueltos.
              </p>
              <p class="text-muted-foreground">
                También se preparará una estrategia de publicación gradual que permita detectar
                incidencias con rapidez, limitar su impacto y recuperar una versión estable si fuera
                necesario. La estrategia incluirá métricas, alertas, responsables de guardia y un
                procedimiento claro para comunicar cualquier interrupción relevante del servicio.
              </p>
              <p class="text-muted-foreground">
                Finalmente, toda la documentación se actualizará para reflejar el comportamiento
                real del producto, incluyendo ejemplos completos, casos límite y recomendaciones
                para futuras ampliaciones. Este último párrafo añade altura suficiente para probar
                el desplazamiento vertical del cuerpo manteniendo visibles las demás secciones.
              </p>
            </div>
          </template>
        </Dialog>

        <Dialog
          v-model:open="dialogOpen"
          label="Editar todas las preferencias de comunicación, privacidad y notificaciones asociadas a la cuenta"
          description="Configura con precisión cómo, cuándo y mediante qué canales quieres recibir las notificaciones relacionadas con actividad importante, novedades del producto y cambios de seguridad."
          :ui="{ body: { class: 'py-2' } }"
          block
        >
          <template #default="{ open }">
            <button class="rounded-md border px-4 py-2 text-sm font-medium">
              Dialog {{ open ? 'abierto' : 'controlado' }}
            </button>
          </template>

          <template #content>
            <div class="grid gap-3">
              <label class="grid gap-1 text-sm">
                <span class="font-medium">Correo electrónico</span>
                <input class="rounded-md border px-3 py-2" value="usuario@ejemplo.com" />
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" checked />
                Recibir novedades del producto, resúmenes semanales de actividad y avisos
                importantes relacionados con la seguridad de la cuenta
              </label>
            </div>
          </template>

          <template #footer="{ close }">
            <button class="rounded-md border px-3 py-2 text-sm" @click="close">Cancelar</button>
            <button class="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white" @click="close">
              Guardar cambios
            </button>
          </template>
        </Dialog>

        <Dialog
          label="Eliminar definitivamente este elemento y todos los datos relacionados que dependen de él"
          description="Esta acción es solo una demostración, pero el texto extenso permite comprobar cómo se comportan el encabezado, la descripción, el icono y el botón de cierre cuando el espacio disponible es reducido."
          icon="warning"
          :show-close-button="false"
        >
          <button class="rounded-md border border-red-300 px-4 py-2 text-sm text-red-700">
            Sin botón de cierre
          </button>

          <template #content>
            <p class="py-2 text-sm text-muted-foreground">
              El botón superior se oculta mediante <code>showCloseButton</code>. Este texto es
              intencionadamente largo para verificar que el contenido conserva una lectura cómoda,
              que los separadores ocupan todo el ancho disponible y que la acción del pie permanece
              accesible incluso cuando la explicación necesita varias líneas.
            </p>
          </template>

          <template #footer="{ close }">
            <button class="rounded-md border px-3 py-2 text-sm" @click="close">
              Cerrar desde el slot
            </button>
          </template>
        </Dialog>
      </div>

      <p class="text-sm text-muted-foreground">
        Estado del diálogo controlado: {{ dialogOpen ? 'abierto' : 'cerrado' }}
      </p>
    </section>

    <section class="space-y-4" aria-labelledby="alert-dialog-examples-title">
      <div>
        <h2 id="alert-dialog-examples-title" class="text-xl font-semibold">AlertDialog</h2>
        <p class="text-sm text-muted-foreground">
          Confirmaciones importantes con botones normalizados, estado controlado y slots.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 rounded-lg border p-5">
        <AlertDialog
          label="¿Quieres eliminar definitivamente esta cuenta?"
          description="Esta acción no se puede deshacer. Se eliminarán permanentemente la cuenta, las preferencias guardadas y todos los datos relacionados almacenados en nuestros servidores."
          icon="warning"
          :action-button="{ label: 'Eliminar cuenta', severity: 'error', icon: 'trash2' }"
          cancel-button="Conservar cuenta"
        >
          <button
            class="rounded-md border border-error/40 px-4 py-2 text-sm font-medium text-error"
          >
            Eliminar cuenta
          </button>
        </AlertDialog>

        <AlertDialog
          v-model:open="alertDialogOpen"
          label="¿Quieres continuar con la publicación?"
          description="Antes de continuar, confirma que has revisado el contenido, los permisos de acceso y la fecha prevista de publicación."
          icon="info"
          :action-button="{
            icon: 'warning',
            label: 'continuar',
          }"
          cancel-button="Volver"
          @action="alertDialogResult = 'Publicación confirmada'"
          @cancel="alertDialogResult = 'Publicación cancelada'"
        >
          <template #default="{ open }">
            <button class="rounded-md border px-4 py-2 text-sm font-medium">
              {{ open ? 'Confirmación abierta' : 'Abrir confirmación controlada' }}
            </button>
          </template>

          <template #content>
            <div class="rounded-md bg-muted p-3 text-sm text-muted-foreground">
              La publicación quedará visible para todas las personas con acceso al proyecto y
              comenzará a generar notificaciones inmediatamente.
            </div>
          </template>
        </AlertDialog>

        <AlertDialog icon="warning">
          <button
            class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Abrir ejemplo con slots
          </button>

          <template #label>Confirmación personalizada mediante slots</template>

          <template #description>
            Decide si quieres aplicar ahora los cambios pendientes a todos los elementos
            seleccionados.
          </template>

          <template #content>
            <ul class="list-inside list-disc space-y-1 rounded-md border p-3 text-sm">
              <li>Se actualizarán los permisos compartidos.</li>
              <li>Las personas afectadas recibirán una notificación.</li>
              <li>La operación quedará registrada en el historial.</li>
            </ul>
          </template>

          <template #cancel>
            <button class="rounded-md border px-4 py-2 text-sm font-medium">Ahora no</button>
          </template>

          <template #action>
            <button class="rounded-md bg-success px-4 py-2 text-sm font-medium text-white">
              Sí, aplicar cambios
            </button>
          </template>
        </AlertDialog>
      </div>

      <div class="rounded-md bg-muted p-3 text-sm text-muted-foreground">
        Estado controlado: {{ alertDialogOpen ? 'abierto' : 'cerrado' }} · Resultado:
        {{ alertDialogResult }}
      </div>
    </section>
    <section class="space-y-4" aria-labelledby="aspect-ratio-examples-title">
      <div>
        <h2 id="aspect-ratio-examples-title" class="text-xl font-semibold">AspectRatio</h2>
        <p class="text-sm text-muted-foreground">
          Proporciones estables para imágenes, vídeo, tarjetas y cualquier otro contenido.
        </p>
      </div>

      <div class="grid gap-5 rounded-lg border p-5 sm:grid-cols-2">
        <div class="space-y-2">
          <h3 class="font-medium">Panorámico · 16:9</h3>
          <AspectRatio :ratio="16 / 9" class="overflow-hidden rounded-lg bg-muted">
            <div
              class="flex size-full flex-col justify-end bg-linear-to-br from-sky-500 via-indigo-500 to-violet-700 p-5 text-white"
            >
              <p class="text-xs font-medium tracking-widest uppercase opacity-80">Banner</p>
              <p class="text-xl font-semibold">Contenido panorámico adaptable</p>
            </div>
          </AspectRatio>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Cuadrado · 1:1</h3>
          <AspectRatio :ratio="1" class="max-w-64 overflow-hidden rounded-lg border bg-muted">
            <div class="flex size-full flex-col items-center justify-center gap-3 p-6 text-center">
              <span
                class="flex size-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground"
              >
                AR
              </span>
              <div>
                <p class="font-semibold">Tarjeta de perfil</p>
                <p class="text-sm text-muted-foreground">Siempre conserva su forma cuadrada.</p>
              </div>
            </div>
          </AspectRatio>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Reproductor · 4:3</h3>
          <AspectRatio :ratio="4 / 3" class="overflow-hidden rounded-lg bg-zinc-950 text-white">
            <div class="relative flex size-full items-center justify-center">
              <button
                type="button"
                aria-label="Reproducir vídeo de demostración"
                class="flex size-14 items-center justify-center rounded-full bg-white/15 text-xl backdrop-blur hover:bg-white/25"
              >
                ▶
              </button>
              <div class="absolute right-4 bottom-3 left-4 h-1 rounded-full bg-white/20">
                <div class="h-full w-1/3 rounded-full bg-white" />
              </div>
            </div>
          </AspectRatio>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Slot y asChild · 21:9</h3>
          <AspectRatio v-slot="{ aspect }" :ratio="21 / 9" as-child>
            <article
              class="flex w-full items-center justify-between gap-4 overflow-hidden rounded-lg border bg-primary/5 p-5"
            >
              <div>
                <p class="font-semibold">Artículo como elemento raíz</p>
                <p class="text-sm text-muted-foreground">
                  Porcentaje interno calculado: {{ aspect.toFixed(2) }}%
                </p>
              </div>
              <Icon name="info" class="size-8 shrink-0 text-primary" aria-hidden="true" />
            </article>
          </AspectRatio>
        </div>
      </div>
    </section>
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Accordion</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos de selección única, múltiple y contenido personalizado mediante slots.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div class="space-y-3">
          <div>
            <h3 class="font-medium">Selección única</h3>
            <p class="text-sm text-muted-foreground">
              Solo puede permanecer abierto un elemento y todos se pueden cerrar.
            </p>
          </div>

          <Accordion
            v-model="accordionValue"
            :items="accordionItems"
            collapsible
            class="rounded-lg border px-4"
          />

          <p class="text-xs text-muted-foreground">
            Valor seleccionado: {{ accordionValue || 'ninguno' }}
          </p>
        </div>

        <div class="space-y-3">
          <div>
            <h3 class="font-medium">Selección múltiple</h3>
            <p class="text-sm text-muted-foreground">
              Permite mantener varios elementos abiertos simultáneamente.
            </p>
          </div>

          <Accordion
            v-model="multipleAccordionValue"
            type="multiple"
            :items="accordionItems.slice(0, 3)"
            class="rounded-lg border px-4"
          />

          <p class="text-xs text-muted-foreground">
            Valores: {{ multipleAccordionValue.join(', ') || 'ninguno' }}
          </p>
        </div>
      </div>

      <div class="space-y-3">
        <div>
          <h3 class="font-medium">Slots y UI dinámica</h3>
          <p class="text-sm text-muted-foreground">
            Personaliza un elemento concreto y calcula las clases según su estado.
          </p>
        </div>

        <Accordion
          :items="accordionItems.slice(0, 3)"
          collapsible
          class="rounded-lg border px-4"
          :ui="{
            item: ({ open }) => ({ class: open ? 'bg-violet-50' : undefined }),
            trigger: ({ open }) => ({ class: open ? 'text-violet-700' : undefined }),
            content: { class: 'text-muted-foreground' },
          }"
        >
          <template #trigger="{ item, index, open }">
            <span class="flex items-center gap-2">
              <span class="grid size-6 place-items-center rounded-full bg-zinc-100 text-xs">
                {{ index + 1 }}
              </span>
              {{ item.title }}
              <span class="text-xs text-muted-foreground">
                {{ open ? 'abierto' : 'cerrado' }}
              </span>
            </span>
          </template>

          <template #trigger-installation="{ item }">
            <span class="font-semibold text-violet-700">★ {{ item.title }}</span>
          </template>

          <template #content-installation="{ item }">
            <div class="space-y-2">
              <p>{{ item.content }}</p>
              <code class="block rounded-md bg-zinc-950 p-3 text-xs text-zinc-50">
                npm install @nononavas/shadcn-vue
              </code>
            </div>
          </template>
        </Accordion>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Stepper</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos horizontal, lineal y vertical con navegación y personalización mediante slots.
        </p>
      </div>

      <div class="space-y-5 rounded-lg border p-5">
        <div>
          <h3 class="font-medium">Horizontal y lineal</h3>
          <p class="text-sm text-muted-foreground">
            Los botones del contenido utilizan las funciones recibidas por el slot.
          </p>
        </div>

        <Stepper
          v-model="stepperValue"
          :steps="stepperSteps"
          linear
          color="#7c3aed"
          :ui="{
            content: { class: 'rounded-lg border bg-zinc-50 p-4' },
          }"
        >
          <template
            #default="{
              step,
              value,
              isFirstStep,
              isLastStep,
              isNextDisabled,
              isPrevDisabled,
              nextStep,
              prevStep,
            }"
          >
            <div class="space-y-4">
              <div>
                <p class="font-medium">Paso activo: {{ value }} · {{ step.label }}</p>
                <p class="mt-1 text-sm text-muted-foreground">{{ step.content }}</p>
              </div>

              <div class="flex items-center justify-between gap-3">
                <button
                  class="rounded-md border px-3 py-2 text-sm disabled:opacity-40"
                  :disabled="isFirstStep || isPrevDisabled"
                  @click="prevStep"
                >
                  Anterior
                </button>
                <button
                  class="rounded-md bg-violet-700 px-3 py-2 text-sm text-white disabled:opacity-40"
                  :disabled="isLastStep || isNextDisabled"
                  @click="nextStep"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </template>

          <template #icon-confirmation="{ state }">
            <span>{{ state === 'completed' ? '✓' : '★' }}</span>
          </template>
        </Stepper>

        <p class="text-xs text-muted-foreground">Valor actual: {{ stepperValue }}</p>
      </div>

      <div class="grid gap-6 rounded-lg border p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <h3 class="font-medium">Vertical y personalizable</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Las clases de cada elemento se calculan según su estado actual.
          </p>

          <Stepper
            v-model="verticalStepperValue"
            :steps="stepperSteps"
            orientation="vertical"
            color="#0284c7"
            class="mt-5"
            :ui="{
              item: ({ active }) => ({ class: active ? 'rounded-md bg-sky-50 p-2' : 'p-2' }),
              title: ({ active }) => ({ class: active ? 'text-sky-700' : undefined }),
              content: { class: 'rounded-md border border-sky-200 bg-sky-50 p-4' },
            }"
          >
            <template #title="{ step, state }">
              {{ step.label }}
              <span class="text-xs font-normal text-muted-foreground">({{ state }})</span>
            </template>

            <template #description-preferences="{ step }">
              <span class="font-medium text-sky-700">{{ step.description }}</span>
            </template>

            <template #content="{ step, goToStep, hasNext, hasPrev }">
              <div class="space-y-3">
                <p class="text-sm">{{ step.content }}</p>
                <div class="flex gap-2">
                  <button
                    v-if="hasPrev()"
                    class="rounded-md border px-3 py-1.5 text-sm"
                    @click="goToStep(step.step - 1)"
                  >
                    Volver
                  </button>
                  <button
                    v-if="hasNext()"
                    class="rounded-md bg-sky-700 px-3 py-1.5 text-sm text-white"
                    @click="goToStep(step.step + 1)"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </template>
          </Stepper>
        </div>

        <div class="rounded-lg bg-zinc-950 p-4 text-sm text-zinc-100">
          <p class="font-medium">Estado externo</p>
          <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
            <dt class="text-zinc-400">Valor</dt>
            <dd>{{ verticalStepperValue }}</dd>
            <dt class="text-zinc-400">Paso</dt>
            <dd>{{ stepperSteps.find((step) => step.step === verticalStepperValue)?.label }}</dd>
            <dt class="text-zinc-400">Orientación</dt>
            <dd>vertical</dd>
          </dl>
        </div>
      </div>
    </section>
  </main>
</template>
