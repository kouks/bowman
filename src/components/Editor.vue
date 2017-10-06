<template>
  <div class="game">
    <div class="columns">
      <div class="column">
        <div class="box has-text-centered">
          <h1 class="title is-1">Scenario Editor</h1>

          <a class="button is-primary is-large is-menu" @click="saveAndExit()">Save and Exit</a>
          <a class="button is-danger is-large is-menu" @click="exit()">Cancel</a>
        </div>
      </div>
    </div>

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
        </div>
      </div>
    </div>

    <div class="columns" v-show="showHint">
      <div class="column">
        <div class="box">
          <span class="is-pulled-right">
            <i class="fa fa-times" aria-hidden="true" @click="showHint = false" style="cursor: pointer;"></i>
          </span>

          <p><strong>Hint: </strong>Select area by clicking and dragging your mouse, then choose color and score of the terrain and click "Add Terrain".</p>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="box">
          <b>Create Terrain</b><hr>
          <div class="field">
            <label class="label">Color</label>
            <span
              :class="['colorSample', terrainColor === sample ? 'selected' : '']"
              v-for="sample in terrainColorPresets"
              @click="terrainColor = sample"
              :style="{ backgroundColor: sample }"
            ></span>
          </div>

          <div class="field">
            <label class="label">Score</label>
            <span
              :class="['scorePreset', terrainScore === score ? 'selected' : '']"
              v-for="score in terrainScorePresets"
              @click="terrainScore = score"
            >{{ score }}</span>
          </div>
          <hr>
          <button class="button is-primary" @click="createTerrain()">Add Terrain</button>
        </div>
      </div>

      <div class="column">
        <div class="box">
          <b>Objects</b><hr>
          <ul>
            <li v-for="object in terrain">
              <span :style="{ color: object.color }">Object</span> at {{ object.x }}, {{ object.y }}. Score: {{ object.score }}
              <a class="is-pulled-right has-text-danger" @click="removeTerrain(object)">Remove</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Environment from '@/mixins/editor/Environment'

import Auth from '@/auth/Auth'

import Helpers from '@/mixins/Helpers'
import Colors from '@/mixins/Colors'

import Terrain from '@/game/Terrain'

import Sprite from '@/game/Sprites/Default'

import Scenario from '@/storage/Models/Scenario'

export default {
  mixins: [Environment, Helpers, Colors],

  data () {
    return {
      // Canvas
      canvas: null,
      context: null,
      canvasHeight: 600,
      canvasWidth: 1000,

      // Selection
      initialPoint: {},
      currentPoint: {},
      selecting: false,

      // Terrain
      terrain: [],

      // Grid
      tile: 50,

      // Sprite instance
      sprite: new Sprite(30, 500, 20, 50),

      // Tools
      terrainColor: '#000000',
      terrainScore: 0,
      terrainColorPresets: [
        '#000000', '#673AB7', '#2196F3', '#00BCD4', '#009688', '#8BC34A', '#CDDC39', '#FF9800', '#FF5722', '#795548', '#607D8B'
      ],
      terrainScorePresets: [
        0, 5, 10, 50, 100, 500, 1000, 5000, 10000
      ],

      // Hint
      showHint: true
    }
  },

  computed: {
    parsedSelection () {
      return {
        up: this.floorTo(Math.min(this.initialPoint.y, this.currentPoint.y), this.tile),
        right: this.ceilTo(Math.max(this.initialPoint.x, this.currentPoint.x), this.tile),
        down: this.ceilTo(Math.max(this.initialPoint.y, this.currentPoint.y), this.tile),
        left: this.floorTo(Math.min(this.initialPoint.x, this.currentPoint.x), this.tile)
      }
    }
  },

  mounted () {
    this.loadCanvas()

    this.drawEnvironment()
  },

  methods: {

    /**
     * Canvas setup.
     */

    loadCanvas () {
      this.canvas = this.$refs.canvas
      this.context = this.canvas.getContext('2d')
    },

    /**
     * Creating terrain.
     */

    createTerrain () {
      if (this.notSelected()) {
        return
      }

      this.terrain.push(new Terrain(
        this.parsedSelection.left,
        this.parsedSelection.up,
        this.parsedSelection.right - this.parsedSelection.left,
        this.parsedSelection.down - this.parsedSelection.up,
        this.terrainColor,
        parseInt(this.terrainScore)
      ))

      this.resetSelection()
      this.drawEnvironment()
    },

    removeTerrain (object) {
      this.terrain = this.terrain.filter(item => object !== item)

      this.drawEnvironment()
    },

    resetSelection () {
      this.initialPoint = {}
      this.currentPoint = {}
    },

    notSelected () {
      return this.initialPoint.x === undefined && this.initialPoint.y === undefined
    },

    /**
     * Actions.
     */

    saveAndExit () {
      if (this.terrain.length > 0) {
        Scenario.create({ terrain: this.terrain, user_id: Auth.id() })
      }

      this.exit()
    },

    exit () {
      this.$router.push({ name: 'menu' })
    },

    /**
     * Event handling.
     */

    mousedown (event) {
      if (this.wasLeftClick(event)) {
        this.initialPoint = this.getMousePosition(event)

        this.selecting = true
      }
    },

    mousemove (event) {
      if (this.selecting) {
        this.currentPoint = this.getMousePosition(event)

        this.drawEnvironment()
      }
    },

    mouseup (event) {
      this.currentPoint = this.getMousePosition(event)

      this.drawEnvironment()

      this.selecting = false
    }
  }
}
</script>

<style scoped>
  .colorSample {
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    border: 3px solid #fff;
    display: inline-block;
    height: 40px;
    width: 40px;
    border-radius: 3px;
    margin-right: 5px;
    cursor: pointer;
  }

  .colorSample.selected, .colorSample:hover {
    border: none
  }

  .scorePreset {
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    display: inline-block;
    padding: 8px;
    border-radius: 3px;
    margin-right: 5px;
    cursor: pointer;
    min-width: 40px;
    text-align: center;
  }

  .scorePreset.selected, .scorePreset:hover {
    font-weight: bold;
    background: rgba(10,10,10,.05);
  }
</style>
