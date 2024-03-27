<script setup>
import axios from 'axios'
import { ref } from 'vue';

import { useEspera } from '@/stores/espera'
const espera = useEspera()

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

const props = defineProps(['djOpiniones']);
const emit = defineEmits(['cerrarOpiniones'])

const opiniones = ref([]);

const getOpiniones = async () => {
  try {
    espera.activar();
    const { data } = await axios.get(`http://localhost:3000/api/djs/${props.djOpiniones.id}/opiniones`);
    opiniones.value = data.data;
    console.log(data.data);
    espera.desactivar();
  } catch (error) {
    alerta.activar(error.message, 'danger')
    espera.desactivar();
  }
};

const eliminarOpinion = async (idOpinion) => {
  try {
    espera.activar();
    await axios.delete(`https://fiestaappapi.onrender.com/api/djs/opinion/${idOpinion}`);
    espera.desactivar();
    alerta.activar('Opinión eliminada', 'success')
    getOpiniones();
  } catch (error) {
    alerta.activar(error.message, 'danger')
    espera.desactivar();
  }
};

getOpiniones();
</script>

<template>
  <div class="container py-4 rounded my-3" style="background-color: gray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis">Opiniones de {{ djOpiniones.nombre }}</h1>
      <div class="mx-4">
        <button type="button" class="btn btn-secondary my-2" @click="$emit('cerrarOpiniones')">Cerrar</button>
        <h2 v-if="opiniones.length === 0">No hay opiniones de {{ djOpiniones.nombre }}</h2>
        <table v-else class="table">
          <thead>
            <tr class="table-secondary">
              <th></th>
              <th>Usuario</th>
              <th>Opinión</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="opinion in opiniones" :key="opinion.id">
              <td>
                <button class="btn btn-danger btn-sm" style="margin-right: 10px;" @click="eliminarOpinion(opinion.id)">
                  <i class="bi bi-trash3"></i>
                </button>
              </td>
              <td>{{ opinion.usuario.nombre }}</td>
              <td>{{ opinion.opinion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>