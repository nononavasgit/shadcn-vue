<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { toggleVariants } from '@/components/ui/Toggle'
import { useColor } from '@/composables'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import { normalizeToggleGroupItemProps } from '.'
import type {
  ToggleGroupContext,
  ToggleGroupItemContext,
  ToggleGroupModelValue,
  ToggleGroupProps,
  ToggleGroupSlots,
  ToggleGroupValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  type: 'single',
  rovingFocus: true,
  orientation: 'horizontal',
  loop: true,
  as: 'div',
  asChild: false,
  variant: 'plain',
  severity: 'default',
  size: 'md',
  color: undefined,
  spacing: 0,
  mandatory: false,
  items: () => [],
  ui: undefined,
})
defineSlots<ToggleGroupSlots>()
const emit = defineEmits<{ valueChange: [value: ToggleGroupModelValue] }>()

const attrs = useAttrs()
const model = defineModel<ToggleGroupModelValue>('value')
const value = computed<ToggleGroupModelValue>({
  get: () => model.value,
  set: (nextValue) => {
    if (props.mandatory) {
      if (nextValue === undefined) return
      if (Array.isArray(nextValue) && nextValue.length === 0) return
    }

    model.value = nextValue
  },
})
const { colorStyle } = useColor(
  computed(() => props.color),
  'toggle',
)

watch(model, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})
const spacingStyle = computed(
  () =>
    ({
      '--toggle-group-gap': `calc(var(--spacing) * ${props.spacing})`,
    }) as CSSProperties,
)

function isSelected(value: ToggleGroupValue) {
  return Array.isArray(toggleGroupContext.value.value)
    ? toggleGroupContext.value.value.some((selectedValue) => Object.is(selectedValue, value))
    : Object.is(toggleGroupContext.value.value, value)
}

const toggleGroupContext = computed<ToggleGroupContext>(() => {
  const { ui, ...toggleGroupProps } = props
  void ui

  return {
    props: toggleGroupProps,
    value: value.value,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, toggleGroupContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      type: props.type,
      rovingFocus: props.rovingFocus,
      orientation: props.orientation,
      dir: props.dir,
      loop: props.loop,
      disabled: props.disabled,
      name: props.name,
      required: props.required,
      'data-slot': 'toggle-group',
      'data-orientation': props.orientation ?? 'horizontal',
      'data-spacing': props.spacing,
      class: cn(
        'group/toggle-group flex w-fit items-center gap-(--toggle-group-gap) data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        props.spacing === 0 &&
          (props.orientation ?? 'horizontal') === 'horizontal' &&
          '[&>*]:rounded-none [&>*+*]:border-l-0 [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md',
        props.spacing === 0 &&
          props.orientation === 'vertical' &&
          '[&>*]:rounded-none [&>*+*]:border-t-0 [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md',
        attrs.class,
        rootUI.class,
      ),
      style: [colorStyle.value, spacingStyle.value, attrs.style, rootUI.style],
    },
    items: props.items.map((item, index) => {
      const context: ToggleGroupItemContext = {
        ...toggleGroupContext.value,
        item,
        index,
        selected: isSelected(item.value),
        first: index === 0,
        last: index === props.items.length - 1,
      }
      const itemUI = normalizeHTMLAttributes(useResolve(props.ui?.item, context))
      const labelUI = normalizeHTMLAttributes(useResolve(props.ui?.label, context))
      const itemProps = normalizeToggleGroupItemProps(item)
      const icon = normalizeIconProps(item.icon)
      const trailingIcon = normalizeIconProps(item.trailingIcon)
      const key = String(item.id)

      return {
        key,
        data: item,
        context,
        slots: {
          item: `item-${key}` as `item-${string}`,
          leading: `leading-${key}` as `leading-${string}`,
          label: `label-${key}` as `label-${string}`,
          trailing: `trailing-${key}` as `trailing-${string}`,
        },
        item: {
          ...itemUI,
          ...itemProps,
          'data-variant': props.variant,
          'data-severity': props.severity,
          'data-size': props.size,
          'data-slot': 'toggle-group-item',
          'data-orientation': props.orientation ?? 'horizontal',
          'data-spacing': props.spacing,
          class: cn(
            'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
            toggleVariants({
              variant: props.variant,
              severity: props.severity,
              size: props.size,
              color: Boolean(props.color),
            }),
            itemUI.class,
          ),
          style: itemUI.style,
        },
        icon: {
          ...icon,
        },
        label: {
          ...labelUI,
          class: cn(labelUI.class),
          style: labelUI.style,
        },
        trailingIcon: {
          ...trailingIcon,
        },
      }
    }),
  }
})
</script>

<template>
  <ToggleGroupRoot v-bind="calculatedUI.root" v-model="value">
    <slot v-bind="toggleGroupContext">
      <ToggleGroupItem v-for="item in calculatedUI.items" :key="item.key" v-bind="item.item">
        <slot :name="item.slots.item" v-bind="item.context">
          <slot name="item" v-bind="item.context">
            <slot :name="item.slots.leading" v-bind="item.context">
              <slot name="leading" v-bind="item.context">
                <Icon
                  v-if="item.icon?.name"
                  v-bind="item.icon"
                  :name="item.icon.name"
                  data-slot="toggle-group-icon"
                />
              </slot>
            </slot>

            <slot :name="item.slots.label" v-bind="item.context">
              <slot name="label" v-bind="item.context">
                <span v-bind="item.label">{{ item.data.label }}</span>
              </slot>
            </slot>

            <slot :name="item.slots.trailing" v-bind="item.context">
              <slot name="trailing" v-bind="item.context">
                <Icon
                  v-if="item.trailingIcon?.name"
                  v-bind="item.trailingIcon"
                  :name="item.trailingIcon.name"
                  data-slot="toggle-group-trailing-icon"
                />
              </slot>
            </slot>
          </slot>
        </slot>
      </ToggleGroupItem>
    </slot>
  </ToggleGroupRoot>
</template>
