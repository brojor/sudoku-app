import { createRouter, createWebHistory } from 'vue-router'
import PlayView from '../views/PlayView.vue'
import MenuView from '../views/MenuView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/play',
      name: 'play',
      component: PlayView,
    },
    {
      path: '/',
      name: 'menu',
      component: MenuView,
    }
  ]
})

export default router
