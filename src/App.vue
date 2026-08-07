<script setup>
import { AlertDialog, Button } from '@/components/ui'
import { ConfigProvider } from '@/components/provider'

const alertDialogUI = {
  content: ({ props }) => ({
    class: props.label === 'Eliminar elemento' ? 'border-error/50' : 'border-primary/30',
  }),
  label: ({ open }) => ({
    class: open ? 'text-primary' : undefined,
  }),
  footer: ({ props }) => ({
    'data-dialog-label': props.label,
  }),
}
</script>

<template>
  <ConfigProvider>
    <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">AlertDialog examples</h2>

        <AlertDialog
          label="Confirmar acción"
          description="Este diálogo muestra un ejemplo básico con botones normalizados."
          icon="info"
          :action-button="{ label: 'Continuar', icon: 'check' }"
          :cancel-button="{ label: 'Cancelar', icon: 'error' }"
        >
          <template #default>
            <Button label="Abrir diálogo básico" />
          </template>
        </AlertDialog>

        <AlertDialog
          label="Eliminar elemento"
          description="Esta acción no se puede deshacer."
          icon="warning"
          :action-button="{ label: 'Eliminar', severity: 'error', icon: 'trash' }"
          :cancel-button="{ label: 'Mantener' }"
          :ui="alertDialogUI"
        >
          <template #default="{ props }">
            <Button variant="outline" :label="'Eliminar ' + (props.label ? 'elemento' : '')" />
          </template>

          <template #label="{ props }">
            <span>{{ props.label }} definitivamente</span>
          </template>

          <template #description>
            <p class="text-sm text-muted-foreground">
              Se borrarán todos los datos asociados a este elemento.
            </p>
          </template>

          <template #content>
            <div class="rounded-md bg-muted/50 p-3 text-sm">
              Este contenido procede del slot <code>#content</code>.
            </div>
          </template>

          <template #cancel>
            <Button variant="outline" label="No eliminar" />
          </template>

          <template #action>
            <Button severity="error" label="Sí, eliminar" icon="trash" />
          </template>
        </AlertDialog>
      </section>
    </main>
  </ConfigProvider>
</template>
