<script setup lang="ts">
import { computed, useAttrs, useId, watch } from 'vue'
import { RadioGroupRoot } from 'reka-ui'
import { Label } from '@/components/ui/Label'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { normalizeRadioGroupItemProps } from '.'
import RadioGroupItem from './RadioGroupItem.vue'
import type {
  RadioGroupContext,
  RadioGroupEmits,
  RadioGroupItemContext,
  RadioGroupProps,
  RadioGroupSlots,
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
defineSlots<RadioGroupSlots>()
const emit = defineEmits<RadioGroupEmits>()

const attrs = useAttrs()
const value = defineModel<RadioGroupValue>('value')
const radioGroupId = useId()

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const radioGroupContext = computed<RadioGroupContext>(() => {
  const { ui, ...radioGroupProps } = props
  void ui

  return {
    props: radioGroupProps,
    value: value.value,
  }
})

const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, radioGroupContext.value)

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
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
  }
})

function getKey(context: RadioGroupItemContext) {
  return String(context.item.value)
}

function getInputId(context: RadioGroupItemContext) {
  return `${radioGroupId}-${getKey(context)}`
}

const itemContexts = computed<RadioGroupItemContext[]>(() =>
  props.items.map((item, index) => ({
    ...radioGroupContext.value,
    item,
    index,
    selected: Object.is(value.value, item.value),
  })),
)

function getItemProps(context: RadioGroupItemContext) {
  const ui = useUi(props.ui?.item, context)

  return {
    ...ui,
    for: getInputId(context),
    class: cn(
      'flex cursor-pointer items-center gap-2 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
      ui.class,
    ),
    style: ui.style,
  }
}

function getRadioProps(context: RadioGroupItemContext) {
  const ui = useUi(props.ui?.radio, context)

  return {
    ...ui,
    ...normalizeRadioGroupItemProps(context.item),
    id: getInputId(context),
    class: cn(ui.class),
    style: ui.style,
  }
}

function getContentProps(context: RadioGroupItemContext) {
  const ui = useUi(props.ui?.content, context)
  return { ...ui, class: cn('grid gap-1', ui.class), style: ui.style }
}

function getLabelProps(context: RadioGroupItemContext) {
  const ui = useUi(props.ui?.label, context)
  return { ...ui, class: cn('text-sm font-medium', ui.class), style: ui.style }
}

function getDescriptionProps(context: RadioGroupItemContext) {
  const ui = useUi(props.ui?.description, context)
  return { ...ui, class: cn('text-sm text-muted-foreground', ui.class), style: ui.style }
}

function getSlotNames(context: RadioGroupItemContext) {
  const key = getKey(context)
  return {
    leading: `leading-${key}` as `leading-${string}`,
    trailing: `trailing-${key}` as `trailing-${string}`,
  }
}
</script>

<template>
  <RadioGroupRoot v-model="value" v-bind="rootProps" data-slot="radio-group">
    <template v-if="itemContexts.length">
      <template v-for="context in itemContexts" :key="getKey(context)">
        <slot name="item" v-bind="context">
          <Label v-bind="getItemProps(context)">
            <slot :name="getSlotNames(context).leading" v-bind="context">
              <slot name="leading" v-bind="context" />
            </slot>

            <RadioGroupItem v-if="props.radioPosition === 'left'" v-bind="getRadioProps(context)" />

            <span v-bind="getContentProps(context)">
              <span v-bind="getLabelProps(context)">{{ context.item.label }}</span>
              <span v-if="context.item.description" v-bind="getDescriptionProps(context)">
                {{ context.item.description }}
              </span>
            </span>

            <RadioGroupItem
              v-if="props.radioPosition === 'right'"
              v-bind="getRadioProps(context)"
            />

            <slot :name="getSlotNames(context).trailing" v-bind="context">
              <slot name="trailing" v-bind="context" />
            </slot>
          </Label>
        </slot>
      </template>
    </template>
    <slot v-else :value="value" />
  </RadioGroupRoot>
</template>
