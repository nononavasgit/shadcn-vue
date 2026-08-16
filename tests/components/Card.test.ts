import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Card, createCardContext, type CardContext, type CardProps } from '@/components/ui/Card'

function mountCard(options: MountingOptions<CardProps> = {}) {
  return mount(Card, options)
}

describe('Card', () => {
  describe('props', () => {
    describe('label', () => {
      it.each([
        { input: 'Account', expected: 'Account' },
        { input: '', expected: '' },
        { input: undefined, expected: undefined },
      ])('renders label=$input', ({ input, expected }) => {
        const card = mountCard({ props: { label: input } })

        expect(card.find('[data-test-card-label]').exists()).toBe(Boolean(expected))
        if (expected) expect(card.get('[data-test-card-label]').text()).toBe(expected)
      })
    })

    describe('description', () => {
      it.each([
        { input: 'Account details', expected: 'Account details' },
        { input: '', expected: '' },
        { input: undefined, expected: undefined },
      ])('renders description=$input', ({ input, expected }) => {
        const card = mountCard({ props: { description: input } })

        expect(card.find('[data-test-card-description]').exists()).toBe(Boolean(expected))
        if (expected) expect(card.get('[data-test-card-description]').text()).toBe(expected)
      })
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
      {
        input: {},
        expected: { ui: undefined },
      },
      {
        input: { ui: { label: () => ({ class: 'ui-label' }) } },
        expected: { ui: { label: expect.any(Function) } },
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

    it('header slot replaces the label and description fallbacks', () => {
      const card = mountCard({
        props: { label: 'Account', description: 'Account details' },
        slots: { header: () => h('span', 'Custom header') },
      })

      expect(card.get('[data-test-card-header]').text()).toBe('Custom header')
      expect(card.find('[data-test-card-label]').exists()).toBe(false)
      expect(card.find('[data-test-card-description]').exists()).toBe(false)
    })
  })
})
