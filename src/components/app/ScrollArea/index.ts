import type { Component, HTMLAttributes } from 'vue'

export { default as ScrollArea } from './ScrollArea.vue'

export type ScrollAreaType = 'auto' | 'always' | 'scroll' | 'hover' | 'glimpse'
export type ScrollAreaDirection = 'ltr' | 'rtl'
export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both'

export interface ScrollAreaUI {
  viewport?: HTMLAttributes
  verticalScrollbar?: HTMLAttributes
  horizontalScrollbar?: HTMLAttributes
  thumbVertical?: HTMLAttributes
  thumbHorizontal?: HTMLAttributes
  corner?: HTMLAttributes
}

export interface ScrollAreaProps {
  /** Estrategia utilizada para mostrar u ocultar las barras. */
  type?: ScrollAreaType
  /** Dirección de lectura del contenido. */
  dir?: ScrollAreaDirection
  /** Tiempo antes de ocultar las barras, expresado en milisegundos. */
  scrollHideDelay?: number
  /** Barras que deben montarse. */
  orientation?: ScrollAreaOrientation
  /** Mantiene las barras montadas aunque no sean visibles. */
  forceMount?: boolean
  /** Elemento o componente utilizado como raíz. */
  as?: string | Component
  /** Renderiza el hijo como elemento raíz. */
  asChild?: boolean
  /** Atributos para las piezas internas del área de desplazamiento. */
  ui?: ScrollAreaUI
}

export interface ScrollAreaSlots {
  default?(): unknown
}
