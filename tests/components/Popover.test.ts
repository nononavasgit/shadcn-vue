import { h, nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, type MountingOptions } from '@vue/test-utils'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot } from 'reka-ui'

import { Popover, type PopoverContext, type PopoverProps } from '@/components/ui/Popover'
import { testAttrs } from '../utils/testAttrs'

vi.stubGlobal(
  'ResizeObserver',
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)

afterEach(() => {
  document.body.innerHTML = ''
})

function mountPopover(options: MountingOptions<PopoverProps> = {}) {
  return mount(Popover, {
    attachTo: document.body,
    global: {
      stubs: {
        PopoverPortal: { template: '<div><slot /></div>' },
        ...options.global?.stubs,
      },
      ...options.global,
    },
    ...options,
  })
}

function getContent(wrapper: ReturnType<typeof mountPopover>) {
  const content = wrapper.findComponent(PopoverContent)

  if (!content.exists()) throw new Error('Expected PopoverContent')
  return content
}

describe('Popover', () => {
  describe('props', () => {
    describe('open', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('pasa open=$input a PopoverRoot como $expected', ({ input, expected }) => {
        const wrapper = mountPopover({ props: { open: input } })

        expect(wrapper.getComponent(PopoverRoot).props('open')).toBe(expected)
      })
    })

    describe('modal', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('pasa modal=$input a PopoverRoot como $expected', ({ input, expected }) => {
        const wrapper = mountPopover({ props: { modal: input } })

        expect(wrapper.getComponent(PopoverRoot).props('modal')).toBe(expected)
      })
    })

    describe('showArrow', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('renderiza showArrow=$input como $expected', async ({ input, expected }) => {
        const wrapper = mountPopover({
          props: { open: true, showArrow: input },
          slots: { content: () => h('span', 'Contenido') },
        })
        await nextTick()

        expect(wrapper.findComponent(PopoverArrow).exists()).toBe(expected)
      })

      it('renderiza la flecha cuando showArrow cambia a true', async () => {
        const wrapper = mountPopover({
          props: { open: true, showArrow: false },
          slots: { content: () => h('span', 'Contenido') },
        })
        await nextTick()

        expect(wrapper.findComponent(PopoverArrow).exists()).toBe(false)

        await wrapper.setProps({ showArrow: true })

        expect(wrapper.findComponent(PopoverArrow).exists()).toBe(true)
      })
    })

    function testContentProp(
      prop: keyof PopoverProps,
      cases: ReadonlyArray<{ input: unknown; expected: unknown }>,
    ) {
      describe(prop, () => {
        it.each(cases)(
          'pasa $input a PopoverContent como $expected',
          async ({ input, expected }) => {
            const wrapper = mountPopover({
              props: { open: true, [prop]: input } as PopoverProps,
              slots: { content: () => h('span', 'Contenido') },
            })
            await nextTick()

            expect(getContent(wrapper).props(prop)).toEqual(expected)
          },
        )
      })
    }

    testContentProp('align', [
      { input: 'start', expected: 'start' },
      { input: 'center', expected: 'center' },
      { input: 'end', expected: 'end' },
      { input: undefined, expected: 'center' },
    ])
    testContentProp('alignFlip', [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: true },
    ])
    testContentProp('alignOffset', [
      { input: -8, expected: -8 },
      { input: 0, expected: 0 },
      { input: 8, expected: 8 },
      { input: undefined, expected: 0 },
    ])
    testContentProp('arrowPadding', [
      { input: 0, expected: 0 },
      { input: 4, expected: 4 },
      { input: undefined, expected: 0 },
    ])
    testContentProp('avoidCollisions', [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: true },
    ])
    testContentProp('collisionPadding', [
      { input: 0, expected: 0 },
      { input: 12, expected: 12 },
      {
        input: { top: 4, right: 8, bottom: 12, left: 16 },
        expected: { top: 4, right: 8, bottom: 12, left: 16 },
      },
      { input: undefined, expected: 8 },
    ])
    testContentProp('disableOutsidePointerEvents', [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: undefined },
    ])
    testContentProp('disableUpdateOnLayoutShift', [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: false },
    ])
    testContentProp('forceMount', [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: undefined },
    ])
    testContentProp('hideShiftedArrow', [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: true },
    ])
    testContentProp('hideWhenDetached', [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: false },
    ])
    testContentProp('positionStrategy', [
      { input: 'absolute', expected: 'absolute' },
      { input: 'fixed', expected: 'fixed' },
      { input: undefined, expected: 'fixed' },
    ])
    testContentProp('prioritizePosition', [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: false },
    ])
    testContentProp('side', [
      { input: 'top', expected: 'top' },
      { input: 'right', expected: 'right' },
      { input: 'bottom', expected: 'bottom' },
      { input: 'left', expected: 'left' },
      { input: undefined, expected: 'bottom' },
    ])
    testContentProp('sideFlip', [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: true },
    ])
    testContentProp('sideOffset', [
      { input: -4, expected: -4 },
      { input: 0, expected: 0 },
      { input: 12, expected: 12 },
      { input: undefined, expected: 4 },
    ])
    testContentProp('sticky', [
      { input: 'partial', expected: 'partial' },
      { input: 'always', expected: 'always' },
      { input: undefined, expected: 'partial' },
    ])
    testContentProp('updatePositionStrategy', [
      { input: 'optimized', expected: 'optimized' },
      { input: 'always', expected: 'always' },
      { input: undefined, expected: 'optimized' },
    ])

    function testArrowProp(
      prop: keyof PopoverProps,
      rekaProp: string,
      cases: ReadonlyArray<{ input: unknown; expected: unknown }>,
    ) {
      describe(prop, () => {
        it.each(cases)('pasa $input a PopoverArrow como $expected', async ({ input, expected }) => {
          const wrapper = mountPopover({
            props: { open: true, showArrow: true, [prop]: input } as PopoverProps,
            slots: { content: () => h('span', 'Contenido') },
          })
          await nextTick()

          expect(wrapper.getComponent(PopoverArrow).props(rekaProp)).toEqual(expected)
        })
      })
    }

    testArrowProp('arrowWidth', 'width', [
      { input: 0, expected: 0 },
      { input: 5, expected: 5 },
      { input: 10, expected: 10 },
      { input: 12, expected: 12 },
      { input: undefined, expected: 10 },
    ])
    testArrowProp('arrowHeight', 'height', [
      { input: 0, expected: 0 },
      { input: 5, expected: 5 },
      { input: 6, expected: 6 },
      { input: undefined, expected: 5 },
    ])
    testArrowProp('arrowRounded', 'rounded', [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: false },
    ])

    describe('ui', () => {
      describe('content', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.content',
          id: '[data-test-popover-content]',
          assertId: false,
          mount: (attrs) =>
            mountPopover({
              props: { open: true, ui: { content: () => attrs } },
              slots: { content: () => h('span', 'Contenido') },
            }),
        })
      })

      describe('arrow', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.arrow',
          id: '[data-test-popover-arrow]',
          mount: (attrs) =>
            mountPopover({
              props: { open: true, showArrow: true, ui: { arrow: () => attrs } },
              slots: { content: () => h('span', 'Contenido') },
            }),
        })
      })
    })
  })

  describe('portal', () => {
    it('points to the local target after the trigger in the DOM', async () => {
      const wrapper = mountPopover({ slots: { default: () => h('button', 'Abrir') } })
      await nextTick()

      const portal = wrapper.getComponent(PopoverPortal)
      const trigger = wrapper.get('[data-test-popover-trigger]')
      const target = wrapper.get('[data-test-popover-portal-target]').element

      expect(portal.vm.$.vnode.props?.to).toBe(target)
      expect(
        trigger.element.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy()
    })
  })

  describe('context contract', () => {
    it.each([
      { input: undefined, expected: false },
      { input: false, expected: false },
      { input: true, expected: true },
    ])('pasa open=$input y close en el contexto', ({ input, expected }) => {
      let context: PopoverContext | undefined

      mountPopover({
        props: { open: input },
        slots: {
          default: (slotContext: PopoverContext) => {
            context = slotContext
            return h('button', 'Disparador')
          },
        },
      })

      expect(context).toEqual({ open: expected, close: expect.any(Function) })
    })
  })

  describe('slots', () => {
    it.each([
      {
        name: 'default',
        selector: '[data-test-popover-slot="default"]',
        text: 'Disparador',
        options: () => ({
          slots: {
            default: () => h('span', { 'data-test-popover-slot': 'default' }, 'Disparador'),
          },
        }),
      },
      {
        name: 'content',
        selector: '[data-test-popover-slot="content"]',
        text: 'Contenido',
        options: () => ({
          props: { open: true },
          slots: {
            content: () => h('span', { 'data-test-popover-slot': 'content' }, 'Contenido'),
          },
        }),
      },
    ])('renderiza el slot $name', async ({ selector, text, options }) => {
      const wrapper = mountPopover(options())
      await nextTick()

      expect(wrapper.get(selector).text()).toBe(text)
    })
  })

  describe('emits', () => {
    describe('show', () => {
      it('emite cuando se abre el popover', async () => {
        const wrapper = mountPopover({ props: { open: false } })

        await wrapper.setProps({ open: true })

        expect(wrapper.emitted('show')).toEqual([[]])
      })
    })

    describe('close', () => {
      it('emite cuando se cierra el popover', async () => {
        const wrapper = mountPopover({ props: { open: true } })

        await wrapper.setProps({ open: false })

        expect(wrapper.emitted('close')).toEqual([[]])
      })
    })

    describe('update:open', () => {
      it.each([
        { initial: false, value: true },
        { initial: true, value: false },
      ])('reenvia value=$value desde PopoverRoot', async ({ initial, value }) => {
        const wrapper = mountPopover({ props: { open: initial } })

        await wrapper.getComponent(PopoverRoot).vm.$emit('update:open', value)

        expect(wrapper.emitted('update:open')).toEqual([[value]])
      })
    })

    function testContentEmit(event: string, input: Event) {
      describe(event, () => {
        it('reenvia el evento desde PopoverContent', async () => {
          const wrapper = mountPopover({
            props: { open: true },
            slots: { content: () => h('span', 'Contenido') },
          })
          await nextTick()

          getContent(wrapper).vm.$emit(event, input)

          expect(wrapper.emitted(event)).toEqual([[input]])
        })
      })
    }

    testContentEmit('openAutoFocus', new Event('focus'))
    testContentEmit('closeAutoFocus', new Event('blur'))
    testContentEmit('escapeKeyDown', new KeyboardEvent('keydown'))
    testContentEmit('pointerDownOutside', new Event('pointerdown'))
    testContentEmit('focusOutside', new Event('focusout'))
    testContentEmit('interactOutside', new Event('click'))
  })
})
