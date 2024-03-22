<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Carga from '@/components/Carga.vue';
import Error from '@/components/Error.vue';

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

const esperandoAPI = ref(false);
const errorObtenido = ref(false);
const djActual = ref(null);
const yaEsActual = ref(false);

const getData = async () => {
  esperandoAPI.value = true;
  try {
    const { data } = await axios.get('https://fiestaappapi.onrender.com/api/djs/actual')
    djActual.value = data.data
    const hoy = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()).toISOString().split('T')[0]

    if (djActual.value.fechaActual === hoy) {
      yaEsActual.value = true;
    }
    esperandoAPI.value = false;
  } catch (error) {
    errorObtenido.value = true;
    esperandoAPI.value = false;
    if (error.response.data.message) {
      alerta.mensaje = error.response.data.message;
    } else { alerta.mensaje = error.message; }
    alerta.tipo = 'danger'
    alerta.activar()
  }
}
getData();

const nuevaNoche = async () => {
  try {
    const { data } = await axios.get('https://fiestaappapi.onrender.com/api/canciondj/nuevanoche')
    alerta.activar(data.message, 'success')
    esperandoAPI.value = true;
    setTimeout(() => {
      getData();
    }, 1500);
  } catch (error) {
    alerta.activar(error.message, 'danger')
  }
}

</script>

<template>
  <Carga v-if="esperandoAPI" />
  <Error v-if="errorObtenido" />
  <div class="container py-4 rounded mt-3" style="background-color: gray;" v-if="!esperandoAPI && !errorObtenido">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Nueva Noche</h1>
      <div class="mx-4 text-center">
        <div v-if="!yaEsActual">
          <div class="row border rounded p-4 mb-2 text-warning-emphasis border-warning"
            style="--bs-border-opacity: 0.3;">
            <h3 class="mb-0">DJ Actual: {{ djActual.nombre }}</h3>
          </div>
          <h5>Para crear una nueva noche pulse el siguiente boton </h5>
          <h6>(Se reiniciaran las canciones del DJ actual)</h6>
        </div>
        <div v-if="yaEsActual">
          <h5 class="text-danger-emphasis">Ya fue creada la noche de hoy</h5>
        </div>
        <button type="button" class="btn btn-success btn-lg mt-4" @click="nuevaNoche" :disabled="yaEsActual">Nueva
          Noche</button>
      </div>
    </div>
  </div>
</template>