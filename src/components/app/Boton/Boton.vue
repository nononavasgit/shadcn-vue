<template>
  <Button v-bind="attrs" :aria-busy="ariaBusy" :aria-disabled="ariaDisabled" :class="classCSS" @click="handleClick">
    <slot name="default">
      <template v-if="!cargando">
        <slot v-if="slots.izquierda" name="izquierda"></slot>
        <Icono v-else-if="iconoProps" v-bind="iconoProps" />
      </template>

      <template v-else-if="cargando">
        <slot v-if="slots.cargando"></slot>
        <Icono v-else v-bind="{ nombre: 'spinner', class: 'animate-spin', tamano: tamano }" />
      </template>

      {{ titulo }}

      <slot v-if="slots.derecha" name="derecha"></slot>
      <Icono v-else-if="iconoDerechoProps" v-bind="iconoDerechoProps" />
    </slot>
  </Button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

// Components
import { Icono, type IconoProps } from '@/components/app/Icono'
import { Button } from '@/components/ui/button'

// Boton
import type { BotonBaseProps } from './types'
import { botonVariantes } from './variantes.ts'

// Libs
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
})

const iconoProps = computed<IconoProps | undefined>(() => {
  if (!props.icono) return undefined
  return typeof props.icono === 'string'
    ? { nombre: props.icono, tamano: props.tamano }
    : props.icono
})

const iconoDerechoProps = computed<IconoProps | undefined>(() => {
  if (!props.iconoDerecho) return undefined
  return typeof props.iconoDerecho === 'string'
    ? { nombre: props.iconoDerecho, tamano: props.tamano }
    : props.iconoDerecho
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
