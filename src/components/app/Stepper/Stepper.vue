<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import {
  Stepper as StepperBase,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/Stepper'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type {
  StepperContextoUI,
  StepperEstado,
  StepperProps,
  StepperSlotProps,
  StepperSlots,
  StepperValorUI,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<StepperProps>(), {
  orientacion: 'horizontal',
  pasos: () => [],
})
defineSlots<StepperSlots>()

const attrs = useAttrs()
const slots = useSlots()
const modelo = defineModel<number>()
const { colorStyle } = useColor(
  computed(() => props.color),
  'stepper',
)

interface EstadoRaizOriginal {
  modelValue: number | undefined
  totalSteps: number
  isNextDisabled: boolean
  isPrevDisabled: boolean
  isFirstStep: boolean
  isLastStep: boolean
  goToStep: (paso: number) => void
  nextStep: () => void
  prevStep: () => void
  hasNext: () => boolean
  hasPrev: () => boolean
}

const uiCalculado = computed(() => {
  const pasoActual = modelo.value
  const vertical = props.orientacion === 'vertical'
  const claseActivador = cn(
    'z-10 border border-transparent outline-none focus-visible:ring-3',
    props.color
      ? 'focus-visible:border-(--stepper-color) focus-visible:ring-(--stepper-color)/50'
      : 'focus-visible:border-primary focus-visible:ring-primary/50',
    vertical && 'flex-row items-start gap-3 p-0 text-left',
  )
  const claseIndicador =
    props.color &&
    'group-data-[state=active]:bg-(--stepper-color) group-data-[state=active]:text-(--stepper-color-foreground) group-data-[state=completed]:bg-(--stepper-color) group-data-[state=completed]:text-(--stepper-color-foreground)'
  const claseSeparador = cn(
    vertical
      ? 'absolute top-10 left-5 h-[calc(100%+1.5rem)] w-0.5 -translate-x-1/2 rounded-full'
      : 'absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] h-0.5 shrink-0 rounded-full',
    props.color && 'group-data-[state=completed]:bg-(--stepper-color)',
  )

  return {
    raiz: {
      ...attrs,
      as: props.as,
      asChild: props.asChild,
      orientation: props.orientacion,
      dir: props.dir,
      linear: props.lineal,
      class: cn('block w-full', attrs.class),
      style: [colorStyle.value, attrs.style],
    },
    lista: {
      ...props.ui?.lista,
      class: cn(
        'flex w-full',
        vertical ? 'flex-col gap-6' : 'items-start gap-2',
        props.ui?.lista?.class,
      ),
    },
    pasos: props.pasos.map((paso, indice) => {
      const estado: StepperEstado = paso.completado
        ? 'completado'
        : paso.paso === pasoActual
          ? 'activo'
          : pasoActual !== undefined && paso.paso < pasoActual
            ? 'completado'
            : 'inactivo'
      const contexto: StepperContextoUI = {
        paso,
        indice,
        estado,
        activo: estado === 'activo',
        primero: indice === 0,
        ultimo: indice === props.pasos.length - 1,
      }
      const resolverUI = <T,>(valor: StepperValorUI<T> | undefined): T | undefined =>
        typeof valor === 'function'
          ? (valor as (contexto: StepperContextoUI) => T)(contexto)
          : valor
      const uiElemento = resolverUI(props.ui?.elemento)
      const uiActivador = resolverUI(props.ui?.activador)
      const uiIndicador = resolverUI(props.ui?.indicador)
      const uiEncabezado = resolverUI(props.ui?.encabezado)
      const uiIcono = resolverUI(props.ui?.icono)
      const uiTitulo = resolverUI(props.ui?.titulo)
      const uiDescripcion = resolverUI(props.ui?.descripcion)
      const uiSeparador = resolverUI(props.ui?.separador)
      const uiContenido = resolverUI(props.ui?.contenido)
      const clave = String(paso.clave ?? paso.paso)
      const nombres = {
        elemento: `elemento-${clave}`,
        encabezado: `encabezado-${clave}`,
        indicador: `indicador-${clave}`,
        icono: `icono-${clave}`,
        titulo: `titulo-${clave}`,
        descripcion: `descripcion-${clave}`,
        separador: `separador-${clave}`,
        contenido: `contenido-${clave}`,
      } as const
      const icono = typeof paso.icono === 'string' ? { nombre: paso.icono } : paso.icono

      return {
        clave,
        datos: paso,
        contexto,
        nombres,
        elemento: {
          ...uiElemento,
          step: paso.paso,
          disabled: paso.deshabilitado,
          completed: paso.completado,
          class: cn(
            vertical
              ? 'relative flex w-full items-start gap-4'
              : 'relative flex w-full flex-col items-center justify-center',
            uiElemento?.class,
          ),
          style: uiElemento?.style,
        },
        activador: {
          ...uiActivador,
          class: cn(claseActivador, uiActivador?.class),
          style: uiActivador?.style,
        },
        indicador: {
          ...uiIndicador,
          class: cn(claseIndicador, uiIndicador?.class),
          style: uiIndicador?.style,
        },
        encabezado: {
          ...uiEncabezado,
          class: cn('flex min-w-0 flex-col', uiEncabezado?.class),
          style: uiEncabezado?.style,
        },
        icono: {
          ...uiIcono,
          ...icono,
          nombre: icono?.nombre ?? 'check',
          class: cn(uiIcono?.class, icono?.class),
          style: [uiIcono?.style, icono?.style],
        },
        titulo: {
          ...uiTitulo,
          class: cn(uiTitulo?.class),
          style: uiTitulo?.style,
        },
        descripcion: {
          ...uiDescripcion,
          class: cn(uiDescripcion?.class),
          style: uiDescripcion?.style,
        },
        separador: {
          ...uiSeparador,
          class: cn(claseSeparador, uiSeparador?.class),
          style: uiSeparador?.style,
        },
        contenido: {
          ...uiContenido,
          class: cn('mt-6', uiContenido?.class),
          style: uiContenido?.style,
        },
        mostrarEncabezado: Boolean(
          paso.titulo ||
          paso.descripcion ||
          slots.encabezado ||
          slots.titulo ||
          slots.descripcion ||
          slots[nombres.encabezado] ||
          slots[nombres.titulo] ||
          slots[nombres.descripcion],
        ),
        mostrarTitulo: Boolean(paso.titulo || slots.titulo || slots[nombres.titulo]),
        mostrarDescripcion: Boolean(
          paso.descripcion || slots.descripcion || slots[nombres.descripcion],
        ),
        mostrarContenido: Boolean(
          paso.contenido || slots.default || slots.contenido || slots[nombres.contenido],
        ),
        propiedadesSlot: (raiz: EstadoRaizOriginal): StepperSlotProps => ({
          valor: raiz.modelValue,
          totalPasos: raiz.totalSteps,
          siguienteDeshabilitado: raiz.isNextDisabled,
          anteriorDeshabilitado: raiz.isPrevDisabled,
          primerPaso: raiz.isFirstStep,
          ultimoPaso: raiz.isLastStep,
          irAlPaso: raiz.goToStep,
          siguientePaso: raiz.nextStep,
          pasoAnterior: raiz.prevStep,
          tieneSiguiente: raiz.hasNext,
          tieneAnterior: raiz.hasPrev,
          ...contexto,
        }),
      }
    }),
  }
})
</script>

<template>
  <StepperBase v-slot="estadoRaiz" v-bind="uiCalculado.raiz" v-model="modelo">
    <div v-bind="uiCalculado.lista" data-slot="stepper-list">
      <StepperItem v-for="item in uiCalculado.pasos" :key="item.clave" v-bind="item.elemento">
        <slot :name="item.nombres.elemento" v-bind="item.propiedadesSlot(estadoRaiz)">
          <slot name="elemento" v-bind="item.propiedadesSlot(estadoRaiz)">
            <StepperTrigger v-bind="item.activador">
              <slot :name="item.nombres.encabezado" v-bind="item.propiedadesSlot(estadoRaiz)">
                <slot name="encabezado" v-bind="item.propiedadesSlot(estadoRaiz)">
                  <StepperIndicator v-bind="item.indicador">
                    <slot :name="item.nombres.indicador" v-bind="item.propiedadesSlot(estadoRaiz)">
                      <slot name="indicador" v-bind="item.propiedadesSlot(estadoRaiz)">
                        <slot :name="item.nombres.icono" v-bind="item.propiedadesSlot(estadoRaiz)">
                          <slot name="icono" v-bind="item.propiedadesSlot(estadoRaiz)">
                            <Icon
                              v-if="item.datos.icono || item.contexto.estado === 'completado'"
                              v-bind="item.icono"
                            />
                            <span v-else>{{ item.datos.paso }}</span>
                          </slot>
                        </slot>
                      </slot>
                    </slot>
                  </StepperIndicator>

                  <div v-if="item.mostrarEncabezado" v-bind="item.encabezado">
                    <StepperTitle v-if="item.mostrarTitulo" v-bind="item.titulo">
                      <slot :name="item.nombres.titulo" v-bind="item.propiedadesSlot(estadoRaiz)">
                        <slot name="titulo" v-bind="item.propiedadesSlot(estadoRaiz)">
                          {{ item.datos.titulo }}
                        </slot>
                      </slot>
                    </StepperTitle>

                    <StepperDescription v-if="item.mostrarDescripcion" v-bind="item.descripcion">
                      <slot
                        :name="item.nombres.descripcion"
                        v-bind="item.propiedadesSlot(estadoRaiz)"
                      >
                        <slot name="descripcion" v-bind="item.propiedadesSlot(estadoRaiz)">
                          {{ item.datos.descripcion }}
                        </slot>
                      </slot>
                    </StepperDescription>
                  </div>
                </slot>
              </slot>
            </StepperTrigger>

            <template v-if="!item.contexto.ultimo">
              <slot :name="item.nombres.separador" v-bind="item.propiedadesSlot(estadoRaiz)">
                <slot name="separador" v-bind="item.propiedadesSlot(estadoRaiz)">
                  <StepperSeparator v-bind="item.separador" />
                </slot>
              </slot>
            </template>
          </slot>
        </slot>
      </StepperItem>
    </div>

    <template v-for="item in uiCalculado.pasos" :key="`contenido-${item.clave}`">
      <div
        v-if="item.datos.paso === estadoRaiz.modelValue && item.mostrarContenido"
        v-bind="item.contenido"
        data-slot="stepper-content"
      >
        <slot :name="item.nombres.contenido" v-bind="item.propiedadesSlot(estadoRaiz)">
          <slot name="contenido" v-bind="item.propiedadesSlot(estadoRaiz)">
            <slot v-bind="item.propiedadesSlot(estadoRaiz)">
              {{ item.datos.contenido }}
            </slot>
          </slot>
        </slot>
      </div>
    </template>
  </StepperBase>
</template>
