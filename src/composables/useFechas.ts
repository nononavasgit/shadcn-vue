export type ValorFecha = Date | number | string

export interface OpcionesFormatoFecha {
  locale?: string | string[]
  formato?: Intl.DateTimeFormatOptions
}

export function obtenerLocalePredeterminado(): string {
  if (typeof navigator !== 'undefined') {
    return navigator.language || navigator.languages?.[0] || 'en-US'
  }

  return Intl.DateTimeFormat().resolvedOptions().locale
}

export function normalizarFecha(valor: ValorFecha): Date | number {
  return typeof valor === 'string' ? new Date(valor) : valor
}

export function aDatetime(valor: ValorFecha): string {
  if (typeof valor === 'string') return valor

  return new Date(valor).toISOString()
}

export function formatearFecha(valor: ValorFecha, opciones: OpcionesFormatoFecha = {}): string {
  return new Intl.DateTimeFormat(opciones.locale ?? obtenerLocalePredeterminado(), {
    timeZone: 'UTC',
    ...opciones.formato,
  }).format(normalizarFecha(valor))
}

export function useFechas() {
  return {
    formatearFecha,
    obtenerLocalePredeterminado,
    normalizarFecha,
    aDatetime,
  }
}
