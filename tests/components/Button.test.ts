import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from '@/components/ui/Button/Button.vue'

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

  it('expone el estado de carga mediante atributos ARIA', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
    })
    const button = wrapper.get('button')

    expect(button.attributes('aria-busy')).toBe('true')
    expect(button.attributes('aria-disabled')).toBe('true')
  })

  it('renderiza el contenido del slot por defecto', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Contenido personalizado' },
    })

    expect(wrapper.text()).toContain('Contenido personalizado')
  })

  it('conserva atributos y clases del consumidor', () => {
    const wrapper = mount(Button, {
      attrs: {
        type: 'submit',
        class: 'mi-clase',
        'aria-label': 'Enviar formulario',
      },
    })
    const button = wrapper.get('button')

    expect(button.attributes('type')).toBe('submit')
    expect(button.attributes('aria-label')).toBe('Enviar formulario')
    expect(button.classes()).toContain('mi-clase')
  })
})
