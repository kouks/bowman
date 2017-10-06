import Storage from 'local-storage'
import User from '@/storage/Models/User'
import Exception from '@/exceptions/Exception'

export default class Auth {
  static login (user) {
    if (!(user instanceof User)) {
      throw new Exception('The user must be an instance of Models/User class.')
    }

    Storage.set('user_id', user.id)
  }

  static logout () {
    Storage.remove('user_id')
  }

  static user () {
    return User.find(this.id())
  }

  static id () {
    return parseInt(Storage.get('user_id'))
  }

  static logged () {
    return Boolean(this.id())
  }
}
