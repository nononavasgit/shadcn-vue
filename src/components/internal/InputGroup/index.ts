export { default as InputGroupAddon } from './InputGroupAddon.vue'

export type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'

export interface InputGroupAddonProps {
  align?: InputGroupAddonAlign
}

export interface InputGroupAddonSlots {
  default?(): unknown
}
