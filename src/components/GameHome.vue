<template>
  <div class="home__game">
    <div class="home__game__overlay">
      <div class="game__content">
        <h1>HIE GAME POKEMON</h1>
        <form-select />
        <card-list />
        <button @click="handleResetGame">Reset game</button>
      </div>
    </div>
  </div>
  <teleport to="#app">
    <the-modal
      :isopen="isOpenModal"
      :handleCloseModal="handleCloseModal"
    ></the-modal>
  </teleport>
</template>

<script>
import { computed } from "vue";
import CardList from "./CardList.vue";
import FormSelect from "./FormSelect.vue";
import TheModal from "./TheModal.vue";
import { useStore } from "vuex";
export default {
  components: { FormSelect, CardList, TheModal },
  setup() {
    const store = useStore();
    const isOpenModal = computed(() => store.state.gamePokemon.isOpenModal);

    const handleCloseModal = () => {
      store.dispatch("gamePokemon/handleCloseModal");
    };

    const handleResetGame = () => {
      store.dispatch("gamePokemon/handleResetGame");
    };

    return {
      handleCloseModal,
      isOpenModal,
      handleResetGame,
    };
  },
};
</script>

<style lang='scss'>
.home__game {
  background-image: url("../assets/bg.jpg");
  width: 100%;
  min-height: 100vh;
  .home__game__overlay {
    background-color: rgba(71, 68, 68, 0.76);
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding-top: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .game__content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h1 {
        font-size: 50px;
        font-weight: 800;
        color: white;
        margin-bottom: 50px;
        background: #cfc2b4;
        background: linear-gradient(
          to top,
          #cfc2b4 0%,
          #ff6bf5 50%,
          #8bcf72 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      button {
        padding: 5px 10px;
        color: #3b4cca;
        font-size: 20px;
        font-weight: 800;
        border-radius: 10px;
        background-color: #ffde00;
        &:hover {
          background-color: white;
        }
      }
    }
    .result__game {
      margin-top: 20px;
      width: 100%;
      z-index: 2;
      text-align: center;
      font-size: 40px;
      font-weight: 700;
      .lost__game {
        background-color: rgb(206, 34, 34);
        color: white;
      }
      .win__game {
        background-color: #30d9c4;
        color: #333333;
      }
    }
  }
}
</style>