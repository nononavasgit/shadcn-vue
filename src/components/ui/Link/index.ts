import type { ButtonEmits, ButtonProps, ButtonSlots, ButtonUI } from '@/components/ui/Button'
import type { RouterLinkProps } from 'vue-router'

export { default as Link } from './Link.vue'

export type LinkUI = ButtonUI

export type LinkProps = Omit<ButtonProps, 'as' | 'asChild' | 'ui'> &
  Pick<RouterLinkProps, 'to' | 'replace'> & {
    ui?: LinkUI
  }

export function normalizeLinkProps(source: LinkProps | null | undefined): LinkProps | undefined {
  if (!source) return undefined

  const {
    label,
    variant,
    severity,
    size,
    rounded,
    square,
    loading,
    color,
    icon,
    trailingIcon,
    to,
    replace,
    ui,
  } = source

  return {
    label,
    variant,
    severity,
    size,
    rounded,
    square,
    loading,
    color,
    icon,
    trailingIcon,
    to,
    replace,
    ui,
  }
}
export type LinkEmits = ButtonEmits
export type LinkSlots = ButtonSlots
