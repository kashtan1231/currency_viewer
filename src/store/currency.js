export default {
  namespaced: true,
  state: {
    currenciesList: [],
    changedCurrenciesList: []
  },
  mutations: {
    setCurrencies(state, currenciesList) {
      state.currenciesList = [...currenciesList]
    },

    changeCurrency(state, payload) {
      const neededCurrency = state.currenciesList.find(
        (item) => item.cc === payload.currency.cc
      )

      if (neededCurrency) {
        neededCurrency.rate = payload.newValue
      }

      const neededChangedCurrency = state.changedCurrenciesList.find(
        (item) => item.cc === payload.currency.cc
      )

      if (neededChangedCurrency) {
        neededChangedCurrency.rate = payload.newValue
      } else state.changedCurrenciesList.push(payload.currency)
    },

    clearCurrencies(state) {
      state.currenciesList = []
    }
  }
}
