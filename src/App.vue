<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, type AvatarLoadingStatus } from '@/components/app/Avatar'
import { Icon } from '@/components/app/Icon'

const loadingStatus = ref<AvatarLoadingStatus>('idle')
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-3xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Avatar</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Imágenes de usuario con contenido alternativo mientras cargan o cuando no están
          disponibles.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">
            Si la imagen carga correctamente, sustituye automáticamente al fallback.
          </p>
        </div>

        <Avatar src="https://github.com/shadcn.png" alt="Avatar de shadcn" fallback="CN" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Varios usuarios</h2>
          <p class="text-sm text-muted-foreground">
            Cada avatar mantiene su propio estado de carga y fallback.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <Avatar src="https://github.com/shadcn.png" alt="Avatar de shadcn" fallback="CN" />
          <Avatar src="https://github.com/leerob.png" alt="Avatar de Lee Robinson" fallback="LR" />
          <Avatar
            src="https://github.com/evilrabbit.png"
            alt="Avatar de evilrabbit"
            fallback="ER"
          />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Fallback</h2>
          <p class="text-sm text-muted-foreground">
            También puede usarse sin imagen o como respaldo cuando la URL falla.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <Avatar
            fallback="NN"
            aria-label="Usuario sin imagen"
            :ui="{ fallback: { class: 'bg-primary text-primary-foreground' } }"
          />
          <Avatar
            src="/imagen-que-no-existe.png"
            alt="Imagen no disponible"
            fallback="404"
            :ui="{ fallback: { class: 'bg-error text-error-foreground text-xs' } }"
          />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Tamaños</h2>
          <p class="text-sm text-muted-foreground">
            Los atributos class personalizan el contenedor sin perder los estilos base.
          </p>
        </div>

        <div class="flex items-end gap-4">
          <Avatar
            class="size-7"
            src="https://github.com/shadcn.png"
            alt="Avatar pequeño de shadcn"
            fallback="CN"
            :ui="{ fallback: { class: 'text-xs' } }"
          />
          <Avatar
            class="size-10"
            src="https://github.com/leerob.png"
            alt="Avatar mediano de Lee Robinson"
            fallback="LR"
          />
          <Avatar
            class="size-16"
            src="https://github.com/evilrabbit.png"
            alt="Avatar grande de evilrabbit"
            fallback="ER"
            :ui="{ fallback: { class: 'text-lg font-semibold' } }"
          />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Grupo</h2>
          <p class="text-sm text-muted-foreground">
            Los avatares pueden solaparse para representar miembros de un equipo.
          </p>
        </div>

        <div class="flex -space-x-2">
          <Avatar
            class="ring-2 ring-background"
            src="https://github.com/shadcn.png"
            alt="shadcn"
            fallback="CN"
          />
          <Avatar
            class="ring-2 ring-background"
            src="https://github.com/leerob.png"
            alt="Lee Robinson"
            fallback="LR"
          />
          <Avatar
            class="ring-2 ring-background"
            src="https://github.com/evilrabbit.png"
            alt="evilrabbit"
            fallback="ER"
          />
          <Avatar
            class="ring-2 ring-background"
            fallback="+3"
            aria-label="Tres usuarios más"
            :ui="{ fallback: { class: 'bg-secondary text-xs font-medium' } }"
          />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Slot fallback</h2>
          <p class="text-sm text-muted-foreground">
            El contenido de respaldo admite cualquier nodo, no solamente texto.
          </p>
        </div>

        <Avatar class="size-12" aria-label="Perfil sin fotografía">
          <template #fallback>
            <Icon name="info" class="size-5" aria-hidden="true" />
          </template>
        </Avatar>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Estado de carga</h2>
          <p class="text-sm text-muted-foreground">
            LoadingStatusChange permite conocer el estado actual de la imagen.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <Avatar
            src="https://github.com/vuejs.png"
            alt="Avatar de Vue"
            fallback="VU"
            :delay-ms="200"
            @loading-status-change="loadingStatus = $event"
          />
          <code class="rounded bg-muted px-2 py-1 text-sm">{{ loadingStatus }}</code>
        </div>
      </section>
    </div>
  </main>
</template>
