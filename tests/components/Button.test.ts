import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Button, type ButtonProps } from '@/components/ui/Button'
import { testAttrs } from '../utils/testAttrs'
import { testIconProps, testIconSize } from '../utils/testIconProps'

function mountButton(options: MountingOptions<ButtonProps> & Record<string, unknown> = {}) {
  return mount(Button, options)
}

describe('Button', () => {
  describe('props', () => {
    describe('label', () => {
      it.each([
        { prop: 'label' as const, value: 'Save', expected: 'Save' },
        { prop: 'label' as const, value: undefined, expected: '' },
      ])('renders label=$value as "$expected"', ({ prop, value, expected }) => {
        const button = mountButton({ props: { [prop]: value } })

        expect(button.get('[data-test-button-root]').text()).toBe(expected)
      })
    })

    describe('size', () => {
      it.each([
        { input: 'xs' as const, expected: ['h-7', 'text-xs'] },
        { input: 'sm' as const, expected: ['h-8', 'text-sm'] },
        { input: 'md' as const, expected: ['h-9', 'text-base'] },
        { input: 'lg' as const, expected: ['h-10', 'text-lg'] },
      ])('renders size=$input', ({ input, expected }) => {
        const root = mountButton({ props: { size: input } }).get('[data-test-button-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('variant', () => {
      it.each([
        { input: 'solid' as const, expected: ['bg-primary', 'text-primary-foreground'] },
        { input: 'outline' as const, expected: ['border', 'border-primary/40', 'text-primary'] },
        { input: 'plain' as const, expected: ['bg-transparent', 'text-primary'] },
        { input: 'subtle' as const, expected: ['border', 'bg-primary/10', 'text-primary'] },
        { input: 'soft' as const, expected: ['bg-primary/10', 'text-primary'] },
        { input: 'link' as const, expected: ['underline', 'text-primary'] },
      ])('renders variant=$input', ({ input, expected }) => {
        const root = mountButton({ props: { variant: input } }).get('[data-test-button-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('raised', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('renders raised=$input as shadow=$expected', ({ input, expected }) => {
        const root = mountButton({ props: { raised: input } }).get('[data-test-button-root]')

        expect(root.classes().includes('shadow-sm')).toBe(expected)
      })
    })

    describe('severity', () => {
      it.each(['primary', 'secondary', 'warning', 'success', 'error'] as const)(
        'renders severity=%s',
        (severity) => {
          const root = mountButton({ props: { severity } }).get('[data-test-button-root]')

          expect(root.classes()).toContain(
            severity === 'secondary' ? 'bg-secondary' : `bg-${severity}`,
          )
        },
      )
    })

    describe('shape', () => {
      it.each([
        { prop: 'rounded' as const, expected: 'rounded-full' },
        { prop: 'square' as const, expected: 'size-9' },
      ])('renders $prop=true', ({ prop, expected }) => {
        const root = mountButton({ props: { [prop]: true } }).get('[data-test-button-root]')

        expect(root.classes()).toContain(expected)
      })
    })

    describe('loading', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('renders loading=$input as $expected', ({ input, expected }) => {
        const button = mountButton({ props: { loading: input } })
        const root = button.get('[data-test-button-root]')

        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(expected)
        expect(root.attributes('aria-busy')).toBe(expected ? 'true' : undefined)
        expect(root.attributes('aria-disabled')).toBe(expected ? 'true' : undefined)
      })
    })

    describe('icon', () => {
      testIconProps({
        text: 'passes icon props',
        id: '[data-test-button-icon]',
        mount: (input) => mountButton({ props: { icon: input } }),
      })

      it('hides the leading icon while loading', () => {
        const button = mountButton({ props: { icon: { name: 'save' }, loading: true } })

        expect(button.find('[data-test-button-icon]').exists()).toBe(false)
        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(true)
      })

      testIconSize({
        text: 'inherits Button size to icon',
        id: '[data-test-button-icon]',
        mount: (size) => mountButton({ props: { size, icon: { name: 'save' } } }),
      })

      it('prioritizes an explicit icon size', () => {
        const button = mountButton({
          props: { size: 'lg', icon: { name: 'save', size: 'xs' } },
        })

        expect(button.getComponent('[data-test-button-icon]').props('size')).toBe('xs')
      })
    })

    describe('trailingIcon', () => {
      testIconProps({
        text: 'passes trailingIcon props',
        id: '[data-test-button-trailing-icon]',
        mount: (input) => mountButton({ props: { trailingIcon: input } }),
      })

      it('keeps the trailing icon visible while loading', () => {
        const button = mountButton({
          props: { trailingIcon: { name: 'chevronRight' }, loading: true },
        })

        expect(button.find('[data-test-button-trailing-icon]').exists()).toBe(true)
        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(true)
      })

      testIconSize({
        text: 'inherits Button size to trailing icon',
        id: '[data-test-button-trailing-icon]',
        mount: (size) => mountButton({ props: { size, trailingIcon: { name: 'chevronRight' } } }),
      })

      it('prioritizes an explicit trailing icon size', () => {
        const button = mountButton({
          props: {
            size: 'lg',
            trailingIcon: { name: 'chevronRight', size: 'xs' },
          },
        })

        expect(button.getComponent('[data-test-button-trailing-icon]').props('size')).toBe('xs')
      })
    })

    describe('color', () => {
      it('applies a custom color', () => {
        const root = mountButton({ props: { color: '#ff0000' } }).get('[data-test-button-root]')

        expect(root.attributes('style')).toContain('--button-color: #ff0000')
        expect(root.attributes('style')).toContain('--button-color-foreground: #09090b')
        expect(root.classes()).toContain('bg-(--button-color)')
      })
    })

    describe('as', () => {
      it('renders the configured element', () => {
        const root = mountButton({ props: { as: 'a', label: 'Open', href: '/docs' } }).get(
          '[data-test-button-root]',
        )

        expect(root.element.tagName.toLowerCase()).toBe('a')
        expect(root.attributes('href')).toBe('/docs')
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-button-root]',
      mount: (attrs) => mountButton({ attrs }),
    })
  })

  describe('emits', () => {
    it.each([
      { loading: false, ariaDisabled: false, expected: 1 },
      { loading: true, ariaDisabled: undefined, expected: 0 },
      { loading: false, ariaDisabled: true, expected: 0 },
    ])(
      'emits click=$expected for loading=$loading ariaDisabled=$ariaDisabled',
      async ({ loading, ariaDisabled, expected }) => {
        const button = mountButton({
          props: { loading },
          attrs: { 'aria-disabled': ariaDisabled },
        })

        await button.get('[data-test-button-root]').trigger('click')

        expect(button.emitted('click')?.length ?? 0).toBe(expected)
      },
    )
  })

  describe('slots', () => {
    describe('default', () => {
      it('renders the default slot and hides the label fallback', () => {
        const button = mountButton({
          props: { label: 'Label fallback' },
          slots: { default: () => h('span', { 'data-test-button-slot': 'default' }, 'Default') },
        })

        expect(button.get('[data-test-button-slot="default"]').text()).toBe('Default')
        expect(button.get('[data-test-button-root]').text()).not.toContain('Label fallback')
      })
    })

    describe('leading', () => {
      it('renders the leading slot and hides the icon fallback', () => {
        const button = mountButton({
          props: { icon: { name: 'save' } },
          slots: {
            leading: () => h('span', { 'data-test-button-slot': 'leading' }, 'Leading'),
          },
        })

        expect(button.get('[data-test-button-slot="leading"]').text()).toBe('Leading')
        expect(button.find('[data-test-button-icon]').exists()).toBe(false)
      })
    })

    describe('loading', () => {
      it('renders the loading slot and hides the leading slot', () => {
        const button = mountButton({
          props: { loading: true },
          slots: {
            leading: () => h('span', { 'data-test-button-slot': 'leading' }, 'Leading'),
            loading: () => h('span', { 'data-test-button-slot': 'loading' }, 'Loading'),
          },
        })

        expect(button.get('[data-test-button-slot="loading"]').text()).toBe('Loading')
        expect(button.find('[data-test-button-slot="leading"]').exists()).toBe(false)
        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(false)
      })
    })

    describe('trailing', () => {
      it('renders the trailing slot and hides the icon fallback', () => {
        const button = mountButton({
          props: { trailingIcon: { name: 'chevronRight' } },
          slots: {
            trailing: () => h('span', { 'data-test-button-slot': 'trailing' }, 'Trailing'),
          },
        })

        expect(button.get('[data-test-button-slot="trailing"]').text()).toBe('Trailing')
        expect(button.find('[data-test-button-trailing-icon]').exists()).toBe(false)
      })
    })
  })
})
