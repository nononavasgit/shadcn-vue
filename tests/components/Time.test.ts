import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Time, createTimeContext } from '@/components/ui/Time'

const datetime = '2024-01-15T13:45:00.000Z'
const format: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}

describe('Time', () => {
  describe('Props', () => {
    it('Render formatted datetime', () => {
      const time = mount(Time, {
        props: { datetime, locale: 'en-US', format },
      }).get('[data-time-ui="root"]')

      expect(time.text()).toBe('January 15, 2024')
      expect(time.attributes('datetime')).toBe(datetime)
    })

    it.each([
      [datetime, datetime],
      [Date.parse(datetime), datetime],
      [new Date(datetime), datetime],
    ])('Render datetime attribute from %s', (value, expectedDatetime) => {
      const time = mount(Time, {
        props: { datetime: value },
      }).get('[data-time-ui="root"]')

      expect(time.attributes('datetime')).toBe(expectedDatetime)
    })

    it.each([
      ['en-US', 'January 15, 2024'],
      ['es-ES', '15 de enero de 2024'],
    ])('Render locale %s', (locale, expectedDate) => {
      const time = mount(Time, {
        props: { datetime, locale, format },
      }).get('[data-time-ui="root"]')

      expect(time.text()).toBe(expectedDate)
    })

    it('Render custom format', () => {
      const time = mount(Time, {
        props: {
          datetime,
          locale: 'en-US',
          format: { hour: '2-digit', minute: '2-digit', hour12: false },
        },
      }).get('[data-time-ui="root"]')

      expect(time.text()).toBe('13:45')
    })

    it('Update formatted datetime', async () => {
      const wrapper = mount(Time, {
        props: { datetime, locale: 'en-US', format },
      })

      await wrapper.setProps({ datetime: '2025-06-20T08:00:00.000Z' })

      expect(wrapper.get('[data-time-ui="root"]').text()).toBe('June 20, 2025')
      expect(wrapper.get('[data-time-ui="root"]').attributes('datetime')).toBe(
        '2025-06-20T08:00:00.000Z',
      )
    })

    it('Render data-allow-mismatch', () => {
      const time = mount(Time, {
        props: { datetime },
      }).get('[data-time-ui="root"]')

      expect(time.attributes()).toHaveProperty('data-allow-mismatch')
    })

    it.each(['object', 'function'] as const)('Render HTML Attributes by ui %s', (uiType) => {
      const root = mount(Time, {
        props: {
          datetime,
          ui: {
            root: uiType === 'function' ? () => ({ class: 'ui-root' }) : { class: 'ui-root' },
          },
        },
      }).get('[data-time-ui="root"]')

      expect(root.classes()).toContain('ui-root')
    })
  })

  describe('Slots', () => {
    it('Render default and replace formatted date', () => {
      const time = mount(Time, {
        props: { datetime, locale: 'en-US', format },
        slots: { default: () => h('span', 'test') },
      }).get('[data-time-slot="default"]')

      expect(time.get('span').html()).toBe('<span>test</span>')
      expect(time.text()).not.toContain('January 15, 2024')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const time = mount(Time, {
        props: { datetime },
        attrs: {
          class: 'custom-time',
          style: 'opacity: 0.5',
          'data-test': 'published-at',
        },
      }).get('[data-time-ui="root"]')

      expect(time.classes()).toContain('custom-time')
      expect(time.attributes('style')).toContain('opacity: 0.5')
      expect(time.attributes('data-test')).toBe('published-at')
    })
  })

  describe('Context', () => {
    it('Time context', () => {
      const context = createTimeContext(
        {
          datetime,
          locale: 'en-US',
          format,
          ui: { root: { class: 'ui-root' } },
        },
        'January 15, 2024',
      )

      expect(context).toEqual({
        datetime,
        locale: 'en-US',
        format,
        date: 'January 15, 2024',
      })
    })

    it('Time context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(Time, {
        props: {
          datetime,
          locale: 'en-US',
          format,
          ui: { root },
        },
      })

      expect(root).toHaveBeenCalledWith({
        datetime,
        locale: 'en-US',
        format,
        date: 'January 15, 2024',
      })
    })

    it('Time context to default slot', () => {
      const slot = vi.fn(() => h('span', 'test'))

      mount(Time, {
        props: { datetime, locale: 'en-US', format },
        slots: { default: slot },
      })

      expect(slot).toHaveBeenCalledWith({
        datetime,
        locale: 'en-US',
        format,
        date: 'January 15, 2024',
      })
    })
  })
})
