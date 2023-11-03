<script setup>
import axios from 'axios'
import { ref, watch } from 'vue';

const props = defineProps(['djEditar']);
const emit = defineEmits(['getData', 'cerrarEditor'])

const instagramIngresado = ref('');
const nombreIngresado = ref('');
const numeroIngresado = ref('');
let url;
let metodo;
if (props.djEditar) {
  metodo = 'put';
  url = `https://fiestaappapi.onrender.com/api/djs/${props.djEditar.id}`;
  instagramIngresado.value = props.djEditar.instagram;
  nombreIngresado.value = props.djEditar.nombre;
  numeroIngresado.value = props.djEditar.tel;
}
else {
  metodo = 'post';
  url = 'https://fiestaappapi.onrender.com/api/djs';
};

const eliminarIngresado = () => {
  axios({
    method: 'delete',
    url: `https://fiestaappapi.onrender.com/api/djs/${props.djEditar.id}`,
  });
  instagramIngresado.value = '';
  nombreIngresado.value = '';
  numeroIngresado.value = '';
  props.djEditar.value = null;
  setTimeout(() => {
    emit('getData');
    emit('cerrarEditor');
  }, 500);
}

const guardarIngresado = () => {
  axios({
    method: metodo,
    url: url,
    data: {
      "nombre": nombreIngresado.value,
      "instagram": instagramIngresado.value,
      "tel": numeroIngresado.value,
      "actual": false
    }
  });
  instagramIngresado.value = '';
  nombreIngresado.value = '';
  numeroIngresado.value = '';
  setTimeout(() => {
    emit('getData');
    emit('cerrarEditor');
  }, 1000);
}

</script>

<template>
  <div class="container py-4 rounded my-3" style="background-color: darkgray;">
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
          <button type="button" class="btn btn-danger" @click='eliminarIngresado'>Eliminar</button>
          <button type="button" class="btn btn-success" @click='guardarIngresado'>Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>