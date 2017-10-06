export default class Terrain {
  /**
   * Class constructor.
   *
   * @param  int x
   * @param  int y
   * @param  int w width
   * @param  int h height
   * @param  string color
   * @param  int score
   * @return void
   */
  constructor (x, y, w, h, color, score) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
    this.score = score
  }

  /**
   * Glorified constructor, that parses an object.
   *
   * @param  Object obj
   * @return this
   */
  static fromObject (obj) {
    return new this(obj.x, obj.y, obj.w, obj.h, obj.color, obj.score)
  }

  /**
   * Renders the object on provided canvas context.
   *
   * @param  Context context
   * @param  float scale
   * @return this
   */
  render (context, scale) {
    scale = scale === undefined ? 1 : scale

    context.fillStyle = this.color
    context.fillRect(this.x * scale, this.y * scale, this.w * scale, this.h * scale)
  }
}
