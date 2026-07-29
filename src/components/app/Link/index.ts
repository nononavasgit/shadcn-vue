import type { ButtonEmits, ButtonProps, ButtonSlots } from '@/components/app/Button'

export { default as Link } from './Link.vue'

export interface LinkProps extends ButtonProps {
  to?: string | object
}

export type LinkEmits = ButtonEmits

export type LinkSlots = ButtonSlots
