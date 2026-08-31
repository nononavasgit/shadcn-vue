import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { TagsInputRoot } from 'reka-ui'

import { TagInput, type TagInputProps } from '@/components/ui/TagInput'
import { i18n } from '@/i18n'
import { testAttrs } from '../utils/testAttrs'

function mountTagInput(options: MountingOptions<TagInputProps> = {}) {
  const global = options.global ?? {}

  return mount(TagInput, {
    ...options,
    global: {
      ...global,
      plugins: [i18n, ...(global.plugins ?? [])],
    },
  })
}

const casesValue: Array<{ input: string[] | null | undefined; expected: number }> = [
  { input: ['Vue', 'Reka'], expected: 2 },
  { input: [], expected: 0 },
  { input: undefined, expected: 0 },
  { input: null, expected: 0 },
] as const

const casesBoolean = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] as const

const casesMax = [
  { input: undefined, expected: 0 },
  { input: 0, expected: 0 },
  { input: 2, expected: 2 },
] as const

const casesDelimiter = [
  { input: undefined, expected: ',' },
  { input: ';', expected: ';' },
  { input: /[,;]/, expected: /[,;]/ },
] as const

const casesPlaceholder = [
  { input: undefined, expected: undefined },
  { input: 'Añadir etiqueta', expected: 'Añadir etiqueta' },
] as const

const casesMaxLength = [
  { input: undefined, expected: undefined },
  { input: 12, expected: '12' },
] as const

const casesClearable = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
] as const

const casesRequired = [
  { input: undefined, expected: undefined },
  { input: false, expected: false },
  { input: true, expected: true },
] as const

const casesTagContext = [
  { value: 'Vue', index: 0 },
  { value: 'TypeScript', index: 0 },
] as const

describe('TagInput', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)('renderiza $input con $expected etiquetas', ({ input, expected }) => {
        const wrapper = mountTagInput({ props: { value: input } })

        expect(wrapper.findAll('[data-test-tag-input-item-text]')).toHaveLength(expected)
      })

      it('actualiza el modelo público al añadir una etiqueta', async () => {
        const wrapper = mountTagInput({ props: { value: ['Vue'] } })

        await wrapper.get('[data-test-tag-input-input]').setValue('Reka')
        await wrapper.get('[data-test-tag-input-input]').trigger('keydown', { key: 'Enter' })

        expect(wrapper.emitted('update:value')).toEqual([[['Vue', 'Reka']]])
      })
    })

    describe('addOnPaste', () => {
      it.each(casesBoolean)('pasa $input a la raíz de Reka UI', ({ input, expected }) => {
        const root = mountTagInput({ props: { addOnPaste: input } }).findComponent(TagsInputRoot)

        expect(root.props('addOnPaste')).toBe(expected)
      })
    })

    describe('addOnTab', () => {
      it.each(casesBoolean)('pasa $input a la raíz de Reka UI', ({ input, expected }) => {
        const root = mountTagInput({ props: { addOnTab: input } }).findComponent(TagsInputRoot)

        expect(root.props('addOnTab')).toBe(expected)
      })
    })

    describe('addOnBlur', () => {
      it.each(casesBoolean)('pasa $input a la raíz de Reka UI', ({ input, expected }) => {
        const root = mountTagInput({ props: { addOnBlur: input } }).findComponent(TagsInputRoot)

        expect(root.props('addOnBlur')).toBe(expected)
      })
    })

    describe('duplicate', () => {
      it.each(casesBoolean)('pasa $input a la raíz de Reka UI', ({ input, expected }) => {
        const root = mountTagInput({ props: { duplicate: input } }).findComponent(TagsInputRoot)

        expect(root.props('duplicate')).toBe(expected)
      })
    })

    describe('disabled', () => {
      it.each(casesBoolean)('pasa $input a la raíz de Reka UI', ({ input, expected }) => {
        const root = mountTagInput({ props: { disabled: input } }).findComponent(TagsInputRoot)

        expect(root.props('disabled')).toBe(expected)
      })
    })

    describe('max', () => {
      it.each(casesMax)('pasa $input o su valor por defecto a Reka UI', ({ input, expected }) => {
        const root = mountTagInput({ props: { max: input } }).findComponent(TagsInputRoot)

        expect(root.props('max')).toBe(expected)
      })
    })

    describe('delimiter', () => {
      it.each(casesDelimiter)('pasa $input a la raíz de Reka UI', ({ input, expected }) => {
        const root = mountTagInput({ props: { delimiter: input } }).findComponent(TagsInputRoot)

        expect(root.props('delimiter')).toEqual(expected)
      })
    })

    describe('name', () => {
      it('pasa name a la raíz para el control de formulario', () => {
        const root = mountTagInput({ props: { name: 'tags' } }).findComponent(TagsInputRoot)

        expect(root.props('name')).toBe('tags')
      })
    })

    describe('required', () => {
      it.each(casesRequired)('pasa $input a la raíz de Reka UI', ({ input, expected }) => {
        const root = mountTagInput({ props: { required: input } }).findComponent(TagsInputRoot)

        expect(root.props('required')).toBe(expected)
      })
    })

    describe('placeholder', () => {
      it.each(casesPlaceholder)('renderiza $input en el input', ({ input, expected }) => {
        const field = mountTagInput({ props: { placeholder: input } }).get(
          '[data-test-tag-input-input]',
        )

        expect(field.attributes('placeholder')).toBe(expected)
      })
    })

    describe('maxLength', () => {
      it.each(casesMaxLength)('renderiza $input en el input', ({ input, expected }) => {
        const field = mountTagInput({ props: { maxLength: input } }).get(
          '[data-test-tag-input-input]',
        )

        expect(field.attributes('maxlength')).toBe(expected)
      })
    })

    describe('autoFocus', () => {
      it('permite activar el autofocus del input', () => {
        const field = mountTagInput({ props: { autoFocus: true } }).get(
          '[data-test-tag-input-input]',
        )

        expect(field.exists()).toBe(true)
      })
    })

    describe('clearable', () => {
      it.each(casesClearable)(
        'controla la visibilidad con clearable=$input',
        ({ input, expected }) => {
          expect(
            mountTagInput({ props: { clearable: input } })
              .find('[data-test-tag-input-clear]')
              .exists(),
          ).toBe(expected)
        },
      )
    })

    describe('displayValue', () => {
      it('transforma el valor antes de renderizarlo', () => {
        const wrapper = mountTagInput({
          props: { value: ['vue'], displayValue: (value) => value.toUpperCase() },
        })

        expect(wrapper.get('[data-test-tag-input-item-text]').text()).toBe('VUE')
      })
    })

    describe('convertValue', () => {
      it('convierte el texto de entrada antes de emitirlo', async () => {
        const wrapper = mountTagInput({
          props: { convertValue: (input) => Number(input) },
        })
        const field = wrapper.get('[data-test-tag-input-input]')

        await field.setValue('42')
        await field.trigger('keydown', { key: 'Enter' })

        expect(wrapper.emitted('addTag')).toEqual([[42]])
      })
    })

    describe('ui', () => {
      describe('root', () => {
        testAttrs({
          text: 'renderiza los atributos de props.ui.root',
          id: '[data-test-tag-input-root]',
          assertId: false,
          mount: (attrs) =>
            mountTagInput({
              props: { id: attrs.id, ui: { root: () => attrs } },
            }),
        })
      })

      describe('tagItem', () => {
        testAttrs({
          text: 'renderiza los atributos de props.ui.tagItem',
          id: '[data-test-tag-input-item]',
          mount: (attrs) =>
            mountTagInput({
              props: { value: ['Vue'], ui: { tagItem: () => attrs } },
            }),
        })
      })

      describe('tagItemText', () => {
        testAttrs({
          text: 'renderiza los atributos de props.ui.tagItemText',
          id: '[data-test-tag-input-item-text]',
          mount: (attrs) =>
            mountTagInput({
              props: { value: ['Vue'], ui: { tagItemText: () => attrs } },
            }),
        })
      })

      describe('tagItemDelete', () => {
        testAttrs({
          text: 'renderiza los atributos de props.ui.tagItemDelete',
          id: '[data-test-tag-input-item-delete]',
          mount: (attrs) =>
            mountTagInput({
              props: { value: ['Vue'], ui: { tagItemDelete: () => attrs } },
            }),
        })
      })

      describe('tagInput', () => {
        testAttrs({
          text: 'renderiza los atributos de props.ui.tagInput',
          id: '[data-test-tag-input-input]',
          mount: (attrs) =>
            mountTagInput({
              props: { ui: { tagInput: () => attrs } },
            }),
        })
      })

      describe('tagClear', () => {
        testAttrs({
          text: 'renderiza los atributos de props.ui.tagClear',
          id: '[data-test-tag-input-clear]',
          mount: (attrs) =>
            mountTagInput({
              props: { clearable: true, ui: { tagClear: () => attrs } },
            }),
        })
      })
    })

    describe('focus', () => {
      it('usa el color primary en el foco del contenedor', () => {
        const root = mountTagInput().get('[data-test-tag-input-root]')

        expect(root.classes()).toEqual(
          expect.arrayContaining(['focus-within:border-primary', 'focus-within:ring-primary/50']),
        )
      })
    })

    describe('translations', () => {
      it('traduce las etiquetas accesibles de borrar y limpiar', () => {
        const wrapper = mountTagInput({ props: { value: ['Vue'], clearable: true } })

        expect(wrapper.get('[data-test-tag-input-item-delete]').attributes('aria-label')).toBe(
          i18n.global.t('tagInputRemove'),
        )
        expect(wrapper.get('[data-test-tag-input-clear]').attributes('aria-label')).toBe(
          i18n.global.t('tagInputClear'),
        )
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa los atributos arbitrarios, la clase y el estilo a la raíz',
      id: '[data-test-tag-input-root]',
      assertId: false,
      mount: (attrs) => mountTagInput({ attrs }),
    })

    it('pasa id al input para mantener la asociación del campo', () => {
      const wrapper = mountTagInput({ props: { id: 'tag-input-control' } })

      expect(wrapper.get('[data-test-tag-input-input]').attributes('id')).toBe('tag-input-control')
    })
  })

  describe('emits', () => {
    it('emite addTag al confirmar una etiqueta', async () => {
      const wrapper = mountTagInput()
      const input = wrapper.get('[data-test-tag-input-input]')

      await input.setValue('Vue')
      await input.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted('addTag')).toEqual([['Vue']])
    })

    it('emite removeTag al pulsar el botón de borrado', async () => {
      const wrapper = mountTagInput({ props: { value: ['Vue'] } })

      await wrapper.get('[data-test-tag-input-item-delete]').trigger('click')

      expect(wrapper.emitted('removeTag')).toEqual([['Vue']])
    })

    it('emite invalid cuando se intenta añadir un duplicado', async () => {
      const wrapper = mountTagInput({ props: { value: ['Vue'] } })
      const input = wrapper.get('[data-test-tag-input-input]')

      await input.setValue('Vue')
      await input.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted('invalid')).toEqual([['Vue']])
    })

    it('emite invalid cuando se supera max', async () => {
      const wrapper = mountTagInput({ props: { value: ['Vue'], max: 1 } })
      const input = wrapper.get('[data-test-tag-input-input]')

      await input.setValue('Reka')
      await input.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted('invalid')).toEqual([['Reka']])
    })

    it('no permite añadir ni borrar tags cuando está disabled', async () => {
      const wrapper = mountTagInput({ props: { value: ['Vue'], disabled: true } })
      const input = wrapper.get('[data-test-tag-input-input]')

      expect(input.attributes('disabled')).toBe('')
      await wrapper.get('[data-test-tag-input-item-delete]').trigger('click')
      expect(wrapper.emitted('removeTag')).toBeUndefined()
    })
  })

  describe('slots', () => {
    it('expone el slot tag con el valor y el índice', () => {
      const wrapper = mountTagInput({
        props: { value: ['Vue'] },
        slots: {
          tag: ({ value, index }) => h('span', { 'data-test-custom-tag': '' }, `${index}:${value}`),
        },
      })

      expect(wrapper.get('[data-test-custom-tag]').text()).toBe('0:Vue')
    })

    it('permite sustituir el icono del slot clear', () => {
      const wrapper = mountTagInput({
        props: { clearable: true },
        slots: { clear: () => h('span', { 'data-test-custom-clear': '' }, 'Vaciar') },
      })

      expect(wrapper.get('[data-test-custom-clear]').text()).toBe('Vaciar')
    })

    it('renderiza los iconos de borrado y limpieza por defecto', () => {
      const wrapper = mountTagInput({ props: { value: ['Vue'], clearable: true } })

      expect(wrapper.findAll('[data-test-icon-root]')).toHaveLength(2)
    })
  })

  describe('context contract', () => {
    describe('TagInputTagContext', () => {
      it.each(casesTagContext)(
        'entrega value=$value e index=$index a cada resolver de tag',
        ({ value, index }) => {
          let itemContext: unknown
          let itemTextContext: unknown
          let itemDeleteContext: unknown

          mountTagInput({
            props: {
              value: [value],
              ui: {
                tagItem: (context) => {
                  if (context.index === index) itemContext = { ...context }
                  return {}
                },
                tagItemText: (context) => {
                  if (context.index === index) itemTextContext = { ...context }
                  return {}
                },
                tagItemDelete: (context) => {
                  if (context.index === index) itemDeleteContext = { ...context }
                  return {}
                },
              },
            },
          })

          const expected = { value, index }

          expect(itemContext).toEqual(expected)
          expect(itemTextContext).toEqual(expected)
          expect(itemDeleteContext).toEqual(expected)
        },
      )
    })
  })
})
