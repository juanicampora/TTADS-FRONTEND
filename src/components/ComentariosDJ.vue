<script setup>
import axios from 'axios'
import { ref } from 'vue';

defineProps(['djComentarios']);
const emit = defineEmits(['cerrarComentarios'])

const comentarios = ref([]);

const getComentarios = () => {
  axios({
    method: 'get',
    url: `https://fiestaappapi.onrender.com/api/comentarios/${djComentarios.id}`,
  }).then((response) => {
    comentarios.value = response.data.data;
  });
};


</script>

<template>
  <div class="container py-4 rounded my-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis">Comentarios de {{ djComentarios.nombre }}</h1>
      <div class="mx-4">
        <button type="button" class="btn btn-secondary my-2" @click="$emit('cerrarComentarios')">Cerrar</button>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Comentario</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="comentario in comentarios" :key="comentario.id">
              <td>{{ comentario.comentario }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>