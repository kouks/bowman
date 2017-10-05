import Ballistics from './Ballistics'

export default class Trajectory {
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

  getPosition (x, y) {
    return {
      x: x + this.startPoint.x,
      y: this.startPoint.y - y
    }
  }

  savePosition (x, y) {
    this.trajectory.push(this.getPosition(x, y))
  }

  getTrajectory () {
    return this.trajectory
  }

  getImpactPoint () {
    return this.trajectory[this.trajectory.length - 1]
  }
}
