import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { i18n } from '@/i18n'
import { Loading, type LoadingContext, type LoadingProps } from '@/components/ui/Loading'
import { testIconProps } from '../utils/testIconProps'

function mountLoading(options: MountingOptions<LoadingProps> = {}) {
  return mount(Loading, {
    ...options,
    global: {
      plugins: [i18n],
      ...options.global,
    },
  })
}

describe('Loading', () => {
  describe('props', () => {
    describe('loading', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: true },
      ])('renders loading=$input as aria-busy=$expected', ({ input, expected }) => {
        const loading = mountLoading({ props: { loading: input } })

        expect(loading.get('[data-test-loading-root]').attributes('aria-busy')).toBe(
          String(expected),
        )
        expect(loading.get('[data-test-loading-loading]').isVisible()).toBe(expected)
        expect(loading.get('[data-test-loading-content]').isVisible()).toBe(!expected)
      })
    })

    describe('icon', () => {
      testIconProps({
        text: 'passes icon props',
        id: '[data-test-loading-icon]',
        default: 'spinner',
        mount: (input) => mountLoading({ props: { loading: true, icon: input } }),
      })
    })

    describe('ui', () => {
      it('applies ui resolvers to loading and content', () => {
        const loading = mountLoading({
          props: {
            loading: true,
            ui: {
              loading: () => ({ id: 'loading' }),
              content: () => ({ id: 'content' }),
            },
          },
        })

        expect(loading.get('[data-test-loading-loading]').attributes('id')).toBe('loading')
        expect(loading.get('[data-test-loading-content]').attributes('id')).toBe('content')
      })
    })
  })

  describe('context contract', () => {
    it.each([
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: true },
    ])('passes loading=$input as $expected', ({ input, expected }) => {
      let context: LoadingContext | undefined

      mountLoading({
        props: { loading: input },
        slots: {
          default: (slotContext: LoadingContext) => {
            context = slotContext
            return h('span', 'Content')
          },
        },
      })

      expect(context).toEqual({ loading: expected })
    })
  })

  describe('slots', () => {
    it('passes the context to the loading slot', () => {
      const loading = mountLoading({
        props: { loading: true },
        slots: {
          loading: (context: LoadingContext) =>
            h('span', { 'data-test-loading-slot': '' }, `loading:${context.loading}`),
        },
      })

      expect(loading.get('[data-test-loading-slot]').text()).toBe('loading:true')
    })

    it('passes the context to the default slot', () => {
      const loading = mountLoading({
        props: { loading: false },
        slots: {
          default: (context: LoadingContext) =>
            h('span', { 'data-test-content-slot': '' }, `loading:${context.loading}`),
        },
      })

      expect(loading.get('[data-test-content-slot]').text()).toBe('loading:false')
    })
  })
})
