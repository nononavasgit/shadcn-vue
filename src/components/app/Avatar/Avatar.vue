<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ImgHTMLAttributes } from 'vue'
import type { AvatarImageEmits } from 'reka-ui'
import { Avatar as AvatarBase, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import type { AvatarEmits, AvatarEstadoCarga, AvatarProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  alternativo?(): unknown
}>()

const props = defineProps<AvatarProps>()
const emits = defineEmits<AvatarEmits>()
const attrs = useAttrs() as ImgHTMLAttributes

const icono = computed(() =>
  typeof props.icono === 'string' ? { nombre: props.icono } : props.icono,
)

const uiCalculado = computed(() => ({
  raiz: props.ui?.raiz,
  imagen: props.src
    ? {
        ...props.ui?.imagen,
        ...attrs,
        src: props.src,
        alt: props.alt,
        class: cn(props.ui?.imagen?.class, attrs.class),
      }
    : undefined,
  fallback: {
    ...props.ui?.fallback,
    ...attrs,
    class: cn(props.ui?.fallback?.class, attrs.class),
  },
  icono: {
    ...props.ui?.icono,
    ...icono.value,
    class: cn(props.ui?.icono?.class, icono.value?.class),
  },
}))

type EstadoCargaOriginal = AvatarImageEmits['loadingStatusChange'][0]

const mapaEstadoCarga: Record<EstadoCargaOriginal, AvatarEstadoCarga> = {
  idle: false,
  loading: true,
  loaded: false,
  error: false,
}

const handleCambioEstadoCarga = (estado: EstadoCargaOriginal) => {
  emits('cambioEstadoCarga', mapaEstadoCarga[estado])
}
</script>

<template>
  <AvatarBase v-bind="uiCalculado.raiz">
    <AvatarImage
      v-if="uiCalculado.imagen"
      v-bind="uiCalculado.imagen"
      @loading-status-change="handleCambioEstadoCarga"
    />

    <AvatarFallback v-bind="uiCalculado.fallback">
      <slot name="alternativo">
        <Icon
          v-if="uiCalculado.icono?.nombre"
          v-bind="{ ...uiCalculado.icono, nombre: uiCalculado.icono.nombre }"
        />
        <template v-else>{{ props.titulo }}</template>
      </slot>
    </AvatarFallback>
  </AvatarBase>
</template>
