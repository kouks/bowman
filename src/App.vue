<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .game {
    padding-top: 20px;
  }

  .game-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .game-canvas {
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }

  .projectile-canvas {
    position: absolute;
    z-index: 10;
  }

  .projectile-canvas.invisible {
    display: none;
  }

  .is-menu {
    display: block;
    width: 300px;
    margin: 10px auto;
  }
</style>
