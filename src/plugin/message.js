import Vue from 'vue'
import createApi from 'vue-create-api'

import Loading from '../../src/component/loading'
import Snackbar from '../../src/component/snackbar'

Vue.use(createApi, {
  componentPrefix: 'comp-',
  apiPrefix: '$create-'
})

Vue.createAPI(Loading, true)
Vue.createAPI(Snackbar, true)
