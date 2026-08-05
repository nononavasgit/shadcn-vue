<script setup lang="ts">
import { Button } from '@/components/ui/Button'
import { computed, useAttrs } from 'vue'
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { normalizeRootProps, resolvePaginationItemUIValue, resolvePaginationUIValue } from '.'
import type {
  PaginationEmits,
  PaginationGeneratedItem,
  PaginationProps,
  PaginationSlots,
  PaginationUIContext,
  PaginationItemUIContext,
} from '.'
import { useI18n } from '@/i18n'

const { t } = useI18n()
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PaginationProps>(), {
  defaultPage: 1,
  total: 0,
  itemsPerPage: 10,
  siblingCount: 2,
  showEdges: true,
  showControls: true,
  variant: 'outline',
  size: 'md',
  color: undefined,
  activeColor: undefined,
  activeVariant: 'solid',
  disabled: false,
  firstIcon: 'chevronsLeft',
  prevIcon: 'chevronLeft',
  nextIcon: 'chevronRight',
  lastIcon: 'chevronsRight',
  ellipsisIcon: 'moreHorizontal',
  as: 'nav',
  asChild: false,
  ui: undefined,
})
defineEmits<PaginationEmits>()
const slots = defineSlots<PaginationSlots>()

const attrs = useAttrs()
const model = defineModel<number>('page')

const contextPagination = computed(() => {
  const c: PaginationUIContext = {
    itemsPerPage: props.itemsPerPage,
    page: model.value ?? props.defaultPage,
    total: props.total,
    pageCount: Math.min(props.total / props.itemsPerPage),
  }

  return c
})
const calculatedUI = computed(() => {
  // Normalize UI attributes
  const rootUI = normalizeHTMLAttributes(
    resolvePaginationUIValue(props.ui?.root, contextPagination.value),
  )
  const listUI = normalizeHTMLAttributes(
    resolvePaginationUIValue(props.ui?.list, contextPagination.value),
  )
  const firstUI = normalizeHTMLAttributes(
    resolvePaginationUIValue(props.ui?.first, contextPagination.value),
  )
  const previousUI = normalizeHTMLAttributes(
    resolvePaginationUIValue(props.ui?.previous, contextPagination.value),
  )
  const nextUI = normalizeHTMLAttributes(
    resolvePaginationUIValue(props.ui?.next, contextPagination.value),
  )
  const lastUI = normalizeHTMLAttributes(
    resolvePaginationUIValue(props.ui?.last, contextPagination.value),
  )

  const root = normalizeRootProps(props)

  return {
    root: {
      as: 'nav',
      ...attrs,
      ...root,
      itemsPerPage: props.itemsPerPage,
      ...rootUI,
      class: cn(
        'mx-auto flex w-full flex-wrap items-center justify-center gap-3',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
    list: {
      ...listUI,
      class: cn('flex flex-wrap flex-row items-center gap-1', listUI.class),
      style: listUI.style,
    },
    first: {
      'aria-label': t('first'),
      ...firstUI,
      asChild: true,
    },
    previous: {
      'aria-label': t('previus'),
      ...previousUI,
      asChild: true,
    },
    next: {
      'aria-label': t('next'),
      ...nextUI,
      asChild: true,
    },
    last: {
      'aria-label': t('last'),
      ...lastUI,
      asChild: true,
    },
  }
})

function buildItems(items: PaginationGeneratedItem[]) {
  return items?.map((item, index) => {
    const context: PaginationItemUIContext = {
      ...contextPagination.value,
      item,
      index,
      active: item.type === 'page' && item.value === contextPagination.value.page,
      first: index === 0,
      last: index === items.length - 1,
    }

    const key = (
      item.type === 'page' ? 'item-' + item.value : 'ellipsis-' + index
    ) as keyof PaginationSlots

    const itemUI = normalizeHTMLAttributes(resolvePaginationItemUIValue(props.ui?.item, context))
    const ellipsisUI = normalizeHTMLAttributes(
      resolvePaginationItemUIValue(props.ui?.ellipsis, context),
    )

    return {
      key,
      contextItem: context,
      data: item,
      item: {
        asChild: true,
        'aria-label': item?.type === 'page' ? t('page_{n}', { n: item?.value }) : undefined,
        ...itemUI,
        class: cn(itemUI.class),
        style: itemUI.style,
      },
      ellipsis: {
        asChild: true,
        'aria-label': t('morePages'),
        ...ellipsisUI,
        class: cn('flex items-center justify-center', ellipsisUI.class),
        style: ellipsisUI.style,
      },
    }
  })
}
</script>

<template>
  <PaginationRoot v-bind="calculatedUI.root" v-model:page="model" data-slot="pagination">
    <PaginationList v-slot="{ items }" v-bind="calculatedUI.list" data-slot="pagination-list">
      <slot v-if="slots.preContent" name="preContent" v-bind="contextPagination" />

      <PaginationFirst
        v-if="props.showControls"
        v-bind="calculatedUI.first"
        data-slot="pagination-first"
      >
        <slot name="first" v-bind="contextPagination"
          ><Button
            :icon="firstIcon"
            :color="props.color"
            :variant="props.variant"
            :size="props.size"
            square
        /></slot>
      </PaginationFirst>

      <PaginationPrev
        v-if="props.showControls"
        v-bind="calculatedUI.previous"
        data-slot="pagination-previous"
      >
        <slot name="previous" v-bind="contextPagination"
          ><Button
            :icon="prevIcon"
            :color="props.color"
            :variant="props.variant"
            :size="props.size"
            square
        /></slot>
      </PaginationPrev>

      <template v-for="item in buildItems(items)" :key="item?.key">
        <PaginationListItem
          v-if="item.data?.type === 'page'"
          v-bind="item?.item"
          :value="item?.data?.value"
        >
          <slot name="item" v-bind="item.contextItem">
            <Button
              :label="String(item?.data?.value)"
              :color="item.contextItem.active ? (props.activeColor ?? props.color) : props.color"
              :variant="
                item.contextItem.active ? (props.activeVariant ?? props.variant) : props.variant
              "
              :size="props.size"
              square
            />
          </slot>
        </PaginationListItem>
        <PaginationEllipsis v-else v-bind="item?.ellipsis">
          <slot name="ellipsis" v-bind="item.contextItem"
            ><Button
              :icon="ellipsisIcon"
              :color="props.color"
              :variant="props.variant"
              :size="props.size"
              as="span"
              square
          /></slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext
        v-if="props.showControls"
        v-bind="calculatedUI.next"
        data-slot="pagination-next"
      >
        <slot name="next" v-bind="contextPagination"
          ><Button
            :icon="nextIcon"
            :color="props.color"
            :variant="props.variant"
            :size="props.size"
            square
        /></slot>
      </PaginationNext>

      <PaginationLast
        v-if="props.showControls"
        v-bind="calculatedUI.last"
        data-slot="pagination-last"
      >
        <slot name="last" v-bind="contextPagination"
          ><Button
            :icon="lastIcon"
            :color="props.color"
            :variant="props.variant"
            :size="props.size"
            square
        /></slot>
      </PaginationLast>

      <slot v-if="slots.postContent" name="postContent" v-bind="contextPagination" />
    </PaginationList>
  </PaginationRoot>
</template>
