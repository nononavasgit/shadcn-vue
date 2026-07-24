<script setup lang="ts">
import { Time } from '@/components/app/Time'
import { useDate } from '@/composables'

const exampleDate = '2026-07-24T18:30:00Z'
const { formatDate } = useDate()

const shortDate = formatDate(exampleDate, {
  locale: 'es-ES',
  format: {
    dateStyle: 'short',
  },
})
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-4xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Time</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Ejemplos de fechas localizadas mediante el componente Time y el composable useDate.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Formato básico</h2>
          <p class="text-sm text-muted-foreground">Fecha completa localizada en español.</p>
        </div>

        <Time
          :datetime="exampleDate"
          locale="es-ES"
          :format="{
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }"
          class="font-medium"
        />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Fecha y hora</h2>
          <p class="text-sm text-muted-foreground">
            El formato puede incluir las partes de hora necesarias.
          </p>
        </div>

        <Time
          :datetime="exampleDate"
          locale="es-ES"
          :format="{
            dateStyle: 'long',
            timeStyle: 'short',
          }"
        />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Locales</h2>
          <p class="text-sm text-muted-foreground">
            Una misma fecha se representa según el locale indicado.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <div
            v-for="locale in ['es-ES', 'en-US', 'ja-JP']"
            :key="locale"
            class="rounded-lg border p-4"
          >
            <p class="mb-2 text-xs font-medium text-muted-foreground">{{ locale }}</p>
            <Time
              :datetime="exampleDate"
              :locale="locale"
              :format="{
                dateStyle: 'medium',
              }"
            />
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Slot personalizado</h2>
          <p class="text-sm text-muted-foreground">
            El slot recibe la fecha ya formateada mediante la propiedad date.
          </p>
        </div>

        <Time
          v-slot="{ date }"
          :datetime="exampleDate"
          locale="es-ES"
          :format="{
            day: 'numeric',
            month: 'long',
          }"
          class="inline-flex rounded-full bg-muted px-3 py-1 text-sm"
        >
          Publicado el {{ date }}
        </Time>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Composable</h2>
          <p class="text-sm text-muted-foreground">
            useDate también permite formatear fechas fuera del template.
          </p>
        </div>

        <code class="inline-flex rounded-md bg-muted px-3 py-2 text-sm">{{ shortDate }}</code>
      </section>
    </div>
  </main>
</template>
