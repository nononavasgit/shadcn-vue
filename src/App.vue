<script setup lang="ts">
import { HoverCard } from '@/components/app/HoverCard'
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
    <section class="space-y-6 text-center">
      <div class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Hover Card</h1>
        <p class="text-sm text-muted-foreground">
          Pasa el cursor sobre el enlace para previsualizar el perfil.
        </p>
      </div>

      <HoverCard
        :open-delay="200"
        :close-delay="150"
        side="bottom"
        align="center"
        :side-offset="8"
        :ui="{
          content: {
            class: 'w-80',
          },
        }"
      >
        <a
          href="https://github.com/unovue"
          target="_blank"
          rel="noreferrer"
          class="inline-flex rounded-md px-2 py-1 text-sm font-medium underline underline-offset-4 hover:text-primary"
        >
          @unovue
        </a>

        <template #content>
          <div class="flex gap-4 text-left">
            <div
              class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            >
              UV
            </div>

            <div class="space-y-1">
              <h2 class="text-sm font-semibold">Unovue</h2>
              <p class="text-sm text-muted-foreground">
                Librerías accesibles y sin estilos para construir interfaces Vue.
              </p>
              <p class="pt-2 text-xs text-muted-foreground">Miembro de GitHub desde 2023</p>
            </div>
          </div>
        </template>
      </HoverCard>
    </section>
  </main>
</template>
