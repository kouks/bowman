import Storage from 'local-storage'
import User from '@/storage/Models/User'
import Exception from '@/exceptions/Exception'

export default class Auth {
  /**
   * Logs in the provided user.
   *
   * @param  User user
   * @return void
   */
  static login (user) {
    if (!(user instanceof User)) {
      throw new Exception('The user must be an instance of Models/User class.')
    }

    Storage.set('user_id', user.id)
  }

  /**
   * Logs out the logged-in user
   *
   * @return void
   */
  static logout () {
    Storage.remove('user_id')
  }

  /**
   * Returns logged-in user.
   *
   * @return User
   */
  static user () {
    return User.find(this.id())
  }

  /**
   * Returns the id of a logged-in user.
   *
   * @return int
   */
  static id () {
    return Storage.get('user_id')
  }

  /**
   * Returns whether there is a user logged in.
   *
   * @return bool
   */
  static logged () {
    return Boolean(this.id())
  }
}
