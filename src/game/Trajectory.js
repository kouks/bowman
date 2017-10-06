import Ballistics from './Ballistics'

export default class Trajectory {
  /**
   * Class constructor
   *
   * @param  Collider collider
   * @param  Object startPoint
   * @param  int power
   * @param  float angle
   * @param  int wind
   * @return void
   */
  constructor (collider, startPoint, power, angle, wind) {
    this.collider = collider
    this.startPoint = startPoint
    this.power = power
    this.angle = angle
    this.wind = wind

    this.trajectory = []

    this.boundaries = {
      w: process.env.CANVAS_WIDTH,
      h: process.env.CANVAS_HEIGHT
    }
  }

  /**
   * Calculates a trajectory for given projectile.
   *
   * @param  Projectile projectile
   * @return void
   */
  calculateFor (projectile) {
    let lastY = 0

    for (let x = 0; x < this.boundaries.w; x++) {
      let y = Ballistics.getY(
        x, this.angle, this.power, this.wind, projectile.weight
      )

      this.savePosition(x, y)

      for (let y1 = lastY; y1 !== y; y1 > y ? y1-- : y1++) {
        let position = this.getPosition(x, y1)

        if (this.collider.collides(position)) {
          this.collisionObject = this.collider.collidesWith(position).pop()

          return
        }
      }

      lastY = y
    }
  }

  /**
   * Parses provided coordinates.
   *
   * @param  int x
   * @param  int y
   * @return Object
   */
  getPosition (x, y) {
    return {
      x: x + this.startPoint.x,
      y: this.startPoint.y - y
    }
  }

  /**
   * Saves a position to a class-scoped array.
   *
   * @param  int x
   * @param  int y
   * @return void
   */
  savePosition (x, y) {
    this.trajectory.push(this.getPosition(x, y))
  }

  /**
   * Returns the trajectory.
   *
   * @return array
   */
  getTrajectory () {
    return this.trajectory
  }

  /**
   * Returns the projectile impact point.
   *
   * @return Object
   */
  getImpactPoint () {
    return this.trajectory[this.trajectory.length - 1]
  }
}
