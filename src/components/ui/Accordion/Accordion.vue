<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type {
  AccordionEmits,
  AccordionContext,
  AccordionItemContext,
  AccordionProps,
  AccordionSlots,
  AccordionValue,
} from '.'
import { createAccordionContext, createAccordionItemContext } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'single',
  collapsible: false,
  disabled: false,
  unmountOnHide: true,
  items: () => [],
  iconDropDownOpen: 'chevronUp',
  iconDropDownClose: 'chevronDown',
  ui: undefined,
})
defineSlots<AccordionSlots>()
const emit = defineEmits<AccordionEmits>()

const model = defineModel<AccordionValue>('value')
const attrs = useAttrs()

watch(model, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const accordionContext = computed<AccordionContext>(() =>
  createAccordionContext(props, model.value),
)

const rootProps = computed(() => {
  const normalizedRootUI = useUi(props.ui?.root, accordionContext.value)
  const { dir: rootDirection, ...rootAttrs } = attrs
  const { dir: rootUIDirection, ...rootUI } = normalizedRootUI
  void rootDirection
  void rootUIDirection

  return {
    ...rootAttrs,
    ...rootUI,
    type: props.type,
    collapsible: props.collapsible,
    disabled: props.disabled,
    unmountOnHide: props.unmountOnHide,
    as: 'div' as const,
    asChild: false,
    class: cn(attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

function getItemContext(
  item: NonNullable<AccordionProps['items']>[number],
  index: number,
): AccordionItemContext {
  return createAccordionItemContext(item, index, model.value, props.items.length)
}

function getItemProps(context: AccordionItemContext) {
  const itemUI = useUi(props.ui?.item, context)
  return {
    ...itemUI,
    value: context.item.value,
    disabled: context.item.disabled,
    unmountOnHide: context.item.unmountOnHide ?? props.unmountOnHide,
    class: cn('border-b last:border-b-0', itemUI.class),
    style: itemUI.style,
  }
}

function getTriggerProps(context: AccordionItemContext) {
  const ui = useUi(props.ui?.trigger, context)
  return {
    ...ui,
    class: cn(
      'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
      ui.class,
    ),
    style: ui.style,
  }
}

function getContentProps(context: AccordionItemContext) {
  const ui = useUi(props.ui?.content, context)
  return {
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
  return normalizeIconProps(context.item.icon)
}

function getIconDropdownProps(context: AccordionItemContext) {
  return normalizeIconProps(context.open ? props.iconDropDownOpen : props.iconDropDownClose)
}
</script>

<template>
  <AccordionRoot v-model="model" v-bind="rootProps" data-test-accordion-root>
    <AccordionItem
      v-for="context in itemContexts"
      :key="context.item.value"
      v-bind="getItemProps(context)"
      :data-test-accordion-item="context.item.value"
    >
      <AccordionHeader class="flex">
        <AccordionTrigger
          v-bind="getTriggerProps(context)"
          :data-test-accordion-trigger="context.item.value"
        >
          <span class="flex min-w-0 flex-1 items-start gap-2">
            <slot :name="getSlots(context).trigger" v-bind="context">
              <slot name="trigger" v-bind="context">
                <slot :name="getSlots(context).icon" v-bind="context">
                  <slot name="icon" v-bind="context">
                    <Icon
                      v-if="getIconProps(context)"
                      v-bind="getIconProps(context)!"
                      :data-test-accordion-icon="context.item.value"
                    />
                  </slot>
                </slot>
                <slot :name="getSlots(context).label" v-bind="context">
                  <slot name="label" v-bind="context">
                    <span :data-test-accordion-label="context.item.value">
                      {{ context.item.label }}
                    </span>
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
                :data-test-accordion-icon-dropdown="context.item.value"
              />
            </slot>
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent
        v-bind="getContentProps(context)"
        :data-test-accordion-content="context.item.value"
      >
        <slot :name="getSlots(context).content" v-bind="context">
          <slot name="content" v-bind="context">
            <span :data-test-accordion-description="context.item.value">
              {{ context.item.description }}
            </span>
          </slot>
        </slot>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
