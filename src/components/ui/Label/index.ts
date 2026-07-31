import type { Component, HTMLAttributes } from 'vue'

export { default as Label } from './Label.vue'

export interface LabelUI {
  root?: HTMLAttributes
}

export interface LabelProps {
  for?: string
  as?: string | Component
  asChild?: boolean
  ui?: LabelUI
}

export interface LabelSlots {
  default?(): unknown
}
