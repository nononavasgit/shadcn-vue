<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { Tree, type TreeItem, type TreeProps } from '@/components/ui/Tree'
import Example from '../../Example.vue'

const items: TreeItem[] = [
  {
    value: 'src',
    label: 'src',
    icon: { name: 'folder' },
    children: [
      {
        value: 'components',
        label: 'components',
        icon: { name: 'folder' },
        children: [
          { value: 'tree-vue', label: 'Tree.vue' },
          { value: 'tree-index', label: 'index.ts' },
        ],
      },
      { value: 'app-vue', label: 'App.vue' },
    ],
  },
  { value: 'package-json', label: 'package.json' },
  { value: 'readme', label: 'README.md', disabled: true },
]

const selected = ref<string | number>()
const expanded = ref<TreeProps['expanded']>(['src'])
const multipleSelected = ref<TreeProps['value']>(['components', 'package-json'])
const checked = ref<TreeProps['value']>([])

const customItems = [
  {
    value: 'workspace',
    label: 'Workspace',
    directories: [{ value: 'docs', label: 'Docs' }],
    files: [{ value: 'config', label: 'config.ts' }],
  },
]

type CustomTreeItem = (typeof customItems)[number]

const getCustomChildren = (item: CustomTreeItem) =>
  item.directories && item.files
    ? [...item.directories, ...item.files]
    : (item.directories ?? item.files)

const customUi: TreeProps['ui'] = {
  item: ({ selected }) => ({ class: selected ? 'ring-1 ring-primary' : undefined }),
  label: ({ level }) => ({ class: level > 1 ? 'text-muted-foreground' : 'font-semibold' }),
}

const basicCode = `<Tree
  v-model:value="selected"
  v-model:expanded="expanded"
  :items="items"
/>`

const multipleCode = `<Tree
  v-model:value="selected"
  :items="items"
  multiple
/>`

const checkboxCode = `<Tree
  v-model:value="checked"
  :items="items"
  multiple
  propagate-select
  bubble-select
  checkbox
</Tree>`

const customCode = `<Tree
  :items="items"
  :get-children="getCustomChildren"
/>`

const virtualItems: TreeItem[] = Array.from({ length: 100 }, (_, index) => ({
  value: `file-${index + 1}`,
  label: `Documento ${index + 1}.md`,
}))

const virtualCode = `<Tree
  :items="items"
  virtual
  :virtualizer="{ estimateSize: 32, overscan: 8 }"
/>`

const slotsCode = `<Tree :items="items" :ui="ui">
  <template #leading="{ item }">
    <Icon :name="item.value === 'src' ? 'folder' : 'file'" />
  </template>
  <template #label-src="{ item }">
    {{ item.label }} (raíz)
  </template>
</Tree>`

const attrsCode = `<Tree
  :items="items"
  class="rounded-lg border p-2"
  aria-label="Archivos del proyecto"
/>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Selección, expansión, checkboxes, slots contextuales y árboles grandes.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Árbol básico controlado"
        description="La selección y expansión se controlan con modelos separados."
        :code="basicCode"
      >
        <Tree v-model:value="selected" v-model:expanded="expanded" :items="items" />
        <output class="text-sm text-muted-foreground"
          >Seleccionado: {{ selected ?? 'ninguno' }}</output
        >
      </Example>

      <Example
        title="Selección múltiple"
        description="multiple permite mantener varios IDs seleccionados."
        :code="multipleCode"
      >
        <Tree v-model:value="multipleSelected" :items="items" multiple />
        <output class="text-sm text-muted-foreground">Seleccionados: {{ multipleSelected }}</output>
      </Example>

      <Example
        title="Checkboxes"
        description="propagateSelect y bubbleSelect mantienen el estado de los descendientes y padres."
        :code="checkboxCode"
        class="md:col-span-2"
      >
        <Tree
          v-model:value="checked"
          :items="items"
          multiple
          propagate-select
          bubble-select
          checkbox
        />
        <output class="text-sm text-muted-foreground">IDs: {{ checked }}</output>
      </Example>

      <Example
        title="Esquema personalizado"
        description="getChildren puede combinar directorios y archivos desde otras propiedades."
        :code="customCode"
      >
        <Tree :items="customItems" :get-children="getCustomChildren" />
      </Example>

      <Example
        title="Lista virtual"
        description="virtual renderiza únicamente los nodos visibles de una lista larga."
        :code="virtualCode"
      >
        <Tree
          :items="virtualItems"
          virtual
          :virtualizer="{ estimateSize: 32, overscan: 8 }"
          class="max-h-64 overflow-auto"
        />
      </Example>

      <Example
        title="Slots y UI"
        description="Los slots dinámicos y los resolvers UI reciben el contexto de cada nodo."
        :code="slotsCode"
      >
        <Tree :items="items" :ui="customUi">
          <template #leading="{ item }">
            <Icon :name="item.children ? 'folder' : 'file'" class="size-4" />
          </template>
          <template #label-src="{ item }">{{ item.label }} (raíz)</template>
        </Tree>
      </Example>

      <Example
        title="Atributos y disabled"
        description="Los atributos externos llegan al root y un nodo puede deshabilitarse individualmente."
        :code="attrsCode"
        class="md:col-span-2"
      >
        <Tree :items="items" class="rounded-lg border p-2" aria-label="Archivos del proyecto" />
      </Example>
    </div>
  </section>
</template>
