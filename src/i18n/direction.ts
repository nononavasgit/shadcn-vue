export type TextDirection = 'ltr' | 'rtl'

const rtlLanguages = new Set(['ar', 'fa', 'he', 'ps', 'ur'])

export function getTextDirection(locale: string): TextDirection {
  const language = locale.trim().replaceAll('_', '-').split('-')[0]?.toLowerCase()

  return language && rtlLanguages.has(language) ? 'rtl' : 'ltr'
}
