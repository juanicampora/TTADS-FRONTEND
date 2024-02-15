import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlerta = defineStore('alerta', () => {
  const activa = ref(false)
  const mensaje = ref('')
  const tipo = ref('')
  const activar = () => {
    activa.value = false;
    setTimeout(() => {
      activa.value = true;
    }, 10);
  }
  return { tipo, activa, mensaje, activar}
})