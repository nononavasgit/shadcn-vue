<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '@/components/app/Avatar'
import { Badge } from '@/components/app/Badge'
import { Icon } from '@/components/app/Icon'

const avatarLoading = ref(false)
const avatarEvents = ref(0)

function handleAvatarLoading(value: boolean) {
  avatarLoading.value = value
  avatarEvents.value++
}
</script>

<template>
  <main class="mx-auto max-w-5xl space-y-12 p-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Avatar & Badge</h1>
      <p class="text-muted-foreground">Ejemplos de los componentes con su nueva API en inglés.</p>
    </header>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Avatar básico</h2>
        <p class="text-sm text-muted-foreground">Imagen, texto alternativo e icono.</p>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <Avatar src="https://github.com/shadcn.png" alt="Avatar de shadcn" title="SC" />
        <Avatar title="NN" />
        <Avatar icon="info" />
        <Avatar icon="success" :ui="{ icon: { name: 'success', color: '#16a34a' } }" />
        <Avatar src="/image-that-does-not-exist.png" alt="Imagen no disponible" title="ER" />
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Tamaños de Avatar</h2>
        <p class="text-sm text-muted-foreground">El tamaño se personaliza desde ui.root.</p>
      </div>

      <div class="flex flex-wrap items-end gap-4">
        <Avatar
          title="XS"
          :ui="{
            root: { class: 'size-7' },
            fallback: { class: 'text-xs' },
          }"
        />
        <Avatar
          title="SM"
          :ui="{
            root: { class: 'size-9' },
            fallback: { class: 'text-sm' },
          }"
        />
        <Avatar
          src="https://github.com/shadcn.png"
          alt="Avatar mediano"
          title="MD"
          :ui="{ root: { class: 'size-12' } }"
        />
        <Avatar
          icon="info"
          :ui="{
            root: { class: 'size-16' },
            icon: { name: 'info', size: 'lg', color: '#7c3aed' },
          }"
        />
      </div>
    </section>

    <section class="space-y-4">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold">Carga y UI personalizada</h2>
          <p class="text-sm text-muted-foreground">
            Eventos recibidos: {{ avatarEvents }} · {{ avatarLoading ? 'Cargando' : 'En reposo' }}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <Avatar
          src="https://github.com/vuejs.png"
          alt="Avatar de Vue"
          title="VU"
          :ui="{
            root: { class: 'size-14 ring-2 ring-emerald-500 ring-offset-2' },
            image: { class: 'object-cover' },
          }"
          @loading-state-change="handleAvatarLoading"
        />

        <Avatar :ui="{ root: { class: 'size-14 bg-violet-100' } }">
          <template #fallback>
            <span class="font-bold text-violet-700">Slot</span>
          </template>
        </Avatar>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Variantes de Badge</h2>

      <div class="flex flex-wrap gap-3">
        <Badge variant="solid">Solid</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="plain">Plain</Badge>
        <Badge variant="subtle">Subtle</Badge>
        <Badge variant="soft">Soft</Badge>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Severidades de Badge</h2>

      <div class="grid gap-4">
        <div class="flex flex-wrap gap-3">
          <Badge severity="primary">Primary</Badge>
          <Badge severity="secondary">Secondary</Badge>
          <Badge severity="warning">Warning</Badge>
          <Badge severity="success">Success</Badge>
          <Badge severity="error">Error</Badge>
        </div>

        <div class="flex flex-wrap gap-3">
          <Badge variant="outline" severity="primary">Primary</Badge>
          <Badge variant="outline" severity="secondary">Secondary</Badge>
          <Badge variant="outline" severity="warning">Warning</Badge>
          <Badge variant="outline" severity="success">Success</Badge>
          <Badge variant="outline" severity="error">Error</Badge>
        </div>

        <div class="flex flex-wrap gap-3">
          <Badge variant="soft" severity="primary">Primary</Badge>
          <Badge variant="soft" severity="secondary">Secondary</Badge>
          <Badge variant="soft" severity="warning">Warning</Badge>
          <Badge variant="soft" severity="success">Success</Badge>
          <Badge variant="soft" severity="error">Error</Badge>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Tamaños e iconos</h2>

      <div class="flex flex-wrap items-center gap-3">
        <Badge size="sm" icon="info">Small</Badge>
        <Badge size="md" icon="check">Medium</Badge>
        <Badge size="lg" icon="success">Large</Badge>
        <Badge severity="warning" icon="warning">Pendiente</Badge>
        <Badge severity="success" icon="check">Completado</Badge>
        <Badge variant="outline" trailing-icon="x">Descartable</Badge>
        <Badge
          variant="soft"
          :icon="{ name: 'search', size: 'sm' }"
          :trailing-icon="{ name: 'chevronRight', size: 'sm' }"
        >
          Resultado
        </Badge>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Color y slots personalizados</h2>

      <div class="flex flex-wrap gap-3">
        <Badge color="#7c3aed" icon="success">Violeta</Badge>
        <Badge color="#0891b2" variant="outline">Cian</Badge>
        <Badge color="#db2777" variant="soft">Rosa</Badge>

        <Badge variant="outline">
          <template #leading>
            <span class="size-2 rounded-full bg-emerald-500" />
          </template>
          En línea
        </Badge>

        <Badge severity="secondary">
          <template #leading>
            <Icon name="info" size="sm" />
          </template>
          Información
          <template #trailing>
            <Icon name="chevronRight" size="sm" />
          </template>
        </Badge>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Avatar con Badge</h2>

      <div class="flex items-center gap-4 rounded-lg border p-4">
        <div class="relative">
          <Avatar
            src="https://github.com/shadcn.png"
            alt="Perfil de usuario"
            title="SC"
            :ui="{ root: { class: 'size-12' } }"
          />
          <span
            class="absolute right-0 bottom-0 size-3 rounded-full border-2 border-background bg-emerald-500"
            aria-label="En línea"
          />
        </div>

        <div class="min-w-0">
          <p class="font-medium">Usuario de ejemplo</p>
          <div class="mt-1 flex gap-2">
            <Badge size="sm" variant="soft" severity="success" icon="check"> Verificado </Badge>
            <Badge size="sm" variant="outline">Administrador</Badge>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
