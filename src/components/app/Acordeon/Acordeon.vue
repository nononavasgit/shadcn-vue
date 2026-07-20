<template>
  <Accordion v-bind="$attrs" :model-value="modelValue" :type="tipo === 'unico' ? 'single' : 'multiple'"
    :collapsible="tipo === 'unico' ? colapsable : undefined" :disabled="deshabilitado" :class="classCSS"
    @update:model-value="emit('update:modelValue', $event)">
    <AccordionItem v-for="elemento in elementos" :key="elemento.valor" :value="elemento.valor"
      :disabled="elemento.deshabilitado">
      <template #default="{ open }">
        <AccordionTrigger>
          <span class="flex min-w-0 items-center gap-2">
            <slot name="icono" :elemento="elemento" :abierto="open">
              <Icono v-if="obtenerIcono(elemento)" v-bind="obtenerIcono(elemento)" />
            </slot>

            <slot name="titulo" :elemento="elemento" :abierto="open">
              {{ elemento.titulo }}
            </slot>
          </span>
        </AccordionTrigger>

        <AccordionContent>
          <slot name="contenido" :elemento="elemento" :abierto="open">
            {{ elemento.contenido }}
          </slot>
        </AccordionContent>
      </template>
    </AccordionItem>
  </Accordion>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Icono, type IconoProps } from '@/components/app/Icono'
import { cn } from '@/lib/utils'
import type { AcordeonBaseProps, AcordeonElemento } from './types'
import { acordeonVariantes } from './variantes'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AcordeonBaseProps>(), {
  modelValue: undefined,
  tipo: 'unico',
  colapsable: true,
  deshabilitado: false,
  variante: 'simple',
  tamano: 'md',
  class: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [valor: string | string[] | undefined]
}>()

defineSlots<{
  titulo?(props: { elemento: AcordeonElemento; abierto: boolean }): unknown
  contenido?(props: { elemento: AcordeonElemento; abierto: boolean }): unknown
  icono?(props: { elemento: AcordeonElemento; abierto: boolean }): unknown
}>()

const classCSS = computed(() =>
  cn(
    acordeonVariantes({
      variante: props.variante,
      tamano: props.tamano,
    }),
    props.class,
  ),
)

function obtenerIcono(elemento: AcordeonElemento): IconoProps | undefined {
  if (!elemento.icono) return undefined

  return typeof elemento.icono === 'string'
    ? { nombre: elemento.icono, tamano: 'sm' }
    : elemento.icono
}
</script>
