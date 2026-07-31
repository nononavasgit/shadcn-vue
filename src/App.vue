<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Progress } from '@/components/ui/Progress'

const uploadProgress = ref(42)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-4xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Label y Progress</h1>
      <p class="text-muted-foreground">
        Ejemplos de asociación de campos, accesibilidad, estados y personalización mediante ui.
      </p>
    </header>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Label básico</h2>
        <p class="text-sm text-muted-foreground">Asociación explícita mediante la prop for.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <Label for="name">Nombre</Label>
          <input
            id="name"
            placeholder="Escribe tu nombre"
            class="h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div class="space-y-2">
          <Label for="email">
            Correo electrónico
            <span class="text-error" aria-hidden="true">*</span>
          </Label>
          <input
            id="email"
            type="email"
            required
            placeholder="nombre@ejemplo.com"
            class="h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Label personalizado</h2>
        <p class="text-sm text-muted-foreground">Atributos HTML normalizados mediante ui.root.</p>
      </div>

      <div class="space-y-5">
        <div class="space-y-2">
          <Label
            for="custom-field"
            :ui="{
              root: {
                class: 'text-base font-bold text-primary',
                title: 'Etiqueta personalizada',
              },
            }"
          >
            Campo personalizado
          </Label>
          <input
            id="custom-field"
            class="h-9 w-full rounded-md border border-primary/40 bg-primary/5 px-3 text-sm outline-none"
          />
        </div>

        <Label as-child>
          <label class="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
            <input type="checkbox" />
            <span>
              <span class="block font-medium">Aceptar condiciones</span>
              <span class="block text-sm text-muted-foreground">
                Label utiliza el elemento hijo como raíz.
              </span>
            </span>
          </label>
        </Label>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Progress básico</h2>
        <p class="text-sm text-muted-foreground">Carga actual: {{ uploadProgress }}%.</p>
      </div>

      <Progress
        :value="uploadProgress"
        :label="`${uploadProgress}%`"
        aria-label="Progreso de carga"
      />

      <div class="flex flex-wrap gap-2">
        <Button
          label="Restar 10"
          variant="outline"
          @click="uploadProgress = Math.max(0, uploadProgress - 10)"
        />
        <Button label="Sumar 10" @click="uploadProgress = Math.min(100, uploadProgress + 10)" />
        <Button label="Reiniciar" variant="plain" @click="uploadProgress = 0" />
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Valores y colores</h2>
        <p class="text-sm text-muted-foreground">Diferentes valores máximos y colores.</p>
      </div>

      <div class="space-y-5">
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span>Predeterminado</span>
            <span>25%</span>
          </div>
          <Progress :value="25" aria-label="Progreso predeterminado" />
        </div>

        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span>Éxito</span>
            <span>75 / 100</span>
          </div>
          <Progress
            :value="75"
            color="#16a34a"
            track-color="#dcfce7"
            aria-label="Progreso correcto"
          />
        </div>

        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span>Escala personalizada</span>
            <span>30 / 50</span>
          </div>
          <Progress
            :value="30"
            :max="50"
            color="#7c3aed"
            :get-value-text="(value, max) => `${value} de ${max} tareas`"
            aria-label="Tareas completadas"
          />
        </div>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Label mediante slot</h2>
        <p class="text-sm text-muted-foreground">El slot recibe value, max y percentage.</p>
      </div>

      <Progress :value="68" color="#2563eb" aria-label="Descarga del archivo">
        <template #label="{ value, max, percentage }">
          Descargando {{ value }} / {{ max }} · {{ Math.round(percentage) }}%
        </template>
      </Progress>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Personalización con ui</h2>
        <p class="text-sm text-muted-foreground">
          Root, indicator y label contienen únicamente HTMLAttributes.
        </p>
      </div>

      <Progress
        :value="82"
        label="82% completado"
        color="#ea580c"
        :ui="{
          root: {
            class: 'h-6 rounded-lg ring-2 ring-orange-500/20',
            title: 'Progreso personalizado',
          },
          indicator: {
            class: 'rounded-lg bg-gradient-to-r from-orange-400 to-orange-600',
          },
          label: {
            class: 'justify-start px-3 text-left font-bold tracking-wide',
          },
        }"
        aria-label="Progreso personalizado"
      />
    </section>

    <section class="space-y-4 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Estado indeterminado</h2>
        <p class="text-sm text-muted-foreground">
          Un valor null indica que todavía no se conoce el progreso.
        </p>
      </div>

      <Progress :value="null" label="Procesando…" aria-label="Procesando contenido" />
    </section>
  </main>
</template>
