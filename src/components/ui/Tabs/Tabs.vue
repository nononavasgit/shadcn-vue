<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { tabsVariants } from '.'
import { tabsDefaults } from './defaults'
import type { IconProps } from '@/components/ui/Icon'
import type { TabsContext, TabsEmits, TabsItemContext, TabsProps, TabsSlots, TabsValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TabsProps>(), tabsDefaults)
defineSlots<TabsSlots>()
defineEmits<TabsEmits>()

const attrs = useAttrs()
const value = defineModel<TabsValue>('value')
const tabsContext = computed<TabsContext>(() => ({ tabs: props.tabs }))

const rootProps = computed(() => {
  const normalizedRootUI = useUi(props.ui?.root, undefined)
  const { dir: rootDirection, ...rootUI } = normalizedRootUI

  void rootDirection

  return {
    ...attrs,
    ...rootUI,
    orientation: props.orientation,
    activationMode: props.activationMode,
    unmountOnHide: props.unmountOnHide,
    as: 'div' as const,
    asChild: false,
    'data-variant': props.variant,
    class: cn(
      'flex flex-col gap-2',
      tabsVariants.root({ orientation: props.orientation }),
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})

const listProps = computed(() => {
  const ui = useUi(props.ui?.list, undefined)

  return {
    ...ui,
    loop: props.loop,
    'data-variant': props.variant,
    class: cn(
      'inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground aria-[orientation=vertical]:h-fit aria-[orientation=vertical]:flex-col',
      tabsVariants.list({ variant: props.variant, orientation: props.orientation }),
      ui.class,
    ),
    style: ui.style,
  }
})

const contentWrapperProps = computed(() => {
  const ui = useUi(props.ui?.contentWrapper, undefined)
  return { ...ui, class: cn('min-w-0 flex-1', ui.class), style: ui.style }
})

const itemContexts = computed<TabsItemContext[]>(() =>
  props.tabs.map((tab, index) => ({
    tab,
    index,
    active: Object.is(value.value, tab.value),
    first: index === 0,
    last: index === props.tabs.length - 1,
  })),
)

function getTabsContext(): TabsContext {
  return tabsContext.value
}

function getTriggerProps(context: TabsItemContext) {
  const ui = useUi(props.ui?.trigger, context)

  return {
    ...ui,
    value: context.tab.value,
    disabled: context.tab.disabled,
    class: cn(
      'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:shadow-sm dark:text-muted-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      tabsVariants.trigger({ variant: props.variant, orientation: props.orientation }),
      ui.class,
    ),
    'data-variant': props.variant,
    style: ui.style,
  }
}

function getLabelProps(context: TabsItemContext) {
  const ui = useUi(props.ui?.label, context)
  return { ...ui, class: cn(ui.class), style: ui.style }
}

function getContentProps(context: TabsItemContext) {
  const normalizedUI = useUi(props.ui?.content, context)
  const { dir: contentDirection, ...ui } = normalizedUI
  void contentDirection

  return {
    ...ui,
    tabindex: ui.tabindex ?? 0,
    value: context.tab.value,
    forceMount: context.tab.forceMount,
    class: cn(
      'flex-1 outline-none rounded-md focus-visible:ring-3 focus-visible:ring-ring/50',
      ui.class,
    ),
    style: ui.style,
  }
}

function getIconProps(context: TabsItemContext): IconProps {
  return context.tab.icon!
}

function getTrailingIconProps(context: TabsItemContext): IconProps {
  return context.tab.trailingIcon!
}

function getSlotNames(context: TabsItemContext) {
  const key = getKey(context)
  return {
    trigger: `trigger-${key}` as `trigger-${string}`,
    leading: `leading-${key}` as `leading-${string}`,
    label: `label-${key}` as `label-${string}`,
    trailing: `trailing-${key}` as `trailing-${string}`,
    content: `content-${key}` as `content-${string}`,
  }
}

function getKey(context: TabsItemContext) {
  return context.tab.slot
}
</script>

<template>
  <TabsRoot v-model="value" v-bind="rootProps" data-test-tabs-root>
    <TabsList v-bind="listProps" data-test-tabs-list>
      <TabsTrigger
        v-for="itemContext in itemContexts"
        :key="getKey(itemContext)"
        v-bind="getTriggerProps(itemContext)"
        data-test-tabs-trigger
      >
        <slot :name="getSlotNames(itemContext).trigger" v-bind="itemContext">
          <slot name="trigger" v-bind="getTabsContext()">
            <slot :name="getSlotNames(itemContext).leading" v-bind="itemContext">
              <slot name="leading" v-bind="getTabsContext()">
                <Icon v-if="itemContext.tab.icon" v-bind="getIconProps(itemContext)" />
              </slot>
            </slot>

            <slot :name="getSlotNames(itemContext).label" v-bind="itemContext">
              <slot name="label" v-bind="getTabsContext()">
                <span v-if="itemContext.tab.label" v-bind="getLabelProps(itemContext)">
                  {{ itemContext.tab.label }}
                </span>
              </slot>
            </slot>

            <slot :name="getSlotNames(itemContext).trailing" v-bind="itemContext">
              <slot name="trailing" v-bind="getTabsContext()">
                <Icon
                  v-if="itemContext.tab.trailingIcon"
                  v-bind="getTrailingIconProps(itemContext)"
                />
              </slot>
            </slot>
          </slot>
        </slot>
      </TabsTrigger>
    </TabsList>

    <div v-bind="contentWrapperProps" data-test-tabs-content-wrapper>
      <TabsContent
        v-for="itemContext in itemContexts"
        :key="getKey(itemContext)"
        v-bind="getContentProps(itemContext)"
        data-test-tabs-content
      >
        <slot :name="getSlotNames(itemContext).content" v-bind="itemContext">
          <slot name="content" v-bind="getTabsContext()"> </slot>
        </slot>
      </TabsContent>
    </div>
  </TabsRoot>
</template>
