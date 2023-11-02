<script setup>
import { ref } from 'vue';

const seleccionados = ref([]);

const limpiarSeleccion = () => seleccionados.value = [];

const seleccionCancion = (idCancion) => {
  if (seleccionados.value.includes(idCancion)) {
    seleccionados.value = seleccionados.value.filter((id) => id != idCancion);
  } else {
    seleccionados.value.push(idCancion);
  }
};

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
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Votar Canciones</h1>
      <div class="mx-4">
        <h6>Seleccione hasta 10 canciones que le gusten de la lista y presione "Votar"</h6>
        <h6>Seleccionados: {{ seleccionados }}</h6>
        <form action="">
          <div class="mt-3 d-flex justify-content-center">
            <button type="submit" class="btn btn-success" style="width: 200px; font-size: x-large;">Votar</button>
          </div>
          <table class="table">
            <thead>
              <th>Nombre de la Cancion</th>
              <th>Autor</th>
              <th>Puntaje</th>
              <th>Me gusta</th>
            </thead>
            <tbody>
              <tr v-for="cancion in canciones" :key="cancion.idCancion">
                <td>{{ cancion.nombre }}</td>
                <td>{{ cancion.autor }}</td>
                <td>{{ cancion.puntaje }}</td>
                <td>
                  <div class="pretty p-icon p-smooth p-round p-bigger ">
                    <input type="checkbox" @click="seleccionCancion(cancion.idCancion)" />
                    <div class="state p-warning">
                      <i class="icon material-icons">star</i>
                      <label></label>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>