<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useVueOTPContext } from 'vue-input-otp'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  index: number
}>()
const attrs = useAttrs()
const context = useVueOTPContext()
const slot = computed(() => context?.value.slots[props.index])
const slotAttrs = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return restAttrs
})
</script>

<template>
  <div
    v-bind="slotAttrs"
    data-slot="input-otp-slot"
    :data-active="slot?.isActive"
    :class="
      cn(
        'relative flex size-9 items-center justify-center border-y border-r border-input text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40',
        attrs.class,
      )
    "
  >
    {{ slot?.char }}
    <div
      v-if="slot?.hasFakeCaret"
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div class="h-4 w-px animate-caret-blink bg-foreground" />
    </div>
  </div>
</template>
