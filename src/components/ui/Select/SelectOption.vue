<script setup lang="ts">
import { computed } from 'vue'
import { SelectItem as RekaSelectItem, SelectItemIndicator, SelectItemText } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { IconProps } from '@/components/ui/Icon'
import type { SelectItemContext, SelectSlots, SelectUI } from '.'

const props = defineProps<{
  context: SelectItemContext
  ui?: SelectUI
}>()
defineSlots<SelectSlots>()

const itemProps = computed(() => {
  const ui = useUi(props.ui?.item, props.context)

  return {
    ...ui,
    value: props.context.item.value,
    disabled: props.context.item.disabled,
    textValue: props.context.item.textValue,
    class: cn(
      'relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      ui.class,
    ),
    style: ui.style,
  }
})

const itemTextProps = computed(() => {
  const ui = useUi(props.ui?.itemText, props.context)
  return { ...ui, class: cn('flex-1', ui.class), style: ui.style }
})

const indicatorProps = computed(() => {
  const ui = useUi(props.ui?.indicator, props.context)
  return {
    ...ui,
    class: cn('ml-auto flex size-4 items-center justify-center', ui.class),
    style: ui.style,
  }
})

const iconProps = computed<IconProps>(() => props.context.item.icon!)
</script>

<template>
  <RekaSelectItem v-bind="itemProps" data-slot="select-item">
    <slot name="item-leading" v-bind="context">
      <Icon v-if="context.item.icon" v-bind="iconProps" data-slot="select-item-icon" />
    </slot>

    <SelectItemText v-bind="itemTextProps" data-slot="select-item-text">
      <slot name="item-label" v-bind="context">
        <slot name="item" v-bind="context">
          {{ context.item.label }}
        </slot>
      </slot>
    </SelectItemText>

    <SelectItemIndicator v-bind="indicatorProps" data-slot="select-item-indicator">
      <slot name="indicator" v-bind="context">
        <Icon name="check" class="size-4" />
      </slot>
    </SelectItemIndicator>
  </RekaSelectItem>
</template>
