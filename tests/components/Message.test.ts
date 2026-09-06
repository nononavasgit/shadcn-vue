import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Message, type MessageProps } from '@/components/ui/Message'
import { testAttrs } from '../utils/testAttrs'
import { testAvatarConfig } from '../utils/testAvatarConfig'
import { testBubbleConfig } from '../utils/testBubbleConfig'

function mountMessage(options: MountingOptions<MessageProps> = {}) {
  return mount(Message, options)
}

describe('Message', () => {
  describe('props', () => {
    describe('align', () => {
      it.each([
        ['start', 'items-start'],
        ['end', 'items-end'],
      ] as const)('alinea el mensaje a %s', (align, expected) => {
        expect(mountMessage({ props: { align } }).classes()).toContain(expected)
      })
    })

    describe('bubble', () => {
      testBubbleConfig({
        text: 'pasa la configuracion a Bubble',
        mount: (bubble) => mountMessage({ props: { align: bubble.align, bubble } }),
      })

      it('usa la misma alineacion en Message y Bubble', () => {
        const wrapper = mountMessage({
          props: { align: 'end', bubble: { align: 'start' } },
        })

        expect(wrapper.getComponent('Bubble').props('align')).toBe('end')
      })
    })

    describe('avatar', () => {
      testAvatarConfig({
        text: 'pasa la configuracion a Avatar',
        mount: (avatar) => mountMessage({ props: { avatar } }),
      })
    })

    describe('message', () => {
      it('renderiza el contenido cuando no existe el slot default', () => {
        expect(mountMessage({ props: { message: 'Mensaje por defecto' } }).text()).toContain(
          'Mensaje por defecto',
        )
      })
    })
  })

  describe('slots', () => {
    describe('avatar', () => {
      it('permite personalizar el avatar', () => {
        const wrapper = mountMessage({
          slots: { avatar: () => h('span', { 'data-test-message-avatar': true }, 'Avatar') },
        })

        expect(wrapper.get('[data-test-message-avatar]').text()).toBe('Avatar')
      })
    })
    describe('header', () => {
      it('renderiza el contenido encima de Bubble', () => {
        const wrapper = mountMessage({
          slots: { header: () => h('span', { 'data-test-message-header': true }, 'Header') },
        })

        expect(wrapper.get('[data-test-message-header]').text()).toBe('Header')
        expect(wrapper.getComponent('Bubble').exists()).toBe(true)
      })
    })

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

  describe('props.ui', () => {
    describe('header', () => {
      testAttrs({
        text: 'aplica ui.header al contenedor del slot',
        id: '#test-component',
        mount: (attrs) =>
          mountMessage({
            props: { ui: { header: () => attrs } },
            slots: { header: () => h('span', 'Header') },
          }),
      })
    })

    describe('footer', () => {
      testAttrs({
        text: 'aplica ui.footer al contenedor del slot',
        id: '#test-component',
        mount: (attrs) =>
          mountMessage({
            props: { ui: { footer: () => attrs } },
            slots: { footer: () => h('span', 'Footer') },
          }),
      })
    })
  })
})
