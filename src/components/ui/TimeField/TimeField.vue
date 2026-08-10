<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { TimeFieldInput, TimeFieldRoot } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type { TranslationKey } from '@/i18n'
import type {
  TimeFieldContext,
  TimeFieldProps,
  TimeFieldSegment,
  TimeFieldSegmentContext,
  TimeFieldSlots,
  TimeFieldValue,
  TimeValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TimeFieldProps>(), {
  as: 'div',
  asChild: false,
  disabled: false,
  readonly: false,
  required: false,
  stepSnapping: false,
  segment: undefined,
  ui: undefined,
})
const emit = defineEmits<{
  valueChange: [value: TimeFieldValue]
  placeholderChange: [value: TimeValue]
}>()
defineSlots<TimeFieldSlots>()

const attrs = useAttrs()
const value = defineModel<TimeFieldValue>('value', { default: undefined })
const { t } = useI18n()

const segmentLabelKeys = {
  day: 'timeFieldDay',
  month: 'timeFieldMonth',
  year: 'timeFieldYear',
  hour: 'timeFieldHour',
  minute: 'timeFieldMinute',
  second: 'timeFieldSecond',
  dayPeriod: 'timeFieldDayPeriod',
  literal: 'timeFieldLiteral',
  timeZoneName: 'timeFieldTimeZoneName',
} satisfies Record<TimeFieldSegment['part'], TranslationKey>

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const timeFieldContext = computed<TimeFieldContext>(() => {
  const { ui, ...timeFieldProps } = props
  void ui

  return {
    props: timeFieldProps,
    value: value.value,
  }
})

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, timeFieldContext.value))

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
    defaultPlaceholder: props.defaultPlaceholder,
    hourCycle: props.hourCycle,
    step: props.step,
    stepSnapping: props.stepSnapping,
    granularity: props.granularity,
    hideTimeZone: props.hideTimeZone,
    maxValue: props.maxValue,
    minValue: props.minValue,
    locale: props.locale,
    disabled: props.disabled,
    readonly: props.readonly,
    required: props.required,
    name: props.name,
    id: props.id,
    dir: props.dir,
    'data-slot': 'time-field',
    class: cn(
      'inline-flex h-9 min-w-32 items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/50 data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-destructive data-[invalid]:ring-3 data-[invalid]:ring-destructive/20 dark:bg-input/30 dark:data-[invalid]:ring-destructive/40',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})

function getSegmentContext(
  segment: TimeFieldSegment,
  index: number,
  isInvalid: boolean,
): TimeFieldSegmentContext {
  return {
    ...timeFieldContext.value,
    segment,
    index,
    isInvalid,
  }
}
</script>

<template>
  <TimeFieldRoot v-slot="{ segments, isInvalid }" v-model="value" v-bind="rootProps">
    <template v-for="(item, index) in segments" :key="`${item.part}-${index}`">
      <TimeFieldInput
        :tabindex="props.readonly || props.disabled || item.part === 'literal' ? -1 : 0"
        :part="item.part"
        :aria-label="t(segmentLabelKeys[item.part])"
        :class="[
          item.part === 'literal' ? 'pointer-events-none' : undefined,
          'data-[placeholder]:text-green9 rounded p-0.5 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none',
        ]"
      >
        <slot
          v-if="item.part !== 'literal'"
          :name="item.part"
          v-bind="getSegmentContext(item, index, isInvalid)"
        >
          {{ item.value }}
        </slot>
        <template v-else>{{ item.value }} </template>
      </TimeFieldInput>
    </template>
  </TimeFieldRoot>
</template>
