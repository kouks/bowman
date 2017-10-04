import Projectile from './Projectile'

export default class Arrow extends Projectile {
  get speed () {
    return 200
  }

  get weight () {
    return 1.6
  }

  get length () {
    return 35
  }

  get color () {
    return '#000'
  }

  drawProjectile (position) {
    this.context.clearRect(0, 0, this.boundaries.w, this.boundaries.h)

    // if (position.y !== 0) {
    //   return this.drawArrow(position, angle)
    // }

    return this.drawMark(position)
  }

  drawArrow (position, angle) {
    let startPoint = this.calculateStartPoint(position, angle)

    this.context.beginPath()
    this.context.moveTo(startPoint.x, startPoint.y)
    this.context.lineTo(position.x, position.y)
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
