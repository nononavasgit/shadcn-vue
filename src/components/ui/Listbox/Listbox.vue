<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import {
  ListboxContent,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
  ListboxItemIndicator,
  ListboxRoot,
} from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type {
  ListboxContext,
  ListboxGroupContext,
  ListboxItemContext,
  ListboxProps,
  ListboxSlots,
} from '.'
import type { IconProps } from '@/components/ui/Icon'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ListboxProps>(), {
  orientation: 'vertical',
  selectionBehavior: 'toggle',
  highlightOnHover: true,
  items: () => [],
  groups: () => [],
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
    ...attrs,
    ...ui,
    class: cn(
      'min-w-40 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
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

const groupContexts = computed<ListboxGroupContext[]>(() =>
  props.groups.map((group, index) => ({
    ...listboxContext.value,
    group,
    index,
  })),
)

function getGroupItemContexts(context: ListboxGroupContext): ListboxItemContext[] {
  return context.group.items.map((item, index) => ({
    ...listboxContext.value,
    item,
    index,
    group: context.group,
    groupIndex: context.index,
    selected: Array.isArray(value.value)
      ? value.value.some((selectedValue) => Object.is(selectedValue, item.value))
      : Object.is(value.value, item.value),
  }))
}

function getGroupProps(context: ListboxGroupContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.group, context))
  return {
    ...ui,
    class: cn('py-1 first:pt-0 last:pb-0 [&:not(:first-child)]:border-t', ui.class),
    style: ui.style,
  }
}

function getGroupLabelProps(context: ListboxGroupContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.groupLabel, context))
  return {
    ...ui,
    class: cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', ui.class),
    style: ui.style,
  }
}

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

function getIconProps(context: ListboxItemContext): IconProps {
  return normalizeIconProps(context.item.icon)!
}

function getSlotNames(context: ListboxItemContext) {
  const key = getKey(context)

  return {
    item: `item-${key}` as `item-${string}`,
    leading: `item-leading-${key}` as `item-leading-${string}`,
  }
}

function getGroupSlotNames(context: ListboxGroupContext) {
  return {
    group: `group-${context.group.id}` as `group-${string}`,
    label: `group-label-${context.group.id}` as `group-label-${string}`,
  }
}

function getKey(context: ListboxItemContext) {
  return context.item.id ?? String(context.item.value)
}
</script>

<template>
  <ListboxRoot v-model="value" v-bind="rootProps" data-slot="listbox">
    <ListboxContent v-bind="contentProps" data-slot="listbox-content">
      <slot v-bind="listboxContext">
        <template v-if="groupContexts.length">
          <ListboxGroup
            v-for="groupContext in groupContexts"
            :key="groupContext.group.id"
            v-bind="getGroupProps(groupContext)"
            data-slot="listbox-group"
          >
            <slot :name="getGroupSlotNames(groupContext).group" v-bind="groupContext">
              <slot name="group" v-bind="groupContext">
                <ListboxGroupLabel
                  v-if="groupContext.group.label"
                  v-bind="getGroupLabelProps(groupContext)"
                  data-slot="listbox-group-label"
                >
                  <slot :name="getGroupSlotNames(groupContext).label" v-bind="groupContext">
                    <slot name="group-label" v-bind="groupContext">
                      {{ groupContext.group.label }}
                    </slot>
                  </slot>
                </ListboxGroupLabel>

                <ListboxItem
                  v-for="itemContext in getGroupItemContexts(groupContext)"
                  :key="getKey(itemContext)"
                  v-bind="getItemProps(itemContext)"
                  data-slot="listbox-item"
                >
                  <slot :name="getSlotNames(itemContext).item" v-bind="itemContext">
                    <slot name="item" v-bind="itemContext">
                      <slot :name="getSlotNames(itemContext).leading" v-bind="itemContext">
                        <slot name="item-leading" v-bind="itemContext">
                          <Icon
                            v-if="itemContext.item.icon"
                            v-bind="getIconProps(itemContext)"
                            data-slot="listbox-item-icon"
                          />
                        </slot>
                      </slot>

                      <span v-bind="getLabelProps(itemContext)">
                        {{ itemContext.item.label }}
                      </span>

                      <ListboxItemIndicator
                        v-bind="getIndicatorProps(itemContext)"
                        data-slot="listbox-item-indicator"
                      >
                        <slot name="indicator" v-bind="itemContext">
                          <Icon name="check" class="size-4" />
                        </slot>
                      </ListboxItemIndicator>
                    </slot>
                  </slot>
                </ListboxItem>
              </slot>
            </slot>
          </ListboxGroup>
        </template>

        <template v-else>
          <ListboxItem
            v-for="itemContext in itemContexts"
            :key="getKey(itemContext)"
            v-bind="getItemProps(itemContext)"
            data-slot="listbox-item"
          >
            <slot :name="getSlotNames(itemContext).item" v-bind="itemContext">
              <slot name="item" v-bind="itemContext">
                <slot :name="getSlotNames(itemContext).leading" v-bind="itemContext">
                  <slot name="item-leading" v-bind="itemContext">
                    <Icon
                      v-if="itemContext.item.icon"
                      v-bind="getIconProps(itemContext)"
                      data-slot="listbox-item-icon"
                    />
                  </slot>
                </slot>

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
            </slot>
          </ListboxItem>
        </template>
      </slot>
    </ListboxContent>
  </ListboxRoot>
</template>
