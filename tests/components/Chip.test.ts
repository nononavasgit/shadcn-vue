import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Chip, type ChipProps } from '@/components/ui/Chip'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountChip(options: MountingOptions<ChipProps> = {}) {
  return mount(Chip, options)
}

describe('Chip', () => {
  describe('props', () => {
    describe('text', () => {
      it.each([
        { input: '5', expected: '5' },
        { input: 0, expected: '0' },
        { input: undefined, expected: '' },
      ])('renders text=$input as "$expected"', ({ input, expected }) => {
        const chip = mountChip({ props: { text: input } })

        expect(chip.get('[data-test-chip-base]').text()).toBe(expected)
      })
    })

    describe('size', () => {
      it.each([
        { input: '3xs' as const, expected: ['h-1', 'min-w-1', 'text-[4px]'] },
        { input: '2xs' as const, expected: ['h-1.5', 'min-w-1.5', 'text-[5px]'] },
        { input: 'xs' as const, expected: ['h-1.5', 'min-w-1.5', 'text-[6px]'] },
        { input: 'sm' as const, expected: ['h-2', 'min-w-2', 'text-[7px]'] },
        { input: 'md' as const, expected: ['h-2', 'min-w-2', 'text-[8px]'] },
        { input: 'lg' as const, expected: ['h-2.5', 'min-w-2.5', 'text-[9px]'] },
        { input: 'xl' as const, expected: ['h-2.5', 'min-w-2.5', 'text-[10px]'] },
        { input: '2xl' as const, expected: ['h-3', 'min-w-3', 'text-[11px]'] },
        { input: '3xl' as const, expected: ['h-3', 'min-w-3', 'text-xs'] },
      ])('renders size=$input', ({ input, expected }) => {
        const base = mountChip({ props: { size: input } }).get('[data-test-chip-base]')

        expect(base.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('position', () => {
      it.each([
        {
          input: 'top-right' as const,
          expected: ['top-0', 'right-0', '-translate-y-1/2', 'translate-x-1/2'],
        },
        {
          input: 'bottom-right' as const,
          expected: ['bottom-0', 'right-0', 'translate-y-1/2', 'translate-x-1/2'],
        },
        {
          input: 'top-left' as const,
          expected: ['top-0', 'left-0', '-translate-y-1/2', '-translate-x-1/2'],
        },
        {
          input: 'bottom-left' as const,
          expected: ['bottom-0', 'left-0', 'translate-y-1/2', '-translate-x-1/2'],
        },
      ])('renders position=$input', ({ input, expected }) => {
        const root = mountChip({ props: { position: input } }).get('[data-test-chip-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('inset', () => {
      it.each([
        { input: true, expectedTransform: false },
        { input: false, expectedTransform: true },
        { input: undefined, expectedTransform: true },
      ])('renders inset=$input', ({ input, expectedTransform }) => {
        const root = mountChip({ props: { inset: input } }).get('[data-test-chip-root]')

        expect(root.classes().includes('-translate-y-1/2')).toBe(expectedTransform)
      })
    })

    describe('standalone', () => {
      it('does not position the chip absolutely when enabled', () => {
        const root = mountChip({ props: { standalone: true } }).get('[data-test-chip-root]')

        expect(root.classes()).not.toContain('absolute')
      })
    })

    describe('color', () => {
      testColor({
        text: 'passes color to Chip',
        id: '[data-test-chip-root]',
        varColor: '--chip-color',
        mount: (color) => mountChip({ props: { color } }),
      })
    })

    describe('show', () => {
      it('shows the chip by default and supports v-model:show', async () => {
        const chip = mountChip({ props: { show: false } })

        expect(chip.find('[data-test-chip-base]').exists()).toBe(false)

        await chip.setProps({ show: true })

        expect(chip.find('[data-test-chip-base]').exists()).toBe(true)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-chip-root]',
      mount: (attrs) => mountChip({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renders the default slot inside the root', () => {
        const chip = mountChip({
          slots: { default: () => h('button', { 'data-test-chip-content': '' }, 'Inbox') },
        })

        expect(chip.get('[data-test-chip-content]').text()).toBe('Inbox')
      })

      it('uses the default slot as the positioning context for the chip', () => {
        const chip = mountChip({
          slots: { default: () => h('div', { 'data-test-chip-content': '' }, 'Avatar') },
        })

        const root = chip.get('[data-test-chip-root]')
        const base = chip.get('[data-test-chip-base]')

        expect(root.classes()).not.toContain('absolute')
        expect(base.classes()).toEqual(
          expect.arrayContaining(['absolute', 'top-0', 'right-0', '-translate-y-1/2']),
        )
      })
    })

    describe('content', () => {
      it('renders the content slot and hides the text fallback', () => {
        const chip = mountChip({
          props: { text: 'Fallback' },
          slots: { content: () => h('span', { 'data-test-chip-slot': '' }, 'Custom') },
        })

        expect(chip.get('[data-test-chip-slot]').text()).toBe('Custom')
        expect(chip.get('[data-test-chip-base]').text()).not.toContain('Fallback')
      })
    })
  })
})
