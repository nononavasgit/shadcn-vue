import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Time, createTimeContext, type TimeContext, type TimeProps } from '@/components/ui/Time'

const defaultDatetime = '2024-01-15T00:00:00.000Z'

function mountTime(options: MountingOptions<TimeProps> = {}) {
  return mount(Time, {
    ...options,
    props: {
      datetime: defaultDatetime,
      ...options.props,
    },
  })
}

describe('Time', () => {
  describe('props', () => {
    describe('datetime', () => {
      it.each([
        { input: '2024-01-15T00:00:00.000Z', expected: '2024-01-15T00:00:00.000Z' },
        { input: 0, expected: '1970-01-01T00:00:00.000Z' },
        { input: new Date('2024-01-15T00:00:00.000Z'), expected: '2024-01-15T00:00:00.000Z' },
      ])('renders datetime=$input as datetime=$expected', ({ input, expected }) => {
        const root = mountTime({ props: { datetime: input } }).get('[data-test-time-root]')

        expect(root.attributes('datetime')).toBe(expected)
      })
    })

    describe('locale', () => {
      it.each([
        { input: 'en-US', expected: 'January 15, 2024' },
        { input: 'es-ES', expected: '15 de enero de 2024' },
      ])('formats locale=$input as "$expected"', ({ input, expected }) => {
        const root = mountTime({
          props: {
            datetime: defaultDatetime,
            locale: input,
            format: { year: 'numeric', month: 'long', day: 'numeric' },
          },
        }).get('[data-test-time-root]')

        expect(root.text()).toBe(expected)
      })
    })

    describe('format', () => {
      it.each([
        {
          input: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          } as Intl.DateTimeFormatOptions,
          expected: '01/15/2024',
        },
        {
          input: { year: 'numeric' } as Intl.DateTimeFormatOptions,
          expected: '2024',
        },
      ])('formats format=$input as "$expected"', ({ input, expected }) => {
        const root = mountTime({
          props: { datetime: defaultDatetime, locale: 'en-US', format: input },
        }).get('[data-test-time-root]')

        expect(root.text()).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountTime({
        attrs: {
          id: 'published-at',
          'aria-label': 'Published at',
          class: 'custom-time',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-time-root]')

      expect(root.attributes('id')).toBe('published-at')
      expect(root.attributes('aria-label')).toBe('Published at')
      expect(root.classes()).toContain('custom-time')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('context contract', () => {
    it.each([
      { input: '', expected: { date: '' } },
      { input: '15 de enero de 2024', expected: { date: '15 de enero de 2024' } },
    ])('creates the formatted date context for "$input"', ({ input, expected }) => {
      expect(createTimeContext(input)).toEqual(expected satisfies TimeContext)
    })
  })

  describe('slots', () => {
    it('renders the default slot with the formatted date context', () => {
      const time = mountTime({
        props: {
          locale: 'en-US',
          format: { year: 'numeric' },
        },
        slots: {
          default: (context: TimeContext) =>
            h('span', { 'data-test-time-slot': '' }, `Year: ${context.date}`),
        },
      })

      expect(time.get('[data-test-time-slot]').text()).toBe('Year: 2024')
    })

    it('renders the formatted date when the default slot is absent', () => {
      const root = mountTime({
        props: { locale: 'en-US', format: { year: 'numeric' } },
      }).get('[data-test-time-root]')

      expect(root.text()).toBe('2024')
    })
  })
})
