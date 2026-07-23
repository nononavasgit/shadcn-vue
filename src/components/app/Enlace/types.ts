import type { BotonBaseProps } from '@/components/app/Boton/types'
import type { AnchorHTMLAttributes } from 'vue'

export interface EnlaceBaseProps extends BotonBaseProps {
  destino?: string | object
}

export type EnlaceProps = EnlaceBaseProps & AnchorHTMLAttributes
