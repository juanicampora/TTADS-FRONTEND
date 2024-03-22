<script setup>
import GoogleImage from '@/assets/Google.png';
import { ref } from 'vue'
import Carga from '@/components/Carga.vue';
import { useUsuario } from '@/stores/usuario'

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

const usuario = useUsuario()
const esperando = ref(false)
// Firebase
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAi1BOGFIhq7R4IHRFtXKWHhLr__dme8xg",
  authDomain: "fiestapp-69505.firebaseapp.com",
  projectId: "fiestapp-69505",
  storageBucket: "fiestapp-69505.appspot.com",
  messagingSenderId: "37468550180",
  appId: "1:37468550180:web:3ebf270a76a4f20c2dd4b1"
};
const appfirebase = initializeApp(firebaseConfig);
// Firebase GoogleAuth
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
const pasarC = () => {
  usuario.tipo = 'Cliente'
  usuario.uid = 'aaaa';
  usuario.name = 'Cliente';
}
const pasarA = () => {
  usuario.tipo = 'Admin'
  usuario.uid = 'aaaa';
  usuario.name = 'Admin';
}
const pasarD = () => {
  usuario.tipo = 'Dj'
  usuario.uid = 'aaaa';
  usuario.name = 'Dj';
}
const loguear = async () => {
  esperando.value = true;
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  auth.languageCode = 'es';
  signInWithPopup(auth, provider)
    .then((result) => {
      usuario.uid = result.user.uid;
      usuario.name = result.user.displayName;
      usuario.mail = result.user.email;
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/usuarios/login',
        data: {
          "uid": usuario.uid,
          "nombre": usuario.name,
          "mail": usuario.mail
        }
      }).then((data) => {
        usuario.tipo = data.data.data.tipo;
        esperando.value = false;
      }).catch((error) => {
        console.log('Hubo un error con la API');
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          alerta.mensaje = error.response.data.message;
        } else if (error.message == 'Network Error') { alerta.mensaje = 'Error de conexión al Servidor' }
        else { alerta.mensaje = error.message; }
        alerta.tipo = 'danger'
        alerta.activar()
        usuario.uid = '';
        usuario.name = '';
        usuario.mail = '';
        esperando.value = false;
      });
    }).catch((error) => {
      // Handle Errors here.
      console.log('Hubo un error con firebase');
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alerta.activar(errorMessage, 'danger')
      esperando.value = false;
    });
}

</script>

<template>
  <Carga v-if="esperando" />
  <div class="login-page">
    <div class="form">
      <div class="login-form">
        <button id="botonLogin" @click="loguear"><img :src="GoogleImage"
            style="height: 50px; width: 50px; background-color: white ; margin-right: 10px;">Ingresar con
          Google</button>
      </div>
    </div>
  </div>
  <div d-flex style="text-align: center;">
    <button class="btn btn-danger" @click="pasarA">Entrar Directo Admin (hardcodeado)</button> <br><br>
    <button class="btn btn-danger" @click="pasarD">Entrar Directo Dj (hardcodeado)</button> <br><br>
    <button class="btn btn-danger" @click="pasarC">Entrar Directo Cliente (hardcodeado)</button>
  </div>
</template>

<style scoped>
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form button {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 17px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.form button:hover,
.form button:active,
.form button:focus {
  background: #43A047;
}

.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}

.form .message a {
  color: #4CAF50;
  text-decoration: none;
}

.form .register-form {
  display: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}

.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}

.container .info {
  margin: 50px auto;
  text-align: center;
}

.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}

.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}

.container .info span a {
  color: #000000;
  text-decoration: none;
}

.container .info span .fa {
  color: #EF3B3A;
}
</style>