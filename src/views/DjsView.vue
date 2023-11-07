<script setup>
import { ref } from 'vue';
import EditarDJ from '@/components/EditarDJ.vue';
import OpinionesDJ from '@/components/OpinionesDJ.vue';
import axios from 'axios';

const djs = ref([]);
const estadoEditor = ref(false);
const djEditar = ref(0);
const estadoOpiniones = ref(false);
const djOpiniones = ref(0);

const activarEditor = (djTabla) => {
  estadoEditor.value = false;
  setTimeout(() => {
    djEditar.value = djTabla;
    estadoEditor.value = true;
  }, 1);
};

const verOpiniones = (djTabla) => {
  estadoEditor.value = false;
  estadoOpiniones.value = false;
  setTimeout(() => {
    djOpiniones.value = djTabla;
    estadoOpiniones.value = true;
  }, 1);
};

const nuevoDJ = () => {
  estadoOpiniones.value = false;
  estadoEditor.value = false;
  setTimeout(() => {
    djEditar.value = null;
    estadoEditor.value = true;
  }, 1);
};

const hacerActual = (djTabla) => {
  axios({
    method: 'put',
    url: `https://fiestaappapi.onrender.com/api/djs/actual/${djTabla.id}`
  });
  setTimeout(() => {
    getData();
  }, 1000);
};


const getData = async () => {
  try {
    const { data } = await axios.get('https://fiestaappapi.onrender.com/api/djs');
    djs.value = data.data;
  } catch (error) {
    console.log(error)
  }
};

getData();
</script>

<template>
  <div>
    <EditarDJ v-if="estadoEditor" :djEditar="djEditar" @cerrarEditor="estadoEditor = false" @getData="getData" />
    <OpinionesDJ v-if="estadoOpiniones" :djOpiniones="djOpiniones" @cerrarOpiniones="estadoOpiniones = false" />
  </div>
  <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis">DJs</h1>
      <h6 class="text-center">(DJ actual en verde)</h6>
      <div class="mx-4">
        <div class="my-3">
          <button type="button" class="btn btn-success" @click="nuevoDJ" style="width: 300px; font-size: large;">Nuevo
            DJ</button>
        </div>
        <table class="table">
          <thead>
            <th>Nombre</th>
            <th>Instagram</th>
            <th>Celular</th>
            <th class="d-flex justify-content-end">Accion</th>
          </thead>
          <tbody>
            <tr v-for="dj in  djs " :key="dj.id" :class="{ 'table-success': dj.actual }">
              <td>{{ dj.nombre }}</td>
              <td>{{ dj.instagram }}</td>
              <td>{{ dj.tel }}</td>
              <td class=" d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-info" @click="hacerActual(dj)" :disabled="dj.actual">Hacer Actual</button>
                  <button class="btn btn-warning" @click="activarEditor(dj)">Editar</button>
                  <button class="btn btn-secondary" @click="verOpiniones(dj)">Ver Opiniones</button>
                </div>
              </td>
            </tr>

            <!-- Cuando tenga la API
            <tr djid="1" class="table-success">
              <td>Dj Tao</td>
              <td class="d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-info" @click="hacerActual(1)" disabled>Hacer Actual</button>
                  <button class="btn btn-warning" @click="activarEditor('Dj Tao')">Editar</button>
                  <button class="btn btn-primary">Ver Opiniones</button>
                </div>
              </td>
            </tr>

            <tr djid="2">
              <td>Dj Peligro</td>
              <td class="d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-info" @click="hacerActual(1)">Hacer Actual</button>
                  <button class="btn btn-warning" @click="activarEditor('Dj Peligro')">Editar</button>
                  <button class="btn btn-primary">Ver Opiniones</button>
                </div>
              </td>
            </tr>

            <tr djid="3">
              <td>Fer Palacio</td>
              <td class="d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-info" @click="hacerActual(1)">Hacer Actual</button>
                  <button class="btn btn-warning" @click="activarEditor('Fer Palacio')">Editar</button>
                  <button class="btn btn-primary">Ver Opiniones</button>
                </div>
              </td>
            </tr>
-->
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>