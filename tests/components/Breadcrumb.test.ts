import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it, vi } from 'vitest'

import {
  Breadcrumb,
  type BreadcrumbEllipsisContext,
  type BreadcrumbItem,
  type BreadcrumbItemContext,
  type BreadcrumbProps,
} from '@/components/ui/Breadcrumb'
import { Link } from '@/components/ui/Link'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'
import { testIconProps } from '../utils/testIconProps'

const items: BreadcrumbItem[] = [
  { slot: 'home', label: 'Home', to: '/' },
  { slot: 'library', label: 'Library', to: '/library' },
  { slot: 'current', label: 'Current', icon: { name: 'check' } },
]

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/library', name: 'library', component: { template: '<div />' } },
    ],
  })
}

function mountBreadcrumb(options: MountingOptions<BreadcrumbProps> = {}) {
  const router = createTestRouter()
  const global = options.global ?? {}

  return mount(Breadcrumb, {
    ...options,
    global: {
      ...global,
      plugins: [i18n, router, ...(global.plugins ?? [])],
    },
  })
}

describe('Breadcrumb', () => {
  describe('props', () => {
    describe('items', () => {
      it('renders no items by default', () => {
        const wrapper = mountBreadcrumb()

        expect(wrapper.find('[data-test-breadcrumb-item]').exists()).toBe(false)
        expect(wrapper.get('[data-test-breadcrumb-list]').exists()).toBe(true)
      })

      describe('slot', () => {
        it.each([{ input: 'home' }, { input: 'section' }])(
          'uses slot=$input to identify the item',
          ({ input }) => {
            const wrapper = mountBreadcrumb({
              props: { items: [{ slot: input, label: 'Item' }] },
            })

            expect(wrapper.get(`[data-test-breadcrumb-item="${input}"]`).exists()).toBe(true)
          },
        )
      })

      describe('item', () => {
        it.each(items)('passes item slot=$slot fields to Link', (item) => {
          const wrapper = mountBreadcrumb({ props: { items: [item] } })
          const link = wrapper.getComponent(Link)

          expect(link.props()).toMatchObject({
            label: item.label,
            icon: item.icon,
            to: item.to,
          })
        })
      })

      describe('command', () => {
        it('calls command when a linked item is clicked', async () => {
          const command = vi.fn()
          const wrapper = mountBreadcrumb({
            props: { items: [{ ...items[0], command }] },
          })

          await wrapper.get('[data-test-breadcrumb-link]').trigger('click')

          expect(command).toHaveBeenCalledTimes(1)
          expect(command).toHaveBeenCalledWith(expect.any(Event))
        })

        it('does not call command for the current page item', async () => {
          const command = vi.fn()
          const wrapper = mountBreadcrumb({
            props: { items: [{ ...items[2], command }] },
          })

          await wrapper.get('[data-test-breadcrumb-page]').trigger('click')

          expect(command).not.toHaveBeenCalled()
        })
      })
    })

    describe('ellipsisIndex', () => {
      it.each([
        { input: undefined, visible: false },
        { input: [0, 1] as [number, number], visible: true },
        { input: [-1, 1] as [number, number], visible: false },
        { input: [2, 1] as [number, number], visible: false },
        { input: [3, 3] as [number, number], visible: false },
      ])('renders ellipsis=$visible for range=$input', ({ input, visible }) => {
        const wrapper = mountBreadcrumb({ props: { items, ellipsisIndex: input } })

        expect(wrapper.find('[data-test-breadcrumb-ellipsis]').exists()).toBe(visible)
      })

      it('hides the affected items and keeps the ellipsis item visible', () => {
        const wrapper = mountBreadcrumb({ props: { items, ellipsisIndex: [0, 1] } })

        expect(wrapper.get('[data-test-breadcrumb-ellipsis]').exists()).toBe(true)
        expect(wrapper.findAll('[data-test-breadcrumb-item]')).toHaveLength(1)
        expect(wrapper.get('[data-test-breadcrumb-page]').text()).toBe('Current')
        expect(wrapper.find('[data-test-breadcrumb-item="home"]').exists()).toBe(false)
        expect(wrapper.find('[data-test-breadcrumb-item="library"]').exists()).toBe(false)
        expect(wrapper.find('[data-test-breadcrumb-item="current"]').exists()).toBe(true)
      })
    })

    describe('ellipsisIcon', () => {
      testIconProps({
        text: 'renders ellipsisIcon',
        id: '[data-test-breadcrumb-ellipsis] [data-test-icon-root]',
        default: 'moreHorizontal',
        mount: (input) =>
          mountBreadcrumb({
            props: { items, ellipsisIndex: [0, 1], ellipsisIcon: input },
          }),
      })
    })

    describe('separatorIcon', () => {
      testIconProps({
        text: 'renders separatorIcon',
        id: '[data-test-breadcrumb-separator] [data-test-icon-root]',
        default: 'chevronRight',
        mount: (input) => mountBreadcrumb({ props: { items, separatorIcon: input } }),
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'forwards attrs, class and style through ui.list',
        id: '[data-test-breadcrumb-list]',
        mount: (attrs) => mountBreadcrumb({ props: { items, ui: { list: () => attrs } } }),
      })

      testAttrs({
        text: 'forwards attrs, class and style through ui.ellipsisContainer',
        id: '[data-test-breadcrumb-ellipsis]',
        mount: (attrs) =>
          mountBreadcrumb({
            props: { items, ellipsisIndex: [0, 1], ui: { ellipsisContainer: () => attrs } },
          }),
      })

      testAttrs({
        text: 'forwards attrs, class and style through ui.separatorContainer',
        id: '[data-test-breadcrumb-separator]',
        mount: (attrs) =>
          mountBreadcrumb({ props: { items, ui: { separatorContainer: () => attrs } } }),
      })

      testAttrs({
        text: 'forwards attrs, class and style through ui.item',
        id: '[data-test-breadcrumb-item]',
        mount: (attrs) => mountBreadcrumb({ props: { items, ui: { item: () => attrs } } }),
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-breadcrumb-root]',
      mount: (attrs) => mountBreadcrumb({ attrs }),
    })
  })

  describe('context contract', () => {
    it('passes the complete itemContext', () => {
      let uiContext: BreadcrumbItemContext | undefined
      let slotContext: BreadcrumbItemContext | undefined

      mountBreadcrumb({
        props: {
          items,
          ui: {
            item: (context) => {
              uiContext ??= context
              return {}
            },
          },
        },
        slots: {
          item: (context: BreadcrumbItemContext) => {
            slotContext ??= context
            return h('span', 'Custom item')
          },
        },
      })

      expect(uiContext).toEqual({
        item: items[0],
        index: 0,
        first: true,
        last: false,
        linked: true,
        ellipsis: false,
      })
      const { ref_for: _slotRefFor, ...slotContextWithoutRenderMetadata } =
        slotContext as BreadcrumbItemContext & {
          ref_for?: boolean
        }
      void _slotRefFor

      expect(slotContextWithoutRenderMetadata).toEqual(uiContext)
    })

    it('passes only the affected items to the ellipsisContext', () => {
      let context: BreadcrumbEllipsisContext | undefined

      mountBreadcrumb({
        props: { items, ellipsisIndex: [0, 1] },
        slots: {
          ellipsis: (slotContext: BreadcrumbEllipsisContext) => {
            context = slotContext
            return h('span', 'More')
          },
        },
      })

      const { ref_for: _refFor, ...contextWithoutRenderMetadata } =
        context as BreadcrumbEllipsisContext & {
          ref_for?: boolean
        }
      void _refFor

      expect(contextWithoutRenderMetadata).toEqual({ items: [items[1]] })
    })
  })

  describe('slots', () => {
    it('renders the ellipsis slot', () => {
      const wrapper = mountBreadcrumb({
        props: { items, ellipsisIndex: [0, 1] },
        slots: { ellipsis: () => h('span', { 'data-test-breadcrumb-slot': 'ellipsis' }, 'More') },
      })

      expect(wrapper.get('[data-test-breadcrumb-slot="ellipsis"]').text()).toBe('More')
      expect(wrapper.find('[data-test-breadcrumb-ellipsis] [data-test-icon-root]').exists()).toBe(
        false,
      )
    })

    it('renders the separator slot', () => {
      const wrapper = mountBreadcrumb({
        props: { items },
        slots: { separator: () => h('span', { 'data-test-breadcrumb-slot': 'separator' }, '|') },
      })

      expect(wrapper.get('[data-test-breadcrumb-slot="separator"]').text()).toBe('|')
    })

    it('renders the item slot', () => {
      const wrapper = mountBreadcrumb({
        props: { items },
        slots: { item: () => h('span', { 'data-test-breadcrumb-slot': 'item' }, 'Custom item') },
      })

      expect(wrapper.get('[data-test-breadcrumb-slot="item"]').text()).toBe('Custom item')
    })

    it('renders the item slot scoped to the item slot', () => {
      const wrapper = mountBreadcrumb({
        props: { items },
        slots: {
          'item-home': () => h('span', { 'data-test-breadcrumb-slot': 'item-home' }, 'Home slot'),
        },
      })

      expect(wrapper.get('[data-test-breadcrumb-slot="item-home"]').text()).toBe('Home slot')
    })
  })
})
