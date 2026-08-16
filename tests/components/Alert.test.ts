import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import {
  Alert,
  createAlertContext,
  type AlertContext,
  type AlertProps,
} from '@/components/ui/Alert'
import { i18n } from '@/i18n'

function mountAlert(options: MountingOptions<AlertProps> = {}) {
  return mount(Alert, {
    global: { plugins: [i18n], ...options.global },
    ...options,
  })
}

describe('Alert', () => {
  describe('props', () => {
    it.each([
      { prop: 'label' as const, value: 'Saved', selector: 'label' },
      { prop: 'description' as const, value: 'Changes saved', selector: 'description' },
    ])('renders $prop', ({ prop, value, selector }) => {
      const alert = mountAlert({ props: { [prop]: value } })

      expect(alert.get(`[data-test-alert-${selector}]`).text()).toBe(value)
    })

    it('does not render empty optional parts', () => {
      const alert = mountAlert()

      expect(alert.find('[data-test-alert-icon]').exists()).toBe(false)
      expect(alert.find('[data-test-alert-label]').exists()).toBe(false)
      expect(alert.find('[data-test-alert-description]').exists()).toBe(false)
      expect(alert.find('[data-test-alert-close-button]').exists()).toBe(false)
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

    it('applies a custom color', () => {
      const root = mountAlert({ props: { color: '#ff0000' } }).get('[data-test-alert-root]')

      expect(root.attributes('style')).toContain('--alert-color: #ff0000')
      expect(root.classes()).toContain('[--alert-solid:var(--alert-color)]')
    })

    describe('icon', () => {
      it.each([
        { input: 'info' as const, expected: 'info' },
        { input: { name: 'info' as const }, expected: 'info' },
        { input: undefined, expected: undefined },
      ])('renders icon=$input as $expected', ({ input, expected }) => {
        const alert = mountAlert({ props: { icon: input } })
        const icon = alert.findComponent('[data-test-alert-icon]')

        expect(icon.exists()).toBe(expected !== undefined)
        if (expected !== undefined) expect(icon.props('name')).toBe(expected)
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

    describe('ui', () => {
      const parts = ['label', 'description', 'closeButtonContainer'] as const

      it.each(parts)('renders ui.%s attributes', (part) => {
        const alert = mountAlert({
          props: {
            label: 'Saved',
            description: 'Changes saved',
            closable: true,
            ui: { [part]: () => ({ class: `ui-${part}`, style: 'opacity: 0.8' }) },
          },
        })
        const element =
          part === 'closeButtonContainer'
            ? alert.get('[data-test-alert-close-button]').element.parentElement
            : alert.get(`[data-test-alert-${part}]`).element

        expect(element?.classList).toContain(`ui-${part}`)
        expect(element?.getAttribute('style')).toContain('opacity: 0.8')
      })
    })
  })

  describe('emits', () => {
    it('closes and emits close from the default button', async () => {
      const alert = mountAlert({ props: { closable: true } })

      await alert.get('[data-test-alert-close-button]').trigger('click')

      expect(alert.emitted('close')).toHaveLength(1)
      expect(alert.find('[data-test-alert-root]').exists()).toBe(false)
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountAlert({
        attrs: {
          id: 'status',
          'aria-label': 'Status',
          class: 'custom-alert',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-alert-root]')

      expect(root.attributes('id')).toBe('status')
      expect(root.attributes('aria-label')).toBe('Status')
      expect(root.classes()).toContain('custom-alert')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('context contract', () => {
    it('creates the effective context', () => {
      const close = vi.fn()
      const ui = { label: () => ({ class: 'custom-label' }) }
      const context = createAlertContext(
        {
          ui,
        },
        close,
      )

      expect(context).toEqual({
        ui,
        closable: true,
        close,
      } satisfies AlertContext)
    })
  })

  describe('slots', () => {
    const slotCases = ['icon', 'label', 'description', 'close'] as const

    it.each(slotCases)('renders the %s slot', (slot) => {
      const alert = mountAlert({
        props: { closable: slot === 'close' },
        slots: {
          [slot]: () => h('span', { 'data-test-alert-slot': slot }, `Slot ${slot}`),
        },
      })

      expect(alert.get(`[data-test-alert-slot="${slot}"]`).text()).toBe(`Slot ${slot}`)
    })

    it('lets a custom close slot close the alert through its context', async () => {
      const alert = mountAlert({
        props: { closable: true },
        slots: {
          close: (context: AlertContext) =>
            h('button', { 'data-test-custom-close': '', onClick: context.close }, 'Close'),
        },
      })

      await alert.get('[data-test-custom-close]').trigger('click')

      expect(alert.emitted('close')).toHaveLength(1)
      expect(alert.find('[data-test-alert-root]').exists()).toBe(false)
    })
  })
})
