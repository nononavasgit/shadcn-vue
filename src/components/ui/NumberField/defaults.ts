export const numberFieldDefaults = {
  size: 'md' as const,
  variant: 'outline' as const,
  increment: true,
  decrement: true,
  min: 0,
  max: 100,
  disabled: false,
  disableWheelChange: false,
  focusOnChange: true,
  step: 1,
  stepSnapping: true,
  ui: undefined,
} as const
