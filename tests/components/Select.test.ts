import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils'
import {
  SelectContent,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'

import {
  Select,
  selectDefaults,
  type SelectContext,
  type SelectGroup,
  type SelectGroupContext,
  type SelectItem,
  type SelectItemContext,
  type SelectProps,
} from '@/components/ui/Select'
import { Icon } from '@/components/ui/Icon'
import { testAttrs } from '../utils/testAttrs'

const items: SelectItem[] = [
  { value: 'apple', label: 'Manzana', icon: { name: 'info' } },
  { value: 'banana', label: 'Plátano' },
  { value: 'disabled', label: 'Deshabilitado', disabled: true },
]

const groups: SelectGroup[] = [
  {
    label: 'Frutas',
    items: [
      { value: 'apple', label: 'Manzana' },
      { value: 'banana', label: 'Plátano' },
    ],
  },
  {
    label: 'Verduras',
    items: [{ value: 'carrot', label: 'Zanahoria' }],
  },
]

const emptyGroups: SelectGroup[] = [
  { label: 'Vacío', items: [] },
  { label: 'También vacío', items: [] },
]

const casesValue = [
  { input: undefined, expected: undefined },
  { input: 'banana' as SelectProps['value'], expected: 'banana' },
  { input: 2 as SelectProps['value'], expected: 2 },
]

const casesDisabled = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
]

const casesLoading = [
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: true, expected: true },
]

const casesOpen = [
  { name: 'abre', input: true, expected: [[true]] },
  { name: 'cierra', input: false, expected: [[true], [false]] },
]

const casesPlaceholder = [
  { input: undefined, expected: selectDefaults.placeholder },
  { input: 'Elige una fruta', expected: 'Elige una fruta' },
]

const casesItems = [
  { name: 'sin items', input: [] as SelectItem[], expected: 0 },
  { name: 'con items', input: items, expected: items.length },
]

const casesGroups = [
  {
    name: 'sin grupos',
    input: [] as SelectGroup[],
    expectedGroups: 0,
    expectedItems: items.length,
  },
  { name: 'con grupos', input: groups, expectedGroups: groups.length, expectedItems: 3 },
]

const casesGroupsPrecedence = [
  {
    name: 'groups con contenido tiene prioridad sobre items',
    input: { items, groups },
    expectedValues: ['apple', 'banana', 'carrot'],
  },
  {
    name: 'groups vacíos se ignoran y conserva items',
    input: { items, groups: emptyGroups },
    expectedValues: ['apple', 'banana', 'disabled'],
  },
]

const casesSlot = [
  {
    name: 'loading',
    slot: 'loading',
    selector: '[data-test-select-slot="loading"]',
    text: 'Cargando personalizado',
    props: { value: 'apple', loading: true },
    open: false,
  },
  {
    name: 'value',
    slot: 'value',
    selector: '[data-test-select-slot="value"]',
    text: 'Valor personalizado',
    props: { value: 'apple' },
    open: false,
  },
  {
    name: 'icon',
    slot: 'icon',
    selector: '[data-test-select-slot="icon"]',
    text: 'Icono personalizado',
    props: {},
    open: false,
  },
  {
    name: 'item',
    slot: 'item',
    selector: '[data-test-select-slot="item"]',
    text: 'Item personalizado',
    props: { items },
    open: true,
  },
  {
    name: 'item-leading',
    slot: 'item-leading',
    selector: '[data-test-select-slot="item-leading"]',
    text: 'Leading personalizado',
    props: { items },
    open: true,
  },
  {
    name: 'item-label',
    slot: 'item-label',
    selector: '[data-test-select-slot="item-label"]',
    text: 'Label personalizado',
    props: { items },
    open: true,
  },
  {
    name: 'indicator',
    slot: 'indicator',
    selector: '[data-test-select-slot="indicator"]',
    text: 'Indicador personalizado',
    props: { items, value: 'apple' },
    open: true,
  },
  {
    name: 'group-label',
    slot: 'group-label',
    selector: '[data-test-select-slot="group-label"]',
    text: 'Label personalizado',
    props: { groups },
    open: true,
  },
  {
    name: 'scroll-up',
    slot: 'scroll-up',
    selector: '[data-test-select-slot="scroll-up"]',
    text: 'Arriba',
    props: { items },
    open: true,
  },
  {
    name: 'scroll-down',
    slot: 'scroll-down',
    selector: '[data-test-select-slot="scroll-down"]',
    text: 'Abajo',
    props: { items },
    open: true,
  },
] as const

const casesSelectContext = [
  {
    name: 'sin valor y cerrado',
    props: { value: undefined },
    open: false,
    expected: { value: undefined, open: false },
  },
  {
    name: 'con valor y abierto',
    props: { value: 'banana' as SelectProps['value'] },
    open: true,
    expected: { value: 'banana', open: true },
  },
]

const casesItemContext = [
  {
    name: 'item no seleccionado',
    value: 'banana' as SelectProps['value'],
    itemValue: 'apple',
    expected: { value: 'banana', open: true, item: items[0], index: 0, selected: false },
  },
  {
    name: 'item seleccionado',
    value: 'banana' as SelectProps['value'],
    itemValue: 'banana',
    expected: { value: 'banana', open: true, item: items[1], index: 1, selected: true },
  },
]

const casesGroupContext = [
  {
    name: 'primer grupo',
    label: 'Frutas',
    expected: { value: 'apple', open: true, group: groups[0], index: 0 },
  },
  {
    name: 'último grupo',
    label: 'Verduras',
    expected: { value: 'apple', open: true, group: groups[1], index: 1 },
  },
]

const mountedWrappers: VueWrapper[] = []

function mountSelect(options: MountingOptions<SelectProps> = {}) {
  const wrapper = mount(Select, {
    ...options,
    attachTo: document.body,
    props: {
      items,
      ...options.props,
    },
  })

  mountedWrappers.push(wrapper)
  return wrapper
}

function mountSelectInline(options: MountingOptions<SelectProps> = {}) {
  const wrapper = mount(Select, {
    ...options,
    attachTo: document.body,
    global: {
      ...options.global,
      stubs: {
        SelectPortal: { template: '<div data-test-select-portal><slot /></div>' },
        SelectScrollUpButton: {
          inheritAttrs: false,
          template: '<button v-bind="$attrs"><slot /></button>',
        },
        SelectScrollDownButton: {
          inheritAttrs: false,
          template: '<button v-bind="$attrs"><slot /></button>',
        },
        ...options.global?.stubs,
      },
    },
    props: {
      items,
      ...options.props,
    },
  })

  mountedWrappers.push(wrapper)
  return wrapper
}

async function openSelect(wrapper: VueWrapper) {
  await wrapper.get('[data-slot="select-trigger"]').trigger('pointerdown')
  await nextTick()
  return wrapper
}

function getBodyElement(selector: string) {
  const element = document.body.querySelector<HTMLElement>(selector)
  if (!element) throw new Error(`No se encontró ${selector} en document.body`)
  return element
}

afterEach(() => {
  mountedWrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
})

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
    configurable: true,
    value: () => false,
  })
  Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
    configurable: true,
    value: () => undefined,
  })
})

describe('Select', () => {
  describe('props', () => {
    describe('value', () => {
      it.each(casesValue)('pasa value=$input a SelectRoot', ({ input, expected }) => {
        const wrapper = mountSelect({ props: { value: input } })

        expect(wrapper.getComponent(SelectRoot).props('modelValue')).toBe(expected)
      })
    })

    describe('disabled', () => {
      it.each(casesDisabled)('pasa disabled=$input a SelectRoot', ({ input, expected }) => {
        const wrapper = mountSelect({ props: { disabled: input } })

        expect(wrapper.getComponent(SelectRoot).props('disabled')).toBe(expected)
        expect(wrapper.getComponent(SelectTrigger).props('disabled')).toBe(expected)
      })
    })

    describe('loading', () => {
      it.each(casesLoading)(
        'pasa loading=$input sin deshabilitar el control',
        ({ input, expected }) => {
          const wrapper = mountSelect({ props: { loading: input } })

          expect(wrapper.getComponent(SelectRoot).props('disabled')).toBe(false)
          expect(wrapper.getComponent(SelectTrigger).props('disabled')).toBe(false)
          expect(wrapper.get('[data-slot="select-trigger"]').attributes('aria-busy')).toBe(
            expected ? 'true' : undefined,
          )
        },
      )

      it('muestra el spinner en lugar del icono del value y conserva el label', () => {
        const wrapper = mountSelectInline({ props: { value: 'apple', loading: true } })

        expect(wrapper.get('[data-slot="select-value"]').text()).toContain('Manzana')
        expect(wrapper.getComponent('[data-slot="select-loading-icon"]').props('name')).toBe(
          'spinner',
        )
        expect(wrapper.get('[data-slot="select-loading-icon"]').classes()).toContain('animate-spin')
        expect(wrapper.find('[data-slot="select-value-icon"]').exists()).toBe(false)
      })

      it('mantiene el trigger visible y no renderiza el panel mientras carga', async () => {
        const wrapper = mountSelectInline({ props: { loading: true } })

        expect(wrapper.get('[data-slot="select-trigger"]').exists()).toBe(true)
        expect(wrapper.findComponent(SelectContent).exists()).toBe(false)
        expect(wrapper.find('[data-slot="select-content"]').exists()).toBe(false)

        const openWrapper = await openSelect(
          mountSelectInline({ props: { items, value: 'apple' } }),
        )
        await openWrapper.setProps({ loading: true })
        await nextTick()

        expect(openWrapper.get('[data-slot="select-trigger"]').attributes('aria-expanded')).toBe(
          'false',
        )
        expect(openWrapper.find('[data-slot="select-content"]').exists()).toBe(false)
      })
    })

    describe('placeholder', () => {
      it.each(casesPlaceholder)('renderiza placeholder=$input', ({ input, expected }) => {
        const wrapper = mountSelect({ props: { placeholder: input } })

        expect(wrapper.getComponent(SelectValue).props('placeholder')).toBe(expected)
      })
    })

    describe('items', () => {
      it.each(casesItems)('renderiza $name', async ({ input, expected }) => {
        const wrapper = await openSelect(mountSelectInline({ props: { items: input } }))

        expect(wrapper.findAll('[data-slot="select-item"]')).toHaveLength(expected)
      })

      it('renderiza el label y el estado disabled de cada opción', async () => {
        const wrapper = await openSelect(mountSelectInline({ props: { items } }))
        const renderedItems = wrapper.findAll('[data-slot="select-item"]')

        expect(renderedItems.map((item) => item.text())).toEqual([
          'Manzana',
          'Plátano',
          'Deshabilitado',
        ])
        expect(renderedItems[2].attributes('data-disabled')).toBe('')
        expect(renderedItems[2].attributes('aria-disabled')).toBe('true')
      })

      it('renderiza el icono configurado en el item', async () => {
        const wrapper = await openSelect(mountSelectInline({ props: { items } }))
        const icon = wrapper.get('[data-slot="select-item-icon"]')

        expect(icon.attributes('data-slot')).toBe('select-item-icon')
        expect(wrapper.getComponent('[data-slot="select-item-icon"]').props('name')).toBe('info')
      })

      it('renderiza el icono y label del item seleccionado en el value', () => {
        const wrapper = mountSelectInline({ props: { value: 'apple' } })
        const value = wrapper.get('[data-slot="select-value"]')

        expect(value.text()).toContain('Manzana')
        const icon = wrapper
          .findAllComponents(Icon)
          .find((component) => component.attributes('data-slot') === 'select-value-icon')

        expect(icon?.props('name')).toBe('info')
      })
    })

    describe('groups', () => {
      it.each(casesGroups)('renderiza $name', async ({ input, expectedGroups, expectedItems }) => {
        const wrapper = await openSelect(mountSelectInline({ props: { groups: input } }))

        expect(wrapper.findAll('[data-slot="select-group"]')).toHaveLength(expectedGroups)
        expect(wrapper.findAll('[data-slot="select-item"]')).toHaveLength(expectedItems)
      })

      it.each(casesGroupsPrecedence)('$name', async ({ input, expectedValues }) => {
        const wrapper = await openSelect(mountSelectInline({ props: input }))
        const renderedItems = wrapper.findAll('[data-slot="select-item"]')

        expect(renderedItems.map((item) => item.text())).toEqual(
          expectedValues.map(
            (value) =>
              items.find((item) => String(item.value) === value)?.label ??
              groups.flatMap((group) => group.items).find((item) => String(item.value) === value)
                ?.label,
          ),
        )
      })

      it('renderiza el label de cada grupo', async () => {
        const wrapper = await openSelect(mountSelectInline({ props: { groups } }))

        expect(
          wrapper.findAll('[data-slot="select-group-label"]').map((label) => label.text()),
        ).toEqual(['Frutas', 'Verduras'])
      })
    })

    describe('Reka composition', () => {
      it('configura position=popper en SelectContent', async () => {
        const wrapper = await openSelect(mountSelectInline())

        expect(wrapper.getComponent(SelectContent).props('position')).toBe('popper')
      })

      it('compone content, viewport y botones de scroll', async () => {
        const wrapper = await openSelect(mountSelectInline({ props: { items } }))

        expect(wrapper.findComponent(SelectContent).exists()).toBe(true)
        expect(wrapper.findComponent(SelectViewport).exists()).toBe(true)
        expect(wrapper.findComponent(SelectScrollUpButton).exists()).toBe(true)
        expect(wrapper.findComponent(SelectScrollDownButton).exists()).toBe(true)
      })

      it('renderiza el contenido real en document.body mediante SelectPortal', async () => {
        const wrapper = await openSelect(mountSelect())

        expect(wrapper.findComponent(SelectPortal).exists()).toBe(true)
        expect(getBodyElement('[data-slot="select-content"]')).toBeTruthy()
        expect(wrapper.element.querySelector('[data-slot="select-content"]')).toBeNull()
      })
    })

    describe('ui', () => {
      describe('root', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.root',
          id: '[data-slot="select"]',
          mount: (attrs) => mountSelect({ props: { ui: { root: () => attrs } } }),
        })
      })

      describe('trigger', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.trigger',
          id: '[data-slot="select-trigger"]',
          assertId: false,
          mount: (attrs) => mountSelect({ props: { ui: { trigger: () => attrs } } }),
        })
      })

      describe('value', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.value',
          id: '[data-slot="select-value"]',
          mount: (attrs) => mountSelect({ props: { value: 'apple', ui: { value: () => attrs } } }),
        })
      })

      describe('icon', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.icon',
          id: '[data-slot="select-icon"]',
          assertId: false,
          mount: (attrs) => mountSelect({ props: { ui: { icon: () => attrs } } }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.content',
          id: '[data-slot="select-content"]',
          assertId: false,
          mount: async (attrs) =>
            openSelect(mountSelectInline({ props: { ui: { content: () => attrs } } })),
        })
      })

      describe('viewport', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.viewport',
          id: '[data-slot="select-viewport"]',
          mount: async (attrs) =>
            openSelect(mountSelectInline({ props: { ui: { viewport: () => attrs } } })),
        })
      })

      describe('group', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.group',
          id: '[data-slot="select-group"]',
          mount: async (attrs) =>
            openSelect(mountSelectInline({ props: { groups, ui: { group: () => attrs } } })),
        })
      })

      describe('groupLabel', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.groupLabel',
          id: '[data-slot="select-group-label"]',
          mount: async (attrs) =>
            openSelect(mountSelectInline({ props: { groups, ui: { groupLabel: () => attrs } } })),
        })
      })

      describe('item', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.item',
          id: '[data-slot="select-item"]',
          mount: async (attrs) =>
            openSelect(mountSelectInline({ props: { ui: { item: () => attrs } } })),
        })
      })

      describe('itemText', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.itemText',
          id: '[data-slot="select-item-text"]',
          assertId: false,
          mount: async (attrs) =>
            openSelect(mountSelectInline({ props: { ui: { itemText: () => attrs } } })),
        })
      })

      describe('indicator', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.indicator',
          id: '[data-slot="select-item-indicator"]',
          assertId: false,
          mount: async (attrs) =>
            openSelect(
              mountSelectInline({ props: { value: 'apple', ui: { indicator: () => attrs } } }),
            ),
        })
      })

      describe('scroll buttons', () => {
        testAttrs({
          text: 'renderiza los atributos de ui.scrollUpButton',
          id: '[data-slot="select-scroll-up"]',
          assertId: false,
          mount: async (attrs) =>
            openSelect(mountSelectInline({ props: { ui: { scrollUpButton: () => attrs } } })),
        })

        testAttrs({
          text: 'renderiza los atributos de ui.scrollDownButton',
          id: '[data-slot="select-scroll-down"]',
          assertId: false,
          mount: async (attrs) =>
            openSelect(mountSelectInline({ props: { ui: { scrollDownButton: () => attrs } } })),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'pasa atributos, class y style al trigger visible',
      id: '[data-slot="select-trigger"]',
      mount: (attrs) => mountSelect({ attrs }),
    })

    it('aplica el estilo destructivo cuando aria-invalid es true', () => {
      const wrapper = mountSelect({ attrs: { 'aria-invalid': 'true' } })
      const trigger = wrapper.get('[data-slot="select-trigger"]')

      expect(trigger.attributes('aria-invalid')).toBe('true')
      expect(trigger.classes()).toEqual(
        expect.arrayContaining(['border-destructive', 'ring-destructive/20']),
      )
    })

    it('usa el color primario para el foco visible', () => {
      const wrapper = mountSelect()
      const trigger = wrapper.get('[data-slot="select-trigger"]')

      expect(trigger.classes()).toEqual(
        expect.arrayContaining(['focus-visible:border-primary', 'focus-visible:ring-primary/50']),
      )
    })
  })

  describe('emits', () => {
    describe('update:open', () => {
      it.each(casesOpen)('emite cuando $name', async ({ input, expected }) => {
        const wrapper = mountSelect()
        const root = wrapper.getComponent(SelectRoot)

        if (!input) {
          await root.vm.$emit('update:open', true)
          await nextTick()
        }

        await root.vm.$emit('update:open', input)
        await nextTick()

        expect(wrapper.emitted('update:open')).toEqual(expected)
      })
    })

    describe('update:value', () => {
      it('emite el valor seleccionado', async () => {
        const wrapper = await openSelect(mountSelectInline({ props: { value: 'apple' } }))

        const item = wrapper.findAll('[data-slot="select-item"]')[1]
        await item.trigger('focus')
        await item.trigger('keydown', { key: 'Enter' })
        await nextTick()
        await nextTick()

        expect(wrapper.emitted('update:value')).toEqual([['banana']])
        expect(wrapper.get('[data-slot="select-trigger"]').attributes('aria-expanded')).toBe(
          'false',
        )
      })

      it('no emite al interactuar con una opción disabled', async () => {
        const wrapper = await openSelect(mountSelectInline({ props: { value: 'apple' } }))

        await wrapper.findAll('[data-slot="select-item"]')[2].trigger('pointerup')

        expect(wrapper.emitted('update:value')).toBeUndefined()
      })
    })

    it('no expone el emit eliminado valueChange', async () => {
      const wrapper = await openSelect(mountSelectInline({ props: { value: 'apple' } }))

      const item = wrapper.get('[data-slot="select-item"]')
      await item.trigger('focus')
      await item.trigger('keydown', { key: 'Enter' })
      await nextTick()
      await nextTick()

      expect(wrapper.emitted('valueChange')).toBeUndefined()
    })
  })

  describe('slots', () => {
    it.each(casesSlot)('renderiza el slot $name', async ({ slot, selector, text, props, open }) => {
      const wrapper = mountSelectInline({
        props,
        slots: {
          [slot]: () => h('span', { 'data-test-select-slot': slot }, text),
        },
      })

      if (open) await openSelect(wrapper)

      expect(wrapper.get(selector).text()).toBe(text)
    })

    it('pasa SelectContext al slot value', () => {
      let context: SelectContext | undefined

      mountSelectInline({
        props: { value: 'apple' },
        slots: {
          value: (slotContext: SelectContext) => {
            context ??= slotContext
            return h('span')
          },
        },
      })

      expect(context).toEqual({ value: 'apple', open: false })
    })
  })

  describe('context contract', () => {
    describe('SelectContext', () => {
      it.each(casesSelectContext)(
        'crea el contrato para $name',
        async ({ props, open, expected }) => {
          let context: SelectContext | undefined
          const wrapper = mountSelectInline({
            props,
            slots: {
              icon: (slotContext: SelectContext) => {
                context = slotContext
                return h('span')
              },
            },
          })

          if (open) await openSelect(wrapper)

          expect(context).toEqual(expected)
          expect(context).not.toHaveProperty('props')
        },
      )
    })

    describe('SelectItemContext', () => {
      it.each(casesItemContext)(
        'crea el contrato para $name',
        async ({ value, itemValue, expected }) => {
          let context: SelectItemContext | undefined
          const wrapper = mountSelectInline({
            props: {
              items,
              value,
              ui: {
                item: (itemContext) => {
                  if (itemContext.item.value === itemValue) context = itemContext
                  return {}
                },
              },
            },
          })

          await openSelect(wrapper)

          expect(context).toEqual(expected)
          expect(context).not.toHaveProperty('props')
        },
      )

      it('incluye el grupo padre en opciones agrupadas', async () => {
        let context: SelectItemContext | undefined
        const wrapper = mountSelectInline({
          props: {
            groups,
            value: 'apple',
            ui: {
              item: (itemContext) => {
                if (itemContext.item.value === 'carrot') context = itemContext
                return {}
              },
            },
          },
        })

        await openSelect(wrapper)

        expect(context).toEqual({
          value: 'apple',
          open: true,
          item: groups[1].items[0],
          index: 0,
          selected: false,
          group: groups[1],
        } satisfies SelectItemContext)
      })
    })

    describe('SelectGroupContext', () => {
      it.each(casesGroupContext)('crea el contrato para $name', async ({ label, expected }) => {
        let context: SelectGroupContext | undefined
        const wrapper = mountSelectInline({
          props: {
            groups,
            value: expected.value,
            ui: {
              group: (groupContext) => {
                if (groupContext.group.label === label) context = groupContext
                return {}
              },
            },
          },
        })

        await openSelect(wrapper)

        expect(context).toEqual(expected)
        expect(context).not.toHaveProperty('props')
      })
    })
  })

  describe('public exports', () => {
    it('expone Select y sus tipos normalizados sin SelectOption', () => {
      expect(Select).toBeDefined()
      expect(selectDefaults).toBeDefined()
    })
  })
})
