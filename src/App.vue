<script setup lang="ts">
import { ref } from 'vue'
import { Boton } from '@/components/app/Button'
import { Input } from '@/components/app/Input'
import { Label } from '@/components/app/Label'

const name = ref('')
const email = ref('usuario@ejemplo.com')
const age = ref<string | number>(25)
const subscriptionEmail = ref('')
const submittedEmail = ref('')

function subscribe() {
  submittedEmail.value = subscriptionEmail.value
}
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-3xl space-y-10">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Input</h1>
        <p class="max-w-2xl text-sm text-muted-foreground">
          Campos nativos con v-model, atributos HTML, estados de validación y foco primary.
        </p>
      </header>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Básico</h2>
          <p class="text-sm text-muted-foreground">
            Type, placeholder y el resto de opciones se reciben como atributos HTML.
          </p>
        </div>

        <Input type="text" placeholder="Escribe tu nombre" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">V-model</h2>
          <p class="text-sm text-muted-foreground">
            El valor se sincroniza mediante modelValue y update:modelValue.
          </p>
        </div>

        <Input v-model="name" placeholder="Nombre completo" />
        <p class="text-sm text-muted-foreground">Valor: {{ name || 'Vacío' }}</p>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Default value</h2>
          <p class="text-sm text-muted-foreground">
            Permite establecer un valor inicial sin controlar el componente.
          </p>
        </div>

        <Input default-value="Contenido inicial" />
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Tipos HTML</h2>
          <p class="text-sm text-muted-foreground">
            El componente conserva el comportamiento del input nativo.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <Input v-model="email" type="email" autocomplete="email" placeholder="Email" />
          <Input type="password" autocomplete="current-password" placeholder="Contraseña" />
          <Input type="search" placeholder="Buscar…" />
          <Input v-model="age" type="number" min="0" max="120" placeholder="Edad" />
          <Input type="date" />
          <Input type="tel" autocomplete="tel" placeholder="Teléfono" />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Con Label</h2>
          <p class="text-sm text-muted-foreground">
            For e id asocian correctamente la etiqueta visible con el campo.
          </p>
        </div>

        <div class="grid gap-1.5">
          <Label for="company-email">Email de empresa</Label>
          <Input
            id="company-email"
            type="email"
            name="companyEmail"
            autocomplete="work email"
            placeholder="nombre@empresa.com"
          />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Archivo</h2>
          <p class="text-sm text-muted-foreground">
            Los estilos file también forman parte del componente de UI.
          </p>
        </div>

        <div class="grid gap-1.5">
          <Label for="picture">Imagen de perfil</Label>
          <Input id="picture" type="file" accept="image/*" />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Disabled y readonly</h2>
          <p class="text-sm text-muted-foreground">
            Ambos estados se aplican mediante atributos nativos.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <Input disabled default-value="Campo deshabilitado" />
          <Input readonly default-value="Campo de solo lectura" />
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Inválido</h2>
          <p class="text-sm text-muted-foreground">
            Aria-invalid activa el estilo de error y aria-describedby enlaza el mensaje.
          </p>
        </div>

        <div class="grid gap-1.5">
          <Label for="invalid-email">Email</Label>
          <Input
            id="invalid-email"
            type="email"
            default-value="email-invalido"
            aria-invalid="true"
            aria-describedby="invalid-email-message"
          />
          <p id="invalid-email-message" class="text-sm text-destructive">
            Introduce una dirección de correo válida.
          </p>
        </div>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Con Button</h2>
          <p class="text-sm text-muted-foreground">
            Puede componerse con otros componentes sin añadir estructura interna.
          </p>
        </div>

        <form class="flex items-center gap-2" @submit.prevent="subscribe">
          <Input
            v-model="subscriptionEmail"
            type="email"
            required
            autocomplete="email"
            placeholder="Email"
          />
          <Boton type="submit" label="Suscribirse" />
        </form>

        <p v-if="submittedEmail" class="text-sm text-success">
          Suscripción registrada para {{ submittedEmail }}.
        </p>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Atributos personalizados</h2>
          <p class="text-sm text-muted-foreground">
            Class y style se combinan con los estilos predeterminados.
          </p>
        </div>

        <Input
          placeholder="Input personalizado"
          class="h-11 rounded-full border-dashed px-5"
          style="letter-spacing: 0.02em"
        />
      </section>
    </div>
  </main>
</template>
