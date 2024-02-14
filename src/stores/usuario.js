import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUsuario = defineStore('usuario', () => {
  const tipo = ref('')
  const uid = ref('')
  const name = ref('')
  const mail = ref('')
  const cerrarsesion = () => {
    try {
      axios({
        method: 'put',
        url: `https://fiestaappapi.onrender.com/api/usuarios/logout/${uid.value}`
      }).then((response) => {
        console.log('Sesión cerrada');
        console.log(response);
      }).catch((error) => {
        console.log('Error al cerrar sesión:', error.response.data.message);
      })
      tipo.value = ''
      uid.value = ''
      name.value = ''
      mail.value = ''
    } catch (error) {
      console.log(error);
    }
  }
  return { tipo, uid, name, mail, cerrarsesion}
})