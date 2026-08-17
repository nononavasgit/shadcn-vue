import { h } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import {
  createTooltipContext,
  Tooltip,
  type TooltipContext,
  type TooltipProps,
} from '@/components/ui/Tooltip'
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
        { input: undefined, expected: undefined },
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
        { input: undefined, expected: undefined },
      ])('passes disabled=$input to TooltipRoot as $expected', ({ input, expected }) => {
        const wrapper = mountWithProp('disabled', input)

        expect(wrapper.getComponent(TooltipRoot).props('disabled')).toBe(expected)
      })
    })

    describe('ignoreNonKeyboardFocus', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: undefined },
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
        it.each(['start', 'center', 'end', undefined])(
          'passes align=$input to TooltipContent',
          (input) => {
            const wrapper = mountWithContentProp('align', input)

            expect(wrapper.getComponent(TooltipContent).props('align')).toBe(input)
          },
        )
      })

      describe('alignOffset', () => {
        it.each([0, 8, undefined])('passes alignOffset=$input to TooltipContent', (input) => {
          const wrapper = mountWithContentProp('alignOffset', input)

          expect(wrapper.getComponent(TooltipContent).props('alignOffset')).toBe(input)
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
        it.each([0, 4, undefined])('passes arrowPadding=$input to TooltipContent', (input) => {
          const wrapper = mountWithContentProp('arrowPadding', input)

          expect(wrapper.getComponent(TooltipContent).props('arrowPadding')).toBe(input)
        })
      })

      describe('avoidCollisions', () => {
        it.each([true, false, undefined])(
          'passes avoidCollisions=$input to TooltipContent',
          (input) => {
            const wrapper = mountWithContentProp('avoidCollisions', input)

            expect(wrapper.getComponent(TooltipContent).props('avoidCollisions')).toBe(input)
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

        it.each([0, 6, padding, undefined])(
          'passes collisionPadding=$input to TooltipContent',
          (input) => {
            const wrapper = mountWithContentProp('collisionPadding', input)

            expect(wrapper.getComponent(TooltipContent).props('collisionPadding')).toEqual(input)
          },
        )
      })

      describe('forceMount', () => {
        it.each([true, false, undefined])('passes forceMount=$input to TooltipContent', (input) => {
          const wrapper = mountWithContentProp('forceMount', input)

          expect(wrapper.getComponent(TooltipContent).props('forceMount')).toBe(input)
        })
      })

      describe('hideWhenDetached', () => {
        it.each([true, false, undefined])(
          'passes hideWhenDetached=$input to TooltipContent',
          (input) => {
            const wrapper = mountWithContentProp('hideWhenDetached', input)

            expect(wrapper.getComponent(TooltipContent).props('hideWhenDetached')).toBe(input)
          },
        )
      })

      describe('positionStrategy', () => {
        it.each(['absolute', 'fixed', undefined])(
          'passes positionStrategy=$input to TooltipContent',
          (input) => {
            const wrapper = mountWithContentProp('positionStrategy', input)

            expect(wrapper.getComponent(TooltipContent).props('positionStrategy')).toBe(input)
          },
        )
      })

      describe('side', () => {
        it.each(['top', 'right', 'bottom', 'left', undefined])(
          'passes side=$input to TooltipContent',
          (input) => {
            const wrapper = mountWithContentProp('side', input)

            expect(wrapper.getComponent(TooltipContent).props('side')).toBe(input)
          },
        )
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
        it.each(['partial', 'always', undefined])(
          'passes sticky=$input to TooltipContent',
          (input) => {
            const wrapper = mountWithContentProp('sticky', input)

            expect(wrapper.getComponent(TooltipContent).props('sticky')).toBe(input)
          },
        )
      })

      describe('updatePositionStrategy', () => {
        it.each(['optimized', 'always', undefined])(
          'passes updatePositionStrategy=$input to TooltipContent',
          (input) => {
            const wrapper = mountWithContentProp('updatePositionStrategy', input)

            expect(wrapper.getComponent(TooltipContent).props('updatePositionStrategy')).toBe(input)
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
      { name: 'default values', open: undefined, expected: false },
      { name: 'configured values', open: true, expected: true },
    ])('creates the contract with $name', ({ open, expected }) => {
      const close = vi.fn()

      expect(createTooltipContext(open, close)).toEqual({
        open: expected,
        close,
      } satisfies TooltipContext)
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
