import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { createIconContext, Icon } from '@/components/ui/Icon'

describe('Icon', () => {
  describe('renderizado', () => {
    it('renderiza el icono indicado con sus valores predeterminados', () => {
      const icon = mount(Icon, {
        props: { name: 'check' },
      }).get('svg')

      expect(icon.classes()).toEqual(
        expect.arrayContaining([
          'lucide-check',
          'shrink-0',
          'size-5',
        ]),
      )

      expect(icon.attributes('aria-hidden')).toBe('true')
      expect(icon.attributes('style')).toContain('color: currentcolor')
    })

    it('renderiza el icono correspondiente al name recibido', () => {
      const icon = mount(Icon, {
        props: { name: 'chevronRight' },
      }).get('svg')

      expect(icon.classes()).toContain('lucide-chevron-right')
      expect(icon.classes()).not.toContain('lucide-check')
    })
  })

  describe('size', () => {
    it.each([
      ['sm', 'size-4'],
      ['md', 'size-5'],
      ['lg', 'size-6'],
    ])('aplica las clases del tamaño %s', (size, expectedClass) => {
      const icon = mount(Icon, {
        props: {
          name: 'check',
          size,
        },
      }).get('svg')

      expect(icon.classes()).toContain(expectedClass)
    })
  })

  describe('color', () => {
    it('aplica el color recibido', () => {
      const icon = mount(Icon, {
        props: {
          name: 'check',
          color: '#ff0000',
        },
      }).get('svg')

      expect(icon.attributes('style')).toContain(
        'color: rgb(255, 0, 0)',
      )
    })

    it('usa currentColor cuando no se proporciona color', () => {
      const icon = mount(Icon, {
        props: { name: 'check' },
      }).get('svg')

      expect(icon.attributes('style')).toContain('color: currentcolor')
    })
  })

  describe('reactividad', () => {
    it('actualiza el icono cuando cambia la prop name', async () => {
      const wrapper = mount(Icon, {
        props: { name: 'check' },
      })

      expect(wrapper.get('svg').classes()).toContain('lucide-check')

      await wrapper.setProps({
        name: 'chevronRight',
      })

      expect(wrapper.get('svg').classes()).toContain(
        'lucide-chevron-right',
      )

      expect(wrapper.get('svg').classes()).not.toContain('lucide-check')
    })

    it('actualiza el color cuando cambia la prop color', async () => {
      const wrapper = mount(Icon, {
        props: {
          name: 'check',
          color: '#ff0000',
        },
      })

      await wrapper.setProps({
        color: '#000000',
      })

      const style = wrapper.get('svg').attributes('style')

      expect(style).toContain('color: rgb(0, 0, 0)')
      expect(style).not.toContain('rgb(255, 0, 0)')
    })
  })

  describe('atributos', () => {
    it('conserva atributos, clases y estilos del consumidor', () => {
      const icon = mount(Icon, {
        props: { name: 'check' },
        attrs: {
          class: 'custom-icon',
          style: 'opacity: 0.5',
          'data-test': 'status-icon',
        },
      }).get('svg')

      expect(icon.classes()).toEqual(
        expect.arrayContaining([
          'lucide-check',
          'shrink-0',
          'size-5',
          'custom-icon',
        ]),
      )

      expect(icon.attributes('style')).toContain('color: currentcolor')
      expect(icon.attributes('style')).toContain('opacity: 0.5')
      expect(icon.attributes('data-test')).toBe('status-icon')
    })

    it('permite sobrescribir aria-hidden desde los atributos', () => {
      const icon = mount(Icon, {
        props: { name: 'check' },
        attrs: {
          'aria-hidden': 'false',
        },
      }).get('svg')

      expect(icon.attributes('aria-hidden')).toBe('false')
    })
  })

  describe('contexto', () => {
    it('construye el IconContext', () => {
      const context = createIconContext({
        name: 'check',
        size: 'md',
        color: 'currentColor',
      })

      expect(context).toEqual({
        props: {
          name: 'check',
          size: 'md',
          color: 'currentColor',
        },
      })
    })

    it('incluye las props del icono en el IconContext', () => {
      const context = createIconContext({
        name: 'check',
        size: undefined,
        color: undefined,
        ui: {
          root: {
            class: 'custom-icon',
          },
        },
      })

      expect(context).toEqual({
        props: {
          name: 'check',
          size: undefined,
          color: undefined,
        },
      })
    })
  })

  describe('ui', () => {
    it('aplica ui.root al elemento raíz', () => {
      const icon = mount(Icon, {
        props: {
          name: 'check',
          ui: {
            root: {
              class: 'custom-icon',
              'data-test': 'status-icon',
            },
          },
        },
      }).get('svg')

      expect(icon.classes()).toContain('custom-icon')
      expect(icon.attributes('data-test')).toBe('status-icon')
    })

    it('resuelve ui.root con el contexto del icono', () => {
      const icon = mount(Icon, {
        props: {
          name: 'check',
          size: 'lg',
          color: '#ff0000',
          ui: {
            root: ({ props }) => ({
              class: props.size === 'lg' ? 'large-icon' : undefined,
              'data-name': props.name,
              'data-color': props.color,
            }),
          },
        },
      }).get('svg')

      expect(icon.classes()).toContain('large-icon')
      expect(icon.attributes('data-name')).toBe('check')
      expect(icon.attributes('data-color')).toBe('#ff0000')
    })
  })
})
