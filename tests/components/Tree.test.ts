import { h, nextTick } from 'vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { TreeItem as RekaTreeItem, TreeRoot, TreeVirtualizer } from 'reka-ui'

import { Tree, type TreeItem, type TreeItemContext, type TreeProps } from '@/components/ui/Tree'
import { testAttrs } from '../utils/testAttrs'

const items: TreeItem[] = [
  {
    value: 'src',
    label: 'src',
    children: [
      {
        value: 'components',
        label: 'components',
        children: [
          { value: 'tree-vue', label: 'Tree.vue' },
          { value: 'tree-index', label: 'index.ts' },
        ],
      },
      { value: 'app-vue', label: 'App.vue' },
    ],
  },
  { value: 'package-json', label: 'package.json' },
  { value: 'readme', label: 'README.md', disabled: true },
]

type CustomTreeItem = TreeItem & {
  id: string
  nodes?: TreeItem[]
}

const customKeyItems: CustomTreeItem[] = [
  { id: 'custom-root', value: 'root-value', label: 'Custom root' },
]

const customChildrenItems: CustomTreeItem[] = [
  {
    id: 'workspace',
    value: 'workspace-value',
    label: 'Workspace',
    nodes: [{ value: 'docs', label: 'Docs' }],
  },
]

function mountTree(options: MountingOptions<TreeProps> = {}) {
  return mount(Tree, {
    ...options,
    props: {
      items,
      ...options.props,
    },
  })
}

describe('Tree', () => {
  describe('props', () => {
    describe('value', () => {
      it.each([
        { input: undefined, multiple: false, expected: undefined },
        { input: 'package-json', multiple: false, expected: items[1] },
        { input: ['package-json', 'src'], multiple: true, expected: [items[1], items[0]] },
      ])('pasa value=$input a TreeRoot', ({ input, multiple, expected }) => {
        const wrapper = mountTree({ props: { value: input, multiple } })

        expect(wrapper.getComponent(TreeRoot).props('modelValue')).toEqual(expected)
      })
    })

    describe('expanded', () => {
      it.each([
        { input: undefined, expected: [] },
        { input: [], expected: [] },
        { input: ['src'], expected: ['src'] },
      ])('pasa expanded=$input a TreeRoot como $expected', ({ input, expected }) => {
        const wrapper = mountTree({ props: { expanded: input } })

        expect(wrapper.getComponent(TreeRoot).props('expanded')).toEqual(expected)
      })
    })

    describe('items', () => {
      it.each([
        { input: undefined, expected: 0 },
        { input: [], expected: 0 },
        { input: items, expected: 3 },
        { input: items, expanded: ['src'], expected: 5 },
      ])('renderiza los nodos visibles para items=$input', ({ input, expanded, expected }) => {
        const wrapper = mountTree({ props: { items: input, expanded } })

        expect(wrapper.findAll('[data-test-tree-item]')).toHaveLength(expected)
      })

      it('pasa disabled del nodo a RekaTreeItem', () => {
        const wrapper = mountTree()
        const item = wrapper.findAllComponents(RekaTreeItem)[2]

        expect(item.props('disabled')).toBe(true)
      })
    })

    describe('disabled', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('pasa disabled=$input a TreeRoot como $expected', ({ input, expected }) => {
        const wrapper = mountTree({ props: { disabled: input } })

        expect(wrapper.getComponent(TreeRoot).props('disabled')).toBe(expected)
      })
    })

    describe('multiple', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('pasa multiple=$input a TreeRoot como $expected', ({ input, expected }) => {
        const wrapper = mountTree({ props: { multiple: input } })

        expect(wrapper.getComponent(TreeRoot).props('multiple')).toBe(expected)
      })
    })

    describe('selectionBehavior', () => {
      it.each([
        { input: 'toggle' as const, expected: 'toggle' },
        { input: 'replace' as const, expected: 'replace' },
        { input: undefined, expected: 'toggle' },
      ])('pasa selectionBehavior=$input a TreeRoot como $expected', ({ input, expected }) => {
        const wrapper = mountTree({ props: { selectionBehavior: input } })

        expect(wrapper.getComponent(TreeRoot).props('selectionBehavior')).toBe(expected)
      })
    })

    describe('propagateSelect', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: undefined },
      ])('pasa propagateSelect=$input a TreeRoot', ({ input, expected }) => {
        const wrapper = mountTree({ props: { propagateSelect: input } })

        expect(wrapper.getComponent(TreeRoot).props('propagateSelect')).toBe(expected)
      })
    })

    describe('bubbleSelect', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: undefined },
      ])('pasa bubbleSelect=$input a TreeRoot', ({ input, expected }) => {
        const wrapper = mountTree({ props: { bubbleSelect: input } })

        expect(wrapper.getComponent(TreeRoot).props('bubbleSelect')).toBe(expected)
      })
    })

    describe('checkbox', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('renderiza checkbox=$input como $expected', ({ input, expected }) => {
        const wrapper = mountTree({ props: { checkbox: input } })

        expect(wrapper.findAll('[data-test-tree-checkbox][data-test-checkbox-root]')).toHaveLength(
          expected ? 3 : 0,
        )
      })
    })

    describe('getKey', () => {
      it('usa item.value por defecto y lo normaliza a string para Reka UI', () => {
        const wrapper = mountTree()
        const root = wrapper.getComponent(TreeRoot)
        const getKey = root.props('getKey') as (item: TreeItem) => string

        expect(getKey(items[0])).toBe('src')
      })

      it('usa la clave personalizada en la raíz y en el modelo público', async () => {
        const wrapper = mountTree({
          props: {
            items: customKeyItems,
            getKey: (item) => (item as CustomTreeItem).id,
          },
        })
        const root = wrapper.getComponent(TreeRoot)
        const getKey = root.props('getKey') as (item: CustomTreeItem) => string

        expect(getKey(customKeyItems[0])).toBe('custom-root')

        await wrapper.get('[data-test-tree-item="custom-root"]').trigger('click')

        expect(wrapper.emitted('update:value')).toEqual([['custom-root']])
      })
    })

    describe('getChildren', () => {
      it('usa item.children por defecto', () => {
        const wrapper = mountTree({ props: { expanded: ['src'] } })
        const root = wrapper.getComponent(TreeRoot)
        const getChildren = root.props('getChildren') as (item: TreeItem) => TreeItem[] | undefined

        expect(getChildren(items[0])).toBe(items[0].children)
      })

      it('permite leer los hijos desde una propiedad personalizada', () => {
        const getChildren = (item: CustomTreeItem) => item.nodes
        const wrapper = mountTree({
          props: {
            items: customChildrenItems,
            expanded: ['workspace-value'],
            getChildren,
          },
        })

        expect(wrapper.get('[data-test-tree-item="docs"]').text()).toContain('Docs')
        expect(wrapper.getComponent(TreeRoot).props('getChildren')(customChildrenItems[0])).toEqual(
          customChildrenItems[0].nodes,
        )
      })
    })

    describe('virtual', () => {
      it.each([
        { input: true, expected: true },
        { input: false, expected: false },
        { input: undefined, expected: false },
      ])('renderiza TreeVirtualizer cuando virtual=$input', ({ input, expected }) => {
        const wrapper = mountTree({ props: { virtual: input } })

        expect(wrapper.findComponent(TreeVirtualizer).exists()).toBe(expected)
      })
    })

    describe('virtualizer', () => {
      it('pasa la configuración a TreeVirtualizer', () => {
        const textContent = (item: Record<string, unknown>) => String(item.label)
        const virtualizer = { overscan: 8, estimateSize: 32, textContent }
        const wrapper = mountTree({ props: { virtual: true, virtualizer } })

        expect(wrapper.getComponent(TreeVirtualizer).props()).toMatchObject(virtualizer)
      })
    })

    describe('ui', () => {
      describe('root', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.root',
          id: '[data-test-tree-root]',
          mount: (attrs) => mountTree({ props: { ui: { root: () => attrs } } }),
        })
      })

      describe('item', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.item',
          id: '[data-test-tree-item="src"]',
          mount: (attrs) => mountTree({ props: { ui: { item: () => attrs } } }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.content',
          id: '[data-test-tree-content="src"]',
          mount: (attrs) => mountTree({ props: { ui: { content: () => attrs } } }),
        })
      })

      describe('chevron', () => {
        it('reenvia class, style y atributos no funcionales mediante ui.chevron', () => {
          const wrapper = mountTree({
            props: {
              ui: {
                chevron: () => ({
                  id: 'test-chevron',
                  'aria-describedby': 'description',
                  class: 'custom-chevron',
                  style: 'opacity: 0.5',
                }),
              },
            },
          })
          const chevron = wrapper.get('[data-test-tree-chevron="src"]')

          expect(chevron.attributes('id')).toBe('test-chevron')
          expect(chevron.attributes('aria-describedby')).toBe('description')
          expect(chevron.classes()).toContain('custom-chevron')
          expect(chevron.attributes('style')).toContain('opacity: 0.5')
          expect(chevron.attributes('aria-label')).toBe('Expandir')
        })
      })

      describe('leading', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.leading',
          id: '[data-test-tree-leading="src"]',
          mount: (attrs) => mountTree({ props: { ui: { leading: () => attrs } } }),
        })
      })

      describe('checkbox', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.checkbox',
          id: '[data-test-tree-checkbox="src"]',
          mount: (attrs) => mountTree({ props: { checkbox: true, ui: { checkbox: () => attrs } } }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'reenvia attrs mediante ui.label',
          id: '[data-test-tree-label="src"]',
          mount: (attrs) => mountTree({ props: { ui: { label: () => attrs } } }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa atributos arbitrarios, class y style a la raíz',
      id: '[data-test-tree-root]',
      mount: (attrs) => mountTree({ attrs }),
    })
  })

  describe('emits', () => {
    describe('update:value', () => {
      it('selecciona un nodo al clicar la fila sin checkbox', async () => {
        const wrapper = mountTree()

        await wrapper.get('[data-test-tree-item="package-json"]').trigger('click')

        expect(wrapper.emitted('update:value')).toEqual([['package-json']])
      })

      it('alterna la selección múltiple', async () => {
        const wrapper = mountTree({ props: { multiple: true } })

        await wrapper.get('[data-test-tree-item="package-json"]').trigger('click')
        await wrapper.get('[data-test-tree-item="src"]').trigger('click')

        expect(wrapper.emitted('update:value')).toEqual([
          [['package-json']],
          [['package-json', 'src']],
        ])
      })

      it('selecciona y deselecciona desde el checkbox', async () => {
        const wrapper = mountTree({ props: { checkbox: true } })
        const checkbox = wrapper.get(
          '[data-test-tree-item="package-json"] [data-test-checkbox-root]',
        )

        await checkbox.trigger('click')
        await checkbox.trigger('click')

        expect(wrapper.emitted('update:value')).toEqual([['package-json'], [undefined]])
      })

      it('no selecciona la fila cuando checkbox está activo', async () => {
        const wrapper = mountTree({ props: { checkbox: true } })

        await wrapper.get('[data-test-tree-item="package-json"]').trigger('click')

        expect(wrapper.emitted('update:value')).toBeUndefined()
      })

      it('no emite al clicar un nodo deshabilitado', async () => {
        const wrapper = mountTree()

        await wrapper.get('[data-test-tree-item="readme"]').trigger('click')

        expect(wrapper.emitted('update:value')).toBeUndefined()
      })

      it('reenvia update:modelValue de TreeRoot con la clave pública', async () => {
        const wrapper = mountTree()
        const root = wrapper.getComponent(TreeRoot)

        await root.vm.$emit('update:modelValue', items[1])
        await nextTick()

        expect(wrapper.emitted('update:value')).toEqual([['package-json']])
      })
    })

    describe('update:expanded', () => {
      it('expande un nodo plegable al clicar la fila', async () => {
        const wrapper = mountTree({ props: { checkbox: true } })

        await wrapper.get('[data-test-tree-item="src"]').trigger('click')

        expect(wrapper.emitted('update:expanded')).toEqual([[['src']]])
        expect(wrapper.emitted('update:value')).toBeUndefined()
      })

      it('contrae un nodo expandido al clicar su chevron', async () => {
        const wrapper = mountTree({ props: { expanded: ['src'] } })

        await wrapper.get('[data-test-tree-chevron="src"]').trigger('click')

        expect(wrapper.emitted('update:expanded')).toEqual([[[]]])
      })

      it('no expande una hoja al clicar la fila con checkbox', async () => {
        const wrapper = mountTree({ props: { checkbox: true } })

        await wrapper.get('[data-test-tree-item="package-json"]').trigger('click')

        expect(wrapper.emitted('update:expanded')).toBeUndefined()
      })

      it('no expande un nodo deshabilitado', async () => {
        const wrapper = mountTree({ props: { expanded: [], disabled: true } })

        await wrapper.get('[data-test-tree-item="src"]').trigger('click')

        expect(wrapper.emitted('update:expanded')).toBeUndefined()
      })

      it('reenvia update:expanded de TreeRoot convirtiendo claves conocidas', async () => {
        const numericItems: TreeItem[] = [{ value: 1, label: 'Uno', children: [] }]
        const wrapper = mountTree({ props: { items: numericItems } })
        const root = wrapper.getComponent(TreeRoot)

        await root.vm.$emit('update:expanded', ['1'])
        await nextTick()

        expect(wrapper.emitted('update:expanded')).toEqual([[[1]]])
      })
    })

    describe('selection propagation', () => {
      it('propaga la selección del padre a sus descendientes', async () => {
        const wrapper = mountTree({
          props: { checkbox: true, multiple: true, propagateSelect: true },
        })

        await wrapper
          .get('[data-test-tree-checkbox="src"] [data-test-checkbox-root]')
          .trigger('click')

        expect(wrapper.emitted('update:value')).toEqual([
          [['src', 'components', 'tree-vue', 'tree-index', 'app-vue']],
        ])
      })

      it('marca el padre cuando todos sus hijos están seleccionados', async () => {
        const wrapper = mountTree({
          props: {
            checkbox: true,
            multiple: true,
            bubbleSelect: true,
            expanded: ['src', 'components'],
          },
        })

        await wrapper
          .get('[data-test-tree-checkbox="tree-vue"] [data-test-checkbox-root]')
          .trigger('click')
        await wrapper
          .get('[data-test-tree-checkbox="tree-index"] [data-test-checkbox-root]')
          .trigger('click')

        expect(wrapper.emitted('update:value')).toEqual([
          [['tree-vue']],
          [['tree-vue', 'tree-index', 'components']],
        ])
      })
    })
  })

  describe('slots', () => {
    const slotCases = [
      { name: 'item', props: {} },
      { name: 'item-leading', props: {} },
      { name: 'chevron', props: {} },
      { name: 'checkbox', props: { checkbox: true } },
      { name: 'item-label', props: {} },
    ] as const

    it.each(slotCases)('renderiza el slot $name', ({ name, props }) => {
      const wrapper = mountTree({
        props,
        slots: {
          [name]: () => h('span', { 'data-test-tree-slot': name }, `Custom ${name}`),
        },
      })

      expect(wrapper.get(`[data-test-tree-slot="${name}"]`).text()).toBe(`Custom ${name}`)
    })

    it('renderiza el contenido alternativo cuando no hay slots', () => {
      const wrapper = mountTree()

      expect(wrapper.get('[data-test-tree-label="package-json"]').text()).toBe('package.json')
      expect(wrapper.find('[data-test-tree-slot]').exists()).toBe(false)
    })

    it('ignora el slot default eliminado', () => {
      const wrapper = mountTree({
        slots: {
          default: () => h('span', { 'data-test-tree-slot': 'default' }, 'Default'),
        },
      })

      expect(wrapper.find('[data-test-tree-slot="default"]').exists()).toBe(false)
      expect(wrapper.get('[data-test-tree-label="package-json"]').text()).toBe('package.json')
    })

    it('expone TreeItemContext a los slots', () => {
      let context: TreeItemContext | undefined
      const wrapper = mountTree({
        slots: {
          'item-label': (input: TreeItemContext) => {
            context ??= input
            return h('span')
          },
        },
      })

      expect(context).toMatchObject({
        item: items[0],
        key: 'src',
        level: 1,
        hasChildren: true,
        expanded: false,
        selected: false,
        disabled: false,
        handleSelect: expect.any(Function),
        handleToggle: expect.any(Function),
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('context contract', () => {
    it('ejecuta ui.root sin recibir contexto', () => {
      let receivedArgs: unknown[] | undefined

      mountTree({
        props: {
          ui: {
            root: (...args: unknown[]) => {
              receivedArgs = args
              return {}
            },
          },
        },
      })

      expect(receivedArgs).toEqual([])
    })

    it('crea TreeItemContext completo para cada nodo visible', () => {
      const contexts = new Map<string | number, TreeItemContext>()

      mountTree({
        props: {
          value: ['components'],
          expanded: ['src'],
          multiple: true,
          ui: {
            item: (input) => {
              contexts.set(input.key, input)
              return {}
            },
          },
        },
      })

      expect(contexts.get('src')).toEqual({
        value: ['components'],
        expanded: ['src'],
        items,
        multiple: true,
        disabled: false,
        item: items[0],
        key: 'src',
        index: 0,
        level: 1,
        parentItem: undefined,
        hasChildren: true,
        expanded: true,
        selected: false,
        indeterminate: undefined,
        first: true,
        last: false,
        handleSelect: expect.any(Function),
        handleToggle: expect.any(Function),
      } satisfies TreeItemContext)

      expect(contexts.get('components')).toMatchObject({
        item: items[0]?.children?.[0],
        key: 'components',
        index: 1,
        level: 2,
        parentItem: items[0],
        hasChildren: true,
        expanded: false,
        selected: true,
        first: false,
        last: false,
      })
    })

    it('actualiza el estado mediante los handlers del contexto', async () => {
      let context: TreeItemContext | undefined
      const wrapper = mountTree({
        props: {
          ui: {
            item: (input) => {
              if (input.key === 'src') context = input
              return {}
            },
          },
        },
      })

      context?.handleSelect()
      await nextTick()
      context?.handleToggle()
      await nextTick()

      expect(wrapper.emitted('update:value')).toEqual([['src']])
      expect(wrapper.emitted('update:expanded')).toEqual([[['src']]])
    })

    it.each([
      { name: 'sin propagación', props: {}, expected: undefined },
      {
        name: 'con bubbleSelect sin hijos seleccionados',
        props: { bubbleSelect: true },
        expected: false,
      },
      {
        name: 'con bubbleSelect y selección parcial',
        props: { bubbleSelect: true, value: ['tree-vue'], expanded: ['src', 'components'] },
        expected: true,
      },
      {
        name: 'con bubbleSelect y todos los hijos seleccionados',
        props: {
          bubbleSelect: true,
          value: ['tree-vue', 'tree-index'],
          expanded: ['src', 'components'],
        },
        expected: false,
      },
    ])('calcula indeterminate $name', ({ props, expected }) => {
      let context: TreeItemContext | undefined

      mountTree({
        props: {
          multiple: true,
          expanded: ['src', 'components'],
          ui: {
            item: (input) => {
              if (input.key === 'components') context = input
              return {}
            },
          },
          ...props,
        },
      })

      expect(context?.indeterminate).toBe(expected)
    })
  })
})
