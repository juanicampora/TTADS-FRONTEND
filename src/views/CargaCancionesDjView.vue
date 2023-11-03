<script setup>
import { ref } from 'vue';

const cancionesIngresadas = ref("");

const limpiarIngresadas = () => cancionesIngresadas.value = "";

const guardarCanciones = () => {
  const canciones = cancionesIngresadas.value.split(';');
  canciones.forEach(cancion => {
    const cancionSplit = cancion.split('-');
    axios({
      method: 'post',
      url: 'https://fiestaappapi.onrender.com/api/cancionesdj',
      data: {
        "nombre": cancionSplit[1],
        "autor": cancionSplit[0]
      }
    });
  });
  setTimeout(() => {
    getData();
  }, 1000);
}

</script>

<template>
  <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Carga Canciones</h1>
      <div class="mx-4">
        <h5 class="mb-4">Ingrese las canciones del DJ actual separadas con ';' y con el formato: ARTISTA-NOMBRE CANCION
        </h5>
        <textarea class="form-control" id="textareacanciones" v-model="cancionesIngresadas" rows="3"></textarea>
        <div class="mt-3 d-flex justify-content-evenly">
          <button type="button" class="btn btn-secondary" @click="limpiarIngresadas">Limpiar</button>
          <button type="button" class="btn btn-success" @click="guardarCanciones">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>