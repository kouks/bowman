import Ballistics from '@/game/Ballistics'

export default class Projectile {
  /**
   * The projectile speed.
   *
   * @var int
   */
  get speed () {
    return 200
  }

  /**
   * The projectile weight.
   *
   * @var float
   */
  get weight () {
    return 1.0
  }

  /**
   * The projectile length.
   *
   * @var int
   */
  get length () {
    return 35
  }

  /**
   * Class constructor.
   *
   * @return void
   */
  constructor () {
    this.boundaries = {
      w: process.env.CANVAS_WIDTH,
      h: process.env.CANVAS_HEIGHT
    }
  }

  /**
   * Animating a projectile along provided trajectory.
   *
   * @param  Trajectory trajectory
   * @param  Context context
   * @return Promise
   */
  fire (trajectory, context) {
    this.trajectory = trajectory
    this.path = this.trajectory.getTrajectory()
    this.context = context
    this.startTime = this.getTime()

    return new Promise((resolve, reject) => {
      this.prepareAnimationFrame(resolve, reject)
    })
  }

  /**
   * Prepares the animation.
   *
   * @param  Closure resolve
   * @param  Closure reject
   * @return void
   */
  prepareAnimationFrame (resolve, reject) {
    window.requestAnimationFrame(() => {
      this.step(resolve, reject)
    })
  }

  /**
   * A single step of an animation.
   *
   * @param  Closure resolve
   * @param  Closure reject
   * @return void|Closure
   */
  step (resolve, reject) {
    let [position, angle] = this.getNextPosition()

    if (position === undefined) {
      return resolve(this)
    }

    this.drawProjectile(position, angle)

    return window.requestAnimationFrame(() => {
      this.step(resolve, reject)
    })
  }

  /**
   * Gets the next position of a projectile.
   *
   * @return array
   */
  getNextPosition () {
    let x = Math.round(this.getTimeFrom(this.startTime) / this.speed * 100)

    return [
      this.path[x],
      this.getAngleFor(x)
    ]
  }

  /**
   * Returns the projectile angle at given position.
   *
   * @param  int x
   * @return array
   */
  getAngleFor (x) {
    let previousPosition = this.path[x - 10]

    if (previousPosition === undefined || this.path[x] === undefined) {
      return this.trajectory.angle
    }

    return Ballistics.angle(previousPosition, this.path[x])
  }

  /**
   * Returns current time in milliseconds.
   *
   * @return int
   */
  getTime () {
    return (new Date()).getTime()
  }

  /**
   * Returns the time that passed since provided timestamp.
   *
   * @return int
   */
  getTimeFrom (time) {
    return (new Date()).getTime() - time
  }

  /**
   * Draws a landed projectile on given context
   *
   * @param  Context context
   * @return void
   */
  drawLanded (context) {
    context.beginPath()
    context.arc(
      this.trajectory.getImpactPoint().x, this.trajectory.getImpactPoint().y, 4, 0, 2 * Math.PI, false
    )
    context.lineWidth = 2
    context.strokeStyle = '#B23432'
    context.stroke()
  }

  /**
   * Draws the projectile at given position and angle.
   *
   * @param  Object position
   * @param  float angle
   * @return void
   */
  drawProjectile (position, angle) {
    this.context.clearRect(0, 0, this.boundaries.w, this.boundaries.h)

    if (position.y > 0) {
      return this.drawArrow(position, angle)
    }

    return this.drawMark(position)
  }

  /**
   * Draws the arrow at given position and angle.
   *
   * @param  Object position
   * @param  float angle
   * @return void
   */
  drawArrow (position, angle) {
    let startPoint = this.calculateStartPoint(position, angle)

    this.context.beginPath()
    this.context.moveTo(startPoint.x, startPoint.y)
    this.context.lineTo(position.x, position.y)
    this.context.strokeStyle = this.color
    this.context.stroke()
  }

  /**
   * Calculates arrow start point based on the position, angle and projectile length.
   *
   * @param  Object position
   * @param  float angle
   * @return Object
   */
  calculateStartPoint (position, angle) {
    return {
      x: position.x - this.length * Math.cos(Math.PI - angle),
      y: position.y - this.length * Math.sin(angle)
    }
  }

  /**
   * Draws a mark in case that the arrow flies off the canvas.
   *
   * @param  Object position
   * @return void
   */
  drawMark (position) {
    this.context.beginPath()
    this.context.arc(position.x, 0, 4, 0, 2 * Math.PI, false)
    this.context.lineWidth = 2
    this.context.strokeStyle = this.color
    this.context.stroke()
  }
}
