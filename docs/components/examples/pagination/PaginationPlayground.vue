<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Pagination as BasePagination } from '@/components/ui/Pagination'
import ComponentPlayground from '../../ComponentPlayground.vue'

type PaginationState = {
  page: number
  total: number
  itemsPerPage: number
  siblingCount: number
  showEdges: boolean
  disabled: boolean
  showControls: boolean
  color: string
  variant: string
  size: string
  severity: string
  activeColor: string
  activeVariant: string
  customIcons: boolean
  ui: boolean
  defaultSlot: boolean
  preContentSlot: boolean
  postContentSlot: boolean
  firstSlot: boolean
  previousSlot: boolean
  nextSlot: boolean
  lastSlot: boolean
  itemSlot: boolean
  ellipsisSlot: boolean
  itemPageSlot: boolean
  ellipsisIndexSlot: boolean
  attrs: boolean
}

const initialState = (): PaginationState => ({
  page: 3,
  total: 120,
  itemsPerPage: 10,
  siblingCount: 2,
  showEdges: true,
  disabled: false,
  showControls: true,
  color: '',
  variant: 'outline',
  size: 'md',
  severity: 'primary',
  activeColor: '',
  activeVariant: 'solid',
  customIcons: false,
  ui: false,
  defaultSlot: false,
  preContentSlot: false,
  postContentSlot: false,
  firstSlot: false,
  previousSlot: false,
  nextSlot: false,
  lastSlot: false,
  itemSlot: false,
  ellipsisSlot: false,
  itemPageSlot: false,
  ellipsisIndexSlot: false,
  attrs: false,
})

const state = ref<PaginationState>(initialState())
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function generateSlots() {
  const slots: string[] = []

  if (state.value.defaultSlot)
    slots.push(
      '  <template #default="{ page, pageCount }">',
      '    <output class="ml-2 text-sm text-muted-foreground">',
      '      Página {{ page }} de {{ pageCount }}',
      '    </output>',
      '  </template>',
    )
  if (state.value.preContentSlot)
    slots.push(
      '  <template #preContent="{ page }">',
      '    <span class="mr-2 text-sm text-muted-foreground">Página {{ page }}</span>',
      '  </template>',
    )
  if (state.value.postContentSlot)
    slots.push(
      '  <template #postContent="{ pageCount }">',
      '    <span class="ml-2 text-sm text-muted-foreground">Total: {{ pageCount }}</span>',
      '  </template>',
    )
  if (state.value.firstSlot)
    slots.push('  <template #first><span class="px-2 text-sm">Primera</span></template>')
  if (state.value.previousSlot)
    slots.push('  <template #previous><span class="px-2 text-sm">Anterior</span></template>')
  if (state.value.nextSlot)
    slots.push('  <template #next><span class="px-2 text-sm">Siguiente</span></template>')
  if (state.value.lastSlot)
    slots.push('  <template #last><span class="px-2 text-sm">Última</span></template>')
  if (state.value.itemSlot)
    slots.push(
      '  <template #item="{ item, active }">',
      "    <span :class=\"active ? 'rounded-md bg-primary px-3 py-2 text-primary-foreground' : 'px-3 py-2'\">",
      '      {{ item.value }}',
      '    </span>',
      '  </template>',
    )
  if (state.value.itemPageSlot)
    slots.push(
      '  <template #item-3="{ active }">',
      '    <span class="rounded-md border-2 border-primary px-3 py-2" :data-active="active">3</span>',
      '  </template>',
    )
  if (state.value.ellipsisSlot)
    slots.push(
      '  <template #ellipsis>',
      '    <span class="px-2 text-sm font-semibold text-muted-foreground">...</span>',
      '  </template>',
    )
  if (state.value.ellipsisIndexSlot)
    slots.push(
      '  <template #ellipsis-1>',
      '    <span class="px-2 text-sm text-primary" aria-label="Más páginas">•••</span>',
      '  </template>',
    )

  return slots
}

function generateCode() {
  const props = [
    'v-model:page="page"',
    `:total="${state.value.total}"`,
    `:items-per-page="${state.value.itemsPerPage}"`,
    `:sibling-count="${state.value.siblingCount}"`,
    `:show-edges="${state.value.showEdges}"`,
    `:disabled="${state.value.disabled}"`,
    `:show-controls="${state.value.showControls}"`,
    state.value.color && `color="${escapeAttribute(state.value.color)}"`,
    `variant="${state.value.variant}"`,
    `size="${state.value.size}"`,
    `severity="${state.value.severity}"`,
    state.value.activeColor && `active-color="${escapeAttribute(state.value.activeColor)}"`,
    `active-variant="${state.value.activeVariant}"`,
    state.value.customIcons && `:first-icon="{ name: 'chevronsLeft' }"`,
    state.value.customIcons && `:previous-icon="{ name: 'chevronLeft' }"`,
    state.value.customIcons && `:next-icon="{ name: 'chevronRight' }"`,
    state.value.customIcons && `:last-icon="{ name: 'chevronsRight' }"`,
    state.value.customIcons && `:ellipsis-icon="{ name: 'moreHorizontal' }"`,
    state.value.ui &&
      `:ui="{ root: ({ page }) => ({ class: page > 1 ? 'justify-start' : 'justify-center' }), list: () => ({ class: 'gap-2' }), first: () => ({ class: 'rounded-md' }), previous: () => ({ class: 'rounded-md' }), next: () => ({ class: 'rounded-md' }), last: () => ({ class: 'rounded-md' }), item: ({ active }) => ({ class: active ? 'ring-2 ring-primary/30' : undefined }), ellipsis: () => ({ class: 'text-primary' }) }"`,
    state.value.attrs && 'class="border border-primary p-3"',
    state.value.attrs && 'aria-label="Navegación de páginas"',
    '@update:page="handlePageUpdate"',
  ].filter(Boolean)
  const slots = generateSlots()
  const opening = `<Pagination\n  ${props.join('\n  ')}`

  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Pagination>` : `${opening}\n/>`
}

function handlePageUpdate(page: number) {
  eventLog.value = `update:page · ${page}`
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<Pagination(?=[\s/>])/g, '<PlaygroundPagination')
        .replaceAll('</Pagination>', '</PlaygroundPagination>'),
    )

    Preview.value = markRaw(
      defineComponent({
        name: 'PaginationPlaygroundPreview',
        components: { PlaygroundPagination: BasePagination },
        setup: () => ({ page: ref(state.value.page), handlePageUpdate }),
        render,
      }),
    )
    appliedCode.value = editorCode.value
    previewKey.value++
  } catch (error) {
    editorError.value = error instanceof Error ? error.message : String(error)
  }
}

function syncFromControls() {
  editorCode.value = generateCode()
  applyCode()
}

function reset() {
  state.value = initialState()
  eventLog.value = ''
  syncFromControls()
}

watch(state, syncFromControls, { deep: true, immediate: true })
</script>

<template>
  <ComponentPlayground
    v-model:code="editorCode"
    :applied-code="appliedCode"
    :error="editorError"
    filename="PaginationPlayground.vue"
    description="Configura la navegación, los controles, los iconos, los slots y la personalización de la paginación."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-48 place-items-center px-8 py-6">
        <div class="w-full max-w-3xl">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <p v-if="eventLog" class="mt-3 text-center text-sm text-muted-foreground">
            {{ eventLog }}
          </p>
        </div>
      </div>
    </template>

    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Paginación</legend>
          <label class="grid gap-1 text-xs"
            >Página inicial<input
              v-model.number="state.page"
              type="number"
              min="1"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Total<input
              v-model.number="state.total"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Items por página<input
              v-model.number="state.itemsPerPage"
              type="number"
              min="1"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Sibling count<input
              v-model.number="state.siblingCount"
              type="number"
              min="0"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.showEdges" type="checkbox" /> Mostrar extremos</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Deshabilitado</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.showControls" type="checkbox" /> Mostrar controles</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Botones e iconos</legend>
          <label class="grid gap-1 text-xs"
            >Color<input
              v-model="state.color"
              placeholder="var(--primary)"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Variant
            <select
              v-model="state.variant"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option
                v-for="variant in ['solid', 'outline', 'plain', 'subtle', 'soft', 'link']"
                :key="variant"
              >
                {{ variant }}
              </option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Size
            <select v-model="state.size" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option v-for="size in ['xs', 'sm', 'md', 'lg']" :key="size">{{ size }}</option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Severity
            <select
              v-model="state.severity"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option
                v-for="severity in ['primary', 'secondary', 'success', 'warning', 'error']"
                :key="severity"
              >
                {{ severity }}
              </option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Active color<input
              v-model="state.activeColor"
              placeholder="var(--primary)"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Active variant
            <select
              v-model="state.activeVariant"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option
                v-for="variant in ['solid', 'outline', 'plain', 'subtle', 'soft', 'link']"
                :key="variant"
              >
                {{ variant }}
              </option>
            </select>
          </label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.customIcons" type="checkbox" /> Iconos personalizados</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">UI y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ui" type="checkbox" /> Personalización ui</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos raíz</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots</legend>
          <p class="text-xs text-muted-foreground">
            Los slots dinámicos prueban una página concreta y una elipsis concreta.
          </p>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> default</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.preContentSlot" type="checkbox" /> preContent</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.postContentSlot" type="checkbox" /> postContent</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.firstSlot" type="checkbox" /> first</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.previousSlot" type="checkbox" /> previous</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.nextSlot" type="checkbox" /> next</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.lastSlot" type="checkbox" /> last</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemSlot" type="checkbox" /> item</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.itemPageSlot" type="checkbox" /> item-3</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ellipsisSlot" type="checkbox" /> ellipsis</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.ellipsisIndexSlot" type="checkbox" /> ellipsis-1</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
