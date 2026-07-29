<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Collapsible } from '@/components/app/Collapsible'
import { Dialog } from '@/components/app/Dialog'
import { HoverCard } from '@/components/app/HoverCard'
import { Kbd, KbdGroup } from '@/components/app/Kbd'
import { Panel } from '@/components/app/Panel'
import { Popover } from '@/components/app/Popover'
import { Progress } from '@/components/app/Progress'
import { ProgressCircular } from '@/components/app/ProgressCircular'
import { Separator } from '@/components/app/Separator'
import { Time } from '@/components/app/Time'
import { Tooltip } from '@/components/app/Tooltip'

const fixedDate = new Date('2026-07-28T18:30:00.000Z')
const timestamp = Date.UTC(2026, 6, 28, 18, 30)
const now = ref(new Date())
const tooltipOpen = ref(false)
const popoverOpen = ref(false)
const hoverCardOpen = ref(false)
const collapsibleOpen = ref(false)
const dialogOpen = ref(false)
const panelOpen = ref(true)
const progressValue = ref(68)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer !== undefined) window.clearInterval(timer)
})
</script>

<template>
  <main class="mx-auto max-w-4xl space-y-12 p-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Time & Kbd</h1>
      <p class="text-muted-foreground">Ejemplos de los componentes con su nueva API en inglés.</p>
    </header>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Time básico</h2>
        <p class="text-sm text-muted-foreground">
          Acepta cadenas, objetos Date y marcas de tiempo numéricas.
        </p>
      </div>

      <div class="grid gap-3 rounded-lg border p-5 sm:grid-cols-3">
        <div class="space-y-1">
          <p class="text-xs font-medium text-muted-foreground">ISO string</p>
          <Time datetime="2026-07-28T18:30:00.000Z" locale="es-ES" />
        </div>

        <div class="space-y-1">
          <p class="text-xs font-medium text-muted-foreground">Date</p>
          <Time :datetime="fixedDate" locale="es-ES" />
        </div>

        <div class="space-y-1">
          <p class="text-xs font-medium text-muted-foreground">Timestamp</p>
          <Time :datetime="timestamp" locale="es-ES" />
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Formatos de fecha</h2>

      <div class="grid gap-4 sm:grid-cols-2">
        <article class="rounded-lg border p-4">
          <p class="mb-2 text-sm text-muted-foreground">Fecha completa</p>
          <Time
            :datetime="fixedDate"
            locale="es-ES"
            :format="{
              dateStyle: 'full',
            }"
            class="font-medium"
          />
        </article>

        <article class="rounded-lg border p-4">
          <p class="mb-2 text-sm text-muted-foreground">Fecha y hora</p>
          <Time
            :datetime="fixedDate"
            locale="es-ES"
            :format="{
              dateStyle: 'medium',
              timeStyle: 'short',
            }"
            class="font-medium"
          />
        </article>

        <article class="rounded-lg border p-4">
          <p class="mb-2 text-sm text-muted-foreground">Mes y año</p>
          <Time
            :datetime="fixedDate"
            locale="es-ES"
            :format="{
              month: 'long',
              year: 'numeric',
            }"
            class="font-medium capitalize"
          />
        </article>

        <article class="rounded-lg border p-4">
          <p class="mb-2 text-sm text-muted-foreground">Solo hora</p>
          <Time
            :datetime="fixedDate"
            locale="es-ES"
            :format="{
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            }"
            class="font-mono font-medium"
          />
        </article>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Diferentes locales</h2>

      <div class="overflow-hidden rounded-lg border">
        <div class="grid grid-cols-[8rem_1fr] border-b p-3">
          <span class="text-sm font-medium">Español</span>
          <Time :datetime="fixedDate" locale="es-ES" :format="{ dateStyle: 'long' }" />
        </div>
        <div class="grid grid-cols-[8rem_1fr] border-b p-3">
          <span class="text-sm font-medium">English</span>
          <Time :datetime="fixedDate" locale="en-US" :format="{ dateStyle: 'long' }" />
        </div>
        <div class="grid grid-cols-[8rem_1fr] border-b p-3">
          <span class="text-sm font-medium">Français</span>
          <Time :datetime="fixedDate" locale="fr-FR" :format="{ dateStyle: 'long' }" />
        </div>
        <div class="grid grid-cols-[8rem_1fr] p-3">
          <span class="text-sm font-medium">日本語</span>
          <Time :datetime="fixedDate" locale="ja-JP" :format="{ dateStyle: 'long' }" />
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Fecha en vivo y slot personalizado</h2>

      <div class="flex flex-wrap items-center gap-4 rounded-lg border p-5">
        <div>
          <p class="text-xs text-muted-foreground">Hora actual</p>
          <Time
            :datetime="now"
            locale="es-ES"
            :format="{
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }"
            class="font-mono text-2xl font-semibold tabular-nums"
          />
        </div>

        <Time :datetime="fixedDate" locale="es-ES" :format="{ dateStyle: 'medium' }">
          <template #default="{ date }">
            <span class="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700">
              📅 {{ date }}
            </span>
          </template>
        </Time>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Kbd básico</h2>
        <p class="text-sm text-muted-foreground">Contenido mediante title o mediante el slot.</p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Kbd label="Esc" />
        <Kbd label="Enter" />
        <Kbd label="Tab" />
        <Kbd label="⌘" />
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Alt</Kbd>
        <Kbd>Space</Kbd>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Combinaciones con KbdGroup</h2>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="flex items-center justify-between rounded-lg border p-4">
          <span class="text-sm">Guardar</span>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>S</Kbd>
          </KbdGroup>
        </div>

        <div class="flex items-center justify-between rounded-lg border p-4">
          <span class="text-sm">Buscar</span>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>

        <div class="flex items-center justify-between rounded-lg border p-4">
          <span class="text-sm">Cerrar ventana</span>
          <KbdGroup>
            <Kbd>Alt</Kbd>
            <span>+</span>
            <Kbd>F4</Kbd>
          </KbdGroup>
        </div>

        <div class="flex items-center justify-between rounded-lg border p-4">
          <span class="text-sm">Paleta de comandos</span>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <span>+</span>
            <Kbd>Shift</Kbd>
            <span>+</span>
            <Kbd>P</Kbd>
          </KbdGroup>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Kbd dentro de texto</h2>

      <div class="space-y-3 rounded-lg border p-5 text-sm leading-7">
        <p>
          Pulsa
          <KbdGroup class="mx-1 inline-flex">
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>K</Kbd>
          </KbdGroup>
          para abrir el buscador.
        </p>
        <p>
          Usa <Kbd class="mx-1">Esc</Kbd> para cerrar el diálogo o
          <Kbd class="mx-1">Enter</Kbd> para confirmar.
        </p>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Tooltip</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos con contenido directo, slot personalizado y estado controlado.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 rounded-lg border p-5">
        <Tooltip content="Guarda los cambios">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">Tooltip básico</button>
        </Tooltip>

        <Tooltip side="right" :side-offset="8">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">
            Contenido con slot
          </button>

          <template #content>
            <span class="font-medium">Tooltip personalizado</span>
          </template>
        </Tooltip>

        <Tooltip v-model:open="tooltipOpen" content="Estado controlado" side="bottom">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">
            {{ tooltipOpen ? 'Abierto' : 'Cerrado' }}
          </button>
        </Tooltip>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Popover</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos con slot de contenido, cierre desde el slot y v-model.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 rounded-lg border p-5">
        <Popover>
          <button class="rounded-md border px-4 py-2 text-sm font-medium">Abrir popover</button>

          <template #content="{ close }">
            <div class="w-64 space-y-3 p-1">
              <div>
                <p class="font-medium">Preferencias</p>
                <p class="text-sm text-muted-foreground">Configura las opciones del elemento.</p>
              </div>
              <button
                class="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-white"
                @click="close"
              >
                Guardar y cerrar
              </button>
            </div>
          </template>
        </Popover>

        <Popover v-model:open="popoverOpen" side="right" align="start">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">
            Popover {{ popoverOpen ? 'abierto' : 'cerrado' }}
          </button>

          <template #content="{ open, close }">
            <div class="w-56 space-y-3 p-1">
              <p class="text-sm">Estado del slot: {{ open ? 'abierto' : 'cerrado' }}</p>
              <button class="rounded-md border px-3 py-1.5 text-sm" @click="close">Cerrar</button>
            </div>
          </template>
        </Popover>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Separator</h2>
        <p class="text-sm text-muted-foreground">
          Separadores horizontales y verticales con la API en inglés.
        </p>
      </div>

      <div class="space-y-5 rounded-lg border p-5">
        <div class="space-y-1">
          <p class="font-medium">Cuenta</p>
          <p class="text-sm text-muted-foreground">Gestiona los datos de tu perfil.</p>
        </div>

        <Separator />

        <div class="flex h-5 items-center gap-4 text-sm">
          <span>Perfil</span>
          <Separator orientation="vertical" />
          <span>Seguridad</span>
          <Separator orientation="vertical" />
          <span>Notificaciones</span>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">HoverCard</h2>
        <p class="text-sm text-muted-foreground">
          Contenido directo, slot personalizado y estado controlado.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-6 rounded-lg border p-5">
        <HoverCard content="Documentación y ejemplos del componente." side="top">
          <a href="#" class="font-medium underline underline-offset-4">@shadcn-vue</a>
        </HoverCard>

        <HoverCard :open-delay="200" :close-delay="150" side="right" align="start">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">Ver perfil</button>

          <template #content="{ open }">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="grid size-10 place-items-center rounded-full bg-zinc-900 text-white">
                  NN
                </div>
                <div>
                  <p class="font-semibold">Nono Navas</p>
                  <p class="text-sm text-muted-foreground">@nononavas</p>
                </div>
              </div>
              <p class="text-sm">Estado recibido por el slot: {{ open ? 'abierto' : 'cerrado' }}</p>
            </div>
          </template>
        </HoverCard>

        <HoverCard v-model:open="hoverCardOpen" content="HoverCard controlado">
          <button class="rounded-md border px-4 py-2 text-sm font-medium">
            {{ hoverCardOpen ? 'HoverCard abierto' : 'HoverCard cerrado' }}
          </button>
        </HoverCard>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Collapsible</h2>
        <p class="text-sm text-muted-foreground">Ejemplos básico, controlado y deshabilitado.</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <Collapsible class="rounded-lg border">
          <template #default="{ open }">
            <button class="flex w-full items-center justify-between p-4 text-left font-medium">
              Detalles del proyecto
              <span class="text-sm text-muted-foreground">{{ open ? '−' : '+' }}</span>
            </button>
          </template>
          <template #content>
            <div class="border-t p-4 text-sm text-muted-foreground">
              Este contenido se muestra y oculta al pulsar el encabezado.
            </div>
          </template>
        </Collapsible>

        <div class="space-y-3">
          <Collapsible v-model:open="collapsibleOpen" class="rounded-lg border">
            <template #default="{ open }">
              <button class="flex w-full items-center justify-between p-4 text-left font-medium">
                Estado controlado
                <span class="text-sm text-muted-foreground">{{
                  open ? 'Abierto' : 'Cerrado'
                }}</span>
              </button>
            </template>
            <template #content="{ open }">
              <div class="border-t p-4 text-sm text-muted-foreground">
                El valor de <code>open</code> es {{ open }}.
              </div>
            </template>
          </Collapsible>
          <button
            class="rounded-md border px-3 py-2 text-sm font-medium"
            @click="collapsibleOpen = !collapsibleOpen"
          >
            Cambiar desde fuera
          </button>
        </div>

        <Collapsible disabled class="rounded-lg border opacity-60">
          <template #default>
            <button class="w-full p-4 text-left font-medium">Collapsible deshabilitado</button>
          </template>
          <template #content>
            <div class="border-t p-4 text-sm">Este contenido no se puede abrir.</div>
          </template>
        </Collapsible>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Panel</h2>
        <p class="text-sm text-muted-foreground">
          Paneles plegables, personalizados y con encabezado fijo.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <Panel label="Panel básico" :ui="{ arrows: { style: { color: 'red' } } }">
          <p class="text-sm">Un panel plegable con los valores predeterminados del componente.</p>
        </Panel>

        <Panel v-model:open="panelOpen" label="Panel controlado" severity="success" variant="soft">
          <div class="space-y-3">
            <p class="text-sm">Su estado también se puede cambiar desde un control externo.</p>
            <button
              class="rounded-md border px-3 py-1.5 text-sm font-medium"
              @click="panelOpen = false"
            >
              Cerrar panel
            </button>
          </div>
        </Panel>

        <Panel label="Información permanente" severity="secondary" :collapsible="false">
          <p class="text-sm">
            Con <code>collapsible="false"</code>, el contenido permanece siempre visible.
          </p>
        </Panel>

        <Panel color="#7c3aed" variant="outline">
          <template #label="{ open }">
            Panel personalizado · {{ open ? 'abierto' : 'cerrado' }}
          </template>
          <template #arrows="{ open }">
            <span class="text-xs font-semibold">{{ open ? 'Ocultar' : 'Mostrar' }}</span>
          </template>
          <p class="text-sm">
            Los slots permiten personalizar la etiqueta y el indicador del encabezado.
          </p>
        </Panel>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Progress</h2>
        <p class="text-sm text-muted-foreground">
          Valores básicos, colores personalizados, límites y etiquetas mediante slots.
        </p>
      </div>

      <div class="grid gap-5 rounded-lg border p-5 sm:grid-cols-2">
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span>Progreso básico</span>
            <span>{{ progressValue }}%</span>
          </div>
          <Progress :value="progressValue" aria-label="Progreso básico" />
        </div>

        <div class="space-y-2">
          <p class="text-sm">Valor máximo personalizado</p>
          <Progress :value="7" :max="10" label="7 de 10" color="#16a34a" />
        </div>

        <div class="space-y-2">
          <p class="text-sm">Colores personalizados</p>
          <Progress
            :value="45"
            color="#7c3aed"
            track-color="#ede9fe"
            aria-label="Progreso personalizado"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm">Etiqueta con slot</p>
          <Progress :value="progressValue" color="#ea580c">
            <template #label="{ percentage }">{{ Math.round(percentage) }}% completado</template>
          </Progress>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          class="rounded-md border px-3 py-2 text-sm font-medium"
          @click="progressValue = Math.max(0, progressValue - 10)"
        >
          Reducir
        </button>
        <button
          class="rounded-md border px-3 py-2 text-sm font-medium"
          @click="progressValue = Math.min(100, progressValue + 10)"
        >
          Aumentar
        </button>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">ProgressCircular</h2>
        <p class="text-sm text-muted-foreground">
          Diferentes tamaños, grosores, colores y contenido central personalizado.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-8 rounded-lg border p-5">
        <div class="space-y-2 text-center">
          <ProgressCircular
            :value="progressValue"
            :label="`${progressValue}%`"
            aria-label="Progreso circular"
          />
          <p class="text-xs text-muted-foreground">Básico</p>
        </div>

        <div class="space-y-2 text-center">
          <ProgressCircular
            :value="3"
            :max="5"
            :size="104"
            :thickness="12"
            color="#16a34a"
            track-color="#dcfce7"
            label="3/5"
          />
          <p class="text-xs text-muted-foreground">Tamaño y grosor</p>
        </div>

        <div class="space-y-2 text-center">
          <ProgressCircular :value="progressValue" size="7rem" color="#7c3aed">
            <template #label="{ percentage }">
              <span class="text-lg font-bold">{{ Math.round(percentage) }}%</span>
            </template>
          </ProgressCircular>
          <p class="text-xs text-muted-foreground">Slot personalizado</p>
        </div>

        <div class="space-y-2 text-center">
          <ProgressCircular
            :value="82"
            :size="64"
            :thickness="5"
            color="#0284c7"
            aria-label="Progreso fino"
          />
          <p class="text-xs text-muted-foreground">Fino</p>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Dialog</h2>
        <p class="text-sm text-muted-foreground">
          Ejemplos básico, controlado y personalizado con la API en inglés.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 rounded-lg border p-5">
        <Dialog
          label="Información detallada y extraordinariamente extensa sobre la planificación, ejecución, seguimiento y mantenimiento futuro del proyecto"
          description="Consulta detenidamente todos los datos principales, las condiciones aplicables, las dependencias técnicas, los posibles riesgos y las decisiones pendientes antes de continuar con la siguiente fase del proceso."
          icon="info"
        >
          <button class="rounded-md border px-4 py-2 text-sm font-medium">
            Abrir diálogo básico
          </button>

          <template #content>
            <div class="space-y-4 py-2 text-sm leading-6">
              <p>
                Este contenido se proporciona mediante el slot <code>content</code> y contiene
                varios párrafos deliberadamente largos para comprobar que el diálogo distribuye
                correctamente el espacio disponible sin desplazar fuera de la pantalla el encabezado
                ni las acciones situadas en el pie.
              </p>
              <p class="text-muted-foreground">
                El proyecto reúne diferentes módulos que deben coordinarse durante varias fases.
                Cada módulo tiene responsables, dependencias, fechas objetivo y criterios de
                aceptación propios, por lo que cualquier cambio debe documentarse y comunicarse a
                todas las personas implicadas antes de incorporarse a la planificación definitiva.
              </p>
              <p class="text-muted-foreground">
                Durante la fase de implementación se revisarán periódicamente el rendimiento, la
                accesibilidad, la compatibilidad entre navegadores y la experiencia de uso. Los
                resultados de esas revisiones se conservarán junto con las decisiones técnicas para
                facilitar el mantenimiento y evitar que se repitan problemas ya resueltos.
              </p>
              <p class="text-muted-foreground">
                También se preparará una estrategia de publicación gradual que permita detectar
                incidencias con rapidez, limitar su impacto y recuperar una versión estable si fuera
                necesario. La estrategia incluirá métricas, alertas, responsables de guardia y un
                procedimiento claro para comunicar cualquier interrupción relevante del servicio.
              </p>
              <p class="text-muted-foreground">
                Finalmente, toda la documentación se actualizará para reflejar el comportamiento
                real del producto, incluyendo ejemplos completos, casos límite y recomendaciones
                para futuras ampliaciones. Este último párrafo añade altura suficiente para probar
                el desplazamiento vertical del cuerpo manteniendo visibles las demás secciones.
              </p>
              <p class="text-muted-foreground">
                Durante la fase de implementación se revisarán periódicamente el rendimiento, la
                accesibilidad, la compatibilidad entre navegadores y la experiencia de uso. Los
                resultados de esas revisiones se conservarán junto con las decisiones técnicas para
                facilitar el mantenimiento y evitar que se repitan problemas ya resueltos.
              </p>
              <p class="text-muted-foreground">
                También se preparará una estrategia de publicación gradual que permita detectar
                incidencias con rapidez, limitar su impacto y recuperar una versión estable si fuera
                necesario. La estrategia incluirá métricas, alertas, responsables de guardia y un
                procedimiento claro para comunicar cualquier interrupción relevante del servicio.
              </p>
              <p class="text-muted-foreground">
                Finalmente, toda la documentación se actualizará para reflejar el comportamiento
                real del producto, incluyendo ejemplos completos, casos límite y recomendaciones
                para futuras ampliaciones. Este último párrafo añade altura suficiente para probar
                el desplazamiento vertical del cuerpo manteniendo visibles las demás secciones.
              </p>
              <p class="text-muted-foreground">
                Durante la fase de implementación se revisarán periódicamente el rendimiento, la
                accesibilidad, la compatibilidad entre navegadores y la experiencia de uso. Los
                resultados de esas revisiones se conservarán junto con las decisiones técnicas para
                facilitar el mantenimiento y evitar que se repitan problemas ya resueltos.
              </p>
              <p class="text-muted-foreground">
                También se preparará una estrategia de publicación gradual que permita detectar
                incidencias con rapidez, limitar su impacto y recuperar una versión estable si fuera
                necesario. La estrategia incluirá métricas, alertas, responsables de guardia y un
                procedimiento claro para comunicar cualquier interrupción relevante del servicio.
              </p>
              <p class="text-muted-foreground">
                Finalmente, toda la documentación se actualizará para reflejar el comportamiento
                real del producto, incluyendo ejemplos completos, casos límite y recomendaciones
                para futuras ampliaciones. Este último párrafo añade altura suficiente para probar
                el desplazamiento vertical del cuerpo manteniendo visibles las demás secciones.
              </p>
              <p class="text-muted-foreground">
                Durante la fase de implementación se revisarán periódicamente el rendimiento, la
                accesibilidad, la compatibilidad entre navegadores y la experiencia de uso. Los
                resultados de esas revisiones se conservarán junto con las decisiones técnicas para
                facilitar el mantenimiento y evitar que se repitan problemas ya resueltos.
              </p>
              <p class="text-muted-foreground">
                También se preparará una estrategia de publicación gradual que permita detectar
                incidencias con rapidez, limitar su impacto y recuperar una versión estable si fuera
                necesario. La estrategia incluirá métricas, alertas, responsables de guardia y un
                procedimiento claro para comunicar cualquier interrupción relevante del servicio.
              </p>
              <p class="text-muted-foreground">
                Finalmente, toda la documentación se actualizará para reflejar el comportamiento
                real del producto, incluyendo ejemplos completos, casos límite y recomendaciones
                para futuras ampliaciones. Este último párrafo añade altura suficiente para probar
                el desplazamiento vertical del cuerpo manteniendo visibles las demás secciones.
              </p>
            </div>
          </template>
        </Dialog>

        <Dialog
          v-model:open="dialogOpen"
          label="Editar todas las preferencias de comunicación, privacidad y notificaciones asociadas a la cuenta"
          description="Configura con precisión cómo, cuándo y mediante qué canales quieres recibir las notificaciones relacionadas con actividad importante, novedades del producto y cambios de seguridad."
          :ui="{ body: { class: 'py-2' } }"
        >
          <template #default="{ open }">
            <button class="rounded-md border px-4 py-2 text-sm font-medium">
              Dialog {{ open ? 'abierto' : 'controlado' }}
            </button>
          </template>

          <template #content>
            <div class="grid gap-3">
              <label class="grid gap-1 text-sm">
                <span class="font-medium">Correo electrónico</span>
                <input class="rounded-md border px-3 py-2" value="usuario@ejemplo.com" />
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" checked />
                Recibir novedades del producto, resúmenes semanales de actividad y avisos
                importantes relacionados con la seguridad de la cuenta
              </label>
            </div>
          </template>

          <template #footer="{ close }">
            <button class="rounded-md border px-3 py-2 text-sm" @click="close">Cancelar</button>
            <button class="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white" @click="close">
              Guardar cambios
            </button>
          </template>
        </Dialog>

        <Dialog
          label="Eliminar definitivamente este elemento y todos los datos relacionados que dependen de él"
          description="Esta acción es solo una demostración, pero el texto extenso permite comprobar cómo se comportan el encabezado, la descripción, el icono y el botón de cierre cuando el espacio disponible es reducido."
          icon="warning"
          :show-close-button="false"
        >
          <button class="rounded-md border border-red-300 px-4 py-2 text-sm text-red-700">
            Sin botón de cierre
          </button>

          <template #content>
            <p class="py-2 text-sm text-muted-foreground">
              El botón superior se oculta mediante <code>showCloseButton</code>. Este texto es
              intencionadamente largo para verificar que el contenido conserva una lectura cómoda,
              que los separadores ocupan todo el ancho disponible y que la acción del pie permanece
              accesible incluso cuando la explicación necesita varias líneas.
            </p>
          </template>

          <template #footer="{ close }">
            <button class="rounded-md border px-3 py-2 text-sm" @click="close">
              Cerrar desde el slot
            </button>
          </template>
        </Dialog>
      </div>

      <p class="text-sm text-muted-foreground">
        Estado del diálogo controlado: {{ dialogOpen ? 'abierto' : 'cerrado' }}
      </p>
    </section>
  </main>
</template>
