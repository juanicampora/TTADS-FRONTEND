<script setup>
import axios from 'axios'
import { ref } from 'vue';

const props = defineProps(['cancionEditar']);
const emit = defineEmits(['getData', 'cerrarEditor'])

const nombreIngresado = ref('');
const autorIngresado = ref('');
const puntajeIngresado = ref('');

nombreIngresado.value = props.cancionEditar.nombre;
autorIngresado.value = props.cancionEditar.autor;
puntajeIngresado.value = props.cancionEditar.puntaje;

const guardarIngresado = () => {
  axios({
    method: 'put',
    url: `https://fiestaappapi.onrender.com/api/canciones/${props.cancionEditar.id}`,
    data: {
      "nombre": nombreIngresado.value,
      "autor": autorIngresado.value,
      //"puntaje": puntajeIngresado.value
    }
  });
  nombreIngresado.value = '';
  autorIngresado.value = '';
  puntajeIngresado.value = '';
  setTimeout(() => {
    emit('getData');
    emit('cerrarEditor');
  }, 1000);
}
</script>

<template>
  <div class="container py-4 rounded my-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis">Editar {{ cancionEditar.nombre }}</h1>
      <div class="col-lg-6 mx-auto">
        <form>
          <input class="form-control mt-3" type="text" placeholder="Nombre cancion" v-model="nombreIngresado">
          <input class="form-control mt-3" type="text" placeholder="Autor cancion" v-model="autorIngresado">
          <div class="row">
            <div class="col">
              <input class="form-control mt-3" type="number" placeholder="Puntaje" disabled v-model="puntajeIngresado">
            </div>
            <div class="col">
              <button class="btn btn-primary mt-3" type="button" @click="puntajeIngresado = 0">Reiniciar
                Puntaje</button>
            </div>
          </div>
          <div class="mt-3 d-flex justify-content-evenly">
            <button type="button" class="btn btn-secondary" @click="$emit('cerrarEditor')">Cancelar</button>
            <button type="button" class="btn btn-success" @click="guardarIngresado">Guardar</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>