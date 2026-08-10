<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Primitive } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { FieldSetContext, FieldSetProps, FieldSetSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FieldSetProps>(), {
  as: 'fieldset',
  asChild: false,
  legend: undefined,
  description: undefined,
  legendVariant: 'legend',
  orientation: 'vertical',
  ui: undefined,
})
defineSlots<FieldSetSlots>()

const attrs = useAttrs()
const slots = useSlots()

const fieldSetContext = computed<FieldSetContext>(() => {
  const { ui, ...fieldSetProps } = props
  void ui
  return { props: fieldSetProps }
})

const rootProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.root, fieldSetContext.value))
  return {
    ...attrs,
    ...ui,
    'data-slot': 'field-set',
    class: cn('flex flex-col gap-6', attrs.class, ui.class),
    style: [attrs.style, ui.style],
  }
})

const legendProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.legend, fieldSetContext.value))
  return {
    ...ui,
    'data-slot': 'field-legend',
    'data-variant': props.legendVariant,
    class: cn(
      'mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
      ui.class,
    ),
    style: ui.style,
  }
})

const descriptionProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.description, fieldSetContext.value))
  return {
    ...ui,
    as: 'p' as const,
    'data-slot': 'field-description',
    class: cn(
      'text-sm leading-normal font-normal text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
      ui.class,
    ),
    style: ui.style,
  }
})

const groupProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.group, fieldSetContext.value))
  return {
    ...ui,
    as: 'div' as const,
    'data-slot': 'field-group',
    'data-orientation': props.orientation,
    class: cn('@container/field-group flex w-full flex-col gap-7', ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <fieldset v-bind="rootProps">
    <legend v-if="props.legend || slots.legend" v-bind="legendProps">
      <slot name="legend" v-bind="fieldSetContext">{{ props.legend }}</slot>
    </legend>

    <Primitive v-if="props.description || slots.description" v-bind="descriptionProps">
      <slot name="description" v-bind="fieldSetContext">{{ props.description }}</slot>
    </Primitive>

    <Primitive v-bind="groupProps">
      <slot v-bind="fieldSetContext" />
    </Primitive>
  </fieldset>
</template>
