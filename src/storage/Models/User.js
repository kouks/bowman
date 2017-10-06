import Model from '../Model'

import Score from './Score'
import Scenario from './Scenario'

export default class User extends Model {
  /**
   * Returns the collection name.
   *
   * @var string
   */
  static get collectionName () {
    return 'users'
  }

  /**
   * Sets the has many relationship
   *
   * @var array
   */
  get scores () {
    return this.hasMany(new Score())
  }

  /**
   * Sets the has many relationship
   *
   * @var array
   */
  get scenarios () {
    return this.hasMany(new Scenario())
  }
}
