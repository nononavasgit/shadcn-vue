<script setup lang="ts">
import { Check, Clipboard } from '@lucide/vue'
import { computed, inject, ref } from 'vue'
import { apiRegistryKey, type ApiTableRow } from './apiRegistry'

const props = defineProps<{
  componentName: string
  importPath: string
}>()

const apiRegistry = inject(apiRegistryKey)
const copiedExample = ref<string>()

const examples = computed(() => {
  if (!apiRegistry) return []

  return [
    ...apiRegistry.props.value.map((row) => createPropExample(row)),
    ...apiRegistry.slots.value.map((row) => createSlotExample(row)),
    ...apiRegistry.emits.value.map((row) => createEmitExample(row)),
  ]
})

function importCode() {
  return 'import { ' + props.componentName + " } from '" + props.importPath + "'"
}

function createPropExample(row: ApiTableRow) {
  const variableName = getVariableName(row.name)
  const value = getVariableDeclaration(row, variableName)

  return {
    id: 'prop-' + row.name,
    kind: 'Prop',
    name: row.name,
    description: row.description,
    code:
      importCode() +
      '\n\n' +
      value +
      '\n\n<' +
      props.componentName +
      ' :' +
      toKebabCase(row.name) +
      '="' +
      variableName +
      '" />',
  }
}

function createSlotExample(row: ApiTableRow) {
  const slotName = getSlotName(row.name)

  return {
    id: 'slot-' + row.name,
    kind: 'Slot',
    name: row.name,
    description: row.description,
    code:
      importCode() +
      '\n\n<' +
      props.componentName +
      '>\n  <template #' +
      slotName +
      '>\n    Contenido del slot ' +
      slotName +
      '\n  </template>\n</' +
      props.componentName +
      '>',
  }
}

function createEmitExample(row: ApiTableRow) {
  const handlerName = 'handle' + toPascalCase(row.name)

  return {
    id: 'emit-' + row.name,
    kind: 'Evento',
    name: row.name,
    description: row.description,
    code:
      importCode() +
      '\n\nfunction ' +
      handlerName +
      '(...args: unknown[]) {\n  console.log(args)\n}\n\n<' +
      props.componentName +
      ' @' +
      row.name +
      '="' +
      handlerName +
      '" />',
  }
}

function getVariableName(name: string) {
  const normalized = name.replace(/[^a-zA-Z0-9_$]/g, '')
  const safeName = normalized || 'value'
  const reservedNames = new Set([
    'await',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'let',
    'new',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield',
  ])

  return reservedNames.has(safeName) ? safeName + 'Value' : safeName
}

function getVariableDeclaration(row: ApiTableRow, variableName: string) {
  const type = row.type.toLowerCase()

  if (row.name === 'items' || type.includes('[]')) {
    return (
      'const ' +
      variableName +
      " = [\n  { label: 'Item 1', value: 'item-1' },\n  { label: 'Item 2', value: 'item-2' },\n]"
    )
  }

  if (row.name === 'ui') {
    return 'const ' + variableName + " = {\n  root: () => ({ class: 'custom-root' }),\n}"
  }

  if (row.name === 'class') return 'const ' + variableName + " = 'custom-component'"
  if (row.name === 'style') return 'const ' + variableName + " = { color: 'var(--primary)' }"
  if (type.includes('boolean')) return 'const ' + variableName + ' = false'
  if (type.includes('number')) return 'const ' + variableName + ' = 1'
  if (type.includes('iconconfig')) {
    return 'const ' + variableName + " = { name: 'info' }"
  }
  if (type.includes('date')) return 'const ' + variableName + ' = new Date()'
  if (type.includes('string') || type.includes("'")) {
    const literal = row.type.match(/'([^']+)'/)?.[1] ?? 'Example'
    return 'const ' + variableName + " = '" + literal + "'"
  }

  return 'const ' + variableName + ' = undefined'
}

function getSlotName(name: string) {
  return (
    name
      .split('/')
      .at(0)
      ?.trim()
      .replace(/\{[^}]+\}/g, '0') || 'default'
  )
}

function toKebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()
}

function toPascalCase(value: string) {
  return value
    .replace(/[^a-zA-Z0-9]+(.)?/g, (_, character) => character?.toUpperCase() ?? '')
    .replace(/^./, (character) => character.toUpperCase())
}

async function copyCode(id: string, code: string) {
  await navigator.clipboard.writeText(code)
  copiedExample.value = id
  window.setTimeout(() => {
    if (copiedExample.value === id) copiedExample.value = undefined
  }, 2000)
}
</script>

<template>
  <section
    v-if="examples.length"
    class="mx-auto grid max-w-5xl gap-4 px-4 pb-8 sm:px-8"
    aria-labelledby="component-api-examples"
  >
    <header class="grid gap-2">
      <h2 id="component-api-examples" class="text-xl font-semibold">
        Ejemplos por propiedad, slot y evento
      </h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo incluye las variables necesarias y se puede copiar directamente.
      </p>
    </header>

    <div class="grid gap-4 md:grid-cols-2">
      <article
        v-for="example in examples"
        :key="example.id"
        class="overflow-hidden rounded-lg border bg-card text-card-foreground"
      >
        <header class="grid gap-1 border-b px-4 py-3">
          <p class="font-mono text-xs text-muted-foreground uppercase">{{ example.kind }}</p>
          <h3 class="font-medium">{{ example.name }}</h3>
          <p class="text-sm text-muted-foreground">{{ example.description }}</p>
        </header>

        <div class="relative bg-muted/40">
          <button
            type="button"
            class="absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-md border bg-background text-foreground"
            :aria-label="copiedExample === example.id ? 'Código copiado' : 'Copiar código'"
            :title="copiedExample === example.id ? 'Copiado' : 'Copiar código'"
            @click="copyCode(example.id, example.code)"
          >
            <Check v-if="copiedExample === example.id" class="size-4" aria-hidden="true" />
            <Clipboard v-else class="size-4" aria-hidden="true" />
          </button>
          <pre class="overflow-x-auto p-4 pr-12 text-sm"><code>{{ example.code }}</code></pre>
        </div>
      </article>
    </div>
  </section>
</template>
