import Model from '../Model'

import Score from './Score'

export default class Scenario extends Model {
  get scores () {
    return this.hasMany(new Score())
  }
}
