<template>
  <Button
    v-bind="attrs"
    :variant="variante"
    :size="tamano"
    :disabled="attrs?.disabled"
    :aria-busy="ariaBusy"
    :aria-disabled="ariaDisabled"
    :class="[redondeadoCSS, ariaDisabledCSS, attrs?.class]"
  >
    <Icono
      v-if="cargando"
      nombre="spinner"
      role="status"
      aria-label="Cargando"
      class="size-4 animate-spin"
    />


    <slot v-if="$slots.default"></slot>
    <template v-else>
      {{ titulo }}
    </template>

    <slot v-if="$slots.iconoDerecho"></slot>
  </Button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Button } from '@/components/shadcn/button'
import type { ButtonVariants as BotonVariantes } from '@/components/shadcn/button'

// Components
import Icono from '@/components/ui/Icono/Icono.vue'

defineOptions({
  inheritAttrs: false,
})
const attrs = useAttrs();

interface Props {
  como?: string,
  variante?: BotonVariantes['variant']
  tamano?: BotonVariantes['size']
  cargando?: boolean,
  titulo?: string,
  redondeado?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  como: 'button',
  variante: 'primario',
  tamano: 'default',
  cargando: false,
  titulo: undefined,
  redondeado: false,
})

const ariaBusy = computed(() => {
  return props.cargando || attrs['aria-busy'] 
});

const ariaDisabled = computed(() => {
  return props.cargando || attrs['aria-disabled']
});

const ariaDisabledCSS = 'aria-disabled:cursor-not-allowed aria-disabled:opacity-50'

const redondeadoCSS = computed(() => {
  return props.redondeado ? 'rounded-full' : undefined
})
</script>

