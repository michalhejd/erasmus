import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import vuexPersist from 'vuex-persist'

Vue.use(Vuex)
const url = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    products: undefined,
    product: undefined,
    cart: [],
    productLoading: false,
    searchItemList: false,
    nav: false
  },
  getters: {
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setProduct(state, product) {
      state.product = product
    },
    addToCart(state, product) {
    },
    removeFromCart(state, product) {
    },
    setProductLoading(state, productLoading) {
      state.productLoading = productLoading
    },
    setNav(state) {
      state.nav = !state.nav
    }
  },

  actions: {
    async getProducts({ commit }) {
      commit('setProductLoading', true)
      await axios.get(`${url}/stock/data`)
        .then(response => {
          commit('setProducts', response.data)
          commit('setProductLoading', false)
        }
        )
    },
    async getProduct({ commit }, id) {
      commit('setProductLoading', true)
      await axios.get(`${url}/stock/${id}`)
        .then(response => {
          commit('setProduct', response.data)
          if (response.data === '' || response.data.length === 0) {
            commit('setProductLoading', false)
            router.push({ name: 'pageNotFound' });
          }
          else {
            document.title = response.data.name
            setTimeout(() => { commit('setProductLoading', false)}, 100);
          }
        }, error => {
          console.log(error);
        })
    }
  },
  modules: {
  }
})
