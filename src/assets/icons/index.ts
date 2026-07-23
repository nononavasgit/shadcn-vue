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
  alert: AlertTriangle,
  check: Check,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  error: CircleAlert,
  success: CircleCheck,
  info: Info,
  spinner: LoaderCircle,
  save: Save,
  search: Search,
  trash2: Trash2,
  x: X,
} as const

export type IconName = keyof typeof ICONS
