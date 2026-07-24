<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/app/Textarea'

const message = ref('')
const feedback = ref('La experiencia ha sido muy buena.')
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-3xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Textarea</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Ejemplos con v-model, valores iniciales y atributos HTML nativos.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">
            Placeholder y rows se reenvían directamente mediante attrs.
          </p>
        </div>

        <Textarea placeholder="Escribe tu mensaje..." :rows="4" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Modelo controlado</h2>
          <p class="text-sm text-muted-foreground">
            El valor se sincroniza mediante v-model y puede utilizarse fuera del componente.
          </p>
        </div>

        <div class="space-y-2">
          <Textarea
            v-model="message"
            placeholder="Máximo 160 caracteres"
            :maxlength="160"
            :rows="3"
          />
          <div class="flex justify-between text-xs text-muted-foreground">
            <span>{{ message || 'Todavía no has escrito nada.' }}</span>
            <span>{{ message.length }}/160</span>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Valor inicial</h2>
          <p class="text-sm text-muted-foreground">
            defaultValue permite iniciar el textarea sin controlar su estado.
          </p>
        </div>

        <Textarea default-value="Contenido inicial editable." :rows="3" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Formulario</h2>
          <p class="text-sm text-muted-foreground">Ejemplo con etiqueta y texto de ayuda.</p>
        </div>

        <div class="grid gap-2">
          <label for="feedback" class="text-sm font-medium">Comentarios</label>
          <Textarea
            id="feedback"
            v-model="feedback"
            name="feedback"
            required
            aria-describedby="feedback-help"
            :rows="4"
          />
          <p id="feedback-help" class="text-xs text-muted-foreground">
            Cuéntanos qué podríamos mejorar.
          </p>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Estados</h2>
          <p class="text-sm text-muted-foreground">
            Disabled y aria-invalid son atributos nativos.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <Textarea disabled default-value="Este campo está deshabilitado." :rows="3" />
          <Textarea aria-invalid="true" default-value="Contenido no válido." :rows="3" />
        </div>
      </section>
    </div>
  </main>
</template>
