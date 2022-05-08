import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home.vue'
import products from '@/views/products.vue'
import itemDetail from '@/views/itemDetail.vue'
import signIn from '@/views/signIn.vue'
import cart from '@/views/cart.vue'
import account from '@/views/account.vue'

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
    path: '/signin',
    name: 'signIn',
    component: signIn
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/account',
    name: 'account',
    component: account
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
