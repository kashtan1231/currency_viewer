<template>
  <div class="home-page">
    <h1 class="home-page__title">Курси валют на сьогодні</h1>

    <BaseSearchInput v-model="searchedCurrency" class="home-page__search" label="Шукати валюту" />

    <div class="home-page__list">
      <CurrencyItem v-for="item in displayedCurrencies" :item="item" :key="item.cc" />
    </div>

    <BasePagination class="home-page__pagination" @pageChanged="setCurrentPage" :itemsPerPage="itemsPerPage"
      :allItemsLength="currenciesList.length" />
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { getCurrencies } from '@/api/mainRequests'
import BasePagination from '@/components/BasePagination.vue'
import BaseSearchInput from '@/components/BaseSearchInput.vue'
import CurrencyItem from '@/components/CurrencyItem.vue'
import store from '@/store'

export default {
  name: 'HomePage',

  components: {
    BasePagination,
    BaseSearchInput,
    CurrencyItem
  },

  setup() {
    const currentPage = ref(1)
    const itemsPerPage = 10
    const searchedCurrency = ref('')

    const currenciesList = computed(() => {
      return store.state.currency.currenciesList.filter((item) => {
        return (
          item.cc
            .toLowerCase()
            .includes(searchedCurrency.value.toLowerCase()) ||
          item.txt.toLowerCase().includes(searchedCurrency.value.toLowerCase())
        )
      })
    })
    const displayedCurrencies = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return currenciesList.value.slice(startIndex, endIndex)
    })

    const setCurrentPage = (newPage) => {
      currentPage.value = newPage
    }

    onMounted(async () => {
      await getCurrencies()
    })

    return {
      searchedCurrency,
      currenciesList,
      currentPage,
      itemsPerPage,
      displayedCurrencies,
      setCurrentPage
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__title {
    text-align: center;
    margin-bottom: 32px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    margin-bottom: 16px;
  }

  &__pagination {
    display: flex;
    margin-top: auto;
  }
}

@media screen and (max-width: 763px) {
  .home-page {
    &__search {
      max-width: none;
    }
  }
}
</style>
