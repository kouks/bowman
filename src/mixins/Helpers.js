export default {
  methods: {
    getMousePosition (event) {
      let rect = this.context.canvas.getBoundingClientRect()

      return {
        x: parseInt((event.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width),
        y: parseInt((event.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height)
      }
    },

    wasLeftClick (event) {
      return event.button === 0
    },

    wasRightClick (event) {
      return event.button === 2
    },

    clearCanvas (context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    clearCollider (collider) {
      collider.clear()
    },

    showProjectileCanvas () {
      this.projectileCanvasClass = ''
    },

    hideProjectileCanvas () {
      this.projectileCanvasClass = 'invisible'
    },

    addLandedProjectile (projectile) {
      this.landedProjectiles.push(projectile)
    },

    hasProjectiles () {
      return this.remainingProjectiles > 0
    },

    floorTo (number, value) {
      return Math.floor(number / value) * value
    },

    ceilTo (number, value) {
      return Math.ceil(number / value) * value
    }
  }
}
