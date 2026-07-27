<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Badge as BadgeBase } from '@/components/ui/Badge'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { etiquetaVariantes, type EtiquetaProps, type EtiquetaSlots } from '.'

defineOptions({ inheritAttrs: false })
defineSlots<EtiquetaSlots>()
const attrs = useAttrs()

const props = withDefaults(defineProps<EtiquetaProps>(), {
  as: 'span',
  titulo: undefined,
  tamano: 'md',
  variante: 'solido',
  gravedad: 'primario',
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
  'badge',
)

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    class: cn(
      etiquetaVariantes({
        tamano: props.tamano,
        variante: props.variante,
        gravedad: props.gravedad,
        color: Boolean(props.color),
      }),
      attrs.class,
    ),
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
}))
</script>

<template>
  <BadgeBase v-bind="uiCalculado.raiz">
    <slot name="inicio">
      <Icon
        v-if="uiCalculado.icono?.nombre"
        v-bind="{ ...uiCalculado?.icono, nombre: uiCalculado?.icono?.nombre }"
      />
    </slot>

    <slot>{{ props.titulo }}</slot>

    <slot name="final">
      <Icon
        v-if="uiCalculado.iconoFinal?.nombre"
        v-bind="{ ...uiCalculado?.iconoFinal, nombre: uiCalculado?.iconoFinal?.nombre }"
      />
    </slot>
  </BadgeBase>
</template>
