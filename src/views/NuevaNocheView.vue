<script setup>
import axios from 'axios';
import Toast from '@/components/Toast.vue';
import { ref } from 'vue';

const alerta = ref(false);
const mensaje = ref('');
const tipo = ref('');

const nuevaNoche = async () => {
  try {
    const { data } = await axios.get('https://fiestaappapi.onrender.com/api/canciondj/nuevanoche');
    mensaje.value = data.message;
    tipo.value = 'success';
    alerta.value = false;
    setTimeout(() => {
      alerta.value = true;
    }, 10);
  } catch (error) {
    console.log(error)
    mensaje.value = error.message;
    tipo.value = 'danger'
    alerta.value = false;
    setTimeout(() => {
      alerta.value = true;
    }, 10);
  }
}

</script>

<template>
  <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Nueva Noche</h1>
      <div class="mx-4 text-center">
        <h5>Para crear una nueva noche pulse el siguiente boton </h5>
        <h6>(Se reiniciaran las canciones del DJ actual)</h6>
        <button type="button" class="btn btn-success btn-lg mt-4" @click="nuevaNoche">Nueva Noche</button>
      </div>
    </div>
  </div>
  <Toast v-if="alerta" :message="mensaje" :type="tipo" />
</template>