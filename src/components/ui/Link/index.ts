import type { HTMLAttributes } from 'vue'
import type { ButtonEmits, ButtonProps } from '@/components/ui/Button'
import type { RouterLinkProps } from 'vue-router'
import type { EmitsAsProps } from '@/types/emits'

export { default as Link } from './Link.vue'

// Props
export type LinkProps = Omit<ButtonProps, 'as' | 'asChild' | 'ui'> &
  Pick<RouterLinkProps, 'to' | 'replace'> & {
    ui?: LinkUI
  }

// Fn
export type LinkFn<T> = T | ((context: LinkContext) => T)

// UI
export interface LinkUI {
  root?: LinkFn<HTMLAttributes>
}

// Context
export interface LinkContext {
  props: Omit<LinkProps, 'ui'>
}

// Emits
export type LinkEmits = ButtonEmits

// Slots
export interface LinkSlots {
  default?(props: LinkContext): unknown
  leading?(props: LinkContext): unknown
  loading?(props: LinkContext): unknown
  trailing?(props: LinkContext): unknown
}

// Normalize
export type NormalizeLinkProps = LinkProps & EmitsAsProps<LinkEmits>

export function normalizeLinkProps(
  source: NormalizeLinkProps | null | undefined,
): NormalizeLinkProps | undefined {
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
    onClick,
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
    onClick,
  }
}
