import type { ButtonHTMLAttributes, Component, HTMLAttributes, SVGAttributes } from 'vue'
import type { IconoNombre, IconoProps } from '@/components/app/Icon'

export { default as Dialog } from './Dialog.vue'

export type DialogNodoUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export interface DialogUI {
  activador?: DialogNodoUI
  contenedor?: DialogNodoUI
  encabezado?: HTMLAttributes
  titulo?: DialogNodoUI
  icono?: SVGAttributes
  descripcion?: DialogNodoUI
  contenido?: HTMLAttributes
  pie?: HTMLAttributes
  cerrar?: HTMLAttributes & ButtonHTMLAttributes
}

export interface DialogProps {
  abierto?: boolean
  abiertoPredeterminado?: boolean
  modal?: boolean
  desmontarAlOcultar?: boolean
  titulo?: string
  descripcion?: string
  icono?: IconoNombre | (IconoProps & SVGAttributes)
  mostrarBotonCerrar?: boolean
  forzarMontaje?: boolean
  deshabilitarPunteroExterior?: boolean

  ui?: DialogUI
}

export interface DialogEmits {
  'update:abierto': [valor: boolean]
  enfocarAbrir: [evento: Event]
  enfocarCerrar: [evento: Event]
  pulsarEscape: [evento: Event]
  pulsarFuera: [evento: Event]
  enfocarFuera: [evento: Event]
  interactuarFuera: [evento: Event]
}

export interface DialogSlotProps {
  abierto: boolean
  cerrar: () => void
}

export interface DialogSlots {
  default?(props: DialogSlotProps): unknown
  contenido?(props: DialogSlotProps): unknown
  encabezado?(props: DialogSlotProps): unknown
  titulo?(props: DialogSlotProps): unknown
  descripcion?(props: DialogSlotProps): unknown
  pie?(props: DialogSlotProps): unknown
  cerrar?(props: DialogSlotProps): unknown
  iconoCerrar?(props: DialogSlotProps): unknown
}
