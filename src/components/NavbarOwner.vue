<template>
  <div class="container">
    <div class="col-md-3 mb-2 mb-md-0">
      <RouterLink class="nav-link" to="/" aria-current="page"><span class="material-symbols-outlined">
          celebration
        </span>
      </RouterLink>
    </div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/nuevanoche">Nueva Noche</RouterLink>
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
        <RouterLink class="nav-link" to="/Opiniondj">Opinion Dj</RouterLink>
      </li>
    </ul>
  </div>
</template>
