import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Search, type SearchProps } from '@/components/ui/Search'
import { testAttrs } from '../utils/testAttrs'

function mountSearch(options: MountingOptions<SearchProps> = {}) {
  return mount(Search, options)
}

describe('Search', () => {
  describe('attrs', () => {
    testAttrs({
      text: 'reenvia atributos arbitrarios, class y style al formulario raiz',
      id: '[data-test-search-root]',
      mount: (attrs) => mountSearch({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot por defecto sin slot props', () => {
        const search = mountSearch({
          slots: {
            default: () => h('span', { 'data-test-search-slot': '' }, 'Search content'),
          },
        })

        expect(search.get('[data-test-search-slot]').text()).toBe('Search content')
      })
    })
  })

  describe('form behavior', () => {
    it('renderiza un formulario de busqueda semantico y reenvia los listeners submit nativos', async () => {
      const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault())
      const search = mountSearch({
        attrs: {
          'aria-label': 'Site search',
          onSubmit,
        },
      })

      const root = search.get('[data-test-search-root]')
      await root.trigger('submit')

      expect(root.element.tagName).toBe('FORM')
      expect(root.attributes('role')).toBe('search')
      expect(root.attributes('data-slot')).toBe('search')
      expect(onSubmit).toHaveBeenCalledOnce()
      expect(onSubmit.mock.calls[0][0]).toBeInstanceOf(Event)
    })
  })
})
