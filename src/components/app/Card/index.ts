import type { HTMLAttributes } from 'vue'

export { default as Card } from './Card.vue'

export interface CardUI {
  root?: HTMLAttributes
  header?: HTMLAttributes
  title?: HTMLAttributes
  description?: HTMLAttributes
  action?: HTMLAttributes
  content?: HTMLAttributes
  footer?: HTMLAttributes
}

export interface CardProps {
  label?: string
  description?: string
  ui?: CardUI
}
