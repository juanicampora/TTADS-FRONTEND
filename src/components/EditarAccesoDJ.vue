<script setup>
import axios from 'axios'
import { ref } from 'vue';

import { useEspera } from '@/stores/espera'
const espera = useEspera()

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

const props = defineProps(['djEditar']);
const emit = defineEmits(['getData', 'cerrarEditor'])

const emailAcceso = ref('');


const getMailDj = () => {
  espera.activar();
  try {
    axios({
      method: 'get',
      url: `https://fiestaappapi.onrender.com/api/usuarios/${props.djEditar.id}`
    }).then((response) => {
      if (response.data.data) {
        emailAcceso.value = response.data.data.mail;
      }
      espera.desactivar();
    });
  } catch (error) {
    alerta.activar(error.message, 'danger')
    espera.desactivar();
  }
}

const guardarIngresado = () => {
  axios({
    method: 'post',
    url: 'https://fiestaappapi.onrender.com/api/usuarios/register',
    data: {
      "mail": emailAcceso.value,
      "idDj": props.djEditar.id
    }
  }).then((response) => {
    alerta.activar('Mail de acceso guardado', 'success')
  }).catch((error) => {
    alerta.activar(error.message, 'danger')
  })
  emailAcceso.value = '';
  setTimeout(() => {
    emit('getData');
    emit('cerrarEditor');
  }, 1000);
}

getMailDj();
</script>

<template>
  <div class="container py-4 rounded my-3" style="background-color: gray;">
    <div>
      <h6 class="text-center display-6 fw-bold text-body-emphasis">Gmail de acceso para {{
        djEditar.nombre }}</h6>
      <div class="col-lg-6 mx-auto">
        <input class="form-control mt-3" type="email" placeholder="Ingrese un Gmail" v-model="emailAcceso">
        <div class="mt-3 d-flex justify-content-evenly">
          <button type="button" class="btn btn-secondary" @click="emit('cerrarEditor')">Cancelar</button>
          <button type="button" class="btn btn-success" @click='guardarIngresado'>Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>