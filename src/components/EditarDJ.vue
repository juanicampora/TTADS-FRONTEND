<script setup>

defineProps(['djEditar']);

const cerrarEditor = () => {
  emit('cerrarEditor');
};
</script>

<template>
  <div class="container py-4 rounded my-3" style="background-color: darkgray;">
    <div>
      <h1 v-if="djEditar" class="text-center display-5 fw-bold text-body-emphasis">Editar {{ djEditar }}</h1>
      <h1 v-else class="text-center display-5 fw-bold text-body-emphasis">Agregar DJ</h1>
      <div class="col-lg-6 mx-auto">
        <form action="POST">
          <input class="form-control mt-3" type="text" placeholder="Nombre" aria-label="default input example">
          <div class="input-group mt-3">
            <span class="input-group-text" id="basic-addon1">@</span>
            <input type="text" class="form-control" placeholder="Instagram" aria-label="Instagram">
          </div>
          <input class="form-control mt-3" type="number" placeholder="Celular" aria-label="default input example">
          <div class="mt-3 d-flex justify-content-evenly">
            <button type="button" class="btn btn-secondary" @click="$emit('cerrarEditor')">Cancelar</button>
            <button type="submit" class="btn btn-success">Guardar</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>