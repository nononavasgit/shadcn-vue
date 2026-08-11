import type { HTMLAttributes } from 'vue'
import type { ToolbarRootProps as RekaToolbarRootProps } from 'reka-ui'

export { default as Toolbar } from './Toolbar.vue'

export type ToolbarRootProps = Pick<
  RekaToolbarRootProps,
  'dir' | 'orientation' | 'loop' | 'as' | 'asChild'
>

export interface ToolbarProps extends ToolbarRootProps {
  ui?: ToolbarUI
}

export type ToolbarFn<T> = T | ((context: ToolbarContext) => T)

export interface ToolbarUI {
  root?: ToolbarFn<HTMLAttributes>
}

export interface ToolbarContext {
  orientation: ToolbarProps['orientation']
}

export function createToolbarContext(props: ToolbarProps): ToolbarContext {
  return {
    orientation: props.orientation,
  }
}

export interface ToolbarSlots {
  default?(props: ToolbarContext): unknown
}
