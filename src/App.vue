<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/app/Checkbox'
import { Label } from '@/components/app/Label'

const accepted = ref(false)
const notifications = ref(true)
const selection = ref<boolean | 'indeterminate'>('indeterminate')
const permission = ref<'yes' | 'no'>('no')
const customIndicator = ref(false)
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-3xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Checkbox</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Ejemplos de estados, modelos controlados, valores personalizados e indicadores.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">Checkbox asociado a una etiqueta.</p>
        </div>

        <div class="flex items-center gap-3">
          <Checkbox id="terms" v-model="accepted" />
          <Label for="terms">Aceptar términos y condiciones</Label>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Valor inicial</h2>
          <p class="text-sm text-muted-foreground">
            defaultValue establece el estado inicial sin controlar el componente.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <Checkbox id="updates" :default-value="true" />
          <div class="grid gap-1">
            <Label for="updates">Recibir actualizaciones</Label>
            <p class="text-sm text-muted-foreground">
              Te enviaremos información sobre nuevas versiones.
            </p>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Modelo controlado</h2>
          <p class="text-sm text-muted-foreground">El estado se sincroniza mediante v-model.</p>
        </div>

        <div class="flex items-center gap-3">
          <Checkbox id="notifications" v-model="notifications" />
          <Label for="notifications">Activar notificaciones</Label>
          <span class="text-sm text-muted-foreground">{{ notifications }}</span>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Indeterminate</h2>
          <p class="text-sm text-muted-foreground">
            Representa una selección parcial dentro de un grupo.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <Checkbox id="selection" v-model="selection" />
          <Label for="selection">Seleccionar todos</Label>
          <span class="text-sm text-muted-foreground">{{ selection }}</span>
        </div>

        <button
          type="button"
          class="rounded-md border bg-background px-3 py-2 text-sm font-medium shadow-xs hover:bg-muted"
          @click="selection = selection === 'indeterminate' ? false : 'indeterminate'"
        >
          Cambiar estado indeterminado
        </button>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Valores personalizados</h2>
          <p class="text-sm text-muted-foreground">
            trueValue y falseValue permiten utilizar valores diferentes de boolean.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <Checkbox id="permission" v-model="permission" true-value="yes" false-value="no" />
          <Label for="permission">Conceder permiso</Label>
          <span class="text-sm text-muted-foreground">{{ permission }}</span>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Indicador personalizado</h2>
          <p class="text-sm text-muted-foreground">
            El slot indicator sustituye el icono predeterminado.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <Checkbox id="custom" v-model="customIndicator" class="size-6 rounded-md">
            <template #indicator>
              <span class="text-xs font-bold">OK</span>
            </template>
          </Checkbox>
          <Label for="custom">Indicador personalizado</Label>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Disabled</h2>
          <p class="text-sm text-muted-foreground">
            disabled se reenvía como atributo mediante attrs.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <Checkbox id="disabled" disabled />
          <Label for="disabled" class="opacity-50">Opción no disponible</Label>
        </div>
      </section>

      <section class="rounded-xl border bg-card p-5 text-card-foreground">
        <h2 class="font-semibold">Estado del formulario</h2>
        <dl class="mt-3 grid gap-2 text-sm">
          <div class="flex gap-2">
            <dt class="font-medium">Aceptado:</dt>
            <dd class="text-muted-foreground">{{ accepted }}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="font-medium">Permiso:</dt>
            <dd class="text-muted-foreground">{{ permission }}</dd>
          </div>
        </dl>
      </section>
    </div>
  </main>
</template>
