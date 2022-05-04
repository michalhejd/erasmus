import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home.vue'
import products from '@/views/products.vue'
import itemDetail from '@/views/itemDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/products',
    name: 'products',
    component: products
  },
  {
    path: '/:id',
    name: 'itemDetail',
    component: itemDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
