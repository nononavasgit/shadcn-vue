import type { MaybeRef } from 'vue'
import { useFilter as useRekaFilter } from 'reka-ui'

export function useFilter(options?: MaybeRef<Intl.CollatorOptions>) {
  return useRekaFilter(options)
}
