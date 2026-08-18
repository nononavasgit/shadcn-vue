<script setup lang="ts">
import { Empty, type EmptyProps } from '@/components/ui/Empty'
import { Icon } from '@/components/ui/Icon'

const styledEmptyUi: EmptyProps['ui'] = {
  header: () => ({ class: 'rounded-lg border border-primary/30 p-3' }),
  content: () => ({ class: 'flex-row' }),
}
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Diferentes formas de representar estados sin contenido.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Estado básico</h3>
          <p class="text-sm text-muted-foreground">Usa label y description directamente.</p>
        </div>
        <Empty label="No hay notificaciones" description="Cuando recibas una, aparecerá aquí." />
      </div>

      <div class="grid gap-3 rounded-lg border p-4">
        <div>
          <h3 class="font-medium">Con media</h3>
          <p class="text-sm text-muted-foreground">Añade un icono mediante el slot media.</p>
        </div>
        <Empty
          label="No se encontraron documentos"
          description="Prueba con otro término de búsqueda."
          media-variant="icon"
        >
          <template #media>
            <Icon name="file" />
          </template>
        </Empty>
      </div>

      <div class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Con acciones</h3>
          <p class="text-sm text-muted-foreground">
            El slot por defecto permite añadir acciones o contenido adicional.
          </p>
        </div>
        <Empty label="Tu proyecto está vacío" description="Crea tu primer elemento para empezar.">
          <div class="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Crear elemento
            </button>
            <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
              Importar
            </button>
          </div>
        </Empty>
      </div>

      <div class="grid gap-3 rounded-lg border p-4 md:col-span-2">
        <div>
          <h3 class="font-medium">Personalización con ui</h3>
          <p class="text-sm text-muted-foreground">
            Personaliza las partes internas con resolvers independientes.
          </p>
        </div>
        <Empty
          label="No hay elementos seleccionados"
          description="Selecciona un elemento para ver sus detalles."
          :ui="styledEmptyUi"
        >
          <button type="button" class="rounded-md border px-3 py-2 text-sm hover:bg-accent">
            Ver elementos
          </button>
        </Empty>
      </div>
    </div>
  </section>
</template>
