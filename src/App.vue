<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '@/components/ui/Alert'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Icon } from '@/components/ui/Icon'
import { Kbd, KbdGroup } from '@/components/ui/Kbd'
import { Link } from '@/components/ui/Link'
import { Spinner } from '@/components/ui/Spinner'
import { Switch } from '@/components/ui/Switch'
import { Time } from '@/components/ui/Time'

const notifications = ref(true)
const compactMode = ref(false)
const acceptedTerms = ref(false)
const selectedCheckbox = ref<string | boolean>('no')
</script>

<template>
  <main class="mx-auto min-h-screen max-w-4xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Iconos y botones</h1>
      <p class="text-muted-foreground">Ejemplos de uso de los componentes Icon y Button.</p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Iconos</h2>
      <div class="flex flex-wrap items-center gap-5">
        <div
          v-for="name in ['search', 'save', 'warning', 'success', 'trash2', 'x']"
          :key="name"
          class="flex flex-col items-center gap-2 text-sm"
        >
          <Icon :name="name" size="lg" color="red" />
          <span>{{ name }}</span>
        </div>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Botones</h2>
      <div class="flex flex-wrap gap-3">
        <Button label="Principal" loading />
        <Button label="Guardar" icon="save" />
        <Button label="Buscar" icon="search" variant="outline" />
        <Button label="Advertencia" icon="warning" variant="soft" />
        <Button label="Eliminar" icon="trash2" variant="subtle" />
        <Button icon="x" aria-label="Cerrar" square />

        <Button severity="success" icon="x" aria-label="Cerrar" />
        <Button
          label="Guardar"
          :icon="'warning'"
          aria-label="Cerrar"
          color="#3b5553"
          loading
          :ui="{}"
        />
      </div>
    </section>
    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Badges</h2>
      <div class="flex flex-wrap items-center gap-3">
        <Badge label="Principal" />
        <Badge label="Éxito" severity="success" icon="success" />
        <Badge label="Advertencia" severity="warning" icon="warning" variant="soft" />
        <Badge label="Error" severity="error" icon="error" variant="outline" />
        <Badge label="Guardado" icon="save" trailing-icon="check" variant="subtle" />
        <Badge label="Personalizado" color="#3b5553" />
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Badge size="sm" label="Pequeño" />
        <Badge size="md" label="Mediano" />
        <Badge size="lg" label="Grande" />
        <Badge label="Con slots">
          <template #leading>
            <Icon name="search" />
          </template>
          Resultado
          <template #trailing>
            <Icon name="x" />
          </template>
        </Badge>
      </div>
    </section>
    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Alerts</h2>

      <div class="space-y-4">
        <Alert
          label="Información"
          description="Este es un mensaje informativo con las opciones predeterminadas."
          icon="info"
        />

        <Alert
          label="Cambios guardados"
          description="Los cambios se han guardado correctamente."
          icon="success"
          severity="success"
          variant="subtle"
        />

        <Alert
          label="Revisa los datos"
          description="Algunos campos necesitan tu atención antes de continuar."
          icon="warning"
          severity="warning"
          variant="outline"
          closable
        />

        <Alert
          label="No se pudo completar la operación"
          description="Inténtalo de nuevo o contacta con soporte si el problema continúa."
          icon="error"
          severity="error"
          variant="solid"
          closable
          :close-button="{
            label: 'Cerrar',
            icon: 'x',
            variant: 'plain',
            size: 'sm',
          }"
        />

        <Alert
          label="Alert personalizado"
          description="Root y botón de cierre personalizados mediante la propiedad ui."
          icon="info"
          color="#7c3aed"
          closable
          :ui="{
            root: { class: 'border-2 shadow-sm' },
            label: { class: 'font-bold' },
            description: { class: 'italic' },
            closeButton: {
              class: 'top-3 right-3 ring-1 ring-current/20',
              title: 'Cerrar alerta personalizada',
            },
          }"
        />
      </div>
    </section>
    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Spinner</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <Spinner class="min-h-24 rounded-lg border" />

        <Spinner
          class="min-h-24 rounded-lg border"
          :ui="{
            root: { class: 'bg-muted/40' },
            loading: { class: 'min-h-24' },
            icon: { class: 'size-7 text-primary' },
          }"
        />

        <Spinner
          :loading="true"
          class="rounded-lg border p-4 md:col-span-2"
          :ui="{ content: { class: 'text-sm text-muted-foreground' } }"
        >
          El contenido aparece cuando loading es false.
        </Spinner>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Switch</h2>

      <div class="space-y-4">
        <label class="flex items-center justify-between gap-4 rounded-lg border p-4">
          <span>
            <span class="block font-medium">Notificaciones</span>
            <span class="block text-sm text-muted-foreground">
              Estado: {{ notifications ? 'activadas' : 'desactivadas' }}
            </span>
          </span>
          <Switch v-model="notifications" aria-label="Activar notificaciones" />
        </label>

        <label class="flex items-center justify-between gap-4 rounded-lg border p-4">
          <span class="font-medium">Modo compacto</span>
          <Switch
            v-model="compactMode"
            aria-label="Activar modo compacto"
            :ui="{ root: { class: 'data-[state=checked]:bg-success' } }"
          />
        </label>

        <label class="flex items-center justify-between gap-4 rounded-lg border p-4 opacity-60">
          <span class="font-medium">Opción deshabilitada</span>
          <Switch disabled aria-label="Opción deshabilitada" />
        </label>

        <label class="flex items-center justify-between gap-4 rounded-lg border p-4">
          <span class="font-medium">Thumb mediante slot</span>
          <Switch aria-label="Switch con thumb personalizado">
            <template #thumb="{ checked }">
              <span class="flex size-full items-center justify-center text-[8px]">
                {{ checked ? '✓' : '' }}
              </span>
            </template>
          </Switch>
        </label>
      </div>
    </section>
    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Kbd y Link</h2>

      <div class="flex flex-wrap items-center gap-4">
        <Kbd label="Esc" />
        <Kbd :ui="{ root: { class: 'bg-primary text-primary-foreground' } }">⌘ K</Kbd>
        <KbdGroup :ui="{ root: { class: 'rounded-md border p-2' } }">
          <Kbd label="Ctrl" />
          <span>+</span>
          <Kbd label="S" />
        </KbdGroup>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <Link to="/" label="Enlace interno" icon="chevronLeft" />
        <Link
          to="https://www.shadcn-vue.com"
          label="Documentación externa"
          trailing-icon="chevronRight"
          variant="outline"
        />
        <Link
          to="/"
          label="Enlace personalizado"
          :ui="{ root: { class: 'text-success underline decoration-dashed' } }"
        />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Checkbox</h2>

      <div class="space-y-4">
        <label class="flex items-center gap-3">
          <Checkbox v-model="acceptedTerms" aria-label="Aceptar términos" />
          <span>Acepto los términos y condiciones: {{ acceptedTerms }}</span>
        </label>

        <label class="flex items-center gap-3">
          <Checkbox
            v-model="selectedCheckbox"
            true-value="yes"
            false-value="no"
            aria-label="Seleccionar valor personalizado"
            :ui="{ root: { class: 'data-[state=checked]:bg-success' } }"
          />
          <span>Valor personalizado: {{ selectedCheckbox }}</span>
        </label>

        <label class="flex items-center gap-3 opacity-60">
          <Checkbox disabled aria-label="Checkbox deshabilitado" />
          <span>Checkbox deshabilitado</span>
        </label>

        <label class="flex items-center gap-3">
          <Checkbox aria-label="Checkbox con indicador personalizado">
            <template #indicator="{ state }">
              <span class="text-[10px]">{{ state === true ? '✓' : '' }}</span>
            </template>
          </Checkbox>
          <span>Indicador mediante slot</span>
        </label>
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <h2 class="text-lg font-semibold">Time</h2>

      <div class="flex flex-wrap items-center gap-6">
        <Time datetime="2026-07-31T10:30:00.000Z" locale="es-ES" />

        <Time
          datetime="2026-07-31T18:45:00.000Z"
          locale="es-ES"
          :format="{ dateStyle: 'long', timeStyle: 'short' }"
          :ui="{ root: { class: 'font-semibold text-primary' } }"
        />

        <Time
          datetime="2026-08-01T08:00:00.000Z"
          locale="es-ES"
          :format="{ weekday: 'long', hour: '2-digit', minute: '2-digit' }"
        >
          <template #default="{ date }">
            <span class="rounded-md bg-muted px-2 py-1">Próxima ejecución: {{ date }}</span>
          </template>
        </Time>
      </div>
    </section>
  </main>
</template>
