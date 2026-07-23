<script setup lang="ts">
import { ref } from 'vue'
import { Boton } from '@/components/app/Button'
import { Icon } from '@/components/app/Icon'

const variants = ['solid', 'outlined', 'plain', 'subtle', 'soft'] as const
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

const saving = ref(false)

function save() {
  if (saving.value) return

  saving.value = true
  window.setTimeout(() => {
    saving.value = false
  }, 1500)
}
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-6xl space-y-12">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Button</h1>
        <p class="max-w-2xl text-muted-foreground">
          Ejemplos actualizados con las props y slots en inglés.
        </p>
      </header>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Basic API</h2>
          <p class="text-sm text-muted-foreground">
            Label, leading icon, trailing icon y configuración completa del icono.
          </p>
        </div>

        <div class="flex flex-row items-center gap-3 overflow-x-auto pb-2">
          <Boton label="Default button" />
          <Boton label="Save" icon="guardar" />
          <Boton label="Continue" trailing-icon="chevronRight" />
          <Boton label="Configured icon" :icon="{ name: 'info', size: 'lg', color: 'oklch(0.55 0.2 255)' }" />
          <Boton label="Both icons" icon="guardar" :trailing-icon="{ name: 'chevronRight', size: 'sm' }" />
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Variants and severities</h2>
          <p class="text-sm text-muted-foreground">
            Cada variant puede combinarse con cualquier severity.
          </p>
        </div>

        <div class="overflow-x-auto rounded-xl border">
          <div class="grid min-w-5xl grid-cols-[8rem_repeat(5,minmax(9rem,1fr))]">
            <div class="border-b bg-muted/50 p-4 text-sm font-medium">Severity</div>
            <div v-for="variant in variants" :key="variant"
              class="border-b bg-muted/50 p-4 text-sm font-medium capitalize">
              {{ variant }}
            </div>

            <template v-for="severity in severities" :key="severity">
              <div class="flex items-center border-b p-4 text-sm font-medium capitalize">
                {{ severity }}
              </div>
              <div v-for="variant in variants" :key="`${severity}-${variant}`" class="flex items-center border-b p-4">
                <Boton :label="severity" :variant="variant" :severity="severity" />
              </div>
            </template>
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Sizes and shapes</h2>
          <p class="text-sm text-muted-foreground">Sizes, rounded buttons y square icon buttons.</p>
        </div>

        <div class="flex flex-row items-center gap-3 overflow-x-auto pb-2">
          <Boton v-for="size in sizes" :key="`size-${size}`" :label="size" :size="size" />
          <Boton label="Rounded" rounded variant="outlined" />
          <Boton v-for="size in sizes" :key="`square-${size}`" icon="guardar" square rounded :size="size"
            :aria-label="`Save, size ${size}`" />
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Loading and states</h2>
          <p class="text-sm text-muted-foreground">
            Loading automático, loading personalizado y aria-disabled.
          </p>
        </div>

        <div class="flex flex-row items-center gap-3 overflow-x-auto pb-2">
          <Boton :label="saving ? 'Saving…' : 'Save changes'" icon="guardar" :loading="saving" @click="save" />

          <Boton label="Custom loading" loading severity="secondary">
            <template #loading>
              <Icon name="cargando" size="lg" color="currentColor" class="animate-spin" />
            </template>
          </Boton>

          <Boton label="Unavailable" aria-disabled="true" variant="soft" severity="error" />
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Slots</h2>
          <p class="text-sm text-muted-foreground">
            Los slots leading y trailing sustituyen los iconos de las props.
          </p>
        </div>

        <div class="flex flex-row items-center gap-3 overflow-x-auto pb-2">
          <Boton label="Slot icons" icon="guardar" trailing-icon="cerrar" variant="subtle">
            <template #leading>
              <Icon name="buscar" color="oklch(0.6 0.2 260)" />
            </template>
            <template #trailing>
              <Icon name="chevronAbajo" size="sm" />
            </template>
          </Boton>

          <Boton variant="soft" severity="success">
            <template #leading>
              <Icon name="exito" />
            </template>
            Custom default slot
          </Boton>
        </div>
      </section>
    </div>
  </main>
</template>
