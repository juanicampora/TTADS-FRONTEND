<script setup>
import { ref } from 'vue';
import EditarDJ from '@/components/EditarDJ.vue';

const estadoEditor = ref(false);
const djEditar = ref(0);

const activarEditor = (djTabla) => {
  djEditar.value = djTabla;
  estadoEditor.value = true;
};


const nuevoDJ = () => {
  estadoEditor.value = true;
};
</script>

<template>
  <div>
    <EditarDJ v-if="estadoEditor" :djEditar="djEditar" @cerrarEditor="estadoEditor = false" />
  </div>
  <div>

  </div>
  <div class="container py-4 rounded mt-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis">DJs</h1>
      <h6 class="text-center">(DJ actual en verde)</h6>
      <div class="col-lg-6 mx-auto">
        <div class="d-flex justify-content-end my-3">
          <button type="button" class="btn btn-success" @click="nuevoDJ">Nuevo DJ</button>
        </div>
        <table class="table">
          <thead>
            <th>Nombre</th>
            <th class="d-flex justify-content-end">Accion</th>
          </thead>
          <tbody>
            <!-- Cuando tenga la API
            <tr v-for="dj in  djs " :key="dj.idDJ" :class="{ 'table-success': dj.actual }">
              <td>{{ dj.nombre }}</td>
              <td class=" d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-info" @click="hacerActual(dj.idDJ) :disabled="dj.actual"">Hacer Actual</button>
                  <button class="btn btn-info" @click="activarEditor(dj.idDJ)">Editar</button>
                  <button class="btn btn-secondary" @click="verComentarios(dj.idDJ)">Ver Comentarios</button>
                </div>
              </td>
            </tr>
            -->
            <tr djid="1" class="table-success">
              <td>Dj Tao</td>
              <td class="d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-info" @click="hacerActual(1)" disabled>Hacer Actual</button>
                  <button class="btn btn-warning" @click="activarEditor(1)">Editar</button>
                  <button class="btn btn-primary">Ver Comentarios</button>
                </div>
              </td>
            </tr>

            <tr djid="2">
              <td>Dj Peligro</td>
              <td class="d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-info" @click="hacerActual(1)">Hacer Actual</button>
                  <button class="btn btn-warning" @click="activarEditor(2)">Editar</button>
                  <button class="btn btn-primary">Ver Comentarios</button>
                </div>
              </td>
            </tr>

            <tr djid="3">
              <td>Fer Palacio</td>
              <td class="d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-info" @click="hacerActual(1)">Hacer Actual</button>
                  <button class="btn btn-warning" @click="activarEditor(3)">Editar</button>
                  <button class="btn btn-primary">Ver Comentarios</button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>