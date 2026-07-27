import type { Component } from 'vue'

export { default as Separator } from './Separator.vue'

export interface SeparatorProps {
  orientacion?: 'horizontal' | 'vertical'
  decorativo?: boolean
  as?: string | Component
  asChild?: boolean
}
