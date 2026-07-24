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
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import type { DialogEmits, DialogProps, DialogSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(props: DialogSlotProps): unknown
  content?(props: DialogSlotProps): unknown
  header?(props: DialogSlotProps): unknown
  title?(props: DialogSlotProps): unknown
  description?(props: DialogSlotProps): unknown
  footer?(props: DialogSlotProps): unknown
  close?(props: DialogSlotProps): unknown
}>()

const props = withDefaults(defineProps<DialogProps>(), {
  modal: true,
  unmountOnHide: true,
  showCloseButton: true,
  closeLabel: 'Cerrar',
})
defineEmits<DialogEmits>()

const slots = useSlots()
const attrs = useAttrs()
const open = defineModel<boolean>('open')
const iconCalculado = computed(() =>
  typeof props.icon === 'string' ? { name: props.icon } : props.icon,
)

const uiCalculado = computed(() => {
  return {
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
    container: {
      ...props.ui?.container,
      forceMount: props.forceMount,
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
      ...iconCalculado.value,
      class: cn(props.ui?.icon?.class, iconCalculado.value?.class),
    },
    description: {
      ...props.ui?.description,
    },
    content: {
      ...props.ui?.content,
      class: cn('min-h-0 overflow-y-auto', props.ui?.content?.class),
    },
    footer: {
      ...props.ui?.footer,
    },
    close: {
      ...props.ui?.footer,
      'aria-label': props.closeLabel,
    },
  }
})
</script>

<template>
  <DialogBase v-slot="slotProps" v-bind="uiCalculado.root" v-model:open="open">
    <DialogTrigger v-bind="uiCalculado.trigger">
      <slot v-bind="slotProps" :icon="props.icon" />
    </DialogTrigger>

    <DialogContent v-bind="uiCalculado.container">
      <template v-if="props.showCloseButton" #close>
        <slot name="close" v-bind="slotProps" :icon="props.icon">
          <DialogClose
            v-bind="uiCalculado.close"
            class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <Icon name="x" />
          </DialogClose>
        </slot>
      </template>

      <DialogHeader v-bind="uiCalculado.header">
        <slot name="header" v-bind="slotProps" :icon="props.icon">
          <DialogTitle v-if="props.label || slots.title" v-bind="uiCalculado.title">
            <Icon v-if="iconCalculado" v-bind="uiCalculado.icon" :name="iconCalculado.name" />
            <slot name="title" v-bind="slotProps" :icon="props.icon">{{ props.label }}</slot>
          </DialogTitle>

          <DialogDescription
            v-if="props.description || slots.description"
            v-bind="uiCalculado.description"
          >
            <slot name="description" v-bind="slotProps" :icon="props.icon">
              {{ props.description }}
            </slot>
          </DialogDescription>
        </slot>
      </DialogHeader>

      <div v-if="slots.content" v-bind="uiCalculado.content">
        <slot name="content" v-bind="slotProps" :icon="props.icon" />
      </div>

      <DialogFooter v-if="slots.footer" v-bind="uiCalculado.footer">
        <slot name="footer" v-bind="slotProps" :icon="props.icon" />
      </DialogFooter>
    </DialogContent>
  </DialogBase>
</template>
