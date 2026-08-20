import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Alert,
  type AlertProps,
} from '@/components/ui/Alert'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'
import { testButtonConfig } from '../utils/testButtonConfig'
import { testColor } from '../utils/testColor'
import { testIconProps, testIconSize } from '../utils/testIconProps'

function mountAlert(options: MountingOptions<AlertProps> = {}) {
  return mount(Alert, {
    global: { plugins: [i18n], ...options.global },
    ...options,
  })
}

describe('Alert', () => {
  describe('props', () => {
    describe('label', () => {
      it.each([
        { input: 'Saved', expected: 'Saved' },
        { input: '', expected: undefined },
        { input: undefined, expected: undefined },
      ])('renders label=$input as "$expected"', ({ input, expected }) => {
        const alert = mountAlert({ props: { label: input } })
        const label = alert.find('[data-test-alert-label]')

        expect(label.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(label.text()).toBe(expected)
      })
    })

    describe('description', () => {
      it.each([
        { input: 'Changes saved', expected: 'Changes saved' },
        { input: '', expected: undefined },
        { input: undefined, expected: undefined },
      ])('renders description=$input as "$expected"', ({ input, expected }) => {
        const alert = mountAlert({ props: { description: input } })
        const description = alert.find('[data-test-alert-description]')

        expect(description.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(description.text()).toBe(expected)
      })
    })

    describe('variant', () => {
      it.each([
        { input: 'solid' as const, expected: ['border-transparent', 'bg-(--alert-solid)'] },
        { input: 'outline' as const, expected: ['border-(--alert-color)/40', 'bg-transparent'] },
        { input: 'plain' as const, expected: ['border-transparent', 'bg-transparent'] },
        {
          input: 'subtle' as const,
          expected: ['border-(--alert-color)/20', 'bg-(--alert-color)/10'],
        },
        { input: 'soft' as const, expected: ['border-transparent', 'bg-(--alert-color)/10'] },
      ])('renders variant=$input', ({ input, expected }) => {
        const root = mountAlert({ props: { variant: input } }).get('[data-test-alert-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('severity', () => {
      it.each(['primary', 'secondary', 'warning', 'success', 'error'] as const)(
        'renders severity=%s',
        (severity) => {
          const root = mountAlert({ props: { severity } }).get('[data-test-alert-root]')

          expect(root.classes()).toContain(
            `[--alert-color:var(--${severity === 'secondary' ? 'secondary-foreground' : severity})]`,
          )
        },
      )
    })

    describe('color', () => {
      testColor({
        text: 'renders color',
        id: '[data-test-alert-root]',
        varColor: '--alert-color',
        mount: (color) => mountAlert({ props: { color } }),
      })

    })

    describe('icon', () => {
      testIconProps({
        text: 'passes icon props',
        id: '[data-test-alert-icon]',
        mount: (input) => mountAlert({ props: { icon: input } }),
      })
    })

    describe('closeButton', () => {
      testButtonConfig({
        text: 'passes closeButton config to Button',
        id: '[data-test-alert-close-button]',
        mount: (input) => mountAlert({ props: { closable: true, closeButton: input } }),
      })

      it('default configuration closeButton', () => {
        const alert = mountAlert({
          props: {
            closable: true,
            variant: 'outline',
            severity: 'warning',
            color: '#ff0000',
          },
        })
        const closeButton = alert.getComponent('[data-test-alert-close-button]')

        expect(closeButton.props()).toEqual(
          expect.objectContaining({
            icon: { name: 'x' },
            size: 'xs',
            square: true,
            rounded: true,
            variant: 'outline',
            severity: 'warning',
            color: '#ff0000',
          }),
        )
        expect(closeButton.attributes('aria-label')).toBe(i18n.global.t('close'))      
      })
    })

    describe('decorative', () => {
      it.each([
        { input: true as const, expected: 'none' },
        { input: false as const, expected: 'alert' },
        { input: undefined, expected: 'alert' },
      ])('renders decorative=$input as role=$expected', ({ input, expected }) => {
        const alert = mountAlert({ props: { decorative: input } })

        expect(alert.get('[data-test-alert-root]').attributes('role')).toBe(expected)
      })
    })

    describe('closable', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('renders close button for closable=$input', ({ input, expected }) => {
        const alert = mountAlert({ props: { closable: input } })

        expect(alert.find('[data-test-alert-close-button]').exists()).toBe(expected)
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'renders ui.label attributes',
        id: '[data-test-alert-label]',
        mount: (attrs) =>
          mountAlert({
            props: { label: 'Saved', ui: { label: () => attrs } },
          }),
      })

      testAttrs({
        text: 'renders ui.description attributes',
        id: '[data-test-alert-description]',
        mount: (attrs) =>
          mountAlert({
            props: { description: 'Changes saved', ui: { description: () => attrs } },
          }),
      })

      it('renders ui.closeButtonContainer attributes', () => {
        const alert = mountAlert({
          props: {
            closable: true,
            ui: {
              closeButtonContainer: () => ({ class: 'ui-closeButtonContainer', style: 'opacity: 0.8' }),
            },
          },
        })
        const element = alert.get('[data-test-alert-close-button]').element.parentElement

        expect(element?.classList).toContain('ui-closeButtonContainer')
        expect(element?.getAttribute('style')).toContain('opacity: 0.8')
      })
    })
  })

  describe('emits', () => {
    describe('close', () => {
      it('closes and emits close from the default button', async () => {
        const alert = mountAlert({ props: { closable: true } })

        await alert.get('[data-test-alert-close-button]').trigger('click')

        expect(alert.emitted('close')).toHaveLength(1)
        expect(alert.find('[data-test-alert-root]').exists()).toBe(false)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-alert-root]',
      mount: (attrs) => mountAlert({ attrs }),
    })
  })

  describe('slots', () => {
    describe('icon', () => {
      it('renders the icon slot', () => {
        const alert = mountAlert({
          props: { icon: { name: 'info' } },
          slots: {
            icon: () => h('span', { 'data-test-alert-slot': 'icon' }, 'Slot icon'),
          },
        })

        expect(alert.get('[data-test-alert-slot="icon"]').text()).toBe('Slot icon')
        expect(alert.find('[data-test-alert-icon]').exists()).toBe(false)
      })
    })

    describe('label', () => {
      it('renders the label slot', () => {
        const alert = mountAlert({
          slots: {
            label: () => h('span', { 'data-test-alert-slot': 'label' }, 'Slot label'),
          },
        })

        expect(alert.get('[data-test-alert-slot="label"]').text()).toBe('Slot label')
        expect(alert.text()).not.toContain('Saved')
      })
    })

    describe('description', () => {
      it('renders the description slot', () => {
        const alert = mountAlert({
          slots: {
            description: () =>
              h('span', { 'data-test-alert-slot': 'description' }, 'Slot description'),
          },
        })

        expect(alert.get('[data-test-alert-slot="description"]').text()).toBe('Slot description')
        expect(alert.text()).not.toContain('Changes saved')
      })
    })

    describe('close', () => {
      it('renders the close slot', () => {
        const alert = mountAlert({
          props: { closable: true },
          slots: {
            close: () => h('span', { 'data-test-alert-slot': 'close' }, 'Slot close'),
          },
        })

        expect(alert.get('[data-test-alert-slot="close"]').text()).toBe('Slot close')
        expect(alert.find('[data-test-alert-close-button]').exists()).toBe(false)
      })

      it('exposes the close function in slot props', async () => {
        const alert = mountAlert({
          props: { closable: true },
          slots: {
            close: ({ close }) =>
              h(
                'button',
                { 'data-test-alert-slot': 'close', onClick: close },
                'Slot close',
              ),
          },
        })

        await alert.get('[data-test-alert-slot="close"]').trigger('click')

        expect(alert.emitted('close')).toHaveLength(1)
        expect(alert.find('[data-test-alert-root]').exists()).toBe(false)
      })
    })
  })

})
