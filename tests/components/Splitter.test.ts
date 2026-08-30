import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'

import {
  Splitter,
  type SplitterItem,
  type SplitterItemContext,
  type SplitterProps,
} from '@/components/ui/Splitter'
import { testAttrs } from '../utils/testAttrs'

function mountSplitter(options: MountingOptions<SplitterProps> = {}) {
  return mount(Splitter, options)
}

function makeItem(overrides: Partial<SplitterItem> = {}): SplitterItem {
  return {
    id: 'left',
    slot: 'left',
    class: undefined,
    style: undefined,
    ...overrides,
  }
}

describe('Splitter', () => {
  describe('props', () => {
    describe('direction', () => {
      it.each([
        { input: 'horizontal' as const, expected: 'horizontal' },
        { input: 'vertical' as const, expected: 'vertical' },
        { input: undefined, expected: 'horizontal' },
      ])('pasa direction=$input al SplitterGroup de Reka como $expected', ({ input, expected }) => {
        const wrapper = mountSplitter({ props: { direction: input } })

        expect(wrapper.getComponent(SplitterGroup).props('direction')).toBe(expected)
      })
    })

    describe('id', () => {
      it.each([
        { input: 'splitter-group', expected: 'splitter-group' },
        { input: undefined, expected: undefined },
      ])('pasa id=$input a SplitterGroup', ({ input, expected }) => {
        const group = mountSplitter({ props: { id: input } }).getComponent(SplitterGroup)

        expect(group.props('id')).toBe(expected)
      })
    })

    describe('autoSaveId', () => {
      it.each([
        { input: 'splitter-layout', expected: 'splitter-layout' },
        { input: null, expected: null },
        { input: undefined, expected: null },
      ])('pasa autoSaveId=$input a SplitterGroup', ({ input, expected }) => {
        const group = mountSplitter({ props: { autoSaveId: input } }).getComponent(SplitterGroup)

        expect(group.props('autoSaveId')).toBe(expected)
      })
    })

    describe('keyboardResizeBy', () => {
      it.each([
        { input: 7, expected: 7 },
        { input: null, expected: null },
        { input: undefined, expected: 10 },
      ])('pasa keyboardResizeBy=$input a SplitterGroup', ({ input, expected }) => {
        const group = mountSplitter({ props: { keyboardResizeBy: input } }).getComponent(
          SplitterGroup,
        )

        expect(group.props('keyboardResizeBy')).toBe(expected)
      })
    })

    describe('storage', () => {
      it('pasa la API de almacenamiento personalizada a SplitterGroup', () => {
        const storage = {
          getItem: vi.fn(() => null),
          setItem: vi.fn(),
        }
        const group = mountSplitter({ props: { storage } }).getComponent(SplitterGroup)

        expect(group.props('storage')).toEqual(storage)
      })
    })

    describe('items', () => {
      it('no renderiza paneles cuando items es undefined', () => {
        const wrapper = mountSplitter()

        expect(wrapper.findAllComponents(SplitterPanel)).toHaveLength(0)
        expect(wrapper.findAllComponents(SplitterResizeHandle)).toHaveLength(0)
      })

      it('renderiza un panel por elemento y un manejador por cada par adyacente', () => {
        const wrapper = mountSplitter({
          props: {
            items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
          },
        })

        expect(wrapper.findAllComponents(SplitterPanel)).toHaveLength(2)
        expect(wrapper.findAllComponents(SplitterResizeHandle)).toHaveLength(1)
      })

      describe('slot', () => {
        it('usa el slot del elemento para resolver el nombre del slot del panel', () => {
          const wrapper = mountSplitter({
            props: { items: [makeItem({ slot: 'files' })] },
            slots: {
              'panel-files': () => h('span', { 'data-test-item-slot': '' }, 'Files'),
            },
          })

          expect(wrapper.get('[data-test-item-slot]').text()).toBe('Files')
        })
      })

      describe('id', () => {
        it('pasa el id del elemento a SplitterPanel', () => {
          const panel = mountSplitter({
            props: { items: [makeItem({ id: 'panel-id' })] },
          }).getComponent(SplitterPanel)

          expect(panel.props('id')).toBe('panel-id')
        })
      })

      describe('collapsedSize', () => {
        it('pasa collapsedSize a SplitterPanel', () => {
          const panel = mountSplitter({
            props: { items: [makeItem({ collapsedSize: 5 })] },
          }).getComponent(SplitterPanel)

          expect(panel.props('collapsedSize')).toBe(5)
        })
      })

      describe('collapsible', () => {
        it.each([true, false, undefined])('pasa collapsible=%s a SplitterPanel', (value) => {
          const panel = mountSplitter({
            props: { items: [makeItem({ collapsible: value })] },
          }).getComponent(SplitterPanel)

          expect(panel.props('collapsible')).toBe(value)
        })
      })

      describe('defaultSize', () => {
        it('pasa defaultSize a SplitterPanel', () => {
          const panel = mountSplitter({
            props: { items: [makeItem({ defaultSize: 35 })] },
          }).getComponent(SplitterPanel)

          expect(panel.props('defaultSize')).toBe(35)
        })
      })

      describe('maxSize', () => {
        it('pasa maxSize a SplitterPanel', () => {
          const panel = mountSplitter({
            props: { items: [makeItem({ maxSize: 70 })] },
          }).getComponent(SplitterPanel)

          expect(panel.props('maxSize')).toBe(70)
        })
      })

      describe('minSize', () => {
        it('pasa minSize a SplitterPanel', () => {
          const panel = mountSplitter({
            props: { items: [makeItem({ minSize: 20 })] },
          }).getComponent(SplitterPanel)

          expect(panel.props('minSize')).toBe(20)
        })
      })

      describe('order', () => {
        it('pasa order a SplitterPanel', () => {
          const panel = mountSplitter({
            props: { items: [makeItem({ order: 2 })] },
          }).getComponent(SplitterPanel)

          expect(panel.props('order')).toBe(2)
        })
      })

      describe('sizeUnit', () => {
        it.each(['%', 'px'] as const)('pasa sizeUnit=%s a SplitterPanel', (value) => {
          const panel = mountSplitter({
            props: { items: [makeItem({ sizeUnit: value })] },
          }).getComponent(SplitterPanel)

          expect(panel.props('sizeUnit')).toBe(value)
        })
      })

      describe('class', () => {
        it('pasa la class del elemento a SplitterPanel', () => {
          const panel = mountSplitter({
            props: { items: [makeItem({ class: 'panel-custom' })] },
          }).getComponent(SplitterPanel)

          expect(panel.classes()).toContain('panel-custom')
        })
      })

      describe('style', () => {
        it('pasa el style del elemento a SplitterPanel', () => {
          const panel = mountSplitter({
            props: { items: [makeItem({ style: 'background: red' })] },
          }).getComponent(SplitterPanel)

          expect(panel.attributes('style')).toContain('background: red')
        })
      })
    })

    describe('hitAreaMargins', () => {
      it('pasa hitAreaMargins a cada SplitterResizeHandle', () => {
        const hitAreaMargins = { mouse: 12, touch: 24 }
        const wrapper = mountSplitter({
          props: {
            hitAreaMargins,
            items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
          },
        })

        expect(wrapper.getComponent(SplitterResizeHandle).props('hitAreaMargins')).toEqual(
          hitAreaMargins,
        )
      })
    })

    describe('tabindex', () => {
      it('pasa tabindex a cada SplitterResizeHandle', () => {
        const wrapper = mountSplitter({
          props: {
            tabindex: 0,
            items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
          },
        })

        expect(wrapper.getComponent(SplitterResizeHandle).props('tabindex')).toBe(0)
      })
    })

    describe('disabled', () => {
      it.each([true, false, undefined])('pasa disabled=%s a cada manejador', (value) => {
        const wrapper = mountSplitter({
          props: {
            disabled: value,
            items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
          },
        })

        expect(wrapper.getComponent(SplitterResizeHandle).props('disabled')).toBe(value)
      })
    })

    describe('nonce', () => {
      it('pasa nonce a cada SplitterResizeHandle', () => {
        const wrapper = mountSplitter({
          props: {
            nonce: 'splitter-nonce',
            items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
          },
        })

        expect(wrapper.getComponent(SplitterResizeHandle).props('nonce')).toBe('splitter-nonce')
      })
    })

    describe('ui', () => {
      describe('panel', () => {
        testAttrs({
          id: '[data-test-splitter-panel]',
          mount: (attrs) =>
            mountSplitter({
              props: {
                items: [makeItem()],
                ui: {
                  panel: () => attrs,
                },
              },
            }),
        })
      })

      describe('resizeHandle', () => {
        testAttrs({
          id: '[data-test-splitter-resize-handle]',
          mount: (attrs) =>
            mountSplitter({
              props: {
                items: [makeItem(), makeItem({ id: 'right', slot: 'right' })],
                ui: {
                  resizeHandle: () => attrs,
                },
              },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      id: '[data-test-splitter-root]',
      assertId: false,
      mount: (attrs) => mountSplitter({ attrs }),
    })
  })

  describe('emits', () => {
    describe('layout', () => {
      it('reenvia el layout emitido por SplitterGroup', async () => {
        const wrapper = mountSplitter()
        const layout = [35, 65]

        wrapper.getComponent(SplitterGroup).vm.$emit('layout', layout)
        await nextTick()

        expect(wrapper.emitted('layout')).toEqual([[layout]])
      })
    })

    describe('collapse and expand', () => {
      it.each(['collapse', 'expand'] as const)(
        'reenvia el evento %s de SplitterPanel',
        async (event) => {
          const wrapper = mountSplitter({ props: { items: [makeItem()] } })
          wrapper.getComponent(SplitterPanel).vm.$emit(event)
          await nextTick()

          expect(wrapper.emitted(event)).toEqual([[]])
        },
      )
    })

    describe('resize', () => {
      it('reenvia el tamaño y el tamaño anterior de SplitterPanel', async () => {
        const wrapper = mountSplitter({ props: { items: [makeItem()] } })
        await nextTick()
        wrapper.emitted('resize')?.splice(0)

        wrapper.getComponent(SplitterPanel).vm.$emit('resize', 60, 40)
        await nextTick()

        expect(wrapper.emitted('resize')).toEqual([[60, 40]])
      })
    })
  })

  describe('slots', () => {
    describe('default', () => {
      it('renderiza el slot de panel por defecto cuando un elemento no tiene nombre de slot', () => {
        const wrapper = mountSplitter({
          props: { items: [makeItem({ slot: undefined })] },
          slots: {
            default: () => h('span', { 'data-test-splitter-default': '' }, 'Default panel'),
          },
        })

        expect(wrapper.get('[data-test-splitter-default]').text()).toBe('Default panel')
      })
    })

    describe('handle', () => {
      it('renderiza el slot global del manejador cuando un elemento no tiene nombre de slot', () => {
        const wrapper = mountSplitter({
          props: {
            items: [makeItem({ slot: undefined }), makeItem({ id: 'right', slot: undefined })],
          },
          slots: {
            handle: () => h('span', { 'data-test-global-handle': '' }, 'Global handle'),
          },
        })

        expect(wrapper.get('[data-test-global-handle]').text()).toBe('Global handle')
      })
    })

    describe('panel-{slot}', () => {
      it('renderiza el slot del panel calculado a partir del slot del elemento', () => {
        const wrapper = mountSplitter({
          props: { items: [makeItem({ slot: 'files' })] },
          slots: {
            'panel-files': () => h('span', { 'data-test-panel-files': '' }, 'Files panel'),
          },
        })

        expect(wrapper.get('[data-test-panel-files]').text()).toBe('Files panel')
      })
    })

    describe('handle-{slot}', () => {
      it('renderiza el slot del manejador calculado a partir del slot del elemento', () => {
        const wrapper = mountSplitter({
          props: {
            items: [makeItem({ slot: 'files' }), makeItem({ id: 'right', slot: 'right' })],
          },
          slots: {
            'handle-files': () => h('span', { 'data-test-handle-files': '' }, 'Files handle'),
          },
        })

        expect(wrapper.get('[data-test-handle-files]').text()).toBe('Files handle')
      })
    })
  })

  describe('context contract', () => {
    it('pasa los seis campos de contexto compartidos a los slots de panel y manejador', () => {
      const items = [makeItem(), makeItem({ id: 'right', slot: 'right' })]
      const panelContexts: SplitterItemContext[] = []
      const handleContexts: SplitterItemContext[] = []

      function pickContext(context: SplitterItemContext): SplitterItemContext {
        const { layout, item, index, first, last, nextItem } = context

        return { layout, item, index, first, last, nextItem }
      }

      mountSplitter({
        props: { items },
        slots: {
          'panel-left': (context: SplitterItemContext) => {
            panelContexts.push(pickContext(context))
            return h('span')
          },
          'panel-right': (context: SplitterItemContext) => {
            panelContexts.push(pickContext(context))
            return h('span')
          },
          'handle-left': (context: SplitterItemContext) => {
            handleContexts.push(pickContext(context))
            return h('span')
          },
        },
      })

      expect(panelContexts).toHaveLength(2)
      expect(panelContexts[0]).toEqual({
        layout: expect.any(Array),
        item: items[0],
        index: 0,
        first: true,
        last: false,
        nextItem: items[1],
      })
      expect(panelContexts[1]).toEqual({
        layout: expect.any(Array),
        item: items[1],
        index: 1,
        first: false,
        last: true,
        nextItem: undefined,
      })
      expect(handleContexts).toHaveLength(1)
      expect(handleContexts[0]).toEqual({
        layout: expect.any(Array),
        item: items[0],
        index: 0,
        first: true,
        last: false,
        nextItem: items[1],
      })
    })
  })
})
