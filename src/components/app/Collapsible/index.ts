import type { Component, HTMLAttributes } from 'vue'

export { default as Collapsible } from './Collapsible.vue'

export type CollapsibleNodoUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export interface CollapsibleUI {
  activador?: CollapsibleNodoUI
  contenido?: CollapsibleNodoUI
}

export interface CollapsibleProps {
  abierto?: boolean
  deshabilitado?: boolean
  desmontarAlOcultar?: boolean
  forzarMontaje?: boolean
  as?: string | Component
  asChild?: boolean
  ui?: CollapsibleUI
}

export interface CollapsibleEmits {
  'update:abierto': [valor: boolean]
}

export interface CollapsibleSlotProps {
  abierto: boolean
}
