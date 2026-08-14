<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { createCardContext, type CardProps, type CardSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CardProps>(), {
  label: undefined,
  description: undefined,
  ui: undefined,
})
defineSlots<CardSlots>()

const cardContext = computed(() => createCardContext(props))

const attrs = useAttrs()
const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(
      'flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm',
      attrs.class,
    ),
    style: attrs.style,
  }
})

const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, cardContext.value)
  return {
    ...ui,
    class: cn(
      '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-test-card-action:grid-cols-[1fr_auto] [.border-b]:pb-6',
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
  <div v-bind="rootProps" data-test-card-root>
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
      data-test-card-header
    >
      <slot name="header" v-bind="cardContext">
        <h3 v-if="props.label || $slots.label" v-bind="labelProps" data-test-card-label>
          <slot name="label" v-bind="cardContext">{{ props.label }}</slot>
        </h3>

        <p
          v-if="props.description || $slots.description"
          v-bind="descriptionProps"
          data-test-card-description
        >
          <slot name="description" v-bind="cardContext">{{ props.description }}</slot>
        </p>
      </slot>

      <div v-if="$slots.action" v-bind="actionProps" data-test-card-action>
        <slot name="action" v-bind="cardContext" />
      </div>
    </div>

    <div v-if="$slots.default" v-bind="contentProps" data-test-card-content>
      <slot v-bind="cardContext" />
    </div>

    <div v-if="$slots.footer" v-bind="footerProps" data-test-card-footer>
      <slot name="footer" v-bind="cardContext" />
    </div>
  </div>
</template>
