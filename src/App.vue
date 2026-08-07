<script setup>
import { Alert, Button, Badge } from '@/components/ui'
import { ConfigProvider } from '@/components/provider'

const alertUI = {
  root: (e) => {
    console.log(e)
    const { props } = e
    return {
      class: props.severity === 'success' ? 'ring-2 ring-success/30' : 'ring-2 ring-error/30',
    }
  },
  label: ({ props }) => ({ title: props.label }),
}
</script>

<template>
  <ConfigProvider>
    <Badge label="Hola" variant="soft" icon="check"></Badge>
    <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
      <section class="space-y-4">
        <h1 class="text-2xl font-semibold">Alert examples</h1>

        <Alert
          label="Informacion"
          description="Este es un alert informativo con su icono normalizado."
          icon="info"
        />

        <div class="grid gap-4 sm:grid-cols-2">
          <Alert
            closable
            severity="success"
            label="Guardado correctamente"
            description="Los cambios se han guardado."
            icon="success"
          />
          <Alert
            severity="warning"
            label="Revisa los datos"
            description="Hay campos que necesitan tu atencion."
            icon="warning"
          />
          <Alert
            severity="error"
            label="No se pudo completar"
            description="Intentalo de nuevo dentro de unos segundos."
            icon="error"
          />
        </div>

        <Alert
          closable
          severity="warning"
          label="Alerta cerrable"
          description="Este ejemplo usa el contexto del slot close."
          icon="warning"
        >
          <template #close="{ close }">
            <Button size="xs" variant="outline" label="Cerrar" @click="close" />
          </template>
        </Alert>

        <Alert
          closable
          severity="error"
          label="Slots y contexto"
          description="Este contenido se personaliza usando props y close del contexto."
          :icon="{ name: 'success', color: 'green', ui: { root: { 'aria-label': 'Más info' } } }"
          :ui="alertUI"
        >
          <template #label="{ props }">
            <span class="font-semibold">{{ props.label }} OK</span>
          </template>
        </Alert>
      </section>
    </main>
  </ConfigProvider>
</template>
