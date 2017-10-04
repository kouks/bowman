export default class Default {
  get color () {
    return '#000'
  }
  // constructor (position, image) {
  //   this.position = position
  //   this.image = image
  // }
  constructor (x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  render (context) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.w, this.h)
  }

  projectileStart () {
    return {
      x: this.x + this.w,
      y: this.y
    }
  }
}
