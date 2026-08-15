<script setup lang="ts">
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
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
      </div>
    </main>
  </ConfigProvider>
</template>
