import { cva, type VariantProps } from 'class-variance-authority'
import type { PrimitiveProps } from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Marker } from './Marker.vue'

export const markerVariants = cva('flex w-full items-center gap-2 text-sm text-muted-foreground', {
  variants: {
    variant: {
      default: '',
      border: 'border-b py-3',
      separator:
        'gap-2 py-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border',
    },
  },
  defaultVariants: { variant: 'default' },
})

export type MarkerVariant = NonNullable<VariantProps<typeof markerVariants>['variant']>

export interface MarkerProps extends Pick<PrimitiveProps, 'as' | 'asChild'> {
  variant?: MarkerVariant
  icon?: IconConfig
}

export interface MarkerSlots {
  default?(): unknown
  icon?(): unknown
}
