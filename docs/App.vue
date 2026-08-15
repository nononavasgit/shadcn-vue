<script setup lang="ts">
import { FieldSet } from '@/components/ui/FieldSet'
import { Input } from '@/components/ui/Input'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background p-8 text-foreground">
      <div class="mx-auto flex max-w-3xl flex-col gap-8">
        <header>
          <h1 class="text-2xl font-semibold">FieldSet playground</h1>
          <p class="text-sm text-muted-foreground">Ejemplos del componente FieldSet.</p>
        </header>

        <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <FieldSet
            legend="Datos personales"
            description="Completa la información que aparecerá en tu perfil."
          >
            <div class="grid gap-2">
              <label class="text-sm font-medium" for="name">Nombre</label>
              <Input id="name" placeholder="Nombre completo" />
            </div>
            <div class="grid gap-2">
              <label class="text-sm font-medium" for="email">Correo electrónico</label>
              <Input id="email" type="email" placeholder="correo@ejemplo.com" />
            </div>
          </FieldSet>

          <FieldSet
            legend="Preferencias"
            legend-variant="label"
            description="La variante label muestra una leyenda más compacta."
          >
            <label class="flex items-center gap-3 text-sm">
              <input type="checkbox" class="size-4" />
              Recibir novedades por correo
            </label>
            <label class="flex items-center gap-3 text-sm">
              <input type="checkbox" class="size-4" />
              Activar recomendaciones personalizadas
            </label>
          </FieldSet>

          <FieldSet>
            <template #legend>Contenido mediante slots</template>
            <template #description>
              La leyenda y la descripción también admiten contenido personalizado.
            </template>
            <p class="text-sm">Contenido principal del grupo.</p>
          </FieldSet>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
