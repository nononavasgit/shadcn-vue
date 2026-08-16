import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Button,
  createButtonContext,
  type ButtonContext,
  type ButtonProps,
} from '@/components/ui/Button'

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
      it.each([
        { input: 'save' as const, expected: 'save' },
        { input: { name: 'save' as const }, expected: 'save' },
        { input: undefined, expected: undefined },
      ])('renders icon=$input as $expected', ({ input, expected }) => {
        const button = mountButton({ props: { icon: input } })
        const icon = button.findComponent('[data-test-button-icon]')

        expect(icon.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(icon.props('name')).toBe(expected)
      })

      it('hides the leading icon while loading', () => {
        const button = mountButton({ props: { icon: 'save', loading: true } })

        expect(button.find('[data-test-button-icon]').exists()).toBe(false)
        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(true)
      })

      it.each([
        { buttonSize: 'xs' as const, expected: 'xs' },
        { buttonSize: 'sm' as const, expected: 'sm' },
        { buttonSize: 'md' as const, expected: 'md' },
        { buttonSize: 'lg' as const, expected: 'lg' },
      ])('inherits Button size=$buttonSize', ({ buttonSize, expected }) => {
        const button = mountButton({ props: { size: buttonSize, icon: 'save' } })

        expect(button.getComponent('[data-test-button-icon]').props('size')).toBe(expected)
      })

      it('prioritizes an explicit icon size', () => {
        const button = mountButton({
          props: { size: 'lg', icon: { name: 'save', size: 'xs' } },
        })

        expect(button.getComponent('[data-test-button-icon]').props('size')).toBe('xs')
      })
    })

    describe('trailingIcon', () => {
      it.each([
        { input: 'chevronRight' as const, expected: 'chevronRight' },
        { input: { name: 'chevronRight' as const }, expected: 'chevronRight' },
        { input: undefined, expected: undefined },
      ])('renders trailingIcon=$input as $expected', ({ input, expected }) => {
        const button = mountButton({ props: { trailingIcon: input } })
        const icon = button.findComponent('[data-test-button-trailing-icon]')

        expect(icon.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(icon.props('name')).toBe(expected)
      })

      it('keeps the trailing icon visible while loading', () => {
        const button = mountButton({ props: { trailingIcon: 'chevronRight', loading: true } })

        expect(button.find('[data-test-button-trailing-icon]').exists()).toBe(true)
        expect(button.find('[data-test-button-loading-icon]').exists()).toBe(true)
      })

      it.each([
        { buttonSize: 'xs' as const, expected: 'xs' },
        { buttonSize: 'sm' as const, expected: 'sm' },
        { buttonSize: 'md' as const, expected: 'md' },
        { buttonSize: 'lg' as const, expected: 'lg' },
      ])('inherits Button size=$buttonSize', ({ buttonSize, expected }) => {
        const button = mountButton({
          props: { size: buttonSize, trailingIcon: 'chevronRight' },
        })

        expect(button.getComponent('[data-test-button-trailing-icon]').props('size')).toBe(expected)
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

    it('applies a custom color', () => {
      const root = mountButton({ props: { color: '#ff0000' } }).get('[data-test-button-root]')

      expect(root.attributes('style')).toContain('--button-color: #ff0000')
      expect(root.attributes('style')).toContain('--button-color-foreground: #09090b')
      expect(root.classes()).toContain('bg-(--button-color)')
    })

    it('renders the configured element with as', () => {
      const root = mountButton({ props: { as: 'a', label: 'Open', href: '/docs' } }).get(
        '[data-test-button-root]',
      )

      expect(root.element.tagName.toLowerCase()).toBe('a')
      expect(root.attributes('href')).toBe('/docs')
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountButton({
        attrs: {
          id: 'save',
          type: 'submit',
          class: 'custom-button',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-button-root]')

      expect(root.attributes('id')).toBe('save')
      expect(root.attributes('type')).toBe('submit')
      expect(root.classes()).toContain('custom-button')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('emits', () => {
    it('emits click for an enabled button', async () => {
      const button = mountButton({ props: { label: 'Save' } })

      await button.get('[data-test-button-root]').trigger('click')

      expect(button.emitted('click')).toHaveLength(1)
    })

    it.each([
      { loading: true, ariaDisabled: undefined },
      { loading: false, ariaDisabled: 'true' },
    ])('does not emit click when disabled by state', async ({ loading, ariaDisabled }) => {
      const button = mountButton({
        props: { loading },
        attrs: ariaDisabled ? { 'aria-disabled': ariaDisabled } : undefined,
      })

      await button.get('[data-test-button-root]').trigger('click')

      expect(button.emitted('click')).toBeUndefined()
    })
  })

  describe('context contract', () => {
    it.each([
      { input: undefined, expected: false },
      { input: false, expected: false },
      { input: true, expected: true },
    ])('creates loading=$input context', ({ input, expected }) => {
      expect(createButtonContext({ loading: input })).toEqual({
        loading: expected,
      } satisfies ButtonContext)
    })
  })

  describe('slots', () => {
    it('renders a custom loading slot instead of the spinner', () => {
      const button = mountButton({
        props: { loading: true },
        slots: { loading: () => h('span', { 'data-test-loading-slot': '' }, 'Loading') },
      })

      expect(button.get('[data-test-loading-slot]').text()).toBe('Loading')
      expect(button.find('[data-test-button-loading-icon]').exists()).toBe(false)
    })

    it.each(['default', 'leading', 'loading', 'trailing'] as const)(
      'renders the %s slot',
      (slot) => {
        const button = mountButton({
          props: { loading: slot === 'loading' },
          slots: { [slot]: () => h('span', { 'data-test-button-slot': slot }, `Slot ${slot}`) },
        })

        expect(button.get('[data-test-button-root]').text()).toContain(`Slot ${slot}`)
      },
    )

    it('slots replace their icon fallbacks', () => {
      const button = mountButton({
        props: { icon: 'save', trailingIcon: 'chevronRight' },
        slots: {
          leading: () => h('span', 'Leading'),
          trailing: () => h('span', 'Trailing'),
        },
      })

      expect(button.find('[data-test-button-icon]').exists()).toBe(false)
      expect(button.find('[data-test-button-trailing-icon]').exists()).toBe(false)
    })
  })
})
