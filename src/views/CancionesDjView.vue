<script setup>
import { ref } from 'vue';
import EditarCancion from '@/components/EditarCancion.vue';
import axios from 'axios';

import { useEspera } from '@/stores/espera'
const espera = useEspera()

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
const claseEspera = ref('');
const habilitado = ref(false);

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
    url: 'https://fiestaappapi.onrender.com/api/canciondj',
    data: {
      "nombre": nombreIngresado.value,
      "autor": autorIngresado.value
    }
  }).then((response) => {
    if (response.status === 201) {
      alerta.activar(response.data.message, 'success')
    } else {
      alerta.activar(response.data.message, 'warning')
    }
    nombreIngresado.value = '';
    autorIngresado.value = '';
    setTimeout(() => {
      getData();
    }, 1000);
  });
};

const eliminarCancion = (idCancion) => {
  axios({
    method: 'delete',
    url: `https://fiestaappapi.onrender.com/api/canciondj/${idCancion}`,
  }).then((response) => {
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
    espera.activar();
    const { data } = await axios.get(`https://fiestaappapi.onrender.com/api/usuarios/esdjactual/${usuario.uid}`)
    const esActual = data.esActual;
    const { data: data2 } = await axios.get(`https://fiestaappapi.onrender.com/api/djs/getFechaActual/${usuario.uid}`)
    const fechaActual = data2.fechaActual;
    const hoy = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()).toISOString().split('T')[0]
    if (fechaActual === hoy && esActual) { habilitado.value = true; }
    else { habilitado.value = false; }
    espera.desactivar();
  } catch (error) {
    console.log(error);
    espera.desactivar();
  }
  if (habilitado.value) {
    try {
      espera.activar();
      claseEspera.value = 'disable-clicks';
      const { data } = await axios.get(`https://fiestaappapi.onrender.com/api/canciondj/${usuario.uid}`);
      if (data.data.length === 0) {
        alerta.activar('No hay canciones cargadas', 'warning')
      }
      canciones.value = data.data;
      espera.desactivar();
      claseEspera.value = '';
    } catch (error) {
      console.log(error)
      espera.desactivar();
      claseEspera.value = '';
      alerta.activar('Error al obtener las canciones', 'danger')
    }
  }
};

getData();

</script>

<template>
  <div>
    <EditarCancion v-if="estadoEditor" :idCancionDj='idCancionDjEditar' tipoEditar='canciondj'
      :cancionEditar="cancionEditar" tipoUsuario="Dj" @cerrarEditor="estadoEditor = false" @getData="getData" />
  </div>
  <div :class="claseEspera">
    <div class="container py-4 rounded mt-3" style="background-color: gray;">
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Tus canciones de la noche actual</h1>
      <div class="table-responsive mx-4" v-if="habilitado">
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
              <td><input type="text" class="form-control" placeholder="Autor Cancion Nueva" v-model="autorIngresado">
              </td>
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
      <div class="mx-4" v-else>
        <h5 class="mb-4 text-center text-danger-emphasis">No hay canciones para visualizar porque no esta habilitado
          como DJ de esta noche</h5>
      </div>
    </div>
  </div>
</template>

<style>
.disable-clicks {
  pointer-events: none;
}
</style>