import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Icon } from '@/components/ui/Icon'

describe('Icon', () => {
  it('renderiza el icono indicado con sus valores predeterminados', () => {
    const icon = mount(Icon, {
      props: { name: 'check' },
    }).get('svg')

    expect(icon.classes()).toEqual(expect.arrayContaining(['lucide-check', 'shrink-0', 'size-5']))
    expect(icon.attributes('aria-hidden')).toBe('true')
    expect(icon.attributes('style')).toContain('color: currentcolor')
  })

  it.each([
    ['sm', 'size-4'],
    ['md', 'size-5'],
    ['lg', 'size-6'],
  ] as const)('aplica las clases del tamaño %s', (size, expectedClass) => {
    const icon = mount(Icon, {
      props: { name: 'check', size },
    }).get('svg')

    expect(icon.classes()).toContain(expectedClass)
  })

  it('aplica el color recibido', () => {
    const icon = mount(Icon, {
      props: { name: 'check', color: '#ff0000' },
    }).get('svg')

    expect(icon.attributes('style')).toContain('color: rgb(255, 0, 0)')
  })

  it('conserva atributos, clases y estilos del consumidor', () => {
    const icon = mount(Icon, {
      props: { name: 'check' },
      attrs: {
        class: 'custom-icon',
        style: 'opacity: 0.5',
        'data-test': 'status-icon',
      },
    }).get('svg')

    expect(icon.classes()).toContain('custom-icon')
    expect(icon.attributes('style')).toContain('opacity: 0.5')
    expect(icon.attributes('data-test')).toBe('status-icon')
  })
})
