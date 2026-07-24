import { getCurrentInstance, shallowRef } from 'vue'
import type { App, Ref } from 'vue'

export type AnnouncerPoliteness = 'assertive' | 'polite' | 'off'

export interface UseAnnouncerOptions {
  politeness?: AnnouncerPoliteness
}

export interface AnnouncerInstance {
  message: Ref<string>
  politeness: Ref<AnnouncerPoliteness>
  set: (message: string, politeness?: AnnouncerPoliteness) => void
  polite: (message: string) => void
  assertive: (message: string) => void
}

function createAnnouncer(options: UseAnnouncerOptions = {}): AnnouncerInstance {
  const message = shallowRef('')
  const politeness = shallowRef<AnnouncerPoliteness>(options.politeness ?? 'polite')

  function set(value = '', urgency: AnnouncerPoliteness = 'polite') {
    message.value = value
    politeness.value = urgency
  }

  return {
    message,
    politeness,
    set,
    polite: (value) => set(value, 'polite'),
    assertive: (value) => set(value, 'assertive'),
  }
}

const announcers = new WeakMap<App, AnnouncerInstance>()
const fallbackAnnouncer = createAnnouncer()

export function useAnnouncer(options: UseAnnouncerOptions = {}): AnnouncerInstance {
  const app = getCurrentInstance()?.appContext.app
  let announcer = fallbackAnnouncer

  if (app) {
    announcer = announcers.get(app) ?? createAnnouncer(options)
    announcers.set(app, announcer)
  }

  if (options.politeness) announcer.politeness.value = options.politeness

  return announcer
}
