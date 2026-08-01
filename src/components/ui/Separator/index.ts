import type { HTMLAttributes } from 'vue'
import { SeparatorProps as SeparatorPropsReka } from 'reka-ui'

export { default as Separator } from './Separator.vue'

export interface SeparatorUI {
  root?: HTMLAttributes
}

export interface SeparatorProps extends SeparatorPropsReka {
  ui?: SeparatorUI
}
