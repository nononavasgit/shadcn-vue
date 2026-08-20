import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Card, type CardProps } from '@/components/ui/Card'
import { testAttrs } from '../utils/testAttrs'

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
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-card-root]',
      mount: (attrs) => mountCard({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renders the default slot', () => {
        const card = mountCard({
          slots: { default: () => h('span', { 'data-test-card-slot': 'default' }, 'Default') },
        })

        expect(card.get('[data-test-card-slot="default"]').text()).toBe('Default')
      })
    })

    describe('header', () => {
      it('renders the header slot and hides label and description fallbacks', () => {
        const card = mountCard({
          props: { label: 'Account', description: 'Account details' },
          slots: { header: () => h('span', { 'data-test-card-slot': 'header' }, 'Header') },
        })

        expect(card.get('[data-test-card-slot="header"]').text()).toBe('Header')
        expect(card.find('[data-test-card-label]').exists()).toBe(false)
        expect(card.find('[data-test-card-description]').exists()).toBe(false)
      })
    })

    describe('label', () => {
      it('renders the label slot and hides the label fallback', () => {
        const card = mountCard({
          props: { label: 'Label fallback' },
          slots: { label: () => h('span', { 'data-test-card-slot': 'label' }, 'Label') },
        })

        expect(card.get('[data-test-card-slot="label"]').text()).toBe('Label')
        expect(card.get('[data-test-card-root]').text()).not.toContain('Label fallback')
      })
    })

    describe('description', () => {
      it('renders the description slot and hides the description fallback', () => {
        const card = mountCard({
          props: { description: 'Description fallback' },
          slots: {
            description: () => h('span', { 'data-test-card-slot': 'description' }, 'Description'),
          },
        })

        expect(card.get('[data-test-card-slot="description"]').text()).toBe('Description')
        expect(card.get('[data-test-card-root]').text()).not.toContain('Description fallback')
      })
    })

    describe('action', () => {
      it('renders the action slot', () => {
        const card = mountCard({
          slots: { action: () => h('span', { 'data-test-card-slot': 'action' }, 'Action') },
        })

        expect(card.get('[data-test-card-slot="action"]').text()).toBe('Action')
      })
    })

    describe('footer', () => {
      it('renders the footer slot', () => {
        const card = mountCard({
          slots: { footer: () => h('span', { 'data-test-card-slot': 'footer' }, 'Footer') },
        })

        expect(card.get('[data-test-card-slot="footer"]').text()).toBe('Footer')
      })
    })
  })
})
