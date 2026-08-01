<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { AspectRatio } from '@/components/ui/AspectRatio'
import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'

const comment = ref('')
const name = ref('')
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

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Aspect ratio</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">16:9</p>
          <AspectRatio :ratio="16 / 9" class="overflow-hidden rounded-lg border bg-muted">
            <div class="flex h-full items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
              <span class="text-2xl font-semibold text-primary">16:9</span>
            </div>
          </AspectRatio>
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">4:3</p>
          <AspectRatio :ratio="4 / 3" class="overflow-hidden rounded-lg border bg-muted">
            <div class="flex h-full items-center justify-center bg-linear-to-br from-success/20 to-success/5">
              <span class="text-2xl font-semibold text-success">4:3</span>
            </div>
          </AspectRatio>
        </div>

        <div class="space-y-2 md:col-span-2">
          <p class="text-sm text-muted-foreground">Personalizada (3:2)</p>
          <AspectRatio :ratio="3 / 2" class="overflow-hidden rounded-lg border bg-muted">
            <div class="flex h-full items-center justify-center bg-linear-to-br from-warning/20 to-warning/5">
              <span class="text-2xl font-semibold text-warning">3:2</span>
            </div>
          </AspectRatio>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Textarea</h2>

      <div class="space-y-2">
        <label for="comment" class="text-sm font-medium">Comentario</label>
        <Textarea
          id="comment"
          v-model="comment"
          placeholder="Escribe un comentario..."
          rows="4"
        />
        <p class="text-sm text-muted-foreground">{{ comment.length }} caracteres</p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <label for="prefilled" class="text-sm font-medium">Con valor inicial</label>
          <Textarea
            id="prefilled"
            default-value="Este texto se puede editar."
            rows="3"
          />
        </div>

        <div class="space-y-2">
          <label for="disabled" class="text-sm font-medium">Deshabilitado</label>
          <Textarea
            id="disabled"
            default-value="Este campo está deshabilitado."
            disabled
            rows="3"
          />
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Input</h2>

      <div class="space-y-2">
        <label for="name" class="text-sm font-medium">Nombre</label>
        <Input id="name" v-model="name" placeholder="Escribe tu nombre..." />
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <Input id="email" type="email" placeholder="nombre@ejemplo.com" />
        </div>

        <div class="space-y-2">
          <label for="website" class="text-sm font-medium">Con valor inicial</label>
          <Input id="website" default-value="https://ejemplo.com" />
        </div>

        <div class="space-y-2">
          <label for="disabled-input" class="text-sm font-medium">Deshabilitado</label>
          <Input id="disabled-input" default-value="No editable" disabled />
        </div>

        <div class="space-y-2">
          <label for="invalid-input" class="text-sm font-medium">Inválido</label>
          <Input id="invalid-input" aria-invalid="true" placeholder="Campo requerido" />
        </div>
      </div>
    </section>
  </main>
</template>
