import type { Component } from 'vue'

export { default as Label } from './Label.vue'

export interface LabelProps {
  for?: string
  as?: string | Component
  asChild?: boolean
}
