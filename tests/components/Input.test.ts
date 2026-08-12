import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Input, createInputContext } from '@/components/ui/Input'

describe('Input', () => {
  describe('Props', () => {
    it('Render empty value by default', () => {
      const input = mount(Input).get('input')

      expect(input.element.value).toBe('')
    })

    it('Render value', () => {
      const input = mount(Input, {
        props: { value: 'Buscar' },
      }).get('[data-input-ui="root"]')

      expect(input.element.value).toBe('Buscar')
    })

    it('Update rendered value from props', async () => {
      const wrapper = mount(Input, {
        props: { value: 'Inicial' },
      })

      await wrapper.setProps({ value: 'Actualizado' })

      expect(wrapper.get('input').element.value).toBe('Actualizado')
    })

    it('Render HTML Attributes by ui function', () => {
      const input = mount(Input, {
        props: {
          ui: {
            root: () => ({ class: 'ui-root', 'aria-label': 'Buscar' }),
          },
        },
      }).get('input')

      expect(input.classes()).toContain('ui-root')
      expect(input.attributes('aria-label')).toBe('Buscar')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const input = mount(Input, {
        attrs: {
          class: 'custom-input',
          style: 'opacity: 0.5',
          'data-test': 'search-input',
          'aria-invalid': 'true',
        },
      }).get('input')

      expect(input.classes()).toEqual(expect.arrayContaining(['h-9', 'w-full', 'custom-input']))
      expect(input.attributes('style')).toContain('opacity: 0.5')
      expect(input.attributes('data-test')).toBe('search-input')
      expect(input.attributes('aria-invalid')).toBe('true')
    })
  })

  describe('Events', () => {
    it('Emit update:value and valueChange on input', async () => {
      const wrapper = mount(Input, {
        props: { value: 'Inicial' },
      })

      await wrapper.get('input').setValue('Actualizado')

      expect(wrapper.emitted('update:value')).toEqual([['Actualizado']])
      expect(wrapper.emitted('valueChange')).toEqual([['Actualizado']])
    })

    it('Do not emit valueChange when value does not change', async () => {
      const wrapper = mount(Input, {
        props: { value: 'Igual' },
      })

      await wrapper.get('input').setValue('Igual')

      expect(wrapper.emitted('valueChange')).toBeUndefined()
    })

    it('Emit valueChange when value prop changes', async () => {
      const wrapper = mount(Input, {
        props: { value: 'Inicial' },
      })

      await wrapper.setProps({ value: 'Externo' })

      expect(wrapper.emitted('valueChange')).toEqual([['Externo']])
    })
  })

  describe('Context', () => {
    it('Input context', () => {
      const context = createInputContext('Actualizado')

      expect(context).toEqual({
        value: 'Actualizado',
      })
    })

    it('Input context to ui.root function', async () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))
      const wrapper = mount(Input, {
        props: {
          value: 'Inicial',
          ui: { root },
        },
      })

      expect(root).toHaveBeenLastCalledWith({
        value: 'Inicial',
      })

      await wrapper.get('input').setValue('Actualizado')

      expect(root).toHaveBeenLastCalledWith({
        value: 'Actualizado',
      })
    })
  })
})
