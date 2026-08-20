import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Accordion,
  createAccordionItemContext,
  type AccordionItemContext,
  type AccordionProps,
  type AccordionValue,
} from '@/components/ui/Accordion'
import { testAttrs } from '../utils/testAttrs'
import { testIconProps } from '../utils/testIconProps'

const items = [
  {
    value: 'first',
    label: 'First',
    description: 'First description',
    icon: { name: 'info' },
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

    describe('value', () => {
      it.each([
        { input: 'item' as AccordionValue, expected: 'item' },
        { input: ['first', 'second'] as AccordionValue, expected: ['first', 'second'] },
        { input: undefined, expected: undefined },
      ])('passes value=$input to root', ({ input, expected }) => {
        const accordion = mountAccordion({
          props: {
            value: input,
            type: Array.isArray(input) ? 'multiple' : 'single',
            items: [{ value: 'first' }, { value: 'second' }],
          },
        })

        expect(accordion.getComponent('[data-test-accordion-root]').props('modelValue')).toEqual(
          expected,
        )
      })
    })

    describe('iconDropDownOpen', () => {
      testIconProps({
        text: 'passes iconDropDownOpen props',
        id: '[data-test-accordion-icon-dropdown="item"]',
        default: 'chevronUp',
        mount: (input) =>
          mountAccordion({
            props: {
              value: 'item',
              items: [{ value: 'item' }],
              iconDropDownOpen: input,
            },
          }),
      })
    })

    describe('iconDropDownClose', () => {
      testIconProps({
        text: 'passes iconDropDownClose props',
        id: '[data-test-accordion-icon-dropdown="item"]',
        default: 'chevronDown',
        mount: (input) =>
          mountAccordion({
            props: {
              value: undefined,
              items: [{ value: 'item' }],
              iconDropDownClose: input,
            },
          }),
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
        testIconProps({
          text: 'passes item.icon props',
          id: '[data-test-accordion-icon="item"]',
          mount: (input) =>
            mountAccordion({
              props: {
                items: [{ value: 'item', icon: input }],
              },
            }),
        })
      })
    })

    describe('ui', () => {
      describe('item', () => {
        testAttrs({
          text: 'renders ui.item attributes',
          id: '[data-test-accordion-item="item"]',
          mount: (attrs) =>
            mountAccordion({
              props: {
                items: [{ value: 'item' }],
                ui: { item: () => attrs },
              },
            }),
        })
      })

      describe('trigger', () => {
        testAttrs({
          text: 'renders ui.trigger attributes',
          id: '[data-test-accordion-trigger="item"]',
          mount: (attrs) =>
            mountAccordion({
              props: {
                items: [{ value: 'item' }],
                ui: { trigger: () => attrs },
              },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'renders ui.content attributes',
          id: '[data-test-accordion-content="item"]',
          assertId: false,
          mount: (attrs) =>
            mountAccordion({
              props: {
                value: 'item',
                items: [{ value: 'item' }],
                ui: { content: () => attrs },
              },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-accordion-root]',
      mount: (attrs) => mountAccordion({ attrs }),
    })
  })

  describe('context contract', () => {
    describe('AccordionItemContext', () => {
      it.each([
        {
          name: 'first open item in single mode',
          input: { index: 0, value: 'first' as AccordionValue },
          expected: { open: true, first: true, last: false },
        },
        {
          name: 'middle closed item in single mode',
          input: { index: 1, value: 'first' as AccordionValue },
          expected: { open: false, first: false, last: false },
        },
        {
          name: 'last open item in multiple mode',
          input: { index: 2, value: ['first', 'last'] as AccordionValue },
          expected: { open: true, first: false, last: true },
        },
        {
          name: 'middle closed item in multiple mode',
          input: { index: 1, value: ['first', 'last'] as AccordionValue },
          expected: { open: false, first: false, last: false },
        },
        {
          name: 'first closed item without value',
          input: { index: 0, value: undefined },
          expected: { open: false, first: true, last: false },
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

  })

  describe('slots', () => {
    const slotCases = [
      { input: 'trigger' as const, expected: 'trigger' },
      { input: 'leading' as const, expected: 'leading' },
      { input: 'label' as const, expected: 'label' },
      { input: 'iconDropdown' as const, expected: 'iconDropdown' },
      { input: 'content' as const, expected: 'content' },
    ]

    const itemSlotCases = [
      { input: 'trigger' as const, expected: 'trigger' },
      { input: 'leading' as const, expected: 'leading' },
      { input: 'label' as const, expected: 'label' },
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
    })

    describe('item-specific', () => {
      it.each(itemSlotCases)('renders the $input-{item.slot} slot', ({ input, expected }) => {
        const slotName = `${input}-custom`
        const accordion = mountAccordion({
          props: { value: 'item', items: [{ value: 'item', slot: 'custom' }] },
          slots: {
            [slotName]: () =>
              h('span', { 'data-test-accordion-slot': expected }, `Slot ${expected}`),
          },
        })

        expect(accordion.get(`[data-test-accordion-slot="${expected}"]`).text()).toBe(
          `Slot ${expected}`,
        )
      })
    })
  })
})
