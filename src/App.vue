<script setup lang="ts">
import { Button } from './components/ui/button'
</script>
<template>
  <main class="min-h-screen bg-background text-foreground">
    <section class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6">
      <div class="space-y-3">
        <p class="text-sm font-medium text-muted-foreground">@nonito/ui</p>
        <h1 class="text-4xl font-bold tracking-tight">Tu librería de componentes Vue</h1>
        <p class="max-w-xl text-muted-foreground">
          Componentes reutilizables basados en shadcn-vue, listos para consumir desde tus apps.
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
        <Button>Default</Button><Button variant="secondary">Secondary</Button
        ><Button variant="outline">Outline</Button><Button variant="destructive">Destructive</Button
        ><Button variant="ghost">Ghost</Button>
      </div>
    </section>
  </main>
</template>
