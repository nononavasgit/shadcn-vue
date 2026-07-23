<script setup lang="ts">
import { ref } from 'vue'
import { Boton } from '@/components/app/Boton'
import { Icono } from '@/components/app/Icono'

const variantes = ['solido', 'delineado', 'plano', 'sutil', 'suave'] as const
const gravedades = ['primario', 'secundario', 'alerta', 'exito', 'error'] as const
const tamanos = ['xs', 'sm', 'md', 'lg'] as const

const guardando = ref(false)

function guardar() {
  guardando.value = true
  window.setTimeout(() => {
    guardando.value = false
  }, 1500)
}
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-6xl space-y-12">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Botón</h1>
        <p class="max-w-2xl text-muted-foreground">
          Combinaciones de variante, gravedad y tamaño del componente público.
        </p>
      </header>

      <section class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold">Variantes y gravedades</h2>
          <p class="text-sm text-muted-foreground">
            Cada variante visual se puede combinar con cualquier gravedad.
          </p>
        </div>

        <div class="overflow-x-auto rounded-xl border">
          <div class="grid min-w-4xl grid-cols-[8rem_repeat(5,minmax(8rem,1fr))]">
            <div class="border-b bg-muted/50 p-4 text-sm font-medium">Gravedad</div>
            <div
              v-for="variante in variantes"
              :key="variante"
              class="border-b bg-muted/50 p-4 text-sm font-medium capitalize"
            >
              {{ variante }}
            </div>

            <template v-for="gravedad in gravedades" :key="gravedad">
              <div class="flex items-center border-b p-4 text-sm font-medium capitalize">
                {{ gravedad }}
              </div>
              <div
                v-for="variante in variantes"
                :key="`${gravedad}-${variante}`"
                class="flex items-center border-b p-4"
              >
                <Boton :variante="variante" :gravedad="gravedad">
                  {{ gravedad }}
                </Boton>
              </div>
            </template>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold">Tamaños</h2>
          <p class="text-sm text-muted-foreground">Escala disponible desde xs hasta lg.</p>
        </div>

        <div class="flex flex-row items-center gap-3 overflow-x-auto pb-2">
          <Boton v-for="tamano in tamanos" :key="tamano" :tamano="tamano">
            Tamaño {{ tamano }}
          </Boton>
        </div>
      </section>

      <section class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold">Formas</h2>
          <p class="text-sm text-muted-foreground">
            Botones redondeados y cuadrados combinados con distintos tamaños.
          </p>
        </div>

        <div class="flex flex-row items-center gap-3 overflow-x-auto pb-2">
          <Boton redondeado>Botón redondeado</Boton>

          <Boton redondeado variante="delineado" gravedad="exito">
            <Icono nombre="check" />
            Redondeado
          </Boton>

          <Boton
            v-for="tamano in tamanos"
            :key="`cuadrado-${tamano}`"
            cuadrado
            :tamano="tamano"
            :aria-label="`Guardar, tamaño ${tamano}`"
          >
            <Icono
              nombre="guardar"
              :tamano="tamano === 'xs' ? 'sm' : tamano === 'lg' ? 'lg' : 'md'"
            />
          </Boton>

          <Boton cuadrado redondeado variante="suave" gravedad="alerta" aria-label="Alerta">
            <Icono nombre="alerta" />
          </Boton>
        </div>
      </section>

      <section class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold">Estados e iconos</h2>
          <p class="text-sm text-muted-foreground">
            Ejemplos con Lucide, estado de carga y sobrescritura de clases.
          </p>
        </div>

        <div class="flex flex-row items-center gap-3 overflow-x-auto pb-2">
          <Boton gravedad="exito">
            <Icono nombre="check" />
            Confirmar
          </Boton>

          <Boton variante="delineado" gravedad="alerta">
            <Icono nombre="eliminar" />
            Eliminar
          </Boton>

          <Boton :cargando="guardando" @click="guardar">
            {{ guardando ? 'Guardando…' : 'Guardar cambios' }}
          </Boton>

          <Boton
            variante="suave"
            class="h-12 rounded-full bg-violet-500/15 px-8 text-violet-700 hover:bg-violet-500/25 dark:text-violet-300"
          >
            Sobrescrito con class
          </Boton>

          <Boton variante="plano" cargando> Procesando </Boton>
        </div>
      </section>
    </div>
  </main>
</template>
