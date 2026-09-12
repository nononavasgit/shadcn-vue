export type FilterMode = 'contains' | 'startWith' | 'endWith'
export type FilterSensitivity = NonNullable<Intl.CollatorOptions['sensitivity']>

interface UseFilterOptions<T> {
  mode?: FilterMode
  sensitivity?: FilterSensitivity
  getText: (item: T) => string
}

function normalized(value: string) {
  return value.trim()
}

export function useFilter<T>({ mode = 'contains', sensitivity = 'base', getText }: UseFilterOptions<T>) {
  const collator = new Intl.Collator(undefined, { sensitivity })

  function matches(value: string, search: string) {
    if (mode === 'startWith') return collator.compare(value.slice(0, search.length), search) === 0
    if (mode === 'endWith') return collator.compare(value.slice(-search.length), search) === 0

    return Array.from({ length: value.length - search.length + 1 }, (_, index) =>
      collator.compare(value.slice(index, index + search.length), search) === 0,
    ).some(Boolean)
  }

  function filter(items: T[], search: string) {
    const normalizedSearch = normalized(search)
    if (!normalizedSearch) return items
    return items.filter((item) => matches(normalized(getText(item)), normalizedSearch))
  }

  return { filter, normalized }
}
