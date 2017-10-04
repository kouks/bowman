import Model from '../Model'

import Score from './Score'

export default class User extends Model {
  get scores () {
    return this.hasMany(new Score())
  }
}
