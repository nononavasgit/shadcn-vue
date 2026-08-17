import { h, nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { Tooltip, type TooltipContext, type TooltipProps } from '@/components/ui/Tooltip'
import { TooltipArrow, TooltipContent, TooltipRoot, TooltipTrigger } from 'reka-ui'

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

function mountTooltip(options: ComponentMountingOptions<typeof Tooltip> = {}) {
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
    describe('open', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('passes open=$input to TooltipRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('open', input)

        expect(wrapper.getComponent(TooltipRoot).props('open')).toBe(expected)
      })
    })

    describe('delayDuration', () => {
      it.each([
        { input: 0, expected: 0 },
        { input: 150, expected: 150 },
        { input: undefined, expected: 0 },
      ])('passes delayDuration=$input to TooltipRoot as $expected', ({ input, expected }) => {
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
        'passes disableHoverableContent=$input to TooltipRoot as $expected',
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
        'passes disableClosingTrigger=$input to TooltipRoot as $expected',
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
      ])('passes disabled=$input to TooltipRoot as $expected', ({ input, expected }) => {
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
        'passes ignoreNonKeyboardFocus=$input to TooltipRoot as $expected',
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
      ])('renders label=$input as "$expected"', ({ input, expected }) => {
        const wrapper = mountTooltip({
          props: { open: true, forceMount: true, label: input },
          slots: { default: () => h('button', 'Trigger') },
        })

        expect(wrapper.get('[data-test-tooltip-content]').text()).toContain(expected)
      })
    })

    describe('trigger props', () => {
      describe('triggerReference', () => {
        const reference = document.createElement('div')

        it.each([
          { input: undefined, expected: undefined },
          { input: reference, expected: reference },
        ])('passes triggerReference=$input to TooltipTrigger', ({ input, expected }) => {
          const wrapper = mountWithProp('triggerReference', input)

          expect(wrapper.getComponent(TooltipTrigger).props('reference')).toBe(expected)
        })
      })
    })

    describe('ui', () => {
      it('applies ui resolvers to trigger, content and arrow', () => {
        const wrapper = mountTooltip({
          props: {
            open: true,
            forceMount: true,
            withArrow: true,
            ui: {
              trigger: () => ({ id: 'tooltip-trigger' }),
              content: () => ({ id: 'tooltip-content' }),
              arrow: () => ({ id: 'tooltip-arrow' }),
            },
          },
          slots: { default: () => h('button', 'Trigger') },
        })

        expect(wrapper.get('[data-test-tooltip-trigger]').attributes('id')).toBe('tooltip-trigger')
        expect(wrapper.get('[data-test-tooltip-content]').attributes('id')).toBe('tooltip-content')
        expect(wrapper.get('[data-test-tooltip-arrow]').attributes('id')).toBe('tooltip-arrow')
      })
    })

    describe('content props', () => {
      describe('align', () => {
        it.each([
          { input: 'start', expected: 'start' },
          { input: 'center', expected: 'center' },
          { input: 'end', expected: 'end' },
          { input: undefined, expected: 'center' },
        ])('passes align=$input to TooltipContent as $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('align', input)

          expect(wrapper.getComponent(TooltipContent).props('align')).toBe(expected)
        })
      })

      describe('alignOffset', () => {
        it.each([
          { input: 0, expected: 0 },
          { input: 8, expected: 8 },
          { input: undefined, expected: 0 },
        ])('passes alignOffset=$input to TooltipContent as $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('alignOffset', input)

          expect(wrapper.getComponent(TooltipContent).props('alignOffset')).toBe(expected)
        })
      })

      describe('ariaLabel', () => {
        it.each(['Tooltip content', '', undefined])(
          'passes ariaLabel=$input to TooltipContent',
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
        ])('passes arrowPadding=$input to TooltipContent as $expected', ({ input, expected }) => {
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
          'passes avoidCollisions=$input to TooltipContent as $expected',
          ({ input, expected }) => {
            const wrapper = mountWithContentProp('avoidCollisions', input)

            expect(wrapper.getComponent(TooltipContent).props('avoidCollisions')).toBe(expected)
          },
        )
      })

      describe('collisionBoundary', () => {
        const boundary = document.createElement('div')

        it.each([undefined, null, boundary, [boundary]])(
          'passes collisionBoundary=$input to TooltipContent',
          (input) => {
            const wrapper = mountWithContentProp('collisionBoundary', input)

            expect(wrapper.getComponent(TooltipContent).props('collisionBoundary')).toEqual(input)
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
          'passes collisionPadding=$input to TooltipContent as $expected',
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
        ])('passes forceMount=$input to TooltipContent as $expected', ({ input, expected }) => {
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
          'passes hideWhenDetached=$input to TooltipContent as $expected',
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
          'passes positionStrategy=$input to TooltipContent as $expected',
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
        ])('passes side=$input to TooltipContent as $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('side', input)

          expect(wrapper.getComponent(TooltipContent).props('side')).toBe(expected)
        })
      })

      describe('sideOffset', () => {
        it.each([
          { input: 0, expected: 0 },
          { input: 10, expected: 10 },
          { input: undefined, expected: 2 },
        ])('passes sideOffset=$input to TooltipContent as $expected', ({ input, expected }) => {
          const wrapper = mountWithContentProp('sideOffset', input)

          expect(wrapper.getComponent(TooltipContent).props('sideOffset')).toBe(expected)
        })
      })

      describe('sticky', () => {
        it.each([
          { input: 'partial', expected: 'partial' },
          { input: 'always', expected: 'always' },
          { input: undefined, expected: 'partial' },
        ])('passes sticky=$input to TooltipContent as $expected', ({ input, expected }) => {
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
          'passes updatePositionStrategy=$input to TooltipContent as $expected',
          ({ input, expected }) => {
            const wrapper = mountWithContentProp('updatePositionStrategy', input)

            expect(wrapper.getComponent(TooltipContent).props('updatePositionStrategy')).toBe(
              expected,
            )
          },
        )
      })

      it('passes onEscapeKeyDown to TooltipContent', () => {
        const onEscapeKeyDown = vi.fn()
        const wrapper = mountTooltip({ props: { onEscapeKeyDown } })
        const event = new KeyboardEvent('keydown')

        wrapper.getComponent(TooltipContent).vm.$emit('escapeKeyDown', event)

        expect(onEscapeKeyDown).toHaveBeenCalledWith(event)
      })

      it('passes onPointerDownOutside to TooltipContent', () => {
        const onPointerDownOutside = vi.fn()
        const wrapper = mountTooltip({ props: { onPointerDownOutside } })
        const event = new Event('pointerdown')

        wrapper.getComponent(TooltipContent).vm.$emit('pointerDownOutside', event)

        expect(onPointerDownOutside).toHaveBeenCalledWith(event)
      })
    })

    describe('withArrow', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: true },
      ])('renders withArrow=$input as $expected', ({ input, expected }) => {
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
        ])('passes arrowWidth=$input to TooltipArrow as $expected', ({ input, expected }) => {
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
        ])('passes arrowHeight=$input to TooltipArrow as $expected', ({ input, expected }) => {
          const wrapper = mountTooltip({
            props: { open: true, forceMount: true, withArrow: true, arrowHeight: input },
          })

          expect(wrapper.getComponent(TooltipArrow).props('height')).toBe(expected)
        })
      })
    })
  })

  describe('context contract', () => {
    it.each([
      { name: 'default values', input: undefined, expected: false },
      { name: 'closed', input: false, expected: false },
      { name: 'open', input: true, expected: true },
    ])('passes the contract with $name', async ({ input, expected }) => {
      let context: TooltipContext | undefined

      const wrapper = mountTooltip({
        props: { open: input, forceMount: true },
        slots: {
          default: (slotContext: TooltipContext) => {
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

      expect(wrapper.getComponent(TooltipRoot).props('open')).toBe(false)
    })
  })

  describe('slots', () => {
    it('render default slot', () => {
      const wrapper = mountTooltip({
        props: { open: true, forceMount: true },
        slots: {
          default: (context: TooltipContext) =>
            h('button', { 'data-test-context-trigger': '' }, `open:${context.open}`),
        },
      })

      expect(wrapper.get('[data-test-context-trigger]').text()).toBe('open:true')
    })

    it('render content slot', () => {
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
