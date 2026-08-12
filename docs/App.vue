<script setup lang="ts">
import { ConfigProvider } from '@/components/provider'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
</script>

<template>
  <ConfigProvider>
    <div class="min-h-screen bg-background text-foreground">
      <header class="border-b bg-background/90 backdrop-blur">
        <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a class="flex items-center gap-3 font-semibold" href="/">
            <span
              class="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"
            >
              N
            </span>
            <span>shadcn-vue</span>
          </a>
          <Badge label="v0.3.0" variant="soft" />
        </div>
      </header>

      <main>
        <section class="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div class="flex flex-col justify-center">
            <p class="mb-4 text-sm font-semibold tracking-wide text-primary uppercase">
              Componentes para Vue
            </p>
            <h1 class="max-w-3xl text-5xl leading-tight font-bold tracking-tight md:text-6xl">
              Construye interfaces consistentes sin empezar de cero.
            </h1>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Una librería personal basada en Reka UI y Tailwind CSS, con componentes accesibles,
              tipados y preparados para personalizar.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <Button label="Ver componentes" />
              <Button label="Instalación" variant="outline" />
            </div>
          </div>

          <div class="rounded-2xl border bg-card p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted-foreground">Componente</p>
                <h2 class="mt-1 text-xl font-semibold">Separator</h2>
              </div>
              <Badge label="Disponible" severity="success" variant="soft" />
            </div>
            <Separator class="my-6" />
            <div class="space-y-4">
              <div>
                <p class="text-sm font-medium">Horizontal</p>
                <Separator class="mt-3" />
              </div>
              <div class="flex h-16 items-center gap-4 text-sm text-muted-foreground">
                <span>Cuenta</span>
                <Separator orientation="vertical" />
                <span>Preferencias</span>
                <Separator orientation="vertical" />
                <span>Sesión</span>
              </div>
            </div>
          </div>
        </section>

        <section class="border-t bg-muted/30">
          <div class="mx-auto grid max-w-6xl gap-5 px-6 py-14 md:grid-cols-3">
            <article class="rounded-xl border bg-background p-6">
              <p class="font-semibold">Accesible</p>
              <p class="mt-2 text-sm leading-6 text-muted-foreground">
                Construido sobre primitivas de Reka UI.
              </p>
            </article>
            <article class="rounded-xl border bg-background p-6">
              <p class="font-semibold">Tipado</p>
              <p class="mt-2 text-sm leading-6 text-muted-foreground">
                API y contextos definidos con TypeScript.
              </p>
            </article>
            <article class="rounded-xl border bg-background p-6">
              <p class="font-semibold">Personalizable</p>
              <p class="mt-2 text-sm leading-6 text-muted-foreground">
                Clases, atributos y estilos mediante la propiedad UI.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  </ConfigProvider>
</template>
