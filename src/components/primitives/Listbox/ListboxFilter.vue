<script setup lang="ts">
import { computed } from 'vue'
import type { ListboxFilterEmits, ListboxFilterProps } from 'reka-ui'
import { ListboxFilter as ListboxFilterPrimitive, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<ListboxFilterProps>()
const emit = defineEmits<ListboxFilterEmits>()
defineSlots<{
  default?(props: { modelValue: string }): unknown
}>()

const forwarded = useForwardPropsEmits(
  computed(() => props),
  emit,
)
</script>

<template>
  <ListboxFilterPrimitive v-bind="{ ...forwarded, ...$attrs }">
    <template #default="{ modelValue }">
      <slot :model-value="modelValue" />
    </template>
  </ListboxFilterPrimitive>
</template>
