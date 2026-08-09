export type EmitsAsProps<T> = {
  [
    K in keyof T as K extends string ? `on${Capitalize<K>}` : never
  ]?: T[K] extends readonly unknown[] ? (...args: T[K]) => void : never
}
