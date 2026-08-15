import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { AlertDialogContent, AlertDialogRoot } from 'reka-ui'
import {
  AlertDialog,
  type AlertDialogContext,
  createAlertDialogContext,
  type AlertDialogProps,
} from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { i18n } from '@/i18n'

function mountAlertDialog(options: MountingOptions<AlertDialogProps> = {}) {
  return mount(AlertDialog, {
    global: { plugins: [i18n], ...options.global },
    ...options,
  })
}

function mountAlertDialogInline(options: MountingOptions<AlertDialogProps> = {}) {
  return mount(AlertDialog, {
    global: {
      plugins: [i18n],
      stubs: { AlertDialogPortal: { template: '<div><slot /></div>' } },
      ...options.global,
    },
    ...options,
  })
}

function getTeleported(selector: string) {
  const element = document.body.querySelector(selector)
  if (!element) throw new Error(`Expected teleported element ${selector}`)
  return element
}

describe('AlertDialog', () => {
  describe('props', () => {
    describe('open', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
      ])('passes open=$input to AlertDialogRoot', ({ input, expected }) => {
        const alertDialog = mountAlertDialog({ props: { open: input } })

        expect(alertDialog.getComponent(AlertDialogRoot).props('open')).toBe(expected)
      })
    })

    describe('label', () => {
      it.each([{ input: 'Delete project', expected: 'Delete project' }])(
        'renders label=$input',
        async ({ input, expected }) => {
          mountAlertDialog({ props: { open: true, label: input } })
          await nextTick()

          expect(getTeleported('[data-test-alert-dialog-label]').textContent).toBe(expected)
        },
      )
    })

    describe('description', () => {
      it.each([
        { input: 'This action cannot be undone.', expected: 'This action cannot be undone.' },
      ])('renders description=$input', async ({ input, expected }) => {
        mountAlertDialog({ props: { open: true, description: input } })
        await nextTick()

        expect(getTeleported('[data-test-alert-dialog-description]').textContent).toBe(expected)
      })
    })

    describe('icon', () => {
      it.each([
        { input: 'warning' as const, expected: 'warning' },
        { input: { name: 'error' as const }, expected: 'error' },
      ])('passes icon=$input to Icon', async ({ input, expected }) => {
        const alertDialog = mountAlertDialog({
          props: { open: true, label: 'Warning', icon: input },
        })
        await nextTick()

        expect(alertDialog.getComponent('[data-test-alert-dialog-icon]').props('name')).toBe(
          expected,
        )
      })

      it('does not render an icon without the prop', async () => {
        const alertDialog = mountAlertDialog({ props: { open: true, label: 'Warning' } })
        await nextTick()

        expect(alertDialog.find('[data-test-alert-dialog-icon]').exists()).toBe(false)
      })
    })

    describe('actionButton', () => {
      it.each([
        {
          input: { label: 'Delete', severity: 'error' as const, variant: 'outline' as const },
          expected: { label: 'Delete', severity: 'error', variant: 'outline' },
        },
      ])('passes actionButton=$input to the action Button', async ({ input, expected }) => {
        const alertDialog = mountAlertDialog({
          props: {
            open: true,
            actionButton: input,
          },
        })
        await nextTick()

        const button = alertDialog
          .getComponent('[data-test-alert-dialog-action-button]')
          .getComponent(Button)

        expect(button.props('label')).toBe(expected.label)
        expect(button.props('severity')).toBe(expected.severity)
        expect(button.props('variant')).toBe(expected.variant)
      })
    })

    describe('cancelButton', () => {
      it.each([
        {
          input: { label: 'Keep project', severity: 'primary' as const },
          expected: { label: 'Keep project', severity: 'primary', variant: 'outline' },
        },
      ])('passes cancelButton=$input to the cancel Button', async ({ input, expected }) => {
        const alertDialog = mountAlertDialog({
          props: {
            open: true,
            cancelButton: input,
          },
        })
        await nextTick()

        const button = alertDialog
          .getComponent('[data-test-alert-dialog-cancel-button]')
          .getComponent(Button)

        expect(button.props('label')).toBe(expected.label)
        expect(button.props('severity')).toBe(expected.severity)
        expect(button.props('variant')).toBe(expected.variant)
      })
    })

    describe('unmountOnHide', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: true },
      ])('passes unmountOnHide=$input to AlertDialogRoot', ({ input, expected }) => {
        const alertDialog = mountAlertDialog({ props: { unmountOnHide: input } })
        const root = alertDialog.getComponent(AlertDialogRoot)

        expect(root.props('unmountOnHide')).toBe(expected)
      })
    })

    describe('forceMount', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: undefined },
      ])('passes forceMount=$input to AlertDialogContent', ({ input, expected }) => {
        const alertDialog = mountAlertDialogInline({ props: { open: true, forceMount: input } })
        const content = alertDialog
          .findAllComponents(AlertDialogContent)
          .find((component) => component.attributes('data-test-alert-dialog-content') !== undefined)
        if (!content) throw new Error('Expected AlertDialogContent')

        expect(content.props('forceMount')).toBe(expected)
      })
    })

    describe('disableOutsidePointerEvents', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: true },
      ])(
        'passes disableOutsidePointerEvents=$input to AlertDialogContent',
        ({ input, expected }) => {
          const alertDialog = mountAlertDialogInline({
            props: { open: true, disableOutsidePointerEvents: input },
          })
          const content = alertDialog
            .findAllComponents(AlertDialogContent)
            .find(
              (component) => component.attributes('data-test-alert-dialog-content') !== undefined,
            )
          if (!content) throw new Error('Expected AlertDialogContent')

          expect(content.props('disableOutsidePointerEvents')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      const parts = [
        { input: 'trigger', expected: 'ui-trigger' },
        { input: 'overlay', expected: 'ui-overlay' },
        { input: 'content', expected: 'ui-content' },
        { input: 'header', expected: 'ui-header' },
        { input: 'label', expected: 'ui-label' },
        { input: 'description', expected: 'ui-description' },
        { input: 'body', expected: 'ui-body' },
        { input: 'footer', expected: 'ui-footer' },
      ] as const

      it.each(parts)(
        'passes ui.$input attributes to the internal part',
        async ({ input, expected }) => {
          const alertDialog = mountAlertDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              ui: { [input]: () => ({ class: expected, style: 'opacity: 0.8' }) },
            },
            slots: {
              default: () => h('button', 'Open'),
              content: () => h('span', 'Body'),
            },
          })
          await nextTick()

          const element =
            input === 'trigger'
              ? alertDialog.get(`.${expected}`).element
              : getTeleported(`.${expected}`)

          expect(element.getAttribute('style')).toContain('opacity: 0.8')
        },
      )
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs, class and style to AlertDialogRoot', () => {
      const attrs = {
        id: 'alert-dialog',
        'aria-label': 'Confirm action',
        class: 'custom-alert-dialog',
        style: 'opacity: 0.8',
      }
      const alertDialog = mountAlertDialog({ attrs })
      const root = alertDialog.getComponent(AlertDialogRoot)

      expect(root.vm.$attrs).toEqual(
        expect.objectContaining({
          ...attrs,
          style: { opacity: '0.8' },
        }),
      )
    })
  })

  describe('context contract', () => {
    const ui = {
      trigger: () => ({ class: 'custom-trigger' }),
    }

    it.each([
      {
        name: 'default values',
        input: { props: {}, open: undefined },
        expected: { ui: undefined, open: false },
      },
      {
        name: 'closed dialog without ui',
        input: { props: {}, open: false },
        expected: { ui: undefined, open: false },
      },
      {
        name: 'configured dialog',
        input: { props: { ui }, open: true },
        expected: { ui, open: true },
      },
    ])('creates the contract with $name', ({ input, expected }) => {
      const close = vi.fn()

      expect(createAlertDialogContext(input.props, input.open, close)).toEqual({
        ...expected,
        close,
      } satisfies AlertDialogContext)
    })
  })

  describe('slots', () => {
    const slotCases = [
      { input: 'default', expected: 'default', teleported: false },
      { input: 'content', expected: 'content', teleported: true },
      { input: 'header', expected: 'header', teleported: true },
      { input: 'label', expected: 'label', teleported: true },
      { input: 'description', expected: 'description', teleported: true },
      { input: 'footer', expected: 'footer', teleported: true },
      { input: 'action', expected: 'action', teleported: true },
      { input: 'cancel', expected: 'cancel', teleported: true },
    ] as const

    it.each(slotCases)('renders the $input slot', async ({ input, expected, teleported }) => {
      const alertDialog = mountAlertDialog({
        props: { open: true },
        slots: {
          [input]: () => h('span', { 'data-test-alert-dialog-slot': expected }, `Slot ${expected}`),
        },
      })
      await nextTick()

      const element = teleported
        ? getTeleported(`[data-test-alert-dialog-slot="${expected}"]`)
        : alertDialog.get(`[data-test-alert-dialog-slot="${expected}"]`).element

      expect(element.textContent).toBe(`Slot ${expected}`)
    })
  })

  describe('emits', () => {
    describe('action', () => {
      it('emits action from the action button', async () => {
        const alertDialog = mountAlertDialog({ props: { open: true } })
        await nextTick()
        const actionButton = alertDialog.getComponent('[data-test-alert-dialog-action-button]')

        await actionButton.trigger('click')

        expect(alertDialog.emitted('action')).toEqual([[expect.any(Event)]])
      })
    })

    describe('cancel', () => {
      it('emits cancel from the cancel button', async () => {
        const alertDialog = mountAlertDialog({ props: { open: true } })
        await nextTick()
        const cancelButton = alertDialog.getComponent('[data-test-alert-dialog-cancel-button]')

        await cancelButton.trigger('click')

        expect(alertDialog.emitted('cancel')).toEqual([[expect.any(Event)]])
      })
    })
  })
})
