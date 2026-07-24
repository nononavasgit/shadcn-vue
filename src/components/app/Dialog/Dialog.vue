<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Dialog as DialogBase,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Icon } from '@/components/app/Icon'
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
  scrollable: false,
  showCloseButton: true,
  closeLabel: 'Cerrar',
})
defineEmits<DialogEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')
const contentComponent = computed(() => (props.scrollable ? DialogScrollContent : DialogContent))
</script>

<template>
  <DialogBase
    v-slot="slotProps"
    v-bind="attrs"
    v-model:open="open"
    :default-open="props.defaultOpen"
    :modal="props.modal"
    :unmount-on-hide="props.unmountOnHide"
  >
    <DialogTrigger v-bind="props.ui?.trigger" :as-child="props.ui?.trigger?.asChild ?? true">
      <slot v-bind="slotProps" />
    </DialogTrigger>

    <component
      :is="contentComponent"
      v-bind="props.ui?.content"
      :force-mount="props.forceMount ?? props.ui?.content?.forceMount"
      :show-close-button="props.showCloseButton"
      :close-label="props.closeLabel"
    >
      <template #close>
        <slot name="close" v-bind="slotProps">
          <Icon name="x" size="sm" />
          <span class="sr-only">{{ props.closeLabel }}</span>
        </slot>
      </template>

      <slot
        v-if="
          props.label || props.description || $slots.header || $slots.title || $slots.description
        "
        name="header"
        v-bind="slotProps"
      >
        <DialogHeader v-bind="props.ui?.header">
          <DialogTitle v-if="props.label || $slots.title" v-bind="props.ui?.title">
            <slot name="title" v-bind="slotProps">{{ props.label }}</slot>
          </DialogTitle>

          <DialogDescription
            v-if="props.description || $slots.description"
            v-bind="props.ui?.description"
          >
            <slot name="description" v-bind="slotProps">{{ props.description }}</slot>
          </DialogDescription>
        </DialogHeader>
      </slot>

      <div v-if="$slots.content" v-bind="props.ui?.body">
        <slot name="content" v-bind="slotProps" />
      </div>

      <DialogFooter v-if="$slots.footer" v-bind="props.ui?.footer">
        <slot name="footer" v-bind="slotProps" />
      </DialogFooter>
    </component>
  </DialogBase>
</template>
