import type { HTMLAttributes } from 'vue'
import type { OTPInputProps, RenderProps } from 'vue-input-otp'
import type { InputOTPPattern } from './patterns'

export { default as InputOTP } from './InputOTP.vue'
export { INPUT_OTP_PATTERNS } from './patterns'
export type { InputOTPPattern } from './patterns'

export type InputOTPTextAlign = NonNullable<OTPInputProps['textAlign']>
export type InputOTPInputMode = NonNullable<OTPInputProps['inputmode']>
export type InputOTPPasswordManagerStrategy = NonNullable<
  OTPInputProps['pushPasswordManagerStrategy']
>

export interface InputOTPProps extends Pick<
  OTPInputProps,
  | 'containerClass'
  | 'inputmode'
  | 'noScriptCssFallback'
  | 'pasteTransformer'
  | 'pushPasswordManagerStrategy'
  | 'textAlign'
> {
  modelValue?: string
  defaultValue?: string
  maxlength?: number
  groups?: number[]
  separator?: boolean
  pattern?: InputOTPPattern
  ui?: InputOTPUI
}

export interface InputOTPEmits {
  'update:modelValue': [value: string | undefined]
  complete: [value: string]
  input: [value: string]
}

export interface InputOTPGroupContext {
  groupIndex: number
  size: number
  startIndex: number
  first: boolean
  last: boolean
}

export interface InputOTPSlotContext extends InputOTPGroupContext {
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

export type InputOTPUIValue<T, C> = T | ((context: C) => T)

export interface InputOTPUI {
  group?: InputOTPUIValue<HTMLAttributes, InputOTPGroupContext>
  slot?: InputOTPUIValue<HTMLAttributes, InputOTPSlotContext>
  separator?: InputOTPUIValue<HTMLAttributes, InputOTPSeparatorContext>
}

export type InputOTPRootSlotProps = RenderProps

export type InputOTPSlots = {
  default?(props: InputOTPRootSlotProps): unknown
  separator?(props: InputOTPSeparatorContext): unknown
} & {
  [name: `separator-${number}`]: ((props: InputOTPSeparatorContext) => unknown) | undefined
}
