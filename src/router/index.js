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
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
    },
  ]
})

export default router
