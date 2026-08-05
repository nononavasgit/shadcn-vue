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
  | 'defaultValue'
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

export function normalizeInputOTPInputProps(
  source: InputOTPInputProps | null | undefined,
): InputOTPInputProps | undefined {
  if (!source) return undefined
  const { as, asChild, disabled } = source
  return { as, asChild, disabled }
}

// Props
export interface InputOTPProps extends Omit<InputOTPRootProps, 'defaultValue'> {
  modelValue?: InputOTPValue
  defaultValue?: InputOTPValue
  maxlength?: number
  groups?: number[]
  separator?: boolean
  input?: InputOTPInputProps
  ui?: InputOTPUI
}

// UI
export type InputOTPUIValue<T, C> = T | ((context: C) => T)
export interface InputOTPUI {
  root?: HTMLAttributes
  group?: InputOTPUIValue<HTMLAttributes, InputOTPGroupContext>
  input?: InputOTPUIValue<HTMLAttributes, InputOTPInputContext>
  separator?: InputOTPUIValue<HTMLAttributes, InputOTPSeparatorContext>
}

export function resolveInputOTPUIValue<T, C>(
  value: InputOTPUIValue<T, C> | undefined,
  context: C,
): T | undefined {
  return typeof value === 'function' ? (value as (context: C) => T)(context) : value
}

// Context
export interface InputOTPContext {
  modelValue: InputOTPValue
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
  'update:modelValue': [value: InputOTPValue]
  complete: [value: InputOTPValue]
}

// Slots
export type InputOTPSlots = {
  default?(props: InputOTPContext): unknown
  separator?(props: InputOTPSeparatorContext): unknown
} & {
  [name: `separator-${number}`]: ((props: InputOTPSeparatorContext) => unknown) | undefined
}
