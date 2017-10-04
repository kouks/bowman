export default {
  methods: {

    /**
     * Environment setup.
     */

    drawEnvironment () {
      /*
       * Clear stuff.
       */

      this.clearCanvas(this.context)
      this.clearCollider(this.collider)

      /*
       * Air.
       */

      this.context.fillStyle = this.colors.background
      this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

      /*
       * Sprite.
       */

      this.sprite.render(this.context)

      /*
       * Objects.
       */

      this.terrain.forEach((object) => {
        this.collider.register(object)

        object.render(this.context)
      })

      /*
       * Landed projectiles.
       */

      this.landedProjectiles.forEach((projectile) => {
        projectile.drawLanded(this.context)
      })

      /*
       * Summary background
       */

      this.context.fillStyle = this.colors.summary
      this.context.fillRect(0, 0, 550, 60)

      /*
       * Wind.
       */

      this.context.fillStyle = this.colors.wind
      this.context.fillRect(150, 20, this.wind, 20)
      this.context.fillStyle = this.colors.windSeparator
      this.context.fillRect(149, 15, 2, 30)
      this.context.font = this.fonts.default
      this.context.fillStyle = this.colors.text
      this.context.fillText(`Wind: ${this.wind}`, 20, 35)

      /*
       * Count of projectiles.
       */

      this.context.fillStyle = this.colors.text
      this.context.fillText(`Projectiles: ${this.remainingProjectiles}`, 250, 35)

      /*
       * Score
       */

      this.context.fillStyle = this.colors.text
      this.context.fillText(`Score: ${this.score}`, 450, 35)
    }
  }
}
