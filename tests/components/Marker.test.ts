import { h } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Icon } from '@/components/ui/Icon'
import { Marker, type MarkerProps } from '@/components/ui/Marker'
import { testAttrs } from '../utils/testAttrs'
import { testIconProps } from '../utils/testIconProps'

function mountMarker(options: MountingOptions<MarkerProps> = {}) {
  return mount(Marker, options)
}

describe('Marker', () => {
  describe('props', () => {
    describe('icon', () => {
      testIconProps({
        text: 'pasa la configuración del icono',
        id: Icon,
        mount: (icon) => mountMarker({ props: { icon } }),
      })
    })

    describe('variant', () => {
      it.each([
        ['default', false],
        ['border', true],
        ['separator', true],
      ] as const)('renderiza variant=%s', (variant, hasVariantClass) => {
        const root = mountMarker({ props: { variant } }).get('[data-test-marker-root]')
        expect(
          root.classes().includes('border-b') || root.classes().includes('before:flex-1'),
        ).toBe(hasVariantClass)
      })
    })

    describe('as', () => {
      it.each(['div', 'section', 'article'] as const)('renderiza as=%s', (as) => {
        expect(
          mountMarker({ props: { as } })
            .get('[data-test-marker-root]')
            .element.tagName.toLowerCase(),
        ).toBe(as)
      })
    })

    describe('asChild', () => {
      it('usa div y false por defecto', () => {
        const root = mountMarker().get('[data-test-marker-root]')
        expect(root.element.tagName.toLowerCase()).toBe('div')
      })

      it('fusiona los atributos con el elemento hijo', () => {
        const wrapper = mountMarker({
          props: { asChild: true },
          slots: { default: () => h('a', { href: '/marker' }, 'Marker') },
        })
        expect(wrapper.get('[data-test-marker-root]').element.tagName.toLowerCase()).toBe('a')
        expect(wrapper.get('[data-test-marker-root]').attributes('href')).toBe('/marker')
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa attrs a la raíz',
      id: '[data-test-marker-root]',
      mount: (attrs) => mountMarker({ attrs }),
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el contenido del slot', () => {
        expect(mountMarker({ slots: { default: 'Contenido' } }).text()).toBe('Contenido')
      })
    })

    describe('icon', () => {
      it('permite personalizar el icono', () => {
        const wrapper = mountMarker({
          slots: { icon: () => h('span', { 'data-test-custom-icon': '' }) },
        })
        expect(wrapper.get('[data-test-custom-icon]').exists()).toBe(true)
        expect(wrapper.find('[data-test-marker-icon]').exists()).toBe(false)
      })
    })
  })
})
