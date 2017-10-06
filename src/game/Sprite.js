export default class Default {
  /**
   * Returns the sprite color.
   * Note that this wil be removed with sprite being an image
   *
   * @var string
   */
  get color () {
    return '#000'
  }

  /**
   * Class constructor.
   * Will be changed upon replacing the sprite with an image.
   *
   * @param  int x
   * @param  int y
   * @param  int w width
   * @param  int h height
   * @return void
   */
  constructor (x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  /**
   * Renders the sprite on a provided canvas context.
   *
   * @param  Context context
   * @return void
   */
  render (context) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.w, this.h)
  }

  /**
   * Returns the projectile start position.
   *
   * @return Object
   */
  projectileStart () {
    return {
      x: this.x + this.w,
      y: this.y
    }
  }
}
