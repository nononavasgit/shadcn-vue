import { toValue } from 'vue'

import type { IconConfig, NormalizeIconProps } from '@/components/ui/Icon'

export function useNormalizeIconProps(
  source: NormalizeIconProps | undefined,
): IconConfig | undefined {
  const res = toValue(source)

  if (!res) return undefined
  if (typeof res === 'string') return { name: res }
  return res
}
