<template>
  <p style="margin: 0; color: white; font-weight: 600">
    Chọn số cặp thẻ muốn chơi
  </p>
  <div class="form__insert__radio">
    <div class="form-check chose__radio">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="check4"
        v-model="gameData.cardPair"
        checked
        value="4"
      />
      <label class="form-check-label" for="check4"> 4 </label>
    </div>
    <div class="form-check chose__radio">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="check6"
        v-model="gameData.cardPair"
        value="6"
      />
      <label class="form-check-label" for="check6"> 6 </label>
    </div>
    <div class="form-check chose__radio">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="check8"
        v-model="gameData.cardPair"
        value="8"
      />
      <label class="form-check-label" for="check8"> 8 </label>
    </div>
    <div class="form-check chose__radio">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="check10"
        v-model="gameData.cardPair"
        value="10"
      />
      <label class="form-check-label" for="check10"> 10 </label>
    </div>
  </div>
  <div>
    <span style="color: white; margin-right: 10px">Chọn số lượt chơi:</span>
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="gameData.badSelect"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  </div>

  <div class="bad__select">Số lượt chơi còn lại là: {{ badSelect }}</div>
</template>

<script>
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const badSelect = computed(() => store.state.gamePokemon.badSelect);
    const gameData = reactive({
      cardPair: 4,
      badSelect: 5,
    });

    watch(gameData, (newValue) => {
      store.dispatch("gamePokemon/changeGameDataAction", newValue);
    });

    return {
      badSelect,
      gameData,
    };
  },
};
</script>

<style lang='scss'>
.form__insert__radio {
  display: flex;
  margin-bottom: 10px;
  .chose__radio {
    color: white;
    font-weight: 700;
    font-size: 16px;
    margin-right: 10px;
  }
}
.bad__select {
  padding: 5px 10px;
  background-color: rgb(226, 166, 53);
  border: 2px solid white;
  margin-top: 5px;
}
</style>