<template>
  <Button v-bind="uiCalculado.root" @click="handleClick">
    <template v-if="!cargando">
      <slot v-if="slots.icono" name="icono"></slot>
      <Icono v-else-if="uiCalculado.icono" v-bind="uiCalculado.icono" />
    </template>

    <template v-else>
      <slot v-if="slots.cargando" name="cargando"></slot>
      <Icono v-else v-bind="uiCalculado.cargando" />
    </template>

    <slot name="default">
      {{ titulo }}
    </slot>

    <slot v-if="slots.iconoDerecho" name="iconoDerecho"></slot>
    <Icono v-else-if="uiCalculado.iconoDerecho" v-bind="uiCalculado.iconoDerecho" />
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

const attrs = useAttrs()

const slots = defineSlots<{
  default?(): unknown
  icono?(): unknown
  cargando?(): unknown
  iconoDerecho?(): unknown
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const props = withDefaults(defineProps<BotonBaseProps>(), {
  como: 'button',
  comoHijo: false,
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

const estaDeshabilitado = computed(() => {
  if (props.cargando || attrs['aria-disabled'] || attrs.disabled) return true
  return false
})

const uiCalculado = computed(() => {
  return {
    root: {
      ...attrs,
      ...props.ui?.root,
      as: props.como,
      asChild: props.comoHijo,
      'aria-busy': props.cargando || attrs['aria-busy'],
      'aria-disabled': props.cargando || attrs['aria-disabled'],
      class: cn(
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
        props.ui?.root?.class,
      ),
      style: [attrs.style, variablesColor.value, props.ui?.root?.style],
      'data-slot': 'root',
      'data-variante': props.variante,
    },
    cargando: {
      tamano: props.tamano,
      nombre: 'spinner' as const,
      ...props.ui?.cargando,
      class: ['animate-spin', props.ui?.cargando?.class],
      'data-slot': 'cargando',
    },
    icono: props.icono
      ? {
        nombre: props.icono,
        ...props.ui?.icono,
        'data-slot': 'icono',
      }
      : undefined,
    iconoDerecho: props.iconoDerecho
      ? {
        nombre: props.iconoDerecho,
        ...props.ui?.iconoDerecho,
        'data-slot': 'iconoDerecho',
      }
      : undefined,
  }
})
const handleClick = ($evt: MouseEvent) => {
  if (estaDeshabilitado.value) {
    $evt.stopPropagation()
    $evt.preventDefault()
    return
  }

  emit('click', $evt)
}
</script>
