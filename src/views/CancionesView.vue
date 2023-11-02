<script setup>
import { ref } from 'vue';
import EditarCancion from '@/components/EditarCancion.vue';

const estadoEditor = ref(false);
const cancionEditar = ref(0);

const activarEditor = (cancionTabla) => {
  cancionEditar.value = cancionTabla;
  estadoEditor.value = true;
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
  <div>
    <EditarCancion v-if="estadoEditor" :cancionEditar="cancionEditar" @cerrarEditor="estadoEditor = false" />
  </div>
  <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis mb-3">Listado de todas las Canciones</h1>
      <div class="mx-4">
        <table class="table">
          <thead>
            <th>Nombre de la Cancion</th>
            <th>Autor</th>
            <th>Puntaje</th>
            <th class="d-flex justify-content-end">Accion</th>
          </thead>
          <tbody>
            <tr class="table-success">
              <td><input type="text" class="form-control" placeholder="Nombre Cancion Nueva"></td>
              <td><input type="text" class="form-control" placeholder="Autor Cancion Nueva"></td>
              <td></td>
              <td class="d-flex justify-content-end"><button type="submit" class=" btn btn-success"
                  style="width: 150px;">Guardar</button></td>
            </tr>
            <tr v-for="cancion in canciones" :key="cancion.idCancion">
              <td>{{ cancion.nombre }}</td>
              <td>{{ cancion.autor }}</td>
              <td>{{ cancion.puntaje }}</td>
              <td class="d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-warning" @click="activarEditor(cancion.idCancion)">Editar</button>
                  <button class="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>



      </div>
    </div>
  </div>
</template>