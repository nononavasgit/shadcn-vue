import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Empty, type EmptyProps } from '@/components/ui/Empty'
import { testAttrs } from '../utils/testAttrs'

function mountEmpty(options: MountingOptions<EmptyProps> = {}) {
  return mount(Empty, options)
}

describe('Empty', () => {
  describe('props', () => {
    describe('label', () => {
      it.each([
        { input: 'No results', expected: 'No results' },
        { input: '', expected: undefined },
        { input: undefined, expected: undefined },
      ])('renders label=$input', ({ input, expected }) => {
        const empty = mountEmpty({ props: { label: input } })

        expect(empty.find('[data-test-empty-label]').exists()).toBe(Boolean(expected))
        if (expected) expect(empty.get('[data-test-empty-label]').text()).toBe(expected)
      })
    })

    describe('description', () => {
      it.each([
        { input: 'Try another search.', expected: 'Try another search.' },
        { input: '', expected: undefined },
        { input: undefined, expected: undefined },
      ])('renders description=$input', ({ input, expected }) => {
        const empty = mountEmpty({ props: { description: input } })

        expect(empty.find('[data-test-empty-description]').exists()).toBe(Boolean(expected))
        if (expected) expect(empty.get('[data-test-empty-description]').text()).toBe(expected)
      })
    })

    describe('mediaVariant', () => {
      it.each([
        { input: 'default' as const, expected: 'default' as const },
        { input: 'icon' as const, expected: 'icon' as const },
        { input: undefined, expected: 'default' as const },
      ])('renders mediaVariant=$input', ({ input, expected }) => {
        const empty = mountEmpty({
          props: { mediaVariant: input },
          slots: { media: () => h('span', 'Media') },
        })

        const media = empty.get('[data-test-empty-media]')

        expect(media.attributes('data-variant')).toBe(expected)
        expect(media.classes().includes('size-10')).toBe(expected === 'icon')
        expect(media.classes().includes('bg-muted')).toBe(expected === 'icon')
        expect(media.classes().includes('text-foreground')).toBe(expected === 'icon')
      })
    })

    describe('ui', () => {
      const parts = ['header', 'media', 'label', 'description', 'content'] as const

      it.each(parts)('renders ui.%s attributes', (part) => {
        const empty = mountEmpty({
          props: {
            label: 'No results',
            description: 'Try another search.',
            mediaVariant: 'icon',
            ui: {
              [part]: () => ({
                id: `ui-${part}`,
                class: `ui-${part}`,
                style: 'opacity: 0.8',
              }),
            },
          },
          slots: {
            media: () => h('span', 'Media'),
            default: () => h('button', 'Action'),
          },
        })

        const element = empty.get(`[data-test-empty-${part}]`)

        expect(element.attributes('id')).toBe(`ui-${part}`)
        expect(element.classes()).toContain(`ui-${part}`)
        expect(element.attributes('style')).toContain('opacity: 0.8')
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-empty-root]',
      mount: (attrs) => mountEmpty({ attrs }),
    })
  })

  describe('slots', () => {
    const slotCases = [
      { input: 'default' as const, selector: 'content' },
      { input: 'media' as const, selector: 'media' },
      { input: 'label' as const, selector: 'label' },
      { input: 'description' as const, selector: 'description' },
    ]

    it.each(slotCases)('renders the $input slot', ({ input, selector }) => {
      const empty = mountEmpty({
        slots: {
          [input]: () => h('span', { [`data-test-empty-slot`]: selector }, `Slot ${selector}`),
        },
      })

      expect(empty.get(`[data-test-empty-slot="${selector}"]`).text()).toBe(`Slot ${selector}`)
    })
  })
})
