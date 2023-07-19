<template>
  <div class="currency-item" :key="item.cc">
    <p class="currency-item__text">1 {{ item.txt }} {{ item.cc }} = {{ item.rate }} Гривня UAH</p>
    <input v-if="isShowInput" v-model="newValue" class="currency-item__input" type="number" v-focus />
    <img :src="require(`@/assets/icon-${iconName}.svg`)" class="currency-item__edit" @click="switchEdit"
      alt="icon-edit" />
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import store from '@/store'

export default {
  name: 'CurrencyItem',
  props: {
    item: Object
  },

  setup(props) {
    const newValue = ref(null)
    const isShowInput = ref(false)

    const iconName = computed(() => {
      return isShowInput.value === false ? 'edit' : 'accept'
    })

    const switchEdit = () => {
      if (isShowInput.value === true && newValue.value)
        store.commit('currency/changeCurrency', {
          currency: props.item,
          newValue: newValue.value
        })

      isShowInput.value = !isShowInput.value
    }

    return { switchEdit, isShowInput, newValue, iconName }
  },

  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.currency-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px;
  padding: 8px;
  border-bottom: solid 2px $gray-dark;
  transition-duration: 0.2s;

  &__text {
    margin-right: 8px;
  }

  &__input {
    @extend p;
    width: 100%;
    max-width: 164px;
    margin-left: auto;
    margin-right: 8px;
    font-size: 16px;
    line-height: 20px;
    box-shadow: 0 1px 0 0 $black;

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    [type='number'] {
      -moz-appearance: textfield;
    }
  }

  &__edit {
    width: 20px;
    height: 20px;
    transition-duration: 0.2s;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
