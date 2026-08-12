import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Button, createButtonContext } from '@/components/ui/Button'

describe('Button', () => {
  describe('Props', () => {
    it('Render as and label', () => {
      const button = mount(Button, {
        props: { as: 'a', label: 'Guardar' },
      }).get('a')

      expect(button.text()).toBe('Guardar')
    })

    it.each([
      ['xs', 'h-7'],
      ['sm', 'h-8'],
      ['md', 'h-9'],
      ['lg', 'h-10'],
    ])('Render size %s', (size, expectedClass) => {
      const button = mount(Button, {
        props: { size },
      }).get('button')

      expect(button.classes()).toContain(expectedClass)
    })

    it.each([
      ['xs', 'size-7'],
      ['sm', 'size-8'],
      ['md', 'size-9'],
      ['lg', 'size-10'],
    ])('Render square size %s', (size, expectedClass) => {
      const button = mount(Button, {
        props: { size, square: true },
      }).get('button')

      expect(button.classes()).toEqual(expect.arrayContaining([expectedClass, 'p-0']))
    })

    it('Render rounded', () => {
      const button = mount(Button, {
        props: { rounded: true },
      }).get('button')

      expect(button.classes()).toContain('rounded-full')
    })

    it.each([
      ['solid', ['bg-primary', 'text-primary-foreground']],
      ['outline', ['border', 'bg-transparent', 'text-primary']],
      ['plain', ['bg-transparent', 'text-primary']],
      ['subtle', ['border', 'bg-primary/10', 'text-primary']],
      ['soft', ['bg-primary/10', 'text-primary']],
      ['link', ['bg-transparent', 'underline', 'text-primary']],
    ])('Render variant %s', (variant, expectedClasses) => {
      const button = mount(Button, {
        props: { variant },
      }).get('button')

      expect(button.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it.each([
      ['primary', ['bg-primary', 'text-primary-foreground']],
      ['secondary', ['bg-secondary', 'text-secondary-foreground']],
      ['warning', ['bg-warning', 'text-warning-foreground']],
      ['success', ['bg-success', 'text-success-foreground']],
      ['error', ['bg-error', 'text-error-foreground']],
    ])('Render severity %s', (severity, expectedClasses) => {
      const button = mount(Button, {
        props: { severity },
      }).get('button')

      expect(button.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it('Render color', () => {
      const button = mount(Button, {
        props: { color: '#ff0000' },
      }).get('button')

      expect(button.attributes('style')).toContain('--button-color: #ff0000')
      expect(button.attributes('style')).toContain('--button-color-foreground: #09090b')
      expect(button.classes()).toEqual(
        expect.arrayContaining([
          'bg-(--button-color)',
          'text-(--button-color-foreground)',
          'focus-visible:border-(--button-color)',
          'focus-visible:ring-(--button-color)/30',
        ]),
      )
    })

    it('Render icon and trailingIcon', () => {
      const wrapper = mount(Button, {
        props: { icon: 'check', trailingIcon: 'chevronRight' },
      })

      expect(wrapper.get('.lucide-check').classes()).toContain('lucide-check')
      expect(wrapper.get('.lucide-chevron-right').classes()).toContain('lucide-chevron-right')
    })

    it('No render icons', () => {
      const wrapper = mount(Button)

      expect(wrapper.find('[data-button="leadingIcon"]').exists()).toBe(false)
      expect(wrapper.find('.lucide-chevron-right').exists()).toBe(false)
    })

    it('Render loading A11y state', () => {
      const wrapper = mount(Button, {
        props: { loading: true, icon: 'check' },
      })
      const button = wrapper.get('button')

      expect(button.attributes('aria-busy')).toBe('true')
      expect(button.attributes('aria-disabled')).toBe('true')
    })

    it('Render loading icon and hide leading content', () => {
      const wrapper = mount(Button, {
        props: { loading: true, icon: 'check' },
        slots: { leading: () => h('span', 'leading') },
      })

      expect(wrapper.find('[data-button="loadingIcon"]').exists()).toBe(true)
      expect(wrapper.find('[data-button="leadingIcon"]').exists()).toBe(false)
      expect(wrapper.find('[data-button-slot="leading"]').exists()).toBe(false)
    })

    it('Remove hover and active classes from non-interactive elements', () => {
      const classes = mount(Button, {
        props: { as: 'div' },
      })
        .get('div')
        .classes()

      expect(classes.some((className) => className.startsWith('hover:'))).toBe(false)
      expect(classes.some((className) => className.startsWith('active:'))).toBe(false)
    })

    it('Render HTML Attributes by ui', () => {
      const button = mount(Button, {
        props: { ui: { root: () => ({ class: 'ui-root' }) } },
      }).get('button')

      expect(button.classes()).toContain('ui-root')
    })

    it('Render HTML Attributes by ui function', () => {
      const button = mount(Button, {
        props: { ui: { root: () => ({ class: 'ui-root' }) } },
      }).get('button')

      expect(button.classes()).toContain('ui-root')
    })
  })

  describe('Slots', () => {
    it('Render default and replace label', () => {
      const wrapper = mount(Button, {
        props: { label: 'Label' },
        slots: { default: () => h('span', 'test') },
      })

      expect(wrapper.get('button > span').html()).toBe('<span>test</span>')
      expect(wrapper.text()).not.toContain('Label')
    })

    it('Render leading and replace icon', () => {
      const wrapper = mount(Button, {
        props: { icon: 'check' },
        slots: { leading: () => h('span', 'test') },
      })

      expect(wrapper.get('[data-button-slot="leading"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.find('.lucide-check').exists()).toBe(false)
    })

    it('Render trailing and replace trailingIcon', () => {
      const wrapper = mount(Button, {
        props: { trailingIcon: 'chevronRight' },
        slots: { trailing: () => h('span', 'test') },
      })

      expect(wrapper.get('[data-button-slot="trailing"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.find('.lucide-chevron-right').exists()).toBe(false)
    })

    it('Render loading and replace spinner', () => {
      const wrapper = mount(Button, {
        props: { loading: true, icon: 'check' },
        slots: {
          loading: () => h('span', 'test'),
          leading: () => h('span', 'leading'),
        },
      })

      expect(wrapper.get('[data-button-slot="loading"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.find('[data-button="loading"]').exists()).toBe(false)
      expect(wrapper.find('.lucide-check').exists()).toBe(false)
      expect(wrapper.find('[data-button-slot="leading"]').exists()).toBe(false)
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const button = mount(Button, {
        attrs: {
          class: 'custom-button',
          style: 'opacity: 0.5',
          'data-test': 'save-button',
        },
      }).get('button')

      expect(button.classes()).toContain('custom-button')
      expect(button.attributes('style')).toContain('opacity: 0.5')
      expect(button.attributes('data-test')).toBe('save-button')
    })
  })

  describe('Events', () => {
    it('Emit click event', async () => {
      const wrapper = mount(Button)

      await wrapper.get('button').trigger('click')

      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it.each([
      ['loading', { props: { loading: true } }],
      ['aria-disabled', { attrs: { 'aria-disabled': 'true' } }],
      ['disabled', { attrs: { disabled: true } }],
    ])('Block click when %s', async (_, options) => {
      const wrapper = mount(Button, options)

      await wrapper.get('button').trigger('click')

      expect(wrapper.emitted('click')).toBeUndefined()
    })
  })

  describe('Context', () => {
    const props = {
      as: 'button',
      asChild: false,
      label: 'Guardar',
      variant: 'outline',
      severity: 'success',
      size: 'lg',
      rounded: true,
      square: false,
      loading: false,
      color: '#ff0000',
      icon: 'check',
      trailingIcon: 'chevronRight',
    } as const

    it('Button context', () => {
      const context = createButtonContext({
        ...props,
        ui: { root: () => ({ class: 'ui-root' }) },
      })

      expect(context).toEqual(props)
    })

    it('Button context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(Button, {
        props: { ...props, ui: { root } },
      })

      expect(root).toHaveBeenCalledWith(props)
    })

    it.each(['default', 'leading', 'loading', 'trailing'] as const)(
      'Button context to %s slot',
      (slotName) => {
        const slot = vi.fn(() => h('span', 'test'))

        mount(Button, {
          props: { ...props, loading: slotName === 'loading' },
          slots: { [slotName]: slot },
        })

        expect(slot).toHaveBeenCalledWith({
          ...props,
          loading: slotName === 'loading',
        })
      },
    )
  })
})
