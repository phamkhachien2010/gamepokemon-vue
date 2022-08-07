<template>
  <div>
    <div
      class="game-list-cards"
      :class="{
        'game-list-cards--10': cardPair == 10,
        'game-list-cards--4': cardPair != 10,
      }"
    >
      <div
        class="game-card"
        :class="{
          'is-covered': coveredCard.includes(card),
          'is-uncovered': uncoveredCard.includes(card),
        }"
        v-for="(card, index) in listCard"
        :key="index"
        @click="handleSelectCard(card)"
      >
        <div class="game-card__face game-card-front">
          <h3 class="game-card-front__name">{{ card.name }}</h3>
          <img :src="card.images.png.front" class="game-card-front__image" />
        </div>
        <div class="game-card__face game-card-back">
          <div class="game-card-back__inner">?</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const badSelect = computed(() => store.state.gamePokemon.badSelect);
    const cardPair = computed(() => store.state.gamePokemon.cardPair);
    const listCard = computed(() => store.state.gamePokemon.listCardDefault);
    const uncoveredCard = computed(() => store.state.gamePokemon.uncoveredCard);
    const coveredCard = computed(() => store.state.gamePokemon.coveredCard);

    const gameListCard = ref("game-list-cards--4");

    watch(cardPair, (newValue) => {
      if (newValue == 10) {
        gameListCard.value = "game-list-cards--10";
      } else if (newValue == 6) {
        gameListCard.value = "game-list-cards--8";
      }
    });

    watch(badSelect, (newValue) => {
      if (newValue < 1) {
        store.dispatch("gamePokemon/handleLostGame");
      }
    });

    watch(coveredCard, (newValue) => {
      if (newValue.length === 0) {
        store.dispatch("gamePokemon/handleWinGame");
      }
    });

    const handleSelectCard = (card) => {
      store.dispatch("gamePokemon/handleSelectCardAction", card);
    };

    store.dispatch("gamePokemon/setCoveredCardAction");

    return {
      badSelect,
      cardPair,
      listCard,
      gameListCard,
      handleSelectCard,
      coveredCard,
      uncoveredCard,
    };
  },
};
</script>

<style lang='scss'>
.game-list-cards {
  margin: 2rem auto;
  padding: 0;
  perspective: 60rem;
}
.game-list-cards--4 {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
.game-list-cards--10 {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
}
.game-list-cards--8 {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto;
}
.game-card.is-covered {
  transform: rotateY(180deg);
}
.game-card {
  width: 10rem;
  margin: 0.5rem;
  height: 15rem;
  display: flex;
  align-items: center;
  position: relative;
  list-style: none;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out 0s;
  cursor: pointer;
}
.game-card.is-covered .game-card-front {
  opacity: 0;
}
.game-card-front {
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 1;
}
.game-card__face {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;
  border: 0.4rem solid white;
  background-color: white;
  box-shadow: 0.1rem 0.1rem 0.4rem 0.1rem rgb(0 0 0 / 50%);
  backface-visibility: hidden;
}
.game-card-front__image {
  width: 100%;
}
.game-card-back {
  transform: rotateY(180deg);
}
.game-card-back__inner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 4rem;
  border-radius: 0.5rem;
}
.game-card-back__inner:after {
  content: "";
  display: inline-block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 0.5rem;
  background-color: rgb(47, 47, 211);
  opacity: 0.9;
}
.game-card.is-uncovered {
  pointer-events: none;
}
</style>