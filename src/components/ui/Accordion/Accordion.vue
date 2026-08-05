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
import { cn } from '@/lib/utils'
import {
  normalizeAccordionContentProps,
  normalizeAccordionItemProps,
  normalizeAccordionTriggerProps,
  resolveAccordionUIValue,
} from '.'
import type { AccordionProps, AccordionSlots, AccordionUIContext } from '.'

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

const model = defineModel<string | string[]>()
const attrs = useAttrs()

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

      // Normalize UI
      const itemUI = normalizeHTMLAttributes(resolveAccordionUIValue(props.ui?.item, context))
      const itemProps = normalizeAccordionItemProps(item)
      const triggerUI = normalizeHTMLAttributes(resolveAccordionUIValue(props.ui?.trigger, context))
      const iconUI = normalizeHTMLAttributes(resolveAccordionUIValue(props.ui?.icon, context))
      const iconDropdownUI = normalizeHTMLAttributes(
        resolveAccordionUIValue(props.ui?.iconDropdown, context),
      )
      const contentUI = normalizeHTMLAttributes(resolveAccordionUIValue(props.ui?.content, context))

      // Normalize components
      const trigger = normalizeAccordionTriggerProps(item.trigger)
      const content = normalizeAccordionContentProps(item.content)
      const icon = normalizeIconProps(item.icon)
      const iconDropdown = normalizeIconProps(
        open ? props.iconDropDownOpen : props.iconDropDownClose,
      )

      return {
        value: item.value,
        data: item,
        context,
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
          ...iconUI,
          ...icon,
          class: cn('size-4 shrink-0', iconUI.class),
          style: [iconUI.style],
        },
        iconDropdown: {
          ...iconDropdown,
          ...iconDropdownUI,
          class: cn(
            'pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground',
            iconDropdownUI.class,
          ),
          style: [iconDropdownUI.style],
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
            <slot :name="`trigger-${item.value}`" v-bind="item.context">
              <slot name="trigger" v-bind="item.context">
                <Icon
                  v-if="item.icon?.name"
                  v-bind="item.icon"
                  :name="item?.icon?.name"
                  data-slot="accordion-icon"
                />
                {{ item.data.label }}
              </slot>
            </slot>
          </span>
          <Icon
            v-if="item.iconDropdown?.name"
            v-bind="item.iconDropdown"
            :name="item.iconDropdown?.name"
            data-slot="accordion-icon-dropdown"
          />
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent v-bind="item.content" data-slot="accordion-content">
        <slot :name="`content-${item.value}`" v-bind="item.context">
          <slot v-bind="item.context">
            {{ item.data.description }}
          </slot>
        </slot>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
