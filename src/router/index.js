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
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        hidden: true,
        meta: { title: 'menu.exception', icon: 'warning' },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: 'menu.exception.not-permission' }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: 'menu.exception.not-find' }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: 'menu.exception.server-error' }
          }
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