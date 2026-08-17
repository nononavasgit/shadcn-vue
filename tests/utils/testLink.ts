import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'
import type { LinkProps } from '@/components/ui/Link'

interface TestLinkOptions {
  text: string
  id: string
  mount: (input: LinkProps['to']) => VueWrapper | Promise<VueWrapper>
}

export function testLink({ text, id, mount }: TestLinkOptions) {
  it.each([
    { input: '/docs', expected: '/docs' },
    { input: 'https://example.com/docs', expected: 'https://example.com/docs' },
  ])(`${text} input=$input`, async ({ input, expected }) => {
    const link = (await mount(input)).get(id)

    expect(link.element.tagName.toLowerCase()).toBe('a')
    expect(link.attributes('href')).toBe(expected)
  })
}
