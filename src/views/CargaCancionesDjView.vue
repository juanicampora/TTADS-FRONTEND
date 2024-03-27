<script setup>
import { ref } from 'vue';
import axios from 'axios';

import { useEspera } from '@/stores/espera'
const espera = useEspera()

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

import { useUsuario } from '@/stores/usuario'
const usuario = useUsuario()

const cancionesIngresadas = ref("");
const habilitado = ref(false);

const verificarDjActual = async () => {
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
}

const limpiarIngresadas = () => cancionesIngresadas.value = "";

const guardarCanciones = async () => {
  espera.activar();
  const canciones = cancionesIngresadas.value.split(';');
  for (const cancion of canciones) {
    if (cancion.includes('-')) {
      const cancionSplit = cancion.split('-');
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/canciondj',
        data: {
          "nombre": cancionSplit[1],
          "autor": cancionSplit[0]
        }
      }).catch((error) => {
        console.log(error);
        alerta.activar(error.message, 'danger')
        setTimeout(() => {
          limpiarIngresadas();
          espera.desactivar();
        }, 1000);
        return;
      });
    }
  }
  setTimeout(() => {
    alerta.activar('Canciones guardadas con éxito', 'success')
    limpiarIngresadas();
    setTimeout(() => {
      limpiarIngresadas();
      espera.desactivar();
    }, 1000);
  }, 3000);
}

verificarDjActual();
</script>

<template>
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