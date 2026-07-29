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
} from '@/components/ui/Breadcrumb'
import { Icon } from '@/components/app/Icon'
import { Link } from '@/components/app/Link'
import { cn } from '@/lib/utils'
import type { BreadcrumbProps, BreadcrumbSlots, BreadcrumbUIContext, BreadcrumbUIValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  items: () => [],
})
defineSlots<BreadcrumbSlots>()

const attrs = useAttrs()

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    class: cn(attrs.class),
  },
  list: {
    ...props.ui?.list,
    class: cn(props.ui?.list?.class),
  },
  items: props.items.map((item, index) => {
    const context: BreadcrumbUIContext = {
      item,
      index,
      first: index === 0,
      last: index === props.items.length - 1,
      linked: !item.ellipsis && item.to !== undefined,
    }
    const resolveUI = <T,>(value: BreadcrumbUIValue<T> | undefined): T | undefined =>
      typeof value === 'function' ? (value as (context: BreadcrumbUIContext) => T)(context) : value
    const itemUI = resolveUI(props.ui?.item)
    const linkUI = resolveUI(props.ui?.link)
    const pageUI = resolveUI(props.ui?.page)
    const iconUI = resolveUI(props.ui?.icon)
    const ellipsisUI = resolveUI(props.ui?.ellipsis)
    const labelUI = resolveUI(props.ui?.label)
    const separatorUI = resolveUI(props.ui?.separator)
    const key = String(item.id)
    const icon = typeof item.icon === 'string' ? { name: item.icon } : item.icon

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
      item: {
        ...itemUI,
        class: cn(itemUI?.class),
        style: itemUI?.style,
      },
      link: {
        ...linkUI,
        to: item.to!,
        'aria-disabled': item.disabled || undefined,
        class: cn(
          'h-auto gap-1 p-0 text-sm font-normal  hover:text-muted-foreground',
          linkUI?.class,
        ),
        style: linkUI?.style,
      },
      page: {
        ...pageUI,
        class: cn('inline-flex items-center gap-1', pageUI?.class),
        style: pageUI?.style,
      },
      icon: {
        ...iconUI,
        ...icon,
        class: cn(iconUI?.class, icon?.class),
        style: [iconUI?.style, icon?.style],
      },
      ellipsis: {
        ...ellipsisUI,
        class: cn(ellipsisUI?.class),
        style: ellipsisUI?.style,
      },
      label: {
        ...labelUI,
        class: cn(labelUI?.class),
        style: labelUI?.style,
      },
      separator: {
        ...separatorUI,
        class: cn(separatorUI?.class),
        style: separatorUI?.style,
      },
    }
  }),
}))
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
