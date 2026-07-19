import { LoaderCircle } from '@lucide/vue'

export const ICONOS = {
  spinner: LoaderCircle,
} as const

export type NombreIcono = keyof typeof ICONOS
