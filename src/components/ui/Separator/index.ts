import type { SeparatorProps as RekaSeparatorProps } from 'reka-ui'

export { default as Separator } from './Separator.vue'

export type SeparatorRootProps = Pick<RekaSeparatorProps, 'orientation' | 'decorative'>

export interface SeparatorProps extends SeparatorRootProps {}

export interface SeparatorSlots {
  default?(): unknown
}
