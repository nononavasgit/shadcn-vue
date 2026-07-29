<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import {
  Dialog as DialogBase,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Icon, useNormalizeIconProps } from '@/components/app/Icon'
import { Separator } from '@/components/app/Separator'
import { cn } from '@/lib/utils'
import type { DialogEmits, DialogProps, DialogSlotProps, DialogSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<DialogSlots>()
const emit = defineEmits<DialogEmits>()

const props = withDefaults(defineProps<DialogProps>(), {
  modal: true,
  block: false,
  unmountOnHide: true,
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

function getSlotProps(slotProps: { open: boolean; close: () => void }): DialogSlotProps {
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
  title: {
    ...props.ui?.title,
    class: cn('flex items-center gap-2', props.ui?.title?.class),
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
    class: cn('min-h-0 overflow-y-auto', props.ui?.body?.class),
  },
  footer: {
    ...props.ui?.footer,
  },
  close: {
    ...props.ui?.close,
    'aria-label': props.ui?.close?.['aria-label'],
    class: cn(
      'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      props.ui?.close?.class,
    ),
  },
}))
</script>

<template>
  <DialogBase v-slot="rootSlotProps" v-bind="calculatedUI.root" v-model:open="calculatedOpen">
    <DialogTrigger v-bind="calculatedUI.trigger">
      <slot v-bind="getSlotProps(rootSlotProps)" />
    </DialogTrigger>

    <DialogContent v-bind="calculatedUI.content">
      <template v-if="props.showCloseButton && !props.block" #close>
        <slot name="close" v-bind="getSlotProps(rootSlotProps)">
          <DialogClose v-bind="calculatedUI.close">
            <slot name="closeIcon" v-bind="getSlotProps(rootSlotProps)">
              <Icon name="x" />
            </slot>
          </DialogClose>
        </slot>
      </template>

      <DialogHeader v-bind="calculatedUI.header">
        <slot name="header" v-bind="getSlotProps(rootSlotProps)">
          <DialogTitle v-if="props.label || slots.title" v-bind="calculatedUI.title">
            <Icon
              v-if="calculatedUI.icon.name"
              v-bind="calculatedUI.icon"
              :name="calculatedUI.icon.name"
            />
            <slot name="title" v-bind="getSlotProps(rootSlotProps)">
              {{ props.label }}
            </slot>
          </DialogTitle>

          <DialogDescription
            v-if="props.description || slots.description"
            v-bind="calculatedUI.description"
          >
            <slot name="description" v-bind="getSlotProps(rootSlotProps)">
              {{ props.description }}
            </slot>
          </DialogDescription>
        </slot>
      </DialogHeader>

      <Separator />

      <div v-if="slots.content" v-bind="calculatedUI.body">
        <slot name="content" v-bind="getSlotProps(rootSlotProps)" />
      </div>

      <Separator v-if="slots.footer" />

      <DialogFooter v-if="slots.footer" v-bind="calculatedUI.footer">
        <slot name="footer" v-bind="getSlotProps(rootSlotProps)" />
      </DialogFooter>
    </DialogContent>
  </DialogBase>
</template>
