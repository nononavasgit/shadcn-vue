<script setup lang="ts">
import { ref } from 'vue'
import { Icono } from '@/components/app/Icono'
import { Label } from '@/components/app/Label'
import { Switch, type ValorSwitch } from '@/components/app/Switch'

const notificaciones = ref(1)
const modoOscuro = ref(false)
const estadoCuenta = ref<'activa' | 'inactiva'>('inactiva')

function registrarCambio(valor: ValorSwitch) {
  console.log(valor)
}
</script>

<template>
  <main class="min-h-screen bg-background p-8 text-foreground">
    <section class="mx-auto max-w-xl space-y-6">
      <div>
        <h1 class="text-2xl font-semibold">Switch</h1>
        <p class="text-sm text-muted-foreground">
          Ejemplos con valores numéricos, booleanos, texto y estado deshabilitado.
        </p>
      </div>

      <div class="space-y-4 rounded-lg border p-4">
        <div class="flex items-center justify-between gap-4">
          <div class="space-y-1">
            <Label for="notificaciones" titulo="Notificaciones" />
            <p class="text-sm text-muted-foreground">Valor actual: {{ notificaciones }}</p>
            <p class="text-sm text-muted-foreground">Evento cambio:</p>
          </div>
          <Switch id="notificaciones" v-model="notificaciones" @cambio="registrarCambio" />
        </div>

        <div class="flex items-center justify-between gap-4">
          <div class="space-y-1">
            <Label for="modo-oscuro" titulo="Modo oscuro" />
            <p class="text-sm text-muted-foreground">Valor actual: {{ modoOscuro }}</p>
          </div>
          <Switch id="modo-oscuro" v-model="modoOscuro" :valor-verdadero="true" :valor-falso="false"
            @cambio="registrarCambio" />
        </div>

        <div class="flex items-center justify-between gap-4">
          <div class="space-y-1">
            <Label for="estado-cuenta" titulo="Cuenta activa" />
            <p class="text-sm text-muted-foreground">Valor actual: {{ estadoCuenta }}</p>
          </div>
          <Switch id="estado-cuenta" v-model="estadoCuenta" valor-verdadero="activa" valor-falso="inactiva"
            @cambio="registrarCambio">
            <template #pulgar="{ activo }">
              <span v-if="activo">O</span>
              <span v-else>x</span>
            </template>
          </Switch>
        </div>

        <div class="flex items-center justify-between gap-4">
          <div class="space-y-1">
            <Label for="deshabilitado" titulo="Opción deshabilitada" />
            <p class="text-sm text-muted-foreground">No admite interacción.</p>
          </div>
          <Switch id="deshabilitado" :model-value="0" />
        </div>
      </div>
    </section>
  </main>
</template>
