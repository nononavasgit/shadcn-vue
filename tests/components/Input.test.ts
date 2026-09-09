import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Input, type InputProps, type InputSize, type InputVariant } from '@/components/ui/Input'
import { inputDefaults } from '@/components/ui/Input/default'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountInput(options: MountingOptions<InputProps> = {}) {
  return mount(Input, options)
}

const casesValue = [
  { input: 'Término de búsqueda', expected: 'Término de búsqueda' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
]

const casesSize = [
  { input: undefined, expected: ['h-9', 'text-base'] },
  { input: 'xs' as const, expected: ['h-7', 'text-sm'] },
  { input: 'sm' as const, expected: ['h-8', 'text-sm'] },
  { input: 'md' as const, expected: ['h-9', 'text-base'] },
  { input: 'lg' as const, expected: ['h-10', 'text-lg'] },
  { input: 'xl' as const, expected: ['h-11', 'text-xl'] },
]

const casesVariant = [
  {
    input: undefined,
    expected: ['rounded-md', 'border', 'bg-transparent', 'shadow-xs'],
  },
  {
    input: 'outline' as const,
    expected: ['rounded-md', 'border', 'bg-transparent', 'shadow-xs'],
  },
  {
    input: 'plain' as const,
    expected: ['rounded-md', 'border-transparent', 'bg-transparent', 'shadow-none'],
  },
  {
    input: 'subtle' as const,
    expected: ['rounded-md', 'border', 'border-primary/20', 'bg-primary/10', 'shadow-xs'],
  },
  {
    input: 'soft' as const,
    expected: ['rounded-md', 'border-transparent', 'bg-primary/10', 'shadow-none'],
  },
]

describe('Input', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)('renderiza value=$input como "$expected"', ({ input, expected }) => {
        const root = mountInput({ props: { value: input } }).get('[data-test-input-root]')

        expect(root.element.value).toBe(expected)
      })
    })

    describe('size', () => {
      it.each(casesSize)('renderiza size=$input', ({ input, expected }) => {
        const root = mountInput({ props: { size: input as InputSize } }).get(
          '[data-test-input-group-root]',
        )

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })

      it('usa md por defecto', () => {
        const wrapper = mountInput()

        expect(wrapper.vm.$props.size).toBe(inputDefaults.size)
      })
    })

    describe('variant', () => {
      it.each(casesVariant)('renderiza variant=$input', ({ input, expected }) => {
        const root = mountInput({ props: { variant: input as InputVariant } }).get(
          '[data-test-input-group-root]',
        )

        expect(root.classes()).toEqual(expect.arrayContaining(expected))
      })

      it('usa outline por defecto', () => {
        const wrapper = mountInput()

        expect(wrapper.vm.$props.variant).toBe(inputDefaults.variant)
      })
    })

    describe('color', () => {
      testColor({
        text: 'renderiza color',
        id: '[data-test-input-group-root]',
        varColor: '--input-color',
        mount: (color) => mountInput({ props: { color } }),
      })

      it('aplica las clases del color personalizado al root', () => {
        const root = mountInput({ props: { color: '#ff0000' } }).get('[data-test-input-group-root]')

        expect(root.classes()).toEqual(
          expect.arrayContaining([
            'focus-within:border-(--input-color)',
            'border-(--input-color)/40',
          ]),
        )
      })

      it('mantiene el valor con el color de texto normal', () => {
        const input = mountInput({ props: { variant: 'soft', color: '#ff0000' } }).get(
          '[data-test-input-root]',
        )

        expect(input.classes()).toContain('text-foreground')
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-input-root]',
      mount: (attrs) => mountInput({ attrs }),
    })

    it('pasa la clase y el estilo a la raíz del grupo de entrada', () => {
      const root = mountInput({
        attrs: {
          id: 'input-control',
          class: 'custom-input-group',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-input-group-root]')

      expect(root.classes()).toContain('custom-input-group')
      expect(root.attributes('style')).toContain('opacity: 0.5')
      expect(root.attributes('id')).toBeUndefined()
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it('emite el valor actualizado cuando el usuario edita el campo', async () => {
        const wrapper = mountInput({ props: { value: '' } })

        await wrapper.get('[data-test-input-root]').setValue('Valor actualizado')

        expect(wrapper.emitted('update:value')).toEqual([['Valor actualizado']])
      })
    })
  })

  describe('slots', () => {
    describe('leading', () => {
      it('renderiza el slot leading dentro del addon predeterminado', () => {
        const wrapper = mountInput({
          slots: {
            leading: () => h('span', { 'data-test-input-leading': '' }, 'Contenido inicial'),
          },
        })

        expect(wrapper.get('[data-test-input-leading]').text()).toBe('Contenido inicial')
        expect(wrapper.findAll('[data-test-input-group-addon]')).toHaveLength(1)
      })
    })

    describe('trailing', () => {
      it('renderiza el slot trailing dentro del addon final', () => {
        const wrapper = mountInput({
          slots: {
            trailing: () => h('span', { 'data-test-input-trailing': '' }, 'Contenido final'),
          },
        })

        expect(wrapper.get('[data-test-input-trailing]').text()).toBe('Contenido final')
        expect(wrapper.findAll('[data-test-input-group-addon]')).toHaveLength(1)
      })
    })

    it('no renderiza addons cuando faltan los slots', () => {
      expect(mountInput().find('[data-test-input-group-addon]').exists()).toBe(false)
    })
  })
})
