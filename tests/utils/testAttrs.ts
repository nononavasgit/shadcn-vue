import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

interface TestAttrsOptions {
  text: string
  id: string
  mount: (attrs: Record<string, string>) => VueWrapper
}

const attrs = {
  id: 'test-component',
  'aria-label': 'Component',
  class: 'custom-component',
  style: 'opacity: 0.5',
}

export function testAttrs({
  text = 'forwards arbitrary attrs, class and style to root',
  id,
  mount,
}: TestAttrsOptions) {
  it(text, () => {
    const root = mount(attrs).get(id)

    expect(root.attributes('id')).toBe(attrs.id)
    expect(root.attributes('aria-label')).toBe(attrs['aria-label'])
    expect(root.classes()).toContain(attrs.class)
    expect(root.attributes('style')).toContain(attrs.style)
  })
}
