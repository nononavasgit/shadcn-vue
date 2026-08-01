<script setup lang="ts">
import { ref } from 'vue'
import { Field } from '@/components/ui/Field'
import { FieldSet } from '@/components/ui/FieldSet'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Input } from '@/components/ui/Input'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { Switch } from '@/components/ui/Switch'
import { Textarea } from '@/components/ui/Textarea'

const profile = ref({ name: '', email: '', bio: '' })
const preferences = ref({
  notifications: true,
  terms: false,
  plan: 'monthly',
})
const submitted = ref(false)

function submit() {
  submitted.value = true
}

function reset() {
  profile.value = { name: '', email: '', bio: '' }
  preferences.value = { notifications: true, terms: false, plan: 'monthly' }
  submitted.value = false
}
</script>

<template>
  <main class="mx-auto min-h-screen max-w-2xl space-y-10 p-6 md:p-10">
    <div>
      <p class="text-sm font-medium text-primary">FieldSet + Field</p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight">Perfil de usuario</h1>
      <p class="mt-2 text-muted-foreground">
        Ejemplos del componente Field de ui con controles de texto y selección.
      </p>
    </div>

    <Button rounded variant="outline">Limpiar</Button>
    <Button loading variant="subtle">Guardar perfil</Button>
    <Button variant="plain" icon="error" color="#ef4444" size="sm">Limpiar</Button>

    <form class="space-y-8" novalidate @submit.prevent="submit">
      <FieldSet
        legend="Información personal"
        description="Estos datos se utilizarán para identificarte en la aplicación."
        class="rounded-lg border bg-card p-6"
      >
        <Field
          v-slot="{ a11yAttrs }"
          label="Nombre completo"
          required
          description="Utiliza el nombre con el que quieres que te llamen."
          :error="submitted && !profile.name ? 'El nombre es obligatorio.' : undefined"
        >
          <Input
            v-model="profile.name"
            autocomplete="name"
            placeholder="Ada Lovelace"
            required
            v-bind="a11yAttrs"
          />
        </Field>

        <Field
          v-slot="{ a11yAttrs }"
          label="Correo electrónico"
          required
          :error="submitted && !profile.email ? 'El correo es obligatorio.' : undefined"
        >
          <Input
            v-model="profile.email"
            type="email"
            autocomplete="email"
            placeholder="ada@example.com"
            required
            v-bind="a11yAttrs"
          />
        </Field>

        <Field
          v-slot="{ a11yAttrs }"
          label="Biografía"
          description="Máximo 240 caracteres."
          hint="Opcional"
          help="Este texto será visible en tu perfil público."
        >
          <Textarea
            v-model="profile.bio"
            :rows="4"
            placeholder="Cuéntanos algo sobre ti..."
            v-bind="a11yAttrs"
          />
        </Field>
      </FieldSet>

      <FieldSet
        legend="Preferencias"
        description="Personaliza cómo quieres utilizar la aplicación."
        class="rounded-lg border bg-card p-6"
      >
        <Field
          v-slot="{ a11yAttrs }"
          label="Notificaciones por email"
          orientation="horizontal"
          control-position="end"
        >
          <Switch v-model="preferences.notifications" v-bind="a11yAttrs" />
        </Field>

        <Field
          v-slot="{ a11yAttrs }"
          label="Aceptar términos y condiciones"
          orientation="horizontal"
          control-position="start"
          :error="submitted && !preferences.terms ? 'Debes aceptar los términos.' : undefined"
        >
          <Checkbox v-model="preferences.terms" v-bind="a11yAttrs" />
        </Field>
      </FieldSet>

      <FieldSet
        legend="Plan de suscripción"
        description="Selecciona el plan que quieres utilizar."
        class="rounded-lg border bg-card p-6"
      >
        <Field v-slot="{ a11yAttrs }" label="Plan" help="aa">
          <RadioGroup
            v-bind="a11yAttrs"
            v-model="preferences.plan"
            :orientation="'horizontal'"
            grouped
            :items="[
              {
                label: 'Mensual',
                value: 1,
              },
              {
                label: 'Anual',
                value: 12,
              },
            ]"
          />
        </Field>
      </FieldSet>

      <div class="flex justify-end gap-3">
        <Button type="button" variant="outline" @click="reset">Limpiar</Button>
        <Button type="submit">Guardar perfil</Button>
      </div>

      <p
        v-if="submitted && profile.name && profile.email && preferences.terms"
        role="status"
        class="text-sm text-success"
      >
        Perfil guardado correctamente.
      </p>
    </form>
  </main>
</template>
