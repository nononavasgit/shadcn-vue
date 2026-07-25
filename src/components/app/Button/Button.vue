<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { button as Button } from '@/components/ui/Button'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { buttonVariants, type ButtonEmits, type ButtonProps, type ButtonSlots } from '.'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const emit = defineEmits<ButtonEmits>()

defineSlots<ButtonSlots>()

const props = withDefaults(defineProps<ButtonProps>(), {
  label: undefined,
  variant: 'solid',
  severity: 'primary',
  size: 'md',
  rounded: false,
  square: false,
  loading: false,
  color: undefined,
  icon: undefined,
  trailingIcon: undefined,
  ui: undefined,
})

const iconLeading = computed(() =>
  typeof props.icon === 'string' ? { name: props.icon } : props.icon,
)
const iconTrailing = computed(() =>
  typeof props.trailingIcon === 'string' ? { name: props.trailingIcon } : props.trailingIcon,
)

const { colorStyle } = useColor(
  computed(() => props.color),
  'button',
)

const ariaDisabled = computed(() => {
  return props.loading || attrs['aria-disabled']
})

const ariaBusy = computed(() => {
  return props.loading || attrs['aria-busy']
})

const uiCalculado = computed(() => ({
  root: {
    ...attrs,
    'aria-busy': ariaBusy.value,
    'aria-disabled': ariaDisabled.value,
    class: cn(
      buttonVariants({
        variant: props.variant,
        severity: props.severity,
        size: props.size,
        rounded: props.rounded,
        square: props.square,
        color: Boolean(props.color),
      }),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  },
  icon: {
    ...props.ui?.icon,
    ...iconLeading.value,
    class: cn(props.ui?.icon?.class, iconLeading.value?.class),
  },
  trailingIcon: {
    ...props.ui?.trailingIcon,
    ...iconTrailing.value,
    class: cn(props.ui?.trailingIcon?.class, iconTrailing.value?.class),
  },
  loadingIcon: {
    ...props.ui?.loadingIcon,
    class: cn('animate-spin', props.ui?.loadingIcon?.class),
  },
}))

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
  <Button v-bind="uiCalculado.root" @click="handleClick">
    <template v-if="props.loading">
      <slot name="loading">
        <Icon v-bind="uiCalculado.loadingIcon" name="spinner" />
      </slot>
    </template>
    <slot v-else name="leading">
      <Icon
        v-if="uiCalculado.icon?.name"
        v-bind="{ ...uiCalculado?.icon, name: uiCalculado?.icon?.name }"
      />
    </slot>

    <slot>{{ label }}</slot>

    <slot name="trailing">
      <Icon
        v-if="uiCalculado.trailingIcon?.name"
        v-bind="{ ...uiCalculado.trailingIcon, name: uiCalculado?.trailingIcon?.name }"
      />
    </slot>
  </Button>
</template>
