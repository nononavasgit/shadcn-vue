<template>
  <Avatar v-bind="uiCalculado.root">
    <AvatarImage v-if="uiCalculado.imagen" v-bind="uiCalculado.imagen" />
    <AvatarFallback v-bind="uiCalculado.fallback">
      <slot v-if="slots.fallback" name="fallback"></slot>
      <template v-else>
        <Icono v-if="uiCalculado.icono" v-bind="uiCalculado.icono" />
        <template v-else>{{ titulo }}</template>
      </template>
    </AvatarFallback>
  </Avatar>
</template>

<script setup lang="ts">
import { computed, toRef, useAttrs } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icono } from '@/components/app/Icono'
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import type { AvatarBaseProps } from './types'
import { avatarFallbackVariantes, avatarVariantes } from './variantes'

defineOptions({
  inheritAttrs: false,
})

const slots = defineSlots<{
  fallback?(): unknown
}>()

const attrs = useAttrs()
const props = withDefaults(defineProps<AvatarBaseProps>(), {
  imagen: undefined,
  titulo: '',
  icono: undefined,
  paleta: 'primario',
  tamano: 'md',
  color: undefined,
  ui: undefined,
})

const { variablesColor } = useColor(toRef(props, 'color'), {
  prefijo: 'avatar',
})

const uiCalculado = computed(() => {
  const attrsContenido = Object.fromEntries(
    Object.entries(attrs).filter(([atributo]) => atributo !== 'class'),
  )

  return {
    root: {
      'data-slot': 'root',
      class: [cn(avatarVariantes({ tamano: props.tamano }), attrs.class), props.ui?.root?.class],
      style: variablesColor.value,
    },
    imagen: props.imagen
      ? {
        'data-slot': 'imagen',
        src: props.imagen,
        ...attrsContenido,
        ...props.ui?.imagen,
      }
      : undefined,
    icono: props.icono
      ? {
        tamano: props.tamano,
        nombre: props.icono,
        ...props.ui?.icono,
      }
      : undefined,
    fallback: {
      'data-slot': 'fallback',
      ...attrsContenido,
      ...props.ui?.fallback,
      class: [
        avatarFallbackVariantes({
          paleta: props.paleta,
          personalizado: Boolean(props.color),
        }),
        props.ui?.fallback?.class,
      ],
    },
  }
})
</script>
