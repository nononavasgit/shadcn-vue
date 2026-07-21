<template>
  <Alert v-if="visible" v-bind="uiCalculado?.root">
    <div v-bind="uiCalculado?.base">
      <div v-if="slots.icono || uiCalculado.icono" v-bind="uiCalculado?.iconoContenedor">
        <slot v-if="slots.icono" name="icono" />
        <Icono v-else-if="icono" v-bind="uiCalculado?.icono" />
      </div>

      <div v-bind="uiCalculado?.contenido">
        <AlertTitle v-if="titulo" data-ui="title" v-bind="uiCalculado?.titulo">
          <slot v-if="slots.titulo" name="titulo"></slot>
          <template v-else-if="titulo">{{ titulo }}</template>
        </AlertTitle>

        <AlertDescription v-if="descripcion || slots.descripcion" v-bind="uiCalculado?.descripcion">
          <slot v-if="slots.descripcion" name="descripcion"></slot>
          <template v-else-if="descripcion">{{ descripcion }}</template>
        </AlertDescription>
      </div>

      <div v-if="cerrable" v-bind="uiCalculado?.cerrarContenedor">
        <slot v-if="slots.cerrar" name="cerrar" :cerrar="cerrar"></slot>
        <template v-else>
          <Boton v-bind="uiCalculado.cerrarBoton" />
        </template>
      </div>
    </div>
  </Alert>
</template>

<script setup lang="ts">
import { computed, ref, toRef, useAttrs } from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Icono } from '@/components/app/Icono'
import { Boton } from "@/components/app/Boton"
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import type { AlertaBaseProps } from './types'
import { alertaVariantes } from './variantes'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const slots = defineSlots<{
  icono?(): unknown
  descripcion?(): unknown
  titulo?(): unknown
  cerrar?(props: { cerrar: () => void }): unknown
}>()

const emit = defineEmits<{
  cerrar: []
}>()

const props = withDefaults(defineProps<AlertaBaseProps>(), {
  titulo: '',
  descripcion: '',
  icono: undefined,
  variante: 'suave',
  paleta: 'primario',
  cerrable: false,
  color: undefined,
  ui: undefined
})

const visible = ref(true)

const { variablesColor } = useColor(toRef(props, 'color'), {
  prefijo: 'alerta',
})

const classCSS = computed(() =>
  cn(
    alertaVariantes({
      variante: props.variante,
      paleta: props.paleta,
      cerrable: props.cerrable,
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
      style: [attrs.style, variablesColor.value],
      class: [attrs.class, classCSS.value]
    },
    base: {
      'data-slot': 'base',
      ...props?.ui?.base,
      class: ['flex items-start gap-3', props?.ui?.base?.class]
    },
    titulo: {
      'data-slot': 'titulo',
      ...props.ui?.titulo,
    },
    descripcion: {
      'data-slot': 'descripcion',
      ...props.ui?.descripcion,
      class: ['text-current/80', props.ui?.descripcion?.class]
    },
    cerrarContenedor: {
      'data-slot': 'cerrarContenedor',
      ...props?.ui?.cerrarContenedor,
      class: ['-mr-1 self-center shrink-0', props?.ui?.cerrarContenedor?.class]
    },
    iconoContenedor: {
      'data-slot': 'iconoContenedor',
      ...props.ui?.iconoContenedor,
      class: ['shrink-0 pt-0.5', props?.ui?.iconoContenedor?.class]
    },
    contenido: {
      'data-slot': 'contenido',
      ...props.ui?.contenido,
      class: ['min-w-0 flex-1', props?.ui?.contenido?.class]
    },
    icono: props.icono
      ? {
        ...props.ui?.icono,
        nombre: props.icono,
      }
      : undefined,
    cerrarBoton: {
      redondeado: true,
      cuadrado: true,
      tamano: 'sm',
      variante: props.variante,
      color: props.color,
      icono: 'x',
      'aria-label': 'Cerrar',
      ...props.ui?.cerrarBoton,
      onClick: cerrar,
    }
  }
})


const cerrar = () => {
  visible.value = false
  emit('cerrar')
}
</script>
