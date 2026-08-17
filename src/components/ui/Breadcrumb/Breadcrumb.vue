<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type {
  BreadcrumbContext,
  BreadcrumbEllipsisContext,
  BreadcrumbItem,
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

const attrs = useAttrs()
const slots = useSlots()

const breadcrumbContext = computed<BreadcrumbContext>(() => {
  const { ui, ...breadcrumbProps } = props
  void ui
  return { props: breadcrumbProps }
})

const ellipsisRange = computed(() => props.ellipsisIndex ?? [])
const hasEllipsis = computed(() => {
  const [start, end] = ellipsisRange.value
  return (
    start !== undefined &&
    end !== undefined &&
    start >= 0 &&
    end >= start &&
    start < props.items.length
  )
})

const ellipsisContext = computed<BreadcrumbEllipsisContext>(() => {
  const [start, end] = ellipsisRange.value
  return {
    ...breadcrumbContext.value,
    items:
      hasEllipsis.value && start !== undefined && end !== undefined
        ? props.items.slice(start, end + 1)
        : [],
  }
})

const rootProps = computed(() => {
  const ui = useUi(props.ui?.root, breadcrumbContext.value)
  return {
    ...attrs,
    ...ui,
    class: cn(attrs.class, ui.class),
    style: [attrs.style, ui.style],
  }
})

const listProps = computed(() => {
  const ui = useUi(props.ui?.list, breadcrumbContext.value)
  return {
    ...ui,
    class: cn(
      'flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5',
      ui.class,
    ),
    style: ui.style,
  }
})

const ellipsisContainerProps = computed(() => {
  const ui = useUi(props.ui?.ellipsisContainer, breadcrumbContext.value)
  return {
    'aria-label': t('more'),
    ...ui,
    class: cn('flex size-9 items-center justify-center', ui.class),
    style: ui.style,
  }
})

const separatorContainerProps = computed(() => {
  const ui = useUi(props.ui?.separatorContainer, breadcrumbContext.value)
  return { role: 'presentation', 'aria-hidden': true, ...ui }
})

const ellipsisIconProps = computed(() => normalizeIconProps(props.ellipsisIcon))
const separatorIconProps = computed(() => normalizeIconProps(props.separatorIcon))

function getItemContext(item: BreadcrumbItem, index: number): BreadcrumbItemContext | undefined {
  const [start, end] = ellipsisRange.value
  if (
    hasEllipsis.value &&
    start !== undefined &&
    end !== undefined &&
    index > start &&
    index <= end
  ) {
    return undefined
  }

  const ellipsis = hasEllipsis.value && index === start
  return {
    ...breadcrumbContext.value,
    item,
    index,
    first: index === 0,
    last: index === props.items.length - 1 || (ellipsis && end === props.items.length - 1),
    linked: !ellipsis && item.to !== undefined,
    ellipsis,
  }
}

const itemContexts = computed(() =>
  props.items.flatMap((item, index) => {
    const context = getItemContext(item, index)
    return context ? [context] : []
  }),
)

function getKey(context: BreadcrumbItemContext) {
  return String(context.item.id)
}

function getSlotNames(context: BreadcrumbItemContext) {
  const key = getKey(context)
  return { item: `item-${key}` as const, icon: `icon-${key}` as const }
}

function getItemProps(context: BreadcrumbItemContext) {
  const ui = useUi(props.ui?.item, context)
  return {
    'aria-current': context.last,
    ...ui,
    class: cn('inline-flex items-center gap-1.5', ui.class),
    style: ui.style,
  }
}

function getLinkProps(context: BreadcrumbItemContext) {
  const ui = useUi(props.ui?.link, context)
  const item = context.item
  return {
    ...ui,
    to: item.to!,
    label: item.label,
    icon: item.icon,
    'aria-disabled': item.disabled || undefined,
    class: cn(
      'h-auto gap-1 p-0 text-sm font-normal transition-colors hover:text-muted-foreground',
      ui.class,
    ),
    style: ui.style,
  }
}

function getPageProps(context: BreadcrumbItemContext) {
  const ui = useUi(props.ui?.page, context)
  return {
    ...ui,
    class: cn('inline-flex items-center gap-1 font-normal text-foreground', ui.class),
    style: ui.style,
  }
}

function getLabelProps(context: BreadcrumbItemContext) {
  const ui = useUi(props.ui?.label, context)
  return { ...ui, class: cn(ui.class), style: ui.style }
}

function getIconProps(context: BreadcrumbItemContext) {
  return normalizeIconProps(context.item.icon)
}
</script>

<template>
  <nav v-bind="rootProps" data-slot="breadcrumb">
    <ol v-bind="listProps" data-slot="breadcrumb-list">
      <slot v-bind="breadcrumbContext">
        <template v-for="context in itemContexts" :key="getKey(context)">
          <li v-bind="getItemProps(context)" data-slot="breadcrumb-item">
            <slot :name="getSlotNames(context).item" v-bind="context">
              <slot name="item" v-bind="context">
                <template v-if="context.ellipsis">
                  <div v-bind="ellipsisContainerProps">
                    <slot name="ellipsis" v-bind="ellipsisContext">
                      <span
                        v-bind="ellipsisContainerProps"
                        data-slot="breadcrumb-ellipsis"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <Icon v-if="ellipsisIconProps?.name" v-bind="ellipsisIconProps" />
                      </span>
                    </slot>
                  </div>
                </template>

                <Link
                  v-else-if="context.linked"
                  v-bind="getLinkProps(context)"
                  data-slot="breadcrumb-link"
                >
                  <template v-if="slots[getSlotNames(context).icon] || slots.icon" #leading>
                    <slot :name="getSlotNames(context).icon" v-bind="context">
                      <slot name="icon" v-bind="context" />
                    </slot>
                  </template>
                </Link>

                <span v-else v-bind="getPageProps(context)" data-slot="breadcrumb-page">
                  <slot :name="getSlotNames(context).icon" v-bind="context">
                    <slot name="icon" v-bind="context">
                      <Icon v-if="getIconProps(context)" v-bind="getIconProps(context)!" />
                    </slot>
                  </slot>
                  <span v-bind="getLabelProps(context)">{{ context.item.label }}</span>
                </span>
              </slot>
            </slot>
          </li>

          <template v-if="!context.last">
            <li v-bind="separatorContainerProps" data-slot="breadcrumb-separator">
              <slot name="separator" v-bind="breadcrumbContext">
                <Icon v-if="separatorIconProps?.name" v-bind="separatorIconProps" />
              </slot>
            </li>
          </template>
        </template>
      </slot>
    </ol>
  </nav>
</template>
