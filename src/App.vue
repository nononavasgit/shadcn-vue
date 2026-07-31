<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '@/components/ui/Alert'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Spinner } from '@/components/ui/Spinner'
import { Switch } from '@/components/ui/Switch'

const notifications = ref(true)
const compactMode = ref(false)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-4xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Iconos y botones</h1>
      <p class="text-muted-foreground">Ejemplos de uso de los componentes Icon y Button.</p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Iconos</h2>
      <div class="flex flex-wrap items-center gap-5">
        <div
          v-for="name in ['search', 'save', 'warning', 'success', 'trash2', 'x']"
          :key="name"
          class="flex flex-col items-center gap-2 text-sm"
        >
          <Icon :name="name" size="lg" color="red" />
          <span>{{ name }}</span>
        </div>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Botones</h2>
      <div class="flex flex-wrap gap-3">
        <Button label="Principal" loading />
        <Button label="Guardar" icon="save" />
        <Button label="Buscar" icon="search" variant="outline" />
        <Button label="Advertencia" icon="warning" variant="soft" />
        <Button label="Eliminar" icon="trash2" variant="subtle" />
        <Button icon="x" aria-label="Cerrar" square />

        <Button severity="success" icon="x" aria-label="Cerrar" />
        <Button
          label="Guardar"
          :icon="'warning'"
          aria-label="Cerrar"
          color="#3b5553"
          loading
          :ui="{}"
        />
      </div>
    </section>
    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Badges</h2>
      <div class="flex flex-wrap items-center gap-3">
        <Badge label="Principal" />
        <Badge label="Éxito" severity="success" icon="success" />
        <Badge label="Advertencia" severity="warning" icon="warning" variant="soft" />
        <Badge label="Error" severity="error" icon="error" variant="outline" />
        <Badge label="Guardado" icon="save" trailing-icon="check" variant="subtle" />
        <Badge label="Personalizado" color="#3b5553" />
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Badge size="sm" label="Pequeño" />
        <Badge size="md" label="Mediano" />
        <Badge size="lg" label="Grande" />
        <Badge label="Con slots">
          <template #leading>
            <Icon name="search" />
          </template>
          Resultado
          <template #trailing>
            <Icon name="x" />
          </template>
        </Badge>
      </div>
    </section>
    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Alerts</h2>

      <div class="space-y-4">
        <Alert
          label="Información"
          description="Este es un mensaje informativo con las opciones predeterminadas."
          icon="info"
        />

        <Alert
          label="Cambios guardados"
          description="Los cambios se han guardado correctamente."
          icon="success"
          severity="success"
          variant="subtle"
        />

        <Alert
          label="Revisa los datos"
          description="Algunos campos necesitan tu atención antes de continuar."
          icon="warning"
          severity="warning"
          variant="outline"
          closable
        />

        <Alert
          label="No se pudo completar la operación"
          description="Inténtalo de nuevo o contacta con soporte si el problema continúa."
          icon="error"
          severity="error"
          variant="solid"
          closable
          :close-button="{
            label: 'Cerrar',
            icon: 'x',
            variant: 'plain',
            size: 'sm',
          }"
        />

        <Alert
          label="Alert personalizado"
          description="Root y botón de cierre personalizados mediante la propiedad ui."
          icon="info"
          color="#7c3aed"
          closable
          :ui="{
            root: { class: 'border-2 shadow-sm' },
            label: { class: 'font-bold' },
            description: { class: 'italic' },
            closeButton: {
              class: 'top-3 right-3 ring-1 ring-current/20',
              title: 'Cerrar alerta personalizada',
            },
          }"
        />
      </div>
    </section>
    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Spinner</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <Spinner class="min-h-24 rounded-lg border" />

        <Spinner
          class="min-h-24 rounded-lg border"
          :ui="{
            root: { class: 'bg-muted/40' },
            loading: { class: 'min-h-24' },
            icon: { class: 'size-7 text-primary' },
          }"
        />

        <Spinner
          :loading="true"
          class="rounded-lg border p-4 md:col-span-2"
          :ui="{ content: { class: 'text-sm text-muted-foreground' } }"
        >
          El contenido aparece cuando loading es false.
        </Spinner>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Switch</h2>

      <div class="space-y-4">
        <label class="flex items-center justify-between gap-4 rounded-lg border p-4">
          <span>
            <span class="block font-medium">Notificaciones</span>
            <span class="block text-sm text-muted-foreground">
              Estado: {{ notifications ? 'activadas' : 'desactivadas' }}
            </span>
          </span>
          <Switch v-model="notifications" aria-label="Activar notificaciones" />
        </label>

        <label class="flex items-center justify-between gap-4 rounded-lg border p-4">
          <span class="font-medium">Modo compacto</span>
          <Switch
            v-model="compactMode"
            aria-label="Activar modo compacto"
            :ui="{ root: { class: 'data-[state=checked]:bg-success' } }"
          />
        </label>

        <label class="flex items-center justify-between gap-4 rounded-lg border p-4 opacity-60">
          <span class="font-medium">Opción deshabilitada</span>
          <Switch disabled aria-label="Opción deshabilitada" />
        </label>

        <label class="flex items-center justify-between gap-4 rounded-lg border p-4">
          <span class="font-medium">Thumb mediante slot</span>
          <Switch aria-label="Switch con thumb personalizado">
            <template #thumb="{ checked }">
              <span class="flex size-full items-center justify-center text-[8px]">
                {{ checked ? '✓' : '' }}
              </span>
            </template>
          </Switch>
        </label>
      </div>
    </section>
  </main>
</template>
