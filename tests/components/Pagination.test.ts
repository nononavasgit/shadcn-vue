import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { PaginationRoot } from 'reka-ui'

import {
  Pagination,
  type PaginationContext,
  type PaginationItemContext,
  type PaginationProps,
} from '@/components/ui/Pagination'
import { Button } from '@/components/ui/Button'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'
import { testIconProps } from '../utils/testIconProps'

function mountPagination(options: MountingOptions<PaginationProps> = {}) {
  const global = options.global ?? {}

  return mount(Pagination, {
    ...options,
    global: {
      ...global,
      plugins: [i18n, ...(global.plugins ?? [])],
    },
  })
}

describe('Pagination', () => {
  describe('props', () => {
    describe('as', () => {
      it.each([
        { input: undefined, expected: 'nav' },
        { input: 'div', expected: 'nav' },
      ])('renders as=$input as $expected', ({ input, expected }) => {
        const wrapper = mountPagination({ attrs: { as: input } })

        expect(wrapper.getComponent(PaginationRoot).props('as')).toBe(expected)
      })
    })

    describe('asChild', () => {
      it.each([
        { input: undefined, expected: false },
        { input: true, expected: false },
      ])('renders asChild=$input as $expected', ({ input, expected }) => {
        const wrapper = mountPagination({ attrs: { asChild: input } })

        expect(wrapper.getComponent(PaginationRoot).props('asChild')).toBe(expected)
      })
    })

    describe('total', () => {
      it.each([
        { input: undefined, expected: 0 },
        { input: 100, expected: 100 },
      ])('passes input=$input as expected=$expected', ({ input, expected }) => {
        const wrapper = mountPagination({ props: { total: input } })

        expect(wrapper.getComponent(PaginationRoot).props('total')).toBe(expected)
      })
    })

    describe('itemsPerPage', () => {
      it.each([
        { input: undefined, expected: 10 },
        { input: 20, expected: 20 },
      ])('passes input=$input as expected=$expected', ({ input, expected }) => {
        const wrapper = mountPagination({ props: { itemsPerPage: input } })

        expect(wrapper.getComponent(PaginationRoot).props('itemsPerPage')).toBe(expected)
      })
    })

    describe('siblingCount', () => {
      it.each([
        { input: undefined, expected: 2 },
        { input: 1, expected: 1 },
      ])('passes input=$input as expected=$expected', ({ input, expected }) => {
        const wrapper = mountPagination({ props: { siblingCount: input } })

        expect(wrapper.getComponent(PaginationRoot).props('siblingCount')).toBe(expected)
      })
    })

    describe('showEdges', () => {
      it.each([
        { input: undefined, expectedFirst: true, expectedLast: true },
        { input: true, expectedFirst: true, expectedLast: true },
        { input: false, expectedFirst: false, expectedLast: false },
      ])('renders edge pages for input=$input', ({ input, expectedFirst, expectedLast }) => {
        const wrapper = mountPagination({
          props: { total: 100, page: 5, siblingCount: 1, showEdges: input },
        })
        const values = wrapper.findAll('[data-test-pagination-item]').map((item) => item.text())

        expect(values.includes('1')).toBe(expectedFirst)
        expect(values.includes('10')).toBe(expectedLast)
      })
    })

    describe('disabled', () => {
      it.each([
        { input: undefined, expected: false },
        { input: false, expected: false },
        { input: true, expected: true },
      ])('passes input=$input as expected=$expected', ({ input, expected }) => {
        const wrapper = mountPagination({ props: { disabled: input } })

        expect(wrapper.getComponent(PaginationRoot).props('disabled')).toBe(expected)
      })
    })

    describe('page', () => {
      it.each([
        { input: undefined, expected: 1 },
        { input: 2, expected: 2 },
      ])('passes page=$input as $expected', ({ input, expected }) => {
        const root = mountPagination({ props: { total: 100, page: input } }).getComponent(
          PaginationRoot,
        )

        expect(root.props('page')).toBe(expected)
      })
    })

    describe('showControls', () => {
      it.each([
        { input: undefined, visible: true },
        { input: true, visible: true },
        { input: false, visible: false },
      ])('renders controls=$visible for showControls=$input', ({ input, visible }) => {
        const wrapper = mountPagination({ props: { total: 100, showControls: input } })

        expect(wrapper.find('[data-test-pagination-first]').exists()).toBe(visible)
        expect(wrapper.find('[data-test-pagination-previous]').exists()).toBe(visible)
        expect(wrapper.find('[data-test-pagination-next]').exists()).toBe(visible)
        expect(wrapper.find('[data-test-pagination-last]').exists()).toBe(visible)
      })
    })

    describe('color', () => {
      it.each([
        { input: undefined, expected: undefined },
        { input: '#ff0000', expected: '#ff0000' },
      ])('passes input=$input as expected=$expected to buttons', ({ input, expected }) => {
        const wrapper = mountPagination({ props: { total: 100, color: input } })

        expect(wrapper.getComponent(Button).props('color')).toBe(expected)
      })
    })

    describe('variant', () => {
      it.each([
        { input: undefined, expected: 'outline' },
        { input: 'plain', expected: 'plain' },
      ])('passes input=$input as expected=$expected to buttons', ({ input, expected }) => {
        const wrapper = mountPagination({ props: { total: 100, variant: input } })

        expect(wrapper.getComponent(Button).props('variant')).toBe(expected)
      })
    })

    describe('size', () => {
      it.each([
        { input: undefined, expected: 'md' },
        { input: 'sm', expected: 'sm' },
      ])('passes input=$input as expected=$expected to buttons', ({ input, expected }) => {
        const wrapper = mountPagination({ props: { total: 100, size: input } })

        expect(wrapper.getComponent(Button).props('size')).toBe(expected)
      })
    })

    describe('severity', () => {
      it.each([
        { input: undefined, expected: 'primary' },
        { input: 'success', expected: 'success' },
      ])('passes input=$input as expected=$expected to buttons', ({ input, expected }) => {
        const wrapper = mountPagination({ props: { total: 100, severity: input } })

        expect(wrapper.getComponent(Button).props('severity')).toBe(expected)
      })
    })

    describe('activeColor', () => {
      it.each([
        { input: undefined, expected: undefined },
        { input: '#00ff00', expected: '#00ff00' },
      ])('passes input=$input as expected=$expected to the active page', ({ input, expected }) => {
        const wrapper = mountPagination({ props: { total: 100, activeColor: input } })
        const activeButton = wrapper
          .findAllComponents(Button)
          .find((button) => button.text() === '1')

        expect(activeButton?.props('color')).toBe(expected)
      })
    })

    describe('activeVariant', () => {
      it.each([
        { input: undefined, expected: 'solid' },
        { input: 'plain', expected: 'plain' },
      ])('passes input=$input as expected=$expected to the active page', ({ input, expected }) => {
        const wrapper = mountPagination({ props: { total: 100, activeVariant: input } })
        const activeButton = wrapper
          .findAllComponents(Button)
          .find((button) => button.text() === '1')

        expect(activeButton?.props('variant')).toBe(expected)
      })
    })

    describe('firstIcon', () => {
      testIconProps({
        text: 'renders firstIcon',
        id: '[data-test-pagination-first] [data-test-icon-root]',
        default: 'chevronsLeft',
        mount: (input) => mountPagination({ props: { total: 100, firstIcon: input } }),
      })
    })

    describe('previousIcon', () => {
      testIconProps({
        text: 'renders previousIcon',
        id: '[data-test-pagination-previous] [data-test-icon-root]',
        default: 'chevronLeft',
        mount: (input) => mountPagination({ props: { total: 100, previousIcon: input } }),
      })
    })

    describe('nextIcon', () => {
      testIconProps({
        text: 'renders nextIcon',
        id: '[data-test-pagination-next] [data-test-icon-root]',
        default: 'chevronRight',
        mount: (input) => mountPagination({ props: { total: 100, nextIcon: input } }),
      })
    })

    describe('lastIcon', () => {
      testIconProps({
        text: 'renders lastIcon',
        id: '[data-test-pagination-last] [data-test-icon-root]',
        default: 'chevronsRight',
        mount: (input) => mountPagination({ props: { total: 100, lastIcon: input } }),
      })
    })

    describe('ellipsisIcon', () => {
      testIconProps({
        text: 'renders ellipsisIcon',
        id: '[data-test-pagination-ellipsis] [data-test-icon-root]',
        default: 'moreHorizontal',
        mount: (input) =>
          mountPagination({ props: { total: 100, page: 5, siblingCount: 1, ellipsisIcon: input } }),
      })
    })

    describe('ui', () => {
      describe('root', () => {
        testAttrs({
          text: 'forwards attrs through ui.root',
          id: '[data-test-pagination-root]',
          mount: (attrs) => mountPagination({ props: { ui: { root: () => attrs } } }),
        })
      })
      describe('list', () => {
        testAttrs({
          text: 'forwards attrs through ui.list',
          id: '[data-test-pagination-list]',
          mount: (attrs) => mountPagination({ props: { ui: { list: () => attrs } } }),
        })
      })
      describe('first', () => {
        testAttrs({
          text: 'forwards attrs through ui.first',
          id: '[data-test-pagination-first]',
          mount: (attrs) => mountPagination({ props: { total: 100, ui: { first: () => attrs } } }),
        })
      })
      describe('previous', () => {
        testAttrs({
          text: 'forwards attrs through ui.previous',
          id: '[data-test-pagination-previous]',
          mount: (attrs) =>
            mountPagination({ props: { total: 100, ui: { previous: () => attrs } } }),
        })
      })
      describe('next', () => {
        testAttrs({
          text: 'forwards attrs through ui.next',
          id: '[data-test-pagination-next]',
          mount: (attrs) => mountPagination({ props: { total: 100, ui: { next: () => attrs } } }),
        })
      })
      describe('last', () => {
        testAttrs({
          text: 'forwards attrs through ui.last',
          id: '[data-test-pagination-last]',
          mount: (attrs) => mountPagination({ props: { total: 100, ui: { last: () => attrs } } }),
        })
      })
      describe('item', () => {
        testAttrs({
          text: 'forwards attrs through ui.item',
          id: '[data-test-pagination-item]',
          mount: (attrs) => mountPagination({ props: { ui: { item: () => attrs } } }),
        })
      })
      describe('ellipsis', () => {
        testAttrs({
          text: 'forwards attrs through ui.ellipsis',
          id: '[data-test-pagination-ellipsis]',
          mount: (attrs) =>
            mountPagination({
              props: { total: 100, page: 5, siblingCount: 1, ui: { ellipsis: () => attrs } },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-pagination-root]',
      mount: (attrs) => mountPagination({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:page', () => {
      it('forwards PaginationRoot page updates', async () => {
        const wrapper = mountPagination({ props: { total: 100, page: 1 } })

        await wrapper.getComponent(PaginationRoot).vm.$emit('update:page', 3)
        await nextTick()

        expect(wrapper.emitted('update:page')).toEqual([[3]])
      })
    })
  })

  describe('context contract', () => {
    describe('PaginationContext', () => {
      const pageContextCases = [
        { page: 1, total: 95, itemsPerPage: 10, expectedPageCount: 10 },
        { page: 3, total: 100, itemsPerPage: 20, expectedPageCount: 5 },
        { page: 2, total: 0, itemsPerPage: 10, expectedPageCount: 0 },
      ]

      it.each(pageContextCases)(
        'passes page=$page and pageCount=$expectedPageCount to context',
        ({ page, total, itemsPerPage, expectedPageCount }) => {
          let context: PaginationContext | undefined

          mountPagination({
            props: {
              page,
              total,
              itemsPerPage,
              ui: {
                root: (input) => {
                  context = input
                  return {}
                },
              },
            },
          })

          expect(context).toEqual({
            page,
            pageCount: expectedPageCount,
          })
        },
      )
    })

    describe('PaginationItemContext', () => {
      it('passes item state to item context', () => {
        let context: PaginationItemContext | undefined

        mountPagination({
          props: {
            total: 100,
            page: 2,
            ui: {
              item: (input) => {
                context ??= input
                return {}
              },
            },
          },
        })

        expect(context).toMatchObject({
          item: { type: 'page', value: 1 },
          index: 0,
          active: false,
          first: true,
          last: false,
          page: 2,
          pageCount: 10,
        })
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renders the default slot', () => {
        const wrapper = mountPagination({
          props: { total: 100, page: 2 },
          slots: {
            default: () => h('span', { 'data-test-pagination-slot': 'default' }, 'Default slot'),
          },
        })

        expect(wrapper.get('[data-test-pagination-slot="default"]').text()).toBe('Default slot')
      })

      it('passes PaginationContext as slotProps', () => {
        let slotProps: PaginationContext | undefined

        mountPagination({
          props: { total: 100, page: 2 },
          slots: {
            default: (input: PaginationContext) => {
              slotProps = input
              return h('span')
            },
          },
        })

        expect(slotProps).toEqual({ page: 2, pageCount: 10 })
      })
    })

    describe('preContent', () => {
      it('renders the slot', () => {
        const wrapper = mountPagination({
          props: { total: 100 },
          slots: { preContent: () => h('span', { 'data-test-pagination-slot': 'preContent' }) },
        })

        expect(wrapper.get('[data-test-pagination-slot="preContent"]').exists()).toBe(true)
      })

      it('passes PaginationContext as slotProps', () => {
        let slotProps: PaginationContext | undefined

        mountPagination({
          props: { total: 100 },
          slots: {
            preContent: (input: PaginationContext) => {
              slotProps = input
              return h('span')
            },
          },
        })

        expect(slotProps).toEqual({ page: 1, pageCount: 10 })
      })
    })

    describe('postContent', () => {
      it('renders the slot', () => {
        const wrapper = mountPagination({
          props: { total: 100 },
          slots: { postContent: () => h('span', { 'data-test-pagination-slot': 'postContent' }) },
        })

        expect(wrapper.get('[data-test-pagination-slot="postContent"]').exists()).toBe(true)
      })

      it('passes PaginationContext as slotProps', () => {
        let slotProps: PaginationContext | undefined

        mountPagination({
          props: { total: 100 },
          slots: {
            postContent: (input: PaginationContext) => {
              slotProps = input
              return h('span')
            },
          },
        })

        expect(slotProps).toEqual({ page: 1, pageCount: 10 })
      })
    })

    describe('first', () => {
      it('renders the slot and replaces the default button', () => {
        const wrapper = mountPagination({
          props: { total: 100 },
          slots: { first: () => h('span', { 'data-test-pagination-slot': 'first' }, 'First') },
        })

        expect(wrapper.get('[data-test-pagination-slot="first"]').text()).toBe('First')
        expect(wrapper.find('[data-test-pagination-first] [data-test-button-root]').exists()).toBe(
          false,
        )
      })

      it('passes PaginationContext as slotProps', () => {
        let slotProps: PaginationContext | undefined

        mountPagination({
          props: { total: 100 },
          slots: {
            first: (input: PaginationContext) => {
              slotProps = input
              return h('span')
            },
          },
        })

        expect(slotProps).toEqual({ page: 1, pageCount: 10 })
      })
    })

    describe('previous', () => {
      it('renders the slot and replaces the default button', () => {
        const wrapper = mountPagination({
          props: { total: 100 },
          slots: {
            previous: () => h('span', { 'data-test-pagination-slot': 'previous' }, 'Previous'),
          },
        })

        expect(wrapper.get('[data-test-pagination-slot="previous"]').text()).toBe('Previous')
        expect(
          wrapper.find('[data-test-pagination-previous] [data-test-button-root]').exists(),
        ).toBe(false)
      })

      it('passes PaginationContext as slotProps', () => {
        let slotProps: PaginationContext | undefined

        mountPagination({
          props: { total: 100 },
          slots: {
            previous: (input: PaginationContext) => {
              slotProps = input
              return h('span')
            },
          },
        })

        expect(slotProps).toEqual({ page: 1, pageCount: 10 })
      })
    })

    describe('next', () => {
      it('renders the slot and replaces the default button', () => {
        const wrapper = mountPagination({
          props: { total: 100 },
          slots: { next: () => h('span', { 'data-test-pagination-slot': 'next' }, 'Next') },
        })

        expect(wrapper.get('[data-test-pagination-slot="next"]').text()).toBe('Next')
        expect(wrapper.find('[data-test-pagination-next] [data-test-button-root]').exists()).toBe(
          false,
        )
      })

      it('passes PaginationContext as slotProps', () => {
        let slotProps: PaginationContext | undefined

        mountPagination({
          props: { total: 100 },
          slots: {
            next: (input: PaginationContext) => {
              slotProps = input
              return h('span')
            },
          },
        })

        expect(slotProps).toEqual({ page: 1, pageCount: 10 })
      })
    })

    describe('last', () => {
      it('renders the slot and replaces the default button', () => {
        const wrapper = mountPagination({
          props: { total: 100 },
          slots: { last: () => h('span', { 'data-test-pagination-slot': 'last' }, 'Last') },
        })

        expect(wrapper.get('[data-test-pagination-slot="last"]').text()).toBe('Last')
        expect(wrapper.find('[data-test-pagination-last] [data-test-button-root]').exists()).toBe(
          false,
        )
      })

      it('passes PaginationContext as slotProps', () => {
        let slotProps: PaginationContext | undefined

        mountPagination({
          props: { total: 100 },
          slots: {
            last: (input: PaginationContext) => {
              slotProps = input
              return h('span')
            },
          },
        })

        expect(slotProps).toEqual({ page: 1, pageCount: 10 })
      })
    })

    describe('item', () => {
      it('renders the item slot and replaces the default button', () => {
        const wrapper = mountPagination({
          props: { total: 100, page: 2 },
          slots: {
            item: (context: PaginationItemContext) =>
              h('span', { 'data-test-pagination-slot': 'item' }, `${context.item.value}`),
          },
        })

        expect(wrapper.get('[data-test-pagination-slot="item"]').text()).toBe('1')
        expect(wrapper.find('[data-test-pagination-item] [data-test-button-root]').exists()).toBe(
          false,
        )
      })

      it('passes PaginationItemContext as slotProps', () => {
        let slotProps: PaginationItemContext | undefined

        mountPagination({
          props: { total: 100, page: 2 },
          slots: {
            item: (input: PaginationItemContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toMatchObject({
          item: { type: 'page', value: 1 },
          index: 0,
          active: false,
          first: true,
          last: false,
          page: 2,
          pageCount: 10,
        })
      })
    })

    describe('item-{page}', () => {
      it('renders a page-specific slot before the generic item slot', () => {
        const wrapper = mountPagination({
          props: { total: 100 },
          slots: {
            item: () => h('span', 'Generic item'),
            'item-1': () => h('span', { 'data-test-pagination-slot': 'item-1' }, 'Specific item'),
          },
        })

        expect(wrapper.get('[data-test-pagination-slot="item-1"]').text()).toBe('Specific item')
      })

      it('passes PaginationItemContext as slotProps', () => {
        let slotProps: PaginationItemContext | undefined

        mountPagination({
          props: { total: 100 },
          slots: {
            'item-1': (input: PaginationItemContext) => {
              slotProps = input
              return h('span')
            },
          },
        })

        expect(slotProps).toMatchObject({
          item: { type: 'page', value: 1 },
          index: 0,
          active: true,
          first: true,
          page: 1,
          pageCount: 10,
        })
      })
    })

    describe('ellipsis', () => {
      it('renders the generic ellipsis slot', () => {
        const wrapper = mountPagination({
          props: { total: 100, page: 5, siblingCount: 1 },
          slots: {
            ellipsis: (context: PaginationItemContext) =>
              h('span', { 'data-test-pagination-slot': 'ellipsis' }, `${context.index}`),
          },
        })

        expect(wrapper.findAll('[data-test-pagination-slot="ellipsis"]').length).toBeGreaterThan(0)
      })

      it('passes PaginationItemContext as slotProps', () => {
        let slotProps: PaginationItemContext | undefined

        mountPagination({
          props: { total: 100, page: 5, siblingCount: 1 },
          slots: {
            ellipsis: (input: PaginationItemContext) => {
              slotProps ??= input
              return h('span')
            },
          },
        })

        expect(slotProps).toMatchObject({
          item: { type: 'ellipsis' },
          index: 1,
          active: false,
          page: 5,
          pageCount: 10,
        })
      })
    })

    describe('ellipsis-{index}', () => {
      it('renders an ellipsis-specific slot before the generic ellipsis slot', () => {
        const wrapper = mountPagination({
          props: { total: 100, page: 5, siblingCount: 1 },
          slots: {
            ellipsis: () => h('span', 'Generic ellipsis'),
            'ellipsis-1': () =>
              h('span', { 'data-test-pagination-slot': 'ellipsis-1' }, 'Specific ellipsis'),
          },
        })

        expect(wrapper.get('[data-test-pagination-slot="ellipsis-1"]').text()).toBe(
          'Specific ellipsis',
        )
      })

      it('passes PaginationItemContext as slotProps', () => {
        let slotProps: PaginationItemContext | undefined

        mountPagination({
          props: { total: 100, page: 5, siblingCount: 1 },
          slots: {
            'ellipsis-1': (input: PaginationItemContext) => {
              slotProps = input
              return h('span')
            },
          },
        })

        expect(slotProps).toMatchObject({
          item: { type: 'ellipsis' },
          index: 1,
          active: false,
          page: 5,
          pageCount: 10,
        })
      })
    })
  })
})
