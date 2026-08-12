<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ConfigProvider } from '@/components/provider'
import { Badge } from '@/components/ui/Badge'
</script>

<template>
  <ConfigProvider>
    <div class="min-h-screen bg-background text-foreground">
      <header class="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <RouterLink class="flex items-center gap-3 font-semibold" to="/">
            <span
              class="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"
            >
              N
            </span>
            <span>shadcn-vue</span>
          </RouterLink>
          <div class="flex items-center gap-4">
            <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/">
              Componentes
            </RouterLink>
            <Badge label="v0.3.0" variant="soft" />
          </div>
        </div>
      </header>

      <RouterView />
    </div>
  </ConfigProvider>
</template>
