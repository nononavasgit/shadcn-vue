import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Badge, createBadgeContext } from '@/components/ui/Badge'

describe('Badge', () => {
  describe('renderizado', () => {
    it('renderiza mediante la prop as', () => {
      const wrapper = mount(Badge, {
        props: {
          as: 'div',
        },
      })

      const badge = wrapper.get('[data-badge-ui="root"]')
      expect(badge.element.tagName).toBe('DIV')
    })

    it('renderiza mediante la prop label', () => {
      const wrapper = mount(Badge, {
        props: {
          label: 'Estado',
        },
      })

      const badge = wrapper.get('[data-badge-ui="root"]')
      expect(badge.text()).toBe('Estado')
    })
  })

  describe('slots', () => {
    it('renderiza el contenido del slot por defecto', () => {
      const wrapper = mount(Badge, {
        props: { label: 'Label' },
        slots: { default: 'Contenido personalizado' },
      })

      expect(wrapper.get('[data-badge-slot="default"]').text()).toBe('Contenido personalizado')
      expect(wrapper.text()).not.toContain('Label')
    })

    it('renderiza los slots leading y trailing', () => {
      const wrapper = mount(Badge, {
        props: {
          icon: 'check',
          trailingIcon: 'check',
        },
        slots: {
          leading: 'Antes',
          trailing: 'Después',
        },
      })

      expect(wrapper.get('[data-badge-slot="leading"]').text()).toBe('Antes')
      expect(wrapper.get('[data-badge-slot="trailing"]').text()).toBe('Después')
      expect(wrapper.find('[data-badge="icon"]').exists()).toBe(false)
      expect(wrapper.find('[data-badge="trailing-icon"]').exists()).toBe(false)
    })
  })

  describe('iconos', () => {
    it('renderiza el icon inicial', () => {
      const wrapper = mount(Badge, {
        props: { icon: 'check' },
      })

      expect(wrapper.get('[data-badge="icon"]').classes()).toContain('lucide-check')
    })

    it('renderiza trailingIcon', () => {
      const wrapper = mount(Badge, {
        props: { trailingIcon: 'chevronRight' },
      })

      expect(wrapper.get('[data-badge="trailing-icon"]').classes()).toContain(
        'lucide-chevron-right',
      )
    })

    it('no renderiza iconos cuando no se proporcionan', () => {
      const wrapper = mount(Badge)
      expect(wrapper.find('[data-badge="icon"]').exists()).toBe(false)
      expect(wrapper.find('[data-badge="trailing-icon"]').exists()).toBe(false)
    })
  })

  describe('tamaño', () => {
    it.each([
      [
        'sm',
        [
          'gap-0.5',
          'px-0.5',
          'text-sm',
          '[&_[data-badge-slot=leading]>svg]:size-2.5',
          '[&_[data-badge-slot=trailing]>svg]:size-2.5',
        ],
      ],
      [
        'md',
        [
          'gap-1',
          'px-1',
          'text-base',
          '[&_[data-badge-slot=leading]>svg]:size-3',
          '[&_[data-badge-slot=trailing]>svg]:size-3',
        ],
      ],
      [
        'lg',
        [
          'gap-1.5',
          'px-2',
          'text-lg',
          '[&_[data-badge-slot=leading]>svg]:size-3.5',
          '[&_[data-badge-slot=trailing]>svg]:size-3.5',
        ],
      ],
    ])('aplica las clases del tamaño %s', (size, expectedClasses) => {
      const badge = mount(Badge, {
        props: { size },
      }).get('span')

      expect(badge.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })
  })

  describe('variants', () => {
    it.each([
      ['solid', ['border-transparent', 'bg-primary', 'text-primary-foreground']],
      ['outline', ['border', 'bg-transparent', 'border-primary/40', 'text-primary']],
      ['plain', ['bg-transparent', 'border-transparent', 'text-primary']],
      ['subtle', ['border', 'border-primary/20', 'bg-primary/10', 'text-primary']],
      ['soft', ['border-transparent', 'bg-primary/10', 'text-primary']],
    ])('aplica las clases de la variant %s', (variant, expectedClasses) => {
      const badge = mount(Badge, {
        props: { variant },
      }).get('span')

      expect(badge.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })
  })

  describe('severity', () => {
    it.each([
      ['primary', ['bg-primary', 'text-primary-foreground']],
      ['secondary', ['bg-secondary', 'text-secondary-foreground']],
      ['warning', ['bg-warning', 'text-warning-foreground']],
      ['success', ['bg-success', 'text-success-foreground']],
      ['error', ['bg-error', 'text-error-foreground']],
    ])('aplica las clases de la severity %s', (severity, expectedClasses) => {
      const badge = mount(Badge, {
        props: { severity },
      }).get('span')

      expect(badge.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })
  })

  describe('color personalizado', () => {
    it('aplica las variables y clases del color personalizado', () => {
      const badge = mount(Badge, {
        props: { color: '#ff0000' },
      }).get('span')

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

    it('no aplica variables ni clases personalizadas sin color', () => {
      const badge = mount(Badge).get('span')

      expect(badge.attributes('style') ?? '').not.toContain('--badge-color')
      expect(badge.classes()).not.toContain('bg-(--badge-color)')
    })
  })

  describe('atributos', () => {
    it('conserva atributos, clases y estilos del consumidor', () => {
      const badge = mount(Badge, {
        attrs: {
          class: 'custom-badge',
          style: 'opacity: 0.5',
          'data-test': 'status-badge',
        },
      }).get('span')

      expect(badge.classes()).toContain('custom-badge')
      expect(badge.attributes('style')).toContain('opacity: 0.5')
      expect(badge.attributes('data-test')).toBe('status-badge')
    })
  })

  describe('contexto', () => {
    it('incluye las props del badge en el BadgeContext', () => {
      const context = createBadgeContext({
        as: 'span',
        asChild: false,
        label: 'Nuevo',
        size: undefined,
        variant: undefined,
        severity: undefined,
        color: undefined,
        icon: undefined,
        trailingIcon: undefined,
        ui: {
          root: {
            class: 'custom-badge',
          },
        },
      })

      expect(context).toEqual({
        props: {
          as: 'span',
          asChild: false,
          label: 'Nuevo',
          size: undefined,
          variant: undefined,
          severity: undefined,
          color: undefined,
          icon: undefined,
          trailingIcon: undefined,
        },
      })
    })
  })

  describe('ui', () => {
    it('aplica ui.root al elemento raíz', () => {
      const badge = mount(Badge, {
        props: {
          ui: {
            root: {
              class: 'ui-badge',
              'data-test': 'ui-badge',
            },
          },
        },
      }).get('span')

      expect(badge.classes()).toContain('ui-badge')
      expect(badge.attributes('data-test')).toBe('ui-badge')
    })

    it('resuelve ui.root con el contexto del badge', () => {
      const badge = mount(Badge, {
        props: {
          label: 'Activo',
          severity: 'success',
          ui: {
            root: ({ props }) => ({
              class: props.severity === 'success' ? 'success-badge' : undefined,
              'data-label': props.label,
            }),
          },
        },
      }).get('span')

      expect(badge.classes()).toContain('success-badge')
      expect(badge.attributes('data-label')).toBe('Activo')
    })
  })
})
