<script setup>
import { ref } from 'vue'
import { Button } from '@/components/app/Button'
import { Command } from '@/components/app/Command'
import { Icon } from '@/components/app/Icon'
import { Popover } from '@/components/app/Popover'
import { Input } from '@/components/app/Input'
import { InputOTP } from '@/components/app/InputOTP'
import { Sheet } from '@/components/app/Sheet'

const otpValue = ref('')
const alphanumericOtp = ref('A7B9C2')
const completedOtp = ref('')
const otpLargeUI = {
  slot: {
    class: 'size-11 text-base',
  },
}

const sheetSides = ['top', 'right', 'bottom', 'left']
const sheetParagraphs = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  label: `Sección ${index + 1}`,
  text: 'Este contenido largo demuestra que el cuerpo del Sheet puede desplazarse de forma independiente sin mover la página principal.',
}))

const commandItems = [
  {
    id: 'search',
    value: 'search',
    label: 'Buscar en el proyecto',
    icon: {
      name: 'search',
      color: 'green',
    },
  },
  {
    id: 'save',
    value: 'save',
    label: 'Guardar todos los cambios',
    icon: 'save',
  },
  {
    id: 'documentation',
    value: 'documentation',
    label: 'Abrir documentación',
    icon: 'info',
  },
  {
    id: 'deploy',
    value: 'deploy',
    label: 'Desplegar en producción',
    icon: 'chevronRight',
    disabled: true,
  },
]

const commandGroups = [
  {
    id: 'project',
    label: 'Proyecto',
    items: commandItems.slice(0, 3),
  },
  {
    id: 'danger',
    label: 'Acciones sensibles',
    items: [
      {
        id: 'validate',
        value: 'validate',
        label: 'Validar el proyecto',
        icon: 'success',
      },
      {
        id: 'delete-cache',
        value: 'delete-cache',
        label: 'Eliminar la caché',
        icon: 'trash2',
      },
      commandItems[3],
    ],
  },
]

const commandUI = {
  input: {
    class: 'text-violet-700 dark:text-violet-300',
  },
  heading: {
    class: 'font-semibold text-violet-600 dark:text-violet-400',
  },
  item: ({ selected }) => ({
    class: selected ? 'bg-violet-100 dark:bg-violet-950/50' : undefined,
  }),
  icon: ({ item }) => ({
    color: item.id === 'delete-cache' ? 'red' : 'blue',
  }),
  separator: {
    class: 'bg-violet-200 dark:bg-violet-900',
  },
  footer: {
    class: 'border-t px-3 py-2 text-xs text-muted-foreground',
  },
}

const itemValue = ref()
const groupValue = ref()
const customValue = ref()
const customSearch = ref('')
const commandFiltering = ref(false)
const filteredCommandGroups = ref(commandGroups)
const multipleValue = ref(['search'])

let commandFilterRequest = 0

async function handleCommandSearch(search, filter) {
  const request = ++commandFilterRequest
  customSearch.value = search
  commandFiltering.value = true

  await new Promise((resolve) => setTimeout(resolve, 2000))
  if (request !== commandFilterRequest) return

  filteredCommandGroups.value = search
    ? commandGroups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            filter.contains(
              `${item.label ?? ''} ${item.value ?? ''} ${(item.tags ?? []).join(' ')}`,
              search,
            ),
          ),
        }))
        .filter((group) => group.items.length > 0)
    : commandGroups
  commandFiltering.value = false
}

const richCommandItems = [
  {
    id: 'vue-guide',
    label: 'Guía de Vue',
    description: 'Documentación para construir interfaces con Vue.',
    tags: ['frontend', 'javascript', 'componentes'],
  },
  {
    id: 'api-users',
    label: 'Usuarios',
    description: 'Administración de cuentas y permisos.',
    tags: ['backend', 'seguridad', 'equipo'],
  },
  {
    id: 'deploy-production',
    label: 'Desplegar',
    description: 'Publicar la aplicación en producción.',
    tags: ['devops', 'release', 'producción'],
  },
]
const filteredRichCommandItems = ref(richCommandItems)

function handleRichCommandSearch(search, filter) {
  filteredRichCommandItems.value = search
    ? richCommandItems.filter((item) =>
        filter.contains(`${item.label} ${item.description} ${item.tags.join(' ')}`, search),
      )
    : richCommandItems
}

const lastSelection = ref('Ninguna selección')

function handleSelect(item, group) {
  console.log(item, group)
  lastSelection.value = group
    ? `${item.label ?? item.value ?? item.id} · ${group.label ?? group.id}`
    : `${item.label ?? item.value ?? item.id} · sin grupo`
}
</script>

<template>
  <!-- Command examples -->
  <main class="mx-auto max-w-5xl space-y-10 p-8">
    <Popover :ui="{ content: { class: 'p-0 border-none' } }">
      <button class="rounded-lg border">HOlaa</button>

      <template #content>
        <Command v-model="itemValue" :items="commandItems" :filter="false" @select="handleSelect" />
      </template>
    </Popover>

    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Command</h1>
      <p class="text-muted-foreground">
        Ejemplos con items independientes, grupos, búsqueda, selección, UI y slots.
      </p>
    </header>

    <section class="space-y-4" aria-labelledby="command-items-title">
      <div>
        <h2 id="command-items-title" class="text-xl font-semibold">Sin grupos</h2>
        <p class="text-sm text-muted-foreground">
          La prop <code>items</code> permite mostrar comandos directamente, sin crear un grupo
          artificial.
        </p>
      </div>

      <div class="grid gap-4 rounded-lg border p-5 md:grid-cols-[minmax(0,1fr)_240px]">
        <Command v-model="itemValue" :items="commandItems" :filter="true" @select="handleSelect" />

        <div class="rounded-lg bg-muted p-4 text-sm">
          <p class="font-medium">Estado</p>
          <p class="mt-2 text-muted-foreground">Valor: {{ itemValue ?? 'ninguno' }}</p>
          <p class="mt-2 text-muted-foreground">{{ lastSelection }}</p>
        </div>
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="command-multiple-title">
      <div>
        <h2 id="command-multiple-title" class="text-xl font-semibold">Selección múltiple</h2>
        <p class="text-sm text-muted-foreground">
          Con <code>multiple</code>, el modelo es un array y cada selección alterna el valor
          automáticamente.
        </p>
      </div>

      <Command
        v-model="multipleValue"
        multiple
        selectable
        :items="commandItems"
        :ui="commandUI"
        class="rounded-lg border shadow-sm md:max-w-xl"
      />

      <p class="text-sm text-muted-foreground">
        Valores seleccionados:
        <strong>{{ multipleValue.length ? multipleValue.join(', ') : 'ninguno' }}</strong>
      </p>
    </section>

    <section class="space-y-4" aria-labelledby="command-groups-title">
      <div>
        <h2 id="command-groups-title" class="text-xl font-semibold">Con grupos</h2>
        <p class="text-sm text-muted-foreground">
          Los encabezados y separadores aparecen automáticamente y la búsqueda utiliza el texto
          visible de cada item.
        </p>
      </div>

      <Command
        v-model="groupValue"
        :items="commandGroups"
        class="rounded-lg border shadow-sm md:max-w-xl"
      />

      <p class="text-sm text-muted-foreground">Con un único grupo no se muestra su encabezado:</p>
      <Command :items="commandGroups.slice(0, 1)" class="rounded-lg border shadow-sm md:max-w-xl" />

      <p class="text-sm text-muted-foreground">
        Valor seleccionado: <strong>{{ groupValue ?? 'ninguno' }}</strong>
      </p>
    </section>

    <section class="space-y-4" aria-labelledby="command-custom-title">
      <div>
        <h2 id="command-custom-title" class="text-xl font-semibold">UI y slots</h2>
        <p class="text-sm text-muted-foreground">
          Personalización funcional y slots individuales identificados por el <code>id</code>.
        </p>
      </div>

      {{ customSearch }}
      <Command
        v-model="customValue"
        :items="filteredCommandGroups"
        :filter="true"
        selectable
        placeholder="Busca una acción..."
        empty-label="No existe ninguna acción con ese nombre."
        :ui="commandUI"
        class="rounded-lg border border-violet-200 shadow-sm md:max-w-xl dark:border-violet-900"
        @select="handleSelect"
        @search="handleCommandSearch"
      >
        <template #inputIcon>
          <Icon name="error" color="purple" class="" />
        </template>

        <template #heading-danger="{ group }">
          <span class="flex items-center gap-2 text-red-600">
            <Icon name="warning" class="size-3.5" />
            {{ group.label }}
          </span>
        </template>

        <template #label-save="{ item, selected }">
          <span :class="selected ? 'font-semibold text-violet-700' : undefined">
            {{ item.label }}
          </span>
        </template>

        <template #icon-delete-cache>
          <Icon name="trash2" color="red" />
        </template>

        <template #footer="{ search }">
          {{ commandFiltering ? 'Filtrando…' : `Filtro controlado: ${search || 'sin búsqueda'}` }}
        </template>
      </Command>

      <p class="text-sm text-muted-foreground">
        Última selección: <strong>{{ lastSelection }}</strong>
      </p>
    </section>

    <section class="space-y-4" aria-labelledby="command-rich-items-title">
      <div>
        <h2 id="command-rich-items-title" class="text-xl font-semibold">
          Filtrado externo por varios campos
        </h2>
        <p class="text-sm text-muted-foreground">
          El evento <code>search</code> filtra por label, descripción y tags mediante
          <code>useFilter</code>. El contenido de cada opción se renderiza con el slot
          <code>item</code>.
        </p>
      </div>

      <Command
        :items="filteredRichCommandItems"
        placeholder="Busca por nombre, descripción o tag..."
        class="rounded-lg border shadow-sm md:max-w-xl"
        :selectable="true"
        :multiple="true"
        @search="handleRichCommandSearch"
      >
        <template #item="{ item, ...slotProps }">
          <div class="min-w-0 flex-1">
            <p class="font-medium">{{ item.label }}</p>
            <p class="truncate text-xs text-muted-foreground">{{ item.description }}</p>
            <div class="mt-1 flex flex-wrap gap-1">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {{ tag }}
              </span>
            </div>

            <div v-if="slotProps.selected">YES</div>
          </div>
        </template>
      </Command>
    </section>

    <section class="space-y-4 border-t pt-10" aria-labelledby="sheet-title">
      <div class="space-y-2">
        <h2 id="sheet-title" class="text-2xl font-semibold">Sheet</h2>
        <p class="text-sm text-muted-foreground">
          Paneles modales que entran desde un borde y mantienen el contexto de la página.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <Sheet
          label="Editar perfil"
          description="Actualiza la información pública de tu cuenta."
          :ui="{ content: { class: 'w-full sm:max-w-md' }, body: { class: 'space-y-5' } }"
        >
          <Button label="Editar perfil" variant="outline" />

          <template #content>
            <div class="space-y-2">
              <label for="sheet-name" class="text-sm font-medium">Nombre</label>
              <Input id="sheet-name" default-value="Pedro Duarte" />
            </div>
            <div class="space-y-2">
              <label for="sheet-username" class="text-sm font-medium">Usuario</label>
              <Input id="sheet-username" default-value="@peduarte" />
            </div>
          </template>

          <template #footer="{ close }">
            <Button label="Guardar cambios" @click="close" />
            <Button label="Cancelar" variant="outline" severity="secondary" @click="close" />
          </template>
        </Sheet>
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="sheet-sides-title">
      <div>
        <h2 id="sheet-sides-title" class="text-xl font-semibold">Todos los lados</h2>
        <p class="text-sm text-muted-foreground">
          La prop <code>side</code> acepta top, right, bottom y left.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <Sheet
          v-for="side in sheetSides"
          :key="side"
          :side="side"
          :label="`Sheet ${side}`"
          description="El mismo componente puede entrar desde cualquier borde de la pantalla."
          :ui="{
            content: {
              class: side === 'top' || side === 'bottom' ? 'h-[45dvh]' : 'w-full sm:max-w-md',
            },
          }"
        >
          <Button :label="`Abrir ${side}`" variant="outline" />

          <template #content="{ close }">
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">
                Este panel se ha abierto desde <strong>{{ side }}</strong
                >.
              </p>
              <Button label="Cerrar panel" variant="outline" @click="close" />
            </div>
          </template>
        </Sheet>
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="sheet-scroll-title">
      <div>
        <h2 id="sheet-scroll-title" class="text-xl font-semibold">Contenido desplazable</h2>
        <p class="text-sm text-muted-foreground">
          El encabezado y el footer permanecen visibles mientras se desplaza el cuerpo.
        </p>
      </div>

      <Sheet
        side="right"
        label="Detalles del proyecto"
        description="Consulta toda la información sin abandonar la pantalla actual."
        :ui="{ content: { class: 'w-full sm:max-w-xl' }, body: { class: 'space-y-6' } }"
      >
        <Button label="Ver detalles" variant="outline" />

        <template #content>
          <article v-for="paragraph in sheetParagraphs" :key="paragraph.id" class="space-y-2">
            <h3 class="font-medium">{{ paragraph.label }}</h3>
            <p class="text-sm leading-6 text-muted-foreground">{{ paragraph.text }}</p>
          </article>
        </template>

        <template #footer="{ close }">
          <Button label="Aceptar" @click="close" />
        </template>
      </Sheet>
    </section>

    <section class="space-y-6 border-t pt-10" aria-labelledby="input-otp-title">
      <div class="space-y-2">
        <h2 id="input-otp-title" class="text-2xl font-semibold">Input OTP</h2>
        <p class="text-sm text-muted-foreground">
          Entrada accesible de códigos de un solo uso con navegación por teclado y pegado completo.
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-2">
        <article class="space-y-4 rounded-lg border p-5">
          <div class="space-y-1">
            <h3 id="otp-controlled-label" class="font-medium">Controlado y agrupado</h3>
            <p class="text-sm text-muted-foreground">
              Seis dígitos distribuidos en dos grupos. También puedes pegar el código completo.
            </p>
          </div>

          <InputOTP
            v-model="otpValue"
            :groups="[3, 3]"
            pattern="digits"
            aria-labelledby="otp-controlled-label"
            @complete="completedOtp = $event"
          />

          <div class="space-y-1 text-sm">
            <p>
              Valor actual: <code>{{ otpValue || 'vacío' }}</code>
            </p>
            <p v-if="completedOtp" class="text-success">Código completado: {{ completedOtp }}</p>
          </div>
        </article>

        <article class="space-y-4 rounded-lg border p-5">
          <div class="space-y-1">
            <h3 id="otp-alphanumeric-label" class="font-medium">Alfanumérico</h3>
            <p class="text-sm text-muted-foreground">
              Admite letras y números, usa tres grupos y personaliza el separador.
            </p>
          </div>

          <InputOTP
            v-model="alphanumericOtp"
            :groups="[2, 2, 2]"
            pattern="alphanumeric"
            inputmode="text"
            aria-labelledby="otp-alphanumeric-label"
          >
            <template #separator>
              <span class="px-1 text-muted-foreground" aria-hidden="true">/</span>
            </template>
          </InputOTP>

          <p class="text-sm">
            Valor actual: <code>{{ alphanumericOtp }}</code>
          </p>
        </article>

        <article class="space-y-4 rounded-lg border p-5">
          <div class="space-y-1">
            <h3 id="otp-custom-label" class="font-medium">Tamaño personalizado</h3>
            <p class="text-sm text-muted-foreground">
              La configuración <code>ui.slot</code> modifica todos los slots generados.
            </p>
          </div>

          <InputOTP
            :maxlength="4"
            :groups="[2, 2]"
            pattern="digits"
            :ui="otpLargeUI"
            aria-labelledby="otp-custom-label"
          />
        </article>

        <article class="space-y-4 rounded-lg border p-5">
          <div class="space-y-1">
            <h3 id="otp-disabled-label" class="font-medium">Deshabilitado</h3>
            <p class="text-sm text-muted-foreground">
              Conserva el valor mostrado y comunica correctamente el estado deshabilitado.
            </p>
          </div>

          <InputOTP
            default-value="123456"
            :groups="[3, 3]"
            disabled
            aria-labelledby="otp-disabled-label"
          />
        </article>
      </div>
    </section>
  </main>
</template>
