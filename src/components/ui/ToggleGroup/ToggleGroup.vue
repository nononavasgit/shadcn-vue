<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { toggleVariants } from '@/components/ui/Toggle'
import { useColor } from '@/composables'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { IconProps } from '@/components/ui/Icon'
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

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, toggleGroupContext.value))

  return {
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
  }
})

const itemContexts = computed<ToggleGroupItemContext[]>(() =>
  props.items.map((item, index) => ({
    ...toggleGroupContext.value,
    item,
    index,
    selected: isSelected(item.value),
    first: index === 0,
    last: index === props.items.length - 1,
  })),
)

function getItemProps(context: ToggleGroupItemContext) {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.item, context))
  return {
    ...ui,
    as: context.item.as,
    asChild: context.item.asChild,
    value: context.item.value,
    disabled: context.item.disabled,
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
      ui.class,
    ),
    style: ui.style,
  }
}

function getLabelProps(context: ToggleGroupItemContext) {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.label, context))
  return { ...ui, class: cn(ui.class), style: ui.style }
}

function getIconProps(context: ToggleGroupItemContext): IconProps {
  return normalizeIconProps(context.item.icon)!
}

function getTrailingIconProps(context: ToggleGroupItemContext): IconProps {
  return normalizeIconProps(context.item.trailingIcon)!
}

function getSlotNames(context: ToggleGroupItemContext) {
  const key = getKey(context)
  return {
    item: `item-${key}` as `item-${string}`,
    leading: `leading-${key}` as `leading-${string}`,
    label: `label-${key}` as `label-${string}`,
    trailing: `trailing-${key}` as `trailing-${string}`,
  }
}

function getKey(context: ToggleGroupItemContext) {
  return String(context.item.id)
}
</script>

<template>
  <ToggleGroupRoot v-bind="rootProps" v-model="value">
    <slot v-bind="toggleGroupContext">
      <ToggleGroupItem
        v-for="itemContext in itemContexts"
        :key="getKey(itemContext)"
        v-bind="getItemProps(itemContext)"
      >
        <slot :name="getSlotNames(itemContext).item" v-bind="itemContext">
          <slot name="item" v-bind="itemContext">
            <slot :name="getSlotNames(itemContext).leading" v-bind="itemContext">
              <slot name="leading" v-bind="itemContext">
                <Icon
                  v-if="itemContext.item.icon"
                  v-bind="getIconProps(itemContext)"
                  data-slot="toggle-group-icon"
                />
              </slot>
            </slot>

            <slot :name="getSlotNames(itemContext).label" v-bind="itemContext">
              <slot name="label" v-bind="itemContext">
                <span v-bind="getLabelProps(itemContext)">{{ itemContext.item.label }}</span>
              </slot>
            </slot>

            <slot :name="getSlotNames(itemContext).trailing" v-bind="itemContext">
              <slot name="trailing" v-bind="itemContext">
                <Icon
                  v-if="itemContext.item.trailingIcon"
                  v-bind="getTrailingIconProps(itemContext)"
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
