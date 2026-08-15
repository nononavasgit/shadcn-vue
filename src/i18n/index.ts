import { createI18n, useI18n as useVueI18n } from 'vue-i18n'
import type { Messages } from './schema'
import ar from './locales/ar'
import en from './locales/en'
import es from './locales/es'
import ptBR from './locales/pt-BR'
import ptPT from './locales/pt-PT'

export const messages = {
  ar,
  en,
  es,
  'pt-BR': ptBR,
  'pt-PT': ptPT,
} satisfies Record<string, Messages>

export type SupportedLocale = keyof typeof messages
export type TranslationKey = keyof Messages

function normalizeLocale(locale: string): SupportedLocale | undefined {
  const normalized = locale.trim().replaceAll('_', '-').toLowerCase()

  if (normalized === 'ar' || normalized.startsWith('ar-')) return 'ar'
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

export const i18n = createI18n<[Messages], SupportedLocale>({
  legacy: false,
  locale: resolveLocale(),
  fallbackLocale: 'en',
  messages,
})

export function setLocale(value?: string) {
  const locale = resolveLocale(value)
  i18n.global.locale.value = locale

  return locale
}

export function useI18n() {
  return useVueI18n<{ message: Messages }, SupportedLocale>({ useScope: 'global' })
}

export { getTextDirection, type TextDirection } from './direction'
