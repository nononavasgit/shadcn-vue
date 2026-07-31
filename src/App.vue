<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { ProgressCircular } from '@/components/ui/ProgressCircular'
import {
  ToggleGroup,
  type ToggleGroupItem,
  type ToggleGroupValue,
} from '@/components/ui/ToggleGroup'

const alignment = ref<ToggleGroupValue>('center')
const formats = ref<ToggleGroupValue[]>(['bold'])
const view = ref<ToggleGroupValue>('list')
const customSelection = ref<ToggleGroupValue[]>(['grid'])
const progress = ref(64)

const alignmentItems: ToggleGroupItem[] = [
  { id: 'left', value: 'left', label: 'Izquierda', icon: 'chevronLeft' },
  { id: 'center', value: 'center', label: 'Centro', icon: 'minus' },
  { id: 'right', value: 'right', label: 'Derecha', icon: 'chevronRight' },
]

const formatItems: ToggleGroupItem[] = [
  { id: 'bold', value: 'bold', label: 'Negrita' },
  { id: 'italic', value: 'italic', label: 'Cursiva' },
  { id: 'underline', value: 'underline', label: 'Subrayado' },
]

const viewItems: ToggleGroupItem[] = [
  { id: 'list', value: 'list', label: 'Lista', icon: 'minus' },
  { id: 'grid', value: 'grid', label: 'Cuadrícula', icon: 'check' },
  { id: 'detail', value: 'detail', label: 'Detalle', icon: 'info', disabled: true },
]
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">ToggleGroup y ProgressCircular</h1>
      <p class="text-muted-foreground">
        Ejemplos de selección, UI contextual y progreso SVG normalizado.
      </p>
    </header>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Selección única</h2>
        <p class="text-sm text-muted-foreground">Valor actual: {{ alignment }}.</p>
      </div>

      <div class="flex flex-wrap gap-4">
        <ToggleGroup v-model="alignment" mandatory :items="alignmentItems" />
        <ToggleGroup
          default-value="left"
          variant="outline"
          severity="primary"
          :items="alignmentItems"
        />
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Selección múltiple</h2>
        <p class="text-sm text-muted-foreground">Valores: {{ formats.join(', ') || 'ninguno' }}.</p>
      </div>

      <ToggleGroup
        v-model="formats"
        type="multiple"
        variant="outline"
        :spacing="2"
        :items="formatItems"
      />
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Orientación y tamaños</h2>
        <p class="text-sm text-muted-foreground">Incluye un item deshabilitado.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <ToggleGroup
          v-model="view"
          orientation="vertical"
          variant="outline"
          class="w-48"
          :items="viewItems"
        />

        <div class="flex flex-wrap items-start gap-3">
          <ToggleGroup
            v-for="size in ['xs', 'sm', 'md', 'lg'] as const"
            :key="size"
            default-value="center"
            :size="size"
            variant="outline"
            :items="alignmentItems"
          />
        </div>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">UI contextual y slots</h2>
        <p class="text-sm text-muted-foreground">
          Item, icon, label y trailingIcon se normalizan para cada contexto.
        </p>
      </div>

      <ToggleGroup
        v-model="customSelection"
        type="multiple"
        color="#7c3aed"
        variant="outline"
        :spacing="2"
        :items="viewItems"
        :ui="{
          root: { class: 'rounded-xl bg-primary/5 p-2' },
          item: ({ selected }) => ({
            class: selected ? 'ring-2 ring-primary/30' : 'opacity-80',
            title: selected ? 'Elemento seleccionado' : 'Seleccionar elemento',
          }),
          icon: ({ selected }) => ({ class: selected ? 'scale-110' : '' }),
          label: ({ selected }) => ({ class: selected ? 'font-bold' : '' }),
          trailingIcon: { class: 'opacity-60' },
        }"
      >
        <template #trailing="{ selected }">
          <span class="text-[10px]">{{ selected ? 'ON' : 'OFF' }}</span>
        </template>

        <template #leading-grid>
          <span class="text-xs">#</span>
        </template>
      </ToggleGroup>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">ProgressCircular dinámico</h2>
        <p class="text-sm text-muted-foreground">Progreso actual: {{ progress }}%.</p>
      </div>

      <div class="flex flex-wrap items-center gap-8">
        <ProgressCircular
          :value="progress"
          :label="`${progress}%`"
          aria-label="Progreso dinámico"
        />

        <div class="flex flex-wrap gap-2">
          <Button
            label="Restar 10"
            variant="outline"
            @click="progress = Math.max(0, progress - 10)"
          />
          <Button label="Sumar 10" @click="progress = Math.min(100, progress + 10)" />
          <Button label="Reiniciar" variant="plain" @click="progress = 0" />
        </div>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Tamaños, grosor y colores</h2>
      </div>

      <div class="flex flex-wrap items-end gap-8">
        <ProgressCircular :value="25" :size="56" :thickness="6" label="25%" />
        <ProgressCircular
          :value="50"
          :size="80"
          :thickness="8"
          label="50%"
          color="#2563eb"
          track-color="#dbeafe"
        />
        <ProgressCircular
          :value="75"
          :size="112"
          :thickness="10"
          label="75%"
          color="#16a34a"
          track-color="#dcfce7"
        />
        <ProgressCircular :value="90" size="9rem" :thickness="12" label="90%" color="#ea580c" />
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slot y UI SVG</h2>
        <p class="text-sm text-muted-foreground">
          Svg, track e indicator utilizan SVGAttributes normalizados.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-10">
        <ProgressCircular
          :value="68"
          :size="128"
          :thickness="9"
          color="#7c3aed"
          :ui="{
            root: { class: 'rounded-full bg-violet-500/5 shadow-lg' },
            svg: { class: 'size-full -rotate-90 drop-shadow-md' },
            track: { class: 'stroke-violet-200' },
            indicator: {
              class: 'stroke-violet-600',
              strokeLinecap: 'butt',
            },
            label: { class: 'text-violet-700' },
          }"
          aria-label="Progreso personalizado"
        >
          <template #label="{ percentage }">
            <div class="flex flex-col items-center leading-none">
              <span class="text-xl font-bold">{{ Math.round(percentage) }}%</span>
              <span class="mt-1 text-[10px] font-normal">completado</span>
            </div>
          </template>
        </ProgressCircular>

        <ProgressCircular
          :value="null"
          :size="96"
          :thickness="7"
          label="…"
          aria-label="Procesando"
        />
      </div>
    </section>
  </main>
</template>
