<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios';

const fechasPermitidas = ref([]);
const fechaElegida = ref();

const canciones = ref([]);

const getFechasPermitidas = async () => {
  try {
    const { data } = await axios.get('https://fiestaappapi.onrender.com/api/canciondj/fechas');
    fechasPermitidas.value = data.data;
  } catch (error) {
    console.log(error)
  }
}

//fechasPermitidas hardcodeadas generadas aleatoriamente
fechasPermitidas.value = ["2023/11/10", "2023/11/08"]

const getTopCanciones = async () => {
  try {
    const { data } = await axios.get(`https://fiestaappapi.onrender.com/api/canciondj/topcanciones/${fechaElegida.value}`);
    canciones.value = data.data;
  } catch (error) {
    console.log(error)
  }
}


</script>

<template>
  <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Top Canciones</h1>
      <div class="mx-4">
        <h5 class="mb-4">Seleccione una fecha para mostrar su top canciones</h5>
        <VueDatePicker v-model="fechaElegida" model-type="yyyy.MM.dd" :allowed-dates="fechasPermitidas" position="left"
          :model-value="fechaElegida" @update:model-value="getTopCanciones" />

        <table class="table">
          <thead>
            <th>Nombre de la Cancion</th>
            <th>Autor</th>
            <th>Puntaje</th>
          </thead>
          <tbody>
            <tr v-for="cancion in canciones" :key="cancion.idCancion">
              <td>{{ cancion.cancion.nombre }}</td>
              <td>{{ cancion.cancion.autor }}</td>
              <td>{{ cancion.puntaje }}</td>
            </tr>
          </tbody>
        </table>



      </div>
    </div>
  </div>
</template>
