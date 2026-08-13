import { mount } from '@vue/test-utils'
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { ToggleGroup } from '@/components/ui/ToggleGroup'

const items = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

function mountToggleGroup(props = {}) {
  const wrapper = mount(ToggleGroup, {
    props: {
      items,
      ...props,
      'onUpdate:value': async (value) => {
        await wrapper.setProps({ value })
      },
    },
  })

  return wrapper
}

describe('ToggleGroup', () => {
  describe('single', () => {
    it('selects an item', async () => {
      const wrapper = mountToggleGroup({
        type: 'single',
      })

      await wrapper.findAll('button')[1].trigger('click')

      expect(wrapper.props('value')).toBe('center')
    })

    it('changes selection', async () => {
      const wrapper = mountToggleGroup({
        type: 'single',
        value: 'left',
      })

      await wrapper.findAll('button')[2].trigger('click')

      expect(wrapper.props('value')).toBe('right')
    })

    it('can clear the current selection when mandatory is false', async () => {
      const wrapper = mountToggleGroup({
        type: 'single',
        value: 'left',
      })

      await wrapper.findAll('button')[0].trigger('click')

      expect(wrapper.props('value')).toBeUndefined()
    })
  })

  describe('multiple', () => {
    it('allows multiple selected values', async () => {
      const wrapper = mountToggleGroup({
        type: 'multiple',
        value: [],
      })

      const buttons = wrapper.findAll('button')

      await buttons[0].trigger('click')
      await buttons[2].trigger('click')

      expect(wrapper.props('value')).toEqual(['left', 'right'])
    })

    it('can unselect an item', async () => {
      const wrapper = mountToggleGroup({
        type: 'multiple',
        value: ['left', 'right'],
      })

      await wrapper.findAll('button')[0].trigger('click')

      expect(wrapper.props('value')).toEqual(['right'])
    })

    it('can clear all selected items when mandatory is false', async () => {
      const wrapper = mountToggleGroup({
        type: 'multiple',
        value: ['left'],
      })

      await wrapper.findAll('button')[0].trigger('click')

      expect(wrapper.props('value')).toEqual([])
    })
  })

  describe('mandatory', () => {
    it('does not allow clearing the value in single mode', async () => {
      const wrapper = mountToggleGroup({
        type: 'single',
        mandatory: true,
        value: 'left',
      })

      await wrapper.findAll('button')[0].trigger('click')

      expect(wrapper.props('value')).toBe('left')
    })

    it('allows changing the value in single mode', async () => {
      const wrapper = mountToggleGroup({
        type: 'single',
        mandatory: true,
        value: 'left',
      })

      await wrapper.findAll('button')[1].trigger('click')

      expect(wrapper.props('value')).toBe('center')
    })

    it('does not allow removing the last value in multiple mode', async () => {
      const wrapper = mountToggleGroup({
        type: 'multiple',
        mandatory: true,
        value: ['left'],
      })

      await wrapper.findAll('button')[0].trigger('click')

      expect(wrapper.props('value')).toEqual(['left'])
    })

    it('allows removing an item if another remains selected', async () => {
      const wrapper = mountToggleGroup({
        type: 'multiple',
        mandatory: true,
        value: ['left', 'right'],
      })

      await wrapper.findAll('button')[0].trigger('click')

      expect(wrapper.props('value')).toEqual(['right'])
    })
  })

  describe('emits', () => {
    it('emits update:value', async () => {
      const wrapper = mountToggleGroup()

      await wrapper.findAll('button')[0].trigger('click')

      expect(wrapper.emitted('update:value')).toEqual([['left']])
    })

    it('emits valueChange when model changes', async () => {
      const wrapper = mountToggleGroup()

      await wrapper.findAll('button')[0].trigger('click')

      expect(wrapper.emitted('valueChange')).toEqual([['left']])
    })

    it('emits valueChange when value changes externally', async () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          value: 'left',
        },
      })

      await wrapper.setProps({
        value: 'right',
      })

      expect(wrapper.emitted('valueChange')).toEqual([['right']])
    })

    it('does not emit valueChange when value stays the same', async () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          value: 'left',
        },
      })

      await wrapper.setProps({
        value: 'left',
      })

      expect(wrapper.emitted('valueChange')).toBeUndefined()
    })
  })

  describe('root props', () => {
    it('passes disabled to ToggleGroupRoot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          disabled: true,
        },
      })

      expect(wrapper.findComponent(ToggleGroupRoot).props('disabled')).toBe(true)
    })

    it('passes dir to ToggleGroupRoot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          dir: 'rtl',
        },
      })

      expect(wrapper.findComponent(ToggleGroupRoot).props('dir')).toBe('rtl')
    })

    it('passes loop to ToggleGroupRoot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          loop: false,
        },
      })

      expect(wrapper.findComponent(ToggleGroupRoot).props('loop')).toBe(false)
    })

    it('passes rovingFocus to ToggleGroupRoot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          rovingFocus: false,
        },
      })

      expect(wrapper.findComponent(ToggleGroupRoot).props('rovingFocus')).toBe(false)
    })
  })

  describe('orientation', () => {
    it('applies horizontal classes', () => {
      const wrapper = mount(ToggleGroup, {
        props: { items, orientation: 'horizontal' },
      })

      expect(wrapper.classes()).toContain('items-center')
      expect(wrapper.classes()).not.toContain('flex-col')
      expect(wrapper.classes()).not.toContain('items-stretch')
    })

    it('applies vertical classes', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          orientation: 'vertical',
        },
      })

      expect(wrapper.classes()).toContain('flex-col')
      expect(wrapper.classes()).toContain('items-stretch')
      expect(wrapper.classes()).not.toContain('items-center')
    })
  })

  describe('spacing', () => {
    it('uses zero spacing by default', () => {
      const wrapper = mount(ToggleGroup, {
        props: { items },
      })

      expect(wrapper.attributes('style')).toContain('--toggle-group-gap: calc(var(--spacing) * 0)')
    })

    it('sets the spacing CSS variable', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          spacing: 3,
        },
      })

      expect(wrapper.attributes('style')).toContain('--toggle-group-gap: calc(var(--spacing) * 3)')
    })

    it('joins items when spacing is zero', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          spacing: 0,
        },
      })

      expect(wrapper.classes()).toContain('[&>*]:rounded-none')
    })
    it('applies horizontal joined styles', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          orientation: 'horizontal',
          spacing: 0,
        },
      })

      expect(wrapper.classes()).toContain('[&>*+*]:border-l-0')
      expect(wrapper.classes()).toContain('[&>*:first-child]:rounded-l-md')
      expect(wrapper.classes()).toContain('[&>*:last-child]:rounded-r-md')

      expect(wrapper.classes()).not.toContain('[&>*+*]:border-t-0')
    })

    it('applies vertical joined styles', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          orientation: 'vertical',
          spacing: 0,
        },
      })

      expect(wrapper.classes()).toContain('[&>*+*]:border-t-0')
      expect(wrapper.classes()).toContain('[&>*:first-child]:rounded-t-md')
      expect(wrapper.classes()).toContain('[&>*:last-child]:rounded-b-md')

      expect(wrapper.classes()).not.toContain('[&>*+*]:border-l-0')
    })

    it('does not apply joined styles when spacing is greater than zero', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          spacing: 2,
        },
      })

      expect(wrapper.classes()).not.toContain('[&>*]:rounded-none')
      expect(wrapper.classes()).not.toContain('[&>*+*]:border-l-0')
      expect(wrapper.classes()).not.toContain('[&>*+*]:border-t-0')
    })
  })

  describe('attrs', () => {
    it('forwards attrs, class and style to the root', () => {
      const wrapper = mount(ToggleGroup, {
        attrs: {
          id: 'alignment',
          'aria-label': 'Alignment',
          'data-testid': 'toggle-group',
          class: 'custom-class',
          style: 'margin-top: 10px',
        },
        props: {
          items,
        },
      })

      expect(wrapper.classes()).toContain('custom-class')
      expect(wrapper.attributes('style')).toContain('margin-top: 10px')
      expect(wrapper.attributes('id')).toBe('alignment')
      expect(wrapper.attributes('aria-label')).toBe('Alignment')
      expect(wrapper.attributes('data-testid')).toBe('toggle-group')
    })
  })

  describe('item', () => {
    it('renders all item labels', () => {
      const wrapper = mount(ToggleGroup, {
        props: { items },
      })

      const buttons = wrapper.findAll('button')

      expect(buttons).toHaveLength(3)
      expect(buttons[0].text()).toBe('Left')
      expect(buttons[1].text()).toBe('Center')
      expect(buttons[2].text()).toBe('Right')
    })

    it('passes item.disabled to ToggleGroupItem', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items: [
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled', disabled: true },
          ],
        },
      })

      const toggleItems = wrapper.findAllComponents(ToggleGroupItem)

      expect(toggleItems).toHaveLength(2)
      expect(toggleItems[1].props('disabled')).toBe(true)
    })

    it('passes item.value to ToggleGroupItem', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items: [
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled', disabled: true },
          ],
        },
      })

      const toggleItems = wrapper.findAllComponents(ToggleGroupItem)

      expect(toggleItems).toHaveLength(2)
      expect(toggleItems[0].props('value')).toBe('enabled')
      expect(toggleItems[1].props('value')).toBe('disabled')
    })

    it('renders an icon when item.icon is defined', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items: [
            {
              label: 'Bold',
              value: 'bold',
              icon: 'bold',
            },
          ],
        },
      })

      expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(true)
    })

    it('renders an icon when item.trailingIcon is defined', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items: [
            {
              label: 'Bold',
              value: 'bold',
              trailingIcon: 'bold',
            },
          ],
        },
      })

      expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(true)
    })

    it('renders leading and trailing icons', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items: [
            {
              label: 'Bold',
              value: 'bold',
              icon: 'bold',
              trailingIcon: 'chevron-down',
            },
          ],
        },
      })

      expect(wrapper.findAllComponents({ name: 'Icon' })).toHaveLength(2)
    })
  })

  describe('context', () => {
    it('provides the ToggleGroupContext contract', () => {
      const root = vi.fn(() => ({}))

      mount(ToggleGroup, {
        props: {
          items,
          value: 'center',
          orientation: 'vertical',
          disabled: true,
          ui: { root },
        },
      })

      expect(root.mock.calls[0][0]).toEqual({
        value: 'center',
        orientation: 'vertical',
        disabled: true,
      })
    })

    it('provides the ToggleGroupItemContext contract', () => {
      const itemSlot = vi.fn(() => null)

      const customItems = [
        { label: 'Left', value: 'left' },
        {
          label: 'Center',
          value: 'center',
          disabled: true,
        },
      ]

      mount(ToggleGroup, {
        props: {
          items: customItems,
          value: 'left',
        },
        slots: { item: itemSlot },
      })

      const firstContext = {
        item: customItems[0],
        index: 0,
        selected: true,
        disabled: false,
      }
      const secondContext = {
        item: customItems[1],
        index: 1,
        selected: false,
        disabled: true,
      }

      expect(itemSlot.mock.calls[0][0]).toMatchObject(firstContext)
      expect(itemSlot.mock.calls[1][0]).toMatchObject(secondContext)
    })
  })

  describe('ui', () => {
    it('passes ToggleGroupContext to ui.root', () => {
      const root = vi.fn(() => ({}))
      const context = {
        value: 'center',
        orientation: 'vertical' as const,
        disabled: true,
      }

      mount(ToggleGroup, {
        props: {
          items,
          ...context,
          ui: { root },
        },
      })

      expect(root).toHaveBeenCalledWith(context)
    })

    it('passes ToggleGroupItemContext to ui.item and ui.label', () => {
      const item = vi.fn(() => ({}))
      const label = vi.fn(() => ({}))
      const context = {
        item: items[0],
        index: 0,
        selected: true,
        disabled: false,
      }

      mount(ToggleGroup, {
        props: {
          items,
          value: 'left',
          ui: { item, label },
        },
      })

      expect(item).toHaveBeenCalledWith(context)
      expect(label).toHaveBeenCalledWith(context)
    })

    it('applies root UI attrs, class and style', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          ui: {
            root: () => ({
              class: 'custom-root',
              'data-custom-root': 'true',
              style: {
                marginTop: '20px',
              },
            }),
          },
        },
      })

      expect(wrapper.classes()).toContain('custom-root')
      expect(wrapper.attributes('data-custom-root')).toBe('true')
      expect(wrapper.attributes('style')).toContain('margin-top: 20px')
    })

    it('applies item UI classes and attrs', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          value: 'left',
          ui: {
            item: ({ selected }) => ({
              class: selected ? 'selected-item' : 'unselected-item',
              'data-custom-item': 'true',
            }),
          },
        },
      })

      const buttons = wrapper.findAll('button')

      expect(buttons[0].classes()).toContain('selected-item')
      expect(buttons[1].classes()).toContain('unselected-item')
      expect(buttons[0].attributes('data-custom-item')).toBe('true')
    })

    it('applies label UI classes and attrs', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
          value: 'left',
          ui: {
            label: ({ selected }) => ({
              class: selected ? 'selected-label' : 'normal-label',
              'data-label': 'custom',
            }),
          },
        },
      })

      const labels = wrapper.findAll('span')

      expect(labels[0].classes()).toContain('selected-label')
      expect(labels[1].classes()).toContain('normal-label')
      expect(labels[0].attributes('data-label')).toBe('custom')
    })
  })

  describe('slots', () => {
    it.each(['item', 'leading', 'label', 'trailing'])(
      'passes ToggleGroupItemContext to the %s slot',
      (slotName) => {
        const slot = vi.fn(() => null)

        mount(ToggleGroup, {
          props: {
            items: [items[0]],
            value: 'left',
          },
          slots: {
            [slotName]: slot,
          },
        })

        expect(slot.mock.calls[0][0]).toMatchObject({
          item: items[0],
          index: 0,
          selected: true,
          disabled: false,
        })
      },
    )

    it.each([
      'item-{item.value}',
      'leading-{item.value}',
      'label-{item.value}',
      'trailing-{item.value}',
    ])('passes ToggleGroupItemContext to the %s slot', () => {
      const slot = vi.fn(() => null)

      mount(ToggleGroup, {
        props: {
          items,
          value: 'left',
        },
        slots: {
          ['item-' + items[0].value]: slot,
          ['leading-' + items[0].value]: slot,
          ['label-' + items[0].value]: slot,
          ['trailing-' + items[0].value]: slot,
        },
      })

      expect(slot.mock.calls[0][0]).toMatchObject({
        item: items[0],
        index: 0,
        selected: true,
        disabled: false,
      })
    })

    it('generic item slot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
        },
        slots: {
          item: ({ item }) => h('span', { 'data-testid': 'custom-item' }, `custom-${item.label}`),
        },
      })

      const customItems = wrapper.findAll('[data-testid="custom-item"]')

      expect(customItems).toHaveLength(3)
      expect(customItems[0].text()).toBe('custom-Left')
    })

    it('specific item slot over generic item slot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
        },
        slots: {
          item: ({ item }) => h('span', `generic-${item.label}`),

          'item-center': ({ item }) =>
            h('span', { 'data-testid': 'specific-item' }, `specific-${item.label}`),
        },
      })

      expect(wrapper.get('[data-testid="specific-item"]').text()).toBe('specific-Center')
      expect(wrapper.text()).not.toContain('generic-Center')
    })

    it('generic leading slot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
        },
        slots: {
          leading: ({ item }) => h('span', { 'data-testid': 'leading' }, `leading-${item.label}`),
        },
      })

      expect(wrapper.findAll('[data-testid="leading"]')).toHaveLength(3)
    })

    it('specific leading slot over generic leading slot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
        },
        slots: {
          leading: ({ item }) => h('span', `generic-leading-${item.label}`),

          'leading-center': () => h('span', { 'data-testid': 'specific-leading' }, 'specific'),
        },
      })

      expect(wrapper.get('[data-testid="specific-leading"]').text()).toBe('specific')

      expect(wrapper.text()).not.toContain('generic-leading-Center')
    })

    it('generic label slot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
        },
        slots: {
          label: ({ item }) => h('strong', { 'data-testid': 'label' }, `${item.label}!`),
        },
      })

      expect(wrapper.findAll('[data-testid="label"]')).toHaveLength(3)
    })

    it('specific label slot over generic label slot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
        },
        slots: {
          label: ({ item }) => h('span', `generic-label-${item.label}`),
          'label-center': () => h('span', { 'data-testid': 'specific-label' }, 'specific'),
        },
      })

      expect(wrapper.get('[data-testid="specific-label"]').text()).toBe('specific')
      expect(wrapper.text()).not.toContain('generic-label-Center')
    })

    it('general trailing slot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
        },
        slots: {
          trailing: ({ item }) =>
            h('span', { 'data-testid': 'trailing' }, `trailing-${item.label}`),
        },
      })

      expect(wrapper.findAll('[data-testid="trailing"]')).toHaveLength(3)
    })

    it('specific trailing slot over generic trailing slot', () => {
      const wrapper = mount(ToggleGroup, {
        props: {
          items,
        },
        slots: {
          trailing: ({ item }) => h('span', `generic-trailing-${item.label}`),

          'trailing-center': () => h('span', { 'data-testid': 'specific-trailing' }, 'specific'),
        },
      })

      expect(wrapper.get('[data-testid="specific-trailing"]').text()).toBe('specific')

      expect(wrapper.text()).not.toContain('generic-trailing-Center')
    })
  })

  // describe('value types', () => {
  //   it('supports number values', async () => {
  //     const wrapper = mountToggleGroup({
  //       items: [
  //         { label: 'One', value: 1 },
  //         { label: 'Two', value: 2 },
  //       ],
  //     })

  //     await wrapper.findAll('button')[1].trigger('click')

  //     expect(wrapper.props('value')).toBe(2)
  //   })

  //   it('supports bigint values', async () => {
  //     const wrapper = mountToggleGroup({
  //       items: [
  //         { label: 'One', value: 1n },
  //         { label: 'Two', value: 2n },
  //       ],
  //     })

  //     await wrapper.findAll('button')[1].trigger('click')

  //     expect(wrapper.props('value')).toBe(2n)
  //   })

  //   it('supports null as a selected value', () => {
  //     const item = vi.fn(() => ({}))

  //     mount(ToggleGroup, {
  //       props: {
  //         items: [
  //           {
  //             label: 'None',
  //             value: null,
  //           },
  //         ],
  //         value: null,
  //         ui: {
  //           item,
  //         },
  //       },
  //     })

  //     expect(item).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         selected: true,
  //       }),
  //     )
  //   })

  //   it('selects object values when they have the same reference', () => {
  //     const value = { id: 1 }
  //     const item = vi.fn(() => ({}))

  //     mount(ToggleGroup, {
  //       props: {
  //         items: [
  //           {
  //             label: 'Object',
  //             value,
  //           },
  //         ],
  //         value,
  //         ui: {
  //           item,
  //         },
  //       },
  //     })

  //     expect(item).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         selected: true,
  //       }),
  //     )
  //   })

  //   it('does not select object values with different references', () => {
  //     const item = vi.fn(() => ({}))

  //     mount(ToggleGroup, {
  //       props: {
  //         items: [
  //           {
  //             label: 'Object',
  //             value: { id: 1 },
  //           },
  //         ],
  //         value: { id: 1 },
  //         ui: {
  //           item,
  //         },
  //       },
  //     })

  //     expect(item).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         selected: false,
  //       }),
  //     )
  //   })
  // })
})
