<template>
  <div class="date-currency-page">
    <h1 class="date-currency-page__title">Курси валют по даті</h1>
    <div class="date-currency-page__search-fields">
      <BaseSearchInput v-model="searchedCurrency" label="Шукати валюту" />
      <BaseDateInputVue v-model="selectedDate" @showCurrencies="showCurrencies" />
    </div>

    <div v-if="displayedCurrencies.length" class="date-currency-page__list">
      <CurrencyItem v-for="item in displayedCurrencies" :item="item" :key="item.cc" />
    </div>

    <h2 v-else class="date-currency-page__no-currencies-message">Виберіть дату та натисніть "Показати"</h2>

    <BasePagination class="date-currency-page__pagination" @pageChanged="setCurrentPage" :itemsPerPage="itemsPerPage"
      :allItemsLength="currenciesList.length" />
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue'
import BaseSearchInput from '@/components/BaseSearchInput.vue'
import BasePagination from '@/components/BasePagination.vue'
import BaseDateInputVue from '@/components/BaseDateInput.vue'
import CurrencyItem from '@/components/CurrencyItem.vue'
import { getCurrencies } from '@/api/mainRequests'
import store from '@/store'

export default {
  name: 'DateCurrencyPage',
  components: { BaseSearchInput, BaseDateInputVue, BasePagination, CurrencyItem },

  setup() {
    const selectedDate = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 10
    const searchedCurrency = ref('')

    const currenciesList = computed(() => {
      return store.state.currency.currenciesList.filter(
        (item) =>
          item.cc
            .toLowerCase()
            .includes(searchedCurrency.value.toLowerCase()) ||
          item.txt.toLowerCase().includes(searchedCurrency.value.toLowerCase())
      )
    })
    const displayedCurrencies = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return currenciesList.value.slice(startIndex, endIndex)
    })

    const setCurrentPage = (newPage) => {
      currentPage.value = newPage
    }
    const showCurrencies = async () => {
      const requestDate = selectedDate.value.replace(/-/g, '')
      await getCurrencies(requestDate)
    }

    onMounted(() => {
      store.commit('currency/clearCurrencies')
    })

    return {
      selectedDate,
      showCurrencies,
      currenciesList,
      displayedCurrencies,
      setCurrentPage,
      searchedCurrency,
      currentPage,
      itemsPerPage
    }
  }
}
</script>
<style lang="scss" scoped>
.date-currency-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__title {
    text-align: center;
    margin-bottom: 32px;
  }

  &__search-fields {
    display: flex;
    justify-content: space-between;

    > :not(:last-child) {
      margin-right: 16px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    margin-bottom: 16px;
  }

  &__no-currencies-message {
    margin: auto;
    color: $gray-dark;
    text-align: center;
  }

  &__pagination {
    display: flex;
    margin-top: auto;
  }
}

@media screen and (max-width: 763px) {
  .date-currency-page {
    &__search-fields {
      flex-direction: column;

      > :not(:last-child) {
        margin-right: 0;
        margin-bottom: 16px;
      }

      >div {
        max-width: none;
      }
    }
  }
}
</style>