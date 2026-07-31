<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Accordion as AccordionBase,
  AccordionContent,
  AccordionItem as AccordionItemBase,
  AccordionTrigger,
} from '@/components/primitives/Accordion'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import {
  normalizeAccordionContentProps,
  normalizeAccordionItemProps,
  normalizeAccordionTriggerProps,
} from '.'
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
  as: 'div',
  asChild: false,
  items: () => [],
  ui: undefined,
})
defineSlots<AccordionSlots>()

const model = defineModel<string | string[]>()
const attrs = useAttrs()

function resolveUI<T>(value: AccordionUIValue<T> | undefined, context: AccordionUIContext) {
  return typeof value === 'function'
    ? (value as (context: AccordionUIContext) => T)(context)
    : value
}

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      type: props.type,
      collapsible: props.collapsible,
      defaultValue: props.defaultValue,
      disabled: props.disabled,
      dir: props.dir,
      orientation: props.orientation,
      unmountOnHide: props.unmountOnHide,
      as: props.as,
      asChild: props.asChild,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
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
      const itemUI = normalizeHTMLAttributes(resolveUI(props.ui?.item, context))
      const itemProps = normalizeAccordionItemProps(item)
      const triggerUI = normalizeHTMLAttributes(resolveUI(props.ui?.trigger, context))
      const contentUI = normalizeHTMLAttributes(resolveUI(props.ui?.content, context))
      const trigger = normalizeAccordionTriggerProps(item.trigger)
      const content = normalizeAccordionContentProps(item.contentProps)
      const slotProps: AccordionSlotProps = { item, index, open }

      return {
        value: item.value,
        data: item,
        slotProps,
        item: {
          ...itemUI,
          ...itemProps,
          class: cn(itemUI.class),
          style: itemUI.style,
        },
        trigger: {
          ...triggerUI,
          ...trigger,
          class: cn(triggerUI.class),
          style: triggerUI.style,
        },
        content: {
          ...contentUI,
          ...content,
          class: cn(contentUI.class),
          style: contentUI.style,
        },
      }
    }),
  }
})
</script>

<template>
  <AccordionBase v-model="model" v-bind="calculatedUI.root">
    <AccordionItemBase v-for="item in calculatedUI.items" :key="item.value" v-bind="item.item">
      <AccordionTrigger v-bind="item.trigger">
        <slot :name="`trigger-${item.value}`" v-bind="item.slotProps">
          <slot name="trigger" v-bind="item.slotProps">
            {{ item.data.label }}
          </slot>
        </slot>
      </AccordionTrigger>

      <AccordionContent v-bind="item.content">
        <slot :name="`content-${item.value}`" v-bind="item.slotProps">
          <slot v-bind="item.slotProps">
            {{ item.data.content }}
          </slot>
        </slot>
      </AccordionContent>
    </AccordionItemBase>
  </AccordionBase>
</template>
