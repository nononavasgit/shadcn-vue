<script setup lang="ts">
import { ref } from 'vue'
import {
  ToggleGroup,
  type ToggleGroupItem as ToggleGroupItemData,
  type ToggleGroupValue,
} from '@/components/app/ToggleGroup'

const alignmentItems: ToggleGroupItemData[] = [
  { id: 'left', value: 'left', label: 'Izquierda', icon: 'chevronLeft' },
  { id: 'center', value: 'center', label: 'Centro', icon: 'minus' },
  { id: 'right', value: 'right', label: 'Derecha', icon: 'chevronRight' },
]

const formatItems: ToggleGroupItemData[] = [
  { id: 'bold', value: 'bold', label: 'Negrita' },
  { id: 'italic', value: 'italic', label: 'Cursiva' },
  { id: 'underline', value: 'underline', label: 'Subrayado' },
]

const viewItems: ToggleGroupItemData[] = [
  { id: 'list', value: 'list', label: 'Lista' },
  { id: 'grid', value: 'grid', label: 'Cuadrícula' },
  { id: 'detail', value: 'detail', label: 'Detalle', disabled: true },
]

const variants = ['plain', 'outline'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const
const severities = ['default', 'primary', 'secondary', 'warning', 'success', 'error'] as const

const alignment = ref<ToggleGroupValue>('center')
const formats = ref<ToggleGroupValue[]>(['bold', 'underline'])
const verticalValue = ref<ToggleGroupValue>('list')
const customValue = ref<ToggleGroupValue[]>(['list'])
</script>

<template>
  <main class="mx-auto min-h-screen max-w-6xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">ToggleGroup</h1>
      <p class="max-w-3xl text-muted-foreground">
        Ejemplos de selección única y múltiple con las variantes plain y outline.
      </p>
    </header>

    <section class="grid gap-6 rounded-xl border p-5 md:grid-cols-2">
      <div class="space-y-3">
        <div>
          <h2 class="text-lg font-semibold">Selección única</h2>
          <p class="text-sm text-muted-foreground">Valor: {{ alignment }}</p>
        </div>

        <ToggleGroup v-model="alignment" mandatory disabled :items="alignmentItems" />
      </div>

      <div class="space-y-3">
        <div>
          <h2 class="text-lg font-semibold">Selección múltiple</h2>
          <p class="text-sm text-muted-foreground">
            Valores: {{ formats.join(', ') || 'ninguno' }}
          </p>
        </div>

        <ToggleGroup
          v-model="formats"
          type="multiple"
          disabled
          variant="outline"
          :items="formatItems"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Variantes y separación</h2>
        <p class="text-sm text-muted-foreground">
          Con spacing 0 los elementos permanecen unidos; con spacing mayor se separan.
        </p>
      </div>

      <div v-for="(variant, index) in variants" :key="variant" class="flex flex-wrap gap-4">
        <span class="w-16 self-center text-sm font-medium">{{ variant }}</span>
        <ToggleGroup
          :default-value="index === 0 ? 'center' : 'left'"
          :variant="variant"
          :spacing="index * 2"
          :items="alignmentItems"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Tamaños</h2>
        <p class="text-sm text-muted-foreground">Los cuatro tamaños heredados de Toggle.</p>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <ToggleGroup
          v-for="size in sizes"
          :key="size"
          default-value="center"
          variant="outline"
          :size="size"
          :items="alignmentItems"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Severidades</h2>
        <p class="text-sm text-muted-foreground">Cada severidad funciona en plain y outline.</p>
      </div>

      <div v-for="severity in severities" :key="severity" class="flex flex-wrap items-center gap-4">
        <span class="w-20 text-sm font-medium">{{ severity }}</span>
        <ToggleGroup
          v-for="variant in variants"
          :key="variant"
          default-value="center"
          :variant="variant"
          :severity="severity"
          :items="alignmentItems"
        />
      </div>
    </section>

    <section class="grid gap-6 rounded-xl border p-5 md:grid-cols-2">
      <div class="space-y-3">
        <div>
          <h2 class="text-lg font-semibold">Orientación vertical</h2>
          <p class="text-sm text-muted-foreground">Incluye un elemento deshabilitado.</p>
        </div>

        <ToggleGroup
          v-model="verticalValue"
          orientation="vertical"
          variant="outline"
          :items="viewItems"
        />
      </div>

      <div class="space-y-3">
        <div>
          <h2 class="text-lg font-semibold">Color y slots</h2>
          <p class="text-sm text-muted-foreground">
            Slot individual para grid e indicador global al final.
          </p>
        </div>

        <ToggleGroup
          v-model="customValue"
          type="multiple"
          color="#7c3aed"
          variant="outline"
          :spacing="2"
          :items="viewItems"
        >
          <template #leading-grid>
            <span aria-hidden="true" class="font-mono text-xs">#</span>
          </template>

          <template #trailing="{ selected }">
            <span v-if="selected" aria-hidden="true" class="text-xs">✓</span>
          </template>
        </ToggleGroup>
      </div>
    </section>
  </main>
</template>
