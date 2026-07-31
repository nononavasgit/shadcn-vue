import type { Component, HTMLAttributes } from 'vue'

export { default as ButtonGroup } from './ButtonGroup.vue'
export { default as ButtonGroupSeparator } from './ButtonGroupSeparator.vue'
export { default as ButtonGroupText } from './ButtonGroupText.vue'

export type ButtonGroupOrientation = 'horizontal' | 'vertical'

export interface ButtonGroupUI {
  root?: HTMLAttributes
}

export interface ButtonGroupProps {
  orientation?: ButtonGroupOrientation
  ui?: ButtonGroupUI
}

export interface ButtonGroupSeparatorUI {
  root?: HTMLAttributes
}

export interface ButtonGroupSeparatorProps {
  orientation?: ButtonGroupOrientation
  decorative?: boolean
  ui?: ButtonGroupSeparatorUI
}

export interface ButtonGroupTextUI {
  root?: HTMLAttributes
}

export interface ButtonGroupTextProps {
  label?: string
  as?: string | Component
  asChild?: boolean
  ui?: ButtonGroupTextUI
}

export interface ButtonGroupSlots {
  default?(): unknown
}

export interface ButtonGroupTextSlots {
  default?(): unknown
}
