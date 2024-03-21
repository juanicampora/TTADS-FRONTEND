<script setup>
import axios from 'axios'
import { ref } from 'vue';

const props = defineProps(['djEditar']);
const emit = defineEmits(['getData', 'cerrarEditor'])

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

const instagramIngresado = ref('');
const nombreIngresado = ref('');
const numeroIngresado = ref('');
let url;
let metodo;
let esActual;
if (props.djEditar) {
  metodo = 'put';
  url = `https://fiestaappapi.onrender.com/api/djs/${props.djEditar.id}`;
  instagramIngresado.value = props.djEditar.instagram;
  nombreIngresado.value = props.djEditar.nombre;
  numeroIngresado.value = props.djEditar.tel;
  esActual = props.djEditar.actual;
}
else {
  metodo = 'post';
  url = 'https://fiestaappapi.onrender.com/api/djs';
  esActual = false;
};

const eliminarIngresado = () => {
  axios({
    method: 'delete',
    url: `https://fiestaappapi.onrender.com/api/djs/${props.djEditar.id}`,
  }).then(() => {
    alerta.mensaje = 'DJ eliminado';
    alerta.tipo = 'success'
    alerta.activar()
  }).catch((error) => {
    alerta.mensaje = error.message;
    alerta.tipo = 'danger'
    alerta.activar()
  });
  instagramIngresado.value = '';
  nombreIngresado.value = '';
  numeroIngresado.value = '';
  props.djEditar.value = null;
  setTimeout(() => {
    emit('getData');
    emit('cerrarEditor');
  }, 1000);
}

const guardarIngresado = () => {
  try {
    axios({
      method: metodo,
      url: url,
      data: {
        "nombre": nombreIngresado.value,
        "instagram": instagramIngresado.value,
        "tel": numeroIngresado.value,
        "actual": esActual
      }
    })
    instagramIngresado.value = '';
    nombreIngresado.value = '';
    numeroIngresado.value = '';
    alerta.mensaje = 'Datos del DJ guardados';
    alerta.tipo = 'success'
    alerta.activar()
    setTimeout(() => {
      emit('getData');
      emit('cerrarEditor');
    }, 1000);
  } catch (error) {
    alerta.mensaje = error.response.data.message;
    alerta.tipo = 'danger'
    alerta.activar()
  }

}

</script>

<template>
  <div class="container py-4 rounded my-3" style="background-color: gray;">
    <div>
      <h1 v-if="djEditar" class="text-center display-5 fw-bold text-body-emphasis">Editar {{ djEditar.nombre }}</h1>
      <h1 v-else class="text-center display-5 fw-bold text-body-emphasis">Nuevo DJ</h1>
      <div class="col-lg-6 mx-auto">
        <input class="form-control mt-3" type="text" placeholder="Nombre" v-model="nombreIngresado">
        <div class="input-group mt-3">
          <span class="input-group-text" id="basic-addon1">@</span>
          <input type="text" class="form-control" placeholder="Instagram" v-model="instagramIngresado">
        </div>
        <input class="form-control mt-3" type="number" placeholder="Celular" v-model="numeroIngresado">
        <div class="mt-3 d-flex justify-content-evenly">
          <button type="button" class="btn btn-secondary" @click="emit('cerrarEditor')">Cancelar</button>
          <button v-if="djEditar" type="button" class="btn btn-danger" @click='eliminarIngresado'>Eliminar</button>
          <button type="button" class="btn btn-success" @click='guardarIngresado'>Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>