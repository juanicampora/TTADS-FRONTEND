<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Login from './views/auth/Login.vue'

import Carga from '@/components/Carga.vue';

import { useEspera } from '@/stores/espera'
const espera = useEspera()

import { useUsuario } from '@/stores/usuario'
const usuario = useUsuario()

import Toast from '@/components/Toast.vue'
import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

</script>

<template>
  <Carga v-if="espera.estado" />
  <div v-if="usuario.logueado">
    <header class="d-flex justify-content-center py-3"
      style="position:relative; z-index:10000; background-color: #282828;">
      <Navbar />
    </header>
    <div>
      <RouterView />
    </div>
  </div>
  <div v-else>
    <Login />
  </div>
  <Toast v-if="alerta.activa" :message="alerta.mensaje" :type="alerta.tipo" />
</template>

<style>
body {
  background: linear-gradient(90deg, rgba(141, 194, 111, 1) 0%, rgba(118, 184, 82, 1) 50%);
}
</style>
