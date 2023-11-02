<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref();
let canciones = [
  {
    idCancion: 3,
    nombre: "Canción 3",
    autor: "Autor 3",
    puntaje: 5
  },
  {
    idCancion: 1,
    nombre: "Canción 1",
    autor: "Autor 1",
    puntaje: 4
  },
  {
    idCancion: 5,
    nombre: "Canción 5",
    autor: "Autor 5",
    puntaje: 4
  },
  {
    idCancion: 2,
    nombre: "Canción 2",
    autor: "Autor 2",
    puntaje: 3
  },
  {
    idCancion: 4,
    nombre: "Canción 4",
    autor: "Autor 4",
    puntaje: 2
  }
];

</script>

<template>
  <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Top Canciones</h1>
      <div class="mx-4">
        <h5 class="mb-4">Seleccione una fecha para mostrar su top canciones</h5>
        <VueDatePicker v-model="date" model-type="dd.MM.yyyy" />

        <table class="table">
          <thead>
            <th>Nombre de la Cancion</th>
            <th>Autor</th>
            <th>Puntaje</th>
          </thead>
          <tbody>
            <tr v-for="cancion in canciones" :key="cancion.idCancion">
              <td>{{ cancion.nombre }}</td>
              <td>{{ cancion.autor }}</td>
              <td>{{ cancion.puntaje }}</td>
            </tr>
          </tbody>
        </table>



      </div>
    </div>
  </div>
</template>