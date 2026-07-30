<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { MinusIcon } from '@lucide/vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const separatorAttrs = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return restAttrs
})
</script>

<template>
  <div
    v-bind="separatorAttrs"
    data-slot="input-otp-separator"
    role="separator"
    :class="attrs.class"
  >
    <slot>
      <MinusIcon />
    </slot>
  </div>
</template>
