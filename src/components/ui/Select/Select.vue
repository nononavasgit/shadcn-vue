<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import {
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type {
  SelectContext,
  SelectEmits,
  SelectGroupContext,
  SelectItemContext,
  SelectItem,
  SelectProps,
  SelectSlots,
} from '.'
import { selectDefaults } from './defaults'
import SelectOption from './SelectOption.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SelectProps>(), selectDefaults)
defineSlots<SelectSlots>()
const emit = defineEmits<SelectEmits>()

const attrs = useAttrs()
const value = defineModel<SelectProps['value']>('value')
const open = ref(false)

watch(open, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('update:open', nextValue)
})

watch(
  () => props.loading,
  (loading) => {
    if (loading) open.value = false
  },
)

const selectContext = computed<SelectContext>(() => ({
  value: value.value,
  open: open.value,
}))

const rootProps = computed(() => {
  const ui = useUi(props.ui?.root, selectContext.value)
  return {
    ...ui,
    class: cn('contents', ui.class),
    style: ui.style,
  }
})

const triggerProps = computed(() => {
  const ui = useUi(props.ui?.trigger, selectContext.value)
  const invalid = attrs['aria-invalid'] === true || attrs['aria-invalid'] === 'true'

  return {
    ...attrs,
    ...ui,
    disabled: props.disabled,
    'aria-busy': props.loading || attrs['aria-busy'],
    class: cn(
      'inline-flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 data-[placeholder]:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
      invalid &&
        'border-destructive ring-3 ring-destructive/20 focus-visible:border-destructive dark:ring-destructive/40',
      attrs.class,
      ui.class,
    ),
    style: [attrs.style, ui.style],
  }
})

const valueProps = computed(() => {
  const ui = useUi(props.ui?.value, selectContext.value)
  return {
    ...ui,
    placeholder: props.placeholder,
    class: cn('inline-flex min-w-0 items-center gap-2 truncate', ui.class),
    style: ui.style,
  }
})

const iconProps = computed(() => {
  const ui = useUi(props.ui?.icon, selectContext.value)
  return { ...ui, class: cn('size-4 shrink-0 opacity-50', ui.class), style: ui.style }
})

const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, selectContext.value)
  return {
    ...ui,
    position: 'popper' as const,
    sideOffset: 4,
    class: cn(
      'relative z-50 max-h-[var(--reka-select-content-available-height)] min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-[var(--reka-select-trigger-width)]',
      ui.class,
    ),
    style: ui.style,
  }
})

const viewportProps = computed(() => {
  const ui = useUi(props.ui?.viewport, selectContext.value)
  return { ...ui, class: cn('p-0', ui.class), style: ui.style }
})

const scrollUpButtonProps = computed(() => {
  const ui = useUi(props.ui?.scrollUpButton, selectContext.value)
  return {
    ...ui,
    class: cn('flex cursor-default items-center justify-center py-1', ui.class),
    style: ui.style,
  }
})

const scrollDownButtonProps = computed(() => {
  const ui = useUi(props.ui?.scrollDownButton, selectContext.value)
  return {
    ...ui,
    class: cn('flex cursor-default items-center justify-center py-1', ui.class),
    style: ui.style,
  }
})

const itemContexts = computed<SelectItemContext[]>(() =>
  props.items.map((item, index) => ({
    ...selectContext.value,
    item,
    index,
    selected: Object.is(value.value, item.value),
  })),
)

const groupContexts = computed<SelectGroupContext[]>(() =>
  props.groups
    .filter((group) => group.items.length)
    .map((group, index) => ({ ...selectContext.value, group, index })),
)

const usesGroups = computed(() => groupContexts.value.length > 0)

const selectedItem = computed<SelectItem | undefined>(() => {
  const items = usesGroups.value ? props.groups.flatMap((group) => group.items) : props.items
  return items.find((item) => Object.is(item.value, value.value))
})

function getGroupItemContexts(context: SelectGroupContext): SelectItemContext[] {
  return context.group.items.map((item, index) => ({
    ...selectContext.value,
    item,
    index,
    group: context.group,
    selected: Object.is(value.value, item.value),
  }))
}

function getGroupProps(context: SelectGroupContext) {
  const ui = useUi(props.ui?.group, context)
  return { ...ui, class: cn('py-1 first:pt-0 last:pb-0', ui.class), style: ui.style }
}

function getGroupLabelProps(context: SelectGroupContext) {
  const ui = useUi(props.ui?.groupLabel, context)
  return {
    ...ui,
    class: cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', ui.class),
    style: ui.style,
  }
}
</script>

<template>
  <div v-bind="rootProps" data-slot="select">
    <SelectRoot v-model="value" v-model:open="open" :disabled="props.disabled">
      <SelectTrigger v-bind="triggerProps" data-slot="select-trigger">
        <SelectValue v-if="props.loading" v-bind="valueProps" data-slot="select-value">
          <slot name="loading" v-bind="selectContext">
            <Icon
              name="spinner"
              class="size-4 shrink-0 animate-spin"
              data-slot="select-loading-icon"
            />
          </slot>
          <span v-if="selectedItem" class="truncate">{{ selectedItem.label }}</span>
        </SelectValue>
        <SelectValue v-else-if="$slots.value" v-bind="valueProps" data-slot="select-value">
          <slot name="value" v-bind="selectContext" />
        </SelectValue>
        <SelectValue v-else-if="selectedItem" v-bind="valueProps" data-slot="select-value">
          <Icon v-if="selectedItem.icon" v-bind="selectedItem.icon" data-slot="select-value-icon" />
          <span class="truncate">{{ selectedItem.label }}</span>
        </SelectValue>
        <SelectValue v-else v-bind="valueProps" data-slot="select-value" />

        <slot v-if="$slots.icon" name="icon" v-bind="selectContext" />
        <Icon v-else v-bind="iconProps" name="chevronDown" data-slot="select-icon" />
      </SelectTrigger>

      <SelectPortal v-if="!props.loading">
        <SelectContent v-bind="contentProps" data-slot="select-content">
          <SelectScrollUpButton v-bind="scrollUpButtonProps" data-slot="select-scroll-up">
            <slot v-if="$slots['scroll-up']" name="scroll-up" v-bind="selectContext" />
            <Icon v-else name="chevronUp" class="size-4" />
          </SelectScrollUpButton>

          <SelectViewport v-bind="viewportProps" data-slot="select-viewport">
            <template v-if="usesGroups">
              <SelectGroup
                v-for="groupContext in groupContexts"
                :key="groupContext.index"
                v-bind="getGroupProps(groupContext)"
                data-slot="select-group"
              >
                <SelectLabel
                  v-if="groupContext.group.label"
                  v-bind="getGroupLabelProps(groupContext)"
                  data-slot="select-group-label"
                >
                  <slot name="group-label" v-bind="groupContext">
                    {{ groupContext.group.label }}
                  </slot>
                </SelectLabel>

                <SelectOption
                  v-for="itemContext in getGroupItemContexts(groupContext)"
                  :key="String(itemContext.item.value)"
                  :context="itemContext"
                  :ui="props.ui"
                >
                  <template v-for="(_, name) in $slots" #[name]="slotProps">
                    <slot :name="name" v-bind="slotProps" />
                  </template>
                </SelectOption>
              </SelectGroup>
            </template>

            <template v-else>
              <SelectOption
                v-for="itemContext in itemContexts"
                :key="String(itemContext.item.value)"
                :context="itemContext"
                :ui="props.ui"
              >
                <template v-for="(_, name) in $slots" #[name]="slotProps">
                  <slot :name="name" v-bind="slotProps" />
                </template>
              </SelectOption>
            </template>
          </SelectViewport>

          <SelectScrollDownButton v-bind="scrollDownButtonProps" data-slot="select-scroll-down">
            <slot v-if="$slots['scroll-down']" name="scroll-down" v-bind="selectContext" />
            <Icon v-else name="chevronDown" class="size-4" />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>
