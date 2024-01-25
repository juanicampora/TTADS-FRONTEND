import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: InicioView
    },
    {
      path: '/loginadmin',
      name: 'loginadmin',
      component: () => import('../views/auth/LoginAdmin.vue')
    },
    {
      path: '/logindj',
      name: 'logindj',
      component: () => import('../views/auth/LoginDJ.vue')
    },
    {
      path: '/nuevanoche',
      name: 'nuevanoche',
      component: () => import('../views/NuevaNocheView.vue')
    },
    {
      path: '/djs',
      name: 'djs',
      component: () => import('../views/DjsView.vue')
    },
    {
      path: '/canciones',
      name: 'canciones',
      component: () => import('../views/CancionesView.vue')
    },
    {
      path: '/cargacancionesdj',
      name: 'cargacancionesdj',
      component: () => import('../views/CargaCancionesDjView.vue')
    },
    {
      path: '/topcanciones',
      name: 'topcanciones',
      component: () => import('../views/TopCancionesView.vue')
    },
    {
      path: '/votarcanciones',
      name: 'votarcanciones',
      component: () => import('../views/VotarCancionesView.vue')
    },
    {
      path: '/opiniondj',
      name: 'opiniondj',
      component: () => import('../views/OpinionDjView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ]
})

export default router
