import { normalizeHTMLAttributes } from '@/composables/useNormalize'

type ResolveValue<T, C> = T | ((context: C) => T)

export function useUi<T extends object, C>(value: ResolveValue<T, C> | undefined, context: C): T {
  const resolvedValue = typeof value === 'function' ? (value as (context: C) => T)(context) : value

  return normalizeHTMLAttributes(resolvedValue)
}
