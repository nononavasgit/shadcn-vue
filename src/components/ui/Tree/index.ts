import type { HTMLAttributes } from 'vue'
import type {
  TreeItemProps as RekaTreeItemProps,
  TreeRootProps as RekaTreeRootProps,
  TreeVirtualizerProps,
} from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Tree } from './Tree.vue'

export type TreeKey = string | number
export type TreeModelValue = TreeKey | TreeKey[] | undefined

export interface TreeItem extends Pick<RekaTreeItemProps<TreeItem>, 'disabled'> {
  value: TreeKey
  label: string
  icon?: IconConfig
  children?: TreeItem[]
}

export type TreeRootProps = Pick<
  RekaTreeRootProps<TreeItem, TreeItem>,
  'disabled' | 'multiple' | 'propagateSelect' | 'bubbleSelect' | 'selectionBehavior'
>

export type TreeVirtualizerConfig = Pick<
  TreeVirtualizerProps,
  'overscan' | 'estimateSize' | 'textContent'
>

export interface TreeProps extends TreeRootProps {
  value?: TreeModelValue
  expanded?: TreeKey[]
  items?: TreeItem[]
  checkbox?: boolean
  getKey?: (item: TreeItem) => TreeKey
  getChildren?: (item: TreeItem) => TreeItem[] | undefined
  virtual?: boolean
  virtualizer?: TreeVirtualizerConfig
  ui?: TreeUI
}

export type TreeFn<T> = () => T
export type TreeItemFn<T> = (context: TreeItemContext) => T

export interface TreeUI {
  root?: TreeFn<HTMLAttributes>
  item?: TreeItemFn<HTMLAttributes>
  content?: TreeItemFn<HTMLAttributes>
  chevron?: TreeItemFn<HTMLAttributes>
  leading?: TreeItemFn<HTMLAttributes>
  checkbox?: TreeItemFn<HTMLAttributes>
  label?: TreeItemFn<HTMLAttributes>
}

export interface TreeContext {
  value: TreeModelValue
  expanded: TreeKey[]
  items: TreeItem[]
  multiple: boolean
  disabled: boolean
}

export interface TreeItemContext extends TreeContext {
  item: TreeItem
  key: TreeKey
  index: number
  level: number
  parentItem?: TreeItem
  hasChildren: boolean
  expanded: boolean
  selected: boolean
  indeterminate: boolean | undefined
  disabled: boolean
  first: boolean
  last: boolean
  handleSelect: () => void
  handleToggle: () => void
}

export interface TreeEmits {
  'update:value': [value: TreeModelValue]
  'update:expanded': [value: TreeKey[]]
}

export interface TreeSlots {
  item?(props: TreeItemContext): unknown
  'item-leading'?(props: TreeItemContext): unknown
  chevron?(props: TreeItemContext): unknown
  checkbox?(props: TreeItemContext): unknown
  'item-label'?(props: TreeItemContext): unknown
}

export function normalizeTreeRootProps(source: TreeRootProps): TreeRootProps {
  const { disabled, multiple, propagateSelect, bubbleSelect, selectionBehavior } = source

  return { disabled, multiple, propagateSelect, bubbleSelect, selectionBehavior }
}
