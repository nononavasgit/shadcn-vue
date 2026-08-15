<script setup lang="ts">
import { Alert } from '@/components/ui/Alert'
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

        <header>
          <h2 class="text-2xl font-semibold">Alert playground</h2>
          <p class="text-sm text-muted-foreground">Ejemplos del componente Alert.</p>
        </header>

        <section class="grid max-w-xl gap-4">
          <Alert
            label="Cambios guardados"
            description="La configuración se ha actualizado correctamente."
            icon="success"
            severity="success"
            closable
          />

          <Alert
            label="Revisa los datos"
            description="Algunos campos necesitan tu atención antes de continuar."
            icon="warning"
            variant="outline"
            severity="warning"
          />

          <Alert
            label="No se pudo completar la operación"
            description="Inténtalo de nuevo dentro de unos minutos."
            icon="error"
            variant="solid"
            severity="error"
            closable
          />

          <Alert
            label="Color personalizado"
            description="Este aviso utiliza un color CSS en lugar de una severidad semántica."
            icon="info"
            color="#7c3aed"
          />

          <Alert severity="secondary" decorative>
            <template #icon>
              <span aria-hidden="true">✨</span>
            </template>
            <template #label>Contenido personalizado</template>
            <template #description>
              Los slots reciben el contexto visual y de comportamiento del Alert.
            </template>
          </Alert>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
