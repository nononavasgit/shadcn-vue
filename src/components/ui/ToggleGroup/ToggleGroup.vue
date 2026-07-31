<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  ToggleGroup as ToggleGroupBase,
  ToggleGroupItem as ToggleGroupItemBase,
} from '@/components/primitives/ToggleGroup'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { toggleVariants } from '@/components/ui/Toggle'
import { useColor } from '@/composables'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type {
  ToggleGroupProps,
  ToggleGroupSlots,
  ToggleGroupUIContext,
  ToggleGroupUIValue,
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

const attrs = useAttrs()
const model = defineModel<ToggleGroupValue | ToggleGroupValue[]>()
const { colorStyle } = useColor(
  computed(() => props.color),
  'toggle',
)

function isSelected(value: ToggleGroupValue) {
  return Array.isArray(model.value)
    ? model.value.some((selectedValue) => Object.is(selectedValue, value))
    : Object.is(model.value, value)
}

function updateModel(value: ToggleGroupValue | ToggleGroupValue[] | undefined) {
  const deselectsLastItem =
    props.type === 'multiple' ? Array.isArray(value) && value.length === 0 : value === undefined

  if (props.mandatory && deselectsLastItem) return

  model.value = value
}

function resolveUI<T>(value: ToggleGroupUIValue<T> | undefined, context: ToggleGroupUIContext) {
  return typeof value === 'function'
    ? (value as (context: ToggleGroupUIContext) => T)(context)
    : value
}

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      type: props.type,
      defaultValue: props.defaultValue,
      rovingFocus: props.rovingFocus,
      orientation: props.orientation,
      dir: props.dir,
      loop: props.loop,
      spacing: props.spacing,
      class: cn(attrs.class, rootUI.class),
      style: [colorStyle.value, attrs.style, rootUI.style],
    },
    items: props.items.map((item, index) => {
      const context: ToggleGroupUIContext = {
        item,
        index,
        selected: isSelected(item.value),
        first: index === 0,
        last: index === props.items.length - 1,
      }
      const itemUI = normalizeHTMLAttributes(resolveUI(props.ui?.item, context))
      const iconUI = normalizeHTMLAttributes(resolveUI(props.ui?.icon, context))
      const labelUI = normalizeHTMLAttributes(resolveUI(props.ui?.label, context))
      const trailingIconUI = normalizeHTMLAttributes(resolveUI(props.ui?.trailingIcon, context))
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
          trailing: `trailing-${key}` as `trailing-${string}`,
        },
        item: {
          ...itemUI,
          value: item.value,
          disabled: item.disabled,
          as: item.as,
          asChild: item.asChild,
          'data-variant': props.variant,
          'data-severity': props.severity,
          'data-size': props.size,
          class: cn(
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
          ...iconUI,
          ...icon,
          class: cn(iconUI.class),
          style: [iconUI.style],
        },
        label: {
          ...labelUI,
          class: cn(labelUI.class),
          style: labelUI.style,
        },
        trailingIcon: {
          ...trailingIconUI,
          ...trailingIcon,
          class: cn(trailingIconUI.class),
          style: [trailingIconUI.style],
        },
      }
    }),
  }
})
</script>

<template>
  <ToggleGroupBase
    :model-value="model"
    v-bind="calculatedUI.root"
    @update:model-value="updateModel"
  >
    <template v-if="calculatedUI.items.length">
      <ToggleGroupItemBase v-for="item in calculatedUI.items" :key="item.key" v-bind="item.item">
        <slot :name="item.slots.item" v-bind="item.context">
          <slot name="item" v-bind="item.context">
            <slot :name="item.slots.leading" v-bind="item.context">
              <slot name="leading" v-bind="item.context">
                <Icon v-if="item.icon.name" v-bind="item.icon" :name="item.icon.name" />
              </slot>
            </slot>

            <span v-if="item.data.label" v-bind="item.label">{{ item.data.label }}</span>

            <slot :name="item.slots.trailing" v-bind="item.context">
              <slot name="trailing" v-bind="item.context">
                <Icon
                  v-if="item.trailingIcon.name"
                  v-bind="item.trailingIcon"
                  :name="item.trailingIcon.name"
                />
              </slot>
            </slot>
          </slot>
        </slot>
      </ToggleGroupItemBase>
    </template>

    <slot v-else :model-value="model" />
  </ToggleGroupBase>
</template>
