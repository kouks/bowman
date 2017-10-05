import Terrain from './Terrain'
import Exception from '@/exceptions/Exception'

export default class Collider {
  constructor () {
    this.clear()

    this.boundaries = {
      w: process.env.CANVAS_WIDTH,
      h: process.env.CANVAS_HEIGHT
    }
  }

  register (collidable) {
    if (!(collidable instanceof Terrain)) {
      throw new Exception('The argument needs to be an instance of Terrain class.')
    }

    this.collidables.push(collidable)
  }

  clear () {
    this.collidables = []
  }

  collides (pos) {
    return Boolean(this.collidesWith(pos).length)
  }

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
