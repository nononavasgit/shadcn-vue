import type { CortesiaAnunciador } from '@/composables/useAnunciador'

export { default as Announcer } from './Announcer.vue'

export interface AnunciadorProps {
  atomico?: boolean
  cortesia?: CortesiaAnunciador
}

export interface AnunciadorSlotProps {
  mensaje: string
}
