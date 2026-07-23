import { LoaderCircle, X, Search, Info, Trash, Trash2 } from '@lucide/vue'

export const ICONOS = {
  spinner: LoaderCircle,
  x: X,
  lupa: Search,
  info: Info,
  papelera: Trash,
  papelera2: Trash2,
} as const

export type NombreIcono = keyof typeof ICONOS
