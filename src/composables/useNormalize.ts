import { computed, toValue } from 'vue'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'

export type NormalizableValue<T extends object, K extends keyof T> = T | T[K] | null | undefined

export function useNormalize<T extends object, K extends keyof T>(
  source: MaybeRefOrGetter<NormalizableValue<T, K>>,
  key: K,
): ComputedRef<T | undefined> {
  return computed(() => {
    const value = toValue(source)

    if (value == null) return undefined
    if (typeof value === 'object') return value as T

    return { [key]: value } as T
  })
}
