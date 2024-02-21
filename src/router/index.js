import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'

import { useUsuario } from '@/stores/usuario'

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
      path: '/nuevanoche',
      name: 'nuevanoche',
      component: () => import('../views/NuevaNocheView.vue'),
      meta: { roles: ['Admin'] }
    },
    {
      path: '/djs',
      name: 'djs',
      component: () => import('../views/DjsView.vue'),
      meta: { roles: ['Admin'] }
    },
    {
      path: '/canciones',
      name: 'canciones',
      component: () => import('../views/CancionesView.vue'),
      meta: { roles: ['Admin'] }
    },
    {
      path: '/cargacancionesdj',
      name: 'cargacancionesdj',
      component: () => import('../views/CargaCancionesDjView.vue'),
      meta: { roles: ['Admin','Dj'] }
    },
    {
      path: '/cancionesdj',
      name: 'cancionesdj',
      component: () => import('../views/CancionesDjView.vue'),
      meta: { roles: ['Admin','Dj'] }
    },
    {
      path: '/topcanciones',
      name: 'topcanciones',
      component: () => import('../views/TopCancionesView.vue'),
      meta: { roles: ['Admin','Dj','Cliente'] }
    },
    {
      path: '/votarcanciones',
      name: 'votarcanciones',
      component: () => import('../views/VotarCancionesView.vue'),
      meta: { roles: ['Admin','Cliente'] }
    },
    {
      path: '/opiniondj',
      name: 'opiniondj',
      component: () => import('../views/OpinionDjView.vue'),
      meta: { roles: ['Admin','Cliente'] }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue")
    },
    {
      path: '/denegado',
      name: 'Denegado',
      component: () => import('../views/DenegadoView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const usuario = useUsuario()
  if (to.meta.roles && !to.meta.roles.includes(usuario.tipo)) {
      next('/');
  } else {
    next();
  }
});

export default router
