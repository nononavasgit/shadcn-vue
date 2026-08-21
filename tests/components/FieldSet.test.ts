import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { FieldSet, type FieldSetProps } from '@/components/ui/FieldSet'
import { testAttrs } from '../utils/testAttrs'

function mountFieldSet(options: MountingOptions<FieldSetProps> = {}) {
  return mount(FieldSet, options)
}

describe('FieldSet', () => {
  describe('props', () => {
    describe('legend', () => {
      it.each([
        { input: 'Profile', expected: 'Profile' },
        { input: '', expected: undefined },
        { input: undefined, expected: undefined },
      ])('renders legend=$input', ({ input, expected }) => {
        const fieldSet = mountFieldSet({ props: { legend: input } })

        expect(fieldSet.find('[data-test-field-set-legend]').exists()).toBe(Boolean(expected))
        if (expected) expect(fieldSet.get('[data-test-field-set-legend]').text()).toBe(expected)
      })
    })

    describe('description', () => {
      it.each([
        { input: 'Contact details', expected: 'Contact details' },
        { input: '', expected: undefined },
        { input: undefined, expected: undefined },
      ])('renders description=$input', ({ input, expected }) => {
        const fieldSet = mountFieldSet({ props: { description: input } })

        expect(fieldSet.find('[data-test-field-set-description]').exists()).toBe(Boolean(expected))
        if (expected) {
          expect(fieldSet.get('[data-test-field-set-description]').text()).toBe(expected)
        }
      })
    })

    describe('legendVariant', () => {
      it.each([
        { input: 'legend' as const, expected: 'text-base' },
        { input: 'label' as const, expected: 'text-sm' },
        { input: undefined, expected: 'text-base' },
      ])('renders legendVariant=$input', ({ input, expected }) => {
        const legend = mountFieldSet({ props: { legend: 'Profile', legendVariant: input } }).get(
          '[data-test-field-set-legend]',
        )

        expect(legend.classes()).toContain(expected)
      })
    })

    describe('ui', () => {
      describe('legend', () => {
        testAttrs({
          text: 'renders ui.legend attributes',
          id: '[data-test-field-set-legend]',
          mount: (attrs) =>
            mountFieldSet({
              props: { legend: 'Profile', ui: { legend: () => attrs } },
            }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'renders ui.description attributes',
          id: '[data-test-field-set-description]',
          mount: (attrs) =>
            mountFieldSet({
              props: { description: 'Contact details', ui: { description: () => attrs } },
            }),
        })
      })

      describe('group', () => {
        testAttrs({
          text: 'renders ui.group attributes',
          id: '[data-test-field-set-group]',
          mount: (attrs) => mountFieldSet({ props: { ui: { group: () => attrs } } }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-field-set-root]',
      mount: (attrs) => mountFieldSet({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renders the default slot', () => {
        const fieldSet = mountFieldSet({
          slots: {
            default: () => h('span', { 'data-test-field-set-slot': 'default' }, 'Slot default'),
          },
        })

        expect(fieldSet.get('[data-test-field-set-slot="default"]').text()).toBe('Slot default')
      })
    })

    describe('legend', () => {
      it('renders the legend slot and hides the legend fallback', () => {
        const fieldSet = mountFieldSet({
          props: { legend: 'Legend fallback' },
          slots: {
            legend: () => h('span', { 'data-test-field-set-slot': 'legend' }, 'Slot legend'),
          },
        })

        expect(fieldSet.get('[data-test-field-set-slot="legend"]').text()).toBe('Slot legend')
        expect(fieldSet.get('[data-test-field-set-root]').text()).not.toContain('Legend fallback')
      })
    })

    describe('description', () => {
      it('renders the description slot and hides the description fallback', () => {
        const fieldSet = mountFieldSet({
          props: { description: 'Description fallback' },
          slots: {
            description: () =>
              h('span', { 'data-test-field-set-slot': 'description' }, 'Slot description'),
          },
        })

        expect(fieldSet.get('[data-test-field-set-slot="description"]').text()).toBe(
          'Slot description',
        )
        expect(fieldSet.get('[data-test-field-set-root]').text()).not.toContain(
          'Description fallback',
        )
      })
    })
  })
})
