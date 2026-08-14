export { default as AspectRatio } from './AspectRatio.vue'

export type AspectRatioRatio = number

export interface AspectRatioProps {
  ratio?: AspectRatioRatio
}

export interface AspectRatioContext {
  ratio: AspectRatioRatio
}

export function createAspectRatioContext(props: AspectRatioProps): AspectRatioContext {
  return {
    ratio: props.ratio ?? 1,
  }
}

export interface AspectRatioSlots {
  default?(props: AspectRatioContext): unknown
}
