export default class Projectile {
  get speed () {
    return 200
  }

  get weight () {
    return 1
  }

  constructor () {
    this.boundaries = {
      w: process.env.CANVAS_WIDTH,
      h: process.env.CANVAS_HEIGHT
    }
  }

  fire (trajectory, context) {
    this.trajectory = trajectory
    this.context = context
    this.startTime = this.getTime()

    return new Promise((resolve, reject) => {
      this.prepareAnimationFrame(resolve, reject)
    })
  }

  prepareAnimationFrame (resolve, reject) {
    window.requestAnimationFrame(() => {
      this.step(resolve, reject)
    })
  }

  step (resolve, reject) {
    let position = this.getNextPosition()

    if (position === undefined) {
      return resolve(this)
    }

    this.drawProjectile(position)

    return window.requestAnimationFrame(() => {
      this.step(resolve, reject)
    })
  }

  getNextPosition () {
    let x = Math.round(this.getTimeFrom(this.startTime) / this.speed * 100)

    return this.trajectory.getTrajectory()[x]
  }

  getTime () {
    return (new Date()).getTime()
  }

  getTimeFrom (time) {
    return (new Date()).getTime() - time
  }

  drawLanded (context) {
    context.beginPath()
    context.arc(
      this.trajectory.getImpactPoint().x, this.trajectory.getImpactPoint().y, 4, 0, 2 * Math.PI, false
    )
    context.lineWidth = 2
    context.strokeStyle = '#B23432'
    context.stroke()
  }

  drawMark (position) {
    this.context.beginPath()
    this.context.arc(position.x, position.y, 4, 0, 2 * Math.PI, false)
    this.context.lineWidth = 2
    this.context.strokeStyle = this.color
    this.context.stroke()
  }
}
