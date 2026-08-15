import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Announcer,
  createAnnouncerContext,
  type AnnouncerContext,
  type AnnouncerProps,
} from '@/components/ui/Announcer'

function mountAnnouncer(options: MountingOptions<AnnouncerProps> = {}) {
  return mount(Announcer, options)
}

describe('Announcer', () => {
  describe('props', () => {
    describe('atomic', () => {
      it.each([
        { input: true, expected: 'true' },
        { input: false, expected: 'false' },
        { input: undefined, expected: 'true' },
      ])('renders atomic=$input as aria-atomic=$expected', ({ input, expected }) => {
        const root = mountAnnouncer({ props: { atomic: input } }).get('[data-test-announcer-root]')

        expect(root.attributes('aria-atomic')).toBe(expected)
      })
    })

    describe('message', () => {
      it.each([
        { input: 'Saved', expected: 'Saved' },
        { input: '', expected: '' },
        { input: undefined, expected: '' },
      ])('renders message=$input as "$expected"', ({ input, expected }) => {
        const root = mountAnnouncer({ props: { message: input } }).get('[data-test-announcer-root]')

        expect(root.text().trim()).toBe(expected)
      })

      it('keeps the message prop visually hidden when no slot is provided', () => {
        const root = mountAnnouncer({
          props: { message: 'Custom announcement' },
        }).get('[data-test-announcer-root]')

        expect(root.classes()).toContain('sr-only')
      })
    })

    describe('politeness', () => {
      it.each([
        { input: 'assertive' as const, expectedLive: 'assertive', expectedRole: 'alert' },
        { input: 'polite' as const, expectedLive: 'polite', expectedRole: 'status' },
        { input: 'off' as const, expectedLive: 'off', expectedRole: undefined },
        { input: undefined, expectedLive: 'polite', expectedRole: 'status' },
      ])(
        'renders politeness=$input as aria-live=$expectedLive and role=$expectedRole',
        ({ input, expectedLive, expectedRole }) => {
          const root = mountAnnouncer({ props: { politeness: input } }).get(
            '[data-test-announcer-root]',
          )

          expect(root.attributes('aria-live')).toBe(expectedLive)
          expect(root.attributes('role')).toBe(expectedRole)
        },
      )

      it('updates the live region when politeness changes', async () => {
        const announcer = mountAnnouncer({ props: { politeness: 'polite' } })
        const root = () => announcer.get('[data-test-announcer-root]')

        await announcer.setProps({ politeness: 'assertive' })

        expect(root().attributes('aria-live')).toBe('assertive')
        expect(root().attributes('role')).toBe('alert')
      })
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountAnnouncer({
        attrs: {
          id: 'announcer',
          'aria-label': 'Announcements',
          class: 'custom-announcer',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-announcer-root]')

      expect(root.attributes('id')).toBe('announcer')
      expect(root.attributes('aria-label')).toBe('Announcements')
      expect(root.classes()).toContain('custom-announcer')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('context contract', () => {
    it.each([
      {
        name: 'default values',
        input: {},
        expected: {
          props: { atomic: true, message: '', politeness: 'polite' },
          message: '',
        },
      },
      {
        name: 'configured values',
        input: { atomic: false, message: 'Changes saved', politeness: 'assertive' as const },
        expected: {
          props: { atomic: false, message: 'Changes saved', politeness: 'assertive' as const },
          message: 'Changes saved',
        },
      },
    ])('creates the contract with $name', ({ input, expected }) => {
      expect(createAnnouncerContext(input)).toEqual(expected satisfies AnnouncerContext)
    })
  })

  describe('slots', () => {
    it('renders the default slot visibly', () => {
      const announcer = mountAnnouncer({
        slots: {
          default: () => h('span', { 'data-test-announcer-slot': '' }, 'Custom announcement'),
        },
      })

      expect(announcer.get('[data-test-announcer-slot]').text()).toBe('Custom announcement')
      expect(announcer.get('[data-test-announcer-root]').classes()).not.toContain('sr-only')
    })
  })
})
