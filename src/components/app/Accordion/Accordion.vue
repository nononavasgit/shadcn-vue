<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion'
import { cn } from '@/lib/utils'
import type {
  AccordeonProps,
  AccordeonSlotProps,
  AccordeonSlots,
  AccordeonContextoUI,
  AccordeonValorUI,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AccordeonProps>(), {
  tipo: 'unico',
  colapsable: false,
  deshabilitado: false,
  orientacion: 'vertical',
  desmontarAlOcultar: true,
  elementos: () => [],
  ui: undefined,
})
defineSlots<AccordeonSlots>()

const modelo = defineModel<string | string[]>()
const attrs = useAttrs()

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    type: props.tipo === 'unico' ? ('single' as const) : ('multiple' as const),
    collapsible: props.colapsable,
    defaultValue: props.valorPredeterminado,
    disabled: props.deshabilitado,
    dir: props.dir,
    orientation: props.orientacion,
    unmountOnHide: props.desmontarAlOcultar,
    class: cn(attrs.class),
  },
  elementos: props.elementos.map((elemento, indice) => {
    const abierto = Array.isArray(modelo.value)
      ? modelo.value.includes(elemento.valor)
      : modelo.value === elemento.valor
    const contexto: AccordeonContextoUI = {
      elemento,
      indice,
      abierto,
      primero: indice === 0,
      ultimo: indice === props.elementos.length - 1,
    }
    const resolverUI = <T,>(valor: AccordeonValorUI<T> | undefined): T | undefined =>
      typeof valor === 'function'
        ? (valor as (contexto: AccordeonContextoUI) => T)(contexto)
        : valor
    const uiElemento = resolverUI(props.ui?.elemento)
    const uiActivador = resolverUI(props.ui?.activador)
    const uiContenido = resolverUI(props.ui?.contenido)
    const { forzarMontaje, ...atributosContenido } = uiContenido ?? {}
    const propiedadesSlot: AccordeonSlotProps = { elemento, indice, abierto }

    return {
      valor: elemento.valor,
      datos: elemento,
      propiedadesSlot,
      elemento: {
        ...uiElemento,
        value: elemento.valor,
        disabled: elemento.deshabilitado,
        class: cn(uiElemento?.class),
        style: uiElemento?.style,
      },
      activador: {
        ...uiActivador,
        class: cn(uiActivador?.class),
        style: uiActivador?.style,
      },
      contenido: {
        ...atributosContenido,
        forceMount: elemento.forzarMontaje ?? forzarMontaje,
        class: cn(atributosContenido.class),
        style: atributosContenido.style,
      },
    }
  }),
}))
</script>

<template>
  <Accordion v-bind="uiCalculado.raiz" v-model="modelo">
    <AccordionItem v-for="item in uiCalculado.elementos" :key="item.valor" v-bind="item.elemento">
      <AccordionTrigger v-bind="item.activador">
        <slot :name="`activador-${item.valor}`" v-bind="item.propiedadesSlot">
          <slot name="activador" v-bind="item.propiedadesSlot">
            {{ item.datos?.titulo }}
          </slot>
        </slot>
      </AccordionTrigger>

      <AccordionContent v-bind="item.contenido">
        <slot :name="`contenido-${item.valor}`" v-bind="item.propiedadesSlot">
          <slot v-bind="item.propiedadesSlot">
            {{ item.datos?.contenido }}
          </slot>
        </slot>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
