import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Badge, createBadgeContext } from '@/components/ui/Badge'

describe('Badge', () => {
  describe('Props', () => {
    it('Render as', () => {
      const badge = mount(Badge, {
        props: { as: 'div' },
      }).get('[data-badge-ui="root"]')

      expect(badge.element.tagName).toBe('DIV')
    })

    it('Render label', () => {
      const badge = mount(Badge, {
        props: { label: 'Estado' },
      }).get('[data-badge-slot="default"]')

      expect(badge.text()).toBe('Estado')
    })

    it.each([
      ['sm', ['gap-0.5', 'px-0.5', 'text-sm']],
      ['md', ['gap-1', 'px-1', 'text-base']],
      ['lg', ['gap-1.5', 'px-2', 'text-lg']],
    ])('Render size %s', (size, expectedClasses) => {
      const badge = mount(Badge, {
        props: { size },
      }).get('[data-badge-ui="root"]')

      expect(badge.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it.each([
      ['solid', ['border-transparent', 'bg-primary', 'text-primary-foreground']],
      ['outline', ['border', 'border-primary/40', 'bg-transparent', 'text-primary']],
      ['plain', ['border-transparent', 'bg-transparent', 'text-primary']],
      ['subtle', ['border', 'border-primary/20', 'bg-primary/10', 'text-primary']],
      ['soft', ['border-transparent', 'bg-primary/10', 'text-primary']],
    ])('Render variant %s', (variant, expectedClasses) => {
      const badge = mount(Badge, {
        props: { variant },
      }).get('[data-badge-ui="root"]')

      expect(badge.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it.each([
      ['primary', ['bg-primary', 'text-primary-foreground']],
      ['secondary', ['bg-secondary', 'text-secondary-foreground']],
      ['warning', ['bg-warning', 'text-warning-foreground']],
      ['success', ['bg-success', 'text-success-foreground']],
      ['error', ['bg-error', 'text-error-foreground']],
    ])('Render severity %s', (severity, expectedClasses) => {
      const badge = mount(Badge, {
        props: { severity },
      }).get('[data-badge-ui="root"]')

      expect(badge.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it('Render color', () => {
      const badge = mount(Badge, {
        props: { color: '#ff0000' },
      }).get('[data-badge-ui="root"]')

      expect(badge.attributes('style')).toContain('--badge-color: #ff0000')
      expect(badge.attributes('style')).toContain('--badge-color-foreground: #09090b')
      expect(badge.classes()).toEqual(
        expect.arrayContaining([
          'bg-(--badge-color)',
          'text-(--badge-color-foreground)',
          'focus-visible:border-(--badge-color)',
          'focus-visible:ring-(--badge-color)/30',
        ]),
      )
    })

    it('Render icon', () => {
      const icon = mount(Badge, {
        props: { icon: 'check' },
      }).get('[data-badge="icon"]')

      expect(icon.classes()).toContain('lucide-check')
    })

    it('Render trailingIcon', () => {
      const icon = mount(Badge, {
        props: { trailingIcon: 'chevronRight' },
      }).get('[data-badge="trailingIcon"]')

      expect(icon.classes()).toContain('lucide-chevron-right')
    })

    it('No render icons if dont have icon and trailingIcon', () => {
      const wrapper = mount(Badge)

      expect(wrapper.find('[data-badge="icon"]').exists()).toBe(false)
      expect(wrapper.find('[data-badge="trailingIcon"]').exists()).toBe(false)
    })

    it('Render HTML Attributes by ui', () => {
      const badge = mount(Badge, {
        props: {
          ui: {
            root: () => ({ class: 'ui-root' }),
          },
        },
      }).get('[data-badge-ui="root"]')

      expect(badge.classes()).toContain('ui-root')
    })

    it('Render HTML Attributes by ui function', () => {
      const badge = mount(Badge, {
        props: {
          ui: {
            root: () => ({ class: 'ui-root' }),
          },
        },
      }).get('[data-badge-ui="root"]')

      expect(badge.classes()).toContain('ui-root')
    })
  })

  describe('Slots', () => {
    it('Render default and replace label', () => {
      const wrapper = mount(Badge, {
        props: { label: 'Label' },
        slots: { default: () => h('span', 'test') },
      })

      expect(wrapper.get('[data-badge-slot="default"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.text()).not.toContain('Label')
    })

    it('Render leading and replace icon', () => {
      const wrapper = mount(Badge, {
        props: { icon: 'check' },
        slots: { leading: () => h('span', 'test') },
      })

      expect(wrapper.get('[data-badge-slot="leading"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.find('[data-badge="icon"]').exists()).toBe(false)
    })

    it('Render trailing and replace trailingIcon', () => {
      const wrapper = mount(Badge, {
        props: { trailingIcon: 'chevronRight' },
        slots: { trailing: () => h('span', 'test') },
      })

      expect(wrapper.get('[data-badge-slot="trailing"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.find('[data-badge="trailingIcon"]').exists()).toBe(false)
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const badge = mount(Badge, {
        attrs: {
          class: 'custom-badge',
          style: 'opacity: 0.5',
          'data-test': 'status-badge',
        },
      }).get('[data-badge-ui="root"]')

      expect(badge.classes()).toContain('custom-badge')
      expect(badge.attributes('style')).toContain('opacity: 0.5')
      expect(badge.attributes('data-test')).toBe('status-badge')
    })
  })

  describe('Context', () => {
    it('Badge context', () => {
      const props = {
        as: 'span',
        asChild: false,
        label: 'Nuevo',
        size: 'lg',
        variant: 'outline',
        severity: 'success',
        color: '#ff0000',
        icon: 'check',
        trailingIcon: 'chevronRight',
        ui: {
          root: () => ({ class: 'custom-badge' }),
        },
      }

      const context = createBadgeContext(props)

      expect(context).toEqual({
        as: 'span',
        asChild: false,
        label: 'Nuevo',
        size: 'lg',
        variant: 'outline',
        severity: 'success',
        color: '#ff0000',
        icon: 'check',
        trailingIcon: 'chevronRight',
      })
    })

    it('Badge context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(Badge, {
        props: {
          as: 'span',
          asChild: false,
          label: 'Nuevo',
          size: 'lg',
          variant: 'outline',
          severity: 'success',
          color: '#ff0000',
          icon: 'check',
          trailingIcon: 'chevronRight',
          ui: { root },
        },
      })

      expect(root).toHaveBeenCalledWith({
        as: 'span',
        asChild: false,
        label: 'Nuevo',
        size: 'lg',
        variant: 'outline',
        severity: 'success',
        color: '#ff0000',
        icon: 'check',
        trailingIcon: 'chevronRight',
      })
    })

    it.each(['default', 'leading', 'trailing'] as const)('Badge context to %s slot', (slotName) => {
      const slot = vi.fn(() => h('span', 'test'))

      mount(Badge, {
        props: {
          as: 'span',
          asChild: false,
          label: 'Nuevo',
          size: 'lg',
          variant: 'outline',
          severity: 'success',
          color: '#ff0000',
          icon: 'check',
          trailingIcon: 'chevronRight',
        },
        slots: {
          [slotName]: slot,
        },
      })

      expect(slot).toHaveBeenCalledWith({
        as: 'span',
        asChild: false,
        label: 'Nuevo',
        size: 'lg',
        variant: 'outline',
        severity: 'success',
        color: '#ff0000',
        icon: 'check',
        trailingIcon: 'chevronRight',
      })
    })
  })
})
