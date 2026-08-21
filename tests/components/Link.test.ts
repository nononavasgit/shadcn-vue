import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'
import { describe, expect, it } from 'vitest'

import { Button } from '@/components/ui/Button'
import { Link, type LinkProps } from '@/components/ui/Link'
import { testAttrs } from '../utils/testAttrs'
import { testButtonConfig } from '../utils/testButtonConfig'

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
  describe('props', () => {
    describe('to', () => {
      it.each([
        { input: '/docs', tag: 'a', expected: '/docs' },
        { input: 'https://example.com/docs', tag: 'a', expected: 'https://example.com/docs' },
        { input: undefined, tag: 'div', expected: undefined },
      ])(
        'renders the correct element and destination for to=$input',
        ({ input, tag, expected }) => {
          const link = mountLink({ props: { to: input } }).get('[data-test-link-root]')

          expect(link.element.tagName.toLowerCase()).toBe(tag)
          expect(link.attributes('href')).toBe(expected)
        },
      )

      it('renders RouteLocationRaw objects', () => {
        const link = mountLink({ props: { to: { name: 'docs' } } })

        expect(link.get('[data-test-link-root]').attributes('href')).toBe('/docs')
      })
    })

    describe('replace', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('passes replace=$input to RouterLink as $expected', ({ input, expected }) => {
        const link = mountLink({ props: { to: '/docs', replace: input } })

        expect(link.getComponent(RouterLink).props('replace')).toBe(expected)
      })
    })

    describe('button props', () => {
      testButtonConfig({
        text: 'passes Button props and attrs to Button',
        id: '[data-test-link-root]',
        mount: (input) =>
          mountLink({
            props: { label: input.label },
            attrs: input,
          }),
      })
    })

    describe('button configuration', () => {
      it.each([
        { to: undefined, expected: 'div' },
        { to: '/docs', expected: 'a' },
        { to: 'https://example.com', expected: 'a' },
      ])('passes as=$expected to Button for to=$to', ({ to, expected }) => {
        const button = mountLink({ props: { to } }).getComponent(Button)

        expect(button.props('as')).toBe(expected)
      })

      it('forces asChild=false and loading=false', () => {
        const button = mountLink({
          attrs: { as: 'button', asChild: true, loading: true },
        }).getComponent(Button)

        expect(button.props('asChild')).toBe(false)
        expect(button.props('loading')).toBe(false)
      })
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
    describe('default', () => {
      it('renders the default slot', () => {
        const link = mountLink({
          slots: { default: () => h('span', { 'data-test-link-slot': 'default' }, 'Slot default') },
        })

        expect(link.get('[data-test-link-slot="default"]').text()).toBe('Slot default')
      })
    })

    describe('leading', () => {
      it('renders the leading slot', () => {
        const link = mountLink({
          slots: { leading: () => h('span', { 'data-test-link-slot': 'leading' }, 'Slot leading') },
        })

        expect(link.get('[data-test-link-slot="leading"]').text()).toBe('Slot leading')
      })
    })

    describe('trailing', () => {
      it('renders the trailing slot', () => {
        const link = mountLink({
          slots: {
            trailing: () => h('span', { 'data-test-link-slot': 'trailing' }, 'Slot trailing'),
          },
        })

        expect(link.get('[data-test-link-slot="trailing"]').text()).toBe('Slot trailing')
      })
    })
  })
})
