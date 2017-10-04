import Vue from 'vue'
import Router from 'vue-router'
import Route from './Route'

import Menu from '@/components/Menu'
import Game from '@/components/Game'
import Editor from '@/components/Editor'
import Scenarios from '@/components/Scenarios'

Vue.use(Router)

export default new Router({
  routes: [
    Route.set('/', Menu).name('menu'),
    Route.set('/editor', Editor, 'editor').name('editor'),
    Route.set('/scenarios', Scenarios).name('scenarios'),
    Route.set('/scenarios/:scenario', Game).name('game')
  ]
})
