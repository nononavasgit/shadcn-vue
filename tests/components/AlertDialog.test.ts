import { mount, type MountingOptions } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
} from 'reka-ui'
import { AlertDialog, type AlertDialogProps } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { i18n } from '@/i18n'
import { testButtonConfig } from '../utils/testButtonConfig'
import { testAttrs } from '../utils/testAttrs'
import { testIconProps } from '../utils/testIconProps'

afterEach(() => {
  document.body.innerHTML = ''
})

function mountAlertDialog(options: MountingOptions<AlertDialogProps> = {}) {
  return mount(AlertDialog, {
    ...options,
    attachTo: document.body,
    global: { plugins: [i18n], ...options.global },
    props: {
      label: 'Test dialog',
      description: 'Test dialog description',
      ...options.props,
    },
  })
}

function mountAlertDialogInline(options: MountingOptions<AlertDialogProps> = {}) {
  return mount(AlertDialog, {
    ...options,
    attachTo: document.body,
    global: {
      plugins: [i18n],
      stubs: { AlertDialogPortal: { template: '<div><slot /></div>' } },
      ...options.global,
    },
    props: {
      label: 'Test dialog',
      description: 'Test dialog description',
      ...options.props,
    },
  })
}

function getRendered(wrapper: ReturnType<typeof mountAlertDialog>, selector: string) {
  return wrapper.get(selector).element
}

describe('AlertDialog', () => {
  describe('props', () => {
    describe('portal', () => {
      it('points to the local target after the trigger', async () => {
        const alertDialog = mountAlertDialog({
          slots: { default: () => h('button', 'Open') },
        })
        await nextTick()

        const portal = alertDialog.getComponent(AlertDialogPortal)
        const trigger = alertDialog.get('[data-test-alert-dialog-trigger]')
        const target = alertDialog.get('[data-test-alert-dialog-portal-target]').element

        expect(portal.vm.$.vnode.props?.to).toBe(target)
        expect(
          trigger.element.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy()
      })
    })

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
          const alertDialog = mountAlertDialog({ props: { open: true, label: input } })
          await nextTick()

          expect(getRendered(alertDialog, '[data-test-alert-dialog-label]').textContent).toBe(
            expected,
          )
        },
      )
    })

    describe('description', () => {
      it.each([
        { input: 'This action cannot be undone.', expected: 'This action cannot be undone.' },
      ])('renders description=$input', async ({ input, expected }) => {
        const alertDialog = mountAlertDialog({ props: { open: true, description: input } })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-description]').textContent).toBe(
          expected,
        )
      })
    })

    describe('icon', () => {
      testIconProps({
        text: 'passes icon props',
        id: '[data-test-alert-dialog-icon]',
        mount: async (input) => {
          const alertDialog = mountAlertDialog({
            props: { open: true, label: 'Warning', icon: input },
          })
          await nextTick()
          return alertDialog
        },
      })
    })

    describe('actionButton', () => {
      testButtonConfig({
        text: 'passes actionButton config to Button',
        id: '[data-test-alert-dialog-action-button]',
        mount: async (input) => {
          const alertDialog = mountAlertDialog({
            props: { open: true, actionButton: input },
          })
          await nextTick()
          return alertDialog
        },
      })
    })

    describe('cancelButton', () => {
      testButtonConfig({
        text: 'passes cancelButton config to Button',
        id: '[data-test-alert-dialog-cancel-button]',
        mount: async (input) => {
          const alertDialog = mountAlertDialog({
            props: { open: true, cancelButton: input },
          })
          await nextTick()
          return alertDialog
        },
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
      describe('trigger', () => {
        testAttrs({
          text: 'renders ui.trigger attributes',
          id: '[data-test-alert-dialog-trigger]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { ui: { trigger: () => attrs } },
              slots: { default: () => h('button', 'Open') },
            }),
        })
      })

      describe('overlay', () => {
        testAttrs({
          text: 'renders ui.overlay attributes',
          id: '[data-test-alert-dialog-overlay]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { overlay: () => attrs } },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'renders ui.content attributes',
          id: '[data-test-alert-dialog-content]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { content: () => attrs } },
            }),
        })
      })

      describe('header', () => {
        testAttrs({
          text: 'renders ui.header attributes',
          id: '[data-test-alert-dialog-header]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { header: () => attrs } },
            }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'renders ui.label attributes',
          id: '[data-test-alert-dialog-label]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { label: () => attrs } },
            }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'renders ui.description attributes',
          id: '[data-test-alert-dialog-description]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { description: () => attrs } },
            }),
        })
      })

      describe('body', () => {
        testAttrs({
          text: 'renders ui.body attributes',
          id: '[data-test-alert-dialog-body]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { body: () => attrs } },
              slots: { content: () => h('span', 'Body') },
            }),
        })
      })

      describe('footer', () => {
        testAttrs({
          text: 'renders ui.footer attributes',
          id: '[data-test-alert-dialog-footer]',
          mount: (attrs) =>
            mountAlertDialog({
              props: { open: true, ui: { footer: () => attrs } },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-alert-dialog-root]',
      mount: (attrs) => mountAlertDialog({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renders the default slot in the trigger', () => {
        const alertDialog = mountAlertDialog({
          slots: {
            default: () => h('span', { 'data-test-alert-dialog-slot': 'default' }, 'Slot default'),
          },
        })

        expect(alertDialog.get('[data-test-alert-dialog-slot="default"]').text()).toBe(
          'Slot default',
        )
      })
    })

    describe('content', () => {
      it('renders the content slot', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: { content: () => h('span', 'Slot content') },
        })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-content]').textContent).toContain(
          'Slot content',
        )
      })
    })

    describe('header', () => {
      it('renders the header slot', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: {
            header: () =>
              h('div', [
                h(AlertDialogTitle, null, () => 'Slot header'),
                h(AlertDialogDescription, null, () => 'Slot header description'),
              ]),
          },
        })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-header]').textContent).toContain(
          'Slot header',
        )
      })
    })

    describe('label', () => {
      it('renders the label slot', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true, label: 'Default label' },
          slots: { label: () => h('span', 'Slot label') },
        })
        await nextTick()

        const label = getRendered(alertDialog, '[data-test-alert-dialog-label]')
        expect(label.textContent).toContain('Slot label')
        expect(label.textContent).not.toContain('Default label')
      })
    })

    describe('description', () => {
      it('renders the description slot', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true, description: 'Default description' },
          slots: { description: () => h('span', 'Slot description') },
        })
        await nextTick()

        const description = getRendered(alertDialog, '[data-test-alert-dialog-description]')
        expect(description.textContent).toContain('Slot description')
        expect(description.textContent).not.toContain('Default description')
      })
    })

    describe('footer', () => {
      it('renders the footer slot', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: { footer: () => h('span', 'Slot footer') },
        })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-footer]').textContent).toBe(
          'Slot footer',
        )
      })
    })

    describe('action', () => {
      it('renders the action slot', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: { action: () => h('button', 'Slot action') },
        })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-footer]').textContent).toContain(
          'Slot action',
        )
        expect(alertDialog.find('[data-test-alert-dialog-action-button]').exists()).toBe(false)
      })

      it('exposes close in slot props', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: {
            action: ({ close }) =>
              h('button', { 'data-test-alert-dialog-slot': 'action', onClick: close }, 'Action'),
          },
        })
        await nextTick()

        await alertDialog.get('[data-test-alert-dialog-slot="action"]').trigger('click')

        expect(alertDialog.emitted('update:open')).toEqual([[false]])
      })
    })

    describe('cancel', () => {
      it('renders the cancel slot', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: { cancel: () => h('button', 'Slot cancel') },
        })
        await nextTick()

        expect(getRendered(alertDialog, '[data-test-alert-dialog-footer]').textContent).toContain(
          'Slot cancel',
        )
        expect(alertDialog.find('[data-test-alert-dialog-cancel-button]').exists()).toBe(false)
      })

      it('exposes close in slot props', async () => {
        const alertDialog = mountAlertDialog({
          props: { open: true },
          slots: {
            cancel: ({ close }) =>
              h('button', { 'data-test-alert-dialog-slot': 'cancel', onClick: close }, 'Cancel'),
          },
        })
        await nextTick()

        await alertDialog.get('[data-test-alert-dialog-slot="cancel"]').trigger('click')

        expect(alertDialog.emitted('update:open')).toEqual([[false]])
      })
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
