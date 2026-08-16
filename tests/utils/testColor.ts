import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestColorOptions {
  text: string
  id: string
  varColor: string
  mount: (color: string | undefined) => VueWrapper
}

export function testColor({ text, id, varColor, mount }: TestColorOptions) {
  it.each([
    { input: '#ff0000', expected: `${varColor}: #ff0000` },
    { input: undefined, expected: undefined },
  ])(`${text} input=$input`, ({ input, expected }) => {
    const root = mount(input).get(id)

    if (expected) expect(root.attributes('style')).toContain(expected)
    else expect(root.attributes('style')).toBeUndefined()
  })
}
