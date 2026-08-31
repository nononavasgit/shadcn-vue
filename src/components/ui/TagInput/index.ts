import type {
  AcceptableInputValue,
  TagsInputInputProps as RekaTagsInputInputProps,
  TagsInputRootEmits,
  TagsInputRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as TagInput } from './TagInput.vue'
export { tagInputDefaults } from './defaults'

export type TagInputValue = AcceptableInputValue

export type TagInputRootProps<T extends TagInputValue = TagInputValue> = Pick<
  TagsInputRootProps<T>,
  | 'addOnPaste'
  | 'addOnTab'
  | 'addOnBlur'
  | 'duplicate'
  | 'disabled'
  | 'delimiter'
  | 'dir'
  | 'max'
  | 'convertValue'
  | 'displayValue'
  | 'id'
  | 'name'
  | 'required'
>

export type TagInputInputProps = Pick<
  RekaTagsInputInputProps,
  'autoFocus' | 'maxLength' | 'placeholder'
>

export interface TagInputProps<T extends TagInputValue = TagInputValue>
  extends TagInputRootProps<T>, TagInputInputProps {
  value?: T[] | null
  clearable?: boolean
  ui?: TagInputUI<T>
}

export type TagInputEmits<T extends TagInputValue = TagInputValue> = TagsInputRootEmits<T> & {
  'update:value': [value: T[]]
}

export interface TagInputTagContext<T extends TagInputValue = TagInputValue> {
  value: T
  index: number
}

export type TagInputFn<T, C = undefined> = (context: C) => T

export interface TagInputUI<T extends TagInputValue = TagInputValue> {
  root?: () => HTMLAttributes
  tagItem?: TagInputFn<HTMLAttributes, TagInputTagContext<T>>
  tagItemText?: TagInputFn<HTMLAttributes, TagInputTagContext<T>>
  tagItemDelete?: TagInputFn<HTMLAttributes, TagInputTagContext<T>>
  tagInput?: () => HTMLAttributes
  tagClear?: () => HTMLAttributes
}

export interface TagInputSlots<T extends TagInputValue = TagInputValue> {
  tag?(props: TagInputTagContext<T>): unknown
  clear?(): unknown
}
