<script setup>
import GoogleImage from '@/assets/Google.png';
import { ref } from 'vue'
import { useUsuario } from '@/stores/usuario'

import { useEspera } from '@/stores/espera'
const espera = useEspera()

import { useAlerta } from '@/stores/alerta'
const alerta = useAlerta()

const usuario = useUsuario()
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
const pasarA = () => {
  usuario.tipo = 'Admin'
  usuario.uid = 'bbbb';
  usuario.name = 'Admin';
  usuario.logueado = true;
}
const loguear = async () => {
  espera.activar();
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
        url: 'https://fiestaappapi.onrender.com/api/usuarios/login',
        data: {
          "uid": usuario.uid,
          "nombre": usuario.name,
          "mail": usuario.mail
        }
      }).then((data) => {
        usuario.tipo = data.data.data.tipo;
        usuario.logueado = true;
        espera.desactivar();
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
        espera.desactivar();
      });
    }).catch((error) => {
      // Handle Errors here.
      console.log('Hubo un error con firebase');
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alerta.activar(errorMessage, 'danger')
      espera.desactivar();
    });
}

</script>

<template>
  <div class="login-page">
    <img class="background-container" src="/ImagenFiesta.jpg">
    <div class="form">
      <div class="logo"><img src="/FiestApp.png"></div>
      <div class="login-form">
        <button id="botonLogin" @click="loguear"><img :src="GoogleImage"
            style="height: 50px; width: 50px; background-color: white ; margin-right: 10px;">Ingresar con
          Google</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  margin-bottom: 20px;
}

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(5px);
}

.login-page {
  width: 360px;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  position: relative;
  z-index: 1;
  background: #ffffffc2;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  border-radius: 10px;
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
  border-radius: 6px;
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