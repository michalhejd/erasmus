import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {faBarsStaggered} from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
library.add(faMagnifyingGlass, faBarsStaggered, faCartShopping, faUser, faXmark)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

//if window location hostname is localhost, set axios base url to localhost

axios.defaults.baseURL = (window.location.hostname === 'localhost') ? 'http://localhost:3000' : 'https://erasmustartup.eu/stock'

Vue.use(axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
