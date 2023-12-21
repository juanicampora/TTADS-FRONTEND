<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios';
import Carga from '@/components/Carga.vue';

const fechasPermitidas = ref([]);
const fechaElegida = ref();
const canciones = ref([]);
const tablaLista = ref(false);
const esperandoAPI = ref(false);
const claseEspera = ref('');

const getFechasPermitidas = async () => {
  try {
    esperandoAPI.value = true;
    claseEspera.value = 'disable-clicks';
    const { data } = await axios.get('https://fiestaappapi.onrender.com/api/canciondj/fechas');
    fechasPermitidas.value = formatearFechas(data.data);
    console.log(fechasPermitidas.value)
    esperandoAPI.value = false;
    claseEspera.value = '';
  } catch (error) {
    console.log(error)
  }
}

getFechasPermitidas();

//fechasPermitidas hardcodeadas generadas aleatoriamente
//fechasPermitidas.value = ["2023/11/10", "2023/11/09"]

const getTopCanciones = async () => {
  try {
    const { data } = await axios.get(`https://fiestaappapi.onrender.com/api/canciondj/topcanciones/${fechaElegida.value}`);
    canciones.value = data.data;
    tablaLista.value = true;
  } catch (error) {
    console.log(error)
  }
}

// obtiene fecha mm/dd/yyyy y devuelve yyyy/mm/dd
const formatearFechas = (fechas) => {
  const fechasFormateadas = [];
  fechas.forEach(fecha => {
    const fechaFormateada = fecha.split('/');
    fechasFormateadas.push(`${fechaFormateada[2]}/${fechaFormateada[0]}/${fechaFormateada[1]}`);
  });
  return fechasFormateadas;
}

</script>

<template>
  <Carga v-if="esperandoAPI" />
  <div :class="claseEspera">
    <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Top Canciones</h1>
      <div class="mx-4">
        <h5 class="text-center mb-4">Seleccione una fecha para mostrar su top canciones</h5>
        <div class="text-center mb-4">
          <VueDatePicker dark placeholder="Seleccione una fecha" v-model="fechaElegida" model-type="yyyy.MM.dd"
            :allowed-dates="fechasPermitidas" :enable-time-picker="false" position="left" :model-value="fechaElegida"
            @update:model-value="getTopCanciones" />
        </div>

        <table v-if="tablaLista" class="table">
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

<style>
.disable-clicks {
  pointer-events: none;
}
</style>