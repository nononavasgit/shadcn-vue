<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })
type ErrorValue = string | { message?: string } | null | undefined
interface Props extends PrimitiveProps {
  errors?: ErrorValue[]
}
const props = withDefaults(defineProps<Props>(), { as: 'div', errors: () => [] })
const attrs = useAttrs()
const messages = computed(() => [
  ...new Set(
    (props.errors ?? [])
      .map((error) => (typeof error === 'string' ? error : error?.message))
      .filter((message): message is string => Boolean(message)),
  ),
])
const rootProps = computed(() => {
  const rest = { ...attrs }
  delete rest.class
  return { ...rest, as: props.as, asChild: props.asChild }
})
</script>

<template>
  <Primitive
    v-if="$slots.default || messages.length"
    v-bind="rootProps"
    role="alert"
    data-slot="field-error"
    :class="cn('text-sm font-normal text-destructive', attrs.class)"
  >
    <slot :errors="messages">
      <template v-if="messages.length === 1">{{ messages[0] }}</template>
      <ul v-else class="ml-4 flex list-disc flex-col gap-1">
        <li v-for="message in messages" :key="message">{{ message }}</li>
      </ul>
    </slot>
  </Primitive>
</template>
