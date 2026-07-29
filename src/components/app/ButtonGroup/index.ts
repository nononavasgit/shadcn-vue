import type { Component } from 'vue'

export { default as ButtonGroup } from './ButtonGroup.vue'
export { default as ButtonGroupSeparator } from './ButtonGroupSeparator.vue'
export { default as ButtonGroupText } from './ButtonGroupText.vue'

export type ButtonGroupOrientation = 'horizontal' | 'vertical'

export interface ButtonGroupProps {
  orientation?: ButtonGroupOrientation
}

export interface ButtonGroupSeparatorProps {
  orientation?: ButtonGroupOrientation
  decorative?: boolean
}

export interface ButtonGroupTextProps {
  label?: string
  as?: string | Component
  asChild?: boolean
}

export interface ButtonGroupSlots {
  default?(): unknown
}

export interface ButtonGroupTextSlots {
  default?(): unknown
}
