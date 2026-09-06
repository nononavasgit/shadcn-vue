import type { HTMLAttributes } from 'vue'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Autocomplete } from './Autocomplete.vue'
export { autocompleteDefaults } from './defaults'

export type AutocompleteFn<T> = () => T

export interface AutocompleteUI {
  root?: AutocompleteFn<HTMLAttributes>
  anchor?: AutocompleteFn<HTMLAttributes>
  input?: AutocompleteFn<HTMLAttributes>
  trigger?: AutocompleteFn<HTMLAttributes>
  content?: AutocompleteFn<HTMLAttributes>
  viewport?: AutocompleteFn<HTMLAttributes>
  empty?: AutocompleteFn<HTMLAttributes>
  separator?: AutocompleteFn<HTMLAttributes>
  item?: AutocompleteFn<HTMLAttributes>
  group?: AutocompleteFn<HTMLAttributes>
  label?: AutocompleteFn<HTMLAttributes>
}

export interface AutocompleteProps {
  value?: AutocompleteValue
  autoFocus?: boolean
  placeholder?: string
  disabled?: boolean
  icon?: IconConfig
  ui?: AutocompleteUI
}

export interface AutocompleteSlots {
  icon?(): unknown
}

export type AutocompleteValue = string | undefined
