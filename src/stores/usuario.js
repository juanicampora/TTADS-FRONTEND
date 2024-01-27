import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsuario = defineStore('usuario', () => {
  const tipo = ref('')
  const uid = ref('')
  const name = ref('')
  const mail = ref('')
  const cerrarsesion = () => {
    tipo.value = ''
    uid.value = ''
    name.value = ''
    mail.value = ''
  }
  return { tipo, uid, name, mail, cerrarsesion}
})