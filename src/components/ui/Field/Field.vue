<script setup lang="ts">
import { computed, useAttrs, useId, useSlots } from 'vue'
import {
  Field as FieldBase,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/primitives/Field'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { FieldControlSlotProps, FieldErrorValue, FieldProps, FieldSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FieldProps>(), {
  as: 'div',
  name: undefined,
  errorPattern: undefined,
  id: undefined,
  label: undefined,
  description: undefined,
  help: undefined,
  hint: undefined,
  error: undefined,
  errors: () => [],
  invalid: undefined,
  required: false,
  orientation: 'vertical',
  controlPosition: 'start',
  ui: undefined,
})
defineSlots<FieldSlots>()

const attrs = useAttrs()
const slots = useSlots()
const generatedId = useId()
const controlId = computed(() => props.id ?? generatedId)
const messages = computed<FieldErrorValue[]>(() => {
  const values = props.errors?.length
    ? props.errors
    : typeof props.error === 'string' || (props.error && typeof props.error === 'object')
      ? [props.error]
      : []
  return [...new Set(values)]
})
const hasError = computed(() => Boolean(messages.value.length || slots.error))
const isInvalid = computed(
  () => props.invalid ?? (props.error === true || messages.value.length > 0),
)
const hasLabel = computed(() => Boolean(props.label || slots.label || props.hint || slots.hint))
const hasDescription = computed(() => Boolean(props.description || slots.description))
const hasHelp = computed(() => Boolean(props.help || slots.help))
const hasHint = computed(() => Boolean(props.hint || slots.hint))
const a11yAttrs = computed(() => ({
  id: controlId.value,
  'aria-invalid': isInvalid.value || undefined,
  'aria-describedby':
    [
      hasHint.value ? `${controlId.value}-hint` : '',
      hasDescription.value ? `${controlId.value}-description` : '',
      hasHelp.value && !isInvalid.value ? `${controlId.value}-help` : '',
      hasError.value ? `${controlId.value}-error` : '',
    ]
      .filter(Boolean)
      .join(' ') || undefined,
}))
const controlSlotProps = computed<FieldControlSlotProps>(() => ({
  id: controlId.value,
  invalid: isInvalid.value,
  error: props.error,
  a11yAttrs: a11yAttrs.value,
  ...a11yAttrs.value,
}))

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const wrapperUI = normalizeHTMLAttributes(props.ui?.wrapper)
  const labelWrapperUI = normalizeHTMLAttributes(props.ui?.labelWrapper)
  const labelUI = normalizeHTMLAttributes(props.ui?.label)
  const descriptionUI = normalizeHTMLAttributes(props.ui?.description)
  const hintUI = normalizeHTMLAttributes(props.ui?.hint)
  const helpUI = normalizeHTMLAttributes(props.ui?.help)
  const errorUI = normalizeHTMLAttributes(props.ui?.error)

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    wrapper: { ...wrapperUI, class: cn(wrapperUI.class), style: wrapperUI.style },
    labelWrapper: {
      ...labelWrapperUI,
      class: cn('flex content-center items-center justify-between gap-1', labelWrapperUI.class),
      style: labelWrapperUI.style,
    },
    label: { ...labelUI, class: cn('text-foreground', labelUI.class), style: labelUI.style },
    description: {
      ...descriptionUI,
      class: cn('mt-1', descriptionUI.class),
      style: descriptionUI.style,
    },
    hint: { ...hintUI, class: cn('text-muted-foreground', hintUI.class), style: hintUI.style },
    help: { ...helpUI, class: cn('mt-1', helpUI.class), style: helpUI.style },
    error: { ...errorUI, class: cn('mt-1', errorUI.class), style: errorUI.style },
  }
})
</script>

<template>
  <FieldBase
    v-bind="calculatedUI.root"
    :as="as"
    :orientation="orientation"
    :data-invalid="isInvalid || undefined"
  >
    <FieldContent v-bind="calculatedUI.wrapper">
      <div v-if="hasLabel" v-bind="calculatedUI.labelWrapper" data-slot="field-label-wrapper">
        <FieldLabel v-bind="calculatedUI.label" :for="controlId">
          <slot name="label" :label="label">{{ label }}</slot>
        </FieldLabel>
        <span v-if="hint || $slots.hint" v-bind="calculatedUI.hint" data-slot="field-hint">
          <slot name="hint" :hint="hint">{{ hint }}</slot>
        </span>
      </div>
      <FieldDescription
        v-if="hasDescription"
        v-bind="calculatedUI.description"
        :id="`${controlId}-description`"
      >
        <slot name="description" :description="description">{{ description }}</slot>
      </FieldDescription>

      <slot v-bind="controlSlotProps" />

      <FieldDescription
        v-if="hasHelp && !isInvalid"
        v-bind="calculatedUI.help"
        :id="`${controlId}-help`"
        data-slot="field-help"
      >
        <slot name="help" :help="help">{{ help }}</slot>
      </FieldDescription>
      <FieldError
        v-if="hasError"
        v-bind="calculatedUI.error"
        :id="`${controlId}-error`"
        :errors="messages"
      >
        <template v-if="$slots.error" #default>
          <slot name="error" :error="error" :errors="messages" />
        </template>
      </FieldError>
    </FieldContent>
  </FieldBase>
</template>
