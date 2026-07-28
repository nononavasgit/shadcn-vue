<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Progress, ProgressIndicator } from '@/components/ui/Progress'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type { ProgressCircularTituloSlotProps, ProgressCircularProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  titulo?(props: ProgressCircularTituloSlotProps): unknown
}>()

const props = withDefaults(defineProps<ProgressCircularProps>(), {
  valor: 0,
  maximo: 100,
  tamano: 80,
  grosor: 8,
})

const attrs = useAttrs()
const slots = useSlots()

const { colorStyle } = useColor(
  computed(() => props.color),
  'progress-circular',
)
const { colorStyle: estiloColorPista } = useColor(
  computed(() => props.colorPista),
  'progress-circular-track',
)

const porcentaje = computed(() => {
  if (props.valor === null) return 0

  return Math.min(100, Math.max(0, (props.valor / props.maximo) * 100))
})

const radius = computed(() => (100 - props.grosor) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - porcentaje.value / 100))
const cssSize = computed(() =>
  typeof props.tamano === 'number' ? `${props.tamano}px` : props.tamano,
)

const slotProps = computed<ProgressCircularTituloSlotProps>(() => ({
  valor: props.valor,
  maximo: props.maximo,
  porcentaje: porcentaje.value,
}))

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    modelValue: props.valor,
    max: props.maximo,
    'aria-label': attrs['aria-label'],
    'aria-valuetext': attrs['aria-valuetext'] || props.titulo,
    class: cn(
      'relative inline-grid shrink-0 place-items-center overflow-visible bg-transparent',
      attrs.class,
    ),
    style: [
      { width: cssSize.value, height: cssSize.value },
      colorStyle.value,
      estiloColorPista.value,
      attrs.style,
    ],
  },
  svg: {
    ...props.ui?.svg,
    class: cn('size-full -rotate-90', props.ui?.svg?.class),
  },
  pista: {
    ...props.ui?.pista,
    cx: '50',
    cy: '50',
    r: radius.value,
    'stroke-width': props.grosor,
    class: cn(
      'fill-none stroke-primary/20',
      props.colorPista
        ? 'stroke-(--progress-circular-track-color)'
        : props.color && 'stroke-(--progress-circular-color)/20',
      props.ui?.pista?.class,
    ),
  },
  indicador: {
    ...props.ui?.indicador,
    cx: '50',
    cy: '50',
    r: radius.value,
    'stroke-width': props.grosor,
    'stroke-linecap': 'round' as const,
    'stroke-dasharray': circumference.value,
    'stroke-dashoffset': dashOffset.value,
    class: cn(
      'h-auto w-auto flex-none fill-none stroke-primary transition-[stroke-dashoffset] duration-300 ease-out',
      props.color && 'stroke-(--progress-circular-color)',
      props.ui?.indicador?.class,
    ),
    style: props.ui?.indicador?.style,
  },
  titulo: {
    ...props.ui?.titulo,
    class: cn(
      'pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center text-sm font-semibold',
      props.ui?.titulo?.class,
    ),
  },
}))
</script>

<template>
  <Progress v-bind="uiCalculado.raiz">
    <template #indicator>
      <svg v-bind="uiCalculado.svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle v-bind="uiCalculado.pista" />

        <ProgressIndicator as-child>
          <circle v-bind="uiCalculado.indicador" />
        </ProgressIndicator>
      </svg>
    </template>

    <span v-if="props.titulo || slots.titulo" v-bind="uiCalculado.titulo" aria-hidden="true">
      <slot name="titulo" v-bind="slotProps">{{ props.titulo }}</slot>
    </span>
  </Progress>
</template>
