<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Input as InputBase } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import type { InputEmits, InputProps } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<InputProps>()
defineEmits<InputEmits>()

const attrs = useAttrs()
const valorModelo = defineModel<string | number>()

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    defaultValue: props.valorPredeterminado,
    class: cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class),
  },
}))
</script>

<template>
  <InputBase v-model="valorModelo" v-bind="uiCalculado.raiz" />
</template>
