<script setup lang="ts">
import { ref } from 'vue'
import { Separator } from '@/components/ui/Separator'
import { Textarea } from '@/components/ui/Textarea'

const message = ref('')
const notes = ref('Contenido inicial')
</script>

<template>
  <main class="mx-auto min-h-screen max-w-4xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Textarea y Separator</h1>
      <p class="text-muted-foreground">
        Ejemplos de uso, estado y personalización mediante la propiedad ui.
      </p>
    </header>

    <section class="space-y-6 rounded-xl border p-5">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold">Textarea</h2>
        <p class="text-sm text-muted-foreground">Valor: {{ message || 'vacío' }}</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <label class="space-y-2">
          <span class="text-sm font-medium">Mensaje</span>
          <Textarea
            v-model="message"
            placeholder="Escribe un mensaje..."
            rows="5"
            aria-label="Mensaje"
          />
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium">Con valor inicial</span>
          <Textarea v-model="notes" rows="5" aria-label="Notas" />
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium">Personalizado con ui.root</span>
          <Textarea
            placeholder="Textarea personalizado"
            rows="5"
            aria-label="Textarea personalizado"
            :ui="{
              root: {
                class: 'resize-none border-primary/50 bg-primary/5 focus-visible:ring-primary/30',
              },
            }"
          />
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium">Deshabilitado</span>
          <Textarea
            disabled
            rows="5"
            default-value="Este contenido no se puede editar."
            aria-label="Textarea deshabilitado"
          />
        </label>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold">Separator</h2>
        <p class="text-sm text-muted-foreground">Separadores horizontales y verticales.</p>
      </div>

      <div class="space-y-4">
        <div>
          <h3 class="font-medium">Perfil</h3>
          <p class="text-sm text-muted-foreground">Información pública de tu cuenta.</p>
        </div>

        <Separator />

        <div>
          <h3 class="font-medium">Preferencias</h3>
          <p class="text-sm text-muted-foreground">Configura el comportamiento de la aplicación.</p>
        </div>

        <Separator
          :ui="{
            root: { class: 'h-0.5 bg-primary/60' },
          }"
        />

        <div>
          <h3 class="font-medium">Seguridad</h3>
          <p class="text-sm text-muted-foreground">Contraseña y sesiones activas.</p>
        </div>
      </div>

      <div class="flex h-10 items-center gap-4 text-sm">
        <span>Cuenta</span>
        <Separator orientation="vertical" />
        <span>Facturación</span>
        <Separator
          orientation="vertical"
          :ui="{
            root: { class: 'w-0.5 bg-primary/60' },
          }"
        />
        <span>Soporte</span>
      </div>

      <div class="space-y-3 rounded-lg bg-muted/40 p-4">
        <span class="text-sm font-medium">Separador semántico</span>
        <Separator :decorative="false" aria-label="Separador de secciones" />
        <p class="text-sm text-muted-foreground">
          Este separador se expone a las tecnologías de asistencia.
        </p>
      </div>
    </section>
  </main>
</template>
