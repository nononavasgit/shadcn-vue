import type { HTMLAttributes } from 'vue'
import type {
  SegmentPart,
  TimeFieldInputProps as RekaTimeFieldInputProps,
  TimeFieldRootProps as RekaTimeFieldRootProps,
  TimeValue,
} from 'reka-ui'

export { default as TimeField } from './TimeField.vue'
export type { TimeValue }

export type TimeFieldValue = TimeValue | undefined

export type TimeFieldRootProps = Pick<
  RekaTimeFieldRootProps,
  | 'as'
  | 'asChild'
  | 'defaultPlaceholder'
  | 'hourCycle'
  | 'step'
  | 'stepSnapping'
  | 'granularity'
  | 'hideTimeZone'
  | 'maxValue'
  | 'minValue'
  | 'locale'
  | 'disabled'
  | 'readonly'
  | 'required'
  | 'name'
  | 'id'
  | 'dir'
>

// Props Segments
export type TimeFieldSegmentProps = Pick<RekaTimeFieldInputProps, 'as' | 'asChild'>

//Props
export interface TimeFieldProps extends TimeFieldRootProps {
  value?: TimeFieldValue
  ui?: TimeFieldUI
}

// Fn
export type TimeFieldFn<T> = T | ((context: TimeFieldContext) => T)
export type TimeFieldSegmentFn<T> = T | ((context: TimeFieldSegmentContext) => T)

// UI
export interface TimeFieldUI {
  root?: TimeFieldFn<HTMLAttributes>
  segment?: TimeFieldSegmentFn<HTMLAttributes>
}

export interface TimeFieldSegment {
  part: SegmentPart
  value: string
}

// Context
export interface TimeFieldContext {
  props: Omit<TimeFieldProps, 'ui'>
  value: TimeFieldValue
}

export interface TimeFieldSegmentContext {
  segment: TimeFieldSegment
  index: number
  isInvalid: boolean
}

// Slots
export type TimeFieldSlots = {
  [Part in Exclude<SegmentPart, 'literal'>]?: (props: TimeFieldSegmentContext) => unknown
}

// Emits
export interface TimeFieldEmits {
  'update:value': [value: TimeFieldValue]
  valueChange: [value: TimeFieldValue]
}
