import Vue from 'vue'
import Router from 'vue-router'
import Route from './Route'

import Authed from './Middleware/Authed'
import Guest from './Middleware/Guest'

import Menu from '@/components/Menu'
import Game from '@/components/Game'
import Editor from '@/components/Editor'
import Scenarios from '@/components/Scenarios'

import Login from '@/components/Auth/Login'
import Logout from '@/components/Auth/Logout'
import Register from '@/components/Auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    Route.set('/', Menu).name('menu').middleware(new Authed()).get(),
    Route.set('/editor', Editor, 'editor').name('editor').middleware(new Authed()).get(),
    Route.set('/scenarios', Scenarios).name('scenarios').middleware(new Authed()).get(),
    Route.set('/scenarios/:scenario', Game).name('game').middleware(new Authed()).get(),

    Route.set('/login', Login).name('login').middleware(new Guest()).get(),
    Route.set('/logout', Logout).name('logout').middleware(new Authed()).get(),
    Route.set('/register', Register).name('register').middleware(new Guest()).get()
  ]
})
