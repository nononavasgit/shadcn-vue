type ResolveValue<T, C> = T | ((context: C) => T)

export function useResolve<T, C>(value: ResolveValue<T, C> | undefined, context: C): T | undefined {
  return typeof value === 'function' ? (value as (context: C) => T)(context) : value
}
