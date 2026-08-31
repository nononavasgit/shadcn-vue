<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  TagsInputClear,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot,
} from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type {
  TagInputEmits,
  TagInputProps,
  TagInputSlots,
  TagInputTagContext,
  TagInputValue,
} from '.'
import { tagInputDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TagInputProps>(), tagInputDefaults)
defineSlots<TagInputSlots>()
const emit = defineEmits<Omit<TagInputEmits, 'update:value'>>()
const value = defineModel<TagInputValue[]>('value')
const attrs = useAttrs()
const { t } = useI18n()

const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, undefined)

  return {
    ...attrs,
    ...rootUI,
    addOnPaste: props.addOnPaste,
    addOnTab: props.addOnTab,
    addOnBlur: props.addOnBlur,
    duplicate: props.duplicate,
    disabled: props.disabled,
    delimiter: props.delimiter,
    dir: props.dir,
    max: props.max,
    convertValue: props.convertValue,
    displayValue: props.displayValue,
    id: props.id ?? (attrs.id as string | undefined),
    name: props.name ?? (attrs.name as string | undefined),
    required: props.required ?? (attrs.required as boolean | undefined),
    as: 'div' as const,
    asChild: false,
    class: cn(
      'flex min-h-9 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-destructive data-[invalid]:ring-3 data-[invalid]:ring-destructive/20 dark:bg-input/30 dark:data-[invalid]:ring-destructive/40',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})

function getItemProps(context: TagInputTagContext) {
  const ui = useUi(props.ui?.tagItem, context)

  return {
    ...ui,
    class: cn(
      'inline-flex h-7 items-center gap-1 rounded-md border border-transparent bg-secondary px-2 text-xs font-medium text-secondary-foreground transition-colors data-[state=active]:border-ring data-[state=active]:ring-2 data-[state=active]:ring-ring/30 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      ui.class,
    ),
    style: ui.style,
  }
}

function getItemTextProps(context: TagInputTagContext) {
  const ui = useUi(props.ui?.tagItemText, context)

  return {
    ...ui,
    class: cn(ui.class),
    style: ui.style,
  }
}

function getItemDeleteProps(context: TagInputTagContext) {
  const ui = useUi(props.ui?.tagItemDelete, context)

  return {
    ...ui,
    class: cn(
      'inline-flex size-4 shrink-0 items-center justify-center rounded-sm opacity-70 transition-opacity outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring',
      ui.class,
    ),
    style: ui.style,
    'aria-label': ui['aria-label'] ?? t('tagInputRemove'),
  }
}

const tagInputProps = computed(() => {
  const ui = useUi(props.ui?.tagInput, undefined)

  return {
    ...ui,
    placeholder: props.placeholder,
    autoFocus: props.autoFocus,
    maxLength: props.maxLength,
    class: cn(
      'min-w-32 flex-1 border-0 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-0 disabled:cursor-not-allowed',
      ui.class,
    ),
    style: ui.style,
  }
})

const tagClearProps = computed(() => {
  const ui = useUi(props.ui?.tagClear, undefined)

  return {
    ...ui,
    class: cn(
      'ml-auto inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground opacity-70 transition-opacity outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none',
      ui.class,
    ),
    style: ui.style,
    'aria-label': ui['aria-label'] ?? t('tagInputClear'),
  }
})

function handleInvalid(payload: TagInputValue) {
  emit('invalid', payload)
}

function handleAddTag(payload: TagInputValue) {
  emit('addTag', payload)
}

function handleRemoveTag(payload: TagInputValue) {
  emit('removeTag', payload)
}
</script>

<template>
  <TagsInputRoot
    v-model="value"
    v-bind="rootProps"
    data-test-tag-input-root
    @invalid="handleInvalid"
    @add-tag="handleAddTag"
    @remove-tag="handleRemoveTag"
  >
    <template #default="{ modelValue }">
      <TagsInputItem
        v-for="(tag, index) in modelValue"
        :key="index"
        :value="tag"
        v-bind="getItemProps({ value: tag, index })"
        data-test-tag-input-item
      >
        <TagsInputItemText
          v-if="!$slots.tag"
          v-bind="getItemTextProps({ value: tag, index })"
          data-test-tag-input-item-text
        />
        <TagsInputItemText
          v-else
          v-bind="getItemTextProps({ value: tag, index })"
          data-test-tag-input-item-text
        >
          <slot name="tag" :value="tag" :index="index" />
        </TagsInputItemText>

        <TagsInputItemDelete
          v-bind="getItemDeleteProps({ value: tag, index })"
          data-test-tag-input-item-delete
        >
          <Icon name="x" size="xs" />
        </TagsInputItemDelete>
      </TagsInputItem>

      <TagsInputInput v-bind="tagInputProps" data-test-tag-input-input />

      <TagsInputClear v-if="props.clearable" v-bind="tagClearProps" data-test-tag-input-clear>
        <slot name="clear">
          <Icon name="x" size="sm" />
        </slot>
      </TagsInputClear>
    </template>
  </TagsInputRoot>
</template>
