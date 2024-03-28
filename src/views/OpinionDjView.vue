<script setup>
import { ref } from 'vue';
import axios from 'axios';

import { useEspera } from '@/stores/espera'
const espera = useEspera()

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

import { useUsuario } from '@/stores/usuario'
const usuario = useUsuario()

const OpinionDj = ref("");
const djActual = ref(null);
const errorObtenido = ref(false);

const limpiarOpinion = () => OpinionDj.value = "";

const enviarOpinion = async () => {
  espera.activar();
  if (OpinionDj.value != "") {
    try {
      await axios.post('https://fiestaappapi.onrender.com/api/djs/opinion', { "opinion": OpinionDj.value, "uid": usuario.uid });
      alerta.activar('Opinión enviada correctamente', 'success')
      limpiarOpinion();
    } catch (error) {
      console.log(error);
      alerta.activar(error.message, 'danger')
    }
  }
  espera.desactivar();
}

const getData = async () => {
  espera.activar();
  try {
    const { data } = await axios.get('https://fiestaappapi.onrender.com/api/djs/actual')
    djActual.value = data.data
    espera.desactivar();
  } catch (error) {
    errorObtenido.value = true;
    espera.desactivar();
    if (error.response.data.message) {
      alerta.mensaje = error.response.data.message;
    } else { alerta.mensaje = error.message; }
    alerta.tipo = 'danger'
    alerta.activar()
  }
}
getData();
</script>

<template>
  <div class="container py-4 rounded mt-3" style="background-color: gray;">
    <div>
      <h1 v-if="errorObtenido" class="text-center display-5 fw-bold text-body-emphasis mb-3">Opinar del actual DJ</h1>
      <h1 v-else class="text-center display-5 fw-bold text-body-emphasis mb-3">Opinar del actual DJ ({{
        djActual.nombre }}) </h1>
      <div class="mx-4">
        <div v-if="errorObtenido">
          <h3 class="text-warning-emphasis" style="text-align: center;">No hay un dj Actual asignado</h3>
        </div>
        <div v-else>
          <textarea class="form-control" id="textareaOpinion" placeholder="Ingrese su opinión" v-model="OpinionDj"
            rows="3"></textarea>
          <div class="mt-3 d-flex justify-content-evenly">
            <button type="button" class="btn btn-secondary" @click="limpiarOpinion">Limpiar</button>
            <button type="button" class="btn btn-success" @click="enviarOpinion">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>