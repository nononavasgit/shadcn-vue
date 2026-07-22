import type { HTMLAttributes } from 'vue'

interface CheckboxUI {
  root?: HTMLAttributes
}

export type ValorCheckbox = string | number | boolean | 'indeterminate'

export interface CheckboxBaseProps {
  valorVerdadero?: Exclude<ValorCheckbox, 'indeterminate'>
  valorFalso?: Exclude<ValorCheckbox, 'indeterminate'>
  ui?: CheckboxUI
}

export type CheckboxProps = CheckboxBaseProps & HTMLAttributes
