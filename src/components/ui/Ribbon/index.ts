import { cva, type VariantProps } from 'class-variance-authority'

export { default as Ribbon } from './Ribbon.vue'

export const ribbonVariants = cva(
  'pointer-events-none absolute flex h-8 w-48 items-center justify-center overflow-hidden border-y border-(--ribbon-background) bg-(--ribbon-background) px-4 text-(--ribbon-foreground) text-xs font-semibold tracking-wide whitespace-nowrap shadow-md',
  {
    variants: {
      position: {
        'top-right': 'top-5 right-[-3.5rem]',
        'top-left': 'top-5 left-[-3.5rem]',
        'bottom-right': 'right-[-3.5rem] bottom-5',
        'bottom-left': 'bottom-5 left-[-3.5rem]',
      },
      severity: {
        primary:
          '[--ribbon-background:var(--primary)] [--ribbon-foreground:var(--primary-foreground)]',
        secondary:
          '[--ribbon-background:var(--secondary)] [--ribbon-foreground:var(--secondary-foreground)]',
        warning:
          '[--ribbon-background:var(--warning)] [--ribbon-foreground:var(--warning-foreground)]',
        success:
          '[--ribbon-background:var(--success)] [--ribbon-foreground:var(--success-foreground)]',
        error: '[--ribbon-background:var(--error)] [--ribbon-foreground:var(--error-foreground)]',
      },
      color: {
        true: '[--ribbon-background:var(--ribbon-color)] [--ribbon-foreground:var(--ribbon-color-foreground)]',
        false: '',
      },
    },
    defaultVariants: {
      severity: 'primary',
      color: false,
    },
  },
)

export const ribbonRotations: Record<RibbonPosition, number> = {
  'top-right': 45,
  'top-left': -45,
  'bottom-right': -45,
  'bottom-left': 45,
}

export type RibbonVariants = VariantProps<typeof ribbonVariants>
export type RibbonPosition = NonNullable<RibbonVariants['position']>
export type RibbonSeverity = NonNullable<RibbonVariants['severity']>

export interface RibbonItem {
  label: string
  severity?: RibbonSeverity
  color?: string
  position?: RibbonPosition
  rotate?: number
  zIndex?: number
}

export interface RibbonProps {
  ribbons?: RibbonItem[]
}

export interface RibbonSlots {
  default?(): unknown
}
