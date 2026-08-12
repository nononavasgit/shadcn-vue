import type { HTMLAttributes } from 'vue'
import type { SeparatorProps as RekaSeparatorProps } from 'reka-ui'

export { default as Separator } from './Separator.vue'

export type SeparatorRootProps = Pick<
  RekaSeparatorProps,
  'as' | 'asChild' | 'orientation' | 'decorative'
>

export type SeparatorFn<T> = (context: SeparatorContext) => T

export interface SeparatorUI {
  root?: SeparatorFn<HTMLAttributes>
}

export interface SeparatorProps extends SeparatorRootProps {
  ui?: SeparatorUI
}

export interface SeparatorContext {
  orientation: SeparatorProps['orientation']
  decorative: SeparatorProps['decorative']
}

export function createSeparatorContext(props: SeparatorProps): SeparatorContext {
  const { orientation, decorative } = props

  return {
    orientation,
    decorative,
  }
}

export interface SeparatorSlots {
  default?(props: SeparatorContext): unknown
}
