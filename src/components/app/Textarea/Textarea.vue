<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Textarea as TextareaBase } from '@/components/ui/Textarea'
import { cn } from '@/lib/utils'
import type { TextareaEmits, TextareaProps } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TextareaProps>()
defineEmits<TextareaEmits>()

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
  <TextareaBase v-model="valorModelo" v-bind="uiCalculado.raiz" />
</template>
