import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, SVGAttributes } from 'vue'
import type { BotonProps } from '@/components/app/Button'
import type { IconoNombre, IconoProps } from '@/components/app/Icon'

export { default as Panel } from './Panel.vue'

export const panelVariantes = cva(
  'overflow-hidden rounded-[4px] border bg-card shadow-[0_1px_1px_rgb(0_0_0/0.05)]',
  {
    variants: {
      gravedad: {
        primario: '[--panel-border:var(--primary)]',
        secundario: '[--panel-border:var(--secondary-foreground)]',
        exito: '[--panel-border:var(--success)]',
        error: '[--panel-border:var(--error)]',
        alerta: '[--panel-border:var(--warning)]',
      },
      variante: {
        solido: 'border-(--panel-border)',
        delineado: 'border-(--panel-border)/40',
        plano: 'border-(--panel-border)/20',
        sutil: 'border-(--panel-border)/20',
        suave: 'border-(--panel-border)/20',
      },
      color: {
        true: '[--panel-border:var(--panel-color)]',
        false: '',
      },
    },
    defaultVariants: {
      gravedad: 'primario',
      variante: 'solido',
      color: false,
    },
  },
)

export type PanelVariantes = VariantProps<typeof panelVariantes>

export interface PanelUI {
  encabezado?: HTMLAttributes
  icono?: IconoProps & SVGAttributes
  titulo?: HTMLAttributes
  flechas?: HTMLAttributes
  contenido?: HTMLAttributes
}

export interface PanelProps {
  abierto?: boolean
  variante?: BotonProps['variante']
  gravedad?: BotonProps['gravedad']
  color?: string
  titulo?: string
  icono?: IconoNombre | (IconoProps & SVGAttributes)
  expandible?: boolean
  ui?: PanelUI
}

export interface PanelEmits {
  'update:abierto': [valor: boolean]
}

export interface PanelSlotProps {
  abierto: boolean
}
