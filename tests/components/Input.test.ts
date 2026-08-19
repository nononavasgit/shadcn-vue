import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Input, type InputProps } from '@/components/ui/Input'
import { testAttrs } from '../utils/testAttrs'

function mountInput(options: MountingOptions<InputProps> = {}) {
  return mount(Input, options)
}

describe('Input', () => {
  describe('props', () => {
    describe('value', () => {
      it.each([
        { input: 'Search term', expected: 'Search term' },
        { input: '', expected: '' },
        { input: undefined, expected: '' },
      ])('renders value=$input as "$expected"', ({ input, expected }) => {
        const root = mountInput({ props: { value: input } }).get('[data-test-input-root]')

        expect(root.element.value).toBe(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-input-root]',
      mount: (attrs) => mountInput({ attrs }),
    })

    it('forwards class and style to the input group root', () => {
      const root = mountInput({
        attrs: {
          id: 'input-control',
          class: 'custom-input-group',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-input-group-root]')

      expect(root.classes()).toContain('custom-input-group')
      expect(root.attributes('style')).toContain('opacity: 0.5')
      expect(root.attributes('id')).toBeUndefined()
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it('emits the updated value when the user edits the input', async () => {
        const wrapper = mountInput({ props: { value: '' } })

        await wrapper.get('[data-test-input-root]').setValue('Updated value')

        expect(wrapper.emitted('update:value')).toEqual([['Updated value']])
      })
    })
  })

  describe('slots', () => {
    describe('leading', () => {
      it('renders the leading slot inside the default addon', () => {
        const wrapper = mountInput({
          slots: {
            leading: () => h('span', { 'data-test-input-leading': '' }, 'Leading'),
          },
        })

        expect(wrapper.get('[data-test-input-leading]').text()).toBe('Leading')
        expect(wrapper.findAll('[data-test-input-group-addon]')).toHaveLength(1)
      })
    })

    describe('trailing', () => {
      it('renders the trailing slot inside the inline-end addon', () => {
        const wrapper = mountInput({
          slots: {
            trailing: () => h('span', { 'data-test-input-trailing': '' }, 'Trailing'),
          },
        })

        expect(wrapper.get('[data-test-input-trailing]').text()).toBe('Trailing')
        expect(wrapper.findAll('[data-test-input-group-addon]')).toHaveLength(1)
      })
    })

    it('does not render addons when the slots are absent', () => {
      expect(mountInput().find('[data-test-input-group-addon]').exists()).toBe(false)
    })
  })
})
