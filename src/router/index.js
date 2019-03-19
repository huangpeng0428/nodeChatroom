import Vue from 'vue'
import Router from 'vue-router'
import chatRoom from '@/components/chatRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chatRoom',
      component: chatRoom
    }
  ]
})
