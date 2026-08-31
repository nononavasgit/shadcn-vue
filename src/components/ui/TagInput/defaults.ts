import type { AcceptableInputValue } from 'reka-ui'

export const tagInputDefaults = {
  addOnPaste: false,
  addOnTab: false,
  addOnBlur: false,
  duplicate: false,
  disabled: false,
  delimiter: ',',
  max: 0,
  displayValue: (value: AcceptableInputValue) => value.toString(),
  clearable: false,
} as const
