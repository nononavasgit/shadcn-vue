<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import {
  normalizeAccordionContentProps,
  normalizeAccordionItemProps,
  normalizeAccordionTriggerProps,
} from '.'
import type {
  AccordionContext,
  AccordionItemContext,
  AccordionProps,
  AccordionSlots,
  AccordionValue,
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
  iconDropDownOpen: 'chevronUp',
  iconDropDownClose: 'chevronDown',
  ui: undefined,
})
defineSlots<AccordionSlots>()

const model = defineModel<AccordionValue>()
const attrs = useAttrs()

const accordionContext = computed<AccordionContext>(() => {
  const { ui, ...accordionProps } = props
  void ui

  return {
    props: accordionProps,
    value: model.value,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, accordionContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      type: props.type,
      collapsible: props.collapsible,
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
      const currentValue = accordionContext.value.value
      const open = Array.isArray(currentValue)
        ? currentValue.includes(item.value)
        : currentValue === item.value
      const context: AccordionItemContext = {
        ...accordionContext.value,
        item,
        index,
        open,
        first: index === 0,
        last: index === props.items.length - 1,
      }

      // Normalize UI
      const itemUI = normalizeHTMLAttributes(useResolve(props.ui?.item, context))
      const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, context))
      const contentUI = normalizeHTMLAttributes(useResolve(props.ui?.content, context))

      // Normalize components
      const itemProps = normalizeAccordionItemProps(item)
      const trigger = normalizeAccordionTriggerProps(item.trigger)
      const content = normalizeAccordionContentProps(item.content)
      const icon = normalizeIconProps(item.icon)
      const iconDropdown = normalizeIconProps(
        open ? props.iconDropDownOpen : props.iconDropDownClose,
      )

      const key = String(item.value)
      return {
        value: item.value,
        data: item,
        context,
        slots: {
          trigger: `trigger-${key}` as const,
          icon: `icon-${key}` as const,
          label: `label-${key}` as const,
          iconDropdown: `iconDropdown-${key}` as const,
          content: `content-${key}` as const,
        },
        item: {
          ...itemUI,
          ...itemProps,
          class: cn('border-b last:border-b-0', itemUI.class),
          style: itemUI.style,
        },
        trigger: {
          ...triggerUI,
          ...trigger,
          class: cn(
            'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
            triggerUI.class,
          ),
          style: triggerUI.style,
        },
        icon: {
          ...icon,
        },
        iconDropdown: {
          ...iconDropdown,
          class: 'pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground',
        },
        content: {
          ...content,
          ...contentUI,
          class: cn(
            'pt-0 pb-4 overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            contentUI.class,
          ),
          style: contentUI.style,
        },
      }
    }),
  }
})
</script>

<template>
  <AccordionRoot v-model="model" v-bind="calculatedUI.root" data-slot="accordion">
    <AccordionItem
      v-for="item in calculatedUI.items"
      :key="item.value"
      v-bind="item.item"
      data-slot="accordion-item"
    >
      <AccordionHeader class="flex">
        <AccordionTrigger v-bind="item.trigger" data-slot="accordion-trigger">
          <span class="flex min-w-0 flex-1 items-start gap-2">
            <slot :name="item.slots.trigger" v-bind="item.context">
              <slot name="trigger" v-bind="item.context">
                <slot :name="item.slots.icon" v-bind="item.context">
                  <slot name="icon" v-bind="item.context">
                    <Icon
                      v-if="item.icon?.name"
                      v-bind="item.icon"
                      :name="item?.icon?.name"
                      data-slot="accordion-icon"
                    />
                  </slot>
                </slot>
                <slot :name="item.slots.label" v-bind="item.context">
                  <slot name="label" v-bind="item.context">
                    {{ item.data?.label }}
                  </slot>
                </slot>
              </slot>
            </slot>
          </span>
          <slot :name="item.slots.iconDropdown" v-bind="item.context">
            <slot name="iconDropdown" v-bind="item.context">
              <Icon
                v-if="item.iconDropdown?.name"
                v-bind="item.iconDropdown"
                :name="item.iconDropdown?.name"
                data-slot="accordion-icon-dropdown"
              />
            </slot>
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent v-bind="item.content" data-slot="accordion-content">
        <slot :name="`content-${item.value}`" v-bind="item.context">
          <slot name="content" v-bind="item.context">
            {{ item.data?.description }}
          </slot>
        </slot>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
