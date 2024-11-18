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
router.beforeEach((to, from, next) => {
  // console.log(`Navigating to ${to.name} from ${from.name}`);
  next();
});


export default router
