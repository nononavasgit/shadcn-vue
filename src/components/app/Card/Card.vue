<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Card as CardBase,
  CardAction,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import type { TarjetaProps, TarjetaSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<TarjetaSlots>()

const props = defineProps<TarjetaProps>()
const attrs = useAttrs()

const uiCalculado = computed(() => ({
  raiz: {
    ...props.ui?.raiz,
    ...attrs,
    class: cn(props.ui?.raiz?.class, attrs.class),
  },
  cabecera: props.ui?.cabecera,
  titulo: props.ui?.titulo,
  descripcion: props.ui?.descripcion,
  accion: props.ui?.accion,
  contenido: props.ui?.contenido,
  pie: props.ui?.pie,
}))
</script>

<template>
  <CardBase v-bind="uiCalculado.raiz">
    <CardHeader
      v-if="
        props.titulo ||
        props.descripcion ||
        $slots.cabecera ||
        $slots.titulo ||
        $slots.descripcion ||
        $slots.accion
      "
      v-bind="uiCalculado.cabecera"
    >
      <slot name="cabecera">
        <CardTitle v-if="props.titulo || $slots.titulo" v-bind="uiCalculado.titulo">
          <slot name="titulo">{{ props.titulo }}</slot>
        </CardTitle>

        <CardDescription
          v-if="props.descripcion || $slots.descripcion"
          v-bind="uiCalculado.descripcion"
        >
          <slot name="descripcion">{{ props.descripcion }}</slot>
        </CardDescription>
      </slot>

      <CardAction v-if="$slots.accion" v-bind="uiCalculado.accion">
        <slot name="accion" />
      </CardAction>
    </CardHeader>

    <CardContent v-if="$slots.default" v-bind="uiCalculado.contenido">
      <slot />
    </CardContent>

    <CardFooter v-if="$slots.pie" v-bind="uiCalculado.pie">
      <slot name="pie" />
    </CardFooter>
  </CardBase>
</template>
