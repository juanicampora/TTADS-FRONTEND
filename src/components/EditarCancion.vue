<script setup>
import axios from 'axios'
import { ref } from 'vue';

const props = defineProps(['idCancionDj', 'tipoEditar', 'cancionEditar']);
const emit = defineEmits(['getData', 'cerrarEditor'])

const nombreIngresado = ref('');
const autorIngresado = ref('');
const puntajeIngresado = ref('');
const urlElegida = ref('');

nombreIngresado.value = props.cancionEditar.nombre;
autorIngresado.value = props.cancionEditar.autor;
puntajeIngresado.value = props.cancionEditar.puntaje;

const guardarIngresado = () => {
  if (props.tipoEditar == 'cancion') {
    urlElegida.value = `https://fiestaappapi.onrender.com/api/canciones/${props.cancionEditar.id}`;
  } else if (props.tipoEditar == 'canciondj') {
    urlElegida.value = `https://fiestaappapi.onrender.com/api/canciondj/${props.idCancionDj}`;
  }
  axios({
    method: 'put',
    url: urlElegida.value,
    data: {
      "nombre": nombreIngresado.value,
      "autor": autorIngresado.value,
      "puntaje": puntajeIngresado.value
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
  <div class="container py-4 rounded my-3" style="background-color: gray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis">Editando {{ cancionEditar.nombre }}</h1>
      <div class="col-lg-6 mx-auto">
        <form>
          <input class="form-control mt-3" type="text" placeholder="Nombre cancion" v-model="nombreIngresado">
          <input class="form-control mt-3" type="text" placeholder="Autor cancion" v-model="autorIngresado">
          <div class="row">
            <div class="col">
              <input class="form-control mt-3" type="number" placeholder="Puntaje" disabled v-model="puntajeIngresado">
            </div>
            <div class="col">
              <button class="btn btn-primary mt-3" type="button" @click="puntajeIngresado = 0"><i
                  class="bi bi-arrow-counterclockwise"></i> Reiniciar</button>
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