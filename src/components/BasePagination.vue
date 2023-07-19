<template>
  <div v-if="pageCount" class="base-pagination">
    <div class="base-pagination__arrow" @click="previousPage">❰</div>
    <div v-for="item in pageCount" :class="['base-pagination__page', { chosen: currentPage === item }]"
      @click="changePage(item)" :key="item"></div>
    <div class="base-pagination__arrow" @click="nextPage">❱</div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'

export default {
  name: 'BasePagination',

  props: {
    allItemsLength: {
      default: 0
    },
    itemsPerPage: {
      default: 5
    }
  },

  setup(props, context) {
    const currentPage = ref(1)

    const pageCount = computed(() => {
      return Math.ceil(props.allItemsLength / props.itemsPerPage)
    })

    const changePage = (newPage) => {
      currentPage.value = newPage
      context.emit('pageChanged', currentPage.value)
    }
    const nextPage = () => {
      if (currentPage.value < pageCount.value) {
        currentPage.value++
        context.emit('pageChanged', currentPage.value)
      }
    }
    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
        context.emit('pageChanged', currentPage.value)
      }
    }

    return { currentPage, pageCount, changePage, nextPage, previousPage }
  }
}
</script>

<style lang="scss" scoped>
.base-pagination {
  display: flex;
  justify-content: center;
  align-items: center;

  > :not(:last-child) {
    margin-right: 16px;
  }

  &__page {
    position: relative;
    height: 16px;
    width: 16px;
    min-height: 16px;
    min-width: 16px;
    border-radius: 50%;
    background-color: $red;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  &__arrow {
    font-size: 24px;
    color: $red;
    user-select: none;
    cursor: pointer;
    transition-duration: 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
}

.chosen {
  box-shadow: 0 0 5px 2px $red;
}
</style>