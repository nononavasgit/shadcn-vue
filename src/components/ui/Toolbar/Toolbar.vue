<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ToolbarRoot } from 'reka-ui'
import { Button, normalizeButtonProps } from '@/components/ui/Button'
import { Link, normalizeLinkProps } from '@/components/ui/Link'
import { Separator, normalizeSeparatorProps } from '@/components/ui/Separator'
import { Toggle, normalizeToggleProps } from '@/components/ui/Toggle'
import { ToggleGroup, normalizeToggleGroupProps } from '@/components/ui/ToggleGroup'
import { useResolve } from '@/composables/useResolve'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { normalizeToolbarRootProps } from '.'
import type { ToolbarContext, ToolbarItem, ToolbarItemContext, ToolbarProps } from '.'

defineOptions({
  inheritAttrs: true,
})

const props = withDefaults(defineProps<ToolbarProps>(), {
  items: () => [],
  ui: undefined,
})
const attrs = useAttrs()

const toolbarContext = computed(() => {
  const context: ToolbarContext = {
    items: props.items,
  }

  return context
})

function normalizeToolbarItem(item: ToolbarItem) {
  if (item.button) {
    const button = normalizeButtonProps(item.button)
    if (button) return { button }
  }

  if (item.link) {
    const link = normalizeLinkProps(item.link)
    if (link) return { link }
  }
  if (item.separator) {
    const separator = normalizeSeparatorProps(item.separator)
    if (separator) return { separator }
  }
  if (item.toggle) {
    const toggle = normalizeToggleProps(item.toggle)
    if (toggle) return { toggle }
  }
  if (item.toggleGroup) {
    const toggleGroup = normalizeToggleGroupProps(item.toggleGroup)
    if (toggleGroup) return { toggleGroup }
  }

  return {}
}

const calculatedUI = computed(() => {
  const { dir, ...rootUI } = normalizeHTMLAttributes(
    useResolve(props.ui?.root, toolbarContext.value),
  )
  void dir

  const root = normalizeToolbarRootProps(props)

  return {
    root: {
      ...attrs,
      ...root,
      ...rootUI,
      class: cn(
        'flex p-[10px] w-full max-w-[610px] !min-w-max rounded-lg bg-white shadow-sm border',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
    items: props.items.map((item, index) => {
      const key = String(item.key ?? index)
      const context: ToolbarItemContext = {
        item,
        index,
        first: index === 0,
        last: index === props.items.length - 1,
      }

      return {
        key,
        data: item,
        index,
        slotNames: {
          item: `item-${key}`,
        } as const,
        context,
        ...normalizeToolbarItem(item),
      }
    }),
  }
})
</script>

<template>
  <ToolbarRoot v-bind="calculatedUI.root">
    <slot v-bind="toolbarContext">
      <template v-for="item in calculatedUI.items" :key="item.key">
        <slot :name="item.slotNames.item" v-bind="item.context">
          <slot name="item" v-bind="item.context">
            <Button v-if="item.button" v-bind="item.button" />
            <Link v-else-if="item.link" v-bind="item.link" />
            <Separator v-else-if="item.separator" v-bind="item.separator" />
            <Toggle v-else-if="item.toggle" v-bind="item.toggle" />
            <ToggleGroup v-else-if="item.toggleGroup" v-bind="item.toggleGroup" />
          </slot>
        </slot>
      </template>
    </slot>
  </ToolbarRoot>
</template>
