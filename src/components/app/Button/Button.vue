<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { button as Button } from '@/components/ui/Button'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { botonVariantes, type BotonEmits, type BotonProps, type BotonSlots } from '.'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const emit = defineEmits<BotonEmits>()

defineSlots<BotonSlots>()

const props = withDefaults(defineProps<BotonProps>(), {
  as: 'button',
  asChild: false,
  titulo: undefined,
  variant: 'solid',
  severity: 'primary',
  tamano: 'md',
  redondeado: false,
  cuadrado: false,
  cargando: false,
  color: undefined,
  icono: undefined,
  iconoFinal: undefined,
  ui: undefined,
})

const iconoInicioCalculado = computed(() =>
  typeof props.icono === 'string' ? { nombre: props.icono } : props.icono,
)
const iconoFinalCalculado = computed(() =>
  typeof props.iconoFinal === 'string' ? { nombre: props.iconoFinal } : props.iconoFinal,
)

const { colorStyle } = useColor(
  computed(() => props.color),
  'button',
)

const ariaDisabled = computed(() => {
  return props.cargando || attrs['aria-disabled']
})

const ariaBusy = computed(() => {
  return props.cargando || attrs['aria-busy']
})
const variantesCalculadas = computed(() => {
  const clases = botonVariantes({
    variante: props.variante,
    gravedad: props.gravedad,
    tamano: props.tamano,
    redondeado: props.redondeado,
    cuadrado: props.cuadrado,
    color: Boolean(props.color),
  })

  if (props.as === 'button' || props.as === 'a') return clases

  return clases
    .split(/\s+/)
    .filter((clase) => !clase.startsWith('hover:') && !clase.startsWith('active:'))
    .join(' ')
})

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    'aria-busy': ariaBusy.value,
    'aria-disabled': ariaDisabled.value,
    class: cn(variantesCalculadas.value, attrs.class),
    style: [colorStyle.value, attrs.style],
  },
  icono: {
    ...props.ui?.icono,
    ...iconoInicioCalculado.value,
    class: cn(props.ui?.icono?.class, iconoInicioCalculado.value?.class),
  },
  iconoFinal: {
    ...props.ui?.iconoFinal,
    ...iconoFinalCalculado.value,
    class: cn(props.ui?.iconoFinal?.class, iconoFinalCalculado.value?.class),
  },
  iconoCargando: {
    ...props.ui?.iconoCargando,
    nombre: 'spinner' as const,
    class: cn('animate-spin', props.ui?.iconoCargando?.class),
  },
}))

function handleClick(evt: MouseEvent) {
  if (ariaDisabled.value === true || ariaDisabled.value === 'true') {
    evt.preventDefault()
    evt.stopPropagation()
    return
  }

  emit('click', evt)
}
</script>

<template>
  <Button v-bind="uiCalculado.raiz" @click="handleClick">
    <template v-if="props.cargando">
      <slot name="cargando">
        <Icon v-bind="uiCalculado?.iconoCargando" />
      </slot>
    </template>
    <slot v-else name="inicio">
      <Icon
        v-if="uiCalculado.icono?.nombre"
        v-bind="{ ...uiCalculado?.icono, nombre: uiCalculado?.icono?.nombre }"
      />
    </slot>

    <slot>{{ titulo }}</slot>

    <slot name="final">
      <Icon
        v-if="uiCalculado.iconoFinal?.nombre"
        v-bind="{ ...uiCalculado?.iconoFinal, nombre: uiCalculado?.iconoFinal?.nombre }"
      />
    </slot>
  </Button>
</template>
