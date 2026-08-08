<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
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
import { Button } from '@/components/ui/Button'
import { normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type {
  PaginationContext,
  PaginationEmits,
  PaginationGeneratedItem,
  PaginationItemContext,
  PaginationProps,
  PaginationSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PaginationProps>(), {
  as: 'nav',
  asChild: false,
  total: 0,
  itemsPerPage: 10,
  siblingCount: 2,
  showEdges: true,
  disabled: false,
  showControls: true,
  color: undefined,
  variant: 'outline',
  size: 'md',
  severity: 'primary',
  activeColor: undefined,
  activeVariant: 'solid',
  firstIcon: 'chevronsLeft',
  previousIcon: 'chevronLeft',
  nextIcon: 'chevronRight',
  lastIcon: 'chevronsRight',
  ellipsisIcon: 'moreHorizontal',
  ui: undefined,
})
const emit = defineEmits<PaginationEmits>()
defineSlots<PaginationSlots>()

const attrs = useAttrs()
const page = defineModel<number>('page', { default: 1 })
const { t } = useI18n()

watch(page, (nextPage, previousPage) => {
  if (nextPage !== previousPage) emit('pageChange', nextPage)
})

const paginationContext = computed<PaginationContext>(() => {
  const { ui, ...paginationProps } = props
  void ui

  return {
    props: paginationProps,
    page: page.value,
    pageCount: props.itemsPerPage > 0 ? Math.ceil(props.total / props.itemsPerPage) : 0,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, paginationContext.value))
  const listUI = normalizeHTMLAttributes(useResolve(props.ui?.list, paginationContext.value))
  const firstUI = normalizeHTMLAttributes(useResolve(props.ui?.first, paginationContext.value))
  const previousUI = normalizeHTMLAttributes(
    useResolve(props.ui?.previous, paginationContext.value),
  )
  const nextUI = normalizeHTMLAttributes(useResolve(props.ui?.next, paginationContext.value))
  const lastUI = normalizeHTMLAttributes(useResolve(props.ui?.last, paginationContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      total: props.total,
      itemsPerPage: props.itemsPerPage,
      siblingCount: props.siblingCount,
      showEdges: props.showEdges,
      disabled: props.disabled,
      'data-slot': 'pagination',
      class: cn(
        'mx-auto flex w-full flex-wrap items-center justify-center gap-3',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
    list: {
      ...listUI,
      'data-slot': 'pagination-list',
      class: cn('flex flex-row flex-wrap items-center gap-1', listUI.class),
      style: listUI.style,
    },
    first: {
      ...firstUI,
      asChild: true,
      'aria-label': firstUI['aria-label'] ?? t('first'),
      'data-slot': 'pagination-first',
      class: cn(firstUI.class),
      style: firstUI.style,
    },
    previous: {
      ...previousUI,
      asChild: true,
      'aria-label': previousUI['aria-label'] ?? t('previus'),
      'data-slot': 'pagination-previous',
      class: cn(previousUI.class),
      style: previousUI.style,
    },
    next: {
      ...nextUI,
      asChild: true,
      'aria-label': nextUI['aria-label'] ?? t('next'),
      'data-slot': 'pagination-next',
      class: cn(nextUI.class),
      style: nextUI.style,
    },
    last: {
      ...lastUI,
      asChild: true,
      'aria-label': lastUI['aria-label'] ?? t('last'),
      'data-slot': 'pagination-last',
      class: cn(lastUI.class),
      style: lastUI.style,
    },
    firstIcon: normalizeIconProps(props.firstIcon),
    previousIcon: normalizeIconProps(props.previousIcon),
    nextIcon: normalizeIconProps(props.nextIcon),
    lastIcon: normalizeIconProps(props.lastIcon),
    ellipsisIcon: normalizeIconProps(props.ellipsisIcon),
    items: (items: PaginationGeneratedItem[]) =>
      items.map((item, index) => {
        const context: PaginationItemContext = {
          ...paginationContext.value,
          item,
          index,
          active: item.type === 'page' && item.value === paginationContext.value.page,
          first: index === 0,
          last: index === items.length - 1,
        }
        const itemUI = normalizeHTMLAttributes(useResolve(props.ui?.item, context))
        const ellipsisUI = normalizeHTMLAttributes(useResolve(props.ui?.ellipsis, context))
        const key = item.type === 'page' ? `item-${item.value}` : `ellipsis-${index}`

        return {
          key,
          data: item,
          context,
          slots: {
            item: `item-${item.type === 'page' ? item.value : index}` as `item-${string}`,
            ellipsis: `ellipsis-${index}` as `ellipsis-${string}`,
          },
          item: {
            ...itemUI,
            asChild: true,
            'aria-label': item.type === 'page' ? t('page_{n}', { n: item.value }) : undefined,
            'data-slot': 'pagination-item',
            class: cn(itemUI.class),
            style: itemUI.style,
          },
          ellipsis: {
            ...ellipsisUI,
            asChild: true,
            'aria-label': ellipsisUI['aria-label'] ?? t('morePages'),
            'data-slot': 'pagination-ellipsis',
            class: cn('flex items-center justify-center', ellipsisUI.class),
            style: ellipsisUI.style,
          },
        }
      }),
  }
})
</script>

<template>
  <PaginationRoot v-model:page="page" v-bind="calculatedUI.root">
    <PaginationList v-slot="{ items }" v-bind="calculatedUI.list">
      <slot name="preContent" v-bind="paginationContext" />

      <PaginationFirst v-if="props.showControls" v-bind="calculatedUI.first">
        <slot name="first" v-bind="paginationContext">
          <Button
            :icon="calculatedUI.firstIcon"
            :color="props.color"
            :variant="props.variant"
            :severity="props.severity"
            :size="props.size"
            square
          />
        </slot>
      </PaginationFirst>

      <PaginationPrev v-if="props.showControls" v-bind="calculatedUI.previous">
        <slot name="previous" v-bind="paginationContext">
          <Button
            :icon="calculatedUI.previousIcon"
            :color="props.color"
            :variant="props.variant"
            :severity="props.severity"
            :size="props.size"
            square
          />
        </slot>
      </PaginationPrev>

      <template v-for="item in calculatedUI.items(items)" :key="item.key">
        <PaginationListItem
          v-if="item.data.type === 'page'"
          v-bind="item.item"
          :value="item.data.value"
        >
          <slot :name="item.slots.item" v-bind="item.context">
            <slot name="item" v-bind="item.context">
              <Button
                :label="String(item.data.value)"
                :color="item.context.active ? (props.activeColor ?? props.color) : props.color"
                :variant="
                  item.context.active ? (props.activeVariant ?? props.variant) : props.variant
                "
                :severity="props.severity"
                :size="props.size"
                square
              />
            </slot>
          </slot>
        </PaginationListItem>

        <PaginationEllipsis v-else v-bind="item.ellipsis">
          <slot :name="item.slots.ellipsis" v-bind="item.context">
            <slot name="ellipsis" v-bind="item.context">
              <Button
                :icon="calculatedUI.ellipsisIcon"
                :color="props.color"
                :variant="props.variant"
                :severity="props.severity"
                :size="props.size"
                as="span"
                square
              />
            </slot>
          </slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext v-if="props.showControls" v-bind="calculatedUI.next">
        <slot name="next" v-bind="paginationContext">
          <Button
            :icon="calculatedUI.nextIcon"
            :color="props.color"
            :variant="props.variant"
            :severity="props.severity"
            :size="props.size"
            square
          />
        </slot>
      </PaginationNext>

      <PaginationLast v-if="props.showControls" v-bind="calculatedUI.last">
        <slot name="last" v-bind="paginationContext">
          <Button
            :icon="calculatedUI.lastIcon"
            :color="props.color"
            :variant="props.variant"
            :severity="props.severity"
            :size="props.size"
            square
          />
        </slot>
      </PaginationLast>

      <slot name="postContent" v-bind="paginationContext" />
    </PaginationList>

    <slot v-bind="paginationContext" />
  </PaginationRoot>
</template>
