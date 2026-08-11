import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Textarea, createTextareaContext } from '@/components/ui/Textarea'

describe('Textarea', () => {
  describe('Props', () => {
    it('Render empty value by default', () => {
      const textarea = mount(Textarea).get('textarea')

      expect(textarea.element.value).toBe('')
    })

    it.each([
      ['Descripción', 'Descripción'],
      [42, '42'],
    ])('Render value %s', (value, expectedValue) => {
      const textarea = mount(Textarea, {
        props: { value },
      }).get('[data-textarea-ui="root"]')

      expect(textarea.element.value).toBe(expectedValue)
    })

    it('Update rendered value from props', async () => {
      const wrapper = mount(Textarea, {
        props: { value: 'Inicial' },
      })

      await wrapper.setProps({ value: 'Actualizado' })

      expect(wrapper.get('textarea').element.value).toBe('Actualizado')
    })

    it.each(['object', 'function'] as const)('Render HTML Attributes by ui %s', (uiType) => {
      const textarea = mount(Textarea, {
        props: {
          ui: {
            root:
              uiType === 'function'
                ? () => ({ class: 'ui-root', 'aria-label': 'Descripción' })
                : { class: 'ui-root', 'aria-label': 'Descripción' },
          },
        },
      }).get('[data-textarea-ui="root"]')

      expect(textarea.classes()).toContain('ui-root')
      expect(textarea.attributes('aria-label')).toBe('Descripción')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const textarea = mount(Textarea, {
        attrs: {
          class: 'custom-textarea',
          style: 'opacity: 0.5',
          'data-test': 'description-textarea',
          'aria-invalid': 'true',
        },
      }).get('[data-textarea-ui="root"]')

      expect(textarea.classes()).toEqual(
        expect.arrayContaining(['min-h-16', 'w-full', 'custom-textarea']),
      )
      expect(textarea.attributes('style')).toContain('opacity: 0.5')
      expect(textarea.attributes('data-test')).toBe('description-textarea')
      expect(textarea.attributes('aria-invalid')).toBe('true')
    })
  })

  describe('Events', () => {
    it('Emit update:value and valueChange on input', async () => {
      const wrapper = mount(Textarea, {
        props: { value: 'Inicial' },
      })

      await wrapper.get('textarea').setValue('Actualizado')

      expect(wrapper.emitted('update:value')).toEqual([['Actualizado']])
      expect(wrapper.emitted('valueChange')).toEqual([['Actualizado']])
    })

    it('Do not emit valueChange when value does not change', async () => {
      const wrapper = mount(Textarea, {
        props: { value: 'Igual' },
      })

      await wrapper.get('textarea').setValue('Igual')

      expect(wrapper.emitted('valueChange')).toBeUndefined()
    })

    it('Emit valueChange when value prop changes', async () => {
      const wrapper = mount(Textarea, {
        props: { value: 'Inicial' },
      })

      await wrapper.setProps({ value: 'Externo' })

      expect(wrapper.emitted('valueChange')).toEqual([['Externo']])
    })
  })

  describe('Context', () => {
    it('Textarea context', () => {
      const context = createTextareaContext('Actualizado')

      expect(context).toEqual({
        value: 'Actualizado',
      })
    })

    it('Textarea context to ui.root function', async () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))
      const wrapper = mount(Textarea, {
        props: {
          value: 'Inicial',
          ui: { root },
        },
      })

      expect(root).toHaveBeenLastCalledWith({
        value: 'Inicial',
      })

      await wrapper.get('textarea').setValue('Actualizado')

      expect(root).toHaveBeenLastCalledWith({
        value: 'Actualizado',
      })
    })
  })
})
