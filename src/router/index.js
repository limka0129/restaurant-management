import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { UserLayout, BasicLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/user/login',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: 'dashboard' },
        children: [
          {
            path: '/dashboard/analysis/',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: true }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true }
          },
          {
            path: '/dashboard/menu',
            name: 'Menu',
            component: () => import('@/HeyCafe/pages/Menu'),
            meta: { title: 'hc.menu', keepAlive: true }
          },
        ]
      },

      // hostOnly
      {
        path: '/host',
        name: 'Host',
        redirect: '/host/overview',
        component: RouteView,
        meta: { title: 'hc.hostOnly', keepAlive: true, icon: 'user' },
        children: [
          {
            path: '/host/overview/',
            name: 'HostOverview',
            component: () => import('@/HeyCafe/pages/Overview'),
            meta: { title: 'hc.overview', keepAlive: true }
          },
        ]
      },

      // waiterOnly
      {
        path: '/waiter',
        name: 'Waiter',
        redirect: '/waiter/overview',
        component: RouteView,
        meta: { title: 'hc.waiterOnly', keepAlive: true, icon: 'user' },
        children: [
          {
            path: '/waiter/overview/',
            name: 'WaiterOverview',
            component: () => import('@/HeyCafe/pages/Overview'),
            meta: { title: 'hc.overview', keepAlive: true }
          },
        ]
      },

      // cookOnly
      {
        path: '/cook',
        name: 'Cook',
        redirect: '/cook/todoDishes',
        component: RouteView,
        meta: { title: 'hc.cookOnly', keepAlive: true, icon: 'user' },
        children: [
          {
            path: '/cook/todoDishes/',
            name: 'TodoDishes',
            component: () => import('@/HeyCafe/pages/cook/TodoDishes'),
            meta: { title: 'hc.todoDishes', keepAlive: true }
          },
        ]
      },

      // busboyOnly
      {
        path: '/busboy',
        name: 'Busboy',
        redirect: '/busboy/overview',
        component: RouteView,
        meta: { title: 'hc.busboyOnly', keepAlive: true, icon: 'user' },
        children: [
          {
            path: '/busboy/overview/',
            name: 'BusboyOverview',
            component: () => import('@/HeyCafe/pages/Overview'),
            meta: { title: 'hc.overview', keepAlive: true }
          },
        ]
      },

      // managerOnly
      {
        path: '/manager',
        name: 'Manager',
        redirect: '/manager/overview',
        component: RouteView,
        meta: { title: 'hc.managerOnly', keepAlive: true, icon: 'user' },
        children: [
          {
            path: '/manager/overview/',
            name: 'ManagerOverview',
            component: () => import('@/HeyCafe/pages/Overview'),
            meta: { title: 'hc.overview', keepAlive: true }
          },
          {
            path: '/manager/staffInformation/',
            name: 'StaffInformation',
            component: () => import('@/HeyCafe/pages/manager/StaffInformation'),
            meta: { title: 'hc.staffInformation', keepAlive: true }
          },
        ]
      },



    ]
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
]

export default new Router({
  routes
})

export { routes }
