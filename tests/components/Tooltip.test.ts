import { h, nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, type MountingOptions } from '@vue/test-utils'
import { Tooltip, type TooltipContext, type TooltipProps } from '@/components/ui/Tooltip'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot } from 'reka-ui'
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

function mountTooltip(options: MountingOptions<TooltipProps> = {}) {
  const global = options.global ?? {}

  return mount(Tooltip, {
    ...options,
    attachTo: document.body,
    global: {
      ...global,
      stubs: {
        TooltipPortal: { template: '<div><slot /></div>' },
        ...global.stubs,
      },
    },
  })
}

function mountWithProp(prop: string, value: unknown) {
  return mountTooltip({
    props: { [prop]: value } as TooltipProps,
  })
}

function mountWithContentProp(prop: string, value: unknown) {
  return mountTooltip({
    props: { open: true, forceMount: true, [prop]: value } as TooltipProps,
  })
}

describe('Tooltip', () => {
  describe('props', () => {
    // Reka
    describe('portal', () => {
      it('points to the local target after the trigger', async () => {
        const wrapper = mountTooltip({
          global: { stubs: { TooltipPortal: false } },
          slots: { default: () => h('button', 'Disparador') },
        })
        await nextTick()

        const portal = wrapper.getComponent(TooltipPortal)
        const trigger = wrapper.get('[data-test-tooltip-trigger]')
        const target = wrapper.get('[data-test-tooltip-portal-target]').element

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
      ])('pasa open=$input a TooltipRoot como $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('open', input)

        expect(wrapper.getComponent(TooltipRoot).props('open')).toBe(expected)
      })
    })

    describe('delayDuration', () => {
      it.each([
        { input: 0, expected: 0 },
        { input: 150, expected: 150 },
        { input: undefined, expected: 0 },
      ])('pasa delayDuration=$input a TooltipRoot como $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('delayDuration', input)

        expect(wrapper.getComponent(TooltipRoot).props('delayDuration')).toBe(expected)
      })
    })

    describe('disableHoverableContent', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: undefined },
      ])(
        'pasa disableHoverableContent=$input a TooltipRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('disableHoverableContent', input)

          expect(wrapper.getComponent(TooltipRoot).props('disableHoverableContent')).toBe(expected)
        },
      )
    })

    describe('disableClosingTrigger', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])(
        'pasa disableClosingTrigger=$input a TooltipRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('disableClosingTrigger', input)

          expect(wrapper.getComponent(TooltipRoot).props('disableClosingTrigger')).toBe(expected)
        },
      )
    })

    describe('disabled', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('pasa disabled=$input a TooltipRoot como $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('disabled', input)

        expect(wrapper.getComponent(TooltipRoot).props('disabled')).toBe(expected)
      })
    })

    describe('ignoreNonKeyboardFocus', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])(
        'pasa ignoreNonKeyboardFocus=$input a TooltipRoot como $expected',
        ({ input, expected }) => {
          const wrapper = mountWithProp('ignoreNonKeyboardFocus', input)

          expect(wrapper.getComponent(TooltipRoot).props('ignoreNonKeyboardFocus')).toBe(expected)
        },
      )
    })

    describe('label', () => {
      it.each([
        { input: 'Tooltip label', expected: 'Tooltip label' },
        { input: '', expected: '' },
        { input: undefined, expected: '' },
      ])('renderiza label=$input como "$expected"', ({ input, expected }) => {
        const wrapper = mountTooltip({
          props: { open: true, forceMount: true, label: input },
          slots: { default: () => h('button', 'Disparador') },
        })

        expect(wrapper.get('[data-test-tooltip-content]').text()).toContain(expected)
      })
    })

    describe('ui', () => {
      describe('content', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.content',
          id: '[data-test-tooltip-content]',
          mount: (attrs) =>
            mountTooltip({
              props: {
                open: true,
                forceMount: true,
                withArrow: false,
                ui: { content: () => attrs },
              },
              global: {
                stubs: {
                  TooltipContent: { template: '<div><slot /></div>' },
                },
              },
              slots: { default: () => h('button', 'Disparador') },
            }),
        })
      })

      describe('arrow', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.arrow',
          id: '[data-test-tooltip-arrow]',
          mount: (attrs) =>
            mountTooltip({
              props: { open: true, forceMount: true, withArrow: true, ui: { arrow: () => attrs } },
              slots: { default: () => h('button', 'Disparador') },
            }),
        })
      })
    })

    describe('content props', () => {
      describe('align', () => {
        it.each([
          { input: 'start', expected: 'start' },
          { input: 'center', expected: 'center' },
          { input: 'end', expected: 'end' },
          { input: undefined, expected: 'center' },
        ])('pasa align=$input a TooltipContent como $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('align', input)

          expect(wrapper.getComponent(TooltipContent).props('align')).toBe(expected)
        })
      })

      describe('alignOffset', () => {
        it.each([
          { input: 0, expected: 0 },
          { input: 8, expected: 8 },
          { input: undefined, expected: 0 },
        ])('pasa alignOffset=$input a TooltipContent como $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('alignOffset', input)

          expect(wrapper.getComponent(TooltipContent).props('alignOffset')).toBe(expected)
        })
      })

      describe('ariaLabel', () => {
        it.each(['Tooltip content', '', undefined])(
          'pasa ariaLabel=$input a TooltipContent',
          (input) => {
            const wrapper = mountWithContentProp('ariaLabel', input)

            expect(wrapper.getComponent(TooltipContent).props('ariaLabel')).toBe(input)
          },
        )
      })

      describe('arrowPadding', () => {
        it.each([
          { input: 0, expected: 0 },
          { input: 4, expected: 4 },
          { input: undefined, expected: 0 },
        ])('pasa arrowPadding=$input a TooltipContent como $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('arrowPadding', input)

          expect(wrapper.getComponent(TooltipContent).props('arrowPadding')).toBe(expected)
        })
      })

      describe('avoidCollisions', () => {
        it.each([
          { input: true, expected: true },
          { input: false, expected: false },
          { input: undefined, expected: true },
        ])(
          'pasa avoidCollisions=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountWithContentProp('avoidCollisions', input)

            expect(wrapper.getComponent(TooltipContent).props('avoidCollisions')).toBe(expected)
          },
        )
      })

      describe('collisionPadding', () => {
        const padding = { top: 2, left: 4 }

        it.each([
          { input: 0, expected: 0 },
          { input: 6, expected: 6 },
          { input: padding, expected: padding },
          { input: undefined, expected: 0 },
        ])(
          'pasa collisionPadding=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountWithContentProp('collisionPadding', input)

            expect(wrapper.getComponent(TooltipContent).props('collisionPadding')).toEqual(expected)
          },
        )
      })

      describe('forceMount', () => {
        it.each([
          { input: true, expected: true },
          { input: false, expected: false },
          { input: undefined, expected: false },
        ])('pasa forceMount=$input a TooltipContent como $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('forceMount', input)

          expect(wrapper.getComponent(TooltipContent).props('forceMount')).toBe(expected)
        })
      })

      describe('hideWhenDetached', () => {
        it.each([
          { input: true, expected: true },
          { input: false, expected: false },
          { input: undefined, expected: false },
        ])(
          'pasa hideWhenDetached=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountWithContentProp('hideWhenDetached', input)

            expect(wrapper.getComponent(TooltipContent).props('hideWhenDetached')).toBe(expected)
          },
        )
      })

      describe('positionStrategy', () => {
        it.each([
          { input: 'absolute', expected: 'absolute' },
          { input: 'fixed', expected: 'fixed' },
          { input: undefined, expected: 'fixed' },
        ])(
          'pasa positionStrategy=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountWithContentProp('positionStrategy', input)

            expect(wrapper.getComponent(TooltipContent).props('positionStrategy')).toBe(expected)
          },
        )
      })

      describe('side', () => {
        it.each([
          { input: 'top', expected: 'top' },
          { input: 'right', expected: 'right' },
          { input: 'bottom', expected: 'bottom' },
          { input: 'left', expected: 'left' },
          { input: undefined, expected: 'top' },
        ])('pasa side=$input a TooltipContent como $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('side', input)

          expect(wrapper.getComponent(TooltipContent).props('side')).toBe(expected)
        })
      })

      describe('sideOffset', () => {
        it.each([
          { input: 0, expected: 0 },
          { input: 10, expected: 10 },
          { input: undefined, expected: 2 },
        ])('pasa sideOffset=$input a TooltipContent como $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('sideOffset', input)

          expect(wrapper.getComponent(TooltipContent).props('sideOffset')).toBe(expected)
        })
      })

      describe('sticky', () => {
        it.each([
          { input: 'partial', expected: 'partial' },
          { input: 'always', expected: 'always' },
          { input: undefined, expected: 'partial' },
        ])('pasa sticky=$input a TooltipContent como $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('sticky', input)

          expect(wrapper.getComponent(TooltipContent).props('sticky')).toBe(expected)
        })
      })

      describe('updatePositionStrategy', () => {
        it.each([
          { input: 'optimized', expected: 'optimized' },
          { input: 'always', expected: 'always' },
          { input: undefined, expected: 'optimized' },
        ])(
          'pasa updatePositionStrategy=$input a TooltipContent como $expected',
          ({ input, expected }) => {
            const wrapper = mountWithContentProp('updatePositionStrategy', input)

            expect(wrapper.getComponent(TooltipContent).props('updatePositionStrategy')).toBe(
              expected,
            )
          },
        )
      })
    })

    describe('withArrow', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: true },
      ])('renderiza withArrow=$input como $expected', ({ input, expected }) => {
        const wrapper = mountTooltip({
          props: { open: true, forceMount: true, withArrow: input },
        })

        expect(wrapper.findComponent(TooltipArrow).exists()).toBe(expected)
      })
    })

    describe('arrow props', () => {
      describe('arrowWidth', () => {
        it.each([
          { input: 0, expected: 0 },
          { input: 12, expected: 12 },
          { input: undefined, expected: 10 },
        ])('pasa arrowWidth=$input a TooltipArrow como $expected', ({ input, expected }) => {
          const wrapper = mountTooltip({
            props: { open: true, forceMount: true, withArrow: true, arrowWidth: input },
          })
          expect(wrapper.getComponent(TooltipArrow).props('width')).toBe(expected)
        })
      })

      describe('arrowHeight', () => {
        it.each([
          { input: 0, expected: 0 },
          { input: 6, expected: 6 },
          { input: undefined, expected: 5 },
        ])('pasa arrowHeight=$input a TooltipArrow como $expected', ({ input, expected }) => {
          const wrapper = mountTooltip({
            props: { open: true, forceMount: true, withArrow: true, arrowHeight: input },
          })

          expect(wrapper.getComponent(TooltipArrow).props('height')).toBe(expected)
        })
      })
    })
  })

  describe('emits', () => {
    describe('TooltipContent events', () => {
      it.each([
        { event: 'escapeKeyDown', input: new KeyboardEvent('keydown') },
        { event: 'pointerDownOutside', input: new Event('pointerdown') },
      ])('emite $event desde TooltipContent', async ({ event, input }) => {
        const wrapper = mountWithContentProp('forceMount', true)

        wrapper.getComponent(TooltipContent).vm.$emit(event, input)

        expect(wrapper.emitted(event)).toEqual([[input]])
      })
    })

    describe('update:open', () => {
      it('reenvia actualizaciones desde TooltipRoot', async () => {
        const wrapper = mountTooltip()

        await wrapper.getComponent(TooltipRoot).vm.$emit('update:open', true)

        expect(wrapper.emitted('update:open')).toEqual([[true]])
      })
    })
  })

  describe('context contract', () => {
    it.each([
      { name: 'default values', input: undefined, expected: false },
      { name: 'closed', input: false, expected: false },
      { name: 'open', input: true, expected: true },
    ])('pasa el contrato con $name', async ({ input, expected }) => {
      let context: TooltipContext | undefined

      const wrapper = mountTooltip({
        props: { open: input, forceMount: true },
        slots: {
          default: (slotContext: TooltipContext) => {
            context = slotContext
            return h('button', 'Disparador')
          },
        },
      })

      expect(context).toEqual({
        open: expected,
        close: expect.any(Function),
      })

      context?.close()
      await nextTick()

      expect(wrapper.getComponent(TooltipRoot).props('open')).toBe(false)
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot por defecto', () => {
        const wrapper = mountTooltip({
          props: { open: true, forceMount: true },
          slots: {
            default: (context: TooltipContext) =>
              h('button', { 'data-test-context-trigger': '' }, `open:${context.open}`),
          },
        })

        expect(wrapper.get('[data-test-context-trigger]').text()).toBe('open:true')
      })
    })

    describe('content', () => {
      it('renderiza el slot content', () => {
        const wrapper = mountTooltip({
          props: { open: true, forceMount: true },
          slots: {
            content: (context: TooltipContext) =>
              h('span', { 'data-test-context-content': '' }, `open:${context.open}`),
          },
        })

        expect(wrapper.get('[data-test-context-content]').text()).toBe('open:true')
      })
    })
  })
})
