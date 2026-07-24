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
          Imágenes de usuario con texto, icono o contenido personalizado como fallback.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">
            Label aparece automáticamente cuando la imagen está cargando o no está disponible.
          </p>
        </div>

        <Avatar src="https://github.com/shadcn.png" alt="Avatar de shadcn" label="CN" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Varios usuarios</h2>
          <p class="text-sm text-muted-foreground">
            Cada avatar mantiene de forma independiente el estado de su imagen.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <Avatar src="https://github.com/shadcn.png" alt="Avatar de shadcn" label="CN" />
          <Avatar src="https://github.com/leerob.png" alt="Avatar de Lee Robinson" label="LR" />
          <Avatar src="https://github.com/evilrabbit.png" alt="Avatar de evilrabbit" label="ER" />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Fallback de texto</h2>
          <p class="text-sm text-muted-foreground">
            Puede utilizarse sin src o como respaldo de una dirección que falla.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <Avatar
            label="NN"
            aria-label="Usuario sin imagen"
            class="bg-primary text-primary-foreground"
          />
          <Avatar
            src="/imagen-que-no-existe.png"
            alt="Imagen no disponible"
            label="404"
            class="bg-error text-xs text-error-foreground"
          />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Fallback con icono</h2>
          <p class="text-sm text-muted-foreground">
            Icon acepta el nombre directamente o un objeto con IconProps y atributos SVG.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <Avatar icon="info" aria-label="Información del usuario" />
          <Avatar
            :icon="{ name: 'search', size: 'sm', class: 'text-primary' }"
            aria-label="Buscar usuario"
          />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Slot fallback</h2>
          <p class="text-sm text-muted-foreground">
            El slot tiene prioridad sobre icon y label y admite cualquier contenido.
          </p>
        </div>

        <Avatar icon="info" label="Perfil" aria-label="Perfil sin fotografía">
          <template #fallback>
            <span class="flex items-center gap-1 text-xs">
              <Icon name="success" class="size-3" aria-hidden="true" />
              OK
            </span>
          </template>
        </Avatar>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Atributos HTML</h2>
          <p class="text-sm text-muted-foreground">
            Los atributos adicionales se aplican tanto a AvatarImage como a AvatarFallback.
          </p>
        </div>

        <Avatar
          src="https://github.com/vuejs.png"
          alt="Avatar de Vue"
          label="VU"
          class="grayscale"
          title="Vue"
        />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Estado de carga</h2>
          <p class="text-sm text-muted-foreground">
            LoadingStatusChange permite reaccionar a la carga, aunque el fallback no lo necesita.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <Avatar
            src="https://github.com/vuejs.png"
            alt="Avatar de Vue"
            label="VU"
            @loading-status-change="loadingStatus = $event"
          />
          <code class="rounded bg-muted px-2 py-1 text-sm">{{ loadingStatus }}</code>
        </div>
      </section>
    </div>
  </main>
</template>
