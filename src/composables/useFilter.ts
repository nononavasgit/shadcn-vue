export type FilterMode = 'contains' | 'startWith' | 'endWith'

interface UseFilterOptions<T> {
  mode?: FilterMode
  getText: (item: T) => string
}

function normalized(value: string) {
  return value.trim().toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

export function useFilter<T>({ mode = 'contains', getText }: UseFilterOptions<T>) {
  function filter(items: T[], search: string) {
    const normalizedSearch = normalized(search)
    if (!normalizedSearch) return items
    if (mode === 'contains') {
      return items.filter((item) => normalized(getText(item)).includes(normalizedSearch))
    }

    if (mode === 'startWith') {
      return items.filter((item) => normalized(getText(item)).startsWith(normalizedSearch))
    }

    if (mode === 'endWith') {
      return items.filter((item) => normalized(getText(item)).endsWith(normalizedSearch))
    }
    return items
  }

  return { filter, normalized }
}
