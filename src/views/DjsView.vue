<script setup>
import { ref } from 'vue';
import EditarDJ from '@/components/EditarDJ.vue';
import OpinionesDJ from '@/components/OpinionesDJ.vue';
import axios from 'axios';
import moment from 'moment';
import Carga from '@/components/Carga.vue';

const djs = ref([]);
const estadoEditor = ref(false);
const djEditar = ref(0);
const estadoOpiniones = ref(false);
const djOpiniones = ref(0);
const esperandoAPI = ref(false);
const claseEspera = ref('');


const activarEditor = (djTabla) => {
  estadoEditor.value = false;
  setTimeout(() => {
    djEditar.value = djTabla;
    estadoEditor.value = true;
  }, 10);
};

const verOpiniones = (djTabla) => {
  estadoEditor.value = false;
  estadoOpiniones.value = false;
  setTimeout(() => {
    djOpiniones.value = djTabla;
    estadoOpiniones.value = true;
  }, 10);
};

const nuevoDJ = () => {
  estadoOpiniones.value = false;
  estadoEditor.value = false;
  setTimeout(() => {
    djEditar.value = null;
    estadoEditor.value = true;
  }, 10);
};

const hacerActual = (djTabla) => {
  axios({
    method: 'put',
    url: `https://fiestaappapi.onrender.com/api/djs/actual/${djTabla.id}`
  });
  setTimeout(() => {
    getData();
  }, 1500);
};


const getData = async () => {
  try {
    esperandoAPI.value = true;
    claseEspera.value = 'disable-clicks disabled';
    const { data } = await axios.get('https://fiestaappapi.onrender.com/api/djs');
    esperandoAPI.value = false;
    claseEspera.value = '';
    djs.value = data.data;
  } catch (error) {
    console.log(error)
  }
};

getData();
</script>

<template>
  <Carga v-if="esperandoAPI" />
  <div :class="claseEspera">
    <!-- <loading v-model:active="esperandoAPI" color="#42b883" :is-full-page="fullPage" /> -->

    <div>
      <EditarDJ v-if="estadoEditor" :djEditar="djEditar" @cerrarEditor="estadoEditor = false" @getData="getData" />
      <OpinionesDJ v-if="estadoOpiniones" :djOpiniones="djOpiniones" @cerrarOpiniones="estadoOpiniones = false" />
    </div>
    <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
      <div>
        <h1 class="text-center display-5 fw-bold text-body-emphasis">DJs</h1>
        <h6 class="text-center">(DJ ACTUAL en verde)</h6>
        <div class="mx-4">
          <div class="my-3">
            <button type="button" class="btn btn-success" @click="nuevoDJ" style="width: 300px; font-size: large;">Nuevo
              DJ</button>
          </div>
        </div>
        <div class="table-responsive mx-4">
          <table class="table">
            <thead>
              <th>Nombre</th>
              <th>Instagram</th>
              <th>Celular</th>
              <th>Ultima fecha que tocó</th>
              <th class="d-flex justify-content-end">Accion</th>
            </thead>
            <tbody>
              <tr v-for="dj in  djs " :key="dj.id" :class="{ 'table-success': dj.actual }">
                <td>{{ dj.nombre }}</td>
                <td>{{ dj.instagram }}</td>
                <td>{{ dj.tel }}</td>
                <td>{{ dj.fechaActual }}</td>
                <td class=" d-flex justify-content-end">
                  <div class="btn-group">
                    <button class="btn btn-info" @click="hacerActual(dj)" :disabled="dj.actual">Actual</button>
                    <button class="btn btn-warning" @click="activarEditor(dj)">Editar</button>
                    <button class="btn btn-secondary" @click="verOpiniones(dj)">Opiniones</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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