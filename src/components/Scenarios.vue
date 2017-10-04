<template>
  <div class="game">
    <div class="columns">
      <div class="column">
        <div class="box has-text-centered">
          <h1 class="title is-1">Scenarios</h1>
          <router-link class="button is-primary is-large is-menu" to="/">Back</router-link>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-12" v-for="scenario in scenarios">
        <div class="box">
          <div class="columns">
            <div class="column is-narrow">
              <canvas
                class="game-canvas"
                :ref="`canvas-${scenario.id}`"
                :width="canvasWidth"
                :height="canvasHeight"
              ></canvas>
            </div>
            <div class="column">
              <h3 class="title is-5">High Scores:</h3>
            </div>
            <div class="column">
              <ul>
                <li v-for="score in orderedScores[scenario.id]">{{ score.score }}</li>
              </ul>
            </div>
            <div class="column is-narrow">
              <router-link
                style="height: 100%; padding: 0 50px;"
                class="button is-primary is-large"
                :to="`/scenarios/${scenario.id}`"
              >Play</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scenario from '@/storage/Models/Scenario'
import Terrain from '@/game/Terrain'
import _ from 'lodash'

export default {
  data () {
    return {
      scenarios: Scenario.all(),

      canvasHeight: 120,
      canvasWidth: 200,
      canvasScale: 0.2
    }
  },

  computed: {
    orderedScores () {
      let scores = {}

      this.scenarios.forEach((scenario) => {
        scores[scenario.id] = _.orderBy(scenario.scores, 'score', 'desc').slice(0, 5)
      })

      return scores
    }
  },

  mounted () {
    this.drawScenarios()
  },

  methods: {
    drawScenarios () {
      this.scenarios.forEach((scenario) => {
        let canvas = this.$refs[`canvas-${scenario.id}`].pop()
        let context = canvas.getContext('2d')

        scenario.terrain.forEach((object) => {
          Terrain.fromObject(object).render(context, this.canvasScale)
        })
      })
    }
  }
}
</script>
