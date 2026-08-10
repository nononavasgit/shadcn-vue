<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Button, FileUpload, Icon, Badge } from '@/components/ui'

const basicFiles = ref<File[]>([])
const documentFiles = ref<File[]>([])
const imageFiles = ref<File[]>([])
const limitedFiles = ref<File[]>([])
const customFiles = ref<File[]>([])
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background text-foreground">
      <div class="mx-auto flex max-w-5xl flex-col gap-10 p-8">
        <header class="space-y-2">
          <h1 class="text-3xl font-bold">Badge</h1>
          <p class="text-muted-foreground">
            Ejemplos de variantes, severidades, tamaños, iconos y personalización.
          </p>
        </header>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Variantes</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Solid" variant="solid" />
            <Badge label="Outline" variant="outline" />
            <Badge label="Plain" variant="plain" />
            <Badge label="Subtle" variant="subtle" />
            <Badge label="Soft" variant="soft" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Severidades</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Primary" severity="primary" />
            <Badge label="Secondary" severity="secondary" />
            <Badge label="Warning" severity="warning" />
            <Badge label="Success" severity="success" />
            <Badge label="Error" severity="error" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Tamaños</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Small" size="sm" />
            <Badge label="Medium" size="md" />
            <Badge label="Large" size="lg" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Iconos</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Completado" icon="check" severity="success" />
            <Badge label="Continuar" trailing-icon="chevronRight" variant="outline" />
            <Badge
              label="Verificado"
              icon="check"
              trailing-icon="chevronRight"
              severity="secondary"
            />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Combinaciones</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Warning outline" severity="warning" variant="outline" />
            <Badge label="Success subtle" severity="success" variant="subtle" />
            <Badge label="Error soft" severity="error" variant="soft" />
            <Badge label="Secondary plain" severity="secondary" variant="plain" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Color personalizado</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Violeta" color="#8b5cf6" />
            <Badge label="Naranja" color="#f97316" variant="outline" />
            <Badge label="Turquesa" color="#14b8a6" variant="soft" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Slots y UI</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge variant="outline">
              <template #leading>
                <span class="size-2 rounded-full bg-success" />
              </template>
              Disponible
            </Badge>

            <Badge
              label="UI personalizada"
              :ui="{
                root: {
                  class: 'border-dashed uppercase tracking-wider',
                  'data-example': 'custom-ui',
                },
              }"
            />
          </div>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
