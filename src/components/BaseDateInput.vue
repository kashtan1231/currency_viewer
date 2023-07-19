<template>
  <div class="base-date-input">
    <input class="base-date-input__field-input" @input="onInput" :max="currentDate" type="date" />
    <button class="base-date-input__show-button" @click="showCurrencies">
      Показати
    </button>
  </div>
</template>
<script>
export default {
  name: 'BaseDateInput',

  props: {
    modelValue: [String, Number],
    label: {
      default: ''
    }
  },

  setup(props, context) {
    const currentDate = new Date().toISOString().split('T')[0]

    const onInput = (event) => {
      context.emit('update:modelValue', event.target.value)
    }
    const showCurrencies = () => {
      context.emit('showCurrencies')
    }

    return {
      currentDate,
      onInput,
      showCurrencies
    }
  }
}
</script>
<style lang="scss" scoped>
.base-date-input {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 328px;
  box-shadow: inset 0 0 0 1px $gray-dark;
  border-radius: 4px;

  &__field-input {
    @extend p;
    padding: 13px 16px;
    width: 100%;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      -webkit-text-fill-color: $black;
      transition: background-color 5000s ease-in-out 0s;
    }

    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }
  }

  &__show-button {
    @extend p;
    height: fit-content;
    margin-right: 16px;
    padding: 6px;
    background-color: #f4e041;
    border-radius: 4px;
    transition-duration: 0.2s;

    &:hover {
      background-color: rgba($yellow, 0.8);
    }
  }
}
</style>