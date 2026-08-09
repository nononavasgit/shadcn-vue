import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'

export { default as FileUpload } from './FileUpload.vue'

export const fileUploadVariants = cva('grid w-full gap-3')

export const fileUploadDropzoneVariants = cva(
  'relative flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50',
  {
    variants: {
      dragging: {
        true: 'border-primary bg-primary/5',
        false: 'border-muted-foreground/25 hover:border-muted-foreground/50',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: { dragging: false, disabled: false },
  },
)

export const fileUploadMediaVariants = cva(
  'flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors [&_svg:not([class*=size-])]:size-5',
  {
    variants: {
      dragging: { true: 'bg-primary/10 text-primary', false: '' },
    },
    defaultVariants: { dragging: false },
  },
)

export const fileUploadLabelVariants = cva('text-sm font-medium')
export const fileUploadDescriptionVariants = cva('text-xs text-muted-foreground')

export type FileUploadVariants = VariantProps<typeof fileUploadDropzoneVariants>
export type FileUploadFn<T> = T | ((context: FileUploadContext) => T)

export interface FileUploadUI {
  root?: FileUploadFn<HTMLAttributes>
  dropzone?: FileUploadFn<HTMLAttributes>
  input?: FileUploadFn<InputHTMLAttributes>
  media?: FileUploadFn<HTMLAttributes>
  label?: FileUploadFn<HTMLAttributes>
  description?: FileUploadFn<HTMLAttributes>
  list?: FileUploadFn<HTMLAttributes>
}

export interface FileUploadProps {
  files?: File[]
  label?: string
  description?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  name?: string
  required?: boolean
  ui?: FileUploadUI
}

export interface FileUploadContext {
  props: Omit<FileUploadProps, 'ui'>
  files: File[]
  isDragging: boolean
  open: () => void
  remove: (index: number) => void
  clear: () => void
}

export interface FileUploadEmits {
  'update:files': [files: File[]]
  filesChange: [files: File[]]
}

export interface FileUploadSlots {
  default?(props: FileUploadContext): unknown
  media?(props: FileUploadContext): unknown
  label?(props: FileUploadContext): unknown
  description?(props: FileUploadContext): unknown
  file?(props: FileUploadContext & { file: File; index: number }): unknown
}

export function formatFileSize(bytes: number, decimals = 1) {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024))
  const value = bytes / 1024 ** unitIndex

  return `${value.toFixed(unitIndex === 0 ? 0 : decimals)} ${units[unitIndex]}`
}
