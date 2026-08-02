import type { HTMLAttributes } from 'vue'
import type { ScrollAreaRootProps, ScrollAreaScrollbarProps } from 'reka-ui'

export { default as ScrollArea } from './ScrollArea.vue'

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both'

export interface ScrollAreaUI {
  root?: HTMLAttributes
  viewport?: HTMLAttributes
  verticalScrollbar?: HTMLAttributes
  horizontalScrollbar?: HTMLAttributes
  thumbVertical?: HTMLAttributes
  thumbHorizontal?: HTMLAttributes
  corner?: HTMLAttributes
}

export interface ScrollAreaProps extends ScrollAreaRootProps {
  orientation?: ScrollAreaScrollbarProps['orientation']
  forceMount?: ScrollAreaScrollbarProps['forceMount']
  ui?: ScrollAreaUI
}

export interface ScrollAreaSlots {
  default?(): unknown
}
