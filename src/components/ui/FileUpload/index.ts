import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'

export { default as FileUpload } from './FileUpload.vue'

export const fileUploadVariants = cva(
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
      dragging: {
        true: 'bg-primary/10 text-primary',
        false: '',
      },
    },
    defaultVariants: { dragging: false },
  },
)

export const fileUploadLabelVariants = cva('text-sm font-medium')
export const fileUploadDescriptionVariants = cva('text-xs text-muted-foreground')

export type FileUploadVariants = VariantProps<typeof fileUploadVariants>
export type FileUploadFn<T> = T | ((context: FileUploadContext) => T)

export interface FileUploadUI {
  root?: FileUploadFn<HTMLAttributes>
  input?: FileUploadFn<InputHTMLAttributes>
  media?: FileUploadFn<HTMLAttributes>
  label?: FileUploadFn<HTMLAttributes>
  description?: FileUploadFn<HTMLAttributes>
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
}
