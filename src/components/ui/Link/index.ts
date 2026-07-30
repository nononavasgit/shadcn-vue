import type { ButtonEmits, ButtonProps, ButtonSlots } from '@/components/ui/Button'
import type { RouterLinkProps } from 'vue-router'

export { default as Link } from './Link.vue'

export type LinkProps = Omit<ButtonProps, 'as' | 'asChild'> &
  Pick<RouterLinkProps, 'to' | 'replace'>

export type LinkEmits = ButtonEmits
export type LinkSlots = ButtonSlots
