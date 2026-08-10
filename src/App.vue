<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Alert, Badge, Button, FileUpload, Icon } from '@/components/ui'

const basicFiles = ref<File[]>([])
const documentFiles = ref<File[]>([])
const imageFiles = ref<File[]>([])
const limitedFiles = ref<File[]>([])
const customFiles = ref<File[]>([])
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background text-foreground">
      <div class="mx-auto flex max-w-5xl flex-col gap-10 p-8">
        <header class="space-y-2">
          <h1 class="text-3xl font-bold">Badge</h1>
          <p class="text-muted-foreground">
            Ejemplos de variantes, severidades, tamaños, iconos y personalización.
          </p>
        </header>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Variantes</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Solid" variant="solid" />
            <Badge label="Outline" variant="outline" />
            <Badge label="Plain" variant="plain" />
            <Badge label="Subtle" variant="subtle" />
            <Badge label="Soft" variant="soft" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Severidades</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Primary" severity="primary" />
            <Badge label="Secondary" severity="secondary" />
            <Badge label="Warning" severity="warning" />
            <Badge label="Success" severity="success" />
            <Badge label="Error" severity="error" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Tamaños</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Small" size="sm" />
            <Badge label="Medium" size="md" />
            <Badge label="Large" size="lg" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Iconos</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Completado" icon="check" severity="success" />
            <Badge label="Continuar" trailing-icon="chevronRight" variant="outline" />
            <Badge
              label="Verificado"
              icon="check"
              trailing-icon="chevronRight"
              severity="secondary"
            />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Combinaciones</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Warning outline" severity="warning" variant="outline" />
            <Badge label="Success subtle" severity="success" variant="subtle" />
            <Badge label="Error soft" severity="error" variant="soft" />
            <Badge label="Secondary plain" severity="secondary" variant="plain" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Color personalizado</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge label="Violeta" color="#8b5cf6" />
            <Badge label="Naranja" color="#f97316" variant="outline" />
            <Badge label="Turquesa" color="#14b8a6" variant="soft" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Slots y UI</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Badge variant="outline">
              <template #leading>
                <span class="size-2 rounded-full bg-success" />
              </template>
              Disponible
              <template #trailing>
                <Icon name="chevronRight" />
              </template>
            </Badge>

            <Badge
              label="UI personalizada"
              size="lg"
              :ui="{
                root: ({ size }) => ({
                  class: ['border-dashed uppercase tracking-wider', size === 'lg' && 'shadow-sm'],
                  'data-example': 'custom-ui',
                }),
              }"
            />
          </div>
        </section>

        <header class="space-y-2 border-t pt-10">
          <h1 class="text-3xl font-bold">Alert</h1>
          <p class="text-muted-foreground">
            Ejemplos de variantes, severidades, iconos, cierre y personalización.
          </p>
        </header>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Variantes</h2>
          <div class="grid gap-3">
            <Alert label="Solid" description="Una alerta con fondo sólido." variant="solid" />
            <Alert
              label="Outline"
              description="Una alerta con borde y fondo transparente."
              variant="outline"
            />
            <Alert
              label="Plain"
              description="Una alerta sin fondo ni borde visible."
              variant="plain"
            />
            <Alert
              label="Subtle"
              description="Una alerta con borde y fondo suaves."
              variant="subtle"
            />
            <Alert label="Soft" description="La variante predeterminada." variant="soft" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Severidades e iconos</h2>
          <div class="grid gap-3">
            <Alert
              label="Información"
              description="Hay una nueva versión disponible."
              icon="info"
              severity="primary"
            />
            <Alert
              label="Atención"
              description="Revisa los datos antes de continuar."
              icon="warning"
              severity="warning"
            />
            <Alert
              label="Operación completada"
              description="Los cambios se han guardado correctamente."
              icon="success"
              severity="success"
            />
            <Alert
              label="Ha ocurrido un error"
              description="No se pudo completar la operación."
              icon="error"
              severity="error"
            />
            <Alert
              label="Información secundaria"
              description="Este mensaje tiene una prioridad menor."
              icon="info"
              severity="secondary"
            />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Alertas cerrables</h2>
          <div class="grid gap-3">
            <Alert
              label="Puedes cerrar esta alerta"
              description="Pulsa el botón situado a la derecha."
              icon="info"
              closable
            />
            <Alert
              label="Cierre con texto"
              description="El botón de cierre también admite las props de Button."
              severity="warning"
              variant="outline"
              closable
              :close-button="{
                label: 'Cerrar',
                square: false,
                icon: 'x',
              }"
            />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Color personalizado</h2>
          <div class="grid gap-3">
            <Alert
              label="Violeta"
              description="El color personalizado se aplica a todas las variantes."
              icon="info"
              color="#8b5cf6"
            />
            <Alert
              label="Naranja outline"
              description="Ejemplo con color personalizado y variant outline."
              icon="warning"
              color="#f97316"
              variant="outline"
            />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Slots y UI</h2>
          <div class="grid gap-3">
            <Alert label="Contenido mediante slots" closable>
              <template #icon>
                <span class="mt-0.5 size-4 rounded-full bg-success" />
              </template>
              <template #description>
                El icono y este contenido proceden de slots personalizados.
              </template>
              <template #close="{ close }">
                <Button label="Entendido" size="xs" variant="outline" @click="close" />
              </template>
            </Alert>

            <Alert
              label="UI personalizada"
              description="Las zonas configurables reciben clases mediante ui."
              icon="check"
              closable
              :ui="{
                root: { class: 'border-dashed shadow-sm' },
                label: { class: 'uppercase tracking-wide' },
                description: { class: 'italic' },
                closeButtonContainer: { class: 'top-3 right-3' },
              }"
            />
          </div>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
