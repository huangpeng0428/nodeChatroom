// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/chat.css'
// import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';

// Vue.use(VueSocketio, socketio('ws://10.8.0.85:8088'));
// Vue.use(new VueSocketio({
//   debug: false,
//   connection: 'ws://10.8.0.85:8088',
//   }))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
