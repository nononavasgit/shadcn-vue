import { LoaderCircle, X } from '@lucide/vue'

export const ICONOS = {
  spinner: LoaderCircle,
  x: X,
} as const

export type NombreIcono = keyof typeof ICONOS
