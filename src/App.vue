<script setup lang="ts">
import { ref } from 'vue'
import { AspectRatio } from '@/components/ui/AspectRatio'
import { Avatar } from '@/components/ui/Avatar'
import { Icon } from '@/components/ui/Icon'

const avatarLoading = ref(false)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Avatar y AspectRatio</h1>
      <p class="text-muted-foreground">
        Ejemplos de imágenes, fallbacks, slots, proporciones y personalización mediante ui.
      </p>
    </header>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Avatar básico</h2>
        <p class="text-sm text-muted-foreground">
          Estado de carga: {{ avatarLoading ? 'cargando' : 'completado' }}.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-5">
        <Avatar
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop"
          alt="Retrato de una usuaria"
          label="AM"
          @loading-state-change="avatarLoading = $event"
        />

        <Avatar
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop"
          alt="Retrato de un usuario"
          label="JD"
        />

        <Avatar label="NS" />
        <Avatar icon="info" aria-label="Usuario sin imagen" />
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Tamaños y fallbacks</h2>
        <p class="text-sm text-muted-foreground">
          El tamaño se controla desde el root mediante atributos HTML.
        </p>
      </div>

      <div class="flex flex-wrap items-end gap-5">
        <Avatar label="XS" :ui="{ root: { class: 'size-6 text-[10px]' } }" />
        <Avatar label="SM" :ui="{ root: { class: 'size-8 text-xs' } }" />
        <Avatar label="MD" :ui="{ root: { class: 'size-12 text-sm' } }" />
        <Avatar label="LG" :ui="{ root: { class: 'size-16 text-lg' } }" />
        <Avatar label="XL" :ui="{ root: { class: 'size-24 text-2xl' } }" />

        <Avatar
          src="/imagen-inexistente.jpg"
          alt="Imagen que provoca el fallback"
          label="ER"
          :ui="{
            root: { class: 'size-16' },
            fallback: { class: 'bg-error/10 font-semibold text-error' },
          }"
        />
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots y ui</h2>
        <p class="text-sm text-muted-foreground">
          Root, image, fallback e icon contienen atributos HTML normalizados.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-6">
        <Avatar
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
          alt="Avatar personalizado"
          :ui="{
            root: { class: 'size-20 rounded-xl ring-4 ring-primary/20' },
            image: { class: 'rounded-xl grayscale transition hover:grayscale-0' },
            fallback: { class: 'rounded-xl bg-primary/10 text-primary' },
          }"
        />

        <Avatar
          class="size-20 rounded-xl"
          :ui="{
            fallback: { class: 'rounded-xl bg-primary/10 text-primary' },
          }"
        >
          <template #fallback>
            <div class="flex flex-col items-center gap-1">
              <Icon name="warning" />
              <span class="text-[10px] font-medium">SIN FOTO</span>
            </div>
          </template>
        </Avatar>

        <Avatar
          icon="success"
          :ui="{
            root: { class: 'size-16 ring-2 ring-success/30' },
            fallback: { class: 'bg-success/10 text-success' },
            icon: { class: 'size-7' },
          }"
          aria-label="Usuario verificado"
        />
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">AspectRatio</h2>
        <p class="text-sm text-muted-foreground">Proporciones habituales para contenido visual.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <span class="text-sm font-medium">16 / 9</span>
          <AspectRatio :ratio="16 / 9" class="overflow-hidden rounded-xl border">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=675&fit=crop"
              alt="Paisaje de montaña"
              class="size-full object-cover"
            />
          </AspectRatio>
        </div>

        <div class="space-y-2">
          <span class="text-sm font-medium">4 / 3</span>
          <AspectRatio :ratio="4 / 3" class="overflow-hidden rounded-xl border">
            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=600&fit=crop"
              alt="Paisaje junto a un lago"
              class="size-full object-cover"
            />
          </AspectRatio>
        </div>

        <div class="space-y-2">
          <span class="text-sm font-medium">1 / 1</span>
          <AspectRatio :ratio="1" class="max-w-sm overflow-hidden rounded-xl border">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop"
              alt="Bosque"
              class="size-full object-cover"
            />
          </AspectRatio>
        </div>

        <div class="space-y-2">
          <span class="text-sm font-medium">Personalizado con ui.root</span>
          <AspectRatio
            :ratio="3 / 2"
            :ui="{
              root: {
                class:
                  'overflow-hidden rounded-2xl border-2 border-primary/30 bg-primary/5 shadow-lg',
              },
            }"
          >
            <div class="flex size-full flex-col items-center justify-center gap-2 text-primary">
              <Icon name="info" size="lg" />
              <span class="font-semibold">Ratio 3 / 2</span>
            </div>
          </AspectRatio>
        </div>
      </div>
    </section>

    <section class="space-y-4 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slot tipado</h2>
        <p class="text-sm text-muted-foreground">El slot expone el valor aspect calculado.</p>
      </div>

      <AspectRatio :ratio="21 / 9" class="overflow-hidden rounded-xl bg-muted">
        <template #default="{ aspect }">
          <div class="flex size-full items-center justify-center">
            <span class="rounded-md bg-background/80 px-3 py-1 text-sm shadow-sm">
              Aspect: {{ aspect }}
            </span>
          </div>
        </template>
      </AspectRatio>
    </section>
  </main>
</template>
