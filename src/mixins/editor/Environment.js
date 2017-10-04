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
        object.render(this.context)
      })

      /*
       * Grid and its selection.
       */

      this.context.strokeStyle = this.colors.gridBorder
      for (let y = this.tile; y < this.canvas.height; y += this.tile) {
        this.context.moveTo(0, y)
        this.context.lineTo(this.canvas.width, y)
      }

      for (let x = this.tile; x < this.canvas.width; x += this.tile) {
        this.context.moveTo(x, 0)
        this.context.lineTo(x, this.canvas.height)
      }
      this.context.stroke()

      this.context.fillStyle = this.colors.gridBackground
      this.context.fillRect(
        this.parsedSelection.left,
        this.parsedSelection.up,
        this.parsedSelection.right - this.parsedSelection.left,
        this.parsedSelection.down - this.parsedSelection.up
      )
    }
  }
}
