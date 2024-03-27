import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEspera = defineStore('espera', () => {
  const estado = ref(false)
  const activar = () => {    estado.value = true;  }
  const desactivar = () => {    estado.value = false;  }
  return { estado, activar, desactivar}
})