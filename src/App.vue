<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, type ValorCheckbox } from '@/components/app/Checkbox'
import { Icono } from '@/components/app/Icono'
import { Label } from '@/components/app/Label'
import { Switch, type ValorSwitch } from '@/components/app/Switch'

const notificaciones = ref(1)
const modoOscuro = ref(false)
const estadoCuenta = ref<'activa' | 'inactiva'>('inactiva')
const terminos = ref(0)
const avisos = ref(false)
const seleccionParcial = ref<ValorCheckbox>('indeterminate')
const opcionPersonalizada = ref<'si' | 'no'>('no')

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

    <section class="mx-auto mt-10 max-w-xl space-y-6">
      <div>
        <h2 class="text-2xl font-semibold">Checkbox</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos con valores numéricos, booleanos, estado indeterminado y un indicador
          personalizado.
        </p>
      </div>

      <div class="space-y-5 rounded-lg border p-4">


        <div class="flex items-start gap-3">
          <Checkbox id="avisos" v-model="avisos" :valor-verdadero="true" :valor-falso="false" />
          <div class="space-y-1">
            <Label for="avisos" titulo="Recibir avisos" />
            <p class="text-sm text-muted-foreground">Valor booleano: {{ avisos }}</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <Checkbox id="seleccion-parcial" v-model="seleccionParcial" />
          <div class="space-y-1">
            <Label for="seleccion-parcial" titulo="Selección parcial" />
            <p class="text-sm text-muted-foreground">Valor actual: {{ seleccionParcial }}</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <Checkbox id="personalizado" v-model="opcionPersonalizada" valor-verdadero="si" valor-falso="no">
            <template #indicador="{ activo, estado }">
              <span v-if="estado === 'indeterminado'" class="leading-none font-bold">−</span>
              <Icono v-else-if="activo" nombre="x" tamano="xs" />
            </template>
          </Checkbox>
          <div class="space-y-1">
            <Label for="personalizado" titulo="Indicador personalizado" />
            <p class="text-sm text-muted-foreground">Valor actual: {{ opcionPersonalizada }}</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <Checkbox id="checkbox-deshabilitado" :model-value="1" disabled />
          <div class="space-y-1">
            <Label for="checkbox-deshabilitado" titulo="Checkbox deshabilitado" />
            <p class="text-sm text-muted-foreground">No admite interacción.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
