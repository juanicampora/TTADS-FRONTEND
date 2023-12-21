<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavbarOwner from '@/components/NavbarOwner2.vue'

</script>

<template>
  <header class="d-flex justify-content-center py-3" style="position:relative; z-index:10000; background-color: #282828;">
    <NavbarOwner />
  </header>

  <div>
    <RouterView />
  </div>
</template>

