import Model from '../Model'

import Score from './Score'
import User from './User'

export default class Scenario extends Model {
  /**
   * Returns the collection name.
   *
   * @var string
   */
  static get collectionName () {
    return 'scenarios'
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
   * Sets the belongs to relationship
   *
   * @var Model
   */
  get user () {
    return this.belongsTo(new User())
  }
}
