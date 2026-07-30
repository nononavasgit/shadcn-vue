<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  InputOTP as InputOTPBase,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/InputOTP'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { INPUT_OTP_PATTERNS } from './patterns'
import type {
  InputOTPEmits,
  InputOTPGroupContext,
  InputOTPProps,
  InputOTPSlots,
  InputOTPUIValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputOTPProps>(), {
  maxlength: 6,
  separator: true,
  textAlign: 'center',
  inputmode: 'numeric',
  pushPasswordManagerStrategy: 'increase-width',
})
const emit = defineEmits<InputOTPEmits>()
const slots = defineSlots<InputOTPSlots>()
const attrs = useAttrs()
const model = defineModel<string>()

function resolveUI<T, C>(value: InputOTPUIValue<T, C> | undefined, context: C) {
  return typeof value === 'function' ? (value as (context: C) => T)(context) : value
}

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

const calculatedGroups = computed(() => {
  let startIndex = 0

  const groups = groupSizes.value.map((size, groupIndex, allGroups) => {
    const context: InputOTPGroupContext = {
      groupIndex,
      size,
      startIndex,
      first: groupIndex === 0,
      last: groupIndex === allGroups.length - 1,
    }
    const groupUI = resolveUI(props.ui?.group, context)
    const group = {
      key: `group-${groupIndex}`,
      context,
      ui: {
        ...groupUI,
        class: cn(groupUI?.class),
      },
      slots: Array.from({ length: size }, (_, indexInGroup) => {
        const slotContext = {
          ...context,
          index: startIndex + indexInGroup,
          indexInGroup,
          firstInGroup: indexInGroup === 0,
          lastInGroup: indexInGroup === size - 1,
        }
        const slotUI = resolveUI(props.ui?.slot, slotContext)

        return {
          key: `slot-${slotContext.index}`,
          context: slotContext,
          ui: {
            ...slotUI,
            'aria-invalid': attrs['aria-invalid'],
            class: cn(
              'data-[active=true]:border-primary data-[active=true]:ring-primary/50',
              slotUI?.class,
            ),
          },
        }
      }),
    }

    startIndex += size
    return group
  })

  return groups.map((group, index) => {
    const nextGroup = groups[index + 1]
    if (!nextGroup) return { ...group, separator: undefined }

    const separatorContext = {
      index,
      previousGroup: group.context,
      nextGroup: nextGroup.context,
    }
    const separatorUI = resolveUI(props.ui?.separator, separatorContext)

    return {
      ...group,
      separator: {
        context: separatorContext,
        slotName: `separator-${index}` as const,
        ui: {
          ...separatorUI,
          class: cn(separatorUI?.class),
        },
      },
    }
  })
})

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    maxlength: props.maxlength,
    defaultValue: props.defaultValue,
    textAlign: props.textAlign,
    inputmode: props.inputmode,
    containerClass: props.containerClass,
    pattern: props.pattern ? INPUT_OTP_PATTERNS[props.pattern] : undefined,
    pushPasswordManagerStrategy: props.pushPasswordManagerStrategy,
    noScriptCssFallback: props.noScriptCssFallback,
    pasteTransformer: props.pasteTransformer,
    onComplete: (value: string) => emit('complete', value),
    onInput: (value: string) => emit('input', value),
    class: cn(attrs.class),
  },
}))
</script>

<template>
  <InputOTPBase v-slot="rootSlotProps" v-model="model" v-bind="calculatedUI.root">
    <slot v-if="slots.default" v-bind="rootSlotProps" />

    <template v-for="group in calculatedGroups" v-else :key="group.key">
      <InputOTPGroup v-bind="group.ui">
        <InputOTPSlot
          v-for="otpSlot in group.slots"
          :key="otpSlot.key"
          v-bind="otpSlot.ui"
          :index="otpSlot.context.index"
        />
      </InputOTPGroup>

      <InputOTPSeparator v-if="props.separator && group.separator" v-bind="group.separator.ui">
        <slot :name="group.separator.slotName" v-bind="group.separator.context">
          <slot name="separator" v-bind="group.separator.context" />
          <Icon v-if="!slots.separator" name="minus" />
        </slot>
      </InputOTPSeparator>
    </template>
  </InputOTPBase>
</template>
