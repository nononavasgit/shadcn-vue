import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Button } from '@/components/ui/Button'
import { ButtonGroup, createButtonGroupContext } from '@/components/ui/ButtonGroup'

describe('ButtonGroup', () => {
  describe('Props', () => {
    it.each(['horizontal', 'vertical'] as const)('Render orientation %s', (orientation) => {
      const root = mount(ButtonGroup, {
        props: { orientation },
      }).get('[data-button-group-ui="root"]')

      expect(root.classes()).toContain(orientation === 'horizontal' ? 'flex-row' : 'flex-col')
    })

    it.each([
      ['xs', ['[&>*]:h-7', '[&>*]:px-2.5', '[&>*]:text-xs']],
      ['sm', ['[&>*]:h-8', '[&>*]:px-3', '[&>*]:text-sm']],
      ['md', ['[&>*]:h-9', '[&>*]:px-4', '[&>*]:text-base']],
      ['lg', ['[&>*]:h-10', '[&>*]:px-6', '[&>*]:text-lg']],
    ] as const)('Render size %s', (size, expectedClasses) => {
      const root = mount(ButtonGroup, {
        props: { size },
      }).get('[data-button-group-ui="root"]')

      expect(root.classes()).toEqual(expect.arrayContaining(expectedClasses))
    })

    it('Render HTML Attributes by ui function', () => {
      const root = () => ({ class: 'ui-root', 'aria-label': 'Acciones' })
      const buttonGroup = mount(ButtonGroup, {
        props: { ui: { root } },
      }).get('[data-button-group-ui="root"]')

      expect(buttonGroup.classes()).toContain('ui-root')
      expect(buttonGroup.attributes('aria-label')).toBe('Acciones')
    })
  })

  describe('Slots', () => {
    it('Render default slot', () => {
      const root = mount(ButtonGroup, {
        slots: {
          default: () => [h(Button, { label: 'Guardar' }), h(Button, { label: 'Cancelar' })],
        },
      }).get('[data-button-group-slot="default"]')

      expect(root.findAll('button')).toHaveLength(2)
      expect(root.text()).toBe('GuardarCancelar')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const root = mount(ButtonGroup, {
        attrs: {
          class: 'custom-button-group',
          style: 'opacity: 0.5',
          'data-test': 'actions',
        },
      }).get('[data-button-group-ui="root"]')

      expect(root.classes()).toContain('custom-button-group')
      expect(root.attributes('style')).toContain('opacity: 0.5')
      expect(root.attributes('data-test')).toBe('actions')
      expect(root.attributes('role')).toBe('group')
    })
  })

  describe('Context', () => {
    const context = { orientation: 'vertical' as const, size: 'lg' as const }

    it('ButtonGroup context', () => {
      expect(createButtonGroupContext(context)).toEqual(context)
    })

    it('ButtonGroup context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(ButtonGroup, {
        props: { ...context, ui: { root } },
      })

      expect(root).toHaveBeenCalledWith(context)
    })

    it('ButtonGroup context to default slot', () => {
      const slot = vi.fn(() => 'Acciones')

      mount(ButtonGroup, {
        props: context,
        slots: { default: slot },
      })

      expect(slot).toHaveBeenCalledWith(context)
    })
  })
})
