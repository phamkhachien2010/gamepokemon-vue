<template>
  <the-header />
  <game-home />
</template>

<script>
import GameHome from "./components/GameHome.vue";
import TheHeader from "./components/TheHeader.vue";
export default {
  components: { TheHeader, GameHome },
};
</script>

<style lang="scss">
</style>
