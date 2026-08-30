import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Time, createTimeContext, type TimeContext, type TimeProps } from '@/components/ui/Time'
import { testAttrs } from '../utils/testAttrs'

const defaultDatetime = '2024-01-15T00:00:00.000Z'

const casesDatetime = [
  { input: '2024-01-15T00:00:00.000Z', expected: '2024-01-15T00:00:00.000Z' },
  { input: 0, expected: '1970-01-01T00:00:00.000Z' },
  { input: new Date('2024-01-15T00:00:00.000Z'), expected: '2024-01-15T00:00:00.000Z' },
]

const casesLocale = [
  { input: 'en-US', expected: 'January 15, 2024' },
  { input: 'es-ES', expected: '15 de enero de 2024' },
]

const casesFormat = [
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
]

const casesContext = [
  { input: '', expected: { date: '' } },
  { input: '15 de enero de 2024', expected: { date: '15 de enero de 2024' } },
]

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
      it.each(casesDatetime)(
        'renderiza datetime=$input como datetime=$expected',
        ({ input, expected }) => {
          const root = mountTime({ props: { datetime: input } }).get('[data-test-time-root]')

          expect(root.attributes('datetime')).toBe(expected)
        },
      )
    })

    describe('locale', () => {
      it.each(casesLocale)('formats locale=$input as "$expected"', ({ input, expected }) => {
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
      it.each(casesFormat)('formats format=$input as "$expected"', ({ input, expected }) => {
        const root = mountTime({
          props: { datetime: defaultDatetime, locale: 'en-US', format: input },
        }).get('[data-test-time-root]')

        expect(root.text()).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvia atributos arbitrarios, class y style a la raiz',
      id: '[data-test-time-root]',
      mount: (attrs) => mountTime({ attrs }),
    })
  })

  describe('context contract', () => {
    it.each(casesContext)(
      'crea el contexto de fecha formateada para "$input"',
      ({ input, expected }) => {
        expect(createTimeContext(input)).toEqual(expected satisfies TimeContext)
      },
    )
  })

  describe('slots', () => {
    it('renderiza el slot por defecto con el contexto de fecha formateada', () => {
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

    it('renderiza la fecha formateada cuando falta el slot por defecto', () => {
      const root = mountTime({
        props: { locale: 'en-US', format: { year: 'numeric' } },
      }).get('[data-test-time-root]')

      expect(root.text()).toBe('2024')
    })
  })
})
