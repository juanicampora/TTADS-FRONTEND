<script setup>
import axios from 'axios';
import Toast from '../components/Toast.vue';
import ref from 'vue';
const alerta = ref(false);
const nuevaNoche = () => {
  // axios({
  //   method: 'post',
  //   url: 'https://fiestaappapi.onrender.com/api/canciondj/nuevanoche',
  // });
  alerta.value=true;
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
  <Toast v-if="alerta" message="Se ha creado la nueva noche" type="success"/>
</template>