import { computed, toValue, type MaybeRefOrGetter } from 'vue'

interface RGB {
  r: number
  g: number
  b: number
}

export interface UseColorOptions {
  contraste?: MaybeRefOrGetter<string | undefined>
  prefijo?: string
}

function convertirHex(color: string): RGB | undefined {
  const valor = color.replace('#', '')

  if (!/^[\da-f]{3,8}$/i.test(valor) || ![3, 4, 6, 8].includes(valor.length)) {
    return undefined
  }

  const rgb =
    valor.length <= 4
      ? valor
          .slice(0, 3)
          .split('')
          .map((canal) => canal.repeat(2))
      : [valor.slice(0, 2), valor.slice(2, 4), valor.slice(4, 6)]

  return {
    r: Number.parseInt(rgb[0], 16),
    g: Number.parseInt(rgb[1], 16),
    b: Number.parseInt(rgb[2], 16),
  }
}

function convertirRgb(color: string): RGB | undefined {
  const coincidencia = color.match(
    /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*[\d.]+%?)?\s*\)$/i,
  )

  if (!coincidencia) return undefined

  return {
    r: Math.min(255, Number(coincidencia[1])),
    g: Math.min(255, Number(coincidencia[2])),
    b: Math.min(255, Number(coincidencia[3])),
  }
}

function luminancia({ r, g, b }: RGB): number {
  const canales = [r, g, b].map((canal) => {
    const valor = canal / 255
    return valor <= 0.04045 ? valor / 12.92 : ((valor + 0.055) / 1.055) ** 2.4
  })

  return canales[0] * 0.2126 + canales[1] * 0.7152 + canales[2] * 0.0722
}

export function obtenerColorContraste(color: string): '#000000' | '#ffffff' {
  const rgb = convertirHex(color) ?? convertirRgb(color)

  if (!rgb) return '#ffffff'

  const fondo = luminancia(rgb)
  const contrasteNegro = (fondo + 0.05) / 0.05
  const contrasteBlanco = 1.05 / (fondo + 0.05)

  return contrasteNegro >= contrasteBlanco ? '#000000' : '#ffffff'
}

export function useColor(
  color: MaybeRefOrGetter<string | undefined>,
  options: UseColorOptions = {},
) {
  const colorContraste = computed(() => {
    const valor = toValue(color)
    if (!valor) return undefined

    return toValue(options.contraste) ?? obtenerColorContraste(valor)
  })

  const variablesColor = computed(() => {
    const valor = toValue(color)
    if (!valor) return undefined

    const prefijo = options.prefijo ?? 'color'
    const contraste = colorContraste.value ?? '#ffffff'
    const ajusteHover = contraste === '#000000' ? '#000000' : '#ffffff'

    return {
      [`--${prefijo}-color`]: valor,
      [`--${prefijo}-contraste`]: contraste,
      [`--${prefijo}-hover`]: `color-mix(in srgb, ${valor} 88%, ${ajusteHover})`,
      [`--${prefijo}-active`]: `color-mix(in srgb, ${valor} 76%, ${ajusteHover})`,
      [`--${prefijo}-suave`]: `color-mix(in srgb, ${valor} 16%, transparent)`,
      [`--${prefijo}-suave-hover`]: `color-mix(in srgb, ${valor} 24%, transparent)`,
      [`--${prefijo}-suave-active`]: `color-mix(in srgb, ${valor} 32%, transparent)`,
    }
  })

  return {
    colorContraste,
    variablesColor,
  }
}
