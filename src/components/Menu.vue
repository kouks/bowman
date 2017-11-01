<template>
  <div class="game">
    <div class="columns">
      <div class="column">
        <!-- The main game menu -->
        <div class="box has-text-centered">
          <h1 class="title is-1">Bowman</h1>
          <p class="subtitle">Welcome, <span class="has-text-primary">{{ user.username }}</span>, click play and enjoy the awesomeness.</p>

          <router-link class="button is-primary is-large is-menu" to="/scenarios">Play</router-link>
          <router-link class="button is-primary is-large is-menu"  to="/editor">Editor</router-link>
          <router-link class="button is-info is-large is-menu"  to="/logout">Logout</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/auth/Auth'

export default {
  data () {
    return {
      user: Auth.user()
    }
  }
}
</script>
