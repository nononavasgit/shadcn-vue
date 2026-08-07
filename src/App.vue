<script setup>
import { AlertDialog, AspectRatio, Button } from '@/components/ui'
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

const aspectRatioUI = {
  root: ({ aspect }) => ({
    class: aspect >= 1 ? 'rounded-xl ring-2 ring-primary/20' : 'rounded-xl ring-2 ring-success/20',
    'data-ratio': aspect,
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

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold">AspectRatio examples</h2>

        <AspectRatio :ratio="16 / 9" class="overflow-hidden rounded-lg bg-muted">
          <div class="flex size-full items-center justify-center bg-primary/10 text-primary">
            Ratio 16:9
          </div>
        </AspectRatio>

        <div class="grid gap-4 sm:grid-cols-2">
          <AspectRatio :ratio="1" class="overflow-hidden rounded-lg bg-muted">
            <div class="flex size-full items-center justify-center bg-secondary/20 text-secondary">
              Ratio 1:1
            </div>
          </AspectRatio>

          <AspectRatio :ratio="4 / 3" :ui="aspectRatioUI">
            <template #default="{ aspect, props }">
              <div
                class="flex size-full flex-col items-center justify-center bg-success/10 text-success"
              >
                <span>Ratio: {{ aspect }}</span>
                <span class="text-xs">Prop ratio: {{ props.ratio }}</span>
              </div>
            </template>
          </AspectRatio>
        </div>
      </section>
    </main>
  </ConfigProvider>
</template>
