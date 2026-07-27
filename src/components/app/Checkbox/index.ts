import type { Component } from 'vue'

export { default as Checkbox } from './Checkbox.vue'

export type ValorCheckbox = boolean | string | number | bigint | Record<string, unknown>
export type EstadoCheckbox = boolean | 'indeterminate'

export interface CheckboxProps {
  modelValue?: ValorCheckbox | 'indeterminate' | null
  valorPredeterminado?: ValorCheckbox | 'indeterminate'
  valorVerdadero?: ValorCheckbox
  valorFalso?: ValorCheckbox
  as?: string | Component
  asChild?: boolean
}

export interface CheckboxEmits {
  'update:modelValue': [valor: ValorCheckbox | 'indeterminate']
}

export interface CheckboxSlotProps {
  valor: ValorCheckbox | 'indeterminate'
  estado: EstadoCheckbox
}

export interface CheckboxSlots {
  indicador?(props: CheckboxSlotProps): unknown
}
