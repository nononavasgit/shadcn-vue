import { describe, expect, it } from 'vitest'

import { useFilter } from '@/composables/useFilter'

const items = [{ label: 'Manzana' }, { label: 'Plátano' }, { label: 'Naranja' }]

describe('useFilter', () => {
  describe('contains', () => {
    const { filter } = useFilter({ mode: 'contains', getText: (item) => item.label })

    it('filtra por coincidencia parcial', () => {
      expect(filter(items, 'na')).toEqual([{ label: 'Manzana' }, { label: 'Naranja' }])
    })

    it('ignora mayúsculas, espacios y tildes', () => {
      expect(filter(items, '  PLATANO ')).toEqual([{ label: 'Plátano' }])
    })

    it('devuelve todos los elementos cuando la búsqueda está vacía', () => {
      expect(filter(items, '   ')).toBe(items)
    })

    it('usa sensitivity base por defecto', () => {
      expect(filter(items, 'platano')).toEqual([{ label: 'Plátano' }])
    })

    it('permite distinguir tildes con sensitivity accent', () => {
      const { filter: accentFilter } = useFilter({
        mode: 'contains',
        sensitivity: 'accent',
        getText: (item) => item.label,
      })

      expect(accentFilter(items, 'platano')).toEqual([])
    })
  })

  describe('startWith', () => {
    const { filter } = useFilter({ mode: 'startWith', getText: (item) => item.label })

    it('filtra por coincidencia al inicio', () => {
      expect(filter(items, 'man')).toEqual([{ label: 'Manzana' }])
    })

    it('no devuelve coincidencias intermedias', () => {
      expect(filter(items, 'nan')).toEqual([])
    })
  })

  describe('endWith', () => {
    const { filter } = useFilter({ mode: 'endWith', getText: (item) => item.label })

    it('filtra por coincidencia al final', () => {
      expect(filter(items, 'zana')).toEqual([{ label: 'Manzana' }])
    })

    it('no devuelve coincidencias intermedias', () => {
      expect(filter(items, 'nan')).toEqual([])
    })
  })
})
