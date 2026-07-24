<script setup lang="ts">
import { ref } from 'vue'
import { ProgressCircular } from '@/components/app/ProgressCircular'

const progress = ref(42)
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-3xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">ProgressCircular</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Indicadores circulares accesibles con tamaños, colores y contenido personalizable.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">
            GetValueLabel proporciona el nombre accesible y label muestra el valor en el centro.
          </p>
        </div>

        <ProgressCircular :value="35" :get-value-label="() => 'Progreso de descarga'" label="35%" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Tamaños</h2>
          <p class="text-sm text-muted-foreground">
            Size admite números en píxeles o cualquier unidad CSS.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-6">
          <ProgressCircular
            :value="25"
            :size="48"
            :stroke-width="10"
            :get-value-label="() => 'Progreso pequeño'"
            label="25%"
            :ui="{ label: { class: 'text-xs' } }"
          />
          <ProgressCircular
            :value="50"
            :size="80"
            :get-value-label="() => 'Progreso mediano'"
            label="50%"
          />
          <ProgressCircular
            :value="75"
            size="7rem"
            :get-value-label="() => 'Progreso grande'"
            label="75%"
            :ui="{ label: { class: 'text-lg' } }"
          />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Colores y grosor</h2>
          <p class="text-sm text-muted-foreground">
            Color modifica el indicador y strokeWidth controla el grosor del círculo.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-6">
          <ProgressCircular
            :value="70"
            color="#7c3aed"
            track-color="#ddd6fe"
            :get-value-label="() => 'Progreso violeta'"
            label="70%"
          />
          <ProgressCircular
            :value="55"
            color="#16a34a"
            :stroke-width="12"
            :get-value-label="() => 'Progreso verde'"
            label="55%"
          />
          <ProgressCircular
            :value="40"
            color="#ea580c"
            :stroke-width="4"
            :get-value-label="() => 'Progreso naranja'"
            label="40%"
          />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Progreso reactivo</h2>
          <p class="text-sm text-muted-foreground">
            El círculo y su texto visual se actualizan al mover el control.
          </p>
        </div>

        <div class="flex items-center gap-6">
          <ProgressCircular
            :value="progress"
            :size="112"
            :get-value-label="() => 'Progreso seleccionado'"
            :label="`${progress}%`"
            :get-value-text="(value) => `${value}% completado`"
          />

          <input
            v-model.number="progress"
            type="range"
            min="0"
            max="100"
            class="min-w-0 flex-1 accent-primary"
          />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Max y slot label</h2>
          <p class="text-sm text-muted-foreground">
            El slot recibe value, max y percentage para personalizar el centro.
          </p>
        </div>

        <ProgressCircular
          :value="3"
          :max="5"
          :size="112"
          :get-value-label="() => 'Tareas completadas'"
        >
          <template #label="{ value, max, percentage }">
            <span class="flex flex-col leading-tight">
              <strong>{{ value }}/{{ max }}</strong>
              <small class="text-muted-foreground">{{ Math.round(percentage) }}%</small>
            </span>
          </template>
        </ProgressCircular>
      </section>

      <section class="space-y-4">
        <div>
          <h2 id="upload-progress-label" class="text-lg font-semibold">
            Nombre mediante aria-labelledby
          </h2>
          <p class="text-sm text-muted-foreground">
            Cuando ya existe un texto visible, puede utilizarse como nombre accesible.
          </p>
        </div>

        <ProgressCircular :value="82" label="82%" aria-labelledby="upload-progress-label" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Indeterminado</h2>
          <p class="text-sm text-muted-foreground">
            Value null elimina aria-valuenow cuando todavía no se conoce el progreso.
          </p>
        </div>

        <ProgressCircular
          :value="null"
          :size="96"
          :get-value-label="() => 'Preparación del archivo'"
          label="Preparando…"
          :ui="{ label: { class: 'text-xs' } }"
        />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Custom UI</h2>
          <p class="text-sm text-muted-foreground">
            Cada parte del SVG puede personalizarse mediante ui.
          </p>
        </div>

        <ProgressCircular
          :value="64"
          :size="128"
          :stroke-width="6"
          :get-value-label="() => 'Perfil completado'"
          label="64%"
          :ui="{
            root: { class: 'rounded-full bg-muted/40 p-3 shadow-sm' },
            track: { class: 'stroke-secondary/60' },
            indicator: { class: 'stroke-success' },
            label: { class: 'text-xl font-bold text-success' },
          }"
        />
      </section>
    </div>
  </main>
</template>
