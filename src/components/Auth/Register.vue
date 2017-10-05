<template>
  <div class="game">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <h1 class="title is-1 has-text-centered">Register</h1>

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
            <p class="help is-danger" v-show="errors.usernameTaken">This username is already taken.</p>
            <p class="help is-danger" v-show="errors.usernameTooShort">Username needs to be at least 3 characters long.</p>
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
          </div>

          <div class="field">
            <div class="control">
              <input
                v-model="credentials.passwordAgain"
                :class="['input', passwordClass]"
                type="password"
                placeholder="Password Again"
              >
            </div>
            <p class="help is-danger" v-show="errors.passwordsDontMatch">Passwords don't match.</p>
            <p class="help is-danger" v-show="errors.passwordTooShort">Passwords needs to be at least 6 characters long.</p>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" @click="attemptRegister()">Register</button>
            </div>
            <div class="control">
              <router-link class="button is-link" to="/login">Already have an Account</router-link>
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
      errors: {
        usernameTaken: false,
        passwordsDontMatch: false,
        passwordTooShort: false,
        usernameTooShort: false
      }
    }
  },

  computed: {
    usernameClass () {
      return (this.errors.usernameTaken || this.errors.usernameTooShort) ? 'is-danger' : ''
    },

    passwordClass () {
      return (this.errors.passwordsDontMatch || this.errors.passwordTooShort) ? 'is-danger' : ''
    }
  },

  methods: {
    attemptRegister () {
      this.resetErrors()

      this.checkUsernameTaken()
      this.checkPasswordsDontMatch()
      this.checkPasswordTooShort()
      this.checkUsernameTooShort()

      if (this.hasErrors()) {
        return
      }

      let user = User.create({
        username: this.credentials.username,
        password: hash(this.credentials.password)
      })

      Auth.login(user)

      return this.$router.push({ name: 'menu' })
    },

    resetErrors () {
      this.errors.usernameTaken = false
      this.errors.passwordsDontMatch = false
      this.errors.usernameTooShort = false
      this.errors.passwordTooShort = false
    },

    checkUsernameTaken () {
      if (User.where({ username: this.credentials.username }).pop()) {
        this.errors.usernameTaken = true
      }
    },

    checkPasswordsDontMatch () {
      if (this.credentials.password !== this.credentials.passwordAgain) {
        this.errors.passwordsDontMatch = true
      }
    },

    checkPasswordTooShort () {
      if (this.credentials.password === undefined || this.credentials.password.length < 6) {
        this.errors.passwordTooShort = true
      }
    },

    checkUsernameTooShort () {
      if (this.credentials.username === undefined || this.credentials.username.length < 3) {
        this.errors.usernameTooShort = true
      }
    },

    hasErrors () {
      return Boolean(Object.values(this.errors).filter((error) => {
        return error
      }).length)
    }
  }
}
</script>
