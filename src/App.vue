<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
</script>

<template>
  <main class="mx-auto min-h-screen max-w-2xl space-y-10 p-6 md:p-10">
    <Button rounded variant="outline">Limpiar</Button>
    <Button loading variant="subtle">Guardar perfil</Button>
    <Button variant="plain" icon="error" color="#ef4444" size="sm">Limpiar</Button>
    <Badge variant="solid" severity="primary">Badge</Badge>
    <Badge variant="solid" severity="success">Badge</Badge>
    <Badge variant="solid" severity="warning">Badge</Badge>
    <Badge variant="solid" severity="error">Badge</Badge>
    <Badge variant="outline" severity="primary">Badge</Badge>
    <Badge variant="outline" severity="success">Badge</Badge>
    <Badge variant="outline" severity="warning">Badge</Badge>
    <Badge variant="outline" severity="error">Badge</Badge>

    <Badge variant="solid" severity="primary" icon="check">Badge</Badge>
    <Badge variant="solid" severity="primary" trailing-icon="check">Badge</Badge>

    <Badge variant="solid" label="New" color="#3b82f6" size="sm"></Badge>

    <Separator :decorative="false"></Separator>

    <div class="flex h-5 items-center gap-4">
      <span>a</span>
      <Separator :decorative="false" orientation="vertical"></Separator>
      <span>b</span>
    </div>
  </main>
</template>
