<template>
  <div v-if="isopen" class="main__modal" @click="handleCloseModal">
    <div class="modal__content" @click.stop>
      <div>
        <div v-if="gameResult.win">
          <h1>Congratulation!</h1>
          <p>You win the game</p>
        </div>
        <div v-if="gameResult.lost">
          <h1>OPP...</h1>
          <p>Let's try again</p>
        </div>
      </div>
      <button @click="handleResetGame">Reset game</button>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    isopen: {
      type: Boolean,
    },
    handleCloseModal: {
      type: Function,
    },
  },
  setup(props) {
    const store = useStore();
    const handleCloseModal = toRefs(props);
    console.log(handleCloseModal);
    const gameResult = computed(() => store.state.gamePokemon.gameResults);

    const handleResetGame = () => {
      store.dispatch("gamePokemon/handleResetGame");
    };

    const handleCloseModalReset = () => {
      handleCloseModal();
    };

    return {
      gameResult,
      handleResetGame,
      handleCloseModalReset,
    };
  },
};
</script>

<style lang='scss'>
.main__modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal__content {
    width: 40%;
    height: 40%;
    margin: auto;
    text-align: center;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    button {
      padding: 5px 10px;
      color: #3b4cca;
      font-size: 20px;
      font-weight: 800;
      border-radius: 10px;
      background-color: #ffde00;
      &:hover {
        background-color: rgb(209, 231, 111);
      }
    }
  }
}
</style>