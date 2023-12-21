<template>
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <span class="material-symbols-outlined" style="color:green; font-size: xx-large;">
            celebration
          </span>
        </a>
      </div>

      <ul class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li class="nav-item">
          <RouterLink class="nav-link " to="/nuevanoche">Nueva Noche</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link " to="/djs">DJs</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link " to="/canciones">Canciones
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link " to="/cargacancionesdj">Carga Canciones DJ
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link " to="/topcanciones">Top
            Canciones</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link " to="/votarcanciones">Votar
            Canciones</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/opiniondj">Opinion Dj</RouterLink>
        </li>
      </ul>

      <div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-success me-2">Logout</button>
      </div>
    </header>
  </div>
</template>
<style>
.nav-pills .nav-link.active {
  color: #ffffff;
  background-color: #198754;
  /* Puedes ajustar este color de fondo según tus preferencias */
}

.nav-link {
  color: #198754;
}

.nav-link-hover-color:hover {
  color: #198754;
  /* Puedes ajustar este color de fondo según tus preferencias */
}
</style>