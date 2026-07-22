import { cva, type VariantProps } from 'class-variance-authority'

export const tooltipVariantes = cva(
  'max-w-[min(var(--tooltip-ancho-maximo),var(--reka-tooltip-content-available-width))] whitespace-normal',
  {
    variants: {
      variante: {
        solido:
          'border border-border bg-white text-black [&>span>svg]:h-[5px]! [&>span>svg]:w-[10px]! [&>span>svg]:translate-y-0! [&>span>svg]:rotate-0! [&>span>svg]:bg-white! [&>span>svg]:fill-white! [&>span>svg>path]:fill-white! [&>span>svg>path]:stroke-border [&>span>svg>path]:stroke-1',
        delineado: 'border border-border bg-background text-foreground [&>span:has(>svg)]:hidden',
        suave:
          'bg-secondary text-secondary-foreground [&>span>svg]:bg-secondary [&>span>svg]:fill-secondary',
      },
    },
    defaultVariants: {
      variante: 'solido',
    },
  },
)

export type TooltipVariantes = VariantProps<typeof tooltipVariantes>
