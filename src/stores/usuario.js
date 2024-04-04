import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import { useAlerta } from '@/stores/alerta'

import { useEspera } from '@/stores/espera'

export const useUsuario = defineStore('usuario', () => {
  const router = useRouter()
  const tipo = ref('')
  const uid = ref('')
  const name = ref('')
  const mail = ref('')
  const logueado = ref(false)
  const cerrarsesion = () => {
    const alerta = useAlerta()
    const espera = useEspera()
    espera.activar()
    axios({
      method: 'put',
      url: `https://fiestaappapi.onrender.com/api/usuarios/logout/${uid.value}`
    }).then((response) => {
      alerta.activar('Sesión cerrada', 'success')
      router.push('/')
      tipo.value = ''
      uid.value = ''
      name.value = ''
      mail.value = ''
      logueado.value = false
      espera.desactivar()
    }).catch((error) => {
      console.log('Error al cerrar sesión:', error.response.data.message);
      alerta.activar('Error al cerrar sesión', 'danger')
      router.push('/error')
      espera.desactivar()
    })
}
  return { tipo, uid, name, mail, logueado, cerrarsesion}
})