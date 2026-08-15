<script setup lang="ts">
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { ref } from 'vue'

const src = ref('https://i.pravatar.cc/96?img=12')
const a = () => {
  src.value = ''
}
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background p-8 text-foreground">
      <div class="mx-auto flex max-w-3xl flex-col gap-8">
        <header>
          <h1 class="text-2xl font-semibold">AlertDialog playground</h1>
          <p class="text-sm text-muted-foreground">Ejemplos del componente AlertDialog.</p>
        </header>

        <section class="grid gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div>
              <h2 class="font-medium">Confirmacion basica</h2>
              <p class="text-sm text-muted-foreground">Confirma una accion antes de continuar.</p>
            </div>

            <AlertDialog
              label="Publicar cambios"
              description="Los cambios estaran disponibles para todos los usuarios."
              :action-button="{ label: 'Publicar' }"
            >
              <Button label="Publicar" />
            </AlertDialog>
          </div>

          <div class="flex items-center justify-between gap-4 border-t pt-6">
            <div>
              <h2 class="font-medium">Accion destructiva</h2>
              <p class="text-sm text-muted-foreground">
                Advierte sobre una operacion irreversible.
              </p>
            </div>

            <AlertDialog
              label="Eliminar proyecto"
              description="Esta accion no se puede deshacer. Se eliminaran todos los datos del proyecto."
              icon="warning"
              :action-button="{ label: 'Eliminar', severity: 'error' }"
              :cancel-button="{ label: 'Conservar proyecto' }"
            >
              <Button label="Eliminar" severity="error" variant="outline" />
            </AlertDialog>
          </div>

          <div class="flex items-center justify-between gap-4 border-t pt-6">
            <div>
              <h2 class="font-medium">Con contenido</h2>
              <p class="text-sm text-muted-foreground">
                Incluye informacion adicional en el cuerpo.
              </p>
            </div>

            <AlertDialog
              label="Restablecer configuracion"
              description="Se recuperaran los valores predeterminados."
              icon="settings"
              :action-button="{ label: 'Restablecer', severity: 'warning' }"
            >
              <Button label="Restablecer" variant="outline" />

              <template #content>
                <div class="rounded-md border bg-muted/40 p-3 text-sm">
                  Se restableceran las preferencias de apariencia, notificaciones y privacidad.
                </div>
              </template>
            </AlertDialog>
          </div>

          <div class="flex items-center justify-between gap-4 border-t pt-6">
            <div>
              <h2 class="font-medium">Slots personalizados</h2>
              <p class="text-sm text-muted-foreground">Personaliza el titulo y las acciones.</p>
            </div>

            <AlertDialog description="La sesion actual se cerrara inmediatamente.">
              <Button label="Cerrar sesion" variant="plain" />

              <template #label>
                <span class="text-error">Cerrar sesion</span>
              </template>

              <template #cancel>
                <Button label="Volver" variant="plain" severity="secondary" />
              </template>

              <template #action>
                <Button label="Cerrar sesion" severity="error" />
              </template>
            </AlertDialog>
          </div>
        </section>

        <section class="grid gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <header>
            <h2 class="font-medium">Avatar</h2>
            <p class="text-sm text-muted-foreground">
              Muestra imagen, iniciales, iconos y fallbacks personalizados.
            </p>
          </header>

          <div class="grid gap-6 sm:grid-cols-2">
            <div class="flex items-center gap-4">
              <div>
                <p class="font-medium">Imagen</p>
                <p class="text-sm text-muted-foreground">Avatar con imagen remota.</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div>
                <p class="font-medium">Iniciales</p>
                <p class="text-sm text-muted-foreground">Fallback de texto.</p>
              </div>
            </div>

            <button @click="a">aa</button>

            <Avatar
              size="lg"
              :src="src"
              alt="Ada Lovelace"
              icon="user"
              label="AL"
              shape="square"
            />

            <Avatar size="md" label="AL" shape="rounded" />
            <Avatar size="sm" icon="user" shape="rounded" class="bg-primary/50" />
            <Avatar size="xs">
              <template #fallback>
                <span
                  class="flex size-full items-center justify-center bg-primary text-sm font-medium text-primary-foreground"
                >
                  NV
                </span>
              </template>
            </Avatar>
            <div class="flex items-center gap-4">
              <div>
                <p class="font-medium">Icono</p>
                <p class="text-sm text-muted-foreground">Fallback con icono.</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <Avatar size="lg">
                <template #fallback>
                  <span
                    class="flex size-full items-center justify-center bg-primary text-sm font-medium text-primary-foreground"
                  >
                    NV
                  </span>
                </template>
              </Avatar>
              <div>
                <p class="font-medium">Slot fallback</p>
                <p class="text-sm text-muted-foreground">Contenido personalizado.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
