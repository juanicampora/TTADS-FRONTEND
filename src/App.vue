<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavbarOwner from '@/components/NavbarOwner.vue'
import Login from './views/auth/Login.vue';
import LoginAdmin from './views/auth/LoginAdmin.vue';
import { useRoute } from 'vue-router'

const route = ref(useRoute());

const logueado = ref(false);
</script>

<template>
  <div v-if="logueado">
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
    <Login v-else />
  </div>
</template>

