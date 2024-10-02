import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeView2 from '../views/HomeViewV2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
    ,
    {
      path: '/home2',
      name: 'home2',
      component: HomeView2
    }
    ,
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/ResultsView.vue')
    }
  ]
})

export default router
