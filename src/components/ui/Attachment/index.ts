import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

export { default as Attachment } from './Attachment.vue'

export const attachmentVariants = cva(
  'group/attachment relative flex min-w-0 items-center overflow-hidden rounded-lg border bg-background text-foreground transition-colors',
  {
    variants: {
      orientation: { horizontal: 'w-fit max-w-full', vertical: 'w-40 flex-col items-stretch' },
      size: { default: '', sm: '', xs: '' },
      state: {
        idle: '',
        uploading: '',
        processing: '',
        error: 'border-destructive/50 bg-destructive/5 text-destructive',
        done: '',
      },
    },
    compoundVariants: [
      { orientation: 'horizontal', size: 'default', class: 'gap-3 p-3' },
      { orientation: 'horizontal', size: 'sm', class: 'gap-2.5 p-2.5' },
      { orientation: 'horizontal', size: 'xs', class: 'gap-2 p-2' },
      { orientation: 'vertical', size: ['default', 'sm'], class: 'gap-2 p-2' },
      { orientation: 'vertical', size: 'xs', class: 'gap-1.5 p-1.5' },
    ],
    defaultVariants: { orientation: 'horizontal', size: 'default', state: 'idle' },
  },
)

export const attachmentMediaVariants = cva(
  'relative z-10 flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground [&_svg]:shrink-0',
  {
    variants: {
      orientation: { horizontal: '', vertical: '' },
      size: {
        default: 'size-10 [&_svg:not([class*=size-])]:size-5',
        sm: 'size-8 [&_svg:not([class*=size-])]:size-4',
        xs: 'size-6 [&_svg:not([class*=size-])]:size-3.5',
      },
      variant: { default: '', image: '[&_img]:size-full [&_img]:object-cover' },
      state: {
        idle: '',
        uploading: '',
        processing: '',
        error: 'bg-destructive/10 text-destructive',
        done: '',
      },
    },
    compoundVariants: [
      { orientation: 'vertical', variant: 'image', class: 'aspect-video h-auto w-full' },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      size: 'default',
      variant: 'default',
      state: 'idle',
    },
  },
)

export const attachmentContentVariants = cva('relative z-10 min-w-0 flex-1', {
  variants: { orientation: { horizontal: '', vertical: 'w-full px-1 pb-1' } },
  defaultVariants: { orientation: 'horizontal' },
})

export const attachmentLabelVariants = cva('truncate font-medium', {
  variants: {
    size: { default: 'text-sm', sm: 'text-xs', xs: 'text-[11px]' },
    state: {
      idle: '',
      uploading: 'animate-pulse',
      processing: 'animate-pulse',
      error: '',
      done: '',
    },
  },
  defaultVariants: { size: 'default', state: 'idle' },
})

export const attachmentDescriptionVariants = cva('truncate text-muted-foreground', {
  variants: {
    size: { default: 'text-xs', sm: 'text-[11px]', xs: 'text-[11px]' },
    state: {
      idle: '',
      uploading: '',
      processing: '',
      error: 'text-destructive',
      done: '',
    },
  },
  defaultVariants: { size: 'default', state: 'idle' },
})

export const attachmentActionsVariants = cva(
  'relative z-20 ml-auto flex shrink-0 items-center gap-1 [&_button]:size-7 [&_button]:rounded-md',
  {
    variants: {
      orientation: { horizontal: '', vertical: 'absolute top-3 right-3 ml-0' },
      size: { default: '', sm: '', xs: '[&_button]:size-6' },
    },
    defaultVariants: { orientation: 'horizontal', size: 'default' },
  },
)

export type AttachmentVariants = VariantProps<typeof attachmentVariants>
export type AttachmentMediaVariants = VariantProps<typeof attachmentMediaVariants>
export type AttachmentFn<T> = T | ((context: AttachmentContext) => T)

export interface AttachmentUI {
  root?: AttachmentFn<HTMLAttributes>
  media?: AttachmentFn<HTMLAttributes>
  content?: AttachmentFn<HTMLAttributes>
  label?: AttachmentFn<HTMLAttributes>
  description?: AttachmentFn<HTMLAttributes>
  actions?: AttachmentFn<HTMLAttributes>
  trigger?: AttachmentFn<HTMLAttributes>
}

export interface AttachmentProps {
  label?: string
  description?: string
  orientation?: AttachmentVariants['orientation']
  size?: AttachmentVariants['size']
  state?: AttachmentVariants['state']
  mediaVariant?: AttachmentMediaVariants['variant']
  ui?: AttachmentUI
}

export interface AttachmentContext {
  props: Omit<AttachmentProps, 'ui'>
}

export interface AttachmentSlots {
  media?(props: AttachmentContext): unknown
  label?(props: AttachmentContext): unknown
  description?(props: AttachmentContext): unknown
  actions?(props: AttachmentContext): unknown
  trigger?(props: AttachmentContext): unknown
}
