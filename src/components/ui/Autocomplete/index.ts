import type { HTMLAttributes } from 'vue'

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
  ui?: AutocompleteUI
}

export type AutocompleteValue = string | undefined
