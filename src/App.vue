<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Button, FileUpload, Icon } from '@/components/ui'

const basicFiles = ref<File[]>([])
const documentFiles = ref<File[]>([])
const imageFiles = ref<File[]>([])
const limitedFiles = ref<File[]>([])
const customFiles = ref<File[]>([])
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background text-foreground">
      <div class="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <header class="mb-12 max-w-2xl">
          <p class="mb-3 text-sm font-medium text-primary">Componentes · FileUpload</p>
          <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ejemplos de subida de archivos
          </h1>
          <p class="mt-4 text-base leading-7 text-muted-foreground">
            Casos de uso para archivos individuales, múltiples, imágenes, límites, estados y slots
            personalizados.
          </p>
        </header>

        <div class="grid gap-6 lg:grid-cols-2">
          <section class="rounded-xl border bg-card p-6 shadow-sm">
            <div class="mb-5">
              <h2 class="font-semibold">Básico</h2>
              <p class="mt-1 text-sm text-muted-foreground">Un único archivo, sin restricciones.</p>
            </div>
            <FileUpload
              v-model:files="basicFiles"
              label="Selecciona un archivo"
              description="Arrástralo aquí o haz clic para buscarlo"
            />
          </section>

          <section class="rounded-xl border bg-card p-6 shadow-sm">
            <div class="mb-5">
              <h2 class="font-semibold">Múltiples documentos</h2>
              <p class="mt-1 text-sm text-muted-foreground">PDF, Word y hojas de cálculo.</p>
            </div>
            <FileUpload
              v-model:files="documentFiles"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
              label="Añade tus documentos"
              description="Puedes seleccionar varios archivos a la vez"
            />
          </section>

          <section class="rounded-xl border bg-card p-6 shadow-sm">
            <div class="mb-5">
              <h2 class="font-semibold">Galería de imágenes</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Previsualización en una cuadrícula adaptable.
              </p>
            </div>
            <FileUpload
              v-model:files="imageFiles"
              multiple
              accept="image/*"
              attachment-media-variant="image"
              label="Sube tus imágenes"
              description="PNG, JPG, WEBP, GIF o SVG"
            >
            </FileUpload>
          </section>

          <section class="rounded-xl border bg-card p-6 shadow-sm">
            <div class="mb-5">
              <h2 class="font-semibold">Con límites</h2>
              <p class="mt-1 text-sm text-muted-foreground">Máximo 3 archivos y 5 MB en total.</p>
            </div>
            <FileUpload
              v-model:files="limitedFiles"
              multiple
              :max-files="3"
              :max-size="5 * 1024 * 1024"
              label="Adjunta hasta 3 archivos"
              description="El tamaño combinado no puede superar 5 MB"
            />
          </section>

          <section class="rounded-xl border bg-card p-6 shadow-sm lg:col-span-2">
            <div class="mb-5">
              <h2 class="font-semibold">Área personalizada</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Ejemplo con el slot principal y control programático.
              </p>
            </div>
            <FileUpload
              v-model:files="customFiles"
              multiple
              :show-list="false"
              :ui="{ dropzone: { class: 'border-solid bg-muted/30 p-5' } }"
            >
              <template #default="{ open, files, clear }">
                <div class="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
                  <div class="flex items-center gap-3 text-left">
                    <span
                      class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                    >
                      <Icon name="upload" />
                    </span>
                    <div>
                      <p class="text-sm font-medium">
                        {{
                          files.length
                            ? `${files.length} archivo${files.length === 1 ? '' : 's'} seleccionado${files.length === 1 ? '' : 's'}`
                            : 'Todavía no hay archivos'
                        }}
                      </p>
                      <p class="text-xs text-muted-foreground">
                        Suelta archivos en cualquier parte del área
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <Button
                      v-if="files.length"
                      label="Limpiar"
                      variant="outline"
                      severity="secondary"
                      size="sm"
                      @click.stop="clear"
                    />
                    <Button label="Explorar" size="sm" @click.stop="open" />
                  </div>
                </div>
              </template>
            </FileUpload>
          </section>

          <section class="rounded-xl border bg-card p-6 shadow-sm">
            <div class="mb-5">
              <h2 class="font-semibold">Solo área, sin textos</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Label y descripción usan su valor por defecto: null.
              </p>
            </div>
            <FileUpload :show-list="false" />
          </section>

          <section class="rounded-xl border bg-card p-6 shadow-sm">
            <div class="mb-5">
              <h2 class="font-semibold">Deshabilitado</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Estado no interactivo para formularios bloqueados.
              </p>
            </div>
            <FileUpload
              disabled
              label="Subida no disponible"
              description="Activa la edición para añadir archivos"
            />
          </section>
        </div>
      </div>
    </main>
  </ConfigProvider>
</template>
