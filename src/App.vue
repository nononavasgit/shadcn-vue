<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Button, Toast } from '@/components/ui'

const basicOpen = ref(false)
const actionOpen = ref(false)
const customOpen = ref(false)

function undo() {
  actionOpen.value = false
}
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background px-6 py-12 text-foreground">
      <div class="mx-auto grid max-w-4xl gap-8">
        <header class="space-y-2">
          <h1 class="text-3xl font-bold tracking-tight">Toast</h1>
          <p class="text-muted-foreground">
            Ejemplos de notificaciones temporales, acciones y personalización.
          </p>
        </header>

        <section class="grid gap-6 md:grid-cols-3">
          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Básico</h2>
              <p class="text-sm text-muted-foreground">Título, descripción y cierre manual.</p>
            </div>

            <Button label="Mostrar toast" @click="basicOpen = true" />

            <Toast
              v-model:open="basicOpen"
              label="Cambios guardados"
              description="La información se ha actualizado correctamente."
              icon="success"
            />
          </article>

          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Con acción</h2>
              <p class="text-sm text-muted-foreground">Permite ejecutar una acción opcional.</p>
            </div>

            <Button label="Eliminar archivo" severity="error" @click="actionOpen = true" />

            <Toast
              v-model:open="actionOpen"
              :swipe-direction="'left'"
              label="Archivo eliminado"
              description="El archivo se ha movido a la papelera."
              :duration="8000"
              :action-button="{ label: 'Deshacer', onClick: undo }"
            />
          </article>

          <article class="space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div class="space-y-1">
              <h2 class="font-semibold">Personalizado</h2>
              <p class="text-sm text-muted-foreground">Slots, viewport y swipe configurables.</p>
            </div>

            <Button label="Mostrar actualización" variant="outline" @click="customOpen = true" />

            <Toast
              v-model:open="customOpen"
              type="background"
              disable-swipe
              :viewport="{ hotkey: ['altKey', 'KeyT'] }"
              :ui="{
                root: { class: 'border-primary/30' },
                iconContainer: { class: 'text-primary' },
                viewport: { class: 'sm:max-w-md' },
              }"
            >
              <template #icon>✦</template>
              <template #label>Nueva versión disponible</template>
              <template #description>Actualiza cuando hayas terminado tu trabajo actual.</template>
            </Toast>
          </article>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
