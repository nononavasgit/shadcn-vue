<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import { resolveBreadcrumbItemUIValue } from '.'
import type { BreadcrumbItemUIContext, BreadcrumbProps, BreadcrumbSlots } from '.'

defineOptions({ inheritAttrs: false })

const { t } = useI18n()

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  items: () => [],
  ellipsisIcon: 'moreHorizontal',
  separatorIcon: 'chevronRight',
  ui: undefined,
})
defineSlots<BreadcrumbSlots>()

const attrs = useAttrs()

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const listUI = normalizeHTMLAttributes(props.ui?.list)
  const ellipsisIcon = normalizeIconProps(props.ellipsisIcon)
  const separatorIcon = normalizeIconProps(props.separatorIcon)

  return {
    more: t('more'),
    ellipsisIcon,
    separatorIcon,
    root: {
      ...attrs,
      ...rootUI,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    list: {
      ...listUI,
      class: cn(
        'flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5',
        listUI.class,
      ),
      style: listUI.style,
    },
    items: props.items.map((item, index) => {
      const context: BreadcrumbItemUIContext = {
        item,
        index,
        first: index === 0,
        last: index === props.items.length - 1,
        linked: !item.ellipsis && item.to !== undefined,
      }
      const itemUI = normalizeHTMLAttributes(resolveBreadcrumbItemUIValue(props.ui?.item, context))
      const linkUI = normalizeHTMLAttributes(resolveBreadcrumbItemUIValue(props.ui?.link, context))
      const pageUI = normalizeHTMLAttributes(resolveBreadcrumbItemUIValue(props.ui?.page, context))
      const iconUI = normalizeHTMLAttributes(resolveBreadcrumbItemUIValue(props.ui?.icon, context))
      const ellipsisUI = normalizeHTMLAttributes(
        resolveBreadcrumbItemUIValue(props.ui?.ellipsis, context),
      )
      const labelUI = normalizeHTMLAttributes(
        resolveBreadcrumbItemUIValue(props.ui?.label, context),
      )
      const separatorUI = normalizeHTMLAttributes(
        resolveBreadcrumbItemUIValue(props.ui?.separator, context),
      )
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
        } as const,
        item: {
          'aria-current': context.last,
          ...itemUI,
          class: cn('inline-flex items-center gap-1.5', itemUI.class),
          style: itemUI.style,
        },
        link: {
          ...linkUI,
          to: item.to!,
          label: item.label,
          icon: item.icon,
          ui: { icon: iconUI },
          'aria-disabled': item.disabled || undefined,
          class: cn(
            'h-auto gap-1 p-0 text-sm font-normal transition-colors hover:text-muted-foreground',
            linkUI.class,
          ),
          style: linkUI.style,
        },
        page: {
          ...pageUI,
          class: cn('inline-flex items-center gap-1 font-normal text-foreground', pageUI.class),
          style: pageUI.style,
        },
        icon: { ...iconUI, ...icon, class: cn(iconUI.class), style: iconUI.style },
        ellipsis: {
          ...ellipsisUI,
          class: cn('flex size-9 items-center justify-center', ellipsisUI.class),
          style: ellipsisUI.style,
        },
        label: { ...labelUI, class: cn(labelUI.class), style: labelUI.style },
        separator: {
          ...separatorUI,
          class: cn('[&>svg]:size-3.5', separatorUI.class),
          style: separatorUI.style,
        },
      }
    }),
  }
})
</script>

<template>
  <nav v-bind="calculatedUI.root" data-slot="breadcrumb">
    <ol v-bind="calculatedUI.list" data-slot="breadcrumb-list">
      <template v-for="item in calculatedUI.items" :key="item.key">
        <li v-bind="item.item" data-slot="breadcrumb-item">
          <slot :name="item.slotNames.item" v-bind="item.context">
            <slot name="item" v-bind="item.context">
              <template v-if="item.data.ellipsis">
                <slot :name="item.slotNames.ellipsis" v-bind="item.context">
                  <slot name="ellipsis" v-bind="item.context">
                    <span
                      v-bind="item.ellipsis"
                      data-slot="breadcrumb-ellipsis"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <Icon
                        v-if="calculatedUI.ellipsisIcon?.name"
                        v-bind="calculatedUI.ellipsisIcon"
                        :name="calculatedUI.ellipsisIcon.name"
                      />
                      <span class="sr-only">{{ calculatedUI.more }}</span>
                    </span>
                  </slot>
                </slot>
              </template>

              <Link v-else-if="item.context.linked" v-bind="item.link" data-slot="breadcrumb-link">
                <template v-if="$slots[item.slotNames.icon] || $slots.icon" #leading>
                  <slot :name="item.slotNames.icon" v-bind="item.context">
                    <slot name="icon" v-bind="item.context" />
                  </slot>
                </template>
              </Link>

              <span v-else v-bind="item.page" data-slot="breadcrumb-page">
                <slot :name="item.slotNames.icon" v-bind="item.context">
                  <slot name="icon" v-bind="item.context">
                    <Icon v-if="item.icon?.name" v-bind="item.icon" :name="item.icon.name" />
                  </slot>
                </slot>
                <span v-bind="item.label">{{ item.data.label }}</span>
              </span>
            </slot>
          </slot>
        </li>

        <template v-if="!item.context.last">
          <slot name="separator" v-bind="item.context">
            <li
              v-bind="item.separator"
              data-slot="breadcrumb-separator"
              role="presentation"
              aria-hidden="true"
            >
              <Icon
                v-if="calculatedUI.separatorIcon?.name"
                v-bind="calculatedUI.separatorIcon"
                :name="calculatedUI.separatorIcon.name"
              />
            </li>
          </slot>
        </template>
      </template>
    </ol>
  </nav>
</template>
