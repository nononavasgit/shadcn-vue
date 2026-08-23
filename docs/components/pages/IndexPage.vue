<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-8">
        <header class="grid gap-2">
          <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Docs</p>
          <h1 class="text-3xl font-semibold">Componentes</h1>
          <p class="max-w-2xl text-sm text-muted-foreground">
            API, tipos y playgrounds interactivos de la libreria.
          </p>
        </header>

        <nav aria-label="Componentes" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <RouterLink
            to="/accordion"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Accordion</h2>
            <p class="text-sm text-muted-foreground">
              Secciones expandibles en modo single o multiple.
            </p>
          </RouterLink>

          <RouterLink
            to="/avatar"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Avatar</h2>
            <p class="text-sm text-muted-foreground">
              Imagen, icono, etiqueta y fallback personalizable.
            </p>
          </RouterLink>

          <RouterLink
            to="/announcer"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Announcer</h2>
            <p class="text-sm text-muted-foreground">
              Mensajes accesibles para tecnologias de asistencia.
            </p>
          </RouterLink>

          <RouterLink
            to="/alert"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Alert</h2>
            <p class="text-sm text-muted-foreground">
              Mensajes contextuales con severidad y cierre opcional.
            </p>
          </RouterLink>

          <RouterLink
            to="/alert-dialog"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">AlertDialog</h2>
            <p class="text-sm text-muted-foreground">
              Confirmaciones modales para acciones importantes.
            </p>
          </RouterLink>

          <RouterLink
            to="/aspect-ratio"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">AspectRatio</h2>
            <p class="text-sm text-muted-foreground">
              Contenedores con una relacion de aspecto estable.
            </p>
          </RouterLink>

          <RouterLink
            to="/attachment"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Attachment</h2>
            <p class="text-sm text-muted-foreground">
              Archivos con estados, multimedia y acciones opcionales.
            </p>
          </RouterLink>

          <RouterLink
            to="/button"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Button</h2>
            <p class="text-sm text-muted-foreground">
              Acciones con variantes, iconos y estados de carga.
            </p>
          </RouterLink>

          <RouterLink
            to="/button-group"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">ButtonGroup</h2>
            <p class="text-sm text-muted-foreground">
              Agrupa botones relacionados en una orientacion y tamano comunes.
            </p>
          </RouterLink>

          <RouterLink
            to="/badge"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Badge</h2>
            <p class="text-sm text-muted-foreground">
              Etiquetas compactas para estados y categorias.
            </p>
          </RouterLink>

          <RouterLink
            to="/card"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Card</h2>
            <p class="text-sm text-muted-foreground">
              Contenido estructurado con encabezado, acciones y pie.
            </p>
          </RouterLink>

          <RouterLink
            to="/breadcrumb"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Breadcrumb</h2>
            <p class="text-sm text-muted-foreground">
              Rutas de navegación con enlaces, elipsis, iconos y slots.
            </p>
          </RouterLink>

          <RouterLink
            to="/checkbox"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Checkbox</h2>
            <p class="text-sm text-muted-foreground">
              Control booleano con estado indeterminado y valores personalizados.
            </p>
          </RouterLink>

          <RouterLink
            to="/chip"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Chip</h2>
            <p class="text-sm text-muted-foreground">
              Indicadores compactos para valores y estados sobre otros elementos.
            </p>
          </RouterLink>

          <RouterLink
            to="/dialog"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Dialog</h2>
            <p class="text-sm text-muted-foreground">
              Dialogos modales con props planas y contenido personalizable.
            </p>
          </RouterLink>

          <RouterLink
            to="/empty"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Empty</h2>
            <p class="text-sm text-muted-foreground">
              Estados vacíos con contenido y acciones opcionales.
            </p>
          </RouterLink>

          <RouterLink
            to="/switch"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Switch</h2>
            <p class="text-sm text-muted-foreground">
              Control binario con valores personalizados y thumb configurable.
            </p>
          </RouterLink>

          <RouterLink
            to="/field-set"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">FieldSet</h2>
            <p class="text-sm text-muted-foreground">
              Agrupacion de campos con leyenda y descripcion.
            </p>
          </RouterLink>

          <RouterLink
            to="/icon"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Icon</h2>
            <p class="text-sm text-muted-foreground">
              Iconos Lucide con tamanos y color configurables.
            </p>
          </RouterLink>

          <RouterLink
            to="/input"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Input</h2>
            <p class="text-sm text-muted-foreground">
              Campo controlado para entradas de formulario.
            </p>
          </RouterLink>

          <RouterLink
            to="/input-time"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">InputTime</h2>
            <p class="text-sm text-muted-foreground">
              Campo controlado para introducir horas con atributos nativos.
            </p>
          </RouterLink>

          <RouterLink
            to="/label"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Label</h2>
            <p class="text-sm text-muted-foreground">
              Etiquetas accesibles para controles de formulario.
            </p>
          </RouterLink>

          <RouterLink
            to="/loading"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Loading</h2>
            <p class="text-sm text-muted-foreground">
              Indicador de carga con contenido y slots personalizables.
            </p>
          </RouterLink>

          <RouterLink
            to="/meter-group"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">MeterGroup</h2>
            <p class="text-sm text-muted-foreground">
              Distribución segmentada de valores entre varias categorías.
            </p>
          </RouterLink>

          <RouterLink
            to="/popover"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Popover</h2>
            <p class="text-sm text-muted-foreground">
              Contenido contextual con posicionamiento configurable.
            </p>
          </RouterLink>

          <RouterLink
            to="/pagination"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Pagination</h2>
            <p class="text-sm text-muted-foreground">
              Navegación entre páginas con controles y slots personalizables.
            </p>
          </RouterLink>

          <RouterLink
            to="/progress"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Progress</h2>
            <p class="text-sm text-muted-foreground">
              Barra de progreso determinada e indeterminada con slots y colores.
            </p>
          </RouterLink>

          <RouterLink
            to="/progress-circular"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">ProgressCircular</h2>
            <p class="text-sm text-muted-foreground">
              Progreso circular con etiquetas, colores, slots y personalización SVG.
            </p>
          </RouterLink>

          <RouterLink
            to="/link"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Link</h2>
            <p class="text-sm text-muted-foreground">
              Enlaces internos y externos con variantes de Button.
            </p>
          </RouterLink>

          <RouterLink
            to="/scroll-area"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">ScrollArea</h2>
            <p class="text-sm text-muted-foreground">
              Contenedor de desplazamiento con orientación configurable.
            </p>
          </RouterLink>

          <RouterLink
            to="/separator"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Separator</h2>
            <p class="text-sm text-muted-foreground">
              Divide contenido horizontal o verticalmente.
            </p>
          </RouterLink>

          <RouterLink
            to="/splitter"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Splitter</h2>
            <p class="text-sm text-muted-foreground">
              Paneles redimensionables con slots personalizados.
            </p>
          </RouterLink>

          <RouterLink
            to="/slider"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Slider</h2>
            <p class="text-sm text-muted-foreground">
              Controles de rango con uno o varios valores.
            </p>
          </RouterLink>

          <RouterLink
            to="/kbd"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Kbd</h2>
            <p class="text-sm text-muted-foreground">
              Representacion compacta de teclas y atajos de teclado.
            </p>
          </RouterLink>

          <RouterLink
            to="/kbd-group"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">KbdGroup</h2>
            <p class="text-sm text-muted-foreground">
              Agrupa teclas Kbd para representar atajos completos.
            </p>
          </RouterLink>

          <RouterLink
            to="/time"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Time</h2>
            <p class="text-sm text-muted-foreground">
              Fechas semanticas con formato localizado y slot contextual.
            </p>
          </RouterLink>

          <RouterLink
            to="/toggle"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Toggle</h2>
            <p class="text-sm text-muted-foreground">
              Control binario con estados, variantes e iconos.
            </p>
          </RouterLink>

          <RouterLink
            to="/textarea"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Textarea</h2>
            <p class="text-sm text-muted-foreground">
              Campo multilínea controlado para texto largo.
            </p>
          </RouterLink>

          <RouterLink
            to="/tooltip"
            class="grid gap-2 rounded-lg border bg-card p-5 text-card-foreground transition-colors hover:border-primary"
          >
            <h2 class="font-medium">Tooltip</h2>
            <p class="text-sm text-muted-foreground">
              Mensajes contextuales con posicionamiento y contenido personalizable.
            </p>
          </RouterLink>
        </nav>
      </div>
    </main>
  </DocsLayout>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DocsLayout from '../DocsLayout.vue'
</script>
