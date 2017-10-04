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
    return { path: this.path, component: this.component, name }
  }
}
