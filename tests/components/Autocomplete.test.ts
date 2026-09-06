import { mount, type MountingOptions } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'

import { Autocomplete, type AutocompleteProps } from '@/components/ui/Autocomplete'
import { AutocompleteRoot } from 'reka-ui'
import { testAttrs } from '../utils/testAttrs'
import { testIconProps } from '../utils/testIconProps'

function mountAutocomplete(options: MountingOptions<AutocompleteProps> = {}) {
  return mount(Autocomplete, options)
}

async function mountOpen(options: MountingOptions<AutocompleteProps> = {}) {
  const wrapper = mountAutocomplete(options)
  await wrapper.get('[data-test-autocomplete-trigger]').trigger('click')
  return wrapper
}

async function mountOpenWithNoResults(options: MountingOptions<AutocompleteProps> = {}) {
  const wrapper = await mountOpen(options)
  await wrapper.get('[data-test-autocomplete-input]').setValue('no results')
  return wrapper
}

describe('Autocomplete', () => {
  const caseValues: AutocompleteProps['value'][] = [undefined, 'Apple']
  const autoFocusCases = [false, true] as const
  const disabledCases = [false, true] as const
  const placeholderCases = [
    '',
    'Buscar',
    'Una búsqueda bastante larga para probar el límite',
  ] as const

  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = () => undefined
  })

  describe('props', () => {
    describe('props.icon', () => {
      testIconProps({
        text: 'pasa las props de icon',
        id: '[data-test-autocomplete-icon]',
        mount: (icon) => mountAutocomplete({ props: { icon } }),
      })

      it('no renderiza icono cuando no se proporciona', () => {
        expect(mountAutocomplete().find('[data-test-autocomplete-icon]').exists()).toBe(false)
      })
    })

    describe('props.autoFocus', () => {
      it.each(autoFocusCases)('pasa autoFocus=%s a AutocompleteInput', (autoFocus) => {
        const wrapper = mountAutocomplete({ props: { autoFocus } })
        expect(wrapper.get('[data-test-autocomplete-input]').attributes('autofocus')).toBe(
          autoFocus ? '' : undefined,
        )
      })
    })

    describe('props.disabled', () => {
      it.each(disabledCases)('pasa disabled=%s a AutocompleteInput', (disabled) => {
        const wrapper = mountAutocomplete({ props: { disabled } })
        expect(wrapper.get('[data-test-autocomplete-input]').attributes('disabled')).toBe(
          disabled ? '' : undefined,
        )
      })
    })

    describe('props.placeholder', () => {
      it.each(placeholderCases)('pasa placeholder=%s a AutocompleteInput', (placeholder) => {
        const wrapper = mountAutocomplete({ props: { placeholder } })
        expect(wrapper.get('[data-test-autocomplete-input]').attributes('placeholder')).toBe(
          placeholder,
        )
      })
    })

    describe('value', () => {
      it.each(caseValues)('pasa el valor %s a AutocompleteRoot', (caseValue) => {
        const wrapper = mountAutocomplete({ props: { value: caseValue } })
        expect(wrapper.findComponent(AutocompleteRoot).props('modelValue')).toBe(caseValue)
      })
    })

    describe('ui', () => {
      testAttrs({
        text: 'aplica ui.root',
        id: '[data-test-autocomplete-root]',
        mount: (attrs) => mountAutocomplete({ props: { ui: { root: () => attrs } } }),
      })
      testAttrs({
        text: 'aplica ui.anchor',
        id: '[data-test-autocomplete-anchor]',
        mount: (attrs) => mountAutocomplete({ props: { ui: { anchor: () => attrs } } }),
      })
      testAttrs({
        text: 'aplica ui.input',
        id: '[data-test-autocomplete-input]',
        mount: (attrs) => mountAutocomplete({ props: { ui: { input: () => attrs } } }),
      })
      testAttrs({
        text: 'aplica ui.trigger',
        id: '[data-test-autocomplete-trigger]',
        mount: (attrs) => mountAutocomplete({ props: { ui: { trigger: () => attrs } } }),
      })
      testAttrs({
        text: 'aplica ui.content',
        id: '[data-test-autocomplete-content]',
        assertId: false,
        mount: (attrs) => mountOpen({ props: { ui: { content: () => attrs } } }),
      })
      testAttrs({
        text: 'aplica ui.viewport',
        id: '[data-test-autocomplete-viewport]',
        mount: (attrs) => mountOpen({ props: { ui: { viewport: () => attrs } } }),
      })
      testAttrs({
        text: 'aplica ui.empty',
        id: '[data-test-autocomplete-empty]',
        mount: (attrs) => mountOpenWithNoResults({ props: { ui: { empty: () => attrs } } }),
      })
      testAttrs({
        text: 'aplica ui.separator',
        id: '[data-test-autocomplete-separator]',
        mount: (attrs) => mountOpen({ props: { ui: { separator: () => attrs } } }),
      })
      testAttrs({
        text: 'aplica ui.item',
        id: '[data-test-autocomplete-item]',
        mount: (attrs) => mountOpen({ props: { ui: { item: () => attrs } } }),
      })
      testAttrs({
        text: 'aplica ui.group',
        id: '[data-test-autocomplete-group]',
        mount: (attrs) => mountOpen({ props: { ui: { group: () => attrs } } }),
      })
      testAttrs({
        text: 'aplica ui.label',
        id: '[data-test-autocomplete-label]',
        mount: (attrs) => mountOpen({ props: { ui: { label: () => attrs } } }),
      })

      it('no requiere ui', () => {
        expect(() => mountAutocomplete()).not.toThrow()
      })
    })
  })

  describe('slots', () => {
    it('permite reemplazar el icono mediante el slot icon', () => {
      const wrapper = mountAutocomplete({
        props: { icon: { name: 'search' } },
        slots: { icon: '<span data-test-custom-icon>Custom icon</span>' },
      })

      expect(wrapper.get('[data-test-custom-icon]').text()).toBe('Custom icon')
      expect(wrapper.find('[data-test-autocomplete-icon]').exists()).toBe(false)
    })
  })
})
