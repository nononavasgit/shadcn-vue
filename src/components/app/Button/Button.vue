<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { button as Button } from '@/components/ui/Button'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonProps } from '.'

const attrs = useAttrs()

const emit = defineEmits<{
  click: [evt: MouseEvent]
}>()

defineSlots<{
  default?(): unknown
  leading?(): unknown
  loading?(): unknown
  trailing?(): unknown
}>()

const props = withDefaults(defineProps<ButtonProps>(), {
  label: undefined,
  variant: 'solid',
  severity: 'primary',
  size: 'md',
  rounded: false,
  square: false,
  loading: false,
  icon: undefined,
  trailingIcon: undefined,
})

const iconLeading = computed(() =>
  typeof props.icon === 'string' ? { name: props.icon } : props.icon,
)
const iconTrailing = computed(() =>
  typeof props.trailingIcon === 'string' ? { name: props.trailingIcon } : props.trailingIcon,
)

const ariaDisabled = computed(() => {
  return props.loading || attrs['aria-disabled']
})

const ariaBusy = computed(() => {
  return props.loading || attrs['aria-busy']
})

function handleClick(evt: MouseEvent) {
  if (ariaDisabled.value === true || ariaDisabled.value === 'true') {
    evt.preventDefault()
    evt.stopPropagation()
    return
  }

  emit('click', evt)
}
</script>

<template>
  <Button v-bind="attrs" :aria-busy="ariaBusy" :aria-disabled="ariaDisabled" :class="cn(
    buttonVariants({
      variant: props.variant,
      severity: props.severity,
      size: props.size,
      rounded: props.rounded,
      square: props.square,
    }),
    attrs.class,
  )
    " @click="handleClick">
    <template v-if="props.loading">
      <slot name="loading">
        <Icon name="spinner" class="animate-spin" />
      </slot>
    </template>
    <slot v-else name="leading">
      <Icon v-if="iconLeading" v-bind="iconLeading" />
    </slot>

    <slot>{{ label }}</slot>

    <slot name="trailing">
      <Icon v-if="iconTrailing" v-bind="iconTrailing" />
    </slot>
  </Button>
</template>
