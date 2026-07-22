import type { HTMLAttributes } from 'vue'

interface SwitchUI {
  root?: HTMLAttributes
}

export type ValorSwitch = string | number | boolean

export interface SwitchBaseProps {
  valorVerdadero?: ValorSwitch
  valorFalso?: ValorSwitch
  ui?: SwitchUI
}

export type SwitchProps = SwitchBaseProps & HTMLAttributes
