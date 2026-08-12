import type { HTMLAttributes } from 'vue'

export { default as Card } from './Card.vue'

export type CardFn<T> = (context: CardContext) => T

export interface CardUI {
  root?: CardFn<HTMLAttributes>
  header?: CardFn<HTMLAttributes>
  label?: CardFn<HTMLAttributes>
  description?: CardFn<HTMLAttributes>
  action?: CardFn<HTMLAttributes>
  content?: CardFn<HTMLAttributes>
  footer?: CardFn<HTMLAttributes>
}

export interface CardProps {
  label?: string
  description?: string
  ui?: CardUI
}

export interface CardContext {
  label: CardProps['label']
  description: CardProps['description']
}

export function createCardContext(props: CardProps): CardContext {
  const { label, description } = props

  return {
    label,
    description,
  }
}

export interface CardSlots {
  default?(props: CardContext): unknown
  header?(props: CardContext): unknown
  label?(props: CardContext): unknown
  description?(props: CardContext): unknown
  action?(props: CardContext): unknown
  footer?(props: CardContext): unknown
}
