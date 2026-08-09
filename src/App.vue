<script setup lang="ts">
import {
  CheckIcon,
  ClockIcon,
  FileArchiveIcon,
  FileCodeIcon,
  FileTextIcon,
  FileWarningIcon,
  RefreshCwIcon,
  XIcon,
} from '@lucide/vue'
import { ConfigProvider } from '@/components/provider'
import { Attachment, FileUpload, Spinner, Button } from '@/components/ui'
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background px-6 py-12 text-foreground">
      <div class="mx-auto grid w-full max-w-5xl gap-10">
        <header class="space-y-2">
          <h1 class="text-3xl font-bold tracking-tight">Attachment</h1>
          <p class="text-muted-foreground">
            Archivos adjuntos con metadatos, estados de subida y acciones.
          </p>
        </header>
        
        <Button label="hola" :icon="{  }" :ui="{root: { 'aria-xd': 'e', si: true }}" />

        <section class="grid gap-4">
          <div>
            <h2 class="text-lg font-semibold">Dropzone</h2>
            <p class="text-sm text-muted-foreground">
              Selección mediante clic o arrastrando archivos sobre la zona.
            </p>
          </div>

          <FileUpload class="max-w-2xl" multiple accept="image/*,.pdf,.doc,.docx" />
        </section>

        <section class="grid gap-4">
          <div>
            <h2 class="text-lg font-semibold">Básico</h2>
            <p class="text-sm text-muted-foreground">Un archivo con icono y acción.</p>
          </div>

          <Attachment class="w-full max-w-md" label="documentacion.pdf" description="PDF · 2,4 MB">
            <template #media>
              <FileTextIcon />
            </template>

            <template #actions>
              <button aria-label="Eliminar documentacion.pdf" type="button">
                <XIcon />
              </button>
            </template>
          </Attachment>
        </section>
        

        <section class="grid gap-4">
          <div>
            <h2 class="text-lg font-semibold">Estados</h2>
            <p class="text-sm text-muted-foreground">Ciclo completo de un archivo subido.</p>
          </div>

          <div class="grid max-w-xl gap-2">
            <Attachment
              class="w-full"
              state="idle"
              label="informe.pdf"
              description="Preparado para subir"
            >
              <template #media><ClockIcon /></template>
              <template #actions>
                <button aria-label="Eliminar informe.pdf" type="button"><XIcon /></button>
              </template>
            </Attachment>

            <Attachment
              class="w-full"
              state="uploading"
              label="recursos.zip"
              description="Subiendo · 64 %"
            >
              <template #media><Spinner /></template>
              <template #actions>
                <button aria-label="Cancelar subida" type="button"><XIcon /></button>
              </template>
            </Attachment>

            <Attachment
              class="w-full"
              state="processing"
              label="clientes.csv"
              description="Procesando documento"
            >
              <template #media><FileArchiveIcon /></template>
              <template #actions>
                <button aria-label="Cancelar procesamiento" type="button"><XIcon /></button>
              </template>
            </Attachment>

            <Attachment
              class="w-full"
              state="error"
              label="presupuesto.xlsx"
              description="No se ha podido subir"
            >
              <template #media><FileWarningIcon /></template>
              <template #actions>
                <button aria-label="Reintentar subida" type="button"><RefreshCwIcon /></button>
                <button aria-label="Eliminar presupuesto.xlsx" type="button"><XIcon /></button>
              </template>
            </Attachment>

            <Attachment
              class="w-full"
              state="done"
              label="contrato.pdf"
              description="Subido · 1,8 MB"
            >
              <template #media><CheckIcon /></template>
              <template #actions>
                <button aria-label="Eliminar contrato.pdf" type="button"><XIcon /></button>
              </template>
            </Attachment>
          </div>
        </section>

        <section class="grid gap-4">
          <div>
            <h2 class="text-lg font-semibold">Tamaños</h2>
            <p class="text-sm text-muted-foreground">Variantes default, sm y xs.</p>
          </div>

          <div class="grid max-w-md gap-3">
            <Attachment class="w-full" label="Tamaño predeterminado" description="PDF · 2,4 MB">
              <template #media><FileTextIcon /></template>
            </Attachment>
            <Attachment class="w-full" size="sm" label="Tamaño pequeño" description="Vue · 12 KB">
              <template #media><FileCodeIcon /></template>
            </Attachment>
            <Attachment class="w-full" size="xs" label="Tamaño extra pequeño">
              <template #media><FileCodeIcon /></template>
            </Attachment>
          </div>
        </section>

        <section class="grid gap-4">
          <div>
            <h2 class="text-lg font-semibold">Grupo e imágenes</h2>
            <p class="text-sm text-muted-foreground">
              Adjuntos verticales en una fila desplazable.
            </p>
          </div>

          <div class="flex max-w-full min-w-0 snap-x gap-2 overflow-x-auto pb-1">
            <Attachment
              orientation="vertical"
              media-variant="image"
              label="escritorio.jpg"
              description="JPG · 940 KB"
            >
              <template #media>
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=640&auto=format&fit=crop&q=80"
                  alt="Escritorio de trabajo"
                />
              </template>
              <template #actions>
                <button aria-label="Eliminar escritorio.jpg" type="button"><XIcon /></button>
              </template>
            </Attachment>

            <Attachment
              orientation="vertical"
              media-variant="image"
              label="oficina.jpg"
              description="JPG · 1,1 MB"
            >
              <template #media>
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=640&auto=format&fit=crop&q=80"
                  alt="Oficina luminosa"
                />
              </template>
              <template #actions>
                <button aria-label="Eliminar oficina.jpg" type="button"><XIcon /></button>
              </template>
            </Attachment>

            <Attachment
              orientation="vertical"
              media-variant="image"
              label="reunión.jpg"
              description="JPG · 820 KB"
            >
              <template #media>
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=640&auto=format&fit=crop&q=80"
                  alt="Sala de reuniones"
                />
              </template>
              <template #actions>
                <button aria-label="Eliminar reunión.jpg" type="button"><XIcon /></button>
              </template>
            </Attachment>
          </div>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
