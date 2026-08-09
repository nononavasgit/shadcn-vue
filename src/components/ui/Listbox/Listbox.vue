<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { ListboxContent, ListboxItem, ListboxItemIndicator, ListboxRoot } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { ListboxContext, ListboxItemContext, ListboxProps, ListboxSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ListboxProps>(), {
  orientation: 'vertical',
  selectionBehavior: 'toggle',
  highlightOnHover: true,
  items: () => [],
  ui: undefined,
})
defineSlots<ListboxSlots>()
const emit = defineEmits<{ valueChange: [value: ListboxProps['value']] }>()

const attrs = useAttrs()
const value = defineModel<ListboxProps['value']>('value')

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const listboxContext = computed<ListboxContext>(() => {
  const { ui, ...listboxProps } = props
  void ui

  return { props: listboxProps, value: value.value }
})

const rootProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.root, listboxContext.value))

  return {
    ...attrs,
    ...ui,
    as: props.as,
    asChild: props.asChild,
    by: props.by,
    dir: props.dir,
    disabled: props.disabled,
    highlightOnHover: props.highlightOnHover,
    multiple: props.multiple,
    name: props.name,
    orientation: props.orientation,
    required: props.required,
    selectionBehavior: props.selectionBehavior,
    class: cn(attrs.class, ui.class),
    style: [attrs.style, ui.style],
  }
})

const contentProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.content, listboxContext.value))

  return {
    ...ui,
    class: cn(
      'min-w-40 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
      ui.class,
    ),
    style: ui.style,
  }
})

const itemContexts = computed<ListboxItemContext[]>(() =>
  props.items.map((item, index) => ({
    ...listboxContext.value,
    item,
    index,
    selected: Array.isArray(value.value)
      ? value.value.some((selectedValue) => Object.is(selectedValue, item.value))
      : Object.is(value.value, item.value),
  })),
)

function getItemProps(context: ListboxItemContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.item, context))

  return {
    ...ui,
    value: context.item.value,
    disabled: context.item.disabled,
    class: cn(
      'relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      ui.class,
    ),
    style: ui.style,
  }
}

function getLabelProps(context: ListboxItemContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.label, context))
  return { ...ui, class: cn('flex-1', ui.class), style: ui.style }
}

function getIndicatorProps(context: ListboxItemContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.indicator, context))
  return { ...ui, class: cn('ml-auto flex size-4 items-center justify-center', ui.class) }
}

function getKey(context: ListboxItemContext) {
  return context.item.id ?? String(context.item.value)
}
</script>

<template>
  <ListboxRoot v-model="value" v-bind="rootProps" data-slot="listbox">
    <ListboxContent v-bind="contentProps" data-slot="listbox-content">
      <slot v-bind="listboxContext">
        <ListboxItem
          v-for="itemContext in itemContexts"
          :key="getKey(itemContext)"
          v-bind="getItemProps(itemContext)"
          data-slot="listbox-item"
        >
          <slot name="item" v-bind="itemContext">
            <span v-bind="getLabelProps(itemContext)">{{ itemContext.item.label }}</span>

            <ListboxItemIndicator
              v-bind="getIndicatorProps(itemContext)"
              data-slot="listbox-item-indicator"
            >
              <slot name="indicator" v-bind="itemContext">
                <Icon name="check" class="size-4" />
              </slot>
            </ListboxItemIndicator>
          </slot>
        </ListboxItem>
      </slot>
    </ListboxContent>
  </ListboxRoot>
</template>
