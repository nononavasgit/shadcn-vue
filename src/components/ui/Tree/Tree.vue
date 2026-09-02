<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { TreeRoot, TreeVirtualizer, type FlattenedItem } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { treeDefaults } from './defaults'
import TreeItemRenderer from './TreeItem.vue'
import type {
  TreeContext,
  TreeEmits,
  TreeItem,
  TreeItemContext,
  TreeKey,
  TreeModelValue,
  TreeProps,
  TreeSlots,
} from '.'
import { normalizeTreeRootProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TreeProps>(), treeDefaults)
defineSlots<TreeSlots>()
defineEmits<TreeEmits>()

const attrs = useAttrs()
const slots = useSlots()
const valueModel = defineModel<TreeModelValue>('value')
const expandedModel = defineModel<TreeKey[]>('expanded')

const getNodeKey = (item: TreeItem): TreeKey => props.getKey?.(item) ?? item.value
const getNodeChildren = (item: TreeItem): TreeItem[] | undefined =>
  props.getChildren ? props.getChildren(item) : item.children

const nodeMap = computed(() => {
  const map = new Map<string, TreeItem>()

  function visit(items: TreeItem[]) {
    for (const item of items) {
      map.set(String(getNodeKey(item)), item)
      const children = getNodeChildren(item)
      if (children) visit(children)
    }
  }

  visit(props.items)
  return map
})

const publicValue = computed<TreeModelValue>(() => valueModel.value)

const publicExpanded = computed<TreeKey[]>(() => expandedModel.value ?? [])

function getPublicKeyFromString(key: string): TreeKey {
  const item = nodeMap.value.get(key)
  return item ? getNodeKey(item) : key
}

const selectedItems = computed<TreeItem | TreeItem[] | undefined>({
  get: () => {
    if (props.multiple) {
      const values = Array.isArray(publicValue.value) ? publicValue.value : []
      return values
        .map((value) => nodeMap.value.get(String(value)))
        .filter((item): item is TreeItem => Boolean(item))
    }

    if (Array.isArray(publicValue.value) || publicValue.value === undefined) return undefined
    return nodeMap.value.get(String(publicValue.value))
  },
  set: (nextValue) => {
    const items = Array.isArray(nextValue) ? nextValue : nextValue ? [nextValue] : []
    const values = items.map((item) => getNodeKey(item))
    valueModel.value = props.multiple ? values : values[0]
  },
})

const rekaExpanded = computed<string[]>({
  get: () => publicExpanded.value.map((key) => String(key)),
  set: (keys) => {
    expandedModel.value = keys.map(getPublicKeyFromString)
  },
})

const treeContext = computed<TreeContext>(() => ({
  value: publicValue.value,
  expanded: publicExpanded.value,
  items: props.items,
  multiple: Boolean(props.multiple),
  disabled: Boolean(props.disabled),
}))

const rootProps = computed(() => {
  const ui = useUi(props.ui?.root, treeContext.value)

  return {
    ...attrs,
    ...ui,
    ...normalizeTreeRootProps(props),
    'data-slot': 'tree',
    'data-test-tree-root': '',
    class: cn('block w-full', attrs.class, ui.class),
    style: [attrs.style, ui.style],
  }
})

function getSelectedKeys() {
  if (Array.isArray(publicValue.value)) return new Set(publicValue.value.map(String))
  return publicValue.value === undefined ? new Set<string>() : new Set([String(publicValue.value)])
}

function getDescendantKeys(item: TreeItem): string[] {
  const children = getNodeChildren(item) ?? []
  return children.flatMap((child) => [String(getNodeKey(child)), ...getDescendantKeys(child)])
}

function getIndeterminate(item: TreeItem, selectedKeys: Set<string>): boolean | undefined {
  const descendants = getDescendantKeys(item)
  if (!descendants.length || (!props.bubbleSelect && !props.propagateSelect)) return undefined

  const selectedCount = descendants.filter((key) => selectedKeys.has(key)).length
  if (!selectedCount || selectedCount === descendants.length) return false

  return true
}

function selectItem(item: TreeItem) {
  if (props.disabled || item.disabled) return

  const key = getNodeKey(item)
  if (props.multiple) {
    const values = Array.isArray(publicValue.value) ? [...publicValue.value] : []
    const index = values.findIndex((value) => String(value) === String(key))
    if (index === -1) values.push(key)
    else values.splice(index, 1)
    valueModel.value = values
  } else {
    valueModel.value = key
  }
}

function toggleItem(item: TreeItem) {
  if (props.disabled || item.disabled || !getNodeChildren(item)) return

  const key = getNodeKey(item)
  const keys = [...publicExpanded.value]
  const index = keys.findIndex((value) => String(value) === String(key))
  if (index === -1) keys.push(key)
  else keys.splice(index, 1)
  expandedModel.value = keys
}

function getItemContext(
  flattenedItem: FlattenedItem<TreeItem>,
  index: number,
  total: number,
): TreeItemContext {
  const key = getNodeKey(flattenedItem.value)
  const selectedKeys = getSelectedKeys()
  const expanded = publicExpanded.value.some((value) => String(value) === String(key))

  return {
    ...treeContext.value,
    item: flattenedItem.value,
    key,
    index,
    level: flattenedItem.level,
    parentItem: flattenedItem.parentItem,
    hasChildren: flattenedItem.hasChildren,
    expanded,
    selected: selectedKeys.has(String(key)),
    indeterminate: getIndeterminate(flattenedItem.value, selectedKeys),
    disabled: Boolean(props.disabled || flattenedItem.value.disabled),
    first: index === 0,
    last: index === total - 1,
    handleSelect: () => selectItem(flattenedItem.value),
    handleToggle: () => toggleItem(flattenedItem.value),
  }
}

function renderItems(items: FlattenedItem<TreeItem>[]) {
  return items.map((item, index) => ({ item, context: getItemContext(item, index, items.length) }))
}
</script>

<template>
  <TreeRoot
    v-model:model-value="selectedItems"
    v-model:expanded="rekaExpanded"
    v-bind="rootProps"
    :items="props.items"
    :get-key="(item) => String(getNodeKey(item))"
    :get-children="getNodeChildren"
    data-test-tree-reka-root
  >
    <template #default="{ flattenItems }">
      <TreeVirtualizer v-if="props.virtual" v-bind="props.virtualizer">
        <template #default="{ item, virtualItem }">
          <TreeItemRenderer
            :flattened-item="item"
            :context="getItemContext(item, virtualItem.index, flattenItems.length)"
            :checkbox="props.checkbox"
            :ui="props.ui"
          >
            <template v-for="(_, name) in $slots" #[name]="slotProps">
              <slot :name="name" v-bind="slotProps" />
            </template>
          </TreeItemRenderer>
        </template>
      </TreeVirtualizer>

      <template v-else>
        <TreeItemRenderer
          v-for="({ item, context }, index) in renderItems(flattenItems)"
          :key="item._id"
          :flattened-item="item"
          :context="{ ...context, index }"
          :checkbox="props.checkbox"
          :ui="props.ui"
        >
          <template v-for="(_, name) in $slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps" />
          </template>
        </TreeItemRenderer>
      </template>
    </template>
  </TreeRoot>
</template>
