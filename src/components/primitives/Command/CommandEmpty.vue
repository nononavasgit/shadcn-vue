<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { useCommand } from '.'

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.class
  return delegated
})
const { filterState } = useCommand()
const isRender = computed(() => Boolean(filterState.search) && filterState.filtered.count === 0)
</script>

<template>
  <Primitive
    v-if="isRender"
    v-bind="delegatedProps"
    data-slot="command-empty"
    :class="cn('py-6 text-center text-sm', props.class)"
  >
    <slot />
  </Primitive>
</template>
