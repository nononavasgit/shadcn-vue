<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
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
  </main>
</template>
