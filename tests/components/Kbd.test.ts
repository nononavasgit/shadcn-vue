import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Kbd, type KbdProps } from '@/components/ui/Kbd'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountKbd(options: MountingOptions<KbdProps> = {}) {
  return mount(Kbd, options)
}

function mountWithProp(prop: keyof KbdProps, value: unknown) {
  return mountKbd({ props: { [prop]: value } as KbdProps })
}

const casesLabel = [
  { input: 'Ctrl', expected: 'Ctrl' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
]

const casesSize = [
  { input: 'sm' as const, expected: ['h-4', 'min-w-4', 'text-[10px]'] },
  { input: 'md' as const, expected: ['h-5', 'min-w-5', 'text-[11px]'] },
  { input: 'lg' as const, expected: ['h-6', 'min-w-6', 'text-xs'] },
  { input: undefined, expected: ['h-5', 'min-w-5', 'text-[11px]'] },
]

const casesVariant = [
  {
    input: 'solid' as const,
    expected: ['border-transparent', 'bg-secondary', 'text-secondary-foreground'],
  },
  {
    input: 'outline' as const,
    expected: ['border-secondary-foreground/30', 'bg-transparent', 'text-secondary-foreground'],
  },
  {
    input: 'soft' as const,
    expected: ['border-transparent', 'bg-secondary/60', 'text-secondary-foreground'],
  },
  {
    input: 'subtle' as const,
    expected: ['border-secondary-foreground/15', 'bg-secondary/60', 'text-secondary-foreground'],
  },
  {
    input: undefined,
    expected: ['border-transparent', 'bg-secondary/60', 'text-secondary-foreground'],
  },
]

const casesSeverity = [
  { input: 'primary' as const, expected: ['bg-primary', 'text-primary-foreground'] },
  { input: 'secondary' as const, expected: ['bg-secondary', 'text-secondary-foreground'] },
  { input: 'warning' as const, expected: ['bg-warning', 'text-warning-foreground'] },
  { input: 'success' as const, expected: ['bg-success', 'text-success-foreground'] },
  { input: 'error' as const, expected: ['bg-error', 'text-error-foreground'] },
  { input: undefined, expected: ['bg-secondary', 'text-secondary-foreground'] },
]

describe('Kbd', () => {
  describe('props', () => {
    describe('label', () => {
      it.each(casesLabel)('renderiza label=$input como "$expected"', ({ input, expected }) => {
        const root = mountKbd({ props: { label: input } }).get('[data-test-kbd-root]')

        expect(root.text()).toBe(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const root = mountWithProp('size', input).get('[data-test-kbd-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('renderiza variant=$input', ({ input, expected }) => {
        const root = mountWithProp('variant', input).get('[data-test-kbd-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('severity', () => {
      it.each(casesSeverity)('renderiza severity=$input', ({ input, expected }) => {
        const root = mountKbd({
          props: { severity: input, variant: 'solid' },
        }).get('[data-test-kbd-root]')

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })
    })

    describe('color', () => {
      testColor({
        text: 'renderiza color',
        id: '[data-test-kbd-root]',
        varColor: '--kbd-color',
        mount: (color) => mountKbd({ props: { color } }),
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-kbd-root]',
      mount: (attrs) => mountKbd({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot predeterminado y sustituye el label alternativo', () => {
        const kbd = mountKbd({
          props: { label: 'Valor alternativo' },
          slots: {
            default: () => h('span', { 'data-test-kbd-slot': '' }, 'Ctrl+K'),
          },
        })

        expect(kbd.get('[data-test-kbd-slot]').text()).toBe('Ctrl+K')
        expect(kbd.get('[data-test-kbd-root]').text()).not.toContain('Valor alternativo')
      })
    })
  })
})
