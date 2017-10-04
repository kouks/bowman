<template>
  <div class="game">
    <div class="columns">
      <div class="column">
        <div class="box game-container">
          <canvas
            class="game-canvas"
            ref="canvas"

            :width="canvasWidth"
            :height="canvasHeight"

            @mousedown="mousedown"
            @mousemove="mousemove"
            @mouseup="mouseup"
          ></canvas>

          <canvas
            :class="['projectile-canvas', projectileCanvasClass]"
            ref="projectileCanvas"

            :width="canvasWidth"
            :height="canvasHeight"
          ></canvas>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="box has-text-centered">
          <router-link class="button is-primary is-large is-menu" to="/">Back to Menu</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Balistics from '../game/Balistics'
import Collider from '../game/Collider'
import Trajectory from '../game/Trajectory'
import Terrain from '../game/Terrain'

import Environment from '../mixins/game/Environment'
import EndGame from '../mixins/game/EndGame'

import Helpers from '../mixins/Helpers'
import Colors from '../mixins/Colors'

import Arrow from '../game/Projectiles/Arrow'

import Sprite from '../game/Sprites/Default'

import Scenario from '../storage/Models/Scenario'
import Score from '../storage/Models/Score'

export default {
  mixins: [Environment, EndGame, Helpers, Colors],

  data () {
    return {
      // Canvas
      canvas: null,
      context: null,
      canvasHeight: 600,
      canvasWidth: 1000,
      projectileCanvas: null,
      projectileContext: null,
      projectileCanvasClass: 'invisible',

      // Scenario
      scenario: null,

      // Collider instance
      collider: new Collider(),

      // Terrain
      terrain: [],

      // Sprite instance
      sprite: new Sprite(30, 500, 20, 50),

      // Score
      score: 0,

      // Shot Management
      startPoint: {},
      currentPoint: {},
      drawing: false,
      maxPower: 300,
      wind: 0,
      maxWind: 50,

      // Projectiles
      landedProjectiles: [],
      projectileCount: 10,

      // Fonts
      fonts: {
        default: '16px Source Sans Pro'
      }
    }
  },

  computed: {
    power () {
      return Balistics.power(this.maxPower, this.initialPoint, this.currentPoint)
    },

    angle () {
      return Balistics.angle(this.initialPoint, this.currentPoint)
    },

    remainingProjectiles () {
      return this.projectileCount - this.landedProjectiles.length
    }
  },

  mounted () {
    this.loadCanvases()

    this.loadScenario()

    this.determineWind()

    this.drawEnvironment()
  },

  methods: {

    /**
     * Canvas setup.
     */

    loadCanvases () {
      this.canvas = this.$refs.canvas
      this.context = this.canvas.getContext('2d')

      this.projectileCanvas = this.$refs.projectileCanvas
      this.projectileContext = this.projectileCanvas.getContext('2d')
    },

    /**
     * Scenario setup.
     */

    loadScenario () {
      this.scenario = Scenario.find(this.$route.params.scenario)

      this.terrain = this.scenario.terrain.map((obj) => {
        return Terrain.fromObject(obj)
      })
    },

    /**
     * Wind management.
     */

    determineWind () {
      this.wind = Math.floor(
        Math.random() * 50 * Math.pow(-1, Math.round(Math.random()))
      )
    },

    /**
     * Bow drawing.
     */

    handleBowDrawing () {
      this.context.beginPath()
      this.context.moveTo(this.initialPoint.x, this.initialPoint.y)
      this.context.lineTo(this.currentPoint.x, this.currentPoint.y)
      this.context.strokeStyle = this.colors.powerIndicator
      this.context.stroke()
    },

    displayPowerAndAngle () {
      this.context.font = this.fonts.default
      this.context.fillStyle = this.colors.text
      this.context.fillText(this.power, this.initialPoint.x + 20, this.initialPoint.y)
      this.context.fillText(
        `${Math.round(this.angle * 180 / Math.PI)}°`, this.initialPoint.x + 20, this.initialPoint.y + 20
      )
    },

    /**
     * Bow firing.
     */

    fire () {
      /**
       * Note that the trajectory y axis is inverted.
       */
      this.showProjectileCanvas()

      let projectile = new Arrow()
      let trajectory = new Trajectory(
        this.collider,
        this.sprite.projectileStart(),
        this.power,
        this.angle,
        this.wind
      )

      trajectory.calculateFor(projectile)

      projectile.fire(trajectory, this.projectileContext)
        .then((projectile) => {
          this.hideProjectileCanvas()
          this.addScore(projectile)
          this.addLandedProjectile(projectile)
          this.determineWind()
          this.drawEnvironment()

          if (!this.hasProjectiles()) {
            return this.endGame()
          }
        })
    },

    addLandedProjectile (projectile) {
      this.landedProjectiles.push(projectile)
    },

    hasProjectiles () {
      return this.remainingProjectiles > 0
    },

    /**
     * Score handling.
     */

    addScore (projectile) {
      let obj = projectile.trajectory.collisionObject

      if (obj !== undefined && obj.score !== undefined) {
        this.score += obj.score
      }
    },

    /**
     * Event handling.
     */

    mousedown (event) {
      if (!this.hasProjectiles()) {
        return
      }

      if (this.wasRightClick(event)) {
        this.drawing = false

        this.drawEnvironment()
      }

      if (this.wasLeftClick(event)) {
        this.drawing = true

        this.initialPoint = this.getMousePosition(event)
      }
    },

    mousemove (event) {
      if (this.drawing) {
        this.currentPoint = this.getMousePosition(event)

        this.drawEnvironment()
        this.handleBowDrawing()
        this.displayPowerAndAngle()
      }
    },

    mouseup (event) {
      if (this.drawing && this.wasLeftClick(event)) {
        this.drawing = false

        this.fire()
      }
    },

    /**
     * Ending the game session.
     */

    endGame () {
      Score.create({ scenario_id: this.scenario.id, score: this.score })

      this.drawEndGameScreen()
    }
  }
}
</script>
