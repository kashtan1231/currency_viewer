<template>
  <header class="the-header">
    <router-link v-for="page in allPages" :to="{ name: page.name }"
      :class="['the-header__menu-item', { 'current-page': isCurrentPage(page.name) }]" :key="page.name">
      {{ page.text }}
    </router-link>
  </header>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  name: 'TheHeader',
  setup() {
    const allPages = [
      {
        name: 'HomePage',
        text: 'Головна'
      },
      {
        name: 'DateCurrencyPage',
        text: 'Пошук курсу'
      },
      {
        name: 'ChangedCurrencyPage',
        text: 'Змінені курси'
      }
    ]

    const isCurrentPage = (checkedPage) => {
      return useRoute().name === checkedPage
    }

    return { isCurrentPage, allPages }
  }
}
</script>

<style lang="scss" scoped>
.the-header {
  display: flex;
  position: relative;
  padding: 16px;
  text-align: center;
  border-bottom: 2px solid $red;
  z-index: 100;

  .current-page {
    background-color: rgba($red, 0.2);
  }

  &__menu-item {
    @extend p;
    border-radius: 8px;
    padding: 6px;
    transition-duration: 0.2s;


    &:hover {
      background-color: $red;
      color: $white;
    }

    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>