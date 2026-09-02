<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { TreeItem as RekaTreeItem, type FlattenedItem } from 'reka-ui'
import { Checkbox } from '@/components/ui/Checkbox'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { useUi } from '@/composables/useUi'
import type { TreeItem, TreeItemContext, TreeSlots, TreeUI } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  flattenedItem: FlattenedItem<TreeItem>
  context: TreeItemContext
  checkbox?: boolean
  ui?: TreeUI
}>()

defineSlots<TreeSlots>()

const slots = useSlots()

const slotNames = computed(() => {
  const slot = String(props.context.item.slot ?? props.context.key)

  return {
    item: `item-${slot}` as `item-${string}`,
    leading: `leading-${slot}` as `leading-${string}`,
    chevron: `chevron-${slot}` as `chevron-${string}`,
    checkbox: `checkbox-${slot}` as `checkbox-${string}`,
    label: `label-${slot}` as `label-${string}`,
  }
})

function hasSlot(name: keyof TreeSlots, dynamicName: string) {
  return Boolean(slots[name] || slots[dynamicName])
}

const itemProps = computed(() => {
  const ui = useUi(props.ui?.item, props.context)

  return {
    ...ui,
    ...props.flattenedItem.bind,
    disabled: props.context.disabled,
    'data-slot': 'tree-item',
    'data-test-tree-item': props.context.key,
    class: cn(
      'group relative block w-full cursor-default rounded-md border border-transparent text-left outline-none transition-colors focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 hover:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[selected]:bg-accent data-[selected]:text-accent-foreground',
      ui.class,
    ),
    style: ui.style,
  }
})

function getContentProps(context: TreeItemContext) {
  const ui = useUi(props.ui?.content, context)

  return {
    ...ui,
    'data-slot': 'tree-content',
    'data-test-tree-content': context.key,
    class: cn('flex min-w-0 items-center gap-2 px-2 py-1.5 text-sm', ui.class),
    style: [
      {
        paddingInlineStart: `${Math.max(context.level - 1, 0) * 1.25 + 0.5}rem`,
      },
      ui.style,
    ],
  }
}

function getChevronProps(context: TreeItemContext) {
  const ui = useUi(props.ui?.chevron, context)

  return {
    ...ui,
    type: 'button' as const,
    tabindex: -1,
    'aria-label': context.expanded ? 'Contraer' : 'Expandir',
    'data-slot': 'tree-chevron',
    'data-test-tree-chevron': context.key,
    class: cn(
      'grid size-5 shrink-0 place-items-center rounded-sm text-muted-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50',
      ui.class,
    ),
    style: ui.style,
  }
}

function getLeadingProps(context: TreeItemContext) {
  const ui = useUi(props.ui?.leading, context)

  return {
    ...ui,
    'data-slot': 'tree-leading',
    'data-test-tree-leading': context.key,
    class: cn('shrink-0 text-muted-foreground', ui.class),
    style: ui.style,
  }
}

function getCheckboxProps(context: TreeItemContext) {
  const ui = useUi(props.ui?.checkbox, context)

  return {
    ...ui,
    'data-slot': 'tree-checkbox',
    'data-test-tree-checkbox': context.key,
    class: cn('shrink-0', ui.class),
    style: ui.style,
  }
}

function getLabelProps(context: TreeItemContext) {
  const ui = useUi(props.ui?.label, context)

  return {
    ...ui,
    'data-slot': 'tree-label',
    'data-test-tree-label': context.key,
    class: cn('min-w-0 flex-1 truncate group-data-[selected]:text-primary', ui.class),
    style: ui.style,
  }
}

function getContext(state: {
  isExpanded: boolean
  isSelected: boolean
  isIndeterminate: boolean | undefined
  isDisabled: boolean
  handleToggle: () => void
  handleSelect: () => void
}): TreeItemContext {
  return {
    ...props.context,
    expanded: state.isExpanded,
    selected: state.isSelected,
    indeterminate: state.isIndeterminate,
    disabled: state.isDisabled,
    handleToggle: state.handleToggle,
    handleSelect: state.handleSelect,
  }
}

function handleSelect(event: Event) {
  if (props.checkbox || hasSlot('checkbox', slotNames.value.checkbox)) event.preventDefault()
}
</script>

<template>
  <RekaTreeItem v-bind="itemProps" @select="handleSelect">
    <template #default="state">
      <div v-if="hasSlot('item', slotNames.item)" v-bind="getContentProps(getContext(state))">
        <slot :name="slotNames.item" v-bind="getContext(state)">
          <slot name="item" v-bind="getContext(state)" />
        </slot>
      </div>

      <template v-else>
        <div v-bind="getContentProps(getContext(state))">
          <slot :name="slotNames.chevron" v-bind="getContext(state)">
            <slot name="chevron" v-bind="getContext(state)">
              <button
                v-if="state.isExpanded || props.flattenedItem.hasChildren"
                v-bind="getChevronProps(getContext(state))"
                @click.stop.prevent="state.handleToggle"
              >
                <Icon
                  :name="state.isExpanded ? 'chevronDown' : 'chevronRight'"
                  class="size-4"
                  aria-hidden="true"
                />
              </button>
              <span v-else class="size-5 shrink-0" aria-hidden="true" />
            </slot>
          </slot>

          <span
            v-if="props.checkbox || hasSlot('checkbox', slotNames.checkbox)"
            v-bind="getCheckboxProps(getContext(state))"
          >
            <slot :name="slotNames.checkbox" v-bind="getContext(state)">
              <slot name="checkbox" v-bind="getContext(state)">
                <Checkbox
                  v-bind="getCheckboxProps(getContext(state))"
                  :value="state.isIndeterminate ? 'indeterminate' : state.isSelected"
                  aria-label="Seleccionar nodo"
                  tabindex="-1"
                  @click.stop="state.handleSelect"
                >
                  <template #indicator="{ state: checkboxState }">
                    <Icon
                      :name="checkboxState === 'indeterminate' ? 'minus' : 'check'"
                      class="size-3.5"
                    />
                  </template>
                </Checkbox>
              </slot>
            </slot>
          </span>

          <slot :name="slotNames.leading" v-bind="getContext(state)">
            <slot name="leading" v-bind="getContext(state)">
              <span v-bind="getLeadingProps(getContext(state))">
                <Icon
                  v-if="props.flattenedItem.value.icon"
                  v-bind="props.flattenedItem.value.icon"
                  class="size-4"
                  aria-hidden="true"
                />
                <Icon
                  v-else
                  :name="
                    state.isExpanded
                      ? 'folderOpen'
                      : props.flattenedItem.hasChildren
                        ? 'folder'
                        : 'file'
                  "
                  class="size-4"
                  aria-hidden="true"
                />
              </span>
            </slot>
          </slot>

          <span v-bind="getLabelProps(getContext(state))">
            <slot :name="slotNames.label" v-bind="getContext(state)">
              <slot name="label" v-bind="getContext(state)">
                {{ props.flattenedItem.value.label }}
              </slot>
            </slot>
          </span>
        </div>
      </template>
    </template>
  </RekaTreeItem>
</template>
