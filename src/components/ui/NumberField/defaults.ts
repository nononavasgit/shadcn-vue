export const numberFieldDefaults = {
  size: 'md' as const,
  variant: 'outline' as const,
  min: 0,
  max: 100,
  disabled: false,
  disableWheelChange: false,
  focusOnChange: true,
  step: 1,
  stepSnapping: true,
  ui: undefined,
} as const
