import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Alert, createAlertContext, type AlertProps } from '@/components/ui/Alert'
import { i18n } from '@/i18n'

function mountAlert(options: MountingOptions<AlertProps> = {}) {
  return mount(Alert, {
    ...options,
    global: {
      ...options.global,
      plugins: [i18n, ...(options.global?.plugins ?? [])],
    },
  })
}

describe('Alert', () => {
  describe('Props', () => {
    it('Renderiza label', () => {
      const alert = mountAlert({
        props: {
          label: 'Actualización disponible',
        },
      })

      expect(alert.get('[data-alert-slot="label"]').text()).toBe('Actualización disponible')
    })

    it('Renderiza description', () => {
      const alert = mountAlert({
        props: {
          description: 'La descripción',
        },
      })

      expect(alert.get('[data-alert-ui="description"]').text()).toBe('La descripción')
    })

    it('Renderiza role="none" si es decorativo', () => {
      const alert = mountAlert({
        props: { decorative: true },
      }).get('[data-alert-ui="root"]')

      expect(alert.attributes('role')).toBe('none')
    })

    it('Renderiza role="alert" si no es decorativo', () => {
      const alert = mountAlert({
        props: { decorative: false },
      }).get('[data-alert-ui="root"]')

      expect(alert.attributes('role')).toBe('alert')
    })

    it('Renderiza el botón de cierre cuando closable es true y con icono "x" y aria-label', () => {
      const alert = mountAlert({
        props: { closable: true },
      })

      const button = alert.find('[data-alert="buttonClose"]')
      expect(button.exists()).toBe(true)
      expect(button.get('svg').classes()).toContain('lucide-x')
      expect(button.attributes('aria-label')).toBeTruthy()
    })

    it.each([
      ['solid', ['border-transparent', 'bg-(--alert-solid)', 'text-(--alert-solid-foreground)']],
      ['outline', ['border-(--alert-color)/40', 'bg-transparent', 'text-(--alert-color)']],
      ['plain', ['border-transparent', 'bg-transparent', 'text-(--alert-color)']],
      ['subtle', ['border-(--alert-color)/20', 'bg-(--alert-color)/10', 'text-(--alert-color)']],
      ['soft', ['border-transparent', 'bg-(--alert-color)/10', 'text-(--alert-color)']],
    ])('Renderiza las clases de la variant %s', (variant, expectedClasses) => {
      const alert = mountAlert({
        props: { variant },
      }).get('[data-alert-ui="root"]')

      expect(alert.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it.each([
      ['primary', '[--alert-color:var(--primary)]'],
      ['secondary', '[--alert-color:var(--secondary-foreground)]'],
      ['warning', '[--alert-color:var(--warning)]'],
      ['success', '[--alert-color:var(--success)]'],
      ['error', '[--alert-color:var(--error)]'],
    ])('Renderiza las clases de la severity %s', (severity, expectedClass) => {
      const alert = mountAlert({
        props: { severity },
      }).get('[data-alert-ui="root"]')

      expect(alert.classes()).toContain(expectedClass)
    })

    it('Renderiza las variables del color personalizado', () => {
      const alert = mountAlert({
        props: { color: '#ff0000' },
      })

      expect(alert.attributes('style')).toContain('--alert-color: #ff0000')
      expect(alert.attributes('style')).toContain('--alert-color-foreground: #09090b')
      expect(alert.classes()).toContain('[--alert-solid:var(--alert-color)]')
    })

    it('Renderiza icon', () => {
      const alert = mountAlert({
        props: { icon: 'check' },
      })

      expect(alert.get('[data-alert="icon"]').classes()).toContain('lucide-check')
    })

    it('Renderiza las propiedades de ui', () => {
      const wrapper = mountAlert({
        props: {
          label: 'Título',
          description: 'Descripción',
          closable: true,
          ui: {
            root: { class: 'ui-root' },
            label: { class: 'ui-label' },
            description: { class: 'ui-description' },
            closeButtonContainer: {
              class: 'ui-close-container',
            },
          },
        },
      })

      expect(wrapper.get('[data-alert-ui="root"]').classes()).toContain('ui-root')
      expect(wrapper.get('[data-alert-ui="label"]').classes()).toContain('ui-label')
      expect(wrapper.get('[data-alert-ui="description"]').classes()).toContain('ui-description')
      expect(wrapper.get('[data-alert-ui="closeButtonContainer"]').classes()).toContain(
        'ui-close-container',
      )
    })
  })

  describe('Slots', () => {
    it('Renderiza el slot label y remplaza la prop label', () => {
      const wrapper = mountAlert({
        props: {
          label: 'Label',
        },
        slots: {
          label: 'Título personalizado',
        },
      })

      expect(wrapper.get('[data-alert-slot="label"]').text()).toBe('Título personalizado')
      expect(wrapper.text()).not.toContain('Label')
    })

    it('Renderiza el slot description y remplaza la prop description', () => {
      const wrapper = mountAlert({
        props: {
          description: 'Description',
        },
        slots: {
          description: 'Descripción personalizada',
        },
      })

      expect(wrapper.get('[data-alert-slot="description"]').text()).toBe(
        'Descripción personalizada',
      )
      expect(wrapper.text()).not.toContain('Description')
    })

    it('Renderiza el slot icon y remplaza el icon', () => {
      const wrapper = mountAlert({
        props: { icon: 'check' },
        slots: { icon: 'test' },
      })

      expect(wrapper.get('[data-alert-slot="icon"]').text()).toBe('test')
      expect(wrapper.find('[data-alert="icon"]').exists()).toBe(false)
    })

    it('Renderiza el slot close y remplaza el botón cerrar', () => {
      const wrapper = mountAlert({
        props: { closable: true },
        slots: { close: 'test' },
      })

      expect(wrapper.get('[data-alert-slot="close"]').text()).toBe('test')
      expect(wrapper.find('[data-alert="buttonClose"]').exists()).toBe(false)
    })
  })

  describe('Attrs', () => {
    it('Reneriza atributos, clases y estilos del consumidor', () => {
      const alert = mountAlert({
        attrs: {
          class: 'custom-alert',
          style: 'opacity: 0.5',
          'data-test': 'status-alert',
        },
      })

      expect(alert.classes()).toContain('custom-alert')
      expect(alert.attributes('style')).toContain('opacity: 0.5')
      expect(alert.attributes('data-test')).toBe('status-alert')
    })
  })

  describe('Emits', () => {
    it('Oculta el alert y emite el evento onClose al pulsar el botón', async () => {
      const wrapper = mountAlert({
        props: { closable: true },
      })

      await wrapper.get('[data-alert="buttonClose"]').trigger('click')

      expect(wrapper.find('[data-alert-ui="root"]').exists()).toBe(false)
      expect(wrapper.emitted('close')).toHaveLength(1)
    })
  })

  describe('Contexto', () => {
    it('AlertContext', () => {
      const close = vi.fn()

      const props: AlertProps = {
        label: 'Alert',
        severity: 'error',
        ui: {
          root: { class: 'foo' },
        },
      }

      const context = createAlertContext(props, close)

      expect(context.props).toEqual({
        label: 'Alert',
        severity: 'error',
      })

      expect(context.props).not.toBe(props)
      expect(context.props).not.toHaveProperty('ui')
      expect(context.close).toBe(close)
    })
  })
})
