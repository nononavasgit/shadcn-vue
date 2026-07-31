import type { ButtonEmits, ButtonProps, ButtonSlots, ButtonUI } from '@/components/ui/Button'
import type { RouterLinkProps } from 'vue-router'

export { default as Link } from './Link.vue'

export type LinkUI = ButtonUI

export type LinkProps = Omit<ButtonProps, 'as' | 'asChild' | 'ui'> &
  Pick<RouterLinkProps, 'to' | 'replace'> & {
    ui?: LinkUI
  }

export type LinkEmits = ButtonEmits
export type LinkSlots = ButtonSlots
