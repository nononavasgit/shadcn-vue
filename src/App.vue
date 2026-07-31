<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'

const basicPage = ref(1)
const controlledPage = ref(4)
const contextualPage = ref(6)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Pagination</h1>
      <p class="text-muted-foreground">
        Ejemplos con estado controlado, extremos, UI contextual y slots personalizados.
      </p>
    </header>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Uso basico</h2>
        <p class="text-sm text-muted-foreground">Pagina actual: {{ basicPage }}.</p>
      </div>

      <Pagination v-model:page="basicPage" :total="100" :items-per-page="10" />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Estado controlado</h2>
        <p class="text-sm text-muted-foreground">
          La pagina tambien puede cambiar desde controles externos.
        </p>
      </div>

      <Pagination
        v-model:page="controlledPage"
        :total="240"
        :items-per-page="20"
        :sibling-count="1"
        :ui="{
          root: { 'aria-label': 'Paginacion controlada' },
          content: { class: 'rounded-lg border bg-muted/30 p-2' },
        }"
      >
        <template #preContent="{ from, to, total }">
          <span class="mr-3 text-sm text-muted-foreground">{{ from }}-{{ to }} de {{ total }}</span>
        </template>
      </Pagination>

      <div class="flex flex-wrap gap-2">
        <Button label="Pagina 1" size="sm" variant="outline" @click="controlledPage = 1" />
        <Button label="Pagina 6" size="sm" variant="outline" @click="controlledPage = 6" />
        <Button label="Ultima" size="sm" variant="outline" @click="controlledPage = 12" />
      </div>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Primera y ultima pagina</h2>
        <p class="text-sm text-muted-foreground">
          Controles de extremos visibles y botones anterior/siguiente ocultos.
        </p>
      </div>

      <Pagination
        :default-page="5"
        :total="90"
        :items-per-page="10"
        show-first
        show-last
        :show-previous="false"
        :show-next="false"
        :ui="{
          first: { class: 'border' },
          last: { class: 'border' },
          item: ({ active }) => ({ class: active ? 'bg-primary text-primary-foreground' : '' }),
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">UI contextual</h2>
        <p class="text-sm text-muted-foreground">
          Los estilos de item y elipsis reciben el estado completo de paginacion.
        </p>
      </div>

      <Pagination
        v-model:page="contextualPage"
        :total="300"
        :items-per-page="10"
        :sibling-count="1"
        show-first
        show-last
        :ui="{
          root: { class: 'justify-start rounded-xl bg-muted/40 p-3' },
          content: { class: 'flex-wrap' },
          item: ({ active, first, last }) => ({
            class: [
              active && 'border-primary bg-primary/10 text-primary',
              first && 'ring-1 ring-primary/30',
              last && 'ring-1 ring-primary/30',
            ],
          }),
          ellipsis: ({ index }) => ({ title: `Salto de paginas ${index + 1}` }),
          previous: { title: 'Pagina anterior' },
          next: { title: 'Pagina siguiente' },
        }"
      />
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots globales</h2>
        <p class="text-sm text-muted-foreground">
          Personalizacion del contenido de paginas, navegacion y elipsis.
        </p>
      </div>

      <Pagination :default-page="5" :total="120" :items-per-page="10" show-first show-last>
        <template #first>Inicio</template>
        <template #previous>Atras</template>
        <template #item="{ item, active }">
          <span :class="active ? 'font-bold underline' : ''">
            {{ item.type === 'page' ? item.value : '' }}
          </span>
        </template>
        <template #ellipsis>---</template>
        <template #next>Siguiente</template>
        <template #last>Fin</template>
      </Pagination>
    </section>

    <section class="space-y-5 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Slots individuales y estado deshabilitado</h2>
        <p class="text-sm text-muted-foreground">
          Un slot puede personalizar una pagina concreta mediante su numero.
        </p>
      </div>

      <Pagination :default-page="2" :total="50" :items-per-page="10">
        <template #item-2="{ active }">
          <span
            class="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground"
          >
            {{ active ? '2' : 'dos' }}
          </span>
        </template>
      </Pagination>

      <Pagination :page="3" :total="50" :items-per-page="10" disabled />
    </section>
  </main>
</template>
