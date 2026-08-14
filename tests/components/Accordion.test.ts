import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import {
  Accordion,
  createAccordionContext,
  createAccordionItemContext,
  type AccordionContext,
  type AccordionItemContext,
  type AccordionProps,
  type AccordionValue,
} from '@/components/ui/Accordion'

const items = [
  {
    value: 'first',
    label: 'First',
    description: 'First description',
    icon: 'info',
    unmountOnHide: true,
  },
  {
    value: 'second',
    label: 'Second',
    description: 'Second description',
    icon: { name: 'error', color: 'green ' },
    unmountOnHide: false,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    description: 'Disabled description',
    disabled: true,
    unmountOnHide: undefined,
  },
]

function mountAccordion(options: MountingOptions<AccordionProps> = {}) {
  const wrapper = mount(Accordion, {
    ...options,
    props: {
      items,
      ...options.props,
      'onUpdate:value': async (value: AccordionValue) => {
        await wrapper.setProps({ value })
      },
    },
  })

  return wrapper
}

describe('Accordion', () => {
  describe('props', () => {
    /** Reka prop */
    describe('disabled', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('passes disabled=$input to root as $expected', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            disabled: input,
          },
        })

        expect(accordion.getComponent('[data-test-accordion-root]').props('disabled')).toBe(
          expected,
        )
      })
    })

    /** Reka prop */
    describe('collapsible', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('passes collapsible=$input to root as $expected', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            collapsible: input,
          },
        })

        expect(accordion.getComponent('[data-test-accordion-root]').props('collapsible')).toBe(
          expected,
        )
      })
    })

    /** Reka prop */
    describe('unmountOnHide', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: true },
      ])('passes unmountOnHide=$input to root as $expected', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            unmountOnHide: input,
          },
        })

        expect(accordion.getComponent('[data-test-accordion-root]').props('unmountOnHide')).toBe(
          expected,
        )
      })
    })

    /** Reka prop */
    describe('type', () => {
      it.each([
        { input: 'single' as const, expected: 'single' },
        { input: 'multiple' as const, expected: 'multiple' },
        { input: undefined, expected: 'single' },
      ])('passes type=$input to root as $expected', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            type: input,
          },
        })

        expect(accordion.getComponent('[data-test-accordion-root]').props('type')).toBe(expected)
      })
    })

    describe('iconDropDownOpen / iconDropDownClose', () => {
      it.each([
        {
          name: 'configured open icon',
          input: { value: 'item', open: 'check' as const, close: 'x' as const },
          expected: 'check',
        },
        {
          name: 'configured closed icon',
          input: { value: undefined, open: 'check' as const, close: 'x' as const },
          expected: 'x',
        },
        {
          name: 'default open icon',
          input: { value: 'item', open: undefined, close: undefined },
          expected: 'chevronUp',
        },
        {
          name: 'default closed icon',
          input: { value: undefined, open: undefined, close: undefined },
          expected: 'chevronDown',
        },
      ])('renders $name as $expected', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            value: input.value,
            items: [{ value: 'item' }],
            iconDropDownOpen: input.open,
            iconDropDownClose: input.close,
          },
        })

        expect(
          accordion.getComponent('[data-test-accordion-icon-dropdown="item"]').props('name'),
        ).toBe(expected)
      })

      it('updates dropdown icon when value changes externally', async () => {
        const accordion = mountAccordion({
          props: {
            value: 'first',
            items: [{ value: 'first' }, { value: 'second' }],
            iconDropDownOpen: 'check',
            iconDropDownClose: 'x',
          },
        })

        await accordion.setProps({ value: 'second' })

        expect(
          accordion.getComponent('[data-test-accordion-icon-dropdown="first"]').props('name'),
        ).toBe('x')

        expect(
          accordion.getComponent('[data-test-accordion-icon-dropdown="second"]').props('name'),
        ).toBe('check')
      })
    })

    describe('items', () => {
      it('renders no items when items is undefined', () => {
        const accordion = mountAccordion({
          props: {
            items: undefined,
          },
        })

        expect(accordion.findAll('[data-test-accordion-item]').length).toBe(0)
      })

      it('renders all items when items is defined', () => {
        const accordion = mountAccordion({
          props: {
            items: [
              { value: 'first', label: 'First' },
              { value: 'second', label: 'Second' },
            ],
          },
        })

        expect(accordion.findAll('[data-test-accordion-item]').length).toBe(2)
      })

      // Reka props item
      describe('disabled', () => {
        it.each([
          { input: true, expected: true },
          { input: false, expected: false },
          { input: undefined, expected: undefined },
        ])('passes item disabled=$input as $expected', ({ input, expected }) => {
          const accordion = mountAccordion({
            props: {
              items: [{ value: 'item', disabled: input }],
            },
          })

          expect(
            accordion.getComponent('[data-test-accordion-item="item"]').props('disabled'),
          ).toBe(expected)
        })
      })

      /** Reka props item */
      describe('unmountOnHide', () => {
        it.each([
          { input: true, expected: true },
          { input: false, expected: false },
          { input: undefined, expected: true },
        ])('passes item unmountOnHide=$input as $expected', ({ input, expected }) => {
          const accordion = mountAccordion({
            props: {
              items: [{ value: 'item', unmountOnHide: input }],
            },
          })

          expect(
            accordion.getComponent('[data-test-accordion-item="item"]').props('unmountOnHide'),
          ).toBe(expected)
        })
      })

      describe('label', () => {
        it.each([
          { input: 'Label', expected: 'Label' },
          { input: undefined, expected: '' },
        ])('renders item label=$input as "$expected"', ({ input, expected }) => {
          const accordion = mountAccordion({
            props: {
              items: [{ value: 'item', label: input }],
            },
          })

          expect(accordion.get('[data-test-accordion-label="item"]').text()).toBe(expected)
        })
      })

      describe('description', () => {
        it.each([
          {
            name: 'open item',
            input: { description: 'Description', open: true },
            expected: { exists: true, text: 'Description' },
          },
          {
            name: 'open item without description',
            input: { description: undefined, open: true },
            expected: { exists: true, text: '' },
          },
          {
            name: 'closed item with unmountOnHide=true',
            input: { description: 'Description', open: false, itemUnmountOnHide: true },
            expected: { exists: false },
          },
          {
            name: 'closed item with unmountOnHide=false',
            input: { description: 'Description', open: false, itemUnmountOnHide: false },
            expected: { exists: true, text: 'Description' },
          },
          {
            name: 'closed item inheriting root unmountOnHide=true',
            input: { description: 'Description', open: false, rootUnmountOnHide: true },
            expected: { exists: false },
          },
          {
            name: 'closed item inheriting root unmountOnHide=false',
            input: { description: 'Description', open: false, rootUnmountOnHide: false },
            expected: { exists: true, text: 'Description' },
          },
        ])('renders description for $name', ({ input, expected }) => {
          const accordion = mountAccordion({
            props: {
              value: input.open ? 'item' : undefined,
              unmountOnHide: input.rootUnmountOnHide,
              items: [
                {
                  value: 'item',
                  description: input.description,
                  unmountOnHide: input.itemUnmountOnHide,
                },
              ],
            },
          })
          const description = accordion.find('[data-test-accordion-description="item"]')

          expect(description.exists()).toBe(expected.exists)

          if (expected.exists) expect(description.text()).toBe(expected.text)
        })
      })

      describe('icon', () => {
        it.each([
          { input: 'info' as const, expected: 'info' },
          { input: { name: 'error' as const, color: 'green' }, expected: 'error' },
          { input: undefined, expected: undefined },
        ])('renders item icon=$input as $expected', ({ input, expected }) => {
          const accordion = mountAccordion({
            props: {
              items: [{ value: 'item', icon: input }],
            },
          })
          const icon = accordion.findComponent('[data-test-accordion-icon="item"]')

          if (expected === undefined) {
            expect(icon.exists()).toBe(false)
            return
          }

          expect(icon.props('name')).toBe(expected)
        })
      })
    })

    describe('ui', () => {
      it.each([
        { input: 'root' as const, expected: 'root' },
        { input: 'item' as const, expected: 'item' },
        { input: 'trigger' as const, expected: 'trigger' },
        { input: 'content' as const, expected: 'content' },
      ])('renders ui.$input attributes on $expected', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            value: 'item',
            items: [{ value: 'item' }],
            ui: {
              [input]: () => ({
                class: `ui-${input}`,
                style: 'opacity: 0.8',
                'data-test-accordion-ui': input,
              }),
            },
          },
        })
        const element = accordion.get(`[data-test-accordion-ui="${expected}"]`)

        expect(element.classes()).toContain(`ui-${expected}`)
        expect(element.attributes('style')).toContain('opacity: 0.8')
      })

      describe('context', () => {
        it('passes AccordionContext to ui.root', () => {
          const root = vi.fn(() => ({}))

          mountAccordion({
            props: {
              value: 'item',
              type: 'multiple',
              collapsible: true,
              disabled: true,
              unmountOnHide: false,
              items: [{ value: 'item' }],
              ui: { root },
            },
          })

          expect(root).toHaveBeenCalledWith({
            value: 'item',
            type: 'multiple',
            collapsible: true,
            disabled: true,
            unmountOnHide: false,
          } satisfies AccordionContext)
        })

        it.each([
          { input: 'item' as const, expected: 'item' },
          { input: 'trigger' as const, expected: 'trigger' },
          { input: 'content' as const, expected: 'content' },
        ])('passes AccordionItemContext to ui.$expected', ({ input }) => {
          const ui = vi.fn(() => ({}))
          const item = { value: 'item', label: 'Label' }

          mountAccordion({
            props: {
              value: 'item',
              items: [item],
              ui: { [input]: ui },
            },
          })

          expect(ui).toHaveBeenCalledWith({
            item,
            index: 0,
            open: true,
            first: true,
            last: true,
          } satisfies AccordionItemContext)
        })
      })
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs to root', () => {
      const accordion = mountAccordion({
        attrs: {
          id: 'questions',
          'aria-label': 'Questions',
          'data-testid': 'accordion',
        },
      })

      expect(accordion.attributes('id')).toBe('questions')
      expect(accordion.attributes('aria-label')).toBe('Questions')
      expect(accordion.attributes('data-testid')).toBe('accordion')
    })

    it('forwards class to root', () => {
      const accordion = mountAccordion({
        attrs: {
          class: 'custom-accordion',
        },
      })

      expect(accordion.classes()).toContain('custom-accordion')
    })

    it('forwards style to root', () => {
      const accordion = mountAccordion({
        attrs: {
          style: 'opacity: 0.5',
        },
      })

      expect(accordion.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('context contract', () => {
    describe('AccordionContext', () => {
      it.each([
        {
          name: 'default values',
          input: { props: {}, value: undefined },
          expected: {
            value: undefined,
            type: 'single',
            collapsible: false,
            disabled: false,
            unmountOnHide: true,
          },
        },
        {
          name: 'configured values',
          input: {
            props: {
              type: 'multiple' as const,
              collapsible: true,
              disabled: true,
              unmountOnHide: false,
            },
            value: ['first', 'second'],
          },
          expected: {
            value: ['first', 'second'],
            type: 'multiple',
            collapsible: true,
            disabled: true,
            unmountOnHide: false,
          },
        },
      ])('creates the contract with $name', ({ input, expected }) => {
        const context = createAccordionContext(input.props, input.value)

        expect(context).toEqual(expected satisfies AccordionContext)
      })
    })

    describe('AccordionItemContext', () => {
      it.each([
        {
          name: 'first open item in single mode',
          input: { index: 0, value: 'first' },
          expected: { open: true, first: true, last: false },
        },
        {
          name: 'middle closed item in single mode',
          input: { index: 1, value: 'first' },
          expected: { open: false, first: false, last: false },
        },
        {
          name: 'last open item in multiple mode',
          input: { index: 2, value: ['first', 'last'] },
          expected: { open: true, first: false, last: true },
        },
      ])('creates the contract for $name', ({ input, expected }) => {
        const contextItems = [{ value: 'first' }, { value: 'middle' }, { value: 'last' }]
        const item = contextItems[input.index]
        const context = createAccordionItemContext(
          item,
          input.index,
          input.value,
          contextItems.length,
        )

        expect(context).toEqual({
          item,
          index: input.index,
          ...expected,
        } satisfies AccordionItemContext)
      })
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it.each([
        {
          name: 'opens an item in single mode',
          input: { type: 'single' as const, value: undefined, collapsible: false },
          expected: 'first',
        },
        {
          name: 'closes an item in collapsible single mode',
          input: { type: 'single' as const, value: 'first', collapsible: true },
          expected: undefined,
        },
        {
          name: 'opens an item in multiple mode',
          input: { type: 'multiple' as const, value: ['second'] as string[], collapsible: false },
          expected: ['second', 'first'],
        },
      ])('$name', async ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            type: input.type,
            value: input.value,
            collapsible: input.collapsible,
            items: [
              { value: 'first', label: '1' },
              { value: 'second', label: '2' },
            ],
          },
        })

        await accordion.get('[data-test-accordion-trigger="first"]').trigger('click')

        expect(accordion.emitted('update:value')).toEqual([[expected]])
      })
    })

    describe('valueChange', () => {
      it.each([
        {
          name: 'single value',
          input: { type: 'single' as const, value: undefined },
          expected: 'first',
        },
        {
          name: 'multiple value',
          input: { type: 'multiple' as const, value: [] as string[] },
          expected: ['first'],
        },
      ])('emits when user changes $name', async ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            type: input.type,
            value: input.value,
            items: [{ value: 'first' }],
          },
        })

        await accordion.get('[data-test-accordion-trigger="first"]').trigger('click')

        expect(accordion.emitted('valueChange')).toEqual([[expected]])
      })

      it.each([
        { input: { initial: 'first', type: 'single', next: 'second' }, expected: 'second' },
        {
          input: { initial: ['first'], type: 'multiple', next: ['first', 'second'] },
          expected: ['first', 'second'],
        },
      ])('emits $expected after an external change', async ({ input, expected }) => {
        const accordion = mount(Accordion, {
          props: {
            items: [{ value: 'first' }, { value: 'second' }],
            value: input.initial,
            type: input.type,
          },
        })

        await accordion.setProps({ value: input.next })

        expect(accordion.emitted('valueChange')).toEqual([[expected]])
      })

      it('does not emit when value stays the same', async () => {
        const accordion = mount(Accordion, {
          props: {
            items: [{ value: 'first' }],
            value: 'first',
          },
        })

        await accordion.setProps({ value: 'first' })

        expect(accordion.emitted('valueChange')).toBeUndefined()
      })
    })
  })

  describe('slots', () => {
    const slotCases = [
      { input: 'trigger' as const, expected: 'trigger' },
      { input: 'icon' as const, expected: 'icon' },
      { input: 'label' as const, expected: 'label' },
      { input: 'iconDropdown' as const, expected: 'iconDropdown' },
      { input: 'content' as const, expected: 'content' },
    ]

    describe('global', () => {
      it.each(slotCases)('renders the $input slot', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: { value: 'item', items: [{ value: 'item' }] },
          slots: {
            [input]: () => h('span', { 'data-test-accordion-slot': expected }, `Slot ${expected}`),
          },
        })

        expect(accordion.get(`[data-test-accordion-slot="${expected}"]`).text()).toBe(
          `Slot ${expected}`,
        )
      })

      it.each(slotCases)('passes AccordionItemContext to $input', ({ input }) => {
        const slot = vi.fn(() => null)
        const item = { value: 'item', label: 'Label' }

        mountAccordion({
          props: { value: 'item', items: [item] },
          slots: { [input]: slot },
        })

        const expected = {
          item,
          index: 0,
          open: true,
          first: true,
          last: true,
        } satisfies AccordionItemContext

        expect(slot).toHaveBeenCalledWith(expect.objectContaining(expected))
      })
    })

    describe('item-specific', () => {
      it.each(slotCases)('renders the $input-{item.value} slot', ({ input, expected }) => {
        const slotName = `${input}-item`
        const accordion = mountAccordion({
          props: { value: 'item', items: [{ value: 'item' }] },
          slots: {
            [slotName]: () =>
              h('span', { 'data-test-accordion-slot': expected }, `Slot ${expected}`),
          },
        })

        expect(accordion.get(`[data-test-accordion-slot="${expected}"]`).text()).toBe(
          `Slot ${expected}`,
        )
      })

      it.each(slotCases)('passes AccordionItemContext to $input-{item.value}', ({ input }) => {
        const slot = vi.fn(() => null)
        const item = { value: 'item', label: 'Label' }

        mountAccordion({
          props: { value: 'item', items: [item] },
          slots: { [`${input}-item`]: slot },
        })

        const expected = {
          item,
          index: 0,
          open: true,
          first: true,
          last: true,
        } satisfies AccordionItemContext

        expect(slot).toHaveBeenCalledWith(expect.objectContaining(expected))
      })
    })
  })
})
