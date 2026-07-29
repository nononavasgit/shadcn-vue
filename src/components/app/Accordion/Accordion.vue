<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Accordion as AccordionBase,
  AccordionContent,
  AccordionItem as AccordionItemBase,
  AccordionTrigger,
} from '@/components/ui/Accordion'
import { cn } from '@/lib/utils'
import type {
  AccordionProps,
  AccordionSlotProps,
  AccordionSlots,
  AccordionUIContext,
  AccordionUIValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'single',
  collapsible: false,
  disabled: false,
  orientation: 'vertical',
  unmountOnHide: true,
  items: () => [],
  ui: undefined,
})
defineSlots<AccordionSlots>()

const model = defineModel<string | string[]>()
const attrs = useAttrs()

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    type: props.type,
    collapsible: props.collapsible,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    dir: props.dir,
    orientation: props.orientation,
    unmountOnHide: props.unmountOnHide,
    class: cn(attrs.class),
  },
  items: props.items.map((item, index) => {
    const open = Array.isArray(model.value)
      ? model.value.includes(item.value)
      : model.value === item.value
    const context: AccordionUIContext = {
      item,
      index,
      open,
      first: index === 0,
      last: index === props.items.length - 1,
    }
    const resolveUI = <T,>(value: AccordionUIValue<T> | undefined): T | undefined =>
      typeof value === 'function' ? (value as (context: AccordionUIContext) => T)(context) : value
    const itemUI = resolveUI(props.ui?.item)
    const triggerUI = resolveUI(props.ui?.trigger)
    const contentUI = resolveUI(props.ui?.content)
    const { forceMount, ...contentAttrs } = contentUI ?? {}
    const slotProps: AccordionSlotProps = { item, index, open }

    return {
      value: item.value,
      data: item,
      slotProps,
      item: {
        ...itemUI,
        value: item.value,
        disabled: item.disabled,
        class: cn(itemUI?.class),
        style: itemUI?.style,
      },
      trigger: {
        ...triggerUI,
        class: cn(triggerUI?.class),
        style: triggerUI?.style,
      },
      content: {
        ...contentAttrs,
        forceMount: item.forceMount ?? forceMount,
        class: cn(contentAttrs.class),
        style: contentAttrs.style,
      },
    }
  }),
}))
</script>

<template>
  <AccordionBase v-bind="calculatedUI.root" v-model="model">
    <AccordionItemBase v-for="item in calculatedUI.items" :key="item.value" v-bind="item.item">
      <AccordionTrigger v-bind="item.trigger">
        <slot :name="`trigger-${item.value}`" v-bind="item.slotProps">
          <slot name="trigger" v-bind="item.slotProps">
            {{ item.data?.title }}
          </slot>
        </slot>
      </AccordionTrigger>

      <AccordionContent v-bind="item.content">
        <slot :name="`content-${item.value}`" v-bind="item.slotProps">
          <slot v-bind="item.slotProps">
            {{ item.data?.content }}
          </slot>
        </slot>
      </AccordionContent>
    </AccordionItemBase>
  </AccordionBase>
</template>
