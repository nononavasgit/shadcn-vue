<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Time as TimeBase } from '@/components/ui/Time'
import { useFechas } from '@/composables/useFechas'
import type { TimeProps, TimeSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<TimeSlots>()

const props = defineProps<TimeProps>()
const attrs = useAttrs()
const { formatearFecha, aDatetime } = useFechas()

const fechaFormateada = computed(() =>
  formatearFecha(props.datetime, {
    locale: props.locale,
    formato: props.formato,
  }),
)

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    datetime: aDatetime(props.datetime),
    'data-allow-mismatch': true,
  },
}))
</script>

<template>
  <TimeBase v-bind="uiCalculado.raiz">
    <slot :fecha="fechaFormateada">{{ fechaFormateada }}</slot>
  </TimeBase>
</template>
