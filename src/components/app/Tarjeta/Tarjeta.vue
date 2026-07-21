<template>
  <Card v-bind="uiCalculado.root">
    <CardHeader v-if="tieneCabecera" v-bind="uiCalculado.cabecera">
      <CardTitle v-if="titulo || slots.titulo" v-bind="uiCalculado.titulo">
        <slot v-if="slots.titulo" name="titulo"></slot>
        <template v-else>{{ titulo }}</template>
      </CardTitle>

      <CardDescription v-if="descripcion || slots.descripcion" v-bind="uiCalculado.descripcion">
        <slot v-if="slots.descripcion" name="descripcion"></slot>
        <template v-else>{{ descripcion }}</template>
      </CardDescription>
    </CardHeader>

    <CardContent v-if="slots.contenido" v-bind="uiCalculado.contenido">
      <slot name="contenido"></slot>
    </CardContent>

    <CardFooter v-if="slots.pie" v-bind="uiCalculado.pie">
      <slot name="pie"></slot>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { TarjetaBaseProps } from './types'

defineOptions({
  inheritAttrs: false,
})

const slots = defineSlots<{
  titulo?(): unknown
  descripcion?(): unknown
  contenido?(): unknown
  pie?(): unknown
}>()

const attrs = useAttrs()
const props = withDefaults(defineProps<TarjetaBaseProps>(), {
  titulo: '',
  descripcion: '',
  ui: undefined,
})

const tieneCabecera = computed(() =>
  Boolean(props.titulo || props.descripcion || slots.titulo || slots.descripcion),
)

const uiCalculado = computed(() => {
  return {
    root: {
      ...attrs,
      ...props.ui?.root,
      class: cn(attrs.class, props.ui?.root?.class),
      'data-slot': 'root',
    },
    cabecera: {
      ...props.ui?.cabecera,
      'data-slot': 'cabecera',
    },
    titulo: {
      ...props.ui?.titulo,
      'data-slot': 'titulo',
    },
    descripcion: {
      ...props.ui?.descripcion,
      'data-slot': 'descripcion',
    },
    contenido: {
      ...props.ui?.contenido,
      'data-slot': 'contenido',
    },
    pie: {
      ...props.ui?.pie,
      'data-slot': 'pie',
    },
  }
})
</script>
