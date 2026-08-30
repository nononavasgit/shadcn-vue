import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Input, type InputProps } from '@/components/ui/Input'
import { testAttrs } from '../utils/testAttrs'

function mountInput(options: MountingOptions<InputProps> = {}) {
  return mount(Input, options)
}

const casesValue = [
  { input: 'Término de búsqueda', expected: 'Término de búsqueda' },
  { input: '', expected: '' },
  { input: undefined, expected: '' },
]

describe('Input', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)('renderiza value=$input como "$expected"', ({ input, expected }) => {
        const root = mountInput({ props: { value: input } }).get('[data-test-input-root]')

        expect(root.element.value).toBe(expected)
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
