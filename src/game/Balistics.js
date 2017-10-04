export default class Balistics {
  static get gravitationalAcceleration () {
    return 9.81
  }

  static get powerMultiplier () {
    return 0.5
  }

  static get windMultiplier () {
    return 0.2
  }

  static power (maxPower, initialPoint, currentPoint) {
    let [a, b] = Balistics.getSides(initialPoint, currentPoint)

    return Math.min(maxPower, Math.abs(Math.round(
      Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
    )))
  }

  static angle (initialPoint, currentPoint) {
    let [a, b] = Balistics.getSides(initialPoint, currentPoint)

    return Math.atan((-b / a))
  }

  static getSides (initialPoint, currentPoint) {
    return [
      initialPoint.x - currentPoint.x,
      initialPoint.y - currentPoint.y
    ]
  }

  static getY (x, angle, power, wind, weight) {
    let adjustedPower = this.adjustPower(power, wind)

    return Math.round(
      x * Math.tan(angle) -
      (Balistics.gravitationalAcceleration * weight * Math.pow(x, 2)) /
      (2 * (Math.pow(adjustedPower * Math.cos(angle), 2)))
    )
  }

  static adjustPower (power, wind) {
    return (power * Balistics.powerMultiplier) + (wind * Balistics.windMultiplier)
  }
}

// Different way to handle arrow drawing (Animation class?)
// Login, Register, Menu, High Scores components
