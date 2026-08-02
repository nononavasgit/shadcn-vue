<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import {
  normalizeTabsContentProps,
  normalizeTabsListProps,
  normalizeTabsTriggerProps,
  tabsVariants,
} from '.'
import type { TabsProps, TabsSlots, TabsUIContext, TabsUIValue, TabsValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TabsProps>(), {
  orientation: 'horizontal',
  activationMode: 'automatic',
  unmountOnHide: true,
  loop: true,
  variant: 'default',
  as: 'div',
  asChild: false,
  tabs: () => [],
  ui: undefined,
})
defineSlots<TabsSlots>()

const attrs = useAttrs()
const model = defineModel<TabsValue>()

function resolveUI<T>(value: TabsUIValue<T> | undefined, context: TabsUIContext) {
  return typeof value === 'function' ? (value as (context: TabsUIContext) => T)(context) : value
}

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const listUI = normalizeHTMLAttributes(props.ui?.list)
  const contentWrapperUI = normalizeHTMLAttributes(props.ui?.contentWrapper)
  const list = normalizeTabsListProps(props.list)

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      defaultValue: props.defaultValue,
      orientation: props.orientation,
      dir: props.dir,
      activationMode: props.activationMode,
      unmountOnHide: props.unmountOnHide,
      'data-variant': props.variant,
      class: cn(
        'flex flex-col gap-2',
        tabsVariants.root({ orientation: props.orientation }),
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
    list: {
      ...listUI,
      ...list,
      loop: props.loop,
      'data-variant': props.variant,
      class: cn(
        'inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground aria-[orientation=vertical]:h-fit aria-[orientation=vertical]:flex-col',
        tabsVariants.list({
          variant: props.variant,
          orientation: props.orientation,
        }),
        listUI.class,
      ),
      style: listUI.style,
    },
    contentWrapper: {
      ...contentWrapperUI,
      class: cn('min-w-0 flex-1', contentWrapperUI.class),
      style: contentWrapperUI.style,
    },
    tabs: props.tabs.map((tab, index) => {
      const context: TabsUIContext = {
        tab,
        index,
        active: Object.is(model.value, tab.value),
        first: index === 0,
        last: index === props.tabs.length - 1,
      }
      const triggerUI = normalizeHTMLAttributes(resolveUI(props.ui?.trigger, context))
      const iconUI = normalizeHTMLAttributes(resolveUI(props.ui?.icon, context))
      const labelUI = normalizeHTMLAttributes(resolveUI(props.ui?.label, context))
      const trailingIconUI = normalizeHTMLAttributes(resolveUI(props.ui?.trailingIcon, context))
      const normalizedContentUI = normalizeHTMLAttributes(resolveUI(props.ui?.content, context))
      const { dir: contentDirection, ...contentUI } = normalizedContentUI

      const trigger = normalizeTabsTriggerProps(tab.trigger)
      const content = normalizeTabsContentProps(tab.contentProps)
      const icon = normalizeIconProps(tab.icon)
      const trailingIcon = normalizeIconProps(tab.trailingIcon)
      const key = String(tab.id)

      void contentDirection

      return {
        key,
        data: tab,
        context,
        slots: {
          trigger: `trigger-${key}` as `trigger-${string}`,
          leading: `leading-${key}` as `leading-${string}`,
          label: `label-${key}` as `label-${string}`,
          trailing: `trailing-${key}` as `trailing-${string}`,
          content: `content-${key}` as `content-${string}`,
        },
        trigger: {
          ...triggerUI,
          ...trigger,
          value: tab.value,
          disabled: tab.disabled,
          class: cn(
            'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:shadow-sm dark:text-muted-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
            tabsVariants.trigger({
              variant: props.variant,
              orientation: props.orientation,
            }),
            triggerUI.class,
          ),
          'data-variant': props.variant,
          style: triggerUI.style,
        },
        icon: {
          ...iconUI,
          ...icon,
          class: cn(iconUI.class),
          style: [iconUI.style],
        },
        label: {
          ...labelUI,
          class: cn(labelUI.class),
          style: labelUI.style,
        },
        trailingIcon: {
          ...trailingIconUI,
          ...trailingIcon,
          class: cn(trailingIconUI.class),
          style: [trailingIconUI.style],
        },
        content: {
          ...contentUI,
          ...content,
          value: tab.value,
          forceMount: tab.forceMount,
          class: cn(
            'flex-1 outline-none rounded-md focus-visible:ring-3 focus-visible:ring-ring/50',
            contentUI.class,
          ),
          style: contentUI.style,
        },
        'data-variant': props.variant,
      }
    }),
  }
})
</script>

<template>
  <TabsRoot v-model="model" v-bind="calculatedUI.root" data-slot="tabs">
    <TabsList v-bind="calculatedUI.list" data-slot="tabs-list">
      <TabsTrigger
        v-for="tab in calculatedUI.tabs"
        :key="tab.key"
        v-bind="tab.trigger"
        data-slot="tabs-trigger"
      >
        <slot :name="tab.slots.trigger" v-bind="tab.context">
          <slot name="trigger" v-bind="tab.context">
            <slot :name="tab.slots.leading" v-bind="tab.context">
              <slot name="leading" v-bind="tab.context">
                <Icon v-if="tab.icon.name" v-bind="tab.icon" :name="tab.icon.name" />
              </slot>
            </slot>

            <slot :name="tab.slots.label" v-bind="tab.context">
              <slot name="label" v-bind="tab.context">
                <span v-if="tab.data.label" v-bind="tab.label">
                  {{ tab.data.label }}
                </span>
              </slot>
            </slot>

            <slot :name="tab.slots.trailing" v-bind="tab.context">
              <slot name="trailing" v-bind="tab.context">
                <Icon
                  v-if="tab.trailingIcon.name"
                  v-bind="tab.trailingIcon"
                  :name="tab.trailingIcon.name"
                />
              </slot>
            </slot>
          </slot>
        </slot>
      </TabsTrigger>
    </TabsList>

    <div v-bind="calculatedUI.contentWrapper" data-slot="tabs-content-wrapper">
      <TabsContent
        v-for="tab in calculatedUI.tabs"
        :key="tab.key"
        v-bind="tab.content"
        data-slot="tabs-content"
      >
        <slot :name="tab.slots.content" v-bind="tab.context">
          <slot name="content" v-bind="tab.context">
            {{ tab.data.content }}
          </slot>
        </slot>
      </TabsContent>
    </div>
  </TabsRoot>
</template>
