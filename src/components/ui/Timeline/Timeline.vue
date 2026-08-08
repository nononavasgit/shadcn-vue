<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import type {
  TimelineContext,
  TimelineEmits,
  TimelineItemContext,
  TimelineProps,
  TimelineSlots,
  TimelineValue,
} from '.'
import {
  timelineContentVariants,
  timelineIndicatorVariants,
  timelineItemVariants,
  timelineSeparatorVariants,
  timelineVariants,
} from '.'
import { Primitive } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TimelineProps>(), {
  value: undefined,
  orientation: 'vertical',
  align: 'right',
  sizeIndicator: 'md',
  color: undefined,
  severity: 'primary',
  reverse: false,
  ui: undefined,
})

defineSlots<TimelineSlots>()
const emit = defineEmits<TimelineEmits>()
const attrs = useAttrs()
const model = defineModel<TimelineValue>('value')
const { colorStyle } = useColor(
  computed(() => props.color),
  'timeline',
)

const timelineItems = computed(() => (props.reverse ? [...props.items].reverse() : props.items))

watch(model, (value, previousValue) => {
  if (value !== undefined && value !== previousValue) emit('valueChange', value)
})

const timelineContext = computed<TimelineContext>(() => {
  const { ui, ...timelineProps } = props
  void ui

  return {
    props: timelineProps,
    value: model.value,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, timelineContext.value))
  const activeIndex = timelineItems.value.findIndex((item) => Object.is(item.value, model.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(timelineVariants({ orientation: props.orientation }), attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
      'data-orientation': props.orientation,
      'data-slot': 'timeline',
    },
    items: timelineItems.value.map((item, index) => {
      const completed = activeIndex >= 0 && index <= activeIndex
      const separatorCompleted = activeIndex > index

      const context: TimelineItemContext = {
        ...timelineContext.value,
        item,
        index,
        completed,
        active: Object.is(model.value, item.value),
        first: index === 0,
        last: index === timelineItems.value.length - 1,
        itemAlign: props.align === 'alternate' ? (index % 2 === 0 ? 'left' : 'right') : props.align,
      }

      const key = String(item.value)

      const itemUI = normalizeHTMLAttributes(useResolve(props.ui?.item, context))
      const contentUI = normalizeHTMLAttributes(useResolve(props.ui?.content, context))
      const headerUI = normalizeHTMLAttributes(useResolve(props.ui?.header, context))
      const separatorUI = normalizeHTMLAttributes(useResolve(props.ui?.separator, context))
      const indicatorUI = normalizeHTMLAttributes(useResolve(props.ui?.indicator, context))
      const labelUI = normalizeHTMLAttributes(useResolve(props.ui?.label, context))
      const descriptionUI = normalizeHTMLAttributes(useResolve(props.ui?.description, context))
      const itemAlignment = context.itemAlign

      return {
        key,
        data: item,
        context,
        slots: {
          header: `header-${key}` as `header-${string}`,
          label: `label-${key}` as `label-${string}`,
          description: `description-${key}` as `description-${string}`,
          indicator: `indicator-${key}` as `indicator-${string}`,
          separator: `separator-${key}` as `separator-${string}`,
        },
        item: {
          ...itemUI,
          class: cn(
            timelineItemVariants({
              orientation: props.orientation,
              align: props.align,
            }),
            itemUI.class,
          ),
          style: itemUI.style,
          'data-align': itemAlignment,
          'data-completed': completed || undefined,
          'data-slot': 'timeline-item',
        },
        content: {
          ...contentUI,
          class: cn(
            timelineContentVariants({
              orientation: props.orientation,
              align: props.align,
              side: itemAlignment,
            }),
            contentUI.class,
          ),
          style: contentUI.style,
          'data-slot': 'timeline-content',
        },
        header: {
          ...headerUI,
          class: cn(props.orientation === 'horizontal' ? 'w-full' : '', headerUI.class),
          'data-slot': 'timeline-header',
        },
        separator: {
          ...separatorUI,
          class: cn(
            timelineSeparatorVariants({
              orientation: props.orientation,
              align: props.align,
              side: itemAlignment,
              completed: separatorCompleted,
              severity: props.severity,
              color: Boolean(props.color),
            }),
            separatorUI.class,
          ),
          'aria-hidden': true,
          'data-completed': separatorCompleted || undefined,
          'data-slot': 'timeline-separator',
          style: [colorStyle.value, separatorUI.style],
        },
        label: {
          ...labelUI,
          class: cn('text-sm font-semibold text-foreground', labelUI.class),
          'data-slot': 'timeline-label',
        },
        description: {
          ...descriptionUI,
          class: cn(
            'text-sm text-muted-foreground',
            props.orientation === 'vertical' ? 'mt-2' : 'mt-3 w-full min-w-0',
            descriptionUI.class,
          ),
          'data-slot': 'timeline-description',
        },
        indicator: {
          'aria-hidden': true,
          ...indicatorUI,
          class: cn(
            timelineIndicatorVariants({
              orientation: props.orientation,
              align: props.align,
              side: itemAlignment,
              sizeIndicator: props.sizeIndicator,
              severity: props.severity,
              color: Boolean(props.color),
            }),
            completed ? undefined : 'border-border bg-background text-muted-foreground',
            indicatorUI.class,
          ),
          'data-completed': completed || undefined,
          'data-slot': 'timeline-indicator',
          style: [colorStyle.value, indicatorUI.style],
        },
        icon: normalizeIconProps(item.icon),
      }
    }),
  }
})
</script>

<template>
  <Primitive role="list" v-bind="calculatedUI.root">
    <div v-for="item in calculatedUI.items" :key="item.key" role="listitem" v-bind="item.item">
      <div v-bind="item.content">
        <div v-bind="item.header">
          <slot :name="item.slots.header" v-bind="item.context">
            <slot name="header" v-bind="item.context">
              <slot :name="item.slots.label" v-bind="item.context">
                <slot name="label" v-bind="item.context">
                  <div v-bind="item.label">{{ item.data.label }}</div>
                </slot>
              </slot>
            </slot>
          </slot>
        </div>

        <div v-bind="item.description">
          <slot :name="item.slots.description" v-bind="item.context">
            <slot name="description" v-bind="item.context">
              {{ item.data.description }}
            </slot>
          </slot>
        </div>
      </div>

      <div v-bind="item.indicator">
        <slot :name="item.slots.indicator" v-bind="item.context">
          <slot name="indicator" v-bind="item.context">
            <Icon
              v-if="item.icon?.name"
              v-bind="item.icon"
              :name="item.icon.name"
              data-slot="timeline-indicator-icon"
            />
          </slot>
        </slot>
      </div>

      <div v-bind="item.separator">
        <slot :name="item.slots.separator" v-bind="item.context">
          <slot name="separator" v-bind="item.context" />
        </slot>
      </div>
    </div>
  </Primitive>
</template>
