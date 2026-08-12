import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Icon, createIconContext } from '@/components/ui/Icon'

describe('Icon', () => {
  describe('Props', () => {
    it('Render icon', () => {
      const icon = mount(Icon, {
        props: { name: 'chevronRight' },
      })

      expect(icon.classes()).toContain('lucide-chevron-right')
      expect(icon.classes()).not.toContain('lucide-check')
    })

    it.each([
      ['xs', 'size-3'],
      ['sm', 'size-4'],
      ['md', 'size-5'],
      ['lg', 'size-6'],
    ])('Render %s size', (size, expectedClass) => {
      const icon = mount(Icon, {
        props: {
          name: 'check',
          size,
        },
      })
      expect(icon.classes()).toContain(expectedClass)
    })

    it('Render style color', () => {
      const icon = mount(Icon, {
        props: {
          name: 'check',
          color: '#ff0000',
        },
      })

      expect(icon.attributes('style')).toContain('color: rgb(255, 0, 0)')
    })

    it('Render color default', () => {
      const icon = mount(Icon, {
        props: { name: 'check' },
      })

      expect(icon.attributes('style')).toContain('color: currentcolor')
    })

    it('Render HTML Attributes by ui', () => {
      const wrapper = mount(Icon, {
        props: {
          name: 'check',
          color: '#ffffff',
          size: 'md',
          ui: {
            root: () => ({ class: 'ui-root' }),
          },
        },
      })

      expect(wrapper.get('[data-icon-ui="root"]').classes()).toContain('ui-root')
    })

    it('Render HTML Attributes by ui function', () => {
      const wrapper = mount(Icon, {
        props: {
          name: 'check',
          color: '#ffffff',
          size: 'md',
          ui: {
            root: () => ({ class: 'ui-root' }),
          },
        },
      })

      expect(wrapper.get('[data-icon-ui="root"]').classes()).toContain('ui-root')
    })
  })

  describe('Attrs', () => {
    it('Merge custom attrs, class and styles', () => {
      const icon = mount(Icon, {
        props: { name: 'check' },
        attrs: {
          class: 'custom-icon',
          style: 'opacity: 0.5',
          'data-test': 'status-icon',
          'aria-hidden': false,
        },
      })

      expect(icon.classes()).toEqual(
        expect.arrayContaining(['lucide-check', 'shrink-0', 'size-5', 'custom-icon']),
      )
      expect(icon.attributes('style')).toContain('color: currentcolor')
      expect(icon.attributes('style')).toContain('opacity: 0.5')
      expect(icon.attributes('data-test')).toBe('status-icon')
      expect(icon.attributes('aria-hidden')).toBe('false')
    })
  })

  describe('Context', () => {
    it('Icon context', () => {
      const context = createIconContext({
        name: 'check',
        color: '#ffffff',
        size: 'lg',
        ui: {
          root: () => ({ class: 'ui-root' }),
        },
      })

      expect(context).toEqual({
        name: 'check',
        color: '#ffffff',
        size: 'lg',
      })
    })

    it('Icon context to ui.root function', () => {
      const root = vi.fn(() => ({
        class: 'ui-root',
      }))

      mount(Icon, {
        props: {
          name: 'check',
          color: '#ffffff',
          size: 'lg',
          ui: {
            root,
          },
        },
      })

      expect(root).toHaveBeenCalledWith({
        name: 'check',
        color: '#ffffff',
        size: 'lg',
      })
    })
  })
})
