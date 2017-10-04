export default class Terrain {
  constructor (x, y, w, h, color, score) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
    this.score = score
  }

  static fromObject (obj) {
    return new this(obj.x, obj.y, obj.w, obj.h, obj.color, obj.score)
  }

  render (context, scale) {
    scale = scale === undefined ? 1 : scale

    context.fillStyle = this.color
    context.fillRect(this.x * scale, this.y * scale, this.w * scale, this.h * scale)
  }
}
