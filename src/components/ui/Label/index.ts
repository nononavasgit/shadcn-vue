import type { HTMLAttributes } from 'vue'
import type { LabelProps as LabelPropsReka } from 'reka-ui'

export { default as Label } from './Label.vue'

export type LabelRootProps = Pick<LabelPropsReka, 'for'>

export type LabelFn<T> = (context: LabelContext) => T

export interface LabelUI {
  root?: LabelFn<HTMLAttributes>
}

export interface LabelProps extends LabelRootProps {
  ui?: LabelUI
}

export interface LabelContext {
  for: LabelProps['for']
}

export function createLabelContext(props: LabelProps): LabelContext {
  return {
    for: props.for,
  }
}

export interface LabelSlots {
  default?(props: LabelContext): unknown
}
