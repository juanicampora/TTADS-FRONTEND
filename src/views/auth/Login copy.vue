<template>
  <div class="container container-sm text-center">

    <form>
      <span class="material-symbols-outlined" width="72" height="57" style="color:#198754; font-size: xx-large;">
        celebration
      </span>
      <h1 class="h3 mb-3 fw-normal">Iniciar Sesión</h1>

      <div class="form-floating py-2">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Usuario</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Contraseña</label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Ingresar</button>
      <p class="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
    </form>
  </div>
</template>