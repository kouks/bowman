import Model from '../Model'

import Score from './Score'
import User from './User'

export default class Scenario extends Model {
  get scores () {
    return this.hasMany(new Score())
  }

  get user () {
    return this.belongsTo(new User())
  }
}
