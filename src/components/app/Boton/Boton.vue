<template>
  <Button v-bind="uiCalculado.root" @click="handleClick">
    <slot name="default">
      <template v-if="!cargando">
        <slot v-if="slots.icono" name="icono"></slot>
        <Icono v-else-if="uiCalculado.icono" v-bind="uiCalculado.icono" />
      </template>

      <template v-else>
        <slot v-if="slots.cargando" name="cargando"></slot>
        <Icono v-else v-bind="uiCalculado.cargando" />
      </template>

      {{ titulo }}

      <slot v-if="slots.iconoDerecho" name="iconoDerecho"></slot>
      <Icono v-else-if="uiCalculado.iconoDerecho" v-bind="uiCalculado.iconoDerecho" />
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
  icono?(): unknown
  cargando?(): unknown
  iconoDerecho?(): unknown
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
  ui: undefined,
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

const uiCalculado = computed(() => {
  return {
    root: {
      'data-slot': 'root',
      ...attrs,
      ...props.ui?.root,
      'aria-busy': ariaBusy.value,
      'aria-disabled': ariaDisabled.value,
      class: [classCSS.value, props.ui?.root?.class],
      style: [attrs.style, variablesColor.value, props.ui?.root?.style],
    },
    cargando: {
      tamano: props.tamano,
      nombre: 'spinner' as const,
      ...props.ui?.cargando,
      class: ['animate-spin', props.ui?.cargando?.class],
    },
    icono: props.icono
      ? {
        tamano: props.tamano,
        ...props.ui?.icono,
        nombre: props.icono,
      }
      : undefined,
    iconoDerecho: props.iconoDerecho
      ? {
        tamano: props.tamano,
        ...props.ui?.iconoDerecho,
        nombre: props.iconoDerecho,
      }
      : undefined,
  }
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
