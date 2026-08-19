<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Icon } from '@/components/ui/Icon'
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
import { useUi } from '@/composables/useUi'

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
const activeIndex = computed(() =>
  timelineItems.value.findIndex((item) => Object.is(item.value, model.value)),
)

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

const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, timelineContext.value)

  return {
    ...attrs,
    ...rootUI,
    class: cn(timelineVariants({ orientation: props.orientation }), attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
    'data-orientation': props.orientation,
    'data-slot': 'timeline',
  }
})

function getItemContext(item: TimelineProps['items'][number], index: number): TimelineItemContext {
  const completed = activeIndex.value >= 0 && index <= activeIndex.value
  return {
    ...timelineContext.value,
    item,
    index,
    completed,
    active: Object.is(model.value, item.value),
    first: index === 0,
    last: index === timelineItems.value.length - 1,
    itemAlign: props.align === 'alternate' ? (index % 2 === 0 ? 'left' : 'right') : props.align,
  }
}

function getItemProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.item, context)
  return {
    ...ui,
    class: cn(
      timelineItemVariants({ orientation: props.orientation, align: props.align }),
      ui.class,
    ),
    style: ui.style,
    'data-align': context.itemAlign,
    'data-completed': context.completed || undefined,
    'data-slot': 'timeline-item',
  }
}

function getContentProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.content, context)
  return {
    ...ui,
    class: cn(
      timelineContentVariants({
        orientation: props.orientation,
        align: props.align,
        side: context.itemAlign,
      }),
      ui.class,
    ),
    style: ui.style,
    'data-slot': 'timeline-content',
  }
}

function getHeaderProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.header, context)
  return {
    ...ui,
    class: cn(props.orientation === 'horizontal' ? 'w-full' : '', ui.class),
    'data-slot': 'timeline-header',
  }
}

function getSeparatorProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.separator, context)
  const completed = activeIndex.value > context.index
  return {
    ...ui,
    class: cn(
      timelineSeparatorVariants({
        orientation: props.orientation,
        align: props.align,
        side: context.itemAlign,
        completed,
        severity: props.severity,
        color: Boolean(props.color),
      }),
      ui.class,
    ),
    'aria-hidden': true,
    'data-completed': completed || undefined,
    'data-slot': 'timeline-separator',
    style: [colorStyle.value, ui.style],
  }
}

function getLabelProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.label, context)
  return {
    ...ui,
    class: cn('text-sm font-semibold text-foreground', ui.class),
    'data-slot': 'timeline-label',
  }
}

function getDescriptionProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.description, context)
  return {
    ...ui,
    class: cn(
      'text-sm text-muted-foreground',
      props.orientation === 'vertical' ? 'mt-2' : 'mt-3 w-full min-w-0',
      ui.class,
    ),
    'data-slot': 'timeline-description',
  }
}

function getIndicatorProps(context: TimelineItemContext) {
  const ui = useUi(props.ui?.indicator, context)
  return {
    'aria-hidden': true,
    ...ui,
    class: cn(
      timelineIndicatorVariants({
        orientation: props.orientation,
        align: props.align,
        side: context.itemAlign,
        sizeIndicator: props.sizeIndicator,
        severity: props.severity,
        color: Boolean(props.color),
      }),
      context.completed ? undefined : 'border-border bg-background text-muted-foreground',
      ui.class,
    ),
    'data-completed': context.completed || undefined,
    'data-slot': 'timeline-indicator',
    style: [colorStyle.value, ui.style],
  }
}

function getSlots(context: TimelineItemContext) {
  const key = getKeyItem(context)
  return {
    header: `header-${key}` as `header-${string}`,
    label: `label-${key}` as `label-${string}`,
    description: `description-${key}` as `description-${string}`,
    indicator: `indicator-${key}` as `indicator-${string}`,
    separator: `separator-${key}` as `separator-${string}`,
  }
}

function getKeyItem(context: TimelineItemContext) {
  return String(context.item?.value)
}
const itemContexts = computed(() => timelineItems.value.map(getItemContext))

function getIconProps(context: TimelineItemContext) {
  return context.item?.icon
}
</script>

<template>
  <Primitive role="list" v-bind="rootProps">
    <div
      v-for="context in itemContexts"
      :key="getKeyItem(context)"
      v-bind="getItemProps(context)"
      role="listitem"
    >
      <div v-bind="getContentProps(context)">
        <div v-bind="getHeaderProps(context)">
          <slot :name="getSlots(context).header" v-bind="context">
            <slot name="header" v-bind="context">
              <slot :name="getSlots(context).label" v-bind="context">
                <slot name="label" v-bind="context">
                  <div v-bind="getLabelProps(context)">{{ context.item.label }}</div>
                </slot>
              </slot>
            </slot>
          </slot>
        </div>

        <div v-bind="getDescriptionProps(context)">
          <slot :name="getSlots(context).description" v-bind="context">
            <slot name="description" v-bind="context">
              {{ context.item.description }}
            </slot>
          </slot>
        </div>
      </div>

      <div v-bind="getIndicatorProps(context)">
        <slot :name="getSlots(context).indicator" v-bind="context">
          <slot name="indicator" v-bind="context">
            <Icon
              v-if="getIconProps(context)?.name"
              v-bind="getIconProps(context)!"
              data-slot="timeline-indicator-icon"
            />
          </slot>
        </slot>
      </div>

      <div v-bind="getSeparatorProps(context)">
        <slot :name="getSlots(context).separator" v-bind="context">
          <slot name="separator" v-bind="context" />
        </slot>
      </div>
    </div>
  </Primitive>
</template>
