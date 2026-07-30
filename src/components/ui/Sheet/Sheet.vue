<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import {
  Sheet as SheetBase,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/primitives/Sheet'
import { Icon, useNormalizeIconProps } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { SheetEmits, SheetProps, SheetSlotProps, SheetSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<SheetSlots>()
const emit = defineEmits<SheetEmits>()

const props = withDefaults(defineProps<SheetProps>(), {
  modal: true,
  block: false,
  unmountOnHide: true,
  side: 'right',
  showCloseButton: true,
})

const slots = useSlots()
const attrs = useAttrs()
const open = defineModel<boolean>('open')
const calculatedOpen = computed({
  get: () => open.value,
  set: (value: boolean | undefined) => {
    if (props.block && value === false) return
    open.value = value
  },
})
const calculatedIcon = useNormalizeIconProps(() => props.icon)
const { t } = useI18n()

function getSlotProps(slotProps: { open: boolean; close: () => void }): SheetSlotProps {
  return {
    open: slotProps.open,
    close: props.block ? () => {} : slotProps.close,
  }
}

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    defaultOpen: props.defaultOpen,
    modal: props.modal,
    unmountOnHide: props.unmountOnHide,
  },
  trigger: {
    ...props.ui?.trigger,
    asChild: props.ui?.trigger?.asChild ?? true,
  },
  content: {
    ...props.ui?.content,
    side: props.side,
    forceMount: props.forceMount,
    disableOutsidePointerEvents: props.disableOutsidePointerEvents ?? props.modal,
    onOpenAutoFocus: (event: Event) => emit('openAutoFocus', event),
    onCloseAutoFocus: (event: Event) => emit('closeAutoFocus', event),
    onEscapeKeyDown: (event: Event) => {
      if (props.block) event.preventDefault()
      emit('escapeKeyDown', event)
    },
    onPointerDownOutside: (event: Event) => {
      if (props.block) event.preventDefault()
      emit('pointerDownOutside', event)
    },
    onFocusOutside: (event: Event) => {
      if (props.block) event.preventDefault()
      emit('focusOutside', event)
    },
    onInteractOutside: (event: Event) => {
      if (props.block) event.preventDefault()
      emit('interactOutside', event)
    },
  },
  header: {
    ...props.ui?.header,
  },
  label: {
    ...props.ui?.label,
    class: cn('flex items-center gap-2', props.ui?.label?.class),
  },
  icon: {
    'aria-hidden': true,
    ...props.ui?.icon,
    ...calculatedIcon.value,
    class: cn(props.ui?.icon?.class, calculatedIcon.value?.class),
  },
  description: {
    ...props.ui?.description,
  },
  body: {
    ...props.ui?.body,
    class: cn('min-h-0 overflow-y-auto px-4', props.ui?.body?.class),
  },
  footer: {
    ...props.ui?.footer,
  },
  close: {
    ...props.ui?.close,
    'aria-label': props.ui?.close?.['aria-label'] ?? t('close'),
    class: cn(
      'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      props.ui?.close?.class,
    ),
  },
}))
</script>

<template>
  <SheetBase v-slot="rootSlotProps" v-bind="calculatedUI.root" v-model:open="calculatedOpen">
    <SheetTrigger v-bind="calculatedUI.trigger">
      <slot v-bind="getSlotProps(rootSlotProps)" />
    </SheetTrigger>

    <SheetContent v-bind="calculatedUI.content">
      <template v-if="props.showCloseButton && !props.block" #close>
        <slot name="close" v-bind="getSlotProps(rootSlotProps)">
          <SheetClose v-bind="calculatedUI.close">
            <slot name="closeIcon" v-bind="getSlotProps(rootSlotProps)">
              <Icon name="x" />
            </slot>
          </SheetClose>
        </slot>
      </template>

      <SheetHeader
        v-if="props.label || props.description || slots.header || slots.label || slots.description"
        v-bind="calculatedUI.header"
      >
        <slot name="header" v-bind="getSlotProps(rootSlotProps)">
          <SheetTitle v-if="props.label || slots.label" v-bind="calculatedUI.label">
            <Icon
              v-if="calculatedUI.icon.name"
              v-bind="calculatedUI.icon"
              :name="calculatedUI.icon.name"
            />
            <slot name="label" v-bind="getSlotProps(rootSlotProps)">
              {{ props.label }}
            </slot>
          </SheetTitle>

          <SheetDescription
            v-if="props.description || slots.description"
            v-bind="calculatedUI.description"
          >
            <slot name="description" v-bind="getSlotProps(rootSlotProps)">
              {{ props.description }}
            </slot>
          </SheetDescription>
        </slot>
      </SheetHeader>

      <div v-if="slots.content" v-bind="calculatedUI.body">
        <slot name="content" v-bind="getSlotProps(rootSlotProps)" />
      </div>

      <SheetFooter v-if="slots.footer" v-bind="calculatedUI.footer">
        <slot name="footer" v-bind="getSlotProps(rootSlotProps)" />
      </SheetFooter>
    </SheetContent>
  </SheetBase>
</template>
