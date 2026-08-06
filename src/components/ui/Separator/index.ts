import type { HTMLAttributes } from 'vue'
import { SeparatorProps as SeparatorPropsReka } from 'reka-ui'

export { default as Separator } from './Separator.vue'

export interface SeparatorUI {
  root?: HTMLAttributes
}

export interface SeparatorProps extends SeparatorPropsReka {
  ui?: SeparatorUI
}

export function normalizeSeparatorProps(
  source: SeparatorProps | null | undefined,
): SeparatorProps | undefined {
  if (!source) return undefined

  const { as, asChild, orientation, decorative, ui } = source
  return { as, asChild, orientation, decorative, ui }
}
