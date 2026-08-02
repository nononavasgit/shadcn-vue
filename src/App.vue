<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { AspectRatio } from '@/components/ui/AspectRatio'
import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'
import { Empty } from '@/components/ui/Empty'
import { Label } from '@/components/ui/Label'
import { Kbd, KbdGroup } from '@/components/ui/Kbd'
import { Card } from '@/components/ui/Card'
import { Switch } from '@/components/ui/Switch'
import { Checkbox } from '@/components/ui/Checkbox'

const comment = ref('')
const name = ref('')
const notifications = ref(true)
const automaticUpdates = ref(false)
const termsAccepted = ref(false)
const marketingEmails = ref(true)
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
            <div
              class="flex h-full items-center justify-center bg-linear-to-br from-primary/20 to-primary/5"
            >
              <span class="text-2xl font-semibold text-primary">16:9</span>
            </div>
          </AspectRatio>
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">4:3</p>
          <AspectRatio :ratio="4 / 3" class="overflow-hidden rounded-lg border bg-muted">
            <div
              class="flex h-full items-center justify-center bg-linear-to-br from-success/20 to-success/5"
            >
              <span class="text-2xl font-semibold text-success">4:3</span>
            </div>
          </AspectRatio>
        </div>

        <div class="space-y-2 md:col-span-2">
          <p class="text-sm text-muted-foreground">Personalizada (3:2)</p>
          <AspectRatio :ratio="3 / 2" class="overflow-hidden rounded-lg border bg-muted">
            <div
              class="flex h-full items-center justify-center bg-linear-to-br from-warning/20 to-warning/5"
            >
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
        <Textarea id="comment" v-model="comment" placeholder="Escribe un comentario..." rows="4" />
        <p class="text-sm text-muted-foreground">{{ comment.length }} caracteres</p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <label for="prefilled" class="text-sm font-medium">Con valor inicial</label>
          <Textarea id="prefilled" default-value="Este texto se puede editar." rows="3" />
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

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Empty</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <Empty
          label="No hay resultados"
          description="Prueba a cambiar los filtros de búsqueda."
          class="border"
        >
          <template #media>
            <div class="flex size-10 items-center justify-center rounded-lg bg-muted text-xl">
              🔍
            </div>
          </template>
          <Button size="sm" variant="outline">Limpiar filtros</Button>
        </Empty>

        <Empty
          media-variant="icon"
          label="Tu lista está vacía"
          description="Añade un elemento para empezar a organizar tu contenido."
          class="border"
        >
          <template #media>＋</template>
          <Button size="sm">Añadir elemento</Button>
        </Empty>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Label</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <Label for="label-username">Nombre de usuario</Label>
          <Input id="label-username" placeholder="usuario" />
        </div>

        <div class="space-y-2">
          <Label for="label-email"> Email <span class="text-destructive">*</span> </Label>
          <Input id="label-email" type="email" placeholder="nombre@ejemplo.com" />
        </div>

        <div class="space-y-2 md:col-span-2">
          <Label for="label-disabled">Campo deshabilitado</Label>
          <Input id="label-disabled" default-value="No editable" disabled />
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Kbd</h2>

      <div class="space-y-3">
        <p class="flex items-center gap-2 text-sm text-muted-foreground">
          Abrir la búsqueda
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </p>

        <p class="flex items-center gap-2 text-sm text-muted-foreground">
          Guardar cambios
          <KbdGroup>
            <Kbd label="Ctrl" />
            <Kbd>+</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </p>

        <p class="flex items-center gap-2 text-sm text-muted-foreground">
          Tecla individual
          <Kbd label="Esc" />
        </p>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Card</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <Card
          label="Perfil de usuario"
          description="Actualiza tus datos personales."
          class="border"
        >
          <template #action>
            <Button size="sm" variant="outline">Editar</Button>
          </template>
          <div class="space-y-2 text-sm text-muted-foreground">
            <p><span class="font-medium text-foreground">Nombre:</span> María García</p>
            <p><span class="font-medium text-foreground">Rol:</span> Diseñadora</p>
          </div>
          <template #footer>
            <span class="text-xs text-muted-foreground">Actualizado hoy</span>
          </template>
        </Card>

        <Card label="Estadísticas" description="Resumen de actividad" class="border">
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-md bg-muted p-3">
              <p class="text-2xl font-semibold">128</p>
              <p class="text-xs text-muted-foreground">Proyectos</p>
            </div>
            <div class="rounded-md bg-muted p-3">
              <p class="text-2xl font-semibold">94%</p>
              <p class="text-xs text-muted-foreground">Completados</p>
            </div>
          </div>
          <template #footer>
            <Button size="sm" variant="plain">Ver detalles</Button>
          </template>
        </Card>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Switch</h2>

      <div class="space-y-4">
        <div class="flex items-center justify-between rounded-lg border p-4">
          <div class="space-y-1">
            <Label for="notifications-switch">Notificaciones</Label>
            <p class="text-sm text-muted-foreground">Recibir avisos por email.</p>
          </div>
          <Switch id="notifications-switch" v-model="notifications" />
        </div>

        <div class="flex items-center justify-between rounded-lg border p-4">
          <div class="space-y-1">
            <Label for="updates-switch">Actualizaciones automáticas</Label>
            <p class="text-sm text-muted-foreground">Instalar nuevas versiones automáticamente.</p>
          </div>
          <Switch id="updates-switch" v-model="automaticUpdates">
            <template #thumb="{ checked }">
              <span class="">{{ checked ? '✓' : '' }}</span>
            </template>
          </Switch>
        </div>

        <div class="flex items-center justify-between rounded-lg border p-4 opacity-70">
          <div class="space-y-1">
            <Label for="disabled-switch">Función no disponible</Label>
            <p class="text-sm text-muted-foreground">Este ajuste está deshabilitado.</p>
          </div>
          <Switch id="disabled-switch" :default-value="true" disabled />
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Checkbox</h2>

      <div class="space-y-4">
        <div class="flex items-start gap-3 rounded-lg border p-4">
          <Checkbox id="terms-checkbox" v-model="termsAccepted" class="mt-0.5" />
          <div class="space-y-1">
            <Label for="terms-checkbox">Acepto los términos y condiciones</Label>
            <p class="text-sm text-muted-foreground">Necesario para continuar.</p>
          </div>
        </div>

        <div class="flex items-start gap-3 rounded-lg border p-4">
          <Checkbox id="marketing-checkbox" v-model="marketingEmails" class="mt-0.5" />
          <div class="space-y-1">
            <Label for="marketing-checkbox">Recibir novedades</Label>
            <p class="text-sm text-muted-foreground">Te enviaremos novedades ocasionalmente.</p>
          </div>
        </div>

        <div class="flex items-start gap-3 rounded-lg border p-4">
          <Checkbox id="custom-checkbox" default-value="indeterminate" class="mt-0.5">
            <template #indicator="{ state }">
              <span class="text-xs">{{ state === 'indeterminate' ? '−' : '✓' }}</span>
            </template>
          </Checkbox>
          <div class="space-y-1">
            <Label for="custom-checkbox">Selección parcial</Label>
            <p class="text-sm text-muted-foreground">Indicador personalizado.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
