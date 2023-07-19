<template>
  <div class="changed-currency-page">
    <div v-if="changedCurrenciesList.length" class="changed-currency-page__list">
      <CurrencyItem v-for="item in changedCurrenciesList" :item="item" :key="item.cc" />
    </div>

    <h2 v-else class="changed-currency-page__no-currencies-message">Поки немає змінених валют</h2>
  </div>
</template>
<script>
import { computed } from 'vue'
import CurrencyItem from '@/components/CurrencyItem.vue'
import store from '@/store'

export default {
  name: 'ChangedCurrencyPage',
  components: { CurrencyItem },

  setup() {
    const changedCurrenciesList = computed(() => {
      return store.state.currency.changedCurrenciesList
    })

    return { changedCurrenciesList }
  },
}
</script>
<style lang="scss" scoped>
.changed-currency-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__no-currencies-message {
    margin: auto;
    color: $gray-dark;
    text-align: center;
  }
}
</style>