<script setup lang="ts">
import { compile, defineComponent, markRaw, ref, shallowRef, watch } from 'vue'
import { Collapsible } from '@/components/ui/Collapsible'
import ComponentPlayground from '../../ComponentPlayground.vue'

const open = ref(false)
const disabled = ref(false)
const unmountOnHide = ref(false)
const ui = ref(false)
const eventLog = ref('')
const code = ref(`<Collapsible v-model:open="open">
  <template #default="{ open }"><button class="rounded-md bg-primary px-3 py-2 text-primary-foreground">{{ open ? 'Ocultar' : 'Mostrar' }} detalles</button></template>
  <template #content><p class="pt-2 text-sm text-muted-foreground">Contenido expandible.</p></template>
</Collapsible>`)
const appliedCode = ref(code.value)
const editorError = ref('')
const previewKey = ref(0)
const Preview = shallowRef()

function generateCode() {
  return `<Collapsible v-model:open="open" :disabled="${disabled.value}" :unmount-on-hide="${unmountOnHide.value}"${ui.value ? ' :ui="{ trigger: () => ({ class: \'text-primary\' }) }"' : ''}>
  <template #default="{ open }"><button class="rounded-md bg-primary px-3 py-2 text-primary-foreground">{{ open ? 'Ocultar' : 'Mostrar' }} detalles</button></template>
  <template #content><p class="pt-2 text-sm text-muted-foreground">Contenido expandible.</p></template>
</Collapsible>`
}

function handleOpen(value: boolean) {
  open.value = value
  eventLog.value = `update:open: ${value}`
}

function applyCode() {
  editorError.value = ''
  try {
    const render = compile(
      code.value
        .replace(/<Collapsible(?=[\s/>])/g, '<PlaygroundCollapsible')
        .replaceAll('</Collapsible>', '</PlaygroundCollapsible>'),
    )
    Preview.value = markRaw(
      defineComponent({
        name: 'CollapsiblePlaygroundPreview',
        components: { PlaygroundCollapsible: Collapsible },
        setup: () => ({ open, disabled, unmountOnHide, ui, handleOpen }),
        render,
      }),
    )
    appliedCode.value = code.value
    previewKey.value++
  } catch (error) {
    editorError.value = error instanceof Error ? error.message : String(error)
  }
}

watch([open, disabled, unmountOnHide, ui], () => {
  code.value = generateCode()
})
</script>
<template>
  <ComponentPlayground
    v-model:code="code"
    :applied-code="appliedCode"
    :error="editorError"
    filename="CollapsiblePlayground.vue"
    description="Prueba el estado controlado, el trigger y el contenido del panel."
    @apply="applyCode"
  >
    <template #preview>
      <div class="grid gap-3">
        <component :is="Preview" v-if="Preview" :key="previewKey" />
        <Collapsible
          v-else
          :open="open"
          :disabled="disabled"
          :unmount-on-hide="unmountOnHide"
          :ui="
            ui
              ? {
                  trigger: () => ({ class: 'text-primary' }),
                }
              : undefined
          "
          class="grid gap-2"
          @update:open="handleOpen"
        >
          <template #default="{ open: value }">
            <button class="rounded-md bg-primary px-3 py-2 text-primary-foreground">
              {{ value ? 'Ocultar' : 'Mostrar' }} detalles
            </button>
          </template>
          <template #content>
            <p class="pt-2 text-sm text-muted-foreground">Contenido expandible.</p>
          </template>
        </Collapsible>
        <p class="text-xs text-muted-foreground">{{ eventLog || 'Sin eventos' }}</p>
      </div>
    </template>
    <template #controls>
      <div class="grid gap-4">
        <fieldset class="grid gap-2">
          <legend class="text-sm font-semibold">Props</legend>
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="open" type="checkbox" /> open</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="disabled" type="checkbox" /> disabled</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="unmountOnHide" type="checkbox" /> unmountOnHide</label
          >
          <label class="flex items-center gap-2 text-sm"
            ><input v-model="ui" type="checkbox" /> ui personalizada</label
          >
        </fieldset>
        <p class="text-xs text-muted-foreground">Emit: <code>update:open</code></p>
      </div>
    </template>
  </ComponentPlayground>
</template>
