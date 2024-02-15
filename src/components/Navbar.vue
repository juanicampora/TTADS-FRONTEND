<script setup>
import { ref } from 'vue'
import { useUsuario } from '@/stores/usuario'

const usuario = ref(useUsuario())

</script>
<template>
  <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
      <div class="col-md-3 mb-md-0">
        <RouterLink class="nav-link d-inline-flex link-body-emphasis text-decoration-none" to="/">
          <span class="material-symbols-outlined" style="color:#198754; font-size: xx-large;">
            celebration
          </span>
        </RouterLink>
      </div>

      <ul class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li class="nav-item dropdown" v-if="usuario.tipo == 'Admin'">
          <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i
              class="bi bi-gear"></i> Administración</a>
          <ul class="dropdown-menu">
            <li class="dropdown-item">
              <RouterLink class="nav-link " to="/nuevanoche">Nueva Noche</RouterLink>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i
              class="bi bi-headphones"></i>
            Menu DJs</a>
          <ul class="dropdown-menu">
            <li class="dropdown-item" v-if="usuario.tipo == 'Admin'">
              <RouterLink class="nav-link " to="/djs">DJs</RouterLink>
            </li>
            <li class="dropdown-item" v-if="usuario.tipo == 'Admin' || usuario.tipo == 'Dj'">
              <RouterLink class="nav-link " to="/cargacancionesdj">Carga Canciones DJ</RouterLink>
            </li>
            <li class="dropdown-item" v-if="usuario.tipo == 'Admin' || usuario.tipo == 'Cliente'">
              <RouterLink class="nav-link" to="/opiniondj">Opinar Dj</RouterLink>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i
              class="bi bi-music-note-list"></i>
            Menu Canciones</a>
          <ul class="dropdown-menu">
            <li class="dropdown-item" v-if="usuario.tipo == 'Admin'">
              <RouterLink class="nav-link " to="/canciones">Todas las Canciones</RouterLink>
            </li>
            <li class="dropdown-item">
              <RouterLink class="nav-link " to="/topcanciones">Top Canciones</RouterLink>
            </li>
            <li class="dropdown-item" v-if="usuario.tipo == 'Admin' || usuario.tipo == 'Cliente'">
              <RouterLink class="nav-link " to="/votarcanciones">Votar
                Canciones</RouterLink>
            </li>
          </ul>
        </li>
      </ul>
      <div class="col-md-3 text-end">
        <button type="button" @click="usuario.cerrarsesion()" class="btn btn-outline-success me-2">Cerrar Sesión</button>
      </div>
    </header>
  </div>
</template>
<style>
.nav-pills .nav-link.active {
  color: #ffffff;
  background-color: #198754;
}

.nav-link {
  color: #198754;
}

.nav-link:hover {
  color: #1987549f;
}

.dropdown-menu {
  background-color: #282828eb;
}

.dropdown-link:hover {
  color: #1987549f;
}

.nav-link:focus,
.nav-link:hover {
  color: #1987549f;
}
</style>

