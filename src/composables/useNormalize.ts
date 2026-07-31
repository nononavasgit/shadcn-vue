import { HTMLAttributes } from 'vue'

/** Normalizes HTML attributes */
export function normalizeHTMLAttributes(value: HTMLAttributes | undefined): HTMLAttributes {
  if (!value) return {}

  const { class: className, style, id, title, role, tabindex, ...attrs } = value

  return {
    class: className as HTMLAttributes['class'],
    style: style as HTMLAttributes['style'],
    id: id as string | undefined,
    title: title as string | undefined,
    role: role as string | undefined,
    tabindex: tabindex as HTMLAttributes['tabindex'],
    ...attrs,
  }
}
