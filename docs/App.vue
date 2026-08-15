<script setup lang="ts">
import { Attachment } from '@/components/ui/Attachment'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background p-8 text-foreground">
      <div class="mx-auto flex max-w-3xl flex-col gap-8">
        <header>
          <h1 class="text-2xl font-semibold">Attachment playground</h1>
          <p class="text-sm text-muted-foreground">Ejemplos del componente Attachment.</p>
        </header>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <Attachment
            label="Informe trimestral.pdf"
            description="2.4 MB · PDF"
            media-variant="icon"
            icon="fileText"
          >
            <template #actions>
              <Button icon="save" size="sm" square aria-label="Guardar archivo" />
            </template>
          </Attachment>

          <Attachment
            label="Vista previa del proyecto"
            description="Imagen · 1920 × 1080"
            orientation="vertical"
            media-variant="image"
          >
            <template #media>
              <div class="flex size-full items-center justify-center bg-primary/10 text-primary">
                <Icon name="image" size="lg" />
              </div>
            </template>
            <template #actions>
              <Button icon="moreHorizontal" size="sm" square aria-label="Más opciones" />
            </template>
          </Attachment>

          <Attachment
            label="Subiendo datos.zip"
            description="68% completado"
            size="sm"
            state="idle"
            media-variant="icon"
            icon="fileArchive"
          >
          </Attachment>

          <Attachment
            label="Subiendo datos.zip"
            description="68% completado"
            size="sm"
            state="uploading"
            media-variant="icon"
            icon="fileArchive"
          >
          </Attachment>

          <Attachment
            label="Subiendo datos.zip"
            description="68% completado"
            size="sm"
            state="processing"
            media-variant="icon"
            icon="fileArchive"
          >
          </Attachment>

          <Attachment
            label="Subiendo datos.zip"
            description="68% completado"
            size="sm"
            state="done"
            media-variant="icon"
            icon="fileArchive"
          >
          </Attachment>

          <Attachment
            label="No se pudo cargar el archivo"
            description="Inténtalo de nuevo."
            size="xs"
            state="error"
            media-variant="icon"
            icon="error"
            class="w-full"
          >
            <template #actions="slotProps">
              <Button label="Reintentar" :size="'xs'" variant="outline" severity="error" />
            </template>
          </Attachment>

          <Attachment
            label="No se pudo cargar el archivo"
            description="Inténtalo de nuevo."
            state="error"
            media-variant="icon"
            icon="error"
            class="w-full"
          >
            <template #actions="slotProps">
              <Button label="Reintentar" :size="'md'" variant="outline" severity="error" />
            </template>
          </Attachment>

          <Attachment
            label="No se pudo cargar el archivo"
            description="Inténtalo de nuevo."
            size="sm"
            state="error"
            media-variant="icon"
            icon="error"
            class="w-full"
          >
            <template #actions="slotProps">
              <Button label="Reintentar" :size="'sm'" variant="outline" severity="error" />
            </template>
          </Attachment>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
