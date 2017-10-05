export default {
  methods: {

    /**
     * End game screen.
     */

    drawEndGameScreen () {
      this.context.fillStyle = this.colors.endGameBackground
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

      this.context.font = this.fonts.heading
      this.context.fillStyle = this.colors.text
      this.context.fillText(`Scenario Completed with Score: ${this.score}`, 50, 284)
    }
  }
}
