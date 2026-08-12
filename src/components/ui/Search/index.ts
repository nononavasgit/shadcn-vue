import type { HTMLAttributes } from 'vue'

export { default as Search } from './Search.vue'

export type SearchFn<T> = (context: SearchContext) => T

export interface SearchUI {
  root?: SearchFn<HTMLAttributes>
}

export interface SearchProps {
  ui?: SearchUI
}

export interface SearchContext {
  props: Omit<SearchProps, 'ui'>
}

export interface SearchSlots {
  default?(props: SearchContext): unknown
}
