import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        breadcrumb: 'Sök'
      },
      component: HomeView
    },
    {
      path: '/results',
      name: 'results',
      meta: {
        breadcrumb: 'Sök > Resultat'
      },
      component: () => import('../views/ResultsView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        breadcrumb: 'Dashboard'
      },
      component: () => import('../views/DashboardView.vue'),
    }
  ]
})

// Add the beforeEach hook here
// The dashboard is only for logged-in users (the API also refuses requests without a login)
router.beforeEach((to, from, next) => {
  if (to.name === 'dashboard' && !localStorage.getItem('token')) {
    next({ name: 'home' });
    return;
  }
  next();
});


export default router
