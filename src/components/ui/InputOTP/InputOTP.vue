<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { PinInputInput, PinInputRoot } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import {
  normalizeInputOTPInputProps,
  resolveInputOTPUIValue,
  type InputOTPEmits,
  type InputOTPGroupContext,
  type InputOTPInputContext,
  type InputOTPProps,
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
const emit = defineEmits<InputOTPEmits>()
const slots = defineSlots<InputOTPSlots>()
const attrs = useAttrs()
const model = defineModel<InputOTPValue>({ default: () => [] })

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
  const inputProps = normalizeInputOTPInputProps(props.input)

  const groups = groupSizes.value.map((size, groupIndex, allGroups) => {
    const context: InputOTPGroupContext = {
      groupIndex,
      size,
      startIndex,
      first: groupIndex === 0,
      last: groupIndex === allGroups.length - 1,
    }
    const groupUI = normalizeHTMLAttributes(resolveInputOTPUIValue(props.ui?.group, context))
    const group = {
      key: `group-${groupIndex}`,
      context,
      ui: {
        ...groupUI,
        class: cn('flex items-center', groupUI.class),
        style: groupUI.style,
      },
      inputs: Array.from({ length: size }, (_, indexInGroup) => {
        const inputContext: InputOTPInputContext = {
          ...context,
          index: startIndex + indexInGroup,
          indexInGroup,
          firstInGroup: indexInGroup === 0,
          lastInGroup: indexInGroup === size - 1,
        }
        const inputUI = normalizeHTMLAttributes(
          resolveInputOTPUIValue(props.ui?.input, inputContext),
        )

        return {
          key: `input-${inputContext.index}`,
          context: inputContext,
          ui: {
            ...inputUI,
            ...inputProps,
            index: inputContext.index,
            'aria-invalid': attrs['aria-invalid'],
            class: cn(
              'relative size-9 border-y border-r border-input bg-transparent text-center text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md focus:z-10 focus:border-primary focus:ring-3 focus:ring-primary/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
              inputUI.class,
            ),
            style: inputUI.style,
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

    const context = {
      index,
      previousGroup: group.context,
      nextGroup: nextGroup.context,
    }
    const separatorUI = normalizeHTMLAttributes(
      resolveInputOTPUIValue(props.ui?.separator, context),
    )

    return {
      ...group,
      separator: {
        context,
        slotName: `separator-${index}` as const,
        ui: {
          ...separatorUI,
          class: cn(separatorUI.class),
          style: separatorUI.style,
        },
      },
    }
  })
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      defaultValue: props.defaultValue,
      placeholder: props.placeholder,
      mask: props.mask,
      otp: props.otp,
      type: props.type,
      dir: props.dir,
      disabled: props.disabled,
      id: props.id,
      name: props.name,
      required: props.required,
      onComplete: (value: InputOTPValue) => emit('complete', value),
      class: cn('flex items-center gap-2', attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <PinInputRoot v-slot="context" v-model="model" v-bind="calculatedUI.root" data-slot="input-otp">
    <slot v-if="slots.default" v-bind="context" />

    <template v-for="group in calculatedGroups" v-else :key="group.key">
      <div v-bind="group.ui" data-slot="input-otp-group">
        <PinInputInput
          v-for="input in group.inputs"
          :key="input.key"
          v-bind="input.ui"
          data-slot="input-otp-input"
        />
      </div>

      <div
        v-if="props.separator && group.separator"
        v-bind="group.separator.ui"
        data-slot="input-otp-separator"
        role="separator"
      >
        <slot :name="group.separator.slotName" v-bind="group.separator.context">
          <slot name="separator" v-bind="group.separator.context">
            <Icon name="minus" />
          </slot>
        </slot>
      </div>
    </template>
  </PinInputRoot>
</template>
