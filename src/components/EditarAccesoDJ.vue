<script setup>
import axios from 'axios'
import { ref } from 'vue';

import Carga from '@/components/Carga.vue';
const esperandoAPI = ref(false);

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

const props = defineProps(['djEditar']);
const emit = defineEmits(['getData', 'cerrarEditor'])

const emailAcceso = ref('');


const getMailDj = () => {
  esperandoAPI.value = true;
  try {
    axios({
      method: 'get',
      url: `https://fiestaappapi.onrender.com/api/usuarios/${props.djEditar.id}`
    }).then((response) => {
      if (response.data.data) {
        emailAcceso.value = response.data.data.mail;
      }
      esperandoAPI.value = false;
    });
  } catch (error) {
    alerta.mensaje = error.message;
    alerta.tipo = 'danger'
    alerta.activar()
    esperandoAPI.value = false;
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
    alerta.mensaje = 'Mail de acceso guardado';
    alerta.tipo = 'success'
    alerta.activar()
  }).catch((error) => {
    alerta.mensaje = error.message;
    alerta.tipo = 'danger'
    alerta.activar()
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
  <Carga v-if="esperandoAPI" />
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