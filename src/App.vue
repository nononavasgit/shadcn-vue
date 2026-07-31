<script setup lang="ts">
import { ref } from 'vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@/components/ui/ButtonGroup'
import { Icon } from '@/components/ui/Icon'

const controlledOpen = ref(false)
const lastAction = ref('Ninguna')
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">ButtonGroup y AlertDialog</h1>
      <p class="text-muted-foreground">
        Ejemplos de composición, orientación, props funcionales y zonas UI normalizadas.
      </p>
    </header>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">ButtonGroup horizontal</h2>
        <p class="text-sm text-muted-foreground">Botones unidos en una única fila.</p>
      </div>

      <div class="flex flex-wrap gap-5">
        <ButtonGroup>
          <Button label="Anterior" icon="chevronLeft" variant="outline" />
          <Button label="Guardar" icon="save" variant="outline" />
          <Button label="Siguiente" trailing-icon="chevronRight" variant="outline" />
        </ButtonGroup>

        <ButtonGroup>
          <Button icon="chevronLeft" variant="outline" aria-label="Anterior" />
          <Button icon="minus" variant="outline" aria-label="Alejar" />
          <Button icon="chevronRight" variant="outline" aria-label="Siguiente" />
        </ButtonGroup>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Text y Separator</h2>
        <p class="text-sm text-muted-foreground">
          Los tres componentes exponen ui.root como HTMLAttributes.
        </p>
      </div>

      <div class="flex flex-wrap gap-5">
        <ButtonGroup>
          <ButtonGroupText label="Total" />
          <ButtonGroupSeparator />
          <ButtonGroupText label="128 €" />
          <ButtonGroupSeparator />
          <Button label="Pagar" />
        </ButtonGroup>

        <ButtonGroup
          :ui="{
            root: { class: 'rounded-xl ring-2 ring-primary/20' },
          }"
        >
          <ButtonGroupText
            label="Filtro"
            :ui="{
              root: { class: 'bg-primary/5 font-semibold text-primary' },
            }"
          />
          <ButtonGroupSeparator
            :ui="{
              root: { class: 'bg-primary/40' },
            }"
          />
          <Button label="Activos" variant="outline" />
          <Button label="Todos" variant="outline" />
        </ButtonGroup>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Orientación vertical</h2>
        <p class="text-sm text-muted-foreground">
          Separadores horizontales dentro del grupo vertical.
        </p>
      </div>

      <ButtonGroup orientation="vertical" class="w-56">
        <Button label="Perfil" icon="info" variant="outline" class="w-full justify-start" />
        <ButtonGroupSeparator orientation="horizontal" />
        <Button label="Guardar" icon="save" variant="outline" class="w-full justify-start" />
        <ButtonGroupSeparator orientation="horizontal" />
        <Button
          label="Eliminar"
          icon="trash2"
          variant="outline"
          severity="error"
          class="w-full justify-start"
        />
      </ButtonGroup>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">AlertDialog básico</h2>
        <p class="text-sm text-muted-foreground">
          Action y cancel reciben objetos ButtonProps normalizados.
        </p>
      </div>

      <AlertDialog
        label="¿Eliminar proyecto?"
        description="Esta acción no se puede deshacer y eliminará todos sus datos."
        icon="warning"
        :cancel-button="{
          label: 'Conservar proyecto',
          variant: 'outline',
          severity: 'secondary',
        }"
        :action-button="{
          label: 'Eliminar definitivamente',
          icon: 'trash2',
          severity: 'error',
        }"
        @cancel="lastAction = 'Cancelado'"
        @action="lastAction = 'Eliminado'"
      >
        <Button label="Eliminar proyecto" icon="trash2" severity="error" />
      </AlertDialog>

      <p class="text-sm text-muted-foreground">Última acción: {{ lastAction }}</p>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Contenido y slots</h2>
        <p class="text-sm text-muted-foreground">
          El cuerpo y los botones pueden construirse mediante slots.
        </p>
      </div>

      <AlertDialog
        label="Publicar cambios"
        description="Revisa el resumen antes de continuar."
        icon="info"
      >
        <Button label="Publicar" icon="save" variant="outline" />

        <template #content>
          <div class="space-y-3 rounded-lg bg-muted/50 p-4 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Archivos modificados</span>
              <span class="font-medium">12</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Nueva versión</span>
              <span class="font-medium">v2.4.0</span>
            </div>
          </div>
        </template>

        <template #cancel="{ close }">
          <Button label="Volver" variant="outline" @click="close" />
        </template>

        <template #action="{ close }">
          <Button label="Publicar ahora" icon="save" @click="close" />
        </template>
      </AlertDialog>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Estado controlado y UI</h2>
        <p class="text-sm text-muted-foreground">
          Estado: {{ controlledOpen ? 'abierto' : 'cerrado' }}.
        </p>
      </div>

      <AlertDialog
        v-model:open="controlledOpen"
        label="Confirmar configuración"
        description="Se aplicarán los ajustes a todos los miembros del equipo."
        icon="success"
        :content="{ disableOutsidePointerEvents: true }"
        :ui="{
          root: { 'data-example': 'controlled-alert-dialog' },
          trigger: { class: 'rounded-lg ring-2 ring-success/20' },
          content: { class: 'border-2 border-success/30 shadow-xl' },
          header: { class: 'rounded-md bg-success/5 p-3' },
          label: { class: 'text-success' },
          icon: { class: 'size-5' },
          description: { class: 'text-success/70' },
          body: { class: 'py-6' },
          footer: { class: 'border-t pt-4' },
          cancel: { class: 'border-success/30' },
          action: { class: 'bg-success text-success-foreground' },
        }"
        :cancel-button="{ label: 'Revisar' }"
        :action-button="{ label: 'Aplicar', icon: 'check' }"
      >
        <template #default="{ open }">
          <Button :label="open ? 'AlertDialog abierto' : 'Abrir confirmación'" severity="success" />
        </template>

        <template #content>
          <p class="text-sm text-muted-foreground">
            Los cambios estarán disponibles inmediatamente después de confirmar.
          </p>
        </template>
      </AlertDialog>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Header y footer libres</h2>
      </div>

      <AlertDialog>
        <Button label="Abrir composición libre" variant="outline" />

        <template #header>
          <div class="flex items-center gap-3">
            <div class="grid size-10 place-content-center rounded-full bg-warning/10 text-warning">
              <Icon name="warning" />
            </div>
            <div>
              <h3 class="font-semibold">Sesión a punto de expirar</h3>
              <p class="text-sm text-muted-foreground">Decide si quieres continuar conectado.</p>
            </div>
          </div>
        </template>

        <template #footer="{ close }">
          <Button label="Cerrar sesión" variant="outline" severity="error" @click="close" />
          <Button label="Continuar sesión" @click="close" />
        </template>
      </AlertDialog>
    </section>
  </main>
</template>
