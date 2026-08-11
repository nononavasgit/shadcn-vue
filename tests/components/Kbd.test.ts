import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Kbd, KbdGroup, createKbdContext, createKbdGroupContext } from '@/components/ui/Kbd'

describe('Kbd', () => {
  describe('Props', () => {
    it('Render label', () => {
      const kbd = mount(Kbd, {
        props: { label: 'Ctrl' },
      }).get('[data-kbd-ui="root"]')

      expect(kbd.element.tagName).toBe('KBD')
      expect(kbd.text()).toBe('Ctrl')
    })

    it.each(['object', 'function'] as const)('Render HTML Attributes by ui %s', (uiType) => {
      const root =
        uiType === 'function'
          ? () => ({ class: 'ui-root', 'aria-label': 'Control' })
          : { class: 'ui-root', 'aria-label': 'Control' }
      const kbd = mount(Kbd, {
        props: { ui: { root } },
      }).get('[data-kbd-ui="root"]')

      expect(kbd.classes()).toContain('ui-root')
      expect(kbd.attributes('aria-label')).toBe('Control')
    })
  })

  describe('Slots', () => {
    it('Render default and replace label', () => {
      const kbd = mount(Kbd, {
        props: { label: 'Ctrl' },
        slots: { default: () => h('span', '⌘') },
      }).get('[data-kbd-slot="default"]')

      expect(kbd.get('span').text()).toBe('⌘')
      expect(kbd.text()).not.toContain('Ctrl')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const kbd = mount(Kbd, {
        attrs: {
          class: 'custom-kbd',
          style: 'opacity: 0.5',
          'data-test': 'shortcut-key',
        },
      }).get('[data-kbd-ui="root"]')

      expect(kbd.classes()).toContain('custom-kbd')
      expect(kbd.attributes('style')).toContain('opacity: 0.5')
      expect(kbd.attributes('data-test')).toBe('shortcut-key')
    })
  })

  describe('Context', () => {
    it('Kbd context', () => {
      const context = createKbdContext({
        label: 'Ctrl',
        ui: { root: { class: 'ui-root' } },
      })

      expect(context).toEqual({ label: 'Ctrl' })
    })

    it('Kbd context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(Kbd, {
        props: { label: 'Ctrl', ui: { root } },
      })

      expect(root).toHaveBeenCalledWith({ label: 'Ctrl' })
    })

    it('Kbd context to default slot', () => {
      const slot = vi.fn(() => 'Ctrl')

      mount(Kbd, {
        props: { label: 'Ctrl' },
        slots: { default: slot },
      })

      expect(slot).toHaveBeenCalledWith({ label: 'Ctrl' })
    })
  })
})

describe('KbdGroup', () => {
  describe('Props', () => {
    it.each(['object', 'function'] as const)('Render HTML Attributes by ui %s', (uiType) => {
      const root =
        uiType === 'function'
          ? () => ({ class: 'ui-root', 'aria-label': 'Atajo' })
          : { class: 'ui-root', 'aria-label': 'Atajo' }
      const group = mount(KbdGroup, {
        props: { ui: { root } },
      }).get('[data-kbd-group-ui="root"]')

      expect(group.element.tagName).toBe('KBD')
      expect(group.classes()).toContain('ui-root')
      expect(group.attributes('aria-label')).toBe('Atajo')
    })
  })

  describe('Slots', () => {
    it('Render default slot', () => {
      const group = mount(KbdGroup, {
        slots: {
          default: () => [h(Kbd, { label: 'Ctrl' }), h('span', '+'), h(Kbd, { label: 'K' })],
        },
      }).get('[data-kbd-group-slot="default"]')

      expect(group.findAll('[data-kbd-ui="root"]')).toHaveLength(2)
      expect(group.text()).toBe('Ctrl+K')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const group = mount(KbdGroup, {
        attrs: {
          class: 'custom-kbd-group',
          style: 'opacity: 0.5',
          'data-test': 'shortcut-group',
        },
      }).get('[data-kbd-group-ui="root"]')

      expect(group.classes()).toContain('custom-kbd-group')
      expect(group.attributes('style')).toContain('opacity: 0.5')
      expect(group.attributes('data-test')).toBe('shortcut-group')
    })
  })

  describe('Context', () => {
    it('KbdGroup context', () => {
      expect(createKbdGroupContext()).toEqual({})
    })

    it('KbdGroup context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(KbdGroup, {
        props: { ui: { root } },
      })

      expect(root).toHaveBeenCalledWith({})
    })

    it('KbdGroup context to default slot', () => {
      const slot = vi.fn(() => 'Ctrl+K')

      mount(KbdGroup, {
        slots: { default: slot },
      })

      expect(slot).toHaveBeenCalledWith({})
    })
  })
})
