## Alerta

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

alerta.mensaje = 'Exito';
alerta.tipo = 'success'
alerta.activar()

alerta.activar('','success')

alerta.mensaje = error.message;
alerta.tipo = 'danger'
alerta.activar()

alerta.activar(error.message,'danger')

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
