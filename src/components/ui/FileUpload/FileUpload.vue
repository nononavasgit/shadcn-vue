<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { FileIcon, UploadIcon, XIcon } from '@lucide/vue'
import { Attachment } from '@/components/ui/Attachment'
import { Button } from '@/components/ui/Button'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import {
  fileUploadDescriptionVariants,
  fileUploadDropzoneVariants,
  fileUploadLabelVariants,
  fileUploadMediaVariants,
  fileUploadVariants,
  formatFileSize,
  type FileUploadContext,
  type FileUploadEmits,
  type FileUploadProps,
  type FileUploadSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FileUploadProps>(), {
  label: 'Arrastra y suelta archivos aquí',
  description: 'o haz clic para seleccionar',
  accept: undefined,
  multiple: false,
  disabled: false,
  name: undefined,
  required: false,
  ui: undefined,
})
const emit = defineEmits<FileUploadEmits>()
defineSlots<FileUploadSlots>()

const files = defineModel<File[]>('files', { default: () => [] })
const attrs = useAttrs()
const input = ref<HTMLInputElement>()
const dragDepth = ref(0)
const isDragging = computed(() => dragDepth.value > 0)

const fileUploadContext = computed<FileUploadContext>(() => {
  const { ui, ...fileUploadProps } = props
  void ui

  return {
    props: fileUploadProps,
    files: files.value,
    isDragging: isDragging.value,
    open: openFileDialog,
    remove: removeFile,
    clear: clearFiles,
  }
})

const rootProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.root, fileUploadContext.value))
  return {
    ...attrs,
    ...ui,
    class: cn(fileUploadVariants(), attrs.class, ui.class),
    style: [attrs.style, ui.style],
  }
})

const dropzoneProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.dropzone, fileUploadContext.value))
  return {
    ...ui,
    role: 'button',
    tabindex: props.disabled ? -1 : 0,
    'aria-disabled': props.disabled,
    'data-dragging': isDragging.value || undefined,
    class: cn(
      fileUploadDropzoneVariants({ dragging: isDragging.value, disabled: props.disabled }),
      ui.class,
    ),
  }
})

const inputProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.input, fileUploadContext.value))
  return {
    ...ui,
    accept: props.accept,
    multiple: props.multiple,
    disabled: props.disabled,
    name: props.name,
    required: props.required,
    class: cn('sr-only', ui.class),
  }
})

const mediaProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.media, fileUploadContext.value))
  return {
    ...ui,
    class: cn(fileUploadMediaVariants({ dragging: isDragging.value }), ui.class),
  }
})

const labelProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.label, fileUploadContext.value))
  return { ...ui, class: cn(fileUploadLabelVariants(), ui.class) }
})

const descriptionProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.description, fileUploadContext.value))
  return { ...ui, class: cn(fileUploadDescriptionVariants(), ui.class) }
})

const listProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.list, fileUploadContext.value))
  return { ...ui, class: cn('grid gap-2', ui.class) }
})

function updateFiles(nextFiles: File[]) {
  const selectedFiles = props.multiple ? nextFiles : nextFiles.slice(0, 1)
  files.value = selectedFiles
  emit('filesChange', selectedFiles)
}

function addFiles(nextFiles: File[]) {
  updateFiles(props.multiple ? [...files.value, ...nextFiles] : nextFiles)
}

function removeFile(index: number) {
  updateFiles(files.value.filter((_, fileIndex) => fileIndex !== index))
}

function clearFiles() {
  updateFiles([])
}

function openFileDialog() {
  if (!props.disabled) input.value?.click()
}

function handleClick(event: MouseEvent) {
  if (event.target !== input.value) openFileDialog()
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  addFiles(Array.from(target.files ?? []))
  target.value = ''
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  openFileDialog()
}

function handleDragEnter(event: DragEvent) {
  event.preventDefault()
  if (props.disabled || !event.dataTransfer?.types.includes('Files')) return
  dragDepth.value += 1
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
  if (event.dataTransfer) event.dataTransfer.dropEffect = props.disabled ? 'none' : 'copy'
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  if (dragDepth.value > 0) dragDepth.value -= 1
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  dragDepth.value = 0
  if (props.disabled) return
  addFiles(Array.from(event.dataTransfer?.files ?? []))
}
</script>

<template>
  <div v-bind="rootProps" data-slot="file-upload">
    <div
      v-bind="dropzoneProps"
      data-slot="file-upload-dropzone"
      @click="handleClick"
      @keydown="handleKeydown"
      @dragenter="handleDragEnter"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <input
        ref="input"
        v-bind="inputProps"
        type="file"
        data-slot="file-upload-input"
        @change="handleInput"
      />

      <slot v-bind="fileUploadContext">
        <div v-bind="mediaProps" data-slot="file-upload-media">
          <slot name="media" v-bind="fileUploadContext"><UploadIcon /></slot>
        </div>

        <div class="space-y-1 text-center" data-slot="file-upload-content">
          <p v-bind="labelProps" data-slot="file-upload-label">
            <slot name="label" v-bind="fileUploadContext">{{ props.label }}</slot>
          </p>
          <p
            v-if="props.description || $slots.description"
            v-bind="descriptionProps"
            data-slot="file-upload-description"
          >
            <slot name="description" v-bind="fileUploadContext">{{ props.description }}</slot>
          </p>
        </div>
      </slot>
    </div>

    <div v-if="files.length" v-bind="listProps" data-slot="file-upload-list">
      <template
        v-for="(file, index) in files"
        :key="`${file.name}-${file.size}-${file.lastModified}-${index}`"
      >
        <slot name="file" v-bind="fileUploadContext" :file="file" :index="index">
          <Attachment
            class="w-full"
            :label="file.name"
            :description="`${file.type || 'Archivo'} · ${formatFileSize(file.size)}`"
          >
            <template #media><FileIcon /></template>
            <template #actions>
              <Button
                type="button"
                variant="plain"
                severity="secondary"
                size="xs"
                square
                :aria-label="`Eliminar ${file.name}`"
                @click="removeFile(index)"
              >
                <XIcon />
              </Button>
            </template>
          </Attachment>
        </slot>
      </template>
    </div>
  </div>
</template>
