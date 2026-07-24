<script setup lang="ts">
import { ref } from 'vue'
import { Boton } from '@/components/app/Button'
import { Dialog } from '@/components/app/Dialog'
import { Icon } from '@/components/app/Icon'

const controlledOpen = ref(false)
const saved = ref(false)
const paragraphs = Array.from(
  { length: 8 },
  (_, index) =>
    `Sección ${index + 1}. Este contenido permite comprobar el desplazamiento interno del diálogo sin ampliar la página.`,
)

function save(close: () => void) {
  saved.value = true
  close()
}
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-3xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Dialog</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Ventanas modales accesibles con trigger, cabecera, contenido, footer y cierre controlable.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">
            El slot por defecto es el trigger y el slot content contiene el cuerpo del diálogo.
          </p>
        </div>

        <Dialog
          label="Editar perfil"
          description="Realiza cambios en tu perfil y guarda cuando hayas terminado."
        >
          <Boton label="Abrir diálogo" />

          <template #content>
            <p class="text-sm">
              Aquí puede colocarse cualquier formulario, información o componente de la aplicación.
            </p>
          </template>
        </Dialog>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">V-model</h2>
          <p class="text-sm text-muted-foreground">
            Open puede controlarse desde el padre mediante v-model:open.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <Dialog
            v-model:open="controlledOpen"
            label="Diálogo controlado"
            description="El estado abierto se sincroniza con la aplicación."
          >
            <Boton label="Mostrar" variant="outlined" />

            <template #content="{ open }">
              <p class="text-sm">
                Estado recibido por el slot: {{ open ? 'abierto' : 'cerrado' }}.
              </p>
            </template>
          </Dialog>

          <code class="rounded bg-muted px-2 py-1 text-sm">open: {{ controlledOpen }}</code>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Footer y cierre programático</h2>
          <p class="text-sm text-muted-foreground">
            Los slots reciben close para cerrar el diálogo después de completar una acción.
          </p>
        </div>

        <Dialog
          label="Guardar cambios"
          description="Confirma si quieres guardar la configuración actual."
        >
          <Boton label="Configurar" />

          <template #content>
            <p class="text-sm text-muted-foreground">
              Los cambios se aplicarán inmediatamente a tu cuenta.
            </p>
          </template>

          <template #footer="{ close }">
            <Boton label="Cancelar" variant="outlined" severity="secondary" @click="close" />
            <Boton label="Guardar" icon="save" @click="save(close)" />
          </template>
        </Dialog>

        <p v-if="saved" class="text-sm text-success">Cambios guardados correctamente.</p>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Contenido desplazable</h2>
          <p class="text-sm text-muted-foreground">
            Scrollable utiliza DialogScrollContent y limita la altura del contenido.
          </p>
        </div>

        <Dialog
          scrollable
          label="Términos del servicio"
          description="Lee el documento completo antes de continuar."
        >
          <Boton label="Leer términos" variant="outlined" />

          <template #content>
            <div class="space-y-4 text-sm text-muted-foreground">
              <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
            </div>
          </template>

          <template #footer="{ close }">
            <Boton label="Aceptar" @click="close" />
          </template>
        </Dialog>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Slots personalizados</h2>
          <p class="text-sm text-muted-foreground">
            La cabecera, el título, la descripción y el icono de cierre pueden sustituirse.
          </p>
        </div>

        <Dialog close-label="Cerrar aviso">
          <Boton label="Ver aviso" variant="soft" />

          <template #title>
            <span class="flex items-center gap-2">
              <Icon name="info" class="text-primary" />
              Información importante
            </span>
          </template>

          <template #description>Este título y esta descripción proceden de slots.</template>

          <template #content>
            <p class="text-sm">El contenido conserva la estructura accesible de Dialog.</p>
          </template>

          <template #close>
            <Icon name="x" size="sm" />
            <span class="sr-only">Cerrar aviso</span>
          </template>
        </Dialog>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Sin botón de cierre</h2>
          <p class="text-sm text-muted-foreground">
            ShowCloseButton oculta el cierre superior; puede cerrarse desde cualquier slot.
          </p>
        </div>

        <Dialog
          :show-close-button="false"
          label="Confirmación"
          description="Este diálogo solamente muestra las acciones del footer."
        >
          <Boton label="Eliminar elemento" severity="error" variant="outlined" />

          <template #content>
            <p class="text-sm">¿Seguro que quieres continuar con esta acción?</p>
          </template>

          <template #footer="{ close }">
            <Boton label="No, cancelar" variant="outlined" severity="secondary" @click="close" />
            <Boton label="Sí, continuar" severity="error" @click="close" />
          </template>
        </Dialog>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Personalización con UI</h2>
          <p class="text-sm text-muted-foreground">
            Cada nodo estructural puede recibir atributos y clases propios.
          </p>
        </div>

        <Dialog
          label="Diálogo personalizado"
          description="Content, title y body reciben estilos mediante ui."
          :ui="{
            content: { class: 'border-primary/40 sm:max-w-xl' },
            title: { class: 'text-primary' },
            body: { class: 'rounded-md bg-muted p-4' },
          }"
        >
          <Boton label="Personalizado" color="#7c3aed" />

          <template #content>
            <p class="text-sm">
              El contenido mantiene sus estilos sin modificar los nodos UI base.
            </p>
          </template>
        </Dialog>
      </section>
    </div>
  </main>
</template>
