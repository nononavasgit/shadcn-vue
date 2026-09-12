import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ListboxRoot } from 'reka-ui'

import { Listbox, type ListboxProps } from '@/components/ui/Listbox'
import { i18n } from '@/i18n'

const casesItems = {
  normal: [{ value: 'apple', label: 'Manzana' }, { value: 'banana', label: 'Plátano' }],
  grouped: [{ value: 'apple', label: 'Manzana' }],
  many: Array.from({ length: 50 }, (_, index) => ({
    value: index,
    label: `Opción ${index}`,
  })),
}

function mountListbox(
  items = casesItems.normal,
  options: MountingOptions<ListboxProps> = {},
) {
  return mount(Listbox, {
    global: { plugins: [i18n], ...options.global },
    props: {
      items,
      ...options.props,
    },
    ...options,
  })
}

const casesValue = [
    { input: 'banana', expected: 'banana' },
    { input: undefined, expected: undefined },
    { input: ['apple', 'banana'], expected: ['apple', 'banana'] },
]

const casesDisabled = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesHighlightOnHover = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: true },
]

const casesMultiple = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

const casesOrientation = [
  { input: 'vertical' as const, expected: 'vertical' },
  { input: 'horizontal' as const, expected: 'horizontal' },
  { input: undefined, expected: 'vertical' },
]

const casesSelectionBehavior = [
  { input: 'toggle' as const, expected: 'toggle' },
  { input: 'replace' as const, expected: 'replace' },
  { input: undefined, expected: 'toggle' },
]

const casesName = [
  { input: 'fruits', expected: 'fruits' },
  { input: undefined, expected: undefined },
]

const casesRequired = [
  { input: true, expected: true },
  { input: false, expected: false },
  { input: undefined, expected: false },
]

describe('Listbox', () => {
  describe('props', () => {
    /** describe('items', () => {
      it.each([
        { name: 'items normales', items: casesItems.normal, expected: 2 },
        { name: 'muchos items', items: casesItems.many, expected: 50 },
      ])('renderiza $name', ({ items, expected }) => {
        const listbox = mountListbox(items)

        expect(listbox.findAll('[data-test-listbox-item]')).toHaveLength(expected)
      })

      it('renderiza items por grupo', () => {
        const listbox = mountListbox(casesItems.grouped, {
          props: { groups: [{ id: 'fruits', label: 'Frutas', items: casesItems.grouped }] },
        })

        expect(listbox.findAll('[data-test-listbox-item]')).toHaveLength(1)
      })
    })**/

    describe('value', () => {
      it.each(casesValue)('pasa value=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, {
          props: { value: input, multiple: Array.isArray(input) },
        })

        expect(listbox.getComponent(ListboxRoot).props('modelValue')).toEqual(expected)
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)('pasa disabled=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { disabled: input } })

        expect(listbox.getComponent(ListboxRoot).props('disabled')).toBe(expected)
      })
    })

    describe('highlightOnHover', () => {
      it.each(casesHighlightOnHover)(
        'pasa highlightOnHover=$input a ListboxRoot',
        ({ input, expected }) => {
          const listbox = mountListbox(undefined, { props: { highlightOnHover: input } })

          expect(listbox.getComponent(ListboxRoot).props('highlightOnHover')).toBe(expected)
        },
      )
    })

    describe('multiple', () => {
      it.each(casesMultiple)('pasa multiple=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { multiple: input } })

        expect(listbox.getComponent(ListboxRoot).props('multiple')).toBe(expected)
      })
    })

    describe('orientation', () => {
      it.each(casesOrientation)('pasa orientation=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { orientation: input } })

        expect(listbox.getComponent(ListboxRoot).props('orientation')).toBe(expected)
      })
    })

    describe('selectionBehavior', () => {
      it.each(casesSelectionBehavior)(
        'pasa selectionBehavior=$input a ListboxRoot',
        ({ input, expected }) => {
          const listbox = mountListbox(undefined, { props: { selectionBehavior: input } })

          expect(listbox.getComponent(ListboxRoot).props('selectionBehavior')).toBe(expected)
        },
      )
    })

    describe('name', () => {
      it.each(casesName)('pasa name=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { name: input } })

        expect(listbox.getComponent(ListboxRoot).props('name')).toBe(expected)
      })
    })

    describe('required', () => {
      it.each(casesRequired)('pasa required=$input a ListboxRoot', ({ input, expected }) => {
        const listbox = mountListbox(undefined, { props: { required: input } })

        expect(listbox.getComponent(ListboxRoot).props('required')).toBe(expected)
      })
    })
  })
})
