<script setup>
import { ref } from 'vue';
import EditarCancion from '@/components/EditarCancion.vue';
import axios from 'axios';

const canciones = ref([]);
const estadoEditor = ref(false);
const cancionEditar = ref(0);
const nombreIngresado = ref('');
const autorIngresado = ref('');

const activarEditor = (cancionTabla) => {
  cancionEditar.value = cancionTabla;
  estadoEditor.value = true;
};

const guardarCancion = () => {
  axios({
    method: 'post',
    url: 'https://fiestaappapi.onrender.com/api/canciones',
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
    url: `https://fiestaappapi.onrender.com/api/canciones/${idCancion}`,
  });
  setTimeout(() => {
    getData();
  }, 1000);
};

const getData = async () => {
  try {
    const { data } = await axios.get('https://fiestaappapi.onrender.com/api/canciones');
    canciones.value = data.data;
  } catch (error) {
    console.log(error)
  }
};

getData();

</script>

<template>
  <div>
    <EditarCancion v-if="estadoEditor" :cancionEditar="cancionEditar" @cerrarEditor="estadoEditor = false"
      @getData="getData" />
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
              <td><input type="text" class="form-control" placeholder="Nombre Cancion Nueva" v-model="nombreIngresado">
              </td>
              <td><input type="text" class="form-control" placeholder="Autor Cancion Nueva" v-model="autorIngresado"></td>
              <td></td>
              <td class="d-flex justify-content-end"><button class=" btn btn-success" style="width: 150px;"
                  @click="guardarCancion">Guardar</button></td>
            </tr>
            <tr v-for="cancion in canciones" :key="cancion.idCancion">
              <td>{{ cancion.nombre }}</td>
              <td>{{ cancion.autor }}</td>
              <td>{{ cancion.puntaje }}</td>
              <td class="d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-warning" @click="activarEditor(cancion)">Editar</button>
                  <button class="btn btn-danger" @click="eliminarCancion(cancion.id)">Eliminar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>



      </div>
    </div>
  </div>
</template>