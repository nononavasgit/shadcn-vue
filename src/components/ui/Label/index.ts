import type { LabelProps as LabelPropsReka } from 'reka-ui'

export { default as Label } from './Label.vue'

export type LabelRootProps = Pick<LabelPropsReka, 'for'>

export type LabelProps = LabelRootProps

export interface LabelSlots {
  default?(): unknown
}
