<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavbarOwner from '@/components/NavbarOwner.vue'
import Login from './views/auth/Login.vue';
import LoginAdmin from './views/auth/LoginAdmin.vue';
import LoginDJ from './views/auth/LoginDJ.vue';

import { useRoute } from 'vue-router'
const route = ref(useRoute());

import { useUsuario } from '@/stores/usuario'
const usuario = useUsuario()
</script>

<template>
  <div v-if="usuario.uid != ''">
    <header class="d-flex justify-content-center py-3"
      style="position:relative; z-index:10000; background-color: #282828;">
      <NavbarOwner />
    </header>
    <div>
      <RouterView />
    </div>
  </div>
  <div v-else>
    <LoginAdmin v-if="route.name === 'loginadmin'" />
    <LoginDJ v-else-if="route.name === 'logindj'" />
    <Login v-else />
  </div>
</template>

<style>
body {
  background: linear-gradient(90deg, rgba(141, 194, 111, 1) 0%, rgba(118, 184, 82, 1) 50%);
}
</style>
