import Vue from 'vue'
import VueRouter from 'vue-router'

import Nagoya from '../views/Nagoya.vue'
import Ogaki from '../views/Ogaki.vue'
import Handa from '../views/Handa.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    component: Nagoya
  },
  {
    path: '/nagoya',
    name: 'Nagoya',
    component: Nagoya
  },
  {
    path: '/ogaki',
    name: 'Ogaki',
    component: Ogaki
  },
  {
    path: '/handa',
    name: 'Handa',
    component: Handa
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
