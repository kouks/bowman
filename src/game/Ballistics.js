export default class Ballistics {
  /**
   * The gravitational acceleraion.
   *
   * @var float
   */
  static get gravitationalAcceleration () {
    return 9.81
  }

  /**
   * The power multiplier
   *
   * @var float
   */
  static get powerMultiplier () {
    return 0.5
  }

  /**
   * The wind multiplier.
   *
   * @var float
   */
  static get windMultiplier () {
    return 0.2
  }

  /**
   * The max power.
   *
   * @var int
   */
  static get maxPower () {
    return 300
  }

  /**
   * Calculates the power based on points while dragging a mouse.
   *
   * @param  Object initialPoint
   * @param  Object currentPoint
   * @return int
   */
  static power (initialPoint, currentPoint) {
    let [a, b] = Ballistics.getSides(initialPoint, currentPoint)

    return Math.min(this.maxPower, Math.abs(Math.round(
      Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
    )))
  }

  /**
   * Calculates the angle based on points while dragging a mouse.
   *
   * @param  Object initialPoint
   * @param  Object currentPoint
   * @return int
   */
  static angle (initialPoint, currentPoint) {
    let [a, b] = Ballistics.getSides(initialPoint, currentPoint)

    return Math.atan((-b / a))
  }

  /**
   * Parses sides of a triangle based on provided positions.
   *
   * @param  Object initialPoint
   * @param  Object currentPoint
   * @return int
   */
  static getSides (initialPoint, currentPoint) {
    return [
      initialPoint.x - currentPoint.x,
      initialPoint.y - currentPoint.y
    ]
  }

  /**
   * The projectile trajectory equation.
   *
   * @param  int x
   * @param  float angle
   * @param  int power
   * @param  int wind
   * @param  int weight
   * @return int
   */
  static getY (x, angle, power, wind, weight) {
    let adjustedPower = this.adjustPower(power, wind)

    return Math.round(
      x * Math.tan(angle) -
      (Ballistics.gravitationalAcceleration * weight * Math.pow(x, 2)) /
      (2 * (Math.pow(adjustedPower * Math.cos(angle), 2)))
    )
  }

  /**
   * Adjusts power based on power and wind.
   *
   * @param  int power
   * @param  int wind
   * @return int
   */
  static adjustPower (power, wind) {
    return (power * Ballistics.powerMultiplier) + (wind * Ballistics.windMultiplier)
  }
}
