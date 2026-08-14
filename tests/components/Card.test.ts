import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Card, createCardContext, type CardContext, type CardProps } from '@/components/ui/Card'

function mountCard(options: MountingOptions<CardProps> = {}) {
  return mount(Card, options)
}

describe('Card', () => {
  describe('props', () => {
    it.each([
      { prop: 'label' as const, value: 'Account', selector: 'label' },
      { prop: 'description' as const, value: 'Account details', selector: 'description' },
    ])('renders $prop', ({ prop, value, selector }) => {
      const card = mountCard({ props: { [prop]: value } })

      expect(card.get(`[data-test-card-${selector}]`).text()).toBe(value)
    })

    it('does not render an empty header', () => {
      expect(mountCard().find('[data-test-card-header]').exists()).toBe(false)
    })

    describe('ui', () => {
      const parts = ['header', 'label', 'description', 'action', 'content', 'footer'] as const

      it.each(parts)('renders ui.%s attributes', (part) => {
        const card = mountCard({
          props: {
            label: 'Account',
            description: 'Account details',
            ui: {
              [part]: () => ({
                class: `ui-${part}`,
                style: 'opacity: 0.8',
              }),
            },
          },
          slots: {
            default: () => 'Content',
            action: () => 'Action',
            footer: () => 'Footer',
          },
        })
        const element = card.get(`[data-test-card-${part}]`)

        expect(element.classes()).toContain(`ui-${part}`)
        expect(element.attributes('style')).toContain('opacity: 0.8')
      })

      it.each(parts)('passes CardContext to ui.%s', (part) => {
        const ui = vi.fn(() => ({}))

        mountCard({
          props: {
            label: 'Account',
            description: 'Account details',
            ui: { [part]: ui },
          },
          slots: {
            default: () => 'Content',
            action: () => 'Action',
            footer: () => 'Footer',
          },
        })

        expect(ui).toHaveBeenCalledWith({
          label: 'Account',
          description: 'Account details',
        } satisfies CardContext)
      })
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountCard({
        attrs: {
          id: 'account',
          'aria-label': 'Account',
          class: 'custom-card',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-card-root]')

      expect(root.attributes('id')).toBe('account')
      expect(root.attributes('aria-label')).toBe('Account')
      expect(root.classes()).toContain('custom-card')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('context contract', () => {
    it.each([
      { input: {}, expected: { label: undefined, description: undefined } },
      {
        input: { label: 'Account', description: 'Account details' },
        expected: { label: 'Account', description: 'Account details' },
      },
    ])('creates the expected context', ({ input, expected }) => {
      expect(createCardContext(input)).toEqual(expected satisfies CardContext)
    })
  })

  describe('slots', () => {
    const slotCases = [
      { input: 'default' as const, expected: 'content' },
      { input: 'header' as const, expected: 'header' },
      { input: 'label' as const, expected: 'label' },
      { input: 'description' as const, expected: 'description' },
      { input: 'action' as const, expected: 'action' },
      { input: 'footer' as const, expected: 'footer' },
    ]

    it.each(slotCases)('renders the $input slot', ({ input, expected }) => {
      const card = mountCard({
        slots: {
          [input]: () => h('span', { 'data-test-card-slot': expected }, `Slot ${expected}`),
        },
      })

      expect(card.get(`[data-test-card-slot="${expected}"]`).text()).toBe(`Slot ${expected}`)
    })

    it('header replaces the label and description fallbacks', () => {
      const card = mountCard({
        props: { label: 'Account', description: 'Account details' },
        slots: { header: () => h('span', 'Custom header') },
      })

      expect(card.get('[data-test-card-header]').text()).toBe('Custom header')
      expect(card.find('[data-test-card-label]').exists()).toBe(false)
      expect(card.find('[data-test-card-description]').exists()).toBe(false)
    })

    it.each(slotCases)('passes CardContext to slot $input', ({ input }) => {
      const slot = vi.fn(() => null)

      mountCard({
        props: { label: 'Account', description: 'Account details' },
        slots: { [input]: slot },
      })

      expect(slot).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'Account', description: 'Account details' }),
      )
    })
  })
})
