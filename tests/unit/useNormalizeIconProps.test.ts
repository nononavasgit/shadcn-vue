import { describe, expect, it, vi } from 'vitest'

import { useNormalizeIconProps } from '@/composables/useNormalizeIconProps'

describe('useNormalizeIconProps', () => {
  const onClick = vi.fn()

  it.each([
    { input: 'check' as const, expected: { name: 'check' } },
    {
      input: {
        name: 'error' as const,
        size: 'sm' as const,
        color: '#ff0000',
        class: 'custom-icon',
        'aria-label': 'Error',
        onClick,
      },
      expected: {
        name: 'error',
        size: 'sm',
        color: '#ff0000',
        class: 'custom-icon',
        'aria-label': 'Error',
        onClick,
      },
    },
    { input: undefined, expected: undefined },
    { input: '', expected: undefined },
  ])('normalizes $input', ({ input, expected }) => {
    expect(useNormalizeIconProps(input)).toEqual(expected)
  })
})
