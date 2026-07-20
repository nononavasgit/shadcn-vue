<script setup lang="ts">
import { ref } from 'vue'
import { Acordeon, type AcordeonElemento } from '@/components/app/Acordeon'
import { Etiqueta } from '@/components/app/Etiqueta'

const seccionAbierta = ref('instalacion')

const elementosAcordeon: AcordeonElemento[] = [
  {
    valor: 'instalacion',
    titulo: '¿Cómo instalo la librería?',
    contenido:
      'Instala el paquete, importa sus estilos una sola vez y después importa los componentes que necesites.',
  },
  {
    valor: 'personalizacion',
    titulo: '¿Puedo personalizar los componentes?',
    contenido:
      'Sí. Puedes cambiar los tokens CSS, añadir clases o crear un wrapper con variantes propias de tu aplicación.',
  },
  {
    valor: 'estado',
    titulo: '¿Admite contenido deshabilitado?',
    contenido: 'Este elemento no se puede abrir.',
    deshabilitado: false,
  },
]
</script>

<template>
  <main class="min-h-screen bg-background text-foreground">
    <div class="mx-auto max-w-3xl space-y-10 px-6 py-12">
      <section class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold">Etiquetas</h2>
          <p class="text-sm text-muted-foreground">
            Variantes, tamaños, iconos y colores dinámicos.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <Etiqueta titulo="solido" variante="solido" />
          <Etiqueta titulo="Delineado" variante="delineado" />
          <Etiqueta titulo="Suave" variante="suave" />
          <Etiqueta titulo="sutil" variante="sutil" />

        </div>

        <br />

        <div class="flex flex-wrap items-center gap-3">
          <Etiqueta titulo="Primario" paleta="primario" />
          <Etiqueta titulo="Secundario" paleta="secundario" />
          <Etiqueta titulo="Alerta" paleta="alerta" />

        </div>

        <br />

        <Etiqueta titulo="Extra pequeña" tamano="xs" />
        <Etiqueta titulo="Pequeña" tamano="sm" />
        <Etiqueta titulo="Mediana" tamano="md" />
        <Etiqueta titulo="Grande" tamano="lg" />

        <br />

        <Etiqueta titulo="Extra pequeña" tamano="xs" paleta="secundario" />
        <Etiqueta titulo="Pequeña" tamano="sm" paleta="secundario" />
        <Etiqueta titulo="Mediana" tamano="md" paleta="secundario" />
        <Etiqueta titulo="Grande" tamano="lg" paleta="secundario" />

        <br />

        <Etiqueta titulo="Extra pequeña" tamano="xs" paleta="alerta" />
        <Etiqueta titulo="Pequeña" tamano="sm" paleta="alerta" />
        <Etiqueta titulo="Mediana" tamano="md" paleta="alerta" />
        <Etiqueta titulo="Grande" tamano="lg" paleta="alerta" />

        <br />
        <Etiqueta titulo="spinner" variante="delineado" paleta="alerta" />
        <Etiqueta titulo="spinner" variante="suave" paleta="alerta" />
        <Etiqueta titulo="spinner" variante="sutil" paleta="alerta" />

        <br />
        <Etiqueta titulo="spinner" variante="delineado" paleta="primario" />
        <Etiqueta titulo="spinner" variante="suave" paleta="primario" />
        <Etiqueta titulo="spinner" variante="sutil" paleta="primario" />

        <br />
        <Etiqueta titulo="spinner" variante="delineado" paleta="secundario" />
        <Etiqueta titulo="spinner" variante="suave" paleta="secundario" />
        <Etiqueta titulo="spinner" variante="sutil" paleta="secundario" />


        <br />

        <Etiqueta titulo="Extra pequeña" icono="spinner" tamano="xs" paleta="alerta" />
        <Etiqueta titulo="Pequeña" icono="spinner" tamano="sm" paleta="alerta" />
        <Etiqueta titulo="Mediana" icono="spinner" tamano="md" paleta="alerta" />
        <Etiqueta titulo="Grande" icono="spinner" tamano="lg" paleta="alerta" />

        <br />
        <br />
        <br />

        <div class="flex flex-wrap items-center gap-3">
          <Etiqueta titulo="Violeta" color="#7c3aed" />
          <Etiqueta titulo="Violeta" color="#7c3aed" variante="delineado" />
          <Etiqueta titulo="Violeta" color="#7c3aed" variante="suave" />
          <Etiqueta titulo="Violeta" color="#7c3aed" variante="sutil" />


          <br />


          <Etiqueta titulo="Verde" color="#16a34a" variante="delineado" />
          <Etiqueta titulo="Verde" color="#16a34a" variante="solido" />
          <Etiqueta titulo="Verde" color="#16a34a" variante="suave" />

          <!-- <Etiqueta titulo="Ámbar suave" color="#f59e0b" variante="suave" />
          <Etiqueta titulo="Verde delineado" color="#16a34a" variante="delineado" />
          <Etiqueta titulo="Variable CSS" color="var(--destructive)" color-contraste="#ffffff" /> -->
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <Etiqueta titulo="Cargando" icono="spinner" />
          <Etiqueta titulo="A la derecha" icono-derecho="spinner" variante="suave" />

          <Etiqueta color="#0369a1" variante="sutil" titulo="aaa" />
          <Etiqueta color="#0369a1" variante="suave" titulo="aaa" />
          <Etiqueta color="#0369a1" variante="delineado">
            <template #izquierda>
              eyy esto q es
            </template>
            Con slot
          </Etiqueta>
          <Etiqueta titulo="Sin píldora" :redondeado="false" paleta="secundario" />
        </div>
      </section>


    </div>
  </main>
</template>
