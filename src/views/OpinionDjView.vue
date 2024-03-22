<script setup>
import { ref } from 'vue';
import axios from 'axios';

import Carga from '@/components/Carga.vue';
const esperandoAPI = ref(false);

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

const OpinionDj = ref("");

const limpiarOpinion = () => OpinionDj.value = "";

const enviarOpinion = async () => {
  esperandoAPI.value = true;
  if (OpinionDj.value != "") {
    try {
      await axios.post('https://fiestaappapi.onrender.com/api/djs/opinion', { "opinion": OpinionDj.value });
      alerta.activar('Opinión enviada correctamente', 'success')
      limpiarOpinion();
    } catch (error) {
      console.log(error);
      alerta.activar(error.message, 'danger')
    }
  }
  esperandoAPI.value = false;
}
</script>

<template>
  <Carga v-if="esperandoAPI" />
  <div class="container py-4 rounded mt-3" style="background-color: gray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Opinar del actual DJ</h1>
      <div class="mx-4">
        <textarea class="form-control" id="textareaOpinion" placeholder="Ingrese su opinión" v-model="OpinionDj"
          rows="3"></textarea>
        <div class="mt-3 d-flex justify-content-evenly">
          <button type="button" class="btn btn-secondary" @click="limpiarOpinion">Limpiar</button>
          <button type="button" class="btn btn-success" @click="enviarOpinion">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>