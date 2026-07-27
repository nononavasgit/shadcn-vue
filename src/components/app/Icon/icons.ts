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

export const ICONOS = {
  alerta: AlertTriangle,
  check: Check,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  error: CircleAlert,
  exito: CircleCheck,
  info: Info,
  spinner: LoaderCircle,
  guardar: Save,
  buscar: Search,
  papelera2: Trash2,
  x: X,
} as const

export type IconoNombre = keyof typeof ICONOS
