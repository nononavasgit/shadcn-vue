<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Breadcrumb as BreadcrumbBase,
  BreadcrumbEllipsis,
  BreadcrumbItem as BreadcrumbItemBase,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/primitives/Breadcrumb'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { BreadcrumbProps, BreadcrumbSlots, BreadcrumbUIContext, BreadcrumbUIValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  items: () => [],
  ui: undefined,
})
defineSlots<BreadcrumbSlots>()

const attrs = useAttrs()

function resolveUI<T>(value: BreadcrumbUIValue<T> | undefined, context: BreadcrumbUIContext) {
  return typeof value === 'function'
    ? (value as (context: BreadcrumbUIContext) => T)(context)
    : value
}

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const listUI = normalizeHTMLAttributes(props.ui?.list)

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    list: {
      ...listUI,
      class: cn(listUI.class),
      style: listUI.style,
    },
    items: props.items.map((item, index) => {
      const context: BreadcrumbUIContext = {
        item,
        index,
        first: index === 0,
        last: index === props.items.length - 1,
        linked: !item.ellipsis && item.to !== undefined,
      }
      const itemUI = normalizeHTMLAttributes(resolveUI(props.ui?.item, context))
      const linkUI = normalizeHTMLAttributes(resolveUI(props.ui?.link, context))
      const pageUI = normalizeHTMLAttributes(resolveUI(props.ui?.page, context))
      const iconUI = normalizeHTMLAttributes(resolveUI(props.ui?.icon, context))
      const ellipsisUI = normalizeHTMLAttributes(resolveUI(props.ui?.ellipsis, context))
      const labelUI = normalizeHTMLAttributes(resolveUI(props.ui?.label, context))
      const separatorUI = normalizeHTMLAttributes(resolveUI(props.ui?.separator, context))
      const icon = normalizeIconProps(item.icon)
      const key = String(item.id)

      return {
        key,
        data: item,
        context,
        slotNames: {
          item: `item-${key}`,
          icon: `icon-${key}`,
          ellipsis: `ellipsis-${key}`,
          separator: `separator-${key}`,
        } as const,
        item: { ...itemUI, class: cn(itemUI.class), style: itemUI.style },
        link: {
          ...linkUI,
          to: item.to!,
          'aria-disabled': item.disabled || undefined,
          class: cn(
            'h-auto gap-1 p-0 text-sm font-normal hover:text-muted-foreground',
            linkUI.class,
          ),
          style: linkUI.style,
        },
        page: {
          ...pageUI,
          class: cn('inline-flex items-center gap-1', pageUI.class),
          style: pageUI.style,
        },
        icon: { ...iconUI, ...icon, class: cn(iconUI.class), style: iconUI.style },
        ellipsis: { ...ellipsisUI, class: cn(ellipsisUI.class), style: ellipsisUI.style },
        label: { ...labelUI, class: cn(labelUI.class), style: labelUI.style },
        separator: { ...separatorUI, class: cn(separatorUI.class), style: separatorUI.style },
      }
    }),
  }
})
</script>

<template>
  <BreadcrumbBase v-bind="calculatedUI.root">
    <BreadcrumbList v-bind="calculatedUI.list">
      <template v-for="item in calculatedUI.items" :key="item.key">
        <BreadcrumbItemBase v-bind="item.item">
          <slot :name="item.slotNames.item" v-bind="item.context">
            <slot name="item" v-bind="item.context">
              <template v-if="item.data.ellipsis">
                <slot :name="item.slotNames.ellipsis" v-bind="item.context">
                  <slot name="ellipsis" v-bind="item.context">
                    <BreadcrumbEllipsis v-bind="item.ellipsis" />
                  </slot>
                </slot>
              </template>

              <BreadcrumbLink v-else-if="item.context.linked" as-child>
                <Link v-bind="item.link">
                  <slot :name="item.slotNames.icon" v-bind="item.context">
                    <slot name="icon" v-bind="item.context">
                      <Icon v-if="item.icon.name" v-bind="item.icon" :name="item.icon.name" />
                    </slot>
                  </slot>
                  <span v-bind="item.label">{{ item.data.label }}</span>
                </Link>
              </BreadcrumbLink>

              <BreadcrumbPage v-else v-bind="item.page">
                <slot :name="item.slotNames.icon" v-bind="item.context">
                  <slot name="icon" v-bind="item.context">
                    <Icon v-if="item.icon.name" v-bind="item.icon" :name="item.icon.name" />
                  </slot>
                </slot>
                <span v-bind="item.label">{{ item.data.label }}</span>
              </BreadcrumbPage>
            </slot>
          </slot>
        </BreadcrumbItemBase>

        <template v-if="!item.context.last">
          <slot :name="item.slotNames.separator" v-bind="item.context">
            <slot name="separator" v-bind="item.context">
              <BreadcrumbSeparator v-bind="item.separator" />
            </slot>
          </slot>
        </template>
      </template>
    </BreadcrumbList>
  </BreadcrumbBase>
</template>
