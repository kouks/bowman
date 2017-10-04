<template>
  <div class="game">
    <div class="columns">
      <div class="column">
        <div class="box has-text-centered">
          <h1 class="title is-1">Bowman</h1>
          <router-link class="button is-primary is-large is-menu" to="/scenarios">Play</router-link>
          <router-link class="button is-primary is-large is-menu"  to="/editor">Editor</router-link>
          <router-link class="button is-info is-large is-menu"  to="/logout">Logout</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu'
}
</script>
