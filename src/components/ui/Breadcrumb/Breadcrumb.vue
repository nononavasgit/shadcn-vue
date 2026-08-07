<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { Link, normalizeLinkProps } from '@/components/ui/Link'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type {
  BreadcrumbContext,
  BreadcrumbEllipsisContext,
  BreadcrumbItemContext,
  BreadcrumbProps,
  BreadcrumbSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const { t } = useI18n()

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  items: () => [],
  ellipsisIndex: undefined,
  ellipsisIcon: 'moreHorizontal',
  separatorIcon: 'chevronRight',
  ui: undefined,
})
defineSlots<BreadcrumbSlots>()

const breadcrumbContext = computed<BreadcrumbContext>(() => {
  const { ui, ...breadcrumbProps } = props
  void ui

  return {
    props: breadcrumbProps,
  }
})

const attrs = useAttrs()

const calculatedUI = computed(() => {
  // Normalize
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, breadcrumbContext.value))
  const listUI = normalizeHTMLAttributes(useResolve(props.ui?.list, breadcrumbContext.value))
  const ellipsisContainerUI = normalizeHTMLAttributes(
    useResolve(props.ui?.ellipsisContainer, breadcrumbContext.value),
  )
  const separatorContainerUI = normalizeHTMLAttributes(
    useResolve(props.ui?.separatorContainer, breadcrumbContext.value),
  )
  const [ellipsisStart, ellipsisEnd] = props.ellipsisIndex ?? []
  const hasEllipsis =
    ellipsisStart !== undefined &&
    ellipsisEnd !== undefined &&
    ellipsisStart >= 0 &&
    ellipsisEnd >= ellipsisStart &&
    ellipsisStart < props.items.length
  const breadcrumbEllipsisContext: BreadcrumbEllipsisContext = {
    ...breadcrumbContext.value,
    items: hasEllipsis ? props.items.slice(ellipsisStart, ellipsisEnd + 1) : [],
  }

  return {
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
    ellipsisContainer: {
      'aria-label': t('more'),
      ...ellipsisContainerUI,
      class: cn('flex size-9 items-center justify-center', ellipsisContainerUI.class),
      style: ellipsisContainerUI.style,
    },
    ellipsisIcon: {
      ...normalizeIconProps(props.ellipsisIcon),
    },
    ellipsisContext: breadcrumbEllipsisContext,
    separatorContainer: {
      ...separatorContainerUI,
    },
    separatorIcon: {
      ...normalizeIconProps(props.separatorIcon),
    },
    items: props.items.flatMap((item, index) => {
      if (hasEllipsis && index > ellipsisStart && index <= ellipsisEnd) return []

      // Items
      const ellipsis = hasEllipsis && index === ellipsisStart
      const breadcrumbItemContext = {
        ...breadcrumbContext.value,
        item,
        index,
        first: index === 0,
        last:
          index === props.items.length - 1 || (ellipsis && ellipsisEnd === props.items.length - 1),
        linked: !ellipsis && item.to !== undefined,
        ellipsis,
      } satisfies BreadcrumbItemContext
      const itemUI = normalizeHTMLAttributes(useResolve(props.ui?.item, breadcrumbItemContext))
      const linkUI = normalizeHTMLAttributes(useResolve(props.ui?.link, breadcrumbItemContext))
      const pageUI = normalizeHTMLAttributes(useResolve(props.ui?.page, breadcrumbItemContext))
      const labelUI = normalizeHTMLAttributes(useResolve(props.ui?.label, breadcrumbItemContext))

      const link = normalizeLinkProps({
        to: item.to!,
        label: item.label,
        icon: item.icon,
      })
      const key = String(item.id)

      return {
        key,
        data: item,
        context: breadcrumbItemContext,
        slotNames: {
          item: `item-${key}`,
          icon: `icon-${key}`,
        } as const,
        item: {
          'aria-current': breadcrumbItemContext.last,
          ...itemUI,
          class: cn('inline-flex items-center gap-1.5', itemUI.class),
          style: itemUI.style,
        },
        link: {
          ...linkUI,
          ...link,
          to: item.to!,
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
        icon: {
          ...normalizeIconProps(item.icon),
        },
        label: { ...labelUI, class: cn(labelUI.class), style: labelUI.style },
      }
    }),
  }
})
</script>

<template>
  <nav v-bind="calculatedUI.root" data-slot="breadcrumb">
    <ol v-bind="calculatedUI.list" data-slot="breadcrumb-list">
      <slot v-bind="breadcrumbContext">
        <template v-for="item in calculatedUI.items" :key="item.key">
          <li v-bind="item.item" data-slot="breadcrumb-item">
            <slot :name="item.slotNames.item" v-bind="item.context">
              <slot name="item" v-bind="item.context">
                <template v-if="item.context.ellipsis">
                  <div v-bind="calculatedUI.ellipsisContainer">
                    <slot name="ellipsis" v-bind="calculatedUI.ellipsisContext">
                      <span
                        v-bind="calculatedUI.ellipsisContainer"
                        data-slot="breadcrumb-ellipsis"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <Icon
                          v-if="calculatedUI.ellipsisIcon.name"
                          v-bind="calculatedUI.ellipsisIcon"
                          :name="calculatedUI.ellipsisIcon.name"
                        />
                      </span>
                    </slot>
                  </div>
                </template>

                <Link
                  v-else-if="item.context.linked"
                  v-bind="item.link"
                  data-slot="breadcrumb-link"
                >
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
            <slot name="separator" v-bind="breadcrumbContext">
              <li
                v-bind="calculatedUI.separatorContainer"
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
      </slot>
    </ol>
  </nav>
</template>
