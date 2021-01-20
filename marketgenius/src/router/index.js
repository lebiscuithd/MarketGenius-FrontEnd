import Vue from 'vue'
import Router from 'vue-router'
import Shop from '../views/Shop'
import Ticket from '../views/Ticket'
import TicketsList from '../views/TicketsList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: TicketsList
    },
    {
      path: '/ticket',
      name: 'Ticket',
      component: Ticket
    }
  ]
})
