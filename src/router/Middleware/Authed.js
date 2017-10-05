import Auth from '@/auth/Auth'

export default class Authed {
  handle (to, from, next) {
    if (Auth.logged()) {
      return next()
    }

    return next({name: 'login'})
  }
}
