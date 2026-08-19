<script setup lang="ts">
import { computed, ref } from 'vue'

import { Link, type LinkSeverity, type LinkSize, type LinkVariant } from '@/components/ui/Link'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const label = ref('Open Button docs')
const to = ref('/button')
const external = ref(false)
const replace = ref(false)
const variant = ref<LinkVariant>('link')
const severity = ref<LinkSeverity>('primary')
const size = ref<LinkSize>('md')
const rounded = ref(false)
const square = ref(false)
const color = ref('')
const icon = ref('arrowRight')
const trailingIcon = ref('')

const playgroundProps = computed(() => ({
  label: label.value || undefined,
  to: external.value ? 'https://example.com' : to.value,
  replace: replace.value,
  variant: variant.value,
  severity: severity.value,
  size: size.value,
  rounded: rounded.value,
  square: square.value,
  color: color.value || undefined,
  icon: icon.value ? { name: icon.value } : undefined,
  trailingIcon: trailingIcon.value ? { name: trailingIcon.value } : undefined,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'NormalizeLinkProps',
    type: 'LinkProps & EmitsAsProps<LinkEmits>',
    description: 'Tipo auxiliar para pasar props de Link junto con el evento click.',
  },
  {
    name: 'LinkVariant',
    type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'link'",
    description: 'Alias de la variante visual de Button.',
  },
  {
    name: 'LinkSeverity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    description: 'Alias de la severidad de Button.',
  },
  {
    name: 'LinkSize',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    description: 'Alias del tamano de Button.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'to',
    type: 'RouteLocationRaw | string',
    default: 'undefined',
    description: 'Destino interno de Vue Router o URL externa. Si falta, se renderiza un div.',
  },
  {
    name: 'replace',
    type: 'boolean',
    default: 'false',
    description: 'Reemplaza la entrada actual del historial al navegar.',
  },
  { name: 'label', type: 'string', default: 'undefined', description: 'Texto del enlace.' },
  {
    name: 'variant',
    type: 'LinkVariant',
    default: "'link'",
    description: 'Variante visual heredada de Button.',
  },
  {
    name: 'severity',
    type: 'LinkSeverity',
    default: "'primary'",
    description: 'Severidad semantica heredada de Button.',
  },
  { name: 'size', type: 'LinkSize', default: "'md'", description: 'Tamano del enlace.' },
  { name: 'rounded', type: 'boolean', default: 'false', description: 'Usa bordes redondeados.' },
  { name: 'square', type: 'boolean', default: 'false', description: 'Usa una forma cuadrada.' },
  { name: 'color', type: 'string', default: 'undefined', description: 'Color CSS personalizado.' },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono al inicio.',
  },
  {
    name: 'trailingIcon',
    type: 'IconConfig',
    typeLink: '/icon',
    default: 'undefined',
    description: 'Icono al final.',
  },
]

const emitRows: ApiTableRow[] = [
  { name: 'click', type: '[event: PointerEvent]', default: '-', description: 'Click del enlace.' },
]

const slotRows: ApiTableRow[] = [
  { name: 'default', type: 'void', default: '-', description: 'Contenido principal.' },
  {
    name: 'leading',
    type: 'void',
    default: '-',
    description: 'Contenido antes del texto.',
  },
  {
    name: 'trailing',
    type: 'void',
    default: '-',
    description: 'Contenido despues del texto.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Link</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Un enlace interno o externo que conserva la API visual de Button. Las unicas props propias
        de RouterLink son <code>to</code> y <code>replace</code>. La personalizacion se hace con las
        props, clases y slots de Button.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">Tipos publicos usados por la API.</p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Prueba la navegacion y las props visuales heredadas de Button.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Link v-bind="playgroundProps" />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">label</span>
            <input
              v-model="label"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">to</span>
            <input
              v-model="to"
              type="text"
              placeholder="/button"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="external" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">external</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="replace" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">replace</span>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">variant</span>
            <select v-model="variant" class="h-9 rounded-md border bg-background px-3 text-sm">
              <option value="solid">solid</option>
              <option value="outline">outline</option>
              <option value="plain">plain</option>
              <option value="subtle">subtle</option>
              <option value="soft">soft</option>
              <option value="link">link</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">severity</span>
            <select v-model="severity" class="h-9 rounded-md border bg-background px-3 text-sm">
              <option value="primary">primary</option>
              <option value="secondary">secondary</option>
              <option value="warning">warning</option>
              <option value="success">success</option>
              <option value="error">error</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">size</span>
            <select v-model="size" class="h-9 rounded-md border bg-background px-3 text-sm">
              <option value="xs">xs</option>
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">icon</span>
            <input
              v-model="icon"
              type="text"
              placeholder="arrowRight"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">trailingIcon</span>
            <input
              v-model="trailingIcon"
              type="text"
              placeholder="chevronRight"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="rounded" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">rounded</span>
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input v-model="square" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">square</span>
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
