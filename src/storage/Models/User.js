import Model from '../Model'

import Score from './Score'
import Scenario from './Scenario'

export default class User extends Model {
  static get collectionName () {
    return 'users'
  }

  get scores () {
    return this.hasMany(new Score())
  }

  get scenarios () {
    return this.hasMany(new Scenario())
  }
}
