<script setup lang="ts">
import { computed } from 'vue'
import {
  ListboxItem as RekaListboxItem,
  ListboxItemIndicator as RekaListboxItemIndicator,
} from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useNormalizeIconProps } from '@/composables/useNormalizeIconProps'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { IconProps } from '@/components/ui/Icon'
import type { ListboxItemContext, ListboxSlots, ListboxUI } from '.'

const props = defineProps<{
  context: ListboxItemContext
  ui?: ListboxUI
}>()
defineSlots<ListboxSlots>()

const itemProps = computed(() => {
  const ui = useUi(props.ui?.item, props.context)

  return {
    ...ui,
    value: props.context.item.value,
    disabled: props.context.item.disabled,
    class: cn(
      'relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      ui.class,
    ),
    style: ui.style,
  }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, props.context)
  return { ...ui, class: cn('flex-1', ui.class), style: ui.style }
})

const indicatorProps = computed(() => {
  const ui = useUi(props.ui?.indicator, props.context)
  return { ...ui, class: cn('ml-auto flex size-4 items-center justify-center', ui.class) }
})

const iconProps = computed<IconProps>(() => useNormalizeIconProps(props.context.item.icon)!)

const key = computed(() => props.context.item.id ?? String(props.context.item.value))
const itemSlot = computed(() => `item-${key.value}` as `item-${string}`)
const leadingSlot = computed(() => `item-leading-${key.value}` as `item-leading-${string}`)
</script>

<template>
  <RekaListboxItem v-bind="itemProps" data-slot="listbox-item">
    <slot :name="itemSlot" v-bind="context">
      <slot name="item" v-bind="context">
        <slot :name="leadingSlot" v-bind="context">
          <slot name="item-leading" v-bind="context">
            <Icon v-if="context.item.icon" v-bind="iconProps" data-slot="listbox-item-icon" />
          </slot>
        </slot>

        <span v-bind="labelProps">{{ context.item.label }}</span>

        <RekaListboxItemIndicator v-bind="indicatorProps" data-slot="listbox-item-indicator">
          <slot name="indicator" v-bind="context">
            <Icon name="check" class="size-4" />
          </slot>
        </RekaListboxItemIndicator>
      </slot>
    </slot>
  </RekaListboxItem>
</template>
