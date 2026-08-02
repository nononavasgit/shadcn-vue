import type { HTMLAttributes } from 'vue'
import type { LabelProps as LabelPropsReka } from 'reka-ui'

export { default as Label } from './Label.vue'

export type LabelRootProps = Pick<LabelPropsReka, 'as' | 'asChild' | 'for'>

export interface LabelUI {
  root?: HTMLAttributes
}

export interface LabelProps extends LabelRootProps {
  ui?: LabelUI
}

export interface LabelSlots {
  default?(): unknown
}
