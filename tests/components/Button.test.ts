import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renderiza el label', () => {
    const wrapper = mount(Button, {
      props: { label: 'Guardar' },
    })

    expect(wrapper.get('button').text()).toContain('Guardar')
  })

  it('emite click al pulsarlo', async () => {
    const wrapper = mount(Button)

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('bloquea el click mientras carga', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('bloquea el click cuando aria-disabled es true', async () => {
    const wrapper = mount(Button, {
      attrs: { 'aria-disabled': 'true' },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('permite el click cuando aria-disabled es false', async () => {
    const wrapper = mount(Button, {
      attrs: { 'aria-disabled': 'false' },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('expone el estado de carga mediante atributos ARIA', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
    })
    const button = wrapper.get('button')

    expect(button.attributes('aria-busy')).toBe('true')
    expect(button.attributes('aria-disabled')).toBe('true')
  })

  it('renderiza el indicador de carga en lugar del slot leading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { leading: '<span>Icono principal</span>' },
    })

    expect(wrapper.find('[data-slot="loading"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="loading"] .animate-spin').exists()).toBe(true)
    expect(wrapper.find('[data-slot="leading"]').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Icono principal')
  })

  it('permite reemplazar el indicador mediante el slot loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { loading: '<span>Procesando</span>' },
    })
    const loading = wrapper.get('[data-slot="loading"]')

    expect(loading.text()).toContain('Procesando')
    expect(loading.find('.animate-spin').exists()).toBe(false)
  })

  it('mantiene el slot trailing mientras carga', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { trailing: '<span>Siguiente</span>' },
    })

    expect(wrapper.get('[data-slot="trailing"]').text()).toContain('Siguiente')
  })

  it('renderiza el contenido del slot por defecto', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Contenido personalizado' },
    })

    expect(wrapper.text()).toContain('Contenido personalizado')
  })

  it('renderiza el slot leading dentro de su data-slot', () => {
    const wrapper = mount(Button, {
      slots: { leading: '<span>Anterior</span>' },
    })

    const leading = wrapper.get('[data-slot="leading"]')

    expect(leading.text()).toContain('Anterior')
  })

  it('renderiza el slot trailing dentro de su data-slot', () => {
    const wrapper = mount(Button, {
      slots: { trailing: '<span>Siguiente</span>' },
    })

    const trailing = wrapper.get('[data-slot="trailing"]')

    expect(trailing.text()).toContain('Siguiente')
  })

  it('renderiza icon dentro del data-slot leading', () => {
    const wrapper = mount(Button, {
      props: { icon: 'check' },
    })
    const icon = wrapper.get('[data-slot="leading"] svg')

    expect(icon.classes()).toContain('lucide-check')
  })

  it('renderiza trailingIcon dentro del data-slot trailing', () => {
    const wrapper = mount(Button, {
      props: { trailingIcon: 'chevronRight' },
    })
    const icon = wrapper.get('[data-slot="trailing"] svg')

    expect(icon.classes()).toContain('lucide-chevron-right')
  })

  it('no renderiza iconos cuando no se proporcionan', () => {
    const wrapper = mount(Button)

    expect(wrapper.find('[data-slot="leading"] svg').exists()).toBe(false)
    expect(wrapper.find('[data-slot="trailing"] svg').exists()).toBe(false)
  })

  it('aplica redondeado completo con la prop "rounded"', () => {
    const wrapper = mount(Button, {
      props: { rounded: true },
    })

    expect(wrapper.get('button').classes()).toContain('rounded-full')
  })

  it.each([
    ['xs', 'h-7'],
    ['sm', 'h-8'],
    ['md', 'h-9'],
    ['lg', 'h-10'],
  ] as const)('aplica las clases del tamaño "size" %s', (size, expectedClass) => {
    const wrapper = mount(Button, {
      props: { size },
    })

    expect(wrapper.get('button').classes()).toContain(expectedClass)
  })

  it.each([
    ['xs', 'size-7'],
    ['sm', 'size-8'],
    ['md', 'size-9'],
    ['lg', 'size-10'],
  ] as const)('aplica el tamaño cuadrado de la prop "square" %s', (size, expectedClass) => {
    const wrapper = mount(Button, {
      props: { square: true, size },
    })
    const classes = wrapper.get('button').classes()

    expect(classes).toEqual(expect.arrayContaining([expectedClass, 'p-0']))
  })

  it.each([
    [
      'solid',
      ['bg-primary', 'text-primary-foreground', 'hover:bg-primary/90', 'active:bg-primary/80'],
    ],
    [
      'outline',
      [
        'border',
        'bg-transparent',
        'text-primary',
        'hover:bg-primary/10',
        'active:border-primary/60',
        'active:bg-primary/20',
      ],
    ],
    ['plain', ['bg-transparent', 'text-primary', 'hover:bg-primary/10', 'active:bg-primary/20']],
    [
      'subtle',
      ['border', 'bg-primary/10', 'text-primary', 'hover:bg-primary/15', 'active:bg-primary/25'],
    ],
    ['soft', ['bg-primary/10', 'text-primary', 'hover:bg-primary/20', 'active:bg-primary/30']],
    ['link', ['bg-transparent', 'underline', 'text-primary', 'hover:no-underline']],
  ] as const)('aplica las clases de la variant %s', (variant, expectedClasses) => {
    const wrapper = mount(Button, {
      props: { variant },
    })

    expect(wrapper.get('button').classes()).toEqual(expect.arrayContaining([...expectedClasses]))
  })

  it.each([
    [
      'primary',
      [
        'bg-primary',
        'text-primary-foreground',
        'focus-visible:border-primary',
        'focus-visible:ring-primary/30',
      ],
    ],
    [
      'secondary',
      [
        'bg-secondary',
        'text-secondary-foreground',
        'focus-visible:border-secondary-foreground',
        'focus-visible:ring-secondary-foreground/20',
      ],
    ],
    [
      'warning',
      [
        'bg-warning',
        'text-warning-foreground',
        'focus-visible:border-warning',
        'focus-visible:ring-warning/30',
      ],
    ],
    [
      'success',
      [
        'bg-success',
        'text-success-foreground',
        'focus-visible:border-success',
        'focus-visible:ring-success/30',
      ],
    ],
    [
      'error',
      [
        'bg-error',
        'text-error-foreground',
        'focus-visible:border-error',
        'focus-visible:ring-error/30',
      ],
    ],
  ] as const)('aplica las clases de la severity %s', (severity, expectedClasses) => {
    const wrapper = mount(Button, {
      props: { severity, variant: 'solid' },
    })

    expect(wrapper.get('button').classes()).toEqual(expect.arrayContaining([...expectedClasses]))
  })

  it('aplica las variables y clases de un color personalizado', () => {
    const wrapper = mount(Button, {
      props: { color: '#ff0000' },
    })
    const button = wrapper.get('button')

    expect(button.attributes('style')).toContain('--button-color: #ff0000')
    expect(button.attributes('style')).toContain('--button-color-foreground: #09090b')
    expect(button.classes()).toEqual(
      expect.arrayContaining([
        'bg-(--button-color)',
        'text-(--button-color-foreground)',
        'hover:bg-(--button-color)/90',
        'active:bg-(--button-color)/80',
        'focus-visible:border-(--button-color)',
        'focus-visible:ring-(--button-color)/30',
      ]),
    )
  })

  it('elimina las clases hover y active cuando renderiza un elemento no interactivo', () => {
    const classes = mount(Button, {
      props: { as: 'div' },
    })
      .get('div')
      .classes()

    expect(classes.some((className) => className.startsWith('hover:'))).toBe(false)
    expect(classes.some((className) => className.startsWith('active:'))).toBe(false)
  })

  it('no aplica variables ni clases personalizadas sin la prop color', () => {
    const button = mount(Button).get('button')

    expect(button.attributes('style') ?? '').not.toContain('--button-color')
    expect(button.classes()).not.toContain('bg-(--button-color)')
  })
})
