<template>
  <div class="game">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <h1 class="title is-1 has-text-centered">Login</h1>

          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input
                v-model="credentials.username"
                :class="['input', usernameClass]"
                type="text"
                placeholder="Username"
              >
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model="credentials.password"
                :class="['input', passwordClass]"
                type="password"
                placeholder="Password"
              >
            </div>
            <p class="help is-danger" v-show="incorrectCredentials">Incorrect credentials.</p>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" @click="attemptLogin()">Login</button>
            </div>
            <div class="control">
              <router-link class="button is-link" to="/register">Create an Account</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hash from 'string-hash'

import User from '@/storage/Models/User'
import Auth from '@/auth/Auth'

export default {
  data () {
    return {
      credentials: {},
      incorrectCredentials: false
    }
  },

  computed: {
    usernameClass () {
      return this.incorrectCredentials ? 'is-danger' : ''
    },

    passwordClass () {
      return this.incorrectCredentials ? 'is-danger' : ''
    }
  },

  methods: {
    attemptLogin () {
      let user = User.where({
        username: this.credentials.username,
        password: hash(this.credentials.password)
      }).pop()

      if (!user) {
        this.incorrectCredentials = true

        return
      }

      Auth.login(user)

      return this.$router.push({ name: 'menu' })
    }
  }
}
</script>
