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
import type { ToolbarContext, ToolbarItemContext, ToolbarProps, ToolbarSlots } from '.'

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

const rootProps = computed(() => {
  const normalizedRootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, toolbarContext.value))
  const { dir: rootDirection, ...rootUI } = normalizedRootUI
  void rootDirection

  return {
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
  }
})

const itemContexts = computed<ToolbarItemContext[]>(() =>
  props.items.map((item, index) => ({
    ...toolbarContext.value,
    item,
    index,
    first: index === 0,
    last: index === props.items.length - 1,
  })),
)

function getItemProps(context: ToolbarItemContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.item, context))
  return {
    ...ui,
    class: cn(
      'flex shrink-0 items-center self-stretch data-[orientation=vertical]:w-full',
      ui.class,
    ),
    style: ui.style,
    'data-type': context.item.type,
    'data-orientation': props.orientation,
    'data-slot': 'toolbar-item',
  }
}

function getButtonProps(context: ToolbarItemContext) {
  return context.item.type === 'button' ? normalizeButtonProps(context.item.props) : undefined
}

function getLinkProps(
  context: ToolbarItemContext,
): NonNullable<ReturnType<typeof normalizeLinkProps>> {
  if (context.item.type !== 'link') {
    throw new TypeError('Toolbar item must be a link')
  }

  return normalizeLinkProps(context.item.props)!
}

function getToggleProps(context: ToolbarItemContext) {
  return context.item.type === 'toggle' ? normalizeToggleProps(context.item.props) : undefined
}

function getToggleGroupProps(context: ToolbarItemContext) {
  return context.item.type === 'toggleGroup'
    ? normalizeToggleGroupProps(context.item.props)
    : undefined
}

function getSeparatorProps(context: ToolbarItemContext) {
  return context.item.type === 'separator' ? normalizeSeparatorProps(context.item.props) : undefined
}

function getSlotNames(context: ToolbarItemContext) {
  return { item: `item-${getKey(context)}` as `item-${string}` }
}

function getKey(context: ToolbarItemContext) {
  return String(context.item.value)
}
</script>

<template>
  <ToolbarRoot v-bind="rootProps">
    <slot v-bind="toolbarContext">
      <Primitive
        v-for="itemContext in itemContexts"
        :key="getKey(itemContext)"
        as="div"
        v-bind="getItemProps(itemContext)"
      >
        <slot :name="getSlotNames(itemContext).item" v-bind="itemContext">
          <slot name="item" v-bind="itemContext">
            <Button
              v-if="itemContext.item.type === 'button'"
              v-bind="getButtonProps(itemContext)"
            />
            <Link v-else-if="itemContext.item.type === 'link'" v-bind="getLinkProps(itemContext)" />
            <Toggle
              v-else-if="itemContext.item.type === 'toggle'"
              v-bind="getToggleProps(itemContext)"
            />
            <ToggleGroup
              v-else-if="itemContext.item.type === 'toggleGroup'"
              v-bind="getToggleGroupProps(itemContext)"
            />
            <Separator
              v-else-if="itemContext.item.type === 'separator'"
              v-bind="getSeparatorProps(itemContext)"
            />
            <slot
              v-else-if="itemContext.item.type === 'custom'"
              name="custom"
              v-bind="itemContext"
            />
          </slot>
        </slot>
      </Primitive>
    </slot>
  </ToolbarRoot>
</template>
