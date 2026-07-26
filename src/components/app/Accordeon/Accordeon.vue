<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Accordion as AccordionBase,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion'
import { cn } from '@/lib/utils'
import type {
  AccordeonContentUI,
  AccordeonElement,
  AccordeonEmits,
  AccordeonProps,
  AccordeonSlotProps,
  AccordeonSlots,
  AccordeonUI,
  AccordeonUIContext,
  AccordeonUIValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AccordeonProps>(), {
  type: 'single',
  collapsible: false,
  disabled: false,
  orientation: 'vertical',
  unmountOnHide: true,
  elements: () => [],
  ui: undefined,
})
const emits = defineEmits<AccordeonEmits>()
defineSlots<AccordeonSlots>()
const model = defineModel<string | string[]>()
const attrs = useAttrs()

const uiCalculado = computed(() => ({
  root: {
    ...props.ui?.root,
    ...attrs,
    type: props.type,
    collapsible: props.collapsible,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    dir: props.dir,
    orientation: props.orientation,
    unmountOnHide: props.unmountOnHide,
    class: cn(props.ui?.root?.class, attrs.class),
  },
}))

type ItemUINode = Exclude<keyof AccordeonUI, 'root'>

function uiContext(element: AccordeonElement): AccordeonUIContext {
  const index = props.elements.indexOf(element)
  const open = Array.isArray(model.value)
    ? model.value.includes(element.value)
    : model.value === element.value

  return {
    element,
    index,
    open,
    first: index === 0,
    last: index === props.elements.length - 1,
  }
}

function resolveUi<T>(value: AccordeonUIValue<T> | undefined, element: AccordeonElement) {
  return typeof value === 'function'
    ? (value as (context: AccordeonUIContext) => T)(uiContext(element))
    : value
}

function itemUi(element: AccordeonElement, node: ItemUINode) {
  const ui = resolveUi(props.ui?.[node], element)
  return {
    ...ui,
    class: cn(ui?.class),
    style: ui?.style,
  }
}

function itemCalculado(element: AccordeonElement) {
  return {
    ...itemUi(element, 'item'),
    value: element.value,
    disabled: element.disabled,
  }
}

function contentCalculado(element: AccordeonElement) {
  const ui = itemUi(element, 'content') as AccordeonContentUI
  return {
    ...ui,
    forceMount: element.forceMount ?? ui.forceMount,
  }
}

function slotProps(element: AccordeonElement, index: number): AccordeonSlotProps {
  return {
    element,
    index,
    open: Array.isArray(model.value)
      ? model.value.includes(element.value)
      : model.value === element.value,
  }
}

function updateModel(value: string | string[] | undefined) {
  model.value = value
  emits('change', value)
}
</script>

<template>
  <AccordionBase v-bind="uiCalculado.root" :model-value="model" @update:model-value="updateModel">
    <AccordionItem
      v-for="(element, index) in props.elements"
      :key="element.value"
      v-bind="itemCalculado(element)"
    >
      <AccordionTrigger v-bind="itemUi(element, 'trigger')">
        <slot name="trigger" v-bind="slotProps(element, index)">
          {{ element.label }}
        </slot>
      </AccordionTrigger>

      <AccordionContent v-bind="contentCalculado(element)">
        <slot v-bind="slotProps(element, index)">
          {{ element.content }}
        </slot>
      </AccordionContent>
    </AccordionItem>
  </AccordionBase>
</template>
