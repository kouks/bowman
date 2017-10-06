import Storage from 'local-storage'
import merge from 'webpack-merge'

export default class Model {
  /**
   * Rerturns all rows from a collection.
   *
   * @return array
   */
  static all () {
    return this.hydrateMany(new this(), this.getCollection())
  }

  /**
   * Creates a new row on a collection.
   *
   * @param  Object data
   * @return Model
   */
  static create (data) {
    let collection = this.all()
    let instance = new this()
    data = merge(data, { id: this.generateId() })

    collection.push(data)

    this.setCollection(collection)

    return instance.hydrate(data)
  }

  /**
   * Finds a row by provided ID.
   *
   * @param  int id
   * @return Model|null
   */
  static find (id) {
    let collection = this.all()
    let instance = new this()
    let result = collection.filter(row => row.id === parseInt(id)).pop()

    return result ? instance.hydrate(result) : null
  }

  /**
   * Deletes a row by provided ID.
   *
   * @param  int id
   * @return void
   */
  static delete (id) {
    let collection = this.all()
    let result = collection.filter(row => row.id !== id)

    this.setCollection(result)
  }

  /**
   * Filters rows by provided query.
   *
   * @param  Object query
   * @return array
   */
  static where (query) {
    let collection = this.all()
    let instance = new this()
    let result = collection.filter((row) => {
      for (let column in query) {
        if (row[column] !== query[column]) {
          return false
        }
      }

      return true
    })

    return this.hydrateMany(instance, result)
  }

  /**
   * Clears out the entire collection
   *
   * @return void
   */
  static clear () {
    this.setCollection([])
  }

  /**
   * Defines a belongs-to relationship.
   *
   * @param  Model model
   * @return Model
   */
  belongsTo (model) {
    let collectionName = model.constructor.collectionName
    let collection = model.constructor.getCollection()
    let key = `${collectionName.substr(0, collectionName.length - 1)}_id`
    let result = collection.filter(row => row.id === this[key]).pop()

    return result ? model.getInstance().hydrate(result) : null
  }

  /**
   * Defines a has-many relationship.
   *
   * @param  Model model
   * @return array
   */
  hasMany (model) {
    let collectionName = this.constructor.collectionName
    let collection = model.constructor.getCollection()
    let key = `${collectionName.substr(0, collectionName.length - 1)}_id`
    let results = collection.filter(row => row[key] === this.id)

    return this.constructor.hydrateMany(model, results)
  }

  /**
   * Generates an unique identifier.
   *
   * @return int
   */
  static generateId () {
    return (new Date()).getTime()
  }

  /**
   * Rewrites the collection to provided data.
   *
   * @param  array data
   * @return void
   */
  static setCollection (data) {
    Storage.set(this.collectionName, data)
  }

  /**
   * Returns the entire collection.
   *
   * @return array
   */
  static getCollection () {
    let collection = Storage.get(this.collectionName)

    return collection || []
  }

  /**
   * Hydrates models with provided data.
   *
   * @param  Model model
   * @param  array data
   * @return array
   */
  static hydrateMany (model, data) {
    let collection = []

    for (let key in data) {
      collection.push(model.getInstance().hydrate(data[key]))
    }

    return collection
  }

  /**
   * Hydrates a model with provided data
   *
   * @param  array data
   * @return Model
   */
  hydrate (data) {
    for (let key in data) {
      this[key] = data[key]
    }

    return this
  }

  /**
   * Returns a new instane of given class.
   *
   * @return Model
   */
  getInstance () {
    return new this.constructor()
  }
}
