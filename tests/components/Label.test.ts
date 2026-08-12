import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Label, createLabelContext } from '@/components/ui/Label'

describe('Label', () => {
  describe('Props', () => {
    it('Render a native label element', () => {
      const label = mount(Label).get('[data-label-ui="root"]')

      expect(label.element.tagName).toBe('LABEL')
    })

    it('Render for attribute', () => {
      const label = mount(Label, {
        props: { for: 'email' },
      }).get('[data-label-ui="root"]')

      expect(label.attributes('for')).toBe('email')
    })

    it('Render HTML attributes by ui function', () => {
      const root = () => ({ class: 'ui-root', 'aria-label': 'Email' })
      const label = mount(Label, {
        props: { ui: { root } },
      }).get('[data-label-ui="root"]')

      expect(label.classes()).toContain('ui-root')
      expect(label.attributes('aria-label')).toBe('Email')
    })
  })

  describe('Slots', () => {
    it('Render default slot content', () => {
      const label = mount(Label, {
        slots: { default: 'Correo electrónico' },
      }).get('[data-label-slot="default"]')

      expect(label.text()).toBe('Correo electrónico')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const label = mount(Label, {
        attrs: {
          class: 'custom-label',
          style: 'opacity: 0.5',
          'data-test': 'email-label',
        },
      }).get('[data-label-ui="root"]')

      expect(label.classes()).toContain('custom-label')
      expect(label.attributes('style')).toContain('opacity: 0.5')
      expect(label.attributes('data-test')).toBe('email-label')
    })
  })

  describe('Context', () => {
    it('Label context', () => {
      const context = createLabelContext({
        for: 'email',
      })

      expect(context).toEqual({ for: 'email' })
    })

    it('Label context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(Label, {
        props: {
          for: 'email',
          ui: { root },
        },
      })

      expect(root).toHaveBeenCalledWith({ for: 'email' })
    })

    it('Label context to default slot', () => {
      const slot = vi.fn(() => 'Correo electrónico')

      mount(Label, {
        props: { for: 'email' },
        slots: { default: slot },
      })

      expect(slot).toHaveBeenCalledWith({ for: 'email' })
    })
  })
})
