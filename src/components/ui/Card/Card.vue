<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { CardContext, CardProps, CardSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CardProps>(), {
  label: undefined,
  description: undefined,
  ui: undefined,
})
defineSlots<CardSlots>()

const cardContext = computed<CardContext>(() => {
  const { ui, ...cardProps } = props
  void ui

  return {
    props: cardProps,
  }
})

const attrs = useAttrs()
const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, cardContext.value)
  return {
    ...attrs,
    ...rootUI,
    class: cn(
      'flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})

const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, cardContext.value)
  return {
    ...ui,
    class: cn(
      '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
      ui.class,
    ),
  }
})
const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, cardContext.value)
  return { ...ui, class: cn('leading-none font-semibold', ui.class) }
})
const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, cardContext.value)
  return { ...ui, class: cn('text-sm text-muted-foreground', ui.class) }
})
const actionProps = computed(() => {
  const ui = useUi(props.ui?.action, cardContext.value)
  return {
    ...ui,
    class: cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', ui.class),
  }
})
const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, cardContext.value)
  return { ...ui, class: cn('px-6', ui.class) }
})
const footerProps = computed(() => {
  const ui = useUi(props.ui?.footer, cardContext.value)
  return { ...ui, class: cn('flex items-center px-6 [.border-t]:pt-6', ui.class) }
})
</script>

<template>
  <div v-bind="rootProps" data-slot="card">
    <div
      v-if="
        props.label ||
        props.description ||
        $slots.header ||
        $slots.label ||
        $slots.description ||
        $slots.action
      "
      v-bind="headerProps"
      data-slot="card-header"
    >
      <slot name="header" v-bind="cardContext">
        <h3 v-if="props.label || $slots.label" v-bind="labelProps" data-slot="card-title">
          <slot name="label" v-bind="cardContext">{{ props.label }}</slot>
        </h3>

        <p
          v-if="props.description || $slots.description"
          v-bind="descriptionProps"
          data-slot="card-description"
        >
          <slot name="description" v-bind="cardContext">{{ props.description }}</slot>
        </p>
      </slot>

      <div v-if="$slots.action" v-bind="actionProps" data-slot="card-action">
        <slot name="action" v-bind="cardContext" />
      </div>
    </div>

    <div v-if="$slots.default" v-bind="contentProps" data-slot="card-content">
      <slot v-bind="cardContext" />
    </div>

    <div v-if="$slots.footer" v-bind="footerProps" data-slot="card-footer">
      <slot name="footer" v-bind="cardContext" />
    </div>
  </div>
</template>
