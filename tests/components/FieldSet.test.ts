import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { FieldSet, type FieldSetProps } from '@/components/ui/FieldSet'

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
      const parts = ['legend', 'description', 'group'] as const

      it.each(parts)('renders ui.%s attributes', (part) => {
        const fieldSet = mountFieldSet({
          props: {
            legend: 'Profile',
            description: 'Contact details',
            ui: {
              [part]: () => ({ class: `ui-${part}`, style: 'opacity: 0.8' }),
            },
          },
        })
        const element = fieldSet.get(`[data-test-field-set-${part}]`)

        expect(element.classes()).toContain(`ui-${part}`)
        expect(element.attributes('style')).toContain('opacity: 0.8')
      })
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountFieldSet({
        attrs: {
          id: 'profile',
          disabled: true,
          class: 'custom-field-set',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-field-set-root]')

      expect(root.element.tagName.toLowerCase()).toBe('fieldset')
      expect(root.attributes('id')).toBe('profile')
      expect(root.attributes('disabled')).toBeDefined()
      expect(root.classes()).toContain('custom-field-set')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('slots', () => {
    const slotCases = ['default', 'legend', 'description'] as const

    it.each(slotCases)('renders the $input slot', (input) => {
      const fieldSet = mountFieldSet({
        slots: {
          [input]: () => h('span', { 'data-test-field-set-slot': input }, `Slot ${input}`),
        },
      })

      expect(fieldSet.get(`[data-test-field-set-slot="${input}"]`).text()).toBe(`Slot ${input}`)
    })
  })
})
