<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Progress as ProgressBase, ProgressIndicator } from '@/components/ui/Progress'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type { ProgressLabelSlotProps, ProgressProps, ProgressSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ProgressSlots>()

const attrs = useAttrs()
const slots = useSlots()
const props = withDefaults(defineProps<ProgressProps>(), {
  valor: 0,
  maximo: 100,
})

const { colorStyle } = useColor(
  computed(() => props.color),
  'progress',
)
const { colorStyle: estiloColorPista } = useColor(
  computed(() => props.colorPista),
  'progress-track',
)

const porcentaje = computed(() => {
  if (props.valor === null) return 0

  return Math.min(100, Math.max(0, (props.valor / props.maximo) * 100))
})

const slotProps = computed<ProgressLabelSlotProps>(() => ({
  valor: props.valor,
  maximo: props.maximo,
  porcentaje: porcentaje.value,
}))

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    modelValue: props.valor,
    max: props.maximo,
    getValueLabel: props.getTituloValor,
    getValueText: props.getTextoValor,
    'aria-label': attrs['aria-label'],
    'aria-valuetext': attrs['aria-valuetext'] || props.titulo,
    class: cn(
      (props.titulo || slots.titulo) && 'h-4',
      props.colorPista ? 'bg-(--progress-track-color)' : props.color && 'bg-(--progress-color)/20',
      attrs.class,
    ),
    style: [colorStyle.value, estiloColorPista.value, attrs.style],
  },
  indicador: {
    ...props.ui?.indicador,
    class: cn(props.color && 'bg-(--progress-color)', props.ui?.indicador?.class),
  },
  titulo: {
    ...props.ui?.titulo,
    class: cn(
      'pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-2 text-center text-xs font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0),0_0_7px_rgb(0_0_0/0.9),0_0_12px_rgb(0_0_0/0.7)]',
      props.ui?.titulo?.class,
    ),
  },
}))
</script>

<template>
  <ProgressBase v-bind="uiCalculado.raiz">
    <template #indicator="{ percentage: porcentajeIndicador }">
      <ProgressIndicator
        v-bind="uiCalculado.indicador"
        :style="[
          { transform: `translateX(-${100 - porcentajeIndicador}%)` },
          uiCalculado.indicador.style,
        ]"
      />
    </template>

    <span v-if="props.titulo || $slots.titulo" v-bind="uiCalculado.titulo">
      <slot name="titulo" v-bind="slotProps">{{ props.titulo }}</slot>
    </span>
  </ProgressBase>
</template>
