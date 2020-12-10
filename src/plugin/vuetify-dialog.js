import Vue from 'vue'

// need instance of vuetify, for example
import vuetify from './vuetify'

import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  },
  
  success: {
    actions: [
      { text: '是', color: 'success', key: true }
    ]
  },
  info: {
    actions: [
      { text: '是', color: 'info', key: true }
    ]
  },
  warning: {
    actions: [
      { text: '是', color: 'warning', key: true }
    ]
  },
  error: {
    actions: [
      { text: '是', color: 'error', key: true }
    ]
  },
  
  confirm: {
    actions: {
      false: '否',
      true: '是'
    }
  },
  
  notification: {
    position: 'top-left',
    timeout: 3000
  },
  toast: {
    position: 'top-center',
    timeout: 3000
  }
})