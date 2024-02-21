<script setup>
import { ref } from 'vue';
import EditarCancion from '@/components/EditarCancion.vue';
import axios from 'axios';
import Carga from '@/components/Carga.vue';

import { useUsuario } from '@/stores/usuario'
const usuario = useUsuario()

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

const canciones = ref([]);
const estadoEditor = ref(false);
const cancionEditar = ref(0);
const idCancionDjEditar = ref('');
const nombreIngresado = ref('');
const autorIngresado = ref('');
const esperandoAPI = ref(false);
const claseEspera = ref('');

const activarEditor = (id, cancionTabla) => {
  estadoEditor.value = false;
  cancionEditar.value = cancionTabla;
  idCancionDjEditar.value = id;
  setTimeout(() => {
    estadoEditor.value = true;
  }, 10);

};

const guardarCancion = () => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/api/canciondj',
    data: {
      "nombre": nombreIngresado.value,
      "autor": autorIngresado.value
    }
  });
  nombreIngresado.value = '';
  autorIngresado.value = '';
  setTimeout(() => {
    getData();
  }, 1000);
};

const eliminarCancion = (idCancion) => {
  axios({
    method: 'delete',
    url: `http://localhost:3000/api/canciondj/${idCancion}`,
  }).then((response) => {
    console.log(response);
    alerta.mensaje = response.data.message;
    if (response.status == 200) {
      alerta.tipo = 'success'
    } else {
      alerta.tipo = 'warning'
    }
    alerta.activar()
  }).catch((error) => {
    console.log(error);
  });
  setTimeout(() => {
    getData();
  }, 1000);

};

const getData = async () => {
  try {
    esperandoAPI.value = true;
    claseEspera.value = 'disable-clicks';
    const { data } = await axios.get(`http://localhost:3000/api/canciondj/${usuario.uid}`);
    if (data.data.length === 0) {
      alerta.mensaje = "No hay canciones cargadas";
      alerta.tipo = 'warning'
      alerta.activar()
    }
    canciones.value = data.data;
    esperandoAPI.value = false;
    claseEspera.value = '';
  } catch (error) {
    console.log(error)
    esperandoAPI.value = false;
    claseEspera.value = '';
    alerta.mensaje = "Error al obtener las canciones";
    alerta.tipo = 'danger'
    alerta.activar()
  }
};

getData();

</script>

<template>
  <Carga v-if="esperandoAPI" />
  <div>
    <EditarCancion v-if="estadoEditor" :idCancionDj='idCancionDjEditar' tipoEditar='canciondj'
      :cancionEditar="cancionEditar" @cerrarEditor="estadoEditor = false" @getData="getData" />
  </div>
  <div :class="claseEspera">
    <div class="container py-4 rounded mt-3" style="background-color: gray;">
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Tus canciones de la noche actual</h1>
      <div class="table-responsive mx-4">
        <table class="table">
          <thead>
            <th>Nombre de la Cancion</th>
            <th>Autor</th>
            <th>Puntaje</th>
            <th class="d-flex justify-content-end">Accion</th>
          </thead>
          <tbody>
            <tr class="table-success">
              <td><input type="text" class="form-control" placeholder="Nombre Cancion Nueva" v-model="nombreIngresado">
              </td>
              <td><input type="text" class="form-control" placeholder="Autor Cancion Nueva" v-model="autorIngresado"></td>
              <td></td>
              <td class="d-flex justify-content-end"><button class=" btn btn-success" style="width:82px;"
                  @click="guardarCancion"><i class="bi bi-plus-lg"></i></button></td>
            </tr>
            <tr v-for="canciondj in canciones" :key="canciondj.id">
              <td>{{ canciondj.cancion.nombre }}</td>
              <td>{{ canciondj.cancion.autor }}</td>
              <td>{{ canciondj.puntaje }}</td>
              <td class="d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-warning" @click="activarEditor(canciondj.id, canciondj.cancion)"><i
                      class="bi bi-pencil-square"></i></button>
                  <button class="btn btn-danger" @click="eliminarCancion(canciondj.id)"><i
                      class="bi bi-trash3"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.disable-clicks {
  pointer-events: none;
}
</style>