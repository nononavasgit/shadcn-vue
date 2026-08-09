import { isKnownHtmlAttr, isKnownMathMLAttr, isKnownSvgAttr } from '@vue/shared'

function isNativeAttribute(key: string): boolean {
  const normalized = key.toLowerCase()

  return (
    isKnownHtmlAttr(normalized) ||
    isKnownSvgAttr(key) ||
    isKnownSvgAttr(normalized) ||
    isKnownMathMLAttr(normalized) ||
    normalized.startsWith('aria-') ||
    normalized.startsWith('data-')
  )
}

/** Removes non-native HTML, SVG and MathML attributes. SSR safe. */
export function normalizeHTMLAttributes<T extends object>(value: T | undefined): T {
  if (!value) return {} as T

  return Object.fromEntries(Object.entries(value).filter(([key]) => isNativeAttribute(key))) as T
}
