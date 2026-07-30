<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/primitives/Pagination'
import { cn } from '@/lib/utils'
import type {
  PaginationGeneratedItem,
  PaginationProps,
  PaginationRootSlotProps,
  PaginationSlots,
  PaginationUIContext,
  PaginationUIValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PaginationProps>(), {
  defaultPage: 1,
  total: 0,
  itemsPerPage: 10,
  siblingCount: 2,
  showEdges: true,
  disabled: false,
  showFirst: false,
  showPrevious: true,
  showNext: true,
  showLast: false,
  as: 'nav',
  asChild: false,
})
defineEmits<{ 'update:page': [value: number] }>()
const slots = defineSlots<PaginationSlots>()

const attrs = useAttrs()
const model = defineModel<number>('page')

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    defaultPage: props.defaultPage,
    total: props.total,
    itemsPerPage: props.itemsPerPage,
    siblingCount: props.siblingCount,
    showEdges: props.showEdges,
    disabled: props.disabled,
    class: cn(attrs.class),
  },
  content: {
    ...props.ui?.content,
    class: cn(props.ui?.content?.class),
  },
  first: {
    ...props.ui?.first,
    class: cn(props.ui?.first?.class),
  },
  previous: {
    ...props.ui?.previous,
    class: cn(props.ui?.previous?.class),
  },
  next: {
    ...props.ui?.next,
    class: cn(props.ui?.next?.class),
  },
  last: {
    ...props.ui?.last,
    class: cn(props.ui?.last?.class),
  },
}))

function resolveUI<T>(value: PaginationUIValue<T> | undefined, context: PaginationUIContext) {
  return typeof value === 'function'
    ? (value as (context: PaginationUIContext) => T)(context)
    : value
}

function buildEntries(items: PaginationGeneratedItem[], root: PaginationRootSlotProps) {
  return items.map((item, index) => {
    const context: PaginationUIContext = {
      ...root,
      item,
      index,
      active: item.type === 'page' && item.value === root.page,
      first: index === 0,
      last: index === items.length - 1,
    }
    const itemUI = resolveUI(props.ui?.item, context)
    const ellipsisUI = resolveUI(props.ui?.ellipsis, context)
    const key = item.type === 'page' ? `page-${item.value}` : `ellipsis-${index}`

    return {
      key,
      data: item,
      context,
      slotName:
        item.type === 'page' ? (`item-${item.value}` as const) : (`ellipsis-${index}` as const),
      item: {
        ...itemUI,
        class: cn(itemUI?.class),
        style: itemUI?.style,
      },
      ellipsis: {
        ...ellipsisUI,
        class: cn(ellipsisUI?.class),
        style: ellipsisUI?.style,
      },
    }
  })
}

function getRootSlotProps(root: { page: number; pageCount: number }): PaginationRootSlotProps {
  const from = props.total === 0 ? 0 : (root.page - 1) * props.itemsPerPage + 1
  const to = Math.min(root.page * props.itemsPerPage, props.total)

  return {
    ...root,
    total: props.total,
    itemsPerPage: props.itemsPerPage,
    from,
    to,
  }
}
</script>

<template>
  <Pagination v-slot="rootState" v-model:page="model" v-bind="calculatedUI.root">
    <PaginationContent v-slot="{ items }" v-bind="calculatedUI.content">
      <slot v-if="slots.preContent" name="preContent" v-bind="getRootSlotProps(rootState)" />

      <PaginationFirst v-if="props.showFirst" v-bind="calculatedUI.first">
        <slot v-if="slots.first" name="first" v-bind="getRootSlotProps(rootState)" />
      </PaginationFirst>

      <PaginationPrevious v-if="props.showPrevious" v-bind="calculatedUI.previous">
        <slot v-if="slots.previous" name="previous" v-bind="getRootSlotProps(rootState)"></slot>
      </PaginationPrevious>

      <template v-for="entry in buildEntries(items, getRootSlotProps(rootState))" :key="entry.key">
        <PaginationItem
          v-if="entry.data.type === 'page'"
          v-bind="entry.item"
          :value="entry.data.value"
          :is-active="entry.context.active"
        >
          <slot :name="entry.slotName" v-bind="entry.context">
            <slot :name="slots.item" v-bind="entry.context">
              {{ entry.data.value }}
            </slot>
          </slot>
        </PaginationItem>

        <PaginationEllipsis
          v-else-if="$slots[entry.slotName] || $slots.ellipsis"
          v-bind="entry.ellipsis"
        >
          <slot :name="entry.slotName" v-bind="entry.context">
            <slot :name="slots.ellipsis" v-bind="entry.context" />
          </slot>
        </PaginationEllipsis>
        <PaginationEllipsis v-else v-bind="entry.ellipsis" />
      </template>

      <PaginationNext v-if="props.showNext" v-bind="calculatedUI.next">
        <slot v-if="$slots.next" :name="slots.next" v-bind="getRootSlotProps(rootState)" />
      </PaginationNext>

      <PaginationLast v-if="props.showLast" v-bind="calculatedUI.last">
        <slot v-if="$slots.last" :name="slots.last" v-bind="getRootSlotProps(rootState)" />
      </PaginationLast>

      <slot v-if="slots.postContent" name="postContent" v-bind="getRootSlotProps(rootState)" />
    </PaginationContent>
  </Pagination>
</template>
