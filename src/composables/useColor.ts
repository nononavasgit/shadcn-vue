import { computed, toValue, type CSSProperties, type MaybeRefOrGetter } from 'vue'

type RGB = [number, number, number]
type ColorStyle = CSSProperties & {
  '--button-color': string
  '--button-color-foreground': string
}

function parseHex(color: string): RGB | undefined {
  const value = color.trim().replace(/^#/, '')
  if (![3, 4, 6, 8].includes(value.length) || !/^[\da-f]+$/i.test(value)) return undefined
  const full = value.length <= 4 ? [...value].map((part) => part + part).join('') : value
  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ]
}

function parseRgb(color: string): RGB | undefined {
  const match = color.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i)
  if (!match) return undefined
  return [Number(match[1]), Number(match[2]), Number(match[3])]
}

function resolveRgb(color: string): RGB | undefined {
  const direct = parseHex(color) ?? parseRgb(color)
  if (direct) return direct
  if (
    typeof document === 'undefined' ||
    typeof CSS === 'undefined' ||
    !CSS.supports('color', color)
  ) {
    return undefined
  }

  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return undefined

  context.fillStyle = color
  context.fillRect(0, 0, 1, 1)
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data
  return [red, green, blue]
}

function relativeLuminance([red, green, blue]: RGB) {
  const [r, g, b] = [red, green, blue].map((channel) => {
    const value = channel / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function getContrastColor(color: string, light = '#ffffff', dark = '#09090b') {
  const rgb = resolveRgb(color)
  if (!rgb) return light

  const luminance = relativeLuminance(rgb)
  const contrastWithLight = 1.05 / (luminance + 0.05)
  const contrastWithDark = (luminance + 0.05) / 0.05
  return contrastWithLight >= contrastWithDark ? light : dark
}

export function useColor(color: MaybeRefOrGetter<string | undefined>) {
  const contrastColor = computed(() => {
    const value = toValue(color)
    return value ? getContrastColor(value) : undefined
  })

  const colorStyle = computed<ColorStyle | undefined>(() => {
    const value = toValue(color)
    if (!value || !contrastColor.value) return undefined

    return {
      '--button-color': value,
      '--button-color-foreground': contrastColor.value,
    }
  })

  return { contrastColor, colorStyle }
}
