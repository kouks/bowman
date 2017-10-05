import Model from '../Model'

import Scenario from './Scenario'
import User from './User'

export default class Score extends Model {
  static get collectionName () {
    return 'scores'
  }

  get scenario () {
    return this.belongsTo(new Scenario())
  }

  get user () {
    return this.belongsTo(new User())
  }
}
