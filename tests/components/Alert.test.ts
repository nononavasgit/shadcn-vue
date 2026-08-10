import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

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
    it('Render label and description', () => {
      const wrapper = mountAlert({
        props: {
          label: 'Actualización disponible',
          description: 'Hay una nueva versión lista para instalar',
        },
      })

      expect(wrapper.get('[data-alert-slot="label"]').text()).toBe('Actualización disponible')
      expect(wrapper.get('[data-alert-slot="description"]').text()).toBe(
        'Hay una nueva versión lista para instalar',
      )
    })

    it.each([
      ['solid', ['border-transparent', 'bg-(--alert-solid)', 'text-(--alert-solid-foreground)']],
      ['outline', ['border-(--alert-color)/40', 'bg-transparent', 'text-(--alert-color)']],
      ['plain', ['border-transparent', 'bg-transparent', 'text-(--alert-color)']],
      ['subtle', ['border-(--alert-color)/20', 'bg-(--alert-color)/10', 'text-(--alert-color)']],
      ['soft', ['border-transparent', 'bg-(--alert-color)/10', 'text-(--alert-color)']],
    ])('Render variant %s', (variant, expectedClasses) => {
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
    ])('Render severity %s', (severity, expectedClass) => {
      const alert = mountAlert({
        props: { severity },
      }).get('[data-alert-ui="root"]')

      expect(alert.classes()).toContain(expectedClass)
    })

    it('Render color', () => {
      const alert = mountAlert({
        props: { color: '#ff0000' },
      }).get('[data-alert-ui="root"]')

      expect(alert.attributes('style')).toContain('--alert-color: #ff0000')
      expect(alert.attributes('style')).toContain('--alert-color-foreground: #09090b')
      expect(alert.classes()).toEqual(
        expect.arrayContaining([
          '[--alert-solid:var(--alert-color)]',
          '[--alert-solid-foreground:var(--alert-color-foreground)]',
        ]),
      )
    })

    it('Render icon', () => {
      const icon = mountAlert({
        props: { icon: 'check' },
      }).get('[data-alert="icon"]')

      expect(icon.classes()).toContain('lucide-check')
    })

    it('No render optional content', () => {
      const wrapper = mountAlert()

      expect(wrapper.find('[data-alert="icon"]').exists()).toBe(false)
      expect(wrapper.find('[data-alert-slot="label"]').exists()).toBe(false)
      expect(wrapper.find('[data-alert-slot="description"]').exists()).toBe(false)
      expect(wrapper.find('[data-alert="buttonClose"]').exists()).toBe(false)
    })

    it('Render close button', () => {
      const button = mountAlert({
        props: { closable: true },
      }).get('[data-alert="buttonClose"]')

      expect(button.attributes('aria-label')).toBeTruthy()
      expect(button.find('.lucide-x').exists()).toBe(true)
    })

    it.each([
      [false, 'alert'],
      [true, 'none'],
    ])('Render decorative %s with role %s', (decorative, role) => {
      const alert = mountAlert({
        props: { decorative },
      }).get('[data-alert-ui="root"]')

      expect(alert.attributes('role')).toBe(role)
    })

    it('Render HTML Attributes by ui', () => {
      const wrapper = mountAlert({
        props: {
          label: 'Label',
          description: 'Description',
          closable: true,
          ui: {
            root: { class: 'ui-root' },
            label: { class: 'ui-label' },
            description: { class: 'ui-description' },
            closeButtonContainer: { class: 'ui-close' },
          },
        },
      })

      expect(wrapper.get('[data-alert-ui="root"]').classes()).toContain('ui-root')
      expect(wrapper.get('[data-alert-ui="label"]').classes()).toContain('ui-label')
      expect(wrapper.get('[data-alert-ui="description"]').classes()).toContain('ui-description')
      expect(wrapper.get('[data-alert-ui="closeButtonContainer"]').classes()).toContain('ui-close')
    })

    it('Render HTML Attributes by ui function', () => {
      const alert = mountAlert({
        props: {
          ui: {
            root: () => ({ class: 'ui-root' }),
          },
        },
      }).get('[data-alert-ui="root"]')

      expect(alert.classes()).toContain('ui-root')
    })
  })

  describe('Slots', () => {
    it('Render label and replace label prop', () => {
      const wrapper = mountAlert({
        props: { label: 'Label' },
        slots: { label: () => h('span', 'test') },
      })

      expect(wrapper.get('[data-alert-slot="label"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.text()).not.toContain('Label')
    })

    it('Render description and replace description prop', () => {
      const wrapper = mountAlert({
        props: { description: 'Description' },
        slots: { description: () => h('span', 'test') },
      })

      expect(wrapper.get('[data-alert-slot="description"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.text()).not.toContain('Description')
    })

    it('Render icon and replace icon prop', () => {
      const wrapper = mountAlert({
        props: { icon: 'check' },
        slots: { icon: () => h('span', 'test') },
      })

      expect(wrapper.get('[data-alert-slot="icon"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.find('[data-alert="icon"]').exists()).toBe(false)
    })

    it('Render close and replace close button', () => {
      const wrapper = mountAlert({
        props: { closable: true },
        slots: { close: () => h('span', 'test') },
      })

      expect(wrapper.get('[data-alert-slot="close"] > span').html()).toBe('<span>test</span>')
      expect(wrapper.find('[data-alert="buttonClose"]').exists()).toBe(false)
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const alert = mountAlert({
        attrs: {
          class: 'custom-alert',
          style: 'opacity: 0.5',
          'data-test': 'status-alert',
        },
      }).get('[data-alert-ui="root"]')

      expect(alert.classes()).toContain('custom-alert')
      expect(alert.attributes('style')).toContain('opacity: 0.5')
      expect(alert.attributes('data-test')).toBe('status-alert')
    })
  })

  describe('Events', () => {
    it('Close alert and emit close event', async () => {
      const wrapper = mountAlert({
        props: { closable: true },
      })

      await wrapper.get('[data-alert="buttonClose"]').trigger('click')

      expect(wrapper.find('[data-alert-ui="root"]').exists()).toBe(false)
      expect(wrapper.emitted('close')).toHaveLength(1)
    })
  })

  describe('Context', () => {
    it('Alert context', () => {
      const close = vi.fn()
      const props = {
        label: 'Actualización disponible',
        description: 'Hay una nueva versión',
        icon: 'check',
        closeButton: { label: 'Cerrar' },
        variant: 'outline',
        severity: 'success',
        color: '#ff0000',
        closable: true,
        decorative: false,
        ui: {
          root: { class: 'ui-root' },
        },
      } as const

      const context = createAlertContext(props, close)

      expect(context).toEqual({
        label: 'Actualización disponible',
        description: 'Hay una nueva versión',
        icon: 'check',
        closeButton: { label: 'Cerrar' },
        variant: 'outline',
        severity: 'success',
        color: '#ff0000',
        closable: true,
        decorative: false,
        close,
      })
    })

    it.each(['root', 'label', 'description', 'closeButtonContainer'] as const)(
      'Alert context to ui.%s function',
      (uiName) => {
        const ui = vi.fn(() => ({ class: `ui-${uiName}` }))

        mountAlert({
          props: {
            label: 'Actualización disponible',
            description: 'Hay una nueva versión',
            icon: 'check',
            closeButton: { label: 'Cerrar' },
            variant: 'outline',
            severity: 'success',
            color: '#ff0000',
            closable: true,
            decorative: false,
            ui: { [uiName]: ui },
          },
        })

        expect(ui).toHaveBeenCalledWith({
          label: 'Actualización disponible',
          description: 'Hay una nueva versión',
          icon: 'check',
          closeButton: { label: 'Cerrar' },
          variant: 'outline',
          severity: 'success',
          color: '#ff0000',
          closable: true,
          decorative: false,
          close: expect.any(Function),
        })
      },
    )

    it.each(['icon', 'label', 'description', 'close'] as const)(
      'Alert context to %s slot',
      (slotName) => {
        const slot = vi.fn(() => h('span', 'test'))

        mountAlert({
          props: {
            label: 'Actualización disponible',
            description: 'Hay una nueva versión',
            icon: 'check',
            closeButton: { label: 'Cerrar' },
            variant: 'outline',
            severity: 'success',
            color: '#ff0000',
            closable: true,
            decorative: false,
          },
          slots: { [slotName]: slot },
        })

        expect(slot).toHaveBeenCalledWith({
          label: 'Actualización disponible',
          description: 'Hay una nueva versión',
          icon: 'check',
          closeButton: { label: 'Cerrar' },
          variant: 'outline',
          severity: 'success',
          color: '#ff0000',
          closable: true,
          decorative: false,
          close: expect.any(Function),
        })
      },
    )
  })
})
