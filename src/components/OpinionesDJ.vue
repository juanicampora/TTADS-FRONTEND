<script setup>
import axios from 'axios'
import { ref } from 'vue';
import Carga from '@/components/Carga.vue';
const esperandoAPI = ref(false);

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

const props = defineProps(['djOpiniones']);
const emit = defineEmits(['cerrarOpiniones'])

const opiniones = ref([]);

const getOpiniones = async () => {
  try {
    esperandoAPI.value = true;
    const { data } = await axios.get(`https://fiestaappapi.onrender.com/api/djs/${props.djOpiniones.id}/opiniones`);
    opiniones.value = data.data;
    esperandoAPI.value = false;
  } catch (error) {
    alerta.mensaje = error.message;
    alerta.tipo = 'danger'
    alerta.activar()
    esperandoAPI.value = false;
  }
};

const eliminarOpinion = async (idOpinion) => {
  try {
    esperandoAPI.value = true;
    await axios.delete(`https://fiestaappapi.onrender.com/api/djs/opinion/${idOpinion}`);
    esperandoAPI.value = false;
    alerta.mensaje = 'Opinión eliminada.';
    alerta.tipo = 'success'
    alerta.activar()
    getOpiniones();
  } catch (error) {
    alerta.mensaje = error.message;
    alerta.tipo = 'danger'
    alerta.activar()
    esperandoAPI.value = false;
  }
};

getOpiniones();
</script>

<template>
  <Carga v-if="esperandoAPI" />
  <div class="container py-4 rounded my-3" style="background-color: gray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis">Opiniones de {{ djOpiniones.nombre }}</h1>
      <div class="mx-4">
        <button type="button" class="btn btn-secondary my-2" @click="$emit('cerrarOpiniones')">Cerrar</button>
        <h2 v-if="opiniones.length === 0">No hay opiniones de {{ djOpiniones.nombre }}</h2>
        <table v-else class="table">
          <tbody>
            <tr v-for="opinion in opiniones" :key="opinion.id">
              <td><button class="btn btn-danger btn-sm" style="margin-right: 10px;"
                  @click="eliminarOpinion(opinion.id)"><i class="bi bi-trash3"></i></button> {{ opinion.opinion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>