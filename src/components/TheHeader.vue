<template>
  <div class="text-center header">
    <a href="https://hie-dev.vercel.app/">
      <img src="../assets/logo-dark.png" alt="logo"
    /></a>
    <div class="header__content">
      <a class="header__item" target="_blank" href="https://hie-dev.vercel.app/"
        ><i class="fa fa-house-damage"></i
      ></a>
      <router-link class="header__item" to="/"
        ><i class="fa fa-gamepad"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.header {
  width: 100%;
  height: 100px;
  background-color: rgb(31 41 55);
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  z-index: 100;
  .header__content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    .header__item {
      color: white;
      font-size: 50px;
      &:hover {
        color: rgb(110 231 183);
      }
    }
  }
  img {
    width: 75px;
    border-radius: 10px;
  }
}
</style>