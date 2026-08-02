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
import { Progress } from '@/components/ui/Progress'
import { ProgressCircular } from '@/components/ui/ProgressCircular'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { Toggle } from '@/components/ui/Toggle'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { Tooltip } from '@/components/ui/Tooltip'
import { Slider } from '@/components/ui/Slider'

const comment = ref('')
const name = ref('')
const notifications = ref(true)
const automaticUpdates = ref(false)
const circularProgress = ref(45)
const circularProgressColored = ref(78)
const circularProgressPending = ref<number | null>(10)
const progressValue = ref(32)
const progressValueColored = ref(72)
const progressPending = ref<number | null>(null)
const boldActive = ref(false)
const notificationsToggle = ref(true)
const termsAccepted = ref(false)
const marketingEmails = ref(true)
const sliderValue = ref<number[] | null>([35])
const rangeSliderValue = ref<number[]>([25, 75])
const selectedView = ref('list')
const selectedFormats = ref<string[]>(['bold'])
const toggleViewItems = [
  { id: 'list', value: 'list', label: 'Lista' },
  { id: 'grid', value: 'grid', label: 'Cuadrícula' },
  { id: 'kanban', value: 'kanban', label: 'Kanban' },
]
const toggleFormatItems = [
  { id: 'bold', value: 'bold', label: 'Negrita' },
  { id: 'italic', value: 'italic', label: 'Cursiva' },
  { id: 'underline', value: 'underline', label: 'Subrayado' },
]
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

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Progress</h2>

      <div class="space-y-5">
        <Progress v-model="progressValue" label="32%" />

        <Progress v-model="progressValueColored" label="72%" color="#8b5cf6">
          <template #label="{ percentage }">{{ Math.round(percentage) }}% completado</template>
        </Progress>

        <Progress v-model="progressPending" label="Procesando..." track-color="#e5e7eb" />
      </div>
    </section>

    <div class="flex flex-wrap items-center gap-6">
      <ProgressCircular v-model="circularProgress" />
      <ProgressCircular
        v-model="circularProgressColored"
        :size="96"
        :thickness="10"
        color="#8b5cf6"
      >
        <template #label="{ percentage }">{{ Math.round(percentage) }}%</template>
      </ProgressCircular>
      <ProgressCircular
        v-model="circularProgressPending"
        :size="96"
        :label="
          circularProgressPending !== null ? `${Math.round(circularProgressPending)}%` : undefined
        "
      />
      <Button
        variant="outline"
        @click="() => (circularProgressPending = (circularProgressPending ?? 0) + 10)"
      >
        +
      </Button>
      <Button
        variant="outline"
        @click="() => (circularProgressPending = (circularProgressPending ?? 0) - 10)"
      >
        -
      </Button>
    </div>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">ScrollArea</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">Vertical</p>
          <ScrollArea class="h-48 rounded-md border p-4">
            <div class="space-y-4">
              <div v-for="item in 12" :key="item" class="border-b pb-3 last:border-0">
                <p class="font-medium">Elemento {{ item }}</p>
                <p class="text-sm text-muted-foreground">Contenido desplazable de ejemplo.</p>
              </div>
            </div>
          </ScrollArea>
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">Horizontal</p>
          <ScrollArea orientation="horizontal" class="w-full rounded-md border p-4">
            <div class="flex w-max gap-3">
              <div
                v-for="item in 8"
                :key="item"
                class="flex h-24 w-36 shrink-0 items-center justify-center rounded-md bg-muted text-sm"
              >
                Tarjeta {{ item }}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Toggle</h2>

      <div class="flex flex-wrap items-center gap-3">
        <Toggle v-model="boldActive" label="Negrita" variant="outline" />
        <Toggle v-model="notificationsToggle" label="Notificaciones" severity="primary" />
        <Toggle variant="outline" severity="success">
          <template #default="{ pressed }">{{ pressed ? 'Activado' : 'Desactivado' }}</template>
        </Toggle>
      </div>
    </section>
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">ToggleGroup</h2>

      <div class="space-y-5">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">Vista seleccionada: {{ selectedView }}</p>
          <ToggleGroup
            v-model="selectedView"
            :items="toggleViewItems"
            variant="outline"
            mandatory
            aria-label="Seleccionar vista (obligatoria)"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">
            Formatos: {{ selectedFormats.join(', ') || 'ninguno' }}
          </p>
          <ToggleGroup
            v-model="selectedFormats"
            :items="toggleFormatItems"
            type="multiple"
            variant="outline"
            :spacing="1"
            aria-label="Seleccionar formatos"
            mandatory
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">Grupo vertical con opción deshabilitada</p>
          <ToggleGroup
            :items="[
              { id: 'day', value: 'day', label: 'Día' },
              { id: 'week', value: 'week', label: 'Semana' },
              { id: 'month', value: 'month', label: 'Mes', disabled: true },
            ]"
            orientation="vertical"
            :variant="'plain'"
            :color="'#3b82f6'"
            :spacing="1"
            aria-label="Seleccionar periodo"
          />
        </div>
      </div>
    </section>
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Tooltip</h2>

      <div class="flex flex-wrap items-center gap-4">
        <Tooltip label="Guardar cambios">
          <Button variant="outline" icon="save" aria-label="Guardar" />
        </Tooltip>

        <Tooltip label="Este tooltip aparece a la derecha" :content="{ side: 'right' }">
          <Button variant="subtle">Posición derecha</Button>
        </Tooltip>

        <Tooltip>
          <Button variant="plain">Contenido personalizado</Button>
          <template #content="{ open }">
            <span>{{ open ? 'Tooltip abierto' : 'Tooltip' }}</span>
          </template>
        </Tooltip>
      </div>
    </section>
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Slider</h2>

      <div class="space-y-5">
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span>Volumen</span>
            <span class="text-muted-foreground">{{ sliderValue?.[0] ?? 0 }}</span>
          </div>
          <Slider v-model="sliderValue" />
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span>Rango</span>
            <span class="text-muted-foreground">{{ rangeSliderValue.join(' – ') }}</span>
          </div>
          <Slider v-model="rangeSliderValue" :step="5" />
        </div>

        <div class="flex h-40 items-center gap-4">
          <Slider orientation="vertical" :default-value="[60]" aria-label="Progreso vertical" />
          <span class="text-sm text-muted-foreground">Vertical</span>
        </div>
      </div>
    </section>
  </main>
</template>
