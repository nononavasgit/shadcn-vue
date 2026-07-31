<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Tabs as TabsBase, TabsContent, TabsList, TabsTrigger } from '@/components/primitives/Tabs'
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
      class: cn(tabsVariants.root({ orientation: props.orientation }), attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    list: {
      ...listUI,
      ...list,
      loop: props.loop,
      'data-variant': props.variant,
      class: cn(
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
          disabled: trigger?.disabled ?? tab.disabled,
          class: cn(
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
          forceMount: content?.forceMount ?? tab.forceMount,
          class: cn('rounded-md focus-visible:ring-3 focus-visible:ring-ring/50', contentUI.class),
          style: contentUI.style,
        },
        'data-variant': props.variant,
      }
    }),
  }
})
</script>

<template>
  <TabsBase v-model="model" v-bind="calculatedUI.root">
    <TabsList v-bind="calculatedUI.list">
      <TabsTrigger v-for="tab in calculatedUI.tabs" :key="tab.key" v-bind="tab.trigger">
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
      <TabsContent v-for="tab in calculatedUI.tabs" :key="tab.key" v-bind="tab.content">
        <slot :name="tab.slots.content" v-bind="tab.context">
          <slot name="content" v-bind="tab.context">
            {{ tab.data.content }}
          </slot>
        </slot>
      </TabsContent>
    </div>
  </TabsBase>
</template>
