import type { Component, HTMLAttributes } from 'vue'

export { default as Separator } from './Separator.vue'

export interface SeparatorUI {
  root?: HTMLAttributes
}

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  as?: string | Component
  asChild?: boolean
  ui?: SeparatorUI
}
