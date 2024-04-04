<script setup>
import ManitoSmall from '@/assets/ManitoSmall.png';
import { useUsuario } from '@/stores/usuario'
const usuario = useUsuario()
</script>

<template>
  <div class="container py-4 rounded mt-3" style="background-color: gray;">
    <div>
      <h1 class="text-center display-6 fw-bold text-body-emphasis mb-3">Hola {{ usuario.name }} <img :src="ManitoSmall">
      </h1>
      <h1 class="text-center display-4 fw-bold text-body-emphasis mb-3">¡Bienvenido a <img src="/FiestApp.png"
          style="width: 20%; height: auto;">!</h1>

      <h6 class=" text-center fw-bold text-body-emphasis mt-4"> Seleccione una opción de la barra superior</h6>
    </div>
  </div>
</template>