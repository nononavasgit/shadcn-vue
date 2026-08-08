<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Primitive, ToolbarRoot } from 'reka-ui'
import { Button, normalizeButtonProps } from '@/components/ui/Button'
import { Link, normalizeLinkProps } from '@/components/ui/Link'
import { Separator, normalizeSeparatorProps } from '@/components/ui/Separator'
import { Toggle, normalizeToggleProps } from '@/components/ui/Toggle'
import { ToggleGroup, normalizeToggleGroupProps } from '@/components/ui/ToggleGroup'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { ToolbarContext, ToolbarItem, ToolbarItemContext, ToolbarProps, ToolbarSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToolbarProps>(), {
  as: 'div',
  asChild: false,
  orientation: 'horizontal',
  loop: true,
  items: () => [],
  ui: undefined,
})
defineSlots<ToolbarSlots>()

const attrs = useAttrs()

const toolbarContext = computed<ToolbarContext>(() => {
  const { ui, ...toolbarProps } = props
  void ui

  return {
    props: toolbarProps,
  }
})

function normalizeItemProps(item: ToolbarItem) {
  switch (item.type) {
    case 'button':
      return { button: normalizeButtonProps(item.props) ?? {} }
    case 'link':
      return { link: normalizeLinkProps(item.props) }
    case 'toggle':
      return { toggle: normalizeToggleProps(item.props) ?? {} }
    case 'toggleGroup':
      return { toggleGroup: normalizeToggleGroupProps(item.props) ?? {} }
    case 'separator':
      return { separator: normalizeSeparatorProps(item.props) ?? {} }
    case 'custom':
      return { custom: item.props ?? {} }
  }
}

const calculatedUI = computed(() => {
  const normalizedRootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, toolbarContext.value))
  const { dir: rootDirection, ...rootUI } = normalizedRootUI
  void rootDirection

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      dir: props.dir,
      orientation: props.orientation,
      loop: props.loop,
      'data-orientation': props.orientation,
      'data-slot': 'toolbar',
      class: cn(
        'inline-flex w-fit items-center gap-1 rounded-lg border bg-background p-1 shadow-sm data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
    items: props.items.map((item, index) => {
      const context: ToolbarItemContext = {
        ...toolbarContext.value,
        item,
        index,
        first: index === 0,
        last: index === props.items.length - 1,
      }
      const itemUI = normalizeHTMLAttributes(useResolve(props.ui?.item, context))
      const key = String(item.value)

      return {
        key,
        data: item,
        context,
        slots: {
          item: `item-${key}` as `item-${string}`,
        },
        item: {
          ...itemUI,
          class: cn(
            'flex shrink-0 items-center self-stretch data-[orientation=vertical]:w-full',
            itemUI.class,
          ),
          style: itemUI.style,
          'data-type': item.type,
          'data-orientation': props.orientation,
          'data-slot': 'toolbar-item',
        },
        ...normalizeItemProps(item),
      }
    }),
  }
})
</script>

<template>
  <ToolbarRoot v-bind="calculatedUI.root">
    <slot v-bind="toolbarContext">
      <Primitive v-for="item in calculatedUI.items" :key="item.key" as="div" v-bind="item.item">
        <slot :name="item.slots.item" v-bind="item.context">
          <slot name="item" v-bind="item.context">
            <Button v-if="item.button" v-bind="item.button" />
            <Link v-else-if="item.link" v-bind="item.link" />
            <Toggle v-else-if="item.toggle" v-bind="item.toggle" />
            <ToggleGroup v-else-if="item.toggleGroup" v-bind="item.toggleGroup" />
            <Separator v-else-if="item.separator" v-bind="item.separator" />
            <slot v-else-if="item.custom" name="custom" v-bind="item.context" />
          </slot>
        </slot>
      </Primitive>
    </slot>
  </ToolbarRoot>
</template>
