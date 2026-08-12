import type { HTMLAttributes } from 'vue'
import type { ScrollAreaRootProps, ScrollAreaScrollbarProps } from 'reka-ui'

export { default as ScrollArea } from './ScrollArea.vue'

export type ScrollAreaOrientation = ScrollAreaScrollbarProps['orientation'] | 'both'

export type ScrollAreaFn<T> = (context: ScrollAreaContext) => T

export interface ScrollAreaUI {
  root?: ScrollAreaFn<HTMLAttributes>
  viewport?: ScrollAreaFn<HTMLAttributes>
  verticalScrollbar?: ScrollAreaFn<HTMLAttributes>
  horizontalScrollbar?: ScrollAreaFn<HTMLAttributes>
  thumbVertical?: ScrollAreaFn<HTMLAttributes>
  thumbHorizontal?: ScrollAreaFn<HTMLAttributes>
  corner?: ScrollAreaFn<HTMLAttributes>
}

export interface ScrollAreaProps extends Pick<
  ScrollAreaRootProps,
  'as' | 'asChild' | 'type' | 'dir' | 'scrollHideDelay'
> {
  orientation?: ScrollAreaOrientation
  forceMount?: ScrollAreaScrollbarProps['forceMount']
  ui?: ScrollAreaUI
}

export interface ScrollAreaContext {
  props: Omit<ScrollAreaProps, 'ui'>
}

export interface ScrollAreaSlots {
  default?(props: ScrollAreaContext): unknown
}
