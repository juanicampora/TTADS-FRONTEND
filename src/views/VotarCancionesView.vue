<script setup>
import { ref } from 'vue';
import axios from 'axios';

import { useUsuario } from '@/stores/usuario'
const usuario = useUsuario()

import { useEspera } from '@/stores/espera'
const espera = useEspera()

const canciones = ref([]);

const idSeleccionados = ref([]);
const seleccionCanciones = ref({});
const claseEspera = ref('');
const ventanaConfirmacion = ref(false);
const inhabilitado = ref(false);

const limpiarSeleccion = () => {
  seleccionCanciones.value = {};
  idSeleccionados.value = [];
};

const seleccionCancion = (idCancion) => {
  if (seleccionCanciones.value[idCancion]) {
    seleccionCanciones.value[idCancion] = false;
  } else {
    seleccionCanciones.value[idCancion] = true;
  }
  if (idSeleccionados.value.includes(idCancion)) {
    idSeleccionados.value = idSeleccionados.value.filter((id) => id != idCancion);
  } else {
    idSeleccionados.value.push(idCancion);
  }
};

const votarCanciones = () => {
  idSeleccionados.value.forEach(id => {
    axios({
      method: 'put',
      url: `https://fiestaappapi.onrender.com/api/canciondj/votacion/${id}`
    });
  });
  axios({
    method: 'put',
    url: `https://fiestaappapi.onrender.com/api/usuarios/voto/${usuario.uid}`
  });
  setTimeout(() => {
    limpiarSeleccion();
    inhabilitado.value = true;
    getCancionesDj();
  }, 1000);
};

const getCancionesDj = async () => {
  try {
    espera.activar();
    claseEspera.value = 'disable-clicks';
    const habilitacion = await axios.get(`http://localhost:3000/api/usuarios/voto/${usuario.uid}`);
    console.log(habilitacion);
    if (habilitacion.data.habilitado === false) {
      espera.desactivar();
      inhabilitado.value = true;
      claseEspera.value = '';
      ventanaConfirmacion.value = false;
      return;
    }
    const { data } = await axios.get('https://fiestaappapi.onrender.com/api/canciondj/votacion');
    canciones.value = data.data;
    data.data.forEach(cancion => {
      seleccionCanciones.value[cancion.id] = false;
    });
    espera.desactivar();
    claseEspera.value = '';
    ventanaConfirmacion.value = false;
  } catch (error) {
    console.log(error)
  }
};

getCancionesDj();

</script>

<template>

  <div v-if="ventanaConfirmacion">
    <div class="container py-4 rounded mt-3" style="background-color: gray;">
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Confirmación</h1>
      <div class="mx-4">
        <h5 class="text-center">¿Confirma su votación? No podrá volver a votar esta noche</h5>
      </div>
      <div class="mt-3 d-flex justify-content-evenly">
        <button class="btn btn-secondary" style="width: 200px; font-size: large;"
          @click="ventanaConfirmacion = false">Cancelar</button>
        <button class="btn btn-success" style="width: 200px; font-size: large;"
          @click="votarCanciones">Confirmar</button>
      </div>
    </div>
  </div>
  <div v-else>
    <div :class="claseEspera">
      <div class="container py-4 rounded mt-3" style="background-color: gray;">
        <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Votar Canciones</h1>
        <div class="mx-4">
          <div v-if="inhabilitado">
            <h5 class="text-center" style="color: rgb(120 0 0);">Ya votó esta noche</h5>
          </div>
          <div v-else>
            <h5 class="text-center" :class="{ 'bg-white text-danger': idSeleccionados.length > 10 }">Seleccione hasta
              10
              canciones</h5>
            <h6 class="text-center">Seleccionados: {{ idSeleccionados.length }}</h6>
            <div class="mt-3 d-flex justify-content-evenly">
              <button class="btn btn-secondary" style="width: 200px; font-size: x-large;"
                @click="limpiarSeleccion">Limpiar</button>
              <button :disabled="idSeleccionados.length > 10 || idSeleccionados.length === 0" class="btn btn-success"
                style="width: 200px; font-size: x-large;" @click="ventanaConfirmacion = true">Votar</button>
            </div>
            <table class="table">
              <thead>
                <th>Nombre de la Cancion</th>
                <th>Autor</th>
                <th>Puntaje</th>
                <th>Me gusta</th>
              </thead>
              <tbody>
                <tr v-for="cancion in canciones" :key="cancion.id">
                  <td>{{ cancion.cancion.nombre }}</td>
                  <td>{{ cancion.cancion.autor }}</td>
                  <td>{{ cancion.puntaje }}</td>
                  <td>
                    <div class="pretty p-icon p-smooth p-round p-bigger ">
                      <input type="checkbox" :checked="seleccionCanciones[cancion.id]"
                        @click="seleccionCancion(cancion.id)" />
                      <div class="state p-warning">
                        <i class="icon material-icons">star</i>
                        <label></label>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.disable-clicks {
  pointer-events: none;
}
</style>