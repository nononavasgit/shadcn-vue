<script setup lang="ts">
import { computed, ref } from 'vue'

import { Link, type LinkSeverity, type LinkSize, type LinkVariant } from '@/components/ui/Link'
import { linkDefaults } from '@/components/ui/Link/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const label = ref('Open Button docs')
const to = ref('/button')
const external = ref(false)
const replace = ref(false)
const variant = ref<LinkVariant>(linkDefaults.variant)
const severity = ref<LinkSeverity>(linkDefaults.severity)
const size = ref<LinkSize>(linkDefaults.size)
const rounded = ref(linkDefaults.rounded)
const square = ref(linkDefaults.square)
const color = ref('')
const icon = ref('chevronRight')
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

const propRows: ApiTableRow[] = [
  {
    name: 'to',
    type: 'RouteLocationRaw | string',
    default: String(linkDefaults.to),
    description: 'Destino interno de Vue Router o URL externa. Si falta, se renderiza un div.',
  },
  {
    name: 'replace',
    type: 'boolean',
    default: String(linkDefaults.replace),
    description: 'Reemplaza la entrada actual del historial al navegar.',
  },
]

const inheritedRows: ApiTableRow[] = [
  {
    name: 'ButtonProps',
    type: 'ButtonProps',
    typeLink: '/button#button-props',
    default: '-',
    description: 'Props visuales heredadas de Button, excepto as, asChild y loading.',
  },
]

const emitRows: ApiTableRow[] = [
  { name: 'click', type: '[event: PointerEvent]', default: '-', description: 'Click del enlace.' },
]

const slotRows: ApiTableRow[] = [
  { name: 'default', type: '-', default: '-', description: 'Contenido principal.' },
  {
    name: 'leading',
    type: '-',
    default: '-',
    description: 'Contenido antes del texto.',
  },
  {
    name: 'trailing',
    type: '-',
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
        de RouterLink son <code>to</code> y <code>replace</code>. Hereda las props, el emit
        <code>click</code> y los slots <code>default</code>, <code>leading</code> y
        <code>trailing</code> de Button, excepto <code>as</code>, <code>asChild</code>,
        <code>loading</code> y el slot <code>loading</code>.
      </p>
    </header>

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
              placeholder="chevronRight"
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
      <ApiTable title="Button API heredada" :rows="inheritedRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
