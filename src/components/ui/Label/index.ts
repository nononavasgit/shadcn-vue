import type { HTMLAttributes } from 'vue'
import type { LabelProps as LabelPropsReka } from 'reka-ui'

export { default as Label } from './Label.vue'

export interface LabelUI {
  root?: HTMLAttributes
}

export interface LabelProps extends LabelPropsReka {
  ui?: LabelUI
}

export interface LabelSlots {
  default?(): unknown
}
