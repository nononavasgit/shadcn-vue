<template>
  <Badge
    v-bind="attrs"
    :as="como"
    :as-child="comoHijo"
    :class="classCSS"
    :style="[attrs.style, variablesColor]"
  >
    <slot v-if="slots.izquierda" name="izquierda" />
    <Icono v-else-if="iconoProps" v-bind="iconoProps" />

    <slot>{{ titulo }}</slot>

    <slot v-if="slots.derecha" name="derecha" />
    <Icono v-else-if="iconoDerechoProps" v-bind="iconoDerechoProps" />
  </Badge>
</template>

<script setup lang="ts">
import { computed, toRef, useAttrs } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Icono, type IconoProps } from '@/components/app/Icono'
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
  izquierda?(): unknown
  derecha?(): unknown
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

const iconoProps = computed<IconoProps | undefined>(() => {
  if (!props.icono) return undefined
  return typeof props.icono === 'string' ? { nombre: props.icono } : props.icono
})

const iconoDerechoProps = computed<IconoProps | undefined>(() => {
  if (!props.iconoDerecho) return undefined
  return typeof props.iconoDerecho === 'string'
    ? { nombre: props.iconoDerecho }
    : props.iconoDerecho
})
</script>
