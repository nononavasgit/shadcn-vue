<template>
  <Button
    v-bind="attrs"
    :aria-busy="ariaBusy"
    :aria-disabled="ariaDisabled"
    :class="classCSS"
    :style="[attrs.style, variablesColor]"
    @click="handleClick"
  >
    <slot name="default">
      <template v-if="!cargando">
        <slot v-if="slots.izquierda" name="izquierda"></slot>
        <Icono v-else-if="icono" :nombre="icono" :tamano="tamano" />
      </template>

      <template v-else-if="cargando">
        <slot v-if="slots.cargando"></slot>
        <Icono v-else v-bind="{ nombre: 'spinner', class: 'animate-spin', tamano: tamano }" />
      </template>

      {{ titulo }}

      <slot v-if="slots.derecha" name="derecha"></slot>
      <Icono v-else-if="iconoDerecho" :nombre="iconoDerecho" :tamano="tamano" />
    </slot>
  </Button>
</template>

<script setup lang="ts">
import { computed, toRef, useAttrs } from 'vue'

// Components
import { Icono } from '@/components/app/Icono'
import { Button } from '@/components/ui/button'

// Boton
import type { BotonBaseProps } from './types'
import { botonVariantes } from './variantes.ts'

// Libs
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const slots = defineSlots<{
  default?(): unknown
  izquierda?(): unknown
  cargando?(): unknown
  derecha?(): unknown
}>()
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const attrs = useAttrs()
const props = withDefaults(defineProps<BotonBaseProps>(), {
  titulo: '',
  icono: undefined,
  iconoDerecho: undefined,
  variante: 'solido',
  paleta: 'primario',
  tamano: 'md',
  fluido: false,
  redondeado: false,
  cuadrado: false,
  cargando: false,
  color: undefined,
})

const { variablesColor } = useColor(toRef(props, 'color'), {
  prefijo: 'boton',
})

const ariaBusy = computed(() => {
  return props.cargando || attrs['aria-busy']
})

const ariaDisabled = computed(() => {
  return props.cargando || attrs['aria-disabled']
})

const classCSS = computed(() => {
  return cn(
    botonVariantes({
      variante: props.variante,
      tamano: props.tamano,
      fluido: props.fluido,
      redondeado: props.redondeado,
      cuadrado: props.cuadrado,
      paleta: props.paleta,
      personalizado: Boolean(props.color),
    }),
    attrs.class,
  )
})

const handleClick = ($evt: MouseEvent) => {
  if (ariaDisabled.value) {
    $evt.stopPropagation()
    $evt.preventDefault()
    return
  }

  emit('click', $evt)
}
</script>
