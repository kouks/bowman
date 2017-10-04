import Storage from 'js-cookie'
import merge from 'webpack-merge'

export default class Model {
  static get collectionName () {
    return this.name.toLowerCase() + 's'
  }

  /**
   * Queries
   */

  static all () {
    return this.hydrateMany(new this(), this.getCollection())
  }

  static create (data) {
    let collection = this.all()
    let instance = new this()

    collection.push(merge(data, { id: this.generateId() }))

    this.setCollection(collection)

    return instance.hydrate(data)
  }

  static find (id) {
    let collection = this.all()
    let instance = new this()
    let result = collection.filter(row => row.id === parseInt(id)).pop()

    return result === undefined ? result : instance.hydrate(result)
  }

  static delete (id) {
    let collection = this.all()
    let result = collection.filter(row => row.id !== parseInt(id))

    this.setCollection(result)
  }

  static clear () {
    this.setCollection([])
  }

  /**
   * Relationships
   */

  belongsTo (model) {
    let collectionName = model.constructor.collectionName
    let collection = model.constructor.getCollection()
    let key = `${collectionName.substr(0, collectionName.length - 1)}_id`
    let result = collection.filter(row => row.id === this[key]).pop()

    return result === undefined ? result : model.getInstance().hydrate(result)
  }

  hasMany (model) {
    let collectionName = this.constructor.collectionName
    let collection = model.constructor.getCollection()
    let key = `${collectionName.substr(0, collectionName.length - 1)}_id`
    let results = collection.filter(row => row[key] === this.id)

    return this.constructor.hydrateMany(model, results)
  }

  /**
   * Helpers
   */

  static generateId () {
    return (new Date()).getTime()
  }

  static setCollection (data) {
    Storage.set(this.collectionName, data)
  }

  static getCollection () {
    let collection = Storage.getJSON(this.collectionName)

    return collection === undefined ? [] : collection
  }

  static hydrateMany (model, data) {
    let collection = []

    for (let key in data) {
      collection.push(model.getInstance().hydrate(data[key]))
    }

    return collection
  }

  hydrate (data) {
    for (let key in data) {
      this[key] = data[key]
    }

    return this
  }

  getInstance () {
    return new this.constructor()
  }
}
