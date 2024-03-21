## Alerta

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

alerta.mensaje = 'Exito';
alerta.tipo = 'success'
alerta.activar()

alerta.mensaje = error.message;
alerta.tipo = 'danger'
alerta.activar()

<Toast v-if="alerta" :message="mensaje" :type="tipo" />

## Loader

import Carga from '@/components/Carga.vue';
const esperandoAPI = ref(false);

esperandoAPI.value = true;
esperandoAPI.value = false;

<Carga v-if="esperandoAPI" />

## Datepicker

https://vue3datepicker.com/installation/

## Checkbox:

https://lokesh-coder.github.io/pretty-checkbox/#installation
