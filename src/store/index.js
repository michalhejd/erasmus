import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage,
  reducer: state => ({
    token: state.token,
    kafka: state.kafka

  })
})
const url = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    products: undefined,
    product: undefined,
    loading: false,
    searchItemList: false,
    nav: false,
    kafka: false,
    token: undefined
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
    setKafka(state, kafka) {
      state.kafka = kafka
    },
    setProductLoading(state, productLoading) {
      state.productLoading = productLoading
    },
    setNav(state) {
      state.nav = !state.nav
    },
    setToken(state, token) {
      state.token = token
    }
  },

  actions: {
    async getProducts({ commit }) {
      commit('setProductLoading', true)
      await axios.get(`${url}/stock/data`)
        .then(response => {
          commit('setProducts', response.data)
          setTimeout(() => { commit('setProductLoading', false)}, 500);
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
            setTimeout(() => { commit('setProductLoading', false)}, 500);
          }
        }, error => {
          console.log(error);
        })
    },
    setKafka({ commit }, kafka) {
      commit('setKafka', kafka)
    },
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setLoading({ commit }, loading) {
      commit('setProductLoading', loading)
    }
  },
  modules: {
  },
  plugins: [vuexLocalStorage.plugin]
})
