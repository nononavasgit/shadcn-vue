import type { HTMLAttributes } from 'vue'
import type { SeparatorProps as RekaSeparatorProps } from 'reka-ui'

export { default as Separator } from './Separator.vue'

// Props Reka
export type SeparatorRootProps = Pick<
  RekaSeparatorProps,
  'as' | 'asChild' | 'orientation' | 'decorative'
>

// Fn
export type SeparatorFn<T> = T | ((context: SeparatorContext) => T)

// UI
export interface SeparatorUI {
  root?: SeparatorFn<HTMLAttributes>
}

// Props
export interface SeparatorProps extends SeparatorRootProps {
  ui?: SeparatorUI
}

// Context
export interface SeparatorContext {
  props: Omit<SeparatorProps, 'ui'>
}

// Slots
export interface SeparatorSlots {
  default?(props: SeparatorContext): unknown
}

export function normalizeSeparatorProps(
  source: SeparatorProps | null | undefined,
): SeparatorProps | undefined {
  if (!source) return undefined

  const { as, asChild, orientation, decorative, ui } = source
  return { as, asChild, orientation, decorative, ui }
}
