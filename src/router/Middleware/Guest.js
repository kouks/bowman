import Auth from '@/auth/Auth'

export default class Guest {
  handle (to, from, next) {
    if (!Auth.logged()) {
      return next()
    }

    return next({name: 'menu'})
  }
}
