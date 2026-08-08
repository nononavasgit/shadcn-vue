import type {
  PinInputInputProps as RekaPinInputInputProps,
  PinInputRootProps as RekaPinInputRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as InputOTP } from './InputOTP.vue'

export type InputOTPType = NonNullable<RekaPinInputRootProps['type']>
export type InputOTPValue = string[] | number[]
export type InputOTPRootProps = Pick<
  RekaPinInputRootProps,
  | 'as'
  | 'asChild'
  | 'placeholder'
  | 'mask'
  | 'otp'
  | 'type'
  | 'dir'
  | 'disabled'
  | 'id'
  | 'name'
  | 'required'
>
export type InputOTPInputProps = Pick<RekaPinInputInputProps, 'as' | 'asChild' | 'disabled'>

// Props
export interface InputOTPProps extends InputOTPRootProps {
  value?: InputOTPValue
  maxlength?: number
  groups?: number[]
  separator?: boolean
  input?: InputOTPInputProps
  ui?: InputOTPUI
}

// UI
export type InputOTPFn<T, C> = T | ((context: C) => T)
export interface InputOTPUI {
  root?: InputOTPFn<HTMLAttributes, InputOTPContext>
  group?: InputOTPFn<HTMLAttributes, InputOTPGroupContext>
  input?: InputOTPFn<HTMLAttributes, InputOTPInputContext>
  separator?: InputOTPFn<HTMLAttributes, InputOTPSeparatorContext>
}

// Context
export interface InputOTPContext {
  props: Omit<InputOTPProps, 'ui'>
  value: InputOTPValue
}

export interface InputOTPGroupContext {
  groupIndex: number
  size: number
  startIndex: number
  first: boolean
  last: boolean
}

export interface InputOTPInputContext extends InputOTPGroupContext {
  index: number
  indexInGroup: number
  firstInGroup: boolean
  lastInGroup: boolean
}

export interface InputOTPSeparatorContext {
  index: number
  previousGroup: InputOTPGroupContext
  nextGroup: InputOTPGroupContext
}

// Emits
export interface InputOTPEmits {
  'update:value': [value: InputOTPValue]
  valueChange: [value: InputOTPValue]
  complete: [value: InputOTPValue]
}

// Slots
export type InputOTPSlots = {
  default?(props: InputOTPContext): unknown
  separator?(props: InputOTPSeparatorContext): unknown
} & {
  [name: `separator-${number}`]: ((props: InputOTPSeparatorContext) => unknown) | undefined
}
