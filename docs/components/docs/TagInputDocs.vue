<script setup lang="ts">
import { tagInputDefaults } from '@/components/ui/TagInput'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'TagInputValue[] | null',
    default: 'undefined',
    description: 'Valores controlados mediante v-model:value.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'undefined',
    description: 'Texto de ayuda del campo de entrada.',
  },
  {
    name: 'delimiter',
    type: 'string | RegExp',
    default: `'${tagInputDefaults.delimiter}'`,
    description: 'Carácter o expresión que confirma una nueva etiqueta y separa el pegado.',
  },
  {
    name: 'max',
    type: 'number',
    default: String(tagInputDefaults.max),
    description: 'Número máximo de etiquetas. Cero significa sin límite.',
  },
  {
    name: 'duplicate',
    type: 'boolean',
    default: String(tagInputDefaults.duplicate),
    description: 'Permite repetir una etiqueta existente.',
  },
  {
    name: 'addOnPaste',
    type: 'boolean',
    default: String(tagInputDefaults.addOnPaste),
    description: 'Añade etiquetas separadas al pegar texto.',
  },
  {
    name: 'addOnTab',
    type: 'boolean',
    default: String(tagInputDefaults.addOnTab),
    description: 'Añade la etiqueta actual al pulsar Tab.',
  },
  {
    name: 'addOnBlur',
    type: 'boolean',
    default: String(tagInputDefaults.addOnBlur),
    description: 'Añade la etiqueta actual al perder el foco.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: String(tagInputDefaults.disabled),
    description: 'Impide la interacción con el campo y sus etiquetas.',
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: String(tagInputDefaults.clearable),
    description: 'Muestra un botón para eliminar todas las etiquetas.',
  },
  {
    name: 'displayValue',
    type: '(value: TagInputValue) => string',
    default: 'value.toString()',
    description: 'Transforma el valor en el texto visible de la etiqueta.',
  },
  {
    name: 'convertValue',
    type: '(value: string) => TagInputValue',
    default: 'undefined',
    description: 'Convierte el texto introducido a otro tipo de valor.',
  },
  {
    name: 'ui',
    type: 'TagInputUI',
    typeParts: [
      { text: '{ root?: () => HTMLAttributes; tagItem?: (context: ' },
      { text: 'TagInputTagContext', link: '#tag-input-tag-context' },
      { text: ') => HTMLAttributes; tagItemText?: (context: ' },
      { text: 'TagInputTagContext', link: '#tag-input-tag-context' },
      { text: ') => HTMLAttributes; tagItemDelete?: (context: ' },
      { text: 'TagInputTagContext', link: '#tag-input-tag-context' },
      {
        text: ') => HTMLAttributes; tagInput?: () => HTMLAttributes; tagClear?: () => HTMLAttributes }',
      },
    ],
    default: 'undefined',
    description: 'Personaliza los atributos HTML de cada nodo visual.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: TagInputValue[]]',
    default: '-',
    description: 'Actualiza el array controlado mediante v-model:value.',
  },
  {
    name: 'addTag',
    type: '[value: TagInputValue]',
    default: '-',
    description: 'Se emite cuando se añade una etiqueta.',
  },
  {
    name: 'removeTag',
    type: '[value: TagInputValue]',
    default: '-',
    description: 'Se emite cuando se elimina una etiqueta.',
  },
  {
    name: 'invalid',
    type: '[value: TagInputValue]',
    default: '-',
    description: 'Se emite cuando el valor no puede añadirse.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'tag',
    type: 'TagInputTagContext',
    typeLink: '#tag-input-tag-context',
    description: 'Personaliza el contenido visible de cada etiqueta.',
  },
  {
    name: 'clear',
    type: '-',
    default: 'Icon x',
    description: 'Sustituye el icono del botón para limpiar todas las etiquetas.',
  },
]

const contextRows: ApiTableRow[] = [
  { name: 'value', type: 'TagInputValue', description: 'Valor de la etiqueta actual.' },
  { name: 'index', type: 'number', description: 'Índice de la etiqueta actual.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">TagInput</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Campo accesible para introducir, navegar y eliminar varias etiquetas con teclado.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable id="tag-input-tag-context" title="TagInputTagContext" :rows="contextRows" />
      <ApiTable title="Expose" :rows="[]" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
