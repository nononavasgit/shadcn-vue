import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Toolbar } from '@/components/ui/Toolbar'

describe('Toolbar', () => {
  describe('Props', () => {
    it.each(['object', 'function'] as const)('Render HTML Attributes by ui %s', (uiType) => {
      const root =
        uiType === 'function'
          ? () => ({ class: 'ui-root', 'aria-label': 'Editor tools' })
          : { class: 'ui-root', 'aria-label': 'Editor tools' }
      const toolbar = mount(Toolbar, {
        props: { ui: { root } },
      }).get('[data-toolbar-ui="root"]')

      expect(toolbar.classes()).toContain('ui-root')
      expect(toolbar.attributes('aria-label')).toBe('Editor tools')
    })
  })

  describe('Slots', () => {
    it('Render consumer content', () => {
      const toolbar = mount(Toolbar, {
        slots: {
          default: () => [h('button', 'Bold'), h('button', 'Italic')],
        },
      }).get('[data-toolbar-slot="default"]')

      expect(toolbar.findAll('button')).toHaveLength(2)
      expect(toolbar.text()).toBe('BoldItalic')
    })
  })

  describe('Attrs', () => {
    it('Merge attrs, class and style', () => {
      const toolbar = mount(Toolbar, {
        attrs: {
          class: 'custom-toolbar',
          style: 'opacity: 0.5',
          'data-test': 'editor-toolbar',
        },
      }).get('[data-toolbar-ui="root"]')

      expect(toolbar.classes()).toContain('custom-toolbar')
      expect(toolbar.attributes('style')).toContain('opacity: 0.5')
      expect(toolbar.attributes('data-test')).toBe('editor-toolbar')
    })
  })

  describe('Context', () => {
    it('Toolbar context to ui.root function', () => {
      const root = vi.fn(() => ({ class: 'ui-root' }))

      mount(Toolbar, {
        props: { orientation: 'vertical', ui: { root } },
      })

      expect(root).toHaveBeenCalledWith({ orientation: 'vertical' })
    })

    it('Toolbar context to default slot', () => {
      const slot = vi.fn(() => 'Tools')

      mount(Toolbar, {
        props: { orientation: 'vertical' },
        slots: { default: slot },
      })

      expect(slot).toHaveBeenCalledWith({ orientation: 'vertical' })
    })
  })
})
