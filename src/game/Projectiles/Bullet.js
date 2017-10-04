import Projectile from './Projectile'

export default class Bullet extends Projectile {
  get speed () {
    return 500
  }

  get weight () {
    return 0.05
  }

  get length () {
    return 5
  }

  get color () {
    return '#000'
  }

  drawProjectile (position, angle) {
    this.clearCanvas()

    if (position.y !== 0) {
      return this.drawBullet(position, angle)
    }

    return this.drawMark(position)
  }

  drawBullet (position, angle) {
    let startPoint = this.calculateStartPoint(position, angle)

    this.context.beginPath()
    this.context.moveTo(startPoint.x, startPoint.y)
    this.context.lineTo(position.x, position.y)
    this.context.strokeStyle = this.color
    this.context.stroke()
  }

  drawMark (position) {
    this.context.beginPath()
    this.context.arc(position.x, position.y, 4, 0, 2 * Math.PI, false)
    this.context.lineWidth = 2
    this.context.strokeStyle = this.color
    this.context.stroke()
  }

  calculateStartPoint (position, angle) {
    return {
      x: position.x - this.length * Math.cos(angle),
      y: position.y - this.length * Math.sin(angle)
    }
  }
}
