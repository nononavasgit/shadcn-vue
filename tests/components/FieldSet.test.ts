import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import {
  createFieldSetContext,
  FieldSet,
  type FieldSetContext,
  type FieldSetProps,
} from '@/components/ui/FieldSet'

function mountFieldSet(options: MountingOptions<FieldSetProps> = {}) {
  return mount(FieldSet, options)
}

describe('FieldSet', () => {
  describe('props', () => {
    it.each([
      { prop: 'legend' as const, value: 'Profile', selector: 'legend' },
      { prop: 'description' as const, value: 'Contact details', selector: 'description' },
    ])('renders $prop', ({ prop, value, selector }) => {
      const fieldSet = mountFieldSet({ props: { [prop]: value } })

      expect(fieldSet.get(`[data-test-field-set-${selector}]`).text()).toBe(value)
    })

    it('does not render empty optional parts', () => {
      const fieldSet = mountFieldSet()

      expect(fieldSet.find('[data-test-field-set-legend]').exists()).toBe(false)
      expect(fieldSet.find('[data-test-field-set-description]').exists()).toBe(false)
      expect(fieldSet.find('[data-test-field-set-group]').exists()).toBe(true)
    })

    describe('legendVariant', () => {
      it.each([
        { input: 'legend' as const, expected: 'text-base' },
        { input: 'label' as const, expected: 'text-sm' },
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

      it.each(parts)('passes FieldSetContext to ui.%s', (part) => {
        const ui = vi.fn(() => ({}))

        mountFieldSet({
          props: {
            legend: 'Profile',
            description: 'Contact details',
            legendVariant: 'label',
            ui: { [part]: ui },
          },
        })

        expect(ui).toHaveBeenCalledWith({
          legend: 'Profile',
          description: 'Contact details',
          legendVariant: 'label',
        } satisfies FieldSetContext)
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

  describe('context contract', () => {
    it.each([
      {
        name: 'default values',
        input: {},
        expected: {
          legend: undefined,
          description: undefined,
          legendVariant: 'legend',
        },
      },
      {
        name: 'configured values',
        input: {
          legend: 'Profile',
          description: 'Contact details',
          legendVariant: 'label' as const,
        },
        expected: {
          legend: 'Profile',
          description: 'Contact details',
          legendVariant: 'label',
        },
      },
    ])('creates the contract with $name', ({ input, expected }) => {
      expect(createFieldSetContext(input)).toEqual(expected satisfies FieldSetContext)
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

    it.each(slotCases)('passes FieldSetContext to slot $input', (input) => {
      const slot = vi.fn(() => null)

      mountFieldSet({
        props: {
          legend: 'Profile',
          description: 'Contact details',
          legendVariant: 'label',
        },
        slots: { [input]: slot },
      })

      expect(slot).toHaveBeenCalledWith(
        expect.objectContaining({
          legend: 'Profile',
          description: 'Contact details',
          legendVariant: 'label',
        }),
      )
    })
  })
})
