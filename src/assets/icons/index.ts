import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  Info,
  LoaderCircle,
  Save,
  Search,
  Trash2,
  X,
} from '@lucide/vue'

export const ICONS = {
  alerta: AlertTriangle,
  check: Check,
  chevronAbajo: ChevronDown,
  chevronArriba: ChevronUp,
  chevronDerecha: ChevronRight,
  chevronIzquierda: ChevronLeft,
  error: CircleAlert,
  exito: CircleCheck,
  info: Info,
  cargando: LoaderCircle,
  guardar: Save,
  buscar: Search,
  eliminar: Trash2,
  cerrar: X,
} as const

export type IconName = keyof typeof ICONS
