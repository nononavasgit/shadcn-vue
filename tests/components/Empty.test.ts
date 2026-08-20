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
      describe('header', () => {
        testAttrs({
          text: 'renders ui.header attributes',
          id: '[data-test-empty-header]',
          mount: (attrs) =>
            mountEmpty({ props: { label: 'No results', ui: { header: () => attrs } } }),
        })
      })

      describe('media', () => {
        testAttrs({
          text: 'renders ui.media attributes',
          id: '[data-test-empty-media]',
          mount: (attrs) =>
            mountEmpty({
              props: { ui: { media: () => attrs } },
              slots: { media: () => h('span', 'Media') },
            }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'renders ui.label attributes',
          id: '[data-test-empty-label]',
          mount: (attrs) =>
            mountEmpty({ props: { label: 'No results', ui: { label: () => attrs } } }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'renders ui.description attributes',
          id: '[data-test-empty-description]',
          mount: (attrs) =>
            mountEmpty({
              props: {
                description: 'Try another search.',
                ui: { description: () => attrs },
              },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'renders ui.content attributes',
          id: '[data-test-empty-content]',
          mount: (attrs) =>
            mountEmpty({
              props: { ui: { content: () => attrs } },
              slots: { default: () => h('button', 'Action') },
            }),
        })
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
    describe('default', () => {
      it('renders the default slot in content', () => {
        const empty = mountEmpty({
          slots: {
            default: () => h('span', { 'data-test-empty-slot': 'default' }, 'Slot default'),
          },
        })

        expect(empty.get('[data-test-empty-slot="default"]').text()).toBe('Slot default')
        expect(empty.get('[data-test-empty-content]')).toBeTruthy()
      })
    })

    describe('media', () => {
      it('renders the media slot', () => {
        const empty = mountEmpty({
          slots: {
            media: () => h('span', { 'data-test-empty-slot': 'media' }, 'Slot media'),
          },
        })

        expect(empty.get('[data-test-empty-slot="media"]').text()).toBe('Slot media')
        expect(empty.find('[data-test-empty-media]').exists()).toBe(true)
      })
    })

    describe('label', () => {
      it('replaces the label prop', () => {
        const empty = mountEmpty({
          props: { label: 'Default label' },
          slots: {
            label: () => h('span', { 'data-test-empty-slot': 'label' }, 'Slot label'),
          },
        })

        expect(empty.get('[data-test-empty-slot="label"]').text()).toBe('Slot label')
        expect(empty.text()).not.toContain('Default label')
      })
    })

    describe('description', () => {
      it('replaces the description prop', () => {
        const empty = mountEmpty({
          props: { description: 'Default description' },
          slots: {
            description: () =>
              h('span', { 'data-test-empty-slot': 'description' }, 'Slot description'),
          },
        })

        expect(empty.get('[data-test-empty-slot="description"]').text()).toBe('Slot description')
        expect(empty.text()).not.toContain('Default description')
      })
    })
  })
})
