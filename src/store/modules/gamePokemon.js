import { listCardData } from "@/data/listCardData";


const getListCardDefault = (cardPair) => {
    let listCard = []
    for (let index = 0; index < cardPair; index++) {
        let random = Math.floor(Math.random() * 100) + 1;
        const pokemonCard1 = {...listCardData[random] };
        const pokemonCard2 = {...listCardData[random] }
        listCard.push(pokemonCard1);
        listCard.push(pokemonCard2)
    }
    return listCard
}


const state = () => {
    return {
        listCardDefault: getListCardDefault(4).sort(() => Math.random() - 0.5),
        badSelect: 5,
        cardPair: 4,
        gameResults: {
            win: false,
            lost: false
        },
        selectCard: [],
        pariCard: [],
        uncoveredCard: [],
        coveredCard: [],
        isOpenModal: false
    }
}

const mutations = {
    changeGameDataMutation(state, payload) {
        state.badSelect = payload.badSelect;
        state.cardPair = payload.cardPair
        state.listCardDefault = getListCardDefault(payload.cardPair).sort(() => Math.random() - 0.5)
        state.coveredCard = state.listCardDefault
    },
    setCoverCardMutation(state) {
        state.coveredCard = state.listCardDefault
    }
}

const actions = {
    changeGameDataAction({ commit }, payload) {
        commit('changeGameDataMutation', payload)
    },
    setCoveredCardAction({ commit }) {
        commit('setCoverCardMutation')
    },
    handleSelectCardAction({ state }, payload) {
        state.selectCard.push(payload);
        if (state.selectCard.length === 2) {
            const [card1, card2] = state.selectCard;
            if (card1.id === card2.id) {
                state.pariCard.push(card1);
                state.pariCard.push(card2);
            } else {
                state.badSelect -= 1
            }
            setTimeout(() => {
                state.selectCard = []
            }, 800);
        }
        state.uncoveredCard = [...state.selectCard, ...state.pariCard];
        state.coveredCard = state.listCardDefault.filter((card) => !state.uncoveredCard.includes(card))
    },
    handleLostGame({ state }) {
        state.isOpenModal = true
        state.gameResults = {
            win: false,
            lost: true
        }
    },
    handleWinGame({ state }) {
        state.isOpenModal = true
        state.gameResults = {
            win: true,
            lost: false
        }
    },
    handleResetGame({ state }) {
        let listCardReset = getListCardDefault(state.cardPair).sort(() => Math.random() - 0.5);
        state.listCardDefault = listCardReset;
        state.selectCard = [];
        state.pariCard = [];
        state.isOpenModal = false
        state.gameResults = {
            win: false,
            lost: false
        }
        state.badSelect = 7;
        state.uncoveredCard = [];
        state.coveredCard = listCardReset
    },
    handleOpenModal({ state }) {
        state.isOpenModal = true
    },
    handleCloseModal({ state }) {
        state.isOpenModal = false
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}