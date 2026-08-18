<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type {
  BreadcrumbEllipsisContext,
  BreadcrumbItem,
  BreadcrumbItemContext,
  BreadcrumbProps,
  BreadcrumbSlots,
} from '.'
import { breadcrumbDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const { t } = useI18n()
const props = withDefaults(defineProps<BreadcrumbProps>(), breadcrumbDefaults)
defineSlots<BreadcrumbSlots>()

const attrs = useAttrs()
const slots = useSlots()

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
    items:
      hasEllipsis.value && start !== undefined && end !== undefined
        ? props.items.slice(start + 1, end + 1)
        : [],
  }
})

const rootProps = computed(() => {
  return attrs
})

const listProps = computed(() => {
  const ui = useUi(props.ui?.list, undefined)
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
  const ui = useUi(props.ui?.ellipsisContainer, undefined)
  return {
    'aria-label': t('more'),
    ...ui,
    class: cn('flex size-9 items-center justify-center', ui.class),
    style: ui.style,
  }
})

const separatorContainerProps = computed(() => {
  const ui = useUi(props.ui?.separatorContainer, undefined)
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
    item,
    index,
    first: index === 0,
    last: index === props.items.length - 1 || (ellipsis && end === props.items.length - 1),
    linked: !ellipsis && item.link.to !== undefined,
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
  return String(context.item.value)
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
  const ui = useUi(context.linked ? props.ui?.link : props.ui?.page, context)
  return {
    ...context.item.link,
    ...(!context.linked ? { variant: 'plain' as const } : {}),
    ...ui,
    class: cn(
      context.linked
        ? 'h-auto gap-1 p-0 text-sm font-normal transition-colors hover:text-muted-foreground'
        : 'h-auto gap-1 rounded-none border-0 bg-transparent p-0 text-sm font-normal text-foreground no-underline shadow-none hover:bg-transparent hover:text-foreground hover:no-underline active:bg-transparent active:text-foreground',
      ui.class,
    ),
    style: ui.style,
  }
}

function getLabelProps(context: BreadcrumbItemContext) {
  const ui = useUi(props.ui?.label, context)
  return { ...ui, class: cn(ui.class), style: ui.style }
}
</script>

<template>
  <nav v-bind="rootProps" data-test-breadcrumb-root>
    <ol v-bind="listProps" data-test-breadcrumb-list>
      <template v-for="context in itemContexts" :key="getKey(context)">
        <li v-bind="getItemProps(context)" :data-test-breadcrumb-item="context.item.value">
          <slot :name="getSlotNames(context).item" v-bind="context">
            <slot name="item" v-bind="context">
              <template v-if="context.ellipsis">
                <div v-bind="ellipsisContainerProps">
                  <slot name="ellipsis" v-bind="ellipsisContext">
                    <span
                      v-bind="ellipsisContainerProps"
                      data-test-breadcrumb-ellipsis
                      role="presentation"
                      aria-hidden="true"
                    >
                      <Icon v-if="ellipsisIconProps?.name" v-bind="ellipsisIconProps" />
                    </span>
                  </slot>
                </div>
              </template>

              <Link
                v-else
                v-bind="getLinkProps(context)"
                :data-test-breadcrumb-link="context.linked ? '' : undefined"
                :data-test-breadcrumb-page="context.linked ? undefined : ''"
              >
                <template v-if="slots[getSlotNames(context).icon] || slots.icon" #leading>
                  <slot :name="getSlotNames(context).icon" v-bind="context">
                    <slot name="icon" v-bind="context" />
                  </slot>
                </template>
                <template v-if="!context.linked" #default>
                  <span v-bind="getLabelProps(context)" data-test-breadcrumb-label>
                    {{ context.item.link.label }}
                  </span>
                </template>
              </Link>
            </slot>
          </slot>
        </li>

        <template v-if="!context.last">
          <li v-bind="separatorContainerProps" data-test-breadcrumb-separator>
            <slot name="separator">
              <Icon v-if="separatorIconProps?.name" v-bind="separatorIconProps" />
            </slot>
          </li>
        </template>
      </template>
    </ol>
  </nav>
</template>
