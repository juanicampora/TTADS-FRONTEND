<script setup>

defineProps(['cancionEditar']);

const cerrarEditor = () => {
  emit('cerrarEditor');
};
</script>

<template>
  <div class="container py-4 rounded my-3" style="background-color: darkgray;">
    <div>
      <h1 class="text-center display-5 fw-bold text-body-emphasis">Editar {{ cancionEditar }}</h1>
      <div class="col-lg-6 mx-auto">
        <form action="POST">
          <input class="form-control mt-3" type="text" placeholder="Nombre cancion">
          <input class="form-control mt-3" type="text" placeholder="Nombre cancion">
          <div class="row">
            <div class="col">
              <input class="form-control mt-3" type="number" placeholder="Puntaje" disabled>
            </div>
            <div class="col">
              <button class="btn btn-primary mt-3" type="button">Reiniciar
                Puntaje</button>
            </div>
          </div>
          <div class="mt-3 d-flex justify-content-evenly">
            <button type="button" class="btn btn-secondary" @click="$emit('cerrarEditor')">Cancelar</button>
            <button type="submit" class="btn btn-success">Guardar</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>