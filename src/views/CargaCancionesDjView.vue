<script setup>
import { ref } from 'vue';

const cancionesIngresadas = ref("");

const limpiarIngresadas = () => cancionesIngresadas.value = "";

</script>

<template>
  <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Carga Canciones</h1>
      <div class="mx-4">
        <h5 class="mb-4">Ingrese las canciones del DJ actual separadas con ';' y con el formato: ARTISTA-NOMBRE CANCION
        </h5>
        <form action="">
          <textarea class="form-control" id="textareacanciones" v-model="cancionesIngresadas" rows="3"></textarea>
          <div class="mt-3 d-flex justify-content-evenly">
            <button type="button" class="btn btn-secondary" @click="limpiarIngresadas">Limpiar</button>
            <button type="submit" class="btn btn-success">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>