import type {
  DropdownMenuRootEmits,
  DropdownMenuRootProps,
  DropdownMenuTriggerProps,
} from 'reka-ui'

export { default as DropdownMenu } from './DropdownMenu.vue'

export type DropdownMenuProps = Pick<DropdownMenuRootProps, 'modal'> & {
  open?: boolean
  disabled?: DropdownMenuRootProps['disabled'] & DropdownMenuTriggerProps['disabled']
}

export type DropdownMenuEmits = DropdownMenuRootEmits

export interface DropdownMenuSlots {
  default?(): unknown
}
