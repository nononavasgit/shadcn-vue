<template>
  <Badge v-bind="uiCalculado.root">
    <slot v-if="slots.icono" name="icono" />
    <Icono v-else-if="uiCalculado.icono" v-bind="uiCalculado.icono" />

    <slot>{{ titulo }}</slot>

    <slot v-if="slots.iconoDerecho" name="iconoDerecho" />
    <Icono v-else-if="uiCalculado.iconoDerecho" v-bind="uiCalculado.iconoDerecho" />
  </Badge>
</template>
<script setup lang="ts">
import { computed, toRef, useAttrs } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Icono } from '@/components/app/Icono'
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import type { EtiquetaBaseProps } from './types'
import { etiquetaVariantes } from './variantes'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const slots = defineSlots<{
  default?(): unknown
  icono?(): unknown
  iconoDerecho?(): unknown
}>()

const props = withDefaults(defineProps<EtiquetaBaseProps>(), {
  como: 'span',
  comoHijo: false,
  titulo: '',
  icono: undefined,
  iconoDerecho: undefined,
  variante: 'solido',
  paleta: 'primario',
  tamano: 'md',
  redondeado: false,
  color: undefined,
  ui: undefined,
})

const { variablesColor } = useColor(toRef(props, 'color'), {
  prefijo: 'etiqueta',
})

const classCSS = computed(() =>
  cn(
    etiquetaVariantes({
      variante: props.variante,
      paleta: props.paleta,
      tamano: props.tamano,
      redondeado: props.redondeado,
      personalizado: Boolean(props.color),
    }),
    attrs.class,
  ),
)
const uiCalculado = computed(() => {
  return {
    root: {
      'data-slot': 'root',
      ...attrs,
      ...props.ui?.root,
      as: props.como,
      asChild: props.comoHijo,
      class: [classCSS.value, props.ui?.root?.class],
      style: [attrs.style, variablesColor.value, props.ui?.root?.style],
    },
    icono: props.icono
      ? {
          ...props.ui?.icono,
          nombre: props.icono,
        }
      : undefined,
    iconoDerecho: props.iconoDerecho
      ? {
          ...props.ui?.iconoDerecho,
          nombre: props.iconoDerecho,
        }
      : undefined,
  }
})
</script>
