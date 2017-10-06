import Terrain from './Terrain'
import Exception from '@/exceptions/Exception'

export default class Collider {
  /**
   * Class constructor.
   *
   * @return void
   */
  constructor () {
    this.clear()

    this.boundaries = {
      w: process.env.CANVAS_WIDTH,
      h: process.env.CANVAS_HEIGHT
    }
  }

  /**
   * Registers a collidable object to the collider.
   *
   * @param  Terrain collidable
   * @return void
   */
  register (collidable) {
    if (!(collidable instanceof Terrain)) {
      throw new Exception('The argument needs to be an instance of Terrain class.')
    }

    this.collidables.push(collidable)
  }

  /**
   * Clears the collider.
   *
   * @return void
   */
  clear () {
    this.collidables = []
  }

  /**
   * Decides whether there is an object on provided position
   *
   * @param  Object pos
   * @return bool
   */
  collides (pos) {
    return Boolean(this.collidesWith(pos).length)
  }

  /**
   * Returns the objects that provided position collides with.
   *
   * @param  Object pos
   * @return array
   */
  collidesWith (pos) {
    if (pos.x < 0 || pos.x > this.boundaries.w || pos.y > this.boundaries.h) {
      return ['boundary']
    }

    return this.collidables.filter((obj) => {
      if (pos.x >= obj.x && pos.x <= obj.x + obj.w && pos.y >= obj.y && pos.y <= obj.y + obj.h) {
        return true
      }

      return false
    })
  }
}
