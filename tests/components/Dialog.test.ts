import { h, nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { mount, type MountingOptions } from '@vue/test-utils'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { Dialog, type DialogContext, type DialogProps } from '@/components/ui/Dialog'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'
import { testIconProps } from '../utils/testIconProps'

afterEach(() => {
  document.body.innerHTML = ''
})

function mountDialog(options: MountingOptions<DialogProps> = {}) {
  return mount(Dialog, {
    attachTo: document.body,
    global: {
      plugins: [i18n],
      stubs: { DialogPortal: { template: '<div><slot /></div>' } },
      ...options.global,
    },
    ...options,
  })
}

function getContent(wrapper: ReturnType<typeof mountDialog>) {
  const content = wrapper
    .findAllComponents(DialogContent)
    .find((component) => component.attributes('data-test-dialog-content') !== undefined)

  if (!content) throw new Error('Expected DialogContent')
  return content
}

describe('Dialog', () => {
  describe('props', () => {
    describe('portal', () => {
      it('points to the local target after the trigger in the DOM', async () => {
        const wrapper = mountDialog({ slots: { default: () => h('button', 'Open') } })
        await nextTick()

        const portal = wrapper.getComponent(DialogPortal)
        const trigger = wrapper.get('[data-test-dialog-trigger]')
        const target = wrapper.get('[data-test-dialog-portal-target]').element

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
        { input: undefined, expected: false },
      ])('passes open=$input to DialogRoot as $expected', ({ input, expected }) => {
        const wrapper = mountDialog({
          props: { open: input, label: 'Title', description: 'Description' },
        })

        expect(wrapper.getComponent(DialogRoot).props('open')).toBe(expected)
      })
    })

    describe('modal', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: true },
      ])('passes modal=$input to DialogRoot as $expected', ({ input, expected }) => {
        const wrapper = mountDialog({ props: { modal: input } })

        expect(wrapper.getComponent(DialogRoot).props('modal')).toBe(expected)
      })
    })

    describe('unmountOnHide', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: true },
      ])('passes unmountOnHide=$input to DialogRoot as $expected', ({ input, expected }) => {
        const wrapper = mountDialog({
          props: { unmountOnHide: input, label: 'Title', description: 'Description' },
        })

        expect(wrapper.getComponent(DialogRoot).props('unmountOnHide')).toBe(expected)
      })
    })

    describe('block', () => {
      it.each([
        { input: true, closeButton: false, openAfterClose: true },
        { input: false, closeButton: true, openAfterClose: false },
        { input: undefined, closeButton: true, openAfterClose: false },
      ])(
        'renders the close button and controls closing for block=$input',
        async ({ input, closeButton, openAfterClose }) => {
          let context: DialogContext | undefined
          const wrapper = mountDialog({
            props: { open: true, block: input, label: 'Title', description: 'Description' },
            slots: {
              default: (slotContext: DialogContext) => {
                context = slotContext
                return h('button', 'Trigger')
              },
            },
          })
          await nextTick()

          expect(wrapper.findComponent(DialogClose).exists()).toBe(closeButton)

          context?.close()
          await nextTick()

          expect(wrapper.getComponent(DialogRoot).props('open')).toBe(openAfterClose)
        },
      )
    })

    describe('label', () => {
      it.each([
        { input: 'Dialog title', expected: true },
        { input: '', expected: false },
        { input: undefined, expected: false },
      ])('renders label=$input as $expected', async ({ input, expected }) => {
        const wrapper = mountDialog({
          props: {
            open: expected,
            label: input,
            description: expected ? 'Description' : undefined,
          },
        })
        await nextTick()

        expect(wrapper.findComponent(DialogTitle).exists()).toBe(expected)
        if (expected) expect(wrapper.getComponent(DialogTitle).text()).toBe(input)
      })
    })

    describe('description', () => {
      it.each([
        { input: 'Dialog description', expected: true },
        { input: '', expected: false },
        { input: undefined, expected: false },
      ])('renders description=$input as $expected', async ({ input, expected }) => {
        const wrapper = mountDialog({
          props: {
            open: expected,
            label: expected ? 'Title' : undefined,
            description: input,
          },
        })
        await nextTick()

        expect(wrapper.findComponent(DialogDescription).exists()).toBe(expected)
        if (expected) expect(wrapper.getComponent(DialogDescription).text()).toBe(input)
      })
    })

    describe('icon', () => {
      testIconProps({
        text: 'passes icon props',
        id: '[data-test-dialog-icon]',
        mount: async (input) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              icon: input,
              showCloseButton: false,
            },
          })
          await nextTick()
          return wrapper
        },
      })
    })

    describe('closeIcon', () => {
      testIconProps({
        text: 'passes closeIcon props',
        id: '[data-test-dialog-close-icon]',
        default: 'x',
        mount: async (input) => {
          const wrapper = mountDialog({
            props: { open: true, label: 'Title', description: 'Description', closeIcon: input },
          })
          await nextTick()
          return wrapper
        },
      })
    })

    describe('showCloseButton', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: true },
      ])('renders showCloseButton=$input as $expected', async ({ input, expected }) => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Title', description: 'Description', showCloseButton: input },
        })
        await nextTick()

        expect(wrapper.findComponent(DialogClose).exists()).toBe(expected)
      })
    })

    describe('forceMount', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: undefined },
      ])('passes forceMount=$input to DialogContent as $expected', async ({ input, expected }) => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Title', description: 'Description', forceMount: input },
        })
        await nextTick()

        expect(getContent(wrapper).props('forceMount')).toBe(expected)
      })
    })

    describe('disableOutsidePointerEvents', () => {
      it.each([
        { input: false, expected: false },
        { input: true, expected: true },
        { input: undefined, expected: true },
      ])(
        'passes disableOutsidePointerEvents=$input to DialogContent as $expected',
        async ({ input, expected }) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              disableOutsidePointerEvents: input,
            },
          })
          await nextTick()

          expect(getContent(wrapper).props('disableOutsidePointerEvents')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      testAttrs({
        text: 'forwards attrs through ui.overlay',
        id: '[data-test-dialog-overlay]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              ui: { overlay: () => attrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'forwards attrs through ui.content',
        id: '[data-test-dialog-content]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              ui: { content: () => attrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'forwards attrs through ui.header',
        id: '[data-test-dialog-header]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              ui: { header: () => attrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'forwards attrs through ui.label',
        id: '[data-test-dialog-label]',
        assertId: false,
        mount: async (attrs) => {
          const { id: _id, ...labelAttrs } = attrs
          void _id
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              ui: { label: () => labelAttrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'forwards attrs through ui.description',
        id: '[data-test-dialog-description]',
        assertId: false,
        mount: async (attrs) => {
          const { id: _id, ...descriptionAttrs } = attrs
          void _id
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              ui: { description: () => descriptionAttrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'forwards attrs through ui.body',
        id: '[data-test-dialog-body]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              ui: { body: () => attrs },
            },
            slots: { content: () => h('span', 'Body') },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'forwards attrs through ui.footer',
        id: '[data-test-dialog-footer]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              ui: { footer: () => attrs },
            },
            slots: { footer: () => h('span', 'Footer') },
          })
          await nextTick()
          return wrapper
        },
      })

      testAttrs({
        text: 'forwards attrs through ui.close',
        id: '[data-test-dialog-close]',
        mount: async (attrs) => {
          const wrapper = mountDialog({
            props: {
              open: true,
              label: 'Title',
              description: 'Description',
              ui: { close: () => attrs },
            },
          })
          await nextTick()
          return wrapper
        },
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-dialog-root]',
      mount: (attrs) => mountDialog({ attrs }),
    })
  })

  describe('context contract', () => {
    it.each([
      { name: 'default values', input: undefined, expected: false },
      { name: 'closed', input: false, expected: false },
      { name: 'open', input: true, expected: true },
    ])('passes the contract with $name', async ({ input, expected }) => {
      let context: DialogContext | undefined

      const wrapper = mountDialog({
        props: { open: input, label: 'Title', description: 'Description' },
        slots: {
          default: (slotContext: DialogContext) => {
            context = slotContext
            return h('button', 'Trigger')
          },
        },
      })

      expect(context).toEqual({
        open: expected,
        close: expect.any(Function),
      })

      context?.close()
      await nextTick()

      expect(wrapper.getComponent(DialogRoot).props('open')).toBe(false)
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renders the default slot', async () => {
        const wrapper = mountDialog({
          slots: {
            default: () => h('span', { 'data-test-dialog-slot': 'default' }, 'Slot default'),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="default"]').text()).toBe('Slot default')
      })
    })

    describe('content', () => {
      it('renders the content slot', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Title', description: 'Description' },
          slots: {
            content: () => h('span', { 'data-test-dialog-slot': 'content' }, 'Slot content'),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="content"]').text()).toBe('Slot content')
      })
    })

    describe('header', () => {
      it('renders the header slot', async () => {
        const wrapper = mountDialog({
          props: { open: true },
          slots: {
            header: () =>
              h('div', [
                h(DialogTitle, null, { default: () => 'Header title' }),
                h(DialogDescription, null, { default: () => 'Header description' }),
                h('span', { 'data-test-dialog-slot': 'header' }, 'Slot header'),
              ]),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="header"]').text()).toBe('Slot header')
      })
    })

    describe('label', () => {
      it('renders the label slot', async () => {
        const wrapper = mountDialog({
          props: { open: true, description: 'Description' },
          slots: { label: () => h('span', { 'data-test-dialog-slot': 'label' }, 'Slot label') },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="label"]').text()).toBe('Slot label')
      })
    })

    describe('description', () => {
      it('renders the description slot', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Title' },
          slots: {
            description: () =>
              h('span', { 'data-test-dialog-slot': 'description' }, 'Slot description'),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="description"]').text()).toBe('Slot description')
      })
    })

    describe('footer', () => {
      it('renders the footer slot', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Title', description: 'Description' },
          slots: { footer: () => h('span', { 'data-test-dialog-slot': 'footer' }, 'Slot footer') },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="footer"]').text()).toBe('Slot footer')
      })
    })

    describe('close', () => {
      it('renders the close slot', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Title', description: 'Description' },
          slots: { close: () => h('span', { 'data-test-dialog-slot': 'close' }, 'Slot close') },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="close"]').text()).toBe('Slot close')
      })
    })

    describe('closeIcon', () => {
      it('renders the closeIcon slot', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Title', description: 'Description' },
          slots: {
            closeIcon: () => h('span', { 'data-test-dialog-slot': 'closeIcon' }, 'Slot closeIcon'),
          },
        })
        await nextTick()

        expect(wrapper.get('[data-test-dialog-slot="closeIcon"]').text()).toBe('Slot closeIcon')
      })
    })
  })

  describe('emits', () => {
    describe('show', () => {
      it('emits show when the dialog opens', async () => {
        const wrapper = mountDialog({
          props: { open: false, label: 'Title', description: 'Description' },
        })

        await wrapper.setProps({ open: true })

        expect(wrapper.emitted('show')).toEqual([[]])
      })
    })

    describe('close', () => {
      it('emits close when the dialog closes', async () => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Title', description: 'Description' },
        })

        await wrapper.setProps({ open: false })

        expect(wrapper.emitted('close')).toEqual([[]])
      })
    })

    describe('Reka DialogContent emits', () => {
      it.each([
        { event: 'openAutoFocus', input: new Event('focus') },
        { event: 'closeAutoFocus', input: new Event('blur') },
        { event: 'escapeKeyDown', input: new KeyboardEvent('keydown') },
        { event: 'pointerDownOutside', input: new Event('pointerdown') },
        { event: 'focusOutside', input: new Event('focusout') },
        { event: 'interactOutside', input: new Event('click') },
      ])('emits $event from Reka DialogContent', async ({ event, input }) => {
        const wrapper = mountDialog({
          props: { open: true, label: 'Title', description: 'Description' },
        })
        await nextTick()

        getContent(wrapper).vm.$emit(event, input)

        expect(wrapper.emitted(event)).toEqual([[input]])
      })
    })
  })
})
