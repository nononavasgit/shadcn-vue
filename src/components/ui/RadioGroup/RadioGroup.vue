<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import { RadioGroup as RadioGroupBase } from '@/components/primitives/RadioGroup'
import { Label } from '@/components/ui/Label'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { normalizeRadioGroupItemProps } from '.'
import RadioGroupItem from './RadioGroupItem.vue'
import type {
  RadioGroupEmits,
  RadioGroupProps,
  RadioGroupSlots,
  RadioGroupUIContext,
  RadioGroupValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<RadioGroupProps>(), {
  orientation: 'vertical',
  grouped: false,
  radioPosition: 'left',
  loop: true,
  as: 'div',
  asChild: false,
  items: () => [],
  ui: undefined,
})
defineEmits<RadioGroupEmits>()
defineSlots<RadioGroupSlots>()

const attrs = useAttrs()
const modelValue = defineModel<RadioGroupValue>()
const radioGroupId = useId()

function resolveUI<T>(
  value: T | ((context: RadioGroupUIContext) => T) | undefined,
  context: RadioGroupUIContext,
) {
  return typeof value === 'function'
    ? (value as (context: RadioGroupUIContext) => T)(context)
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
      defaultValue: props.defaultValue,
      disabled: props.disabled,
      name: props.name,
      orientation: props.orientation,
      dir: props.dir,
      loop: props.loop,
      required: props.required,
      rovingFocus: props.rovingFocus,
      class: cn(
        'grid gap-3',
        props.orientation === 'horizontal' && 'grid-flow-col auto-cols-fr',
        props.orientation === 'horizontal' && props.grouped && 'w-fit auto-cols-max',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
    items: props.items.map((item, index) => {
      const context: RadioGroupUIContext = {
        item,
        index,
        selected: Object.is(modelValue.value, item.value),
      }
      const key = String(item.value)
      const inputId = `${radioGroupId}-${key}`
      const itemUI = normalizeHTMLAttributes(resolveUI(props.ui?.item, context))
      const radioUI = normalizeHTMLAttributes(resolveUI(props.ui?.radio, context))
      const contentUI = normalizeHTMLAttributes(resolveUI(props.ui?.content, context))
      const labelUI = normalizeHTMLAttributes(resolveUI(props.ui?.label, context))
      const descriptionUI = normalizeHTMLAttributes(resolveUI(props.ui?.description, context))
      const radioProps = normalizeRadioGroupItemProps(item)

      return {
        key,
        data: item,
        context,
        radioPosition: props.radioPosition,
        slots: {
          leading: `leading-${key}` as `leading-${string}`,
          trailing: `trailing-${key}` as `trailing-${string}`,
        },
        item: {
          ...itemUI,
          for: inputId,
          class: cn(
            'flex cursor-pointer items-center gap-2 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
            itemUI?.class,
          ),
        },
        radio: {
          ...radioUI,
          ...radioProps,
          id: inputId,
          class: cn(radioUI.class),
        },
        content: {
          ...contentUI,
          class: cn('grid gap-1', contentUI.class),
        },
        label: {
          ...labelUI,
          class: cn('text-sm font-medium', labelUI.class),
        },
        description: {
          ...descriptionUI,
          class: cn('text-sm text-muted-foreground', descriptionUI.class),
        },
      }
    }),
  }
})
</script>

<template>
  <RadioGroupBase v-model="modelValue" v-bind="calculatedUI.root">
    <template v-if="calculatedUI.items.length">
      <template v-for="item in calculatedUI.items" :key="item.key">
        <slot name="item" v-bind="item.context">
          <Label v-bind="item.item">
            <slot :name="item.slots.leading" v-bind="item.context">
              <slot name="leading" v-bind="item.context" />
            </slot>

            <RadioGroupItem v-if="item.radioPosition === 'left'" v-bind="item.radio" />

            <span v-bind="item.content">
              <span v-bind="item.label">{{ item.data.label }}</span>
              <span v-if="item.data.description" v-bind="item.description">
                {{ item.data.description }}
              </span>
            </span>

            <RadioGroupItem v-if="item.radioPosition === 'right'" v-bind="item.radio" />

            <slot :name="item.slots.trailing" v-bind="item.context">
              <slot name="trailing" v-bind="item.context" />
            </slot>
          </Label>
        </slot>
      </template>
    </template>
    <slot v-else :model-value="modelValue" />
  </RadioGroupBase>
</template>
