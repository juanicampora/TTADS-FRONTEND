import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import { useAlerta } from '@/stores/alerta'

export const useUsuario = defineStore('usuario', () => {
  const router = useRouter()
  const tipo = ref('')
  const uid = ref('')
  const name = ref('')
  const mail = ref('')
  const logueado = ref(false)
  const esperaUsuario = ref(false)
  const cerrarsesion = () => {
    esperaUsuario.value = true
    const alerta = useAlerta()
    axios({
      method: 'put',
      url: `https://fiestaappapi.onrender.com/api/usuarios/logout/${uid.value}`
    }).then((response) => {
      console.log('Sesión cerrada:', response.data.message);
      alerta.activar('Sesión cerrada', 'success')
      router.push('/')
      tipo.value = ''
      uid.value = ''
      name.value = ''
      mail.value = ''
      logueado.value = false
      esperaUsuario.value = false
    }).catch((error) => {
      console.log('Error al cerrar sesión:', error.response.data.message);
      alerta.activar('Error al cerrar sesión', 'danger')
      router.push('/error')
      esperaUsuario.value = false
    })
}
  return { tipo, uid, name, mail, logueado, esperaUsuario, cerrarsesion}
})