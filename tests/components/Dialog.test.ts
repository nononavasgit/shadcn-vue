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
        const wrapper = mountDialog({ props: { open: input } })

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
        const wrapper = mountDialog({ props: { unmountOnHide: input } })

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
            props: { open: true, block: input },
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
        const wrapper = mountDialog({ props: { open: true, label: input } })
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
        const wrapper = mountDialog({ props: { open: true, description: input } })
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
            props: { open: true, label: 'Title', icon: input, showCloseButton: false },
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
          const wrapper = mountDialog({ props: { open: true, closeIcon: input } })
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
        const wrapper = mountDialog({ props: { open: true, showCloseButton: input } })
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
        const wrapper = mountDialog({ props: { open: true, forceMount: input } })
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
            props: { open: true, disableOutsidePointerEvents: input },
          })
          await nextTick()

          expect(getContent(wrapper).props('disableOutsidePointerEvents')).toBe(expected)
        },
      )
    })

    describe('ui', () => {
      it('applies resolvers to every internal part', async () => {
        const wrapper = mountDialog({
          props: {
            open: true,
            label: 'Title',
            description: 'Description',
            ui: {
              overlay: () => ({
                id: 'dialog-overlay',
                class: 'custom-dialog-overlay',
                'data-test-ui': 'overlay',
              }),
              content: () => ({
                id: 'dialog-content',
                class: 'custom-dialog-content',
                'data-test-ui': 'content',
              }),
              header: () => ({
                id: 'dialog-header',
                class: 'custom-dialog-header',
                'data-test-ui': 'header',
              }),
              label: () => ({
                id: 'dialog-label',
                class: 'custom-dialog-label',
                'data-test-ui': 'label',
              }),
              description: () => ({
                id: 'dialog-description',
                class: 'custom-dialog-description',
                'data-test-ui': 'description',
              }),
              body: () => ({
                id: 'dialog-body',
                class: 'custom-dialog-body',
                'data-test-ui': 'body',
              }),
              footer: () => ({
                id: 'dialog-footer',
                class: 'custom-dialog-footer',
                'data-test-ui': 'footer',
              }),
              close: () => ({
                id: 'dialog-close',
                class: 'custom-dialog-close',
                'aria-label': 'Close dialog',
                'data-test-ui': 'close',
              }),
            },
          },
          slots: {
            default: () => h('button', 'Open'),
            content: () => h('span', 'Body'),
            footer: () => h('span', 'Footer'),
          },
        })
        await nextTick()

        expect(wrapper.get('#dialog-overlay')).toBeTruthy()
        expect(wrapper.get('#dialog-overlay').classes()).toContain('custom-dialog-overlay')
        expect(wrapper.get('#dialog-overlay').attributes('data-test-ui')).toBe('overlay')
        expect(wrapper.get('#dialog-content')).toBeTruthy()
        expect(wrapper.get('#dialog-content').classes()).toContain('custom-dialog-content')
        expect(wrapper.get('#dialog-content').attributes('data-test-ui')).toBe('content')
        expect(wrapper.get('#dialog-header')).toBeTruthy()
        expect(wrapper.get('#dialog-header').classes()).toContain('custom-dialog-header')
        expect(wrapper.get('#dialog-header').attributes('data-test-ui')).toBe('header')
        expect(wrapper.get('#dialog-label')).toBeTruthy()
        expect(wrapper.get('#dialog-label').classes()).toContain('custom-dialog-label')
        expect(wrapper.get('#dialog-label').attributes('data-test-ui')).toBe('label')
        expect(wrapper.get('#dialog-description')).toBeTruthy()
        expect(wrapper.get('#dialog-description').classes()).toContain('custom-dialog-description')
        expect(wrapper.get('#dialog-description').attributes('data-test-ui')).toBe('description')
        expect(wrapper.get('#dialog-body')).toBeTruthy()
        expect(wrapper.get('#dialog-body').classes()).toContain('custom-dialog-body')
        expect(wrapper.get('#dialog-body').attributes('data-test-ui')).toBe('body')
        expect(wrapper.get('#dialog-footer')).toBeTruthy()
        expect(wrapper.get('#dialog-footer').classes()).toContain('custom-dialog-footer')
        expect(wrapper.get('#dialog-footer').attributes('data-test-ui')).toBe('footer')
        expect(wrapper.get('#dialog-close')).toBeTruthy()
        expect(wrapper.get('#dialog-close').classes()).toContain('custom-dialog-close')
        expect(wrapper.get('#dialog-close').attributes('aria-label')).toBe('Close dialog')
        expect(wrapper.get('#dialog-close').attributes('data-test-ui')).toBe('close')
      })
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
        props: { open: input },
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
    const slotCases = [
      { input: 'default', expected: 'default' },
      { input: 'content', expected: 'content' },
      { input: 'header', expected: 'header' },
      { input: 'label', expected: 'label' },
      { input: 'description', expected: 'description' },
      { input: 'footer', expected: 'footer' },
      { input: 'close', expected: 'close' },
      { input: 'closeIcon', expected: 'closeIcon' },
    ] as const

    it.each(slotCases)('renders the $input slot', async ({ input, expected }) => {
      const wrapper = mountDialog({
        props: { open: true, label: 'Title', description: 'Description' },
        slots: {
          [input]: () => h('span', { 'data-test-dialog-slot': expected }, `Slot ${expected}`),
        },
      })
      await nextTick()

      expect(wrapper.get(`[data-test-dialog-slot="${expected}"]`).text()).toBe(`Slot ${expected}`)
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
