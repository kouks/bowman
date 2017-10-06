export default class Route {
  /**
   * Class constructor.
   *
   * @param  string path
   * @param  Component component
   * @return void
   */
  constructor (path, component) {
    this.path = path
    this.component = component
  }

  /**
   * Named static constructor lass constructor.
   *
   * @param  string path
   * @param  Component component
   * @return Route
   */
  static set (path, component) {
    return new this(path, component)
  }

  /**
   * Name setter.
   *
   * @param  string name
   * @return Route
   */
  name (name) {
    this.name = name

    return this
  }

  /**
   * Middleware setter.
   *
   * @param  Middleware middleware
   * @return Route
   */
  middleware (middleware) {
    this.middleware = middleware

    return this
  }

  /**
   * Builds up the route.
   *
   * @return Object
   */
  get () {
    return {
      path: this.path,
      component: this.component,
      name: this.name,
      beforeEnter: (to, from, next) => {
        if (!this.middleware) {
          return next()
        }

        return this.middleware.handle(to, from, next)
      }
    }
  }
}
