<script setup>
import axios from 'axios'
import { ref } from 'vue';

const props = defineProps(['djOpiniones']);
const emit = defineEmits(['cerrarOpiniones'])

const opiniones = ref([]);

const getOpiniones = async () => {
  try {
    const { data } = await axios.get(`https://fiestaappapi.onrender.com/api/djs/${props.djOpiniones.id}/opiniones`);
    opiniones.value = data.data;
  } catch (error) {
    console.log(error)
  }
};

getOpiniones();
</script>

<template>
  <div class="container py-4 rounded my-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis">Opiniones de {{ djOpiniones.nombre }}</h1>
      <div class="mx-4">
        <button type="button" class="btn btn-secondary my-2" @click="$emit('cerrarOpiniones')">Cerrar</button>
        <h2 v-if="opiniones.length === 0">No hay opiniones de {{ djOpiniones.nombre }}</h2>
        <table v-else class="table">
          <tbody>
            <tr v-for="opinion in opiniones" :key="opinion.id">
              <td>{{ opinion.opinion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>