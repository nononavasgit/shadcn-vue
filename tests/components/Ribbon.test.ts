import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Ribbon, type RibbonProps } from '@/components/ui/Ribbon'
import { testAttrs } from '../utils/testAttrs'
import { testColor } from '../utils/testColor'

function mountRibbon(options: MountingOptions<RibbonProps> = {}) {
  return mount(Ribbon, options)
}

describe('Ribbon', () => {
  describe('props', () => {
    describe('ribbons', () => {
      it('usa un array vacío por defecto', () => {
        const ribbon = mountRibbon()

        expect(ribbon.findAll('[data-test-ribbon-band]')).toHaveLength(0)
      })

      it('renderiza cada elemento del array en el mismo orden', () => {
        const ribbon = mountRibbon({
          props: {
            ribbons: [{ label: 'Oferta' }, { label: 'Nuevo', position: 'top-left' }],
          },
        })

        expect(ribbon.findAll('[data-test-ribbon-band]')).toHaveLength(2)
        expect(ribbon.get('[data-test-ribbon-band="0"]').text()).toBe('Oferta')
        expect(ribbon.get('[data-test-ribbon-band="1"]').text()).toBe('Nuevo')
      })

      it('actualiza las cintas cuando cambia el array', async () => {
        const ribbon = mountRibbon({ props: { ribbons: [{ label: 'Inicial' }] } })

        await ribbon.setProps({ ribbons: [{ label: 'Primera' }, { label: 'Segunda' }] })

        expect(ribbon.findAll('[data-test-ribbon-band]')).toHaveLength(2)
        expect(ribbon.get('[data-test-ribbon-band="0"]').text()).toBe('Primera')
        expect(ribbon.get('[data-test-ribbon-band="1"]').text()).toBe('Segunda')
      })
    })

    describe('label', () => {
      it.each([
        { label: 'Oferta especial', expected: 'Oferta especial' },
        { label: '', expected: '' },
      ])('renderiza label="$label"', ({ label, expected }) => {
        const band = mountRibbon({ props: { ribbons: [{ label }] } }).get(
          '[data-test-ribbon-band="0"]',
        )

        expect(band.text()).toBe(expected)
      })
    })

    describe('severity', () => {
      it.each(['primary', 'secondary', 'warning', 'success', 'error'] as const)(
        'aplica severity=%s',
        (severity) => {
          const band = mountRibbon({
            props: { ribbons: [{ label: 'Estado', severity }] },
          }).get('[data-test-ribbon-band="0"]')

          expect(band.classes()).toEqual(
            expect.arrayContaining([
              `[--ribbon-background:var(--${severity})]`,
              `[--ribbon-foreground:var(--${severity}-foreground)]`,
              'bg-(--ribbon-background)',
              'text-(--ribbon-foreground)',
            ]),
          )
        },
      )

      it('usa primary cuando severity es undefined', () => {
        const band = mountRibbon({ props: { ribbons: [{ label: 'Estado' }] } }).get(
          '[data-test-ribbon-band="0"]',
        )

        expect(band.classes()).toEqual(
          expect.arrayContaining([
            '[--ribbon-background:var(--primary)]',
            '[--ribbon-foreground:var(--primary-foreground)]',
          ]),
        )
      })
    })

    describe('color', () => {
      testColor({
        text: 'aplica color a la cinta',
        id: '[data-test-ribbon-band="0"]',
        varColor: '--ribbon-color',
        mount: (color) => mountRibbon({ props: { ribbons: [{ label: 'Personalizado', color }] } }),
      })

      it('da prioridad a color sobre severity', () => {
        const band = mountRibbon({
          props: {
            ribbons: [{ label: 'Personalizado', severity: 'error', color: '#ffffff' }],
          },
        }).get('[data-test-ribbon-band="0"]')

        expect(band.classes()).toEqual(
          expect.arrayContaining([
            '[--ribbon-background:var(--error)]',
            '[--ribbon-background:var(--ribbon-color)]',
          ]),
        )
        expect(band.attributes('style')).toContain('--ribbon-color: #ffffff')
      })
    })

    describe('position', () => {
      it.each([
        { position: 'top-right' as const, classes: ['top-5', 'right-[-3.5rem]'], rotation: 45 },
        { position: 'top-left' as const, classes: ['top-5', 'left-[-3.5rem]'], rotation: -45 },
        {
          position: 'bottom-right' as const,
          classes: ['bottom-5', 'right-[-3.5rem]'],
          rotation: -45,
        },
        {
          position: 'bottom-left' as const,
          classes: ['bottom-5', 'left-[-3.5rem]'],
          rotation: 45,
        },
      ])('aplica position=$position', ({ position, classes, rotation }) => {
        const band = mountRibbon({ props: { ribbons: [{ label: 'Cinta', position }] } }).get(
          '[data-test-ribbon-band="0"]',
        )

        expect(band.classes()).toEqual(expect.arrayContaining(classes))
        expect(band.attributes('style')).toContain(`rotate(${rotation}deg)`)
      })

      it('usa top-right cuando position es undefined', () => {
        const band = mountRibbon({ props: { ribbons: [{ label: 'Oferta' }] } }).get(
          '[data-test-ribbon-band="0"]',
        )

        expect(band.classes()).toEqual(expect.arrayContaining(['top-5', 'right-[-3.5rem]']))
        expect(band.attributes('style')).toContain('rotate(45deg)')
      })
    })

    describe('rotate', () => {
      it.each([0, 25, -30])('aplica rotate=%s', (rotate) => {
        const band = mountRibbon({ props: { ribbons: [{ label: 'Cinta', rotate }] } }).get(
          '[data-test-ribbon-band="0"]',
        )

        expect(band.attributes('style')).toContain(`rotate(${rotate}deg)`)
      })

      it('calcula la rotación desde position cuando rotate es undefined', () => {
        const band = mountRibbon({
          props: { ribbons: [{ label: 'Cinta', position: 'bottom-right' }] },
        }).get('[data-test-ribbon-band="0"]')

        expect(band.attributes('style')).toContain('rotate(-45deg)')
      })
    })

    describe('zIndex', () => {
      it.each([0, 50, -1])('aplica zIndex=%s', (zIndex) => {
        const band = mountRibbon({ props: { ribbons: [{ label: 'Cinta', zIndex }] } }).get(
          '[data-test-ribbon-band="0"]',
        )

        expect(band.attributes('style')).toContain(`z-index: ${zIndex}`)
      })

      it('asigna un z-index incremental cuando zIndex es undefined', () => {
        const ribbon = mountRibbon({
          props: { ribbons: [{ label: 'Primera' }, { label: 'Segunda' }] },
        })

        expect(ribbon.get('[data-test-ribbon-band="0"]').attributes('style')).toContain(
          'z-index: 20',
        )
        expect(ribbon.get('[data-test-ribbon-band="1"]').attributes('style')).toContain(
          'z-index: 21',
        )
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'reenvía atributos, clases y estilos a la raíz',
      id: '[data-test-ribbon-root]',
      mount: (attrs) => mountRibbon({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el contenido sobre las cintas', () => {
        const ribbon = mountRibbon({
          props: { ribbons: [{ label: 'Oferta' }] },
          slots: {
            default: () => h('p', { 'data-test-ribbon-content': '' }, 'Contenido'),
          },
        })

        const content = ribbon.get('[data-test-ribbon-content]')

        expect(content.text()).toBe('Contenido')
        expect(content.element.parentElement?.classList).toContain('z-10')
      })

      it('no renderiza contenido cuando el slot no se proporciona', () => {
        const ribbon = mountRibbon()

        expect(ribbon.get('[data-test-ribbon-root]').text()).toBe('')
      })
    })
  })

  describe('accessibility', () => {
    it('marca las cintas como decorativas', () => {
      const ribbon = mountRibbon({ props: { ribbons: [{ label: 'Decorativa' }] } })

      expect(ribbon.get('[data-test-ribbon-band="0"]').attributes('aria-hidden')).toBe('true')
    })
  })
})
