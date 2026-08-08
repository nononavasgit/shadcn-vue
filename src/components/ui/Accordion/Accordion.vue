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

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, accordionContext.value))

  return {
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
  }
})

function getItemContext(
  item: NonNullable<AccordionProps['items']>[number],
  index: number,
): AccordionItemContext {
  const currentValue = accordionContext.value.value
  const open = Array.isArray(currentValue)
    ? currentValue.includes(item.value)
    : currentValue === item.value
  return {
    ...accordionContext.value,
    item,
    index,
    open,
    first: index === 0,
    last: index === props.items.length - 1,
  }
}

function getItemProps(context: AccordionItemContext) {
  const itemUI = normalizeHTMLAttributes(useResolve(props.ui?.item, context))
  return {
    ...itemUI,
    ...normalizeAccordionItemProps(context.item),
    class: cn('border-b last:border-b-0', itemUI.class),
    style: itemUI.style,
  }
}

function getTriggerProps(context: AccordionItemContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.trigger, context))
  return {
    ...ui,
    ...normalizeAccordionTriggerProps(context.item.trigger),
    class: cn(
      'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
      ui.class,
    ),
    style: ui.style,
  }
}

function getContentProps(context: AccordionItemContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.content, context))
  return {
    ...normalizeAccordionContentProps(context.item.content),
    ...ui,
    class: cn(
      'pt-0 pb-4 overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      ui.class,
    ),
    style: ui.style,
  }
}

function getSlots(context: AccordionItemContext) {
  const key = String(context.item.value)
  return {
    trigger: `trigger-${key}` as const,
    icon: `icon-${key}` as const,
    label: `label-${key}` as const,
    iconDropdown: `iconDropdown-${key}` as const,
    content: `content-${key}` as const,
  }
}

const itemContexts = computed(() => props.items.map(getItemContext))

function getIconProps(context: AccordionItemContext) {
  const icon = normalizeIconProps(context.item.icon)
  if (!icon.name) return undefined
  return { ...icon, name: icon.name }
}

function getIconDropdownProps(context: AccordionItemContext) {
  const icon = normalizeIconProps(context.open ? props.iconDropDownOpen : props.iconDropDownClose)
  if (!icon.name) return undefined
  return { ...icon, name: icon.name }
}
</script>

<template>
  <AccordionRoot v-model="model" v-bind="rootProps" data-slot="accordion">
    <AccordionItem
      v-for="context in itemContexts"
      :key="context.item.value"
      v-bind="getItemProps(context)"
      data-slot="accordion-item"
    >
      <AccordionHeader class="flex">
        <AccordionTrigger v-bind="getTriggerProps(context)" data-slot="accordion-trigger">
          <span class="flex min-w-0 flex-1 items-start gap-2">
            <slot :name="getSlots(context).trigger" v-bind="context">
              <slot name="trigger" v-bind="context">
                <slot :name="getSlots(context).icon" v-bind="context">
                  <slot name="icon" v-bind="context">
                    <Icon
                      v-if="getIconProps(context)"
                      v-bind="getIconProps(context)!"
                      data-slot="accordion-icon"
                    />
                  </slot>
                </slot>
                <slot :name="getSlots(context).label" v-bind="context">
                  <slot name="label" v-bind="context">
                    {{ context.item.label }}
                  </slot>
                </slot>
              </slot>
            </slot>
          </span>
          <slot :name="getSlots(context).iconDropdown" v-bind="context">
            <slot name="iconDropdown" v-bind="context">
              <Icon
                v-if="getIconDropdownProps(context)"
                v-bind="getIconDropdownProps(context)!"
                data-slot="accordion-icon-dropdown"
              />
            </slot>
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent v-bind="getContentProps(context)" data-slot="accordion-content">
        <slot :name="getSlots(context).content" v-bind="context">
          <slot name="content" v-bind="context">
            {{ context.item.description }}
          </slot>
        </slot>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
