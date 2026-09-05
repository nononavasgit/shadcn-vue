<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import DocsHeader from './DocsHeader.vue'
import ApiTable, { type ApiTableRow } from './docs/ApiTable.vue'
import ComponentApiExamples from './docs/ComponentApiExamples.vue'
import { apiRegistryKey, type ApiRegistry } from './docs/apiRegistry'
import type { ComponentMeta } from '../config/components'

const route = useRoute()
const component = computed(() => route.meta.component as ComponentMeta | undefined)
const apiRegistry: ApiRegistry = {
  props: ref([]),
  emits: ref([]),
  slots: ref([]),
}

provide(apiRegistryKey, apiRegistry)

const importPath = computed(() => {
  if (!component.value) return ''

  const folder =
    component.value.slug === 'kbd-group'
      ? 'Kbd'
      : component.value.slug
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('')

  return '@nononavas/shadcn-vue/components/ui/' + folder
})

const installationRows = computed<ApiTableRow[]>(() => {
  if (!component.value) return []

  return [
    {
      name: 'Importación',
      type: 'import { ' + component.value.title + " } from '" + importPath.value + "'",
      description: 'Importa el componente desde su entrada pública.',
    },
  ]
})
</script>

<template>
  <div>
    <div class="px-4 pt-4 sm:px-8">
      <div class="mx-auto max-w-5xl">
        <DocsHeader />
      </div>
    </div>

    <div v-if="component" class="mx-auto max-w-5xl px-4 pt-6 sm:px-8">
      <ApiTable
        title="Instalación"
        :rows="installationRows"
        :show-default="false"
        empty-text="No hay instrucciones de instalación."
      />
    </div>

    <slot />

    <ComponentApiExamples
      v-if="
        component &&
        ![
          'linear-chart',
          'toast',
          'icon',
          'badge',
          'button',
          'avatar',
          'separator',
          'alert',
          'chip',
          'button-group',
          'card',
          'checkbox',
          'aspect-ratio',
          'empty',
          'field-set',
          'input',
          'loading',
          'scroll-area',
          'ribbon',
          'search',
          'switch',
          'slider',
          'splitter',
          'tabs',
          'textarea',
          'progress',
        ].includes(component.slug)
      "
      :component-name="component.title"
      :import-path="importPath"
    />
  </div>
</template>
