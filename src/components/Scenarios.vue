<template>
  <div class="game">
    <div class="columns">
      <div class="column">
        <!-- Scenarios Listing Menu -->
        <div class="box has-text-centered">
          <h1 class="title is-1">Scenarios</h1>

          <router-link class="button is-primary is-large is-menu" to="/editor">Create New Scenario</router-link>
          <router-link class="button is-info is-large is-menu" to="/">Back</router-link>
        </div>
      </div>
    </div>

    <!-- The List of all Scenarios -->
    <div class="columns is-multiline">
      <div class="column is-12" v-for="scenario in scenarios">
        <div class="box">
          <div class="columns">
            <div class="column is-narrow">

              <!-- The scenario miniature -->
              <canvas
                class="game-canvas"
                :ref="`canvas-${scenario.id}`"
                :width="canvasWidth"
                :height="canvasHeight"
              ></canvas>
              <p>Scenario by {{ scenario.user.username }}</p>
              <a
                @click="removeScenario(scenario.id)"
                v-show="user.id === scenario.user.id"
                class="has-text-danger"
              >
                Remove Scenario
              </a>
            </div>

            <!-- High scores table. -->
            <div class="column">
              <div class="columns is-multiline">
                <div class="column is-12 has-text-centered">
                  <p class="title is-5">High Scores</p>
                </div>

                <div class="column has-text-right">
                  <ul>
                    <li v-for="score in orderedScores[scenario.id]">
                      <strong>{{ score.score }}</strong>
                    </li>
                  </ul>
                </div>

                <div class="column">
                  <ul>
                    <li v-for="score in orderedScores[scenario.id]">
                      {{ score.user.username }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- List of people who attempted -->
            <div class="column">
              <div class="columns is-multiline">
                <div class="column is-12 has-text-centered">
                  <p class="title is-5">People who Attempted</p>
                </div>

                <div class="column has-text-centered">
                  <ul>
                    <li v-for="user in attempted[scenario.id]">
                      <strong>{{ user }}</strong>
                    </li>
                  </ul>
                </div>
              </div>
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
import _ from 'lodash'

import Scenario from '@/storage/Models/Scenario'
import Terrain from '@/game/Terrain'

import Auth from '@/auth/Auth'

export default {
  data () {
    return {
      scenarios: Scenario.all(),

      canvasHeight: 120,
      canvasWidth: 200,
      canvasScale: 0.2,

      countHighScores: 4,
      countAttempted: 4,

      user: Auth.user()
    }
  },

  computed: {
    orderedScores () {
      let scores = {}

      this.scenarios.forEach((scenario) => {
        scores[scenario.id] = _.orderBy(scenario.scores, 'score', 'desc').slice(0, this.countHighScores)
      })

      return scores
    },

    attempted () {
      let users = {}

      this.scenarios.forEach((scenario) => {
        users[scenario.id] = _.uniq(scenario.scores.map((score) => {
          return score.user.username
        })).slice(0, this.countAttempted)
      })

      return users
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
    },

    removeScenario (id) {
      Scenario.delete(id)

      this.scenarios = this.scenarios.filter(scenario => scenario.id !== id)
    }
  }
}
</script>
