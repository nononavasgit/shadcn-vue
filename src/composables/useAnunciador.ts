import { getCurrentInstance, shallowRef } from 'vue'
import type { App, Ref } from 'vue'

export type CortesiaAnunciador = 'assertive' | 'polite' | 'off'

export interface OpcionesUseAnunciador {
  cortesia?: CortesiaAnunciador
}

export interface InstanciaAnunciador {
  mensaje: Ref<string>
  cortesia: Ref<CortesiaAnunciador>
  establecer: (mensaje: string, cortesia?: CortesiaAnunciador) => void
  polite: (mensaje: string) => void
  assertive: (mensaje: string) => void
}

function crearAnunciador(opciones: OpcionesUseAnunciador = {}): InstanciaAnunciador {
  const mensaje = shallowRef('')
  const cortesia = shallowRef<CortesiaAnunciador>(opciones.cortesia ?? 'polite')

  function establecer(valor = '', urgencia: CortesiaAnunciador = 'polite') {
    mensaje.value = valor
    cortesia.value = urgencia
  }

  return {
    mensaje,
    cortesia,
    establecer,
    polite: (valor) => establecer(valor, 'polite'),
    assertive: (valor) => establecer(valor, 'assertive'),
  }
}

const anunciadores = new WeakMap<App, InstanciaAnunciador>()
const anunciadorAlternativo = crearAnunciador()

export function useAnunciador(opciones: OpcionesUseAnunciador = {}): InstanciaAnunciador {
  const app = getCurrentInstance()?.appContext.app
  let anunciador = anunciadorAlternativo

  if (app) {
    anunciador = anunciadores.get(app) ?? crearAnunciador(opciones)
    anunciadores.set(app, anunciador)
  }

  if (opciones.cortesia) anunciador.cortesia.value = opciones.cortesia

  return anunciador
}
