import type { Component } from 'vue'

export { default as Switch } from './Switch.vue'

type modelValueType = boolean | null | number | string

export interface SwitchProps {
  modelValue?: modelValueType
  valorPredeterminado?: boolean
  valorVerdadero?: modelValueType
  valorFalso?: modelValueType
  as?: string | Component
  asChild?: boolean
  required?: boolean
}

export interface SwitchEmits {
  'update:modelValue': [valor: boolean]
}

export interface SwitchSlotProps {
  valor: modelValueType
  activado: boolean
}

export interface SwitchSlots {
  indicador?(props: SwitchSlotProps): unknown
}
