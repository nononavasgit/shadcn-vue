<template>
  <Boton v-bind="attrsBoton" :href="destino" :como="'a'">
    <template v-for="(_, nombre) in $slots" #[nombre]="slotProps">
      <slot :name="nombre" v-bind="slotProps ?? {}" />
    </template>
  </Boton>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { computed, useAttrs } from 'vue'
import { Boton } from '@/components/app/Boton'
import type { EnlaceBaseProps } from './types'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const props = withDefaults(defineProps<EnlaceBaseProps>(), {
  destino: undefined,
  variante: 'link',
})

const propsBoton = reactiveOmit(props, 'destino')
const attrsBoton = computed(() => ({
  rel: 'noopener noreferrer',
  ...attrs,
  ...propsBoton,
}))
</script>
