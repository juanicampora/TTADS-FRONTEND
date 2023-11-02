<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header class="d-flex justify-content-center py-3" style="background-color: #122c47;">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/" aria-current="page">Inicio
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/djs">DJs</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/canciones">Canciones
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/cargacancionesdj">Carga Canciones DJ
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/topcanciones">Top
          Canciones</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/votarcanciones">Votar
          Canciones</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/comentariodj">Comentario Dj</RouterLink>
      </li>
    </ul>
  </header>

  <div>
    <RouterView />
  </div>
</template>

