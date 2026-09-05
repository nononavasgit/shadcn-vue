<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'

import { Toggle as BaseToggle } from '@/components/ui/Toggle'
import ComponentPlayground from '../../ComponentPlayground.vue'

type ToggleState = {
  value: boolean
  label: string
  icon: string
  trailingIcon: string
  variant: 'outline' | 'plain'
  severity: 'default' | 'primary' | 'secondary' | 'warning' | 'success' | 'error'
  size: 'xs' | 'sm' | 'md' | 'lg'
  color: string
  disabled: boolean
  defaultSlot: boolean
  leadingSlot: boolean
  trailingSlot: boolean
  attrs: boolean
}

const initialState = (): ToggleState => ({
  value: false,
  label: 'Notificaciones',
  icon: 'bell',
  trailingIcon: '',
  variant: 'outline',
  severity: 'default',
  size: 'md',
  color: '',
  disabled: false,
  defaultSlot: false,
  leadingSlot: false,
  trailingSlot: false,
  attrs: false,
})

const state = ref<ToggleState>(initialState())
const editorCode = ref('')
const appliedCode = ref('')
const editorError = ref('')
const eventLog = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

const icons = ['', 'bell', 'heart', 'star', 'bookmark', 'settings', 'check']

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function generateCode() {
  const props = [
    'v-model:value="value"',
    `label="${escapeAttribute(state.value.label)}"`,
    state.value.icon && `:icon="{ name: '${state.value.icon}' }"`,
    state.value.trailingIcon && `:trailing-icon="{ name: '${state.value.trailingIcon}' }"`,
    `variant="${state.value.variant}"`,
    `severity="${state.value.severity}"`,
    `size="${state.value.size}"`,
    state.value.color && `color="${escapeAttribute(state.value.color)}"`,
    `:disabled="${state.value.disabled}"`,
    state.value.attrs && 'class="border-primary" aria-label="Cambiar notificaciones"',
    '@update:value="handleUpdate"',
  ].filter(Boolean)
  const slots: string[] = []

  if (state.value.defaultSlot)
    slots.push(
      '  <template #default="{ pressed }">',
      "    <span>{{ pressed ? 'Activado' : 'Desactivado' }}</span>",
      '  </template>',
    )
  if (state.value.leadingSlot)
    slots.push(
      '  <template #leading="{ pressed }">',
      "    <span aria-hidden=\"true\">{{ pressed ? '●' : '○' }}</span>",
      '  </template>',
    )
  if (state.value.trailingSlot)
    slots.push(
      '  <template #trailing="{ value }">',
      "    <span class=\"text-xs\">{{ value ? 'On' : 'Off' }}</span>",
      '  </template>',
    )

  const opening = `<Toggle\n  ${props.join('\n  ')}`
  return slots.length ? `${opening}\n>\n${slots.join('\n')}\n</Toggle>` : `${opening}\n/>`
}

function handleUpdate(value: boolean) {
  eventLog.value = `update:value · ${value}`
}

function applyCode() {
  editorError.value = ''

  try {
    const render = compile(
      editorCode.value
        .replace(/<Toggle(?=[\s/>])/g, '<PlaygroundToggle')
        .replaceAll('</Toggle>', '</PlaygroundToggle>'),
    )

    Preview.value = markRaw(
      defineComponent({
        name: 'TogglePlaygroundPreview',
        components: { PlaygroundToggle: BaseToggle },
        setup: () => ({ value: ref(state.value.value), handleUpdate }),
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
    filename="TogglePlayground.vue"
    description="Configura el estado, la apariencia, los iconos y los slots del toggle."
    @apply="applyCode"
    @reset="reset"
  >
    <template #preview>
      <div class="grid min-h-48 place-items-center px-8 py-6">
        <div class="grid justify-items-center gap-3">
          <component :is="Preview" v-if="Preview" :key="previewKey" />
          <p v-if="eventLog" class="text-sm text-muted-foreground">{{ eventLog }}</p>
        </div>
      </div>
    </template>

    <template #controls>
      <div class="grid gap-5">
        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Props</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.value" type="checkbox" /> Activado</label
          ><label class="grid gap-1 text-xs"
            >Label<input
              v-model="state.label"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="grid gap-1 text-xs"
            >Icon
            <select v-model="state.icon" class="rounded-md border bg-background px-3 py-2 text-sm">
              <option v-for="icon in icons" :key="icon" :value="icon">
                {{ icon || 'Ninguno' }}
              </option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Trailing icon
            <select
              v-model="state.trailingIcon"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option v-for="icon in icons" :key="icon" :value="icon">
                {{ icon || 'Ninguno' }}
              </option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Variant
            <select
              v-model="state.variant"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="outline">outline</option>
              <option value="plain">plain</option>
            </select>
          </label>
          <label class="grid gap-1 text-xs"
            >Severity
            <select
              v-model="state.severity"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option
                v-for="severity in [
                  'default',
                  'primary',
                  'secondary',
                  'warning',
                  'success',
                  'error',
                ]"
                :key="severity"
              >
                {{ severity }}
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
            >Color<input
              v-model="state.color"
              placeholder="#2563eb"
              class="rounded-md border bg-background px-3 py-2 text-sm"
          /></label>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.disabled" type="checkbox" /> Disabled</label
          >
        </fieldset>

        <fieldset class="grid gap-3">
          <legend class="mb-1 text-sm font-semibold">Slots y atributos</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="state.defaultSlot" type="checkbox" /> default</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.leadingSlot" type="checkbox" /> leading</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.trailingSlot" type="checkbox" /> trailing</label
          ><label class="flex items-center gap-2 text-sm"
            ><input v-model="state.attrs" type="checkbox" /> Atributos HTML</label
          >
        </fieldset>
      </div>
    </template>
  </ComponentPlayground>
</template>
