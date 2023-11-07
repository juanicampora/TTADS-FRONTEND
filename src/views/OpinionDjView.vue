<script setup>
import { ref } from 'vue';
import axios from 'axios';

const OpinionDj = ref("");

const limpiarOpinion = () => OpinionDj.value = "";

const enviarOpinion = () => {
  if (OpinionDj.value != "") {
    axios({
      method: 'post',
      url: 'https://fiestaappapi.onrender.com/api/djs/opinion',
      data: {
        "opinion": OpinionDj.value
      }
    });
    limpiarOpinion();
  }
}
</script>

<template>
  <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Dejar un Opinion del actual DJ</h1>
      <div class="mx-4">
        <h5 class="mb-4">Ingrese su Opinion</h5>
        <textarea class="form-control" id="textareaOpinion" v-model="OpinionDj" rows="3"></textarea>
        <div class="mt-3 d-flex justify-content-evenly">
          <button type="button" class="btn btn-secondary" @click="limpiarOpinion">Limpiar</button>
          <button type="button" class="btn btn-success" @click="enviarOpinion">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>