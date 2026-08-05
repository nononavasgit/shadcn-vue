import { readonly, ref } from 'vue'
import type { Messages } from './schema'
import en from './locales/en'
import es from './locales/es'
import ptBR from './locales/pt-BR'
import ptPT from './locales/pt-PT'

const translations = {
  en,
  es,
  'pt-BR': ptBR,
  'pt-PT': ptPT,
} satisfies Record<string, Messages>

export type SupportedLocale = keyof typeof translations
export type TranslationKey = keyof Messages

function normalizeLocale(locale: string): SupportedLocale | undefined {
  const normalized = locale.trim().replaceAll('_', '-').toLowerCase()

  if (normalized === 'pt-br' || normalized.startsWith('pt-br-')) return 'pt-BR'
  if (normalized === 'pt-pt' || normalized.startsWith('pt-pt-')) return 'pt-PT'
  if (normalized === 'pt') return 'pt-BR'
  if (normalized.startsWith('pt-')) return 'pt-PT'
  if (normalized === 'es' || normalized.startsWith('es-')) return 'es'
  if (normalized === 'en' || normalized.startsWith('en-')) return 'en'
}

function getBrowserLocales() {
  const locales: string[] = []

  if (typeof document !== 'undefined' && document.documentElement.lang) {
    locales.push(document.documentElement.lang)
  }

  if (typeof navigator !== 'undefined') {
    locales.push(...(navigator.languages.length ? navigator.languages : [navigator.language]))
  }

  return locales
}

export function resolveLocale(locale?: string): SupportedLocale {
  const candidates = locale ? [locale] : getBrowserLocales()

  for (const candidate of candidates) {
    const supportedLocale = normalizeLocale(candidate)
    if (supportedLocale) return supportedLocale
  }

  return 'en'
}

const locale = ref<SupportedLocale>(resolveLocale())

export function setLocale(value?: string) {
  locale.value = resolveLocale(value)
}

export function useI18n() {
  function t(key: TranslationKey, params?: Record<string, string | number>) {
    const message = translations[locale.value][key]

    if (!params) return message

    return Object.entries(params).reduce(
      (result, [name, value]) => result.replaceAll('{' + name + '}', String(value)),
      message,
    )
  }

  return {
    locale: readonly(locale),
    t,
  }
}
