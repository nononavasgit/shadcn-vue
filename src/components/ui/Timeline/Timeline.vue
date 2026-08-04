<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type {
  TimelineProps,
  TimelineSlots,
  TimelineItemContext,
  TimelineContext,
  TimelineValue,
} from '.'
import { resolveTimelineItemUIValue } from '.'
import { Primitive } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TimelineProps>(), {
  value: undefined,
  orientation: 'vertical',
  ui: undefined,
})

defineSlots<TimelineSlots>()
const attrs = useAttrs()
const model = defineModel<TimelineValue>('value')

const contextTimeline = computed(() => {
  const c: TimelineContext = {
    value: model.value,
    items: props?.items,
  }

  return c
})
const calculatedUI = computed(() => {
  // Normalize UI
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const activeIndex = props.items.findIndex((item) => Object.is(item.value, model.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(
        'group/timeline m-0 flex w-full list-none p-0',
        props.orientation === 'horizontal'
          ? 'flex-row items-start overflow-x-auto pb-2'
          : 'flex-col',
        attrs.class,
        rootUI.class,
      ),
      'data-orientation': props.orientation,
      'data-slot': 'timeline',
    },
    items: props.items?.map((item, index) => {
      const completed = activeIndex >= 0 && index <= activeIndex
      const separatorCompleted = activeIndex > index

      const contextItem: TimelineItemContext = {
        item,
        index,
        completed,
        active: Object.is(model.value, item.value),
        first: index === 0,
        last: index === props.items?.length - 1,
      }

      const key = String(item.value)

      // Normalize UI
      const itemUI = normalizeHTMLAttributes(
        resolveTimelineItemUIValue(props.ui?.item, contextItem),
      )
      const headerUI = normalizeHTMLAttributes(
        resolveTimelineItemUIValue(props.ui?.header, contextItem),
      )
      const separatorUI = normalizeHTMLAttributes(
        resolveTimelineItemUIValue(props.ui?.separator, contextItem),
      )
      const indicatorUI = normalizeHTMLAttributes(
        resolveTimelineItemUIValue(props.ui?.indicator, contextItem),
      )
      const labelUI = normalizeHTMLAttributes(
        resolveTimelineItemUIValue(props.ui?.label, contextItem),
      )
      const descriptionUI = normalizeHTMLAttributes(
        resolveTimelineItemUIValue(props.ui?.description, contextItem),
      )

      return {
        key,
        data: item,
        contextItem: contextItem,
        slots: {
          header: `header-${key}` as `header-${string}`,
          label: `label-${key}` as `label-${string}`,
          description: `description-${key}` as `description-${string}`,
          indicator: `indicator-${key}` as `indicator-${string}`,
        },
        item: {
          ...itemUI,
          class: cn(
            'group/timeline-item relative flex min-w-0 flex-1 flex-col gap-0.5 group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:min-w-48 group-data-[orientation=horizontal]/timeline:shrink-0 group-data-[orientation=horizontal]/timeline:not-last:pe-8 group-data-[orientation=vertical]/timeline:not-last:pb-6 has-[+[data-completed]]:**:data-[slot=timeline-separator]:bg-primary',
            itemUI.class,
          ),
          style: itemUI.style,
          'data-completed': completed || undefined,
          'data-slot': 'timeline-item',
        },
        header: {
          ...headerUI,
          class: cn(props.orientation === 'horizontal' ? 'w-full' : '', headerUI.class),
          'data-slot': 'timeline-header',
        },
        separator: {
          class: cn(
            'pointer-events-none absolute z-0 transition-colors group-last/timeline-item:hidden',
            props.orientation === 'vertical'
              ? '-start-6 top-4.5 bottom-0 w-0.5'
              : 'start-0 -top-6 h-0.5 w-[calc(100%-1rem-0.25rem)] -translate-y-1/2 translate-x-4.5',
            separatorCompleted ? 'bg-primary/40' : 'bg-border',
            separatorUI.class,
          ),
          'aria-hidden': true,
          'data-slot': 'timeline-separator',
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
            'absolute z-10 flex size-4 items-center justify-center rounded-full border-2 border-primary/20 text-xs font-medium transition-colors',
            props.orientation === 'vertical'
              ? '-start-6 top-0 -translate-x-1/2'
              : 'left-0 -top-6 -translate-y-1/2',
            completed
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-muted-foreground',
            indicatorUI.class,
          ),
          'data-slot': 'timeline-indicator',
        },
      }
    }),
  }
})
</script>

<template>
  <Primitive role="list" v-bind="calculatedUI.root">
    <div v-for="item in calculatedUI.items" :key="item.key" role="listitem" v-bind="item?.item">
      <div v-bind="item?.header">
        <slot name="header" v-bind="contextTimeline">
          <slot :name="item?.slots?.header" v-bind="item?.contextItem">
            <slot name="label" v-bind="contextTimeline">
              <slot :name="item?.slots?.label" v-bind="item?.contextItem">
                <div v-if="item?.data?.label" v-bind="item?.label">{{ item?.data?.label }}</div>
              </slot>
            </slot>
          </slot>
        </slot>
      </div>
      <div v-bind="item?.indicator">
        <slot name="indicator" v-bind="contextTimeline">
          <slot :name="item?.slots?.indicator" v-bind="item?.contextItem" />
        </slot>
      </div>
      <div v-bind="item?.separator"></div>
      <div v-bind="item?.description">
        <slot name="description" v-bind="contextTimeline">
          <slot :name="item?.slots?.description" v-bind="item?.contextItem">
            <template v-if="item?.data?.description">{{ item?.data?.description }}</template>
          </slot>
        </slot>
      </div>
    </div>
  </Primitive>
</template>
