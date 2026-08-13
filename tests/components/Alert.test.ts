import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import {
  Alert,
  createAlertContext,
  type AlertContext,
  type AlertProps,
} from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
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
  describe('props', () => {
    it('render label', () => {
      const alert = mountAlert({
        props: {
          label: 'Label',
        },
      })

      expect(alert.get('[data-test-alert-label]').text()).toBe('Label')
    })

    it('render description', () => {
      const alert = mountAlert({
        props: {
          description: 'Description',
        },
      })

      expect(alert.get('[data-test-alert-description]').text()).toBe('Description')
    })

    it('render icon', () => {
      const alert = mountAlert({
        props: {
          icon: 'error',
        },
      })

      const icon = alert.getComponent(Icon)
      expect(icon.props('name')).toBe('error')
    })

    it.each([
      ['solid', ['border-transparent', 'bg-(--alert-solid)', 'text-(--alert-solid-foreground)']],
      ['outline', ['border-(--alert-color)/40', 'bg-transparent', 'text-(--alert-color)']],
      ['plain', ['border-transparent', 'bg-transparent', 'text-(--alert-color)']],
      ['subtle', ['border-(--alert-color)/20', 'bg-(--alert-color)/10', 'text-(--alert-color)']],
      ['soft', ['border-transparent', 'bg-(--alert-color)/10', 'text-(--alert-color)']],
    ] as const)('applies the %s variant', (variant, expectedClasses) => {
      const wrapper = mountAlert({ props: { variant } })

      expect(wrapper.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it.each([
      ['primary', '[--alert-color:var(--primary)]'],
      ['secondary', '[--alert-color:var(--secondary-foreground)]'],
      ['warning', '[--alert-color:var(--warning)]'],
      ['success', '[--alert-color:var(--success)]'],
      ['error', '[--alert-color:var(--error)]'],
    ] as const)('applies the %s severity', (severity, expectedClass) => {
      const wrapper = mountAlert({ props: { severity } })

      expect(wrapper.classes()).toContain(expectedClass)
    })

    it('applies a custom color', () => {
      const wrapper = mountAlert({ props: { color: '#ff0000' } })

      expect(wrapper.attributes('style')).toContain('--alert-color: #ff0000')
      expect(wrapper.attributes('style')).toContain('--alert-color-foreground: #09090b')
      expect(wrapper.classes()).toContain('[--alert-solid:var(--alert-color)]')
    })

    it('uses the alert role alert when decorative false', () => {
      expect(mountAlert({ props: { decorative: false } }).attributes('role')).toBe('alert')
    })

    it('uses no alert semantics when decorative', () => {
      expect(mountAlert({ props: { decorative: true } }).attributes('role')).toBe('none')
    })

    it('renders the default close button when closable', () => {
      const button = mountAlert({ props: { closable: true } }).findComponent(Button)

      expect(button.exists()).toBe(true)
      expect(button.props()).toMatchObject({
        size: 'xs',
        square: true,
        rounded: true,
        variant: 'soft',
        severity: 'primary',
        icon: 'x',
      })
      expect(button.attributes('aria-label')).toBeTruthy()
    })

    it('passes closeButton configuration to Button', () => {
      const button = mountAlert({
        props: {
          closable: true,
          closeButton: {
            label: 'Dismiss',
            size: 'lg',
            variant: 'outline',
            severity: 'error',
            icon: 'check',
          },
        },
      }).findComponent(Button)

      expect(button.props()).toMatchObject({
        label: 'Dismiss',
        size: 'lg',
        variant: 'outline',
        severity: 'error',
        icon: 'check',
      })
    })

    describe('ui', () => {
      it.each(['root', 'label', 'description', 'closeButtonContainer'] as const)(
        'renders ui.%s attributes',
        (uiName) => {
          const alert = mountAlert({
            props: {
              label: 'Label',
              description: 'Description',
              closable: true,
              ui: {
                [uiName]: () => ({
                  class: `ui-${uiName}`,
                  'data-test-alert-ui': uiName,
                  style: 'opacity: 0.8',
                }),
              },
            },
          })

          const element = alert.get(`[data-test-alert-ui="${uiName}"]`)

          expect(element.classes()).toContain(`ui-${uiName}`)
          expect(element.attributes('style')).toContain('opacity: 0.8')
        },
      )

      describe('context', () => {
        it.each(['root', 'label', 'description', 'closeButtonContainer'] as const)(
          'passes AlertContext to ui.%s',
          (uiName) => {
            const ui = vi.fn(() => ({}))

            mountAlert({
              props: {
                label: 'Label',
                description: 'Description',
                icon: 'info',
                variant: 'outline',
                severity: 'warning',
                color: '#ff0000',
                closable: true,
                decorative: true,
                ui: { [uiName]: ui },
              },
            })

            expect(ui).toHaveBeenCalledWith({
              label: 'Label',
              description: 'Description',
              icon: 'info',
              variant: 'outline',
              severity: 'warning',
              color: '#ff0000',
              closable: true,
              decorative: true,
              close: expect.any(Function),
            } satisfies AlertContext)
          },
        )
      })
    })
  })

  describe('attrs', () => {
    it('forwards attrs, class and style to the root', () => {
      const wrapper = mountAlert({
        attrs: {
          id: 'status',
          'aria-live': 'polite',
          'data-testid': 'alert',
          class: 'custom-alert',
          style: 'opacity: 0.5',
        },
      })

      expect(wrapper.attributes('id')).toBe('status')
      expect(wrapper.attributes('aria-live')).toBe('polite')
      expect(wrapper.attributes('data-testid')).toBe('alert')
      expect(wrapper.classes()).toContain('custom-alert')
      expect(wrapper.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('emits', () => {
    it('hides the alert and emits close', async () => {
      const wrapper = mountAlert({ props: { closable: true } })

      await wrapper.findComponent(Button).trigger('click')

      expect(wrapper.html()).toBe('<!--v-if-->')
      expect(wrapper.emitted('close')).toEqual([[]])
    })
  })

  describe('context', () => {
    it('provides the AlertContext contract', () => {
      const close = vi.fn()
      const context = createAlertContext(
        {
          label: 'Label',
          description: 'Description',
          icon: 'info',
          variant: 'outline',
          severity: 'warning',
          color: '#ff0000',
          closable: true,
          decorative: true,
        },
        close,
      )

      expect(context).toEqual({
        label: 'Label',
        description: 'Description',
        icon: 'info',
        variant: 'outline',
        severity: 'warning',
        color: '#ff0000',
        closable: true,
        decorative: true,
        close,
      } satisfies AlertContext)
    })
  })

  describe('slots', () => {
    it.each([
      ['icon', 'check'],
      ['label', 'Label'],
      ['description', 'Description'],
      ['close', undefined],
    ] as const)('renders the %s slot', (slotName, propValue) => {
      const props: AlertProps = {
        closable: slotName === 'close',
      }

      if (slotName === 'icon') props.icon = propValue
      if (slotName === 'label') props.label = propValue
      if (slotName === 'description') props.description = propValue

      const alert = mountAlert({
        props,
        slots: {
          [slotName]: () => h('span', { 'data-test-alert-slot': slotName }, `Slot ${slotName}`),
        },
      })

      expect(alert.get(`[data-test-alert-slot="${slotName}"]`).text()).toBe(`Slot ${slotName}`)
      if (slotName === 'icon') expect(alert.findComponent(Icon).exists()).toBe(false)
      if (slotName === 'close') expect(alert.findComponent(Button).exists()).toBe(false)
      if (propValue) expect(alert.text()).not.toContain(propValue)
    })

    describe('context', () => {
      it.each(['icon', 'label', 'description', 'close'] as const)(
        'passes AlertContext to the %s slot',
        (slotName) => {
          const slot = vi.fn(() => null)

          mountAlert({
            props: {
              label: 'Label',
              description: 'Description',
              icon: 'check',
              closable: true,
            },
            slots: {
              [slotName]: slot,
            },
          })

          expect(slot.mock.calls[0][0]).toMatchObject({
            label: 'Label',
            description: 'Description',
            icon: 'check',
            variant: 'soft',
            severity: 'primary',
            color: undefined,
            closable: true,
            decorative: false,
            close: expect.any(Function),
          } satisfies AlertContext)
        },
      )
    })
  })
})

//   describe('ui', () => {
//     it.each(['root', 'label', 'description', 'closeButtonContainer'] as const)(
//       'passes AlertContext to ui.%s',
//       (uiName) => {
//         const ui = vi.fn(() => ({ 'data-testid': uiName }))

//         mountAlert({
//           props: {
//             label: 'Label',
//             description: 'Description',
//             closable: true,
//             ui: { [uiName]: ui },
//           },
//         })

//         expect(ui).toHaveBeenCalledWith(
//           expect.objectContaining({
//             label: 'Label',
//             description: 'Description',
//             variant: 'soft',
//             severity: 'primary',
//             closable: true,
//             decorative: false,
//             close: expect.any(Function),
//           }),
//         )
//       },
//     )

//     it('applies attrs, classes and styles to every UI part', () => {
//       const wrapper = mountAlert({
//         props: {
//           label: 'Label',
//           description: 'Description',
//           closable: true,
//           ui: {
//             root: () => ({ class: 'ui-root', style: 'opacity: 0.8', 'data-testid': 'root' }),
//             label: () => ({ class: 'ui-label', 'data-testid': 'label' }),
//             description: () => ({ class: 'ui-description', 'data-testid': 'description' }),
//             closeButtonContainer: () => ({ class: 'ui-close', 'data-testid': 'close' }),
//           },
//         },
//       })

//       expect(wrapper.classes()).toContain('ui-root')
//       expect(wrapper.attributes('style')).toContain('opacity: 0.8')
//       expect(wrapper.get('[data-testid="label"]').classes()).toContain('ui-label')
//       expect(wrapper.get('[data-testid="description"]').classes()).toContain('ui-description')
//       expect(wrapper.get('[data-testid="close"]').classes()).toContain('ui-close')
//     })
//   })

//   describe('slots', () => {
//     it.each(['icon', 'label', 'description', 'close'] as const)(
//       'passes AlertContext to the %s slot',
//       (slotName) => {
//         const slot = vi.fn(() => null)

//         mountAlert({
//           props: {
//             label: 'Label',
//             description: 'Description',
//             icon: 'check',
//             closable: true,
//           },
//           slots: { [slotName]: slot },
//         })

//         expect(slot.mock.calls[0][0]).toMatchObject({
//           label: 'Label',
//           description: 'Description',
//           icon: 'check',
//           variant: 'soft',
//           severity: 'primary',
//           closable: true,
//           decorative: false,
//           close: expect.any(Function),
//         })
//       },
//     )

//     it.each([
//       ['icon', 'check'],
//       ['label', 'Label'],
//       ['description', 'Description'],
//       ['close', undefined],
//     ] as const)('allows the %s slot to replace its default content', (slotName, propValue) => {
//       const props: AlertProps = { closable: slotName === 'close' }

//       if (slotName === 'icon') props.icon = propValue
//       if (slotName === 'label') props.label = propValue
//       if (slotName === 'description') props.description = propValue

//       const wrapper = mountAlert({
//         props,
//         slots: {
//           [slotName]: () => h('span', { 'data-testid': slotName }, `Custom ${slotName}`),
//         },
//       })

//       expect(wrapper.get(`[data-testid="${slotName}"]`).text()).toBe(`Custom ${slotName}`)
//       if (slotName === 'icon') expect(wrapper.findComponent(Icon).exists()).toBe(false)
//       if (slotName === 'close') expect(wrapper.findComponent(Button).exists()).toBe(false)
//       if (propValue) expect(wrapper.text()).not.toContain(propValue)
//     })
//   })
// })
