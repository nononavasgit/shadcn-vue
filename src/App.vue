<script setup lang="ts">
import { ConfigProvider } from '@/components/provider'
import { Kbd, KbdGroup } from '@/components/ui'
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
      <div class="mx-auto max-w-3xl space-y-10">
        <header class="space-y-2">
          <h1 class="text-3xl font-bold">Kbd</h1>
          <p class="text-muted-foreground">Teclas y combinaciones para acciones rápidas.</p>
        </header>

        <section class="space-y-4">
          <h2 class="text-lg font-semibold">Teclas</h2>
          <div class="flex flex-wrap items-center gap-3">
            <Kbd label="Esc" />
            <Kbd label="Enter" />
            <Kbd label="Tab" />
            <Kbd label="⌘" />
            <Kbd label="⇧" />
            <Kbd label="⌫" />
          </div>
        </section>

        <section class="space-y-4 border-t pt-8">
          <h2 class="text-lg font-semibold">Combinaciones</h2>
          <div class="divide-y border-y">
            <div class="flex items-center justify-between gap-6 py-4">
              <span>Abrir búsqueda</span>
              <KbdGroup aria-label="Comando K">
                <Kbd label="⌘" />
                <span>+</span>
                <Kbd label="K" />
              </KbdGroup>
            </div>

            <div class="flex items-center justify-between gap-6 py-4">
              <span>Guardar cambios</span>
              <KbdGroup aria-label="Control S">
                <Kbd label="Ctrl" />
                <span>+</span>
                <Kbd label="S" />
              </KbdGroup>
            </div>

            <div class="flex items-center justify-between gap-6 py-4">
              <span>Paleta de comandos</span>
              <KbdGroup aria-label="Control Mayúsculas P">
                <Kbd label="Ctrl" />
                <span>+</span>
                <Kbd label="⇧" />
                <span>+</span>
                <Kbd label="P" />
              </KbdGroup>
            </div>
          </div>
        </section>

        <section class="space-y-4 border-t pt-8">
          <h2 class="text-lg font-semibold">Slot y UI</h2>
          <div class="flex flex-wrap items-center gap-4">
            <Kbd label="Comando">
              <span aria-hidden="true">⌘</span>
            </Kbd>

            <Kbd
              label="Enter"
              :ui="{
                root: ({ label }) => ({
                  class: label === 'Enter' && 'h-7 border border-primary/30 bg-primary/10 px-2',
                }),
              }"
            />
          </div>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
