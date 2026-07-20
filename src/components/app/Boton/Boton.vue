<template>
    <Button v-bind="attrs" :aria-busy="ariaBusy" :aria-disabled="ariaDisabled" :class="classCSS" @click="handleClick">
        <template #default>
            {{ titulo }}
            {{ fluido }}
        </template>
    </Button>
</template>

<script setup lang="ts">
import { useAttrs, computed } from "vue";
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import {
    appBotonVariants,
    type AppBotonVariantes,
} from "./variantes.ts"

defineOptions({
    inheritAttrs: false
})

interface Props {
    titulo?: string,
    variante?: AppBotonVariantes["variante"]
    paleta?: AppBotonVariantes["paleta"]
    tamano?: AppBotonVariantes["tamano"]
    fluido?: AppBotonVariantes["fluido"]
    redondeado?: boolean,
    cargando?: boolean
}


const emit = defineEmits<{
    click: [event: MouseEvent]
}>();
const attrs = useAttrs();
const props = withDefaults(defineProps<Props>(), {
    titulo: "",
    variante: "solido",
    paleta: 'primario',
    tamano: "md",
    fluido: false,
    redondeado: false,
    cargando: false,
})


const ariaBusy = computed(() => {
    return props.cargando || attrs['aria-busy']
})

const ariaDisabled = computed(() => {
    return props.cargando || attrs['aria-disabled']
})

const classCSS = computed(() => {
    const x = cn(
        appBotonVariants({
            variante: props.variante,
            tamano: props.tamano,
            fluido: props.fluido,
            redondeado: props?.redondeado,
            paleta: props?.paleta
        }),
        attrs.class,
    )
    console.log(x)
    return x
})


const handleClick = ($evt: MouseEvent) => {
    if (ariaDisabled.value) {
        $evt.stopPropagation();
        $evt.preventDefault();
        return
    }

    emit('click', $evt)
}
</script>
