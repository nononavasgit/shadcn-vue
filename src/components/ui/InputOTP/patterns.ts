import { REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'vue-input-otp'

export const INPUT_OTP_PATTERNS = {
  digits: REGEXP_ONLY_DIGITS,
  chars: REGEXP_ONLY_CHARS,
  alphanumeric: REGEXP_ONLY_DIGITS_AND_CHARS,
} as const

export type InputOTPPattern = keyof typeof INPUT_OTP_PATTERNS
