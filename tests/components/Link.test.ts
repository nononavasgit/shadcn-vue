import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'
import { describe, expect, it } from 'vitest'

import { Link, type LinkProps } from '@/components/ui/Link'
import { testAttrs } from '../utils/testAttrs'

function mountLink(options: MountingOptions<LinkProps> & Record<string, unknown> = {}) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/docs', name: 'docs', component: { template: '<div />' } },
    ],
  })
  const global = options.global ?? {}

  return mount(Link, {
    ...options,
    props: {
      to: 'https://example.com',
      ...options.props,
    },
    global: {
      ...global,
      plugins: [router, ...(global.plugins ?? [])],
    },
  })
}

describe('Link', () => {
  describe('router props', () => {
    it.each([
      { input: '/docs', tag: 'a', expected: '/docs' },
      { input: 'https://example.com/docs', tag: 'a', expected: 'https://example.com/docs' },
      { input: undefined, tag: 'div', expected: undefined },
    ])('renders the correct element and destination for to=$input', ({ input, tag, expected }) => {
      const link = mountLink({ props: { to: input } }).get('[data-test-link-root]')

      expect(link.element.tagName.toLowerCase()).toBe(tag)
      expect(link.attributes('href')).toBe(expected)
    })

    it('renders RouteLocationRaw objects', () => {
      const link = mountLink({ props: { to: { name: 'docs' } } })

      expect(link.get('[data-test-link-root]').attributes('href')).toBe('/docs')
    })

    it.each([
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: false },
    ])('passes replace=$input to RouterLink as $expected', ({ input, expected }) => {
      const link = mountLink({ props: { to: '/docs', replace: input } })

      expect(link.getComponent(RouterLink).props('replace')).toBe(expected)
    })

    it('keeps loading disabled', () => {
      const link = mountLink({ attrs: { loading: true } })

      expect(link.get('[data-test-link-root]').attributes('aria-busy')).toBeUndefined()
      expect(link.find('[data-test-button-loading-icon]').exists()).toBe(false)
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to the root',
      id: '[data-test-link-root]',
      mount: (attrs) => mountLink({ attrs }),
    })
  })

  describe('slots', () => {
    it.each(['default', 'leading', 'trailing'] as const)('renders the %s slot', (slot) => {
      const link = mountLink({
        slots: { [slot]: () => h('span', { 'data-test-link-slot': slot }, `Slot ${slot}`) },
      })

      expect(link.get('[data-test-link-root]').text()).toContain(`Slot ${slot}`)
    })
  })
})
