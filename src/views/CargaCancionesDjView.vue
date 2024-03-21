<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Carga from '@/components/Carga.vue';

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

import { useUsuario } from '@/stores/usuario'
const usuario = useUsuario()

const cancionesIngresadas = ref("");
const esperandoAPI = ref(false);
const habilitado = ref(false);

const verificarDjActual = async () => {
  try {
    esperandoAPI.value = true;
    const { data } = await axios.get(`http://localhost:3000/api/usuarios/esdjactual/${usuario.uid}`)
    const esActual = data.esActual;
    const { data: data2 } = await axios.get(`http://localhost:3000/api/djs/getFechaActual/${usuario.uid}`)
    const fechaActual = data2.fechaActual;
    const hoy = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()).toISOString().split('T')[0]
    if (fechaActual === hoy && esActual) { habilitado.value = true; }
    else { habilitado.value = false; }
    esperandoAPI.value = false;
  } catch (error) {
    console.log(error);
    esperandoAPI.value = false;
  }
}

const limpiarIngresadas = () => cancionesIngresadas.value = "";

const guardarCanciones = async () => {
  esperandoAPI.value = true;
  const canciones = cancionesIngresadas.value.split(';');
  for (const cancion of canciones) {
    const cancionSplit = cancion.split('-');
    try {
      await axios.post('http://localhost:3000/api/canciondj', {
        "nombre": cancionSplit[1],
        "autor": cancionSplit[0]
      });
    } catch (error) {
      console.log(error);
      alerta.mensaje = error.message;
      alerta.tipo = 'danger'
      alerta.activar()
      setTimeout(() => {
        limpiarIngresadas();
        esperandoAPI.value = false;
      }, 1000);
      return;
    }
  }
  setTimeout(() => {
    alerta.mensaje = "Canciones guardadas con éxito";
    alerta.tipo = 'success'
    alerta.activar()
    limpiarIngresadas();
    setTimeout(() => {
      limpiarIngresadas();
      esperandoAPI.value = false;
    }, 1000);
  }, 3000);
}

verificarDjActual();
</script>

<template>
  <Carga v-if="esperandoAPI" />
  <div class="container py-4 rounded mt-3" style="background-color: gray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Carga Canciones</h1>
      <div class="mx-4" v-if="habilitado">
        <h5 class="mb-4">Ingrese las canciones del DJ actual separadas con ';' y con el formato: ARTISTA-NOMBRE CANCION
        </h5>
        <textarea class="form-control" id="textareacanciones" v-model="cancionesIngresadas" rows="3"></textarea>
        <div class="mt-3 d-flex justify-content-evenly">
          <button type="button" class="btn btn-secondary" @click="limpiarIngresadas">Limpiar</button>
          <button type="button" class="btn btn-success" @click="guardarCanciones">Guardar</button>
        </div>
      </div>
      <div class="mx-4" v-else>
        <h5 class="mb-4 text-center text-danger-emphasis">No puede cargar canciones porque no esta habilitado como DJ de
          esta noche</h5>
      </div>
    </div>
  </div>
</template>