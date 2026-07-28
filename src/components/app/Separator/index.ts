import type { Component } from 'vue'

export { default as Separator } from './Separator.vue'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  as?: string | Component
  asChild?: boolean
}
