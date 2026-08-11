<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Card, Button, Icon } from '@/components/ui'
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

        <header class="space-y-2 border-t pt-10">
          <h1 class="text-3xl font-bold">Button</h1>
          <p class="text-muted-foreground">
            Ejemplos de variantes, severidades, tamaños, iconos, estados y personalización.
          </p>
        </header>

        <Card label="hla" description="asdasd"></Card>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Variantes</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Button label="Solid" variant="solid" />
            <Button label="Outline" variant="outline" />
            <Button label="Plain" variant="plain" />
            <Button label="Subtle" variant="subtle" />
            <Button label="Soft" variant="soft" />
            <Button label="Link" variant="link" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Severidades</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Button label="Primary" severity="primary" />
            <Button label="Secondary" severity="secondary" />
            <Button label="Warning" severity="warning" />
            <Button label="Success" severity="success" />
            <Button label="Error" severity="error" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Tamaños y forma</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Button label="Extra small" size="xs" />
            <Button label="Small" size="sm" />
            <Button label="Medium" size="md" />
            <Button label="Large" size="lg" />
            <Button label="Redondeado" rounded />
            <Button icon="check" square aria-label="Confirmar" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Iconos y loading</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Button label="Guardar" icon="check" />
            <Button label="Continuar" trailing-icon="chevronRight" variant="outline" />
            <Button
              label="Verificado"
              icon="check"
              trailing-icon="chevronRight"
              severity="success"
            />
            <Button label="Procesando" loading />
            <Button icon="check" loading square aria-label="Procesando" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Color personalizado</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Button label="Violeta" color="#8b5cf6" />
            <Button label="Naranja" color="#f97316" variant="outline" />
            <Button label="Turquesa" color="#14b8a6" variant="soft" />
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold">Slots y UI</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Button variant="outline">
              <template #leading>
                <span class="size-2 rounded-full bg-success" />
              </template>
              Disponible
              <template #trailing>
                <Icon name="chevronRight" />
              </template>
            </Button>

            <Button loading>
              <template #loading>
                <Icon name="spinner" class="animate-spin" />
              </template>
              Cargando
            </Button>

            <Button
              label="UI personalizada"
              size="lg"
              :ui="{
                root: ({ size, severity }) => ({
                  class: [
                    'border-dashed uppercase tracking-wider shadow-sm',
                    size === 'lg' && 'px-8',
                    severity === 'primary' && 'ring-2 ring-primary/20',
                  ],
                  'data-example': 'custom-button-ui',
                }),
              }"
            />
          </div>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
