<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { LoaderCircle } from '@lucide/vue'
import { Boton as BotonBase } from '@/components/ui/Boton'
import { cn } from '@/lib/utils'
import { variantesBoton, type BotonProps } from '.'

const attrs = useAttrs()
const emit = defineEmits<{
  click: [evt: MouseEvent]
}>()

const props = withDefaults(defineProps<BotonProps>(), {
  variante: 'solido',
  gravedad: 'primario',
  tamano: 'md',
  redondeado: false,
  cuadrado: false,
  cargando: false,
  ui: undefined,
})

const ariaDisabled = computed(() => {
  return props.cargando || attrs['aria-disabled']
})

const ariaBusy = computed(() => {
  return props.cargando || attrs['aria-busy']
})

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
  <BotonBase
    v-bind="attrs"
    :aria-busy="ariaBusy"
    :aria-disabled="ariaDisabled"
    :class="
      cn(
        variantesBoton({
          variante: props.variante,
          gravedad: props.gravedad,
          tamano: props.tamano,
          redondeado: props.redondeado,
          cuadrado: props.cuadrado,
        }),
        attrs.class,
      )
    "
    @click="handleClick"
  >
    <LoaderCircle v-if="props.cargando" class="animate-spin" aria-hidden="true" />
    <slot />
  </BotonBase>
</template>
