import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useUsuario = defineStore('usuario', () => {
  const router = useRouter()
  const tipo = ref('')
  const uid = ref('')
  const name = ref('')
  const mail = ref('')
  const cerrarsesion = () => {
    axios({
      method: 'put',
      url: `https://fiestaappapi.onrender.com/api/usuarios/logout/${uid.value}`
    }).then((response) => {
      console.log('Sesión cerrada:', response.data.message);
    }).catch((error) => {
      console.log('Error al cerrar sesión:', error.response.data.message);
    })
    router.push('/')
    tipo.value = ''
    uid.value = ''
    name.value = ''
    mail.value = ''
}
  return { tipo, uid, name, mail, cerrarsesion}
})