import type { InjectionKey, Ref } from 'vue'

export interface ApiTableRow {
  name: string
  type: string
  typeLink?: string
  typeParts?: Array<{
    text: string
    link?: string
  }>
  default?: string
  description: string
  required?: boolean
}

export interface ApiRegistry {
  props: Ref<ApiTableRow[]>
  emits: Ref<ApiTableRow[]>
  slots: Ref<ApiTableRow[]>
}

export const apiRegistryKey: InjectionKey<ApiRegistry> = Symbol('docs-api-registry')
