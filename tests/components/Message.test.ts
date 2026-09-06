import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Message, type MessageProps } from '@/components/ui/Message'
import { testBubbleConfig } from '../utils/testBubbleConfig'

function mountMessage(options: MountingOptions<MessageProps> = {}) {
  return mount(Message, options)
}

describe('Message', () => {
  describe('props', () => {
    describe('bubble', () => {
      testBubbleConfig({
        text: 'pasa la configuracion a Bubble',
        mount: (bubble) => mountMessage({ props: { bubble } }),
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('reenvia el contenido a Bubble', () => {
        const wrapper = mountMessage({
          slots: { default: () => h('span', { 'data-test-message-default': true }, 'Mensaje') },
        })

        expect(wrapper.get('[data-test-message-default]').text()).toBe('Mensaje')
      })
    })

    describe('reaction', () => {
      it('reenvia el contenido al slot reactions de Bubble', () => {
        const wrapper = mountMessage({ slots: { reaction: '👍' } })

        expect(wrapper.get('[data-test-bubble-reactions]').text()).toBe('👍')
      })
    })

    describe('footer', () => {
      it('renderiza el contenido debajo de Bubble', () => {
        const wrapper = mountMessage({
          slots: { footer: () => h('span', { 'data-test-message-footer': true }, 'Footer') },
        })

        expect(wrapper.get('[data-test-message-footer]').text()).toBe('Footer')
        expect(wrapper.get('[data-test-message-footer]').element.parentElement).toBe(
          wrapper.element,
        )
      })
    })
  })
})
