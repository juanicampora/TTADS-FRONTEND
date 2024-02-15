## Alerta

import Toast from '@/components/Toast.vue';
const alerta = ref(false);

mensaje.value = error.message;
tipo.value = 'danger'
alerta.value = false;
setTimeout(() => {
alerta.value = true;
}, 10);

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
