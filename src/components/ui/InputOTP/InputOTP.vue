<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { PinInputInput, PinInputRoot } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  type InputOTPContext,
  type InputOTPGroupContext,
  type InputOTPInputContext,
  type InputOTPProps,
  type InputOTPSeparatorContext,
  type InputOTPSlots,
  type InputOTPValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputOTPProps>(), {
  maxlength: 6,
  separator: true,
  otp: true,
  type: 'text',
  input: undefined,
  groups: undefined,
  ui: undefined,
})
const emit = defineEmits<{
  complete: [value: InputOTPValue]
  valueChange: [value: InputOTPValue]
}>()
const slots = defineSlots<InputOTPSlots>()
const attrs = useAttrs()
const value = defineModel<InputOTPValue>('value', { default: () => [] })

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const inputOTPContext = computed<InputOTPContext>(() => {
  const { ui, ...inputOTPProps } = props
  void ui

  return { props: inputOTPProps, value: value.value }
})

const groupSizes = computed(() => {
  const maxlength = Math.max(1, Math.floor(props.maxlength))
  const requested = props.groups
    ?.map((size) => Math.floor(size))
    .filter((size) => Number.isFinite(size) && size > 0)

  if (!requested?.length) return [maxlength]

  const sizes: number[] = []
  let remaining = maxlength

  for (const size of requested) {
    if (remaining === 0) break
    const nextSize = Math.min(size, remaining)
    sizes.push(nextSize)
    remaining -= nextSize
  }

  if (remaining > 0) sizes.push(remaining)
  return sizes
})

const groupContexts = computed(() => {
  let startIndex = 0

  return groupSizes.value.map((size, groupIndex, allGroups) => {
    const context: InputOTPGroupContext = {
      groupIndex,
      size,
      startIndex,
      first: groupIndex === 0,
      last: groupIndex === allGroups.length - 1,
    }

    startIndex += size
    return context
  })
})

function getInputContexts(groupContext: InputOTPGroupContext): InputOTPInputContext[] {
  return Array.from({ length: groupContext.size }, (_, indexInGroup) => ({
    ...groupContext,
    index: groupContext.startIndex + indexInGroup,
    indexInGroup,
    firstInGroup: indexInGroup === 0,
    lastInGroup: indexInGroup === groupContext.size - 1,
  }))
}

function getSeparatorContext(index: number): InputOTPSeparatorContext | undefined {
  const previousGroup = groupContexts.value[index]
  const nextGroup = groupContexts.value[index + 1]
  if (!previousGroup || !nextGroup) return undefined

  return { index, previousGroup, nextGroup }
}

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, inputOTPContext.value))

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
    placeholder: props.placeholder,
    mask: props.mask,
    otp: props.otp,
    type: props.type,
    dir: props.dir,
    disabled: props.disabled,
    id: props.id,
    name: props.name,
    required: props.required,
    onComplete: (completedValue: InputOTPValue) => emit('complete', completedValue),
    class: cn('flex items-center gap-2', attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

function getGroupProps(context: InputOTPGroupContext) {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.group, context))
  return { ...ui, class: cn('flex items-center', ui.class), style: ui.style }
}

function getInputProps(context: InputOTPInputContext) {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.input, context))
  return {
    ...ui,
    as: props.input?.as,
    asChild: props.input?.asChild,
    disabled: props.input?.disabled,
    index: context.index,
    'aria-invalid': attrs['aria-invalid'],
    class: cn(
      'relative size-9 border-y border-r border-input bg-transparent text-center text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md focus:z-10 focus:border-primary focus:ring-3 focus:ring-primary/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
      ui.class,
    ),
    style: ui.style,
  }
}

function getSeparatorProps(context: InputOTPSeparatorContext) {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.separator, context))
  return { ...ui, class: cn(ui.class), style: ui.style }
}
</script>

<template>
  <PinInputRoot v-slot="context" v-model="value" v-bind="rootProps" data-slot="input-otp">
    <slot v-if="slots.default" v-bind="context" />

    <template v-for="(groupContext, groupIndex) in groupContexts" v-else :key="groupIndex">
      <div v-bind="getGroupProps(groupContext)" data-slot="input-otp-group">
        <PinInputInput
          v-for="inputContext in getInputContexts(groupContext)"
          :key="inputContext.index"
          v-bind="getInputProps(inputContext)"
          data-slot="input-otp-input"
        />
      </div>

      <div
        v-if="props.separator && getSeparatorContext(groupIndex)"
        v-bind="getSeparatorProps(getSeparatorContext(groupIndex)!)"
        data-slot="input-otp-separator"
        role="separator"
      >
        <slot :name="`separator-${groupIndex}`" v-bind="getSeparatorContext(groupIndex)!">
          <slot name="separator" v-bind="getSeparatorContext(groupIndex)!">
            <Icon name="minus" />
          </slot>
        </slot>
      </div>
    </template>
  </PinInputRoot>
</template>
