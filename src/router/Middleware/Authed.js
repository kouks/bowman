import Auth from '@/auth/Auth'

export default class Authed {
  /**
   * Handles the incoming request.
   *
   * @param  Object to
   * @param  Object from
   * @param  Closure next
   * @return Response
   */
  handle (to, from, next) {
    if (Auth.logged()) {
      return next()
    }

    return next({name: 'login'})
  }
}
