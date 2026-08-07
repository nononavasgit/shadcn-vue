import type { HTMLAttributes } from 'vue'
import type { LabelProps as LabelPropsReka } from 'reka-ui'

export { default as Label } from './Label.vue'

export type LabelRootProps = Pick<LabelPropsReka, 'as' | 'asChild' | 'for'>

export type LabelFn<T> = T | ((context: LabelContext) => T)

export interface LabelUI {
  root?: LabelFn<HTMLAttributes>
}

export interface LabelProps extends LabelRootProps {
  ui?: LabelUI
}

export interface LabelContext {
  props: Omit<LabelProps, 'ui'>
}

export interface LabelSlots {
  default?(props: LabelContext): unknown
}
