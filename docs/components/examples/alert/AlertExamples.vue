<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Variantes, severidades, iconos, colores y acciones de cierre para Alert.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Variantes</h3>
          <p class="text-sm text-muted-foreground">Diferentes tratamientos visuales.</p>
        </div>
        <div class="grid gap-2">
          <Alert label="Solid" variant="solid" />
          <Alert label="Outline" variant="outline" />
          <Alert label="Plain" variant="plain" />
          <Alert label="Subtle" variant="subtle" />
          <Alert label="Soft" variant="soft" />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Severidades</h3>
          <p class="text-sm text-muted-foreground">Comunica el estado del contenido.</p>
        </div>
        <div class="grid gap-2">
          <Alert label="Información principal" severity="primary" />
          <Alert label="Información secundaria" severity="secondary" />
          <Alert label="Revisa este dato" severity="warning" />
          <Alert label="Guardado correctamente" severity="success" />
          <Alert label="No se ha podido completar la acción" severity="error" />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Iconos y colores</h3>
          <p class="text-sm text-muted-foreground">Añade contexto visual o un color propio.</p>
        </div>
        <div class="grid gap-2">
          <Alert
            label="Cambios guardados"
            description="Tus preferencias se han actualizado correctamente."
            severity="success"
            :icon="{ name: 'check' }"
          />
          <Alert
            label="Información importante"
            description="Consulta la documentación antes de continuar."
            severity="primary"
            :icon="{ name: 'info' }"
          />
          <Alert
            label="Color personalizado"
            description="El color puede definirse con cualquier valor CSS válido."
            color="#7c3aed"
            :icon="{ name: 'info' }"
          />
        </div>
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Cierre y slots</h3>
          <p class="text-sm text-muted-foreground">
            Usa el cierre por defecto o personalízalo con el slot close.
          </p>
        </div>
        <div class="grid gap-2">
          <Alert
            label="Alerta cerrable"
            description="Pulsa el botón para ocultar esta alerta."
            closable
            severity="warning"
            :icon="{ name: 'info' }"
          />
          <Alert closable severity="error" :icon="{ name: 'info' }">
            <template #label>
              <span class="font-semibold">Contenido personalizado</span>
            </template>
            <template #description>
              <span>El slot close recibe la función <code>close</code>.</span>
            </template>
            <template #close="{ close }">
              <button
                type="button"
                class="rounded-md border px-2 py-1 text-xs font-medium hover:bg-accent"
                @click="close"
              >
                Descartar
              </button>
            </template>
          </Alert>
        </div>
      </div>
    </div>
  </section>
</template>
