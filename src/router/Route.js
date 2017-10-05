// Just syntax sugar, no deep functioanlity

export default class Route {
  constructor (path, component) {
    this.path = path
    this.component = component
  }

  static set (path, component) {
    return new this(path, component)
  }

  name (name) {
    this.name = name

    return this
  }

  middleware (middleware) {
    this.middleware = middleware

    return this
  }

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
