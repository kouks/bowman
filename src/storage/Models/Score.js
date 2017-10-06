import Model from '../Model'

import Scenario from './Scenario'
import User from './User'

export default class Score extends Model {
  /**
   * Returns the collection name.
   *
   * @var string
   */
  static get collectionName () {
    return 'scores'
  }

  /**
   * Sets the belongs to relationship
   *
   * @var array
   */
  get scenario () {
    return this.belongsTo(new Scenario())
  }

  /**
   * Sets the belongs to relationship
   *
   * @var array
   */
  get user () {
    return this.belongsTo(new User())
  }
}
